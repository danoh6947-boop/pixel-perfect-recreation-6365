import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from '@/components/rqrs/dashboard';
import { pageHead } from '@/lib/rqrs';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => pageHead('My qualification dashboard', 'Track your refugee qualification recognition, manage documents, and find education and career opportunities in Kenya.'),
  component: Dashboard,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
