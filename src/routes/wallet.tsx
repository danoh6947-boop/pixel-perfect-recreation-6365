import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Upload, Trash2, CloudUpload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageTitle, DocumentPreview } from '@/components/rqrs/ui';
import { useSession } from '@/components/rqrs/session';
import { supabase } from '@/integrations/supabase/client';
import { walletFiles, storeFile, removeFile, compressImage, type WalletFile } from '@/lib/offline';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/wallet')({ head: () => pageHead('Qualification wallet', 'Keep your certificates and transcripts together, safely.'), component: Wallet });
const categories = ['Certificate', 'Transcript', 'Identity document', 'Other'];
function Wallet() {
  const { user } = useSession(); const qc = useQueryClient();
  const [local, setLocal] = useState<WalletFile[]>([]); const [category, setCategory] = useState('Certificate'); const [busy, setBusy] = useState('');
  const refresh = () => walletFiles().then(setLocal).catch(() => setLocal([]));
  useEffect(() => { refresh(); }, []);
  const { data: cloud = [] } = useQuery({ queryKey: ['documents', user?.id], enabled: !!user, queryFn: async () => { const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false }); if (error) throw error; return data; } });
  async function add(files: FileList | null) { if (!files) return; for (const f of Array.from(files)) { if (f.size > 10 * 1024 * 1024) { toast.error(`${f.name} is larger than 10 MB.`); continue; } const blob = await compressImage(f); await storeFile({ id: crypto.randomUUID(), name: f.name, category, size: blob.size, file: blob, added: new Date().toISOString() }); } toast.success('Saved on this device.'); refresh(); }
  async function upload(d: WalletFile) { if (!user) return; setBusy(d.id); try { const path = `${user.id}/wallet/${d.id}`; const { error } = await supabase.storage.from('qualifications').upload(path, d.file, { contentType: d.file.type, upsert: true }); if (error) throw error; const { error: e2 } = await supabase.from('documents').insert({ user_id: user.id, name: d.name, category: d.category, storage_path: path, size_bytes: d.size }); if (e2) throw e2; await removeFile(d.id); refresh(); qc.invalidateQueries({ queryKey: ['documents'] }); toast.success('Uploaded to your private wallet.'); } catch (e) { toast.error(e instanceof Error ? e.message : 'Upload failed. The file stays on this device.'); } finally { setBusy(''); } }
  async function open(path: string) { const { data, error } = await supabase.storage.from('qualifications').createSignedUrl(path, 60); if (error) toast.error('Could not open this file.'); else window.open(data.signedUrl, '_blank'); }
  async function removeCloud(id: string, path: string) { await supabase.storage.from('qualifications').remove([path]); const { error } = await supabase.from('documents').delete().eq('id', id); if (error) toast.error(error.message); qc.invalidateQueries({ queryKey: ['documents'] }); }
  return <><PageTitle eyebrow="YOUR DOCUMENTS" title="Qualification wallet" description={user ? 'Files saved on this device can be uploaded to your private wallet.' : 'Files are saved on this device. Sign in to upload them securely.'} />
    <section className="panel"><h2>Add a document</h2><label className="field">Document type<select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="field">Choose files (PDF or photo, up to 10 MB)<input type="file" accept="application/pdf,image/*" multiple onChange={e => { add(e.target.files); e.target.value = ''; }} /></label><p><Upload size={14} /> Photos are compressed to save data.</p></section>
    <section className="panel"><h2>On this device ({local.length})</h2>{!local.length && <p>No files saved on this device.</p>}{local.map(d => <div key={d.id}><DocumentPreview name={d.name} detail={`${d.category} · ${(d.size / 1024).toFixed(0)} KB`} /><div style={{ display: 'flex', gap: 8 }}>{user && <Button size="sm" disabled={busy === d.id} onClick={() => upload(d)}><CloudUpload />{busy === d.id ? 'Uploading…' : 'Upload'}</Button>}<Button size="sm" variant="ghost" onClick={() => removeFile(d.id).then(refresh)}><Trash2 />Remove</Button></div></div>)}</section>
    {user && <section className="panel"><h2>Private cloud wallet ({cloud.length})</h2>{!cloud.length && <p>No uploaded documents yet.</p>}{cloud.map(d => <div key={d.id}><DocumentPreview name={d.name} detail={`${d.category} · ${(d.size_bytes / 1024).toFixed(0)} KB`} verified /><div style={{ display: 'flex', gap: 8 }}><Button size="sm" variant="outline" onClick={() => open(d.storage_path)}><Download />Open</Button><Button size="sm" variant="ghost" onClick={() => removeCloud(d.id, d.storage_path)}><Trash2 />Delete</Button></div></div>)}</section>}</>;
}
