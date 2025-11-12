import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ydrpivqejrqrthhgwaja.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcnBpdnFlanJxcnRoaGd3YWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzU0ODMsImV4cCI6MjA3NjYxMTQ4M30.Enko5QUbkHv1NgBaEzQqsXPBiC-CYLupQZpX1NbNot0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);