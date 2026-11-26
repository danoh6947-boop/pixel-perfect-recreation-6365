import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/welcome')({ head: () => pageHead('Welcome to RQRS', 'Recognizing qualifications, unlocking opportunities.'), component: Page });
function Page() { return <><PageTitle eyebrow="WELCOME" title="Welcome to RQRS" description="Recognizing qualifications, unlocking opportunities."/><section className="panel"><p>Start by finding the right authority for your qualification.</p><Button asChild variant="outline"><Link to="/">Back to overview</Link></Button></section></>; }
