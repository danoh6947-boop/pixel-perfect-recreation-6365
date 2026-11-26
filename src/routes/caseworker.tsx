import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PageTitle, SignInPrompt, Status } from '@/components/rqrs/ui';
import { useSession } from '@/components/rqrs/session';
import { supabase } from '@/integrations/supabase/client';
import { pageHead, stages, sampleApplications } from '@/lib/rqrs';
export const Route = createFileRoute('/caseworker')({ head: () => pageHead('Caseworker workspace', 'Review and support applicant qualification journeys.'), component: Caseworker });
function Caseworker() {
  const { user } = useSession(); const qc = useQueryClient();
  const { data: isStaff = false, isLoading } = useQuery({ queryKey: ['role', user?.id], enabled: !!user, queryFn: async () => { const { data } = await supabase.from('user_roles').select('role').eq('user_id', user!.id); return (data ?? []).some(r => r.role === 'caseworker' || r.role === 'admin'); } });
  const { data: apps = [] } = useQuery({ queryKey: ['cw-apps', user?.id], enabled: isStaff, queryFn: async () => { const { data, error } = await supabase.from('applications').select('*').neq('user_id', user!.id).order('created_at', { ascending: false }); if (error) throw error; return data; } });
  async function move(id: string, stage: number) { const { error } = await supabase.from('applications').update({ stage }).eq('id', id); if (error) toast.error(error.message); else { toast.success('Status updated.'); qc.invalidateQueries({ queryKey: ['cw-apps'] }); } }
  const head = <PageTitle eyebrow="CASEWORKERS" title="Caseworker workspace" description={isStaff ? 'Applications assigned to you.' : 'Sample view · Only authorized caseworkers see real applications.'} />;
  if (!user) return <>{head}<SignInPrompt purpose="open the caseworker workspace" /></>;
  if (isLoading) return <>{head}<p>Loading…</p></>;
  if (!isStaff) return <>{head}<p className="panel">Your account isn’t a caseworker account. Below is a read-only sample.</p>{sampleApplications.map(a => <section className="panel" key={a.id}><h3>{a.title}</h3><p>{a.issuer}</p><Status stage={a.stage} /></section>)}</>;
  return <>{head}{!apps.length && <p className="panel">No applications are assigned to you yet.</p>}{apps.map(a => <section className="panel" key={a.id}><h3>{a.full_name} · {a.qualification_type}</h3><p>{a.institution} ({a.graduation_year}) · {a.camp} · {a.authority}</p><Status stage={a.stage} /><label className="field">Update status<select value={a.stage} onChange={e => move(a.id, Number(e.target.value))}>{stages.map((s, i) => <option key={s} value={i}>{s}</option>)}</select></label></section>)}</>;
}
