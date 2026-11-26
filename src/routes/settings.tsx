import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageTitle, SignInPrompt } from '@/components/rqrs/ui';
import { useSession } from '@/components/rqrs/session';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/settings')({ head: () => pageHead('Settings', 'Manage your profile and notification preferences.'), component: Settings });
type P = { full_name: string; phone: string; camp: string; country: string; sms_opt_in: boolean; whatsapp_opt_in: boolean };
function Settings() {
  const { user } = useSession(); const [p, setP] = useState<P | null>(null); const [busy, setBusy] = useState(false);
  useEffect(() => { if (!user) return; supabase.from('profiles').select('full_name,phone,camp,country,sms_opt_in,whatsapp_opt_in').eq('id', user.id).maybeSingle().then(({ data }) => setP(data ?? { full_name: '', phone: '', camp: '', country: '', sms_opt_in: false, whatsapp_opt_in: false })); }, [user]);
  if (!user) return <><PageTitle eyebrow="YOUR ACCOUNT" title="Settings" description="Manage your profile and notifications." /><SignInPrompt purpose="manage your profile" /></>;
  if (!p) return <p>Loading…</p>;
  async function save(e: React.FormEvent) { e.preventDefault(); if (!user || !p) return; setBusy(true); const { error } = await supabase.from('profiles').upsert({ id: user.id, ...p }); setBusy(false); if (error) toast.error(error.message); else toast.success('Your settings are saved.'); }
  const set = (k: keyof P) => (e: React.ChangeEvent<HTMLInputElement>) => setP({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  return <><PageTitle eyebrow="YOUR ACCOUNT" title="Settings" description={user.email ?? ''} /><form className="panel" onSubmit={save}><label className="field">Full name<input value={p.full_name} onChange={set('full_name')} /></label><label className="field">Phone number<input type="tel" value={p.phone} onChange={set('phone')} placeholder="+254…" /></label><label className="field">Camp or town<input value={p.camp} onChange={set('camp')} /></label><label className="field">Country of origin<input value={p.country} onChange={set('country')} /></label><label><input type="checkbox" checked={p.sms_opt_in} onChange={set('sms_opt_in')} /> Send me updates by SMS</label><label><input type="checkbox" checked={p.whatsapp_opt_in} onChange={set('whatsapp_opt_in')} /> Send me updates by WhatsApp</label><p><small>SMS and WhatsApp delivery starts once a messaging service is connected.</small></p><Button disabled={busy}>{busy ? 'Saving…' : 'Save settings'}</Button></form></>;
}
