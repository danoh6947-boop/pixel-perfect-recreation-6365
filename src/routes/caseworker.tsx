import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/caseworker')({ head: () => pageHead('Caseworker workspace', 'Review and support applicant qualification journeys.'), component: Page });
function Page() { return <><PageTitle eyebrow="CASEWORKERS" title="Caseworker workspace" description="Review and support applicant qualification journeys."/><section className="panel"><p>Authorized caseworkers will see assigned applications here.</p><Button asChild variant="outline"><Link to="/">Back to overview</Link></Button></section></>; }
