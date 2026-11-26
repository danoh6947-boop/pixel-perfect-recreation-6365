import { createFileRoute, Link } from '@tanstack/react-router';
import { Building2, FolderLock, Files, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/rqrs/logo';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/welcome')({ head: () => pageHead('Welcome to RQRS', 'Recognizing qualifications, unlocking opportunities.'), component: Welcome });
function Welcome() {
  const steps = [{ i: Building2, t: 'Find your authority', d: 'Learn which Kenyan body recognizes your qualification.' }, { i: FolderLock, t: 'Save your documents', d: 'Keep certificates safe on your phone, even offline.' }, { i: Files, t: 'Apply and track', d: 'Submit once and follow every step.' }];
  return <main id="main-content" className="auth-content"><Logo /><h1>Welcome to RQRS</h1><p>Your qualifications matter. We help you get them recognized in Kenya.</p>{steps.map(s => <div className="panel" key={s.t}><s.i size={20} /><h3>{s.t}</h3><p>{s.d}</p></div>)}<Button asChild size="lg"><Link to="/auth">Create my account <ArrowRight /></Link></Button><Button asChild variant="link"><Link to="/">Look around first</Link></Button></main>;
}
