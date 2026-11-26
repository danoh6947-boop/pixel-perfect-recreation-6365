import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/opportunities')({ head: () => pageHead('Opportunities', 'Scholarships, education pathways and work for recognized qualifications.'), component: Page });
function Page() { return <><PageTitle eyebrow="YOUR NEXT CHAPTER" title="Opportunities" description="Scholarships, education pathways and work for recognized qualifications."/><section className="panel"><p>Opportunities open once a qualification is recognized.</p><Button asChild variant="outline"><Link to="/">Back to overview</Link></Button></section></>; }
