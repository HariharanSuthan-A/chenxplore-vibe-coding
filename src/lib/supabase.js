import { createClient } from '@supabase/supabase-js'

// Use environment variables or fallback to demo values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bowdcxqwoqiwsihqcenv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvd2RjeHF3b3Fpd3NpaHFjZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODE4NzQsImV4cCI6MjA4NTc1Nzg3NH0.7aoMfId4jZRwCunXaN04-RI_o_BaWYhHrhaPpt4NTMs'

export const supabase = createClient(supabaseUrl, supabaseKey)
