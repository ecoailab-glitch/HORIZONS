import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfmsdlvidnfydsdcifki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbXNkbHZpZG5meWRzZGNpZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODgxNTEsImV4cCI6MjA2MTE2NDE1MX0.XEdWsPoa-u5F4BLHXg-YI6kbeMXHZn5tctnexEAPH6w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);