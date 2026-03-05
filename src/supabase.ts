import { createClient } from '@supabase/supabase-js';

// ⚠️ Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://bumtzmkuxlszmqzagdoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bXR6bWt1eGxzem1xemFnZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTIwMjksImV4cCI6MjA2MzM2ODAyOX0.1Kpo--rEX6xx8WWWAJZmtZxO-_ZqPMOy7bKxobO4yxM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
