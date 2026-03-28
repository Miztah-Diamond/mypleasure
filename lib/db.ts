import { createAdminClient } from '@/lib/supabase/admin'

// Get a Supabase admin client (service role — bypasses RLS)
export function getDb() {
  return createAdminClient()
}
