import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udxooyigxptdfqdwqmdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeG9veWlneHB0ZGZxZHdxbWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDczNjYsImV4cCI6MjA4NDcyMzM2Nn0.OH_H9qabumopQDnXw160fiTVFI-g0p3IcrmLDk_UaBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
