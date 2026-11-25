import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
type SessionValue = { user: User | null; loading: boolean };
const SessionContext = createContext<SessionValue>({ user: null, loading: true });
export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true); const queryClient = useQueryClient();
  useEffect(() => { let alive = true; supabase.auth.getUser().then(({ data }) => { if (alive) { setUser(data.user); setLoading(false); } }); const { data: listener } = supabase.auth.onAuthStateChange((event, session) => { if (event !== 'SIGNED_IN' && event !== 'SIGNED_OUT' && event !== 'USER_UPDATED') return; setUser(session?.user ?? null); setLoading(false); queryClient.clear(); }); return () => { alive = false; listener.subscription.unsubscribe(); }; }, [queryClient]);
  return <SessionContext.Provider value={{ user, loading }}>{children}</SessionContext.Provider>;
}
export function useSession() { return useContext(SessionContext); }