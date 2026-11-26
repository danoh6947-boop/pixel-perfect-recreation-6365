import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/wallet')({ head: () => pageHead('Qualification wallet', 'Keep your certificates and transcripts together, safely.'), component: Page });
function Page() { return <><PageTitle eyebrow="YOUR DOCUMENTS" title="Qualification wallet" description="Keep your certificates and transcripts together, safely."/><section className="panel"><p>Sign in to upload and manage your private documents.</p><Button asChild variant="outline"><Link to="/">Back to overview</Link></Button></section></>; }
