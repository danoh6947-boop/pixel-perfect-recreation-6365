import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/rqrs/ui';
import { pageHead } from '@/lib/rqrs';
export const Route = createFileRoute('/settings')({ head: () => pageHead('Settings', 'Manage your profile, language and notification preferences.'), component: Page });
function Page() { return <><PageTitle eyebrow="YOUR ACCOUNT" title="Settings" description="Manage your profile, language and notification preferences."/><section className="panel"><p>SMS and WhatsApp updates are coming soon.</p><Button asChild variant="outline"><Link to="/">Back to overview</Link></Button></section></>; }
