import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { useSession } from '@/components/rqrs/session';
import { supabase } from '@/integrations/supabase/client';
import { pageHead, opportunitiesUnlocked } from '@/lib/rqrs';
export const Route = createFileRoute('/opportunities')({ head: () => pageHead('Opportunities', 'Scholarships, education pathways and work for recognized qualifications.'), component: Opportunities });
const items = [
  { type: 'Scholarship', title: 'DAFI tertiary scholarship', org: 'UNHCR Kenya', detail: 'Full university scholarship for refugee students.', url: 'https://www.unhcr.org/what-we-do/build-better-futures/education/tertiary-education' },
  { type: 'Education', title: 'Bridging & TVET courses', org: 'Kakuma & Dadaab training centres', detail: 'Short technical courses that build on recognized certificates.', url: 'https://www.tveta.go.ke' },
  { type: 'Work', title: 'Refugee work permit (Class M)', org: 'Department of Refugee Services', detail: 'Use your recognized qualification to apply for formal work.', url: 'https://refugee.go.ke' },
  { type: 'Work', title: 'Teaching in camp schools', org: 'Education partners', detail: 'Recognized teachers can apply for incentive teaching posts.', url: 'https://www.tsc.go.ke' },
];
function Opportunities() {
  const { user } = useSession(); const [filter, setFilter] = useState('All');
  const { data: unlocked = false } = useQuery({ queryKey: ['unlocked', user?.id], enabled: !!user, queryFn: async () => { const { data } = await supabase.from('applications').select('stage'); return (data ?? []).some(a => opportunitiesUnlocked(a.stage)); } });
  const open = !user || unlocked; const shown = items.filter(i => filter === 'All' || i.type === filter);
  return <><PageTitle eyebrow="YOUR NEXT CHAPTER" title="Opportunities" description={!user ? 'Sample opportunities · Sign in to match them to your recognized qualifications.' : unlocked ? 'Your recognized qualification opens these pathways.' : 'These unlock once one of your qualifications is recognized.'} />
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>{['All', 'Scholarship', 'Education', 'Work'].map(f => <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)}>{f}</Button>)}</div>
    {shown.map(o => <section className="panel" key={o.title}><small>{o.type.toUpperCase()} · {o.org}</small><h3>{o.title}</h3><p>{o.detail}</p>{open ? <Button asChild variant="outline" size="sm"><a href={o.url} target="_blank" rel="noreferrer">Learn more <ArrowUpRight /></a></Button> : <p><Lock size={14} /> Unlocks after recognition. <Link to="/applications">Check my applications</Link></p>}</section>)}</>;
}
