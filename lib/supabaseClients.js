import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slbdztvvoyiwtrjwjqck.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmR6dHZ2b3lpd3RyandqcWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTg4NTcsImV4cCI6MjA0ODg3NDg1N30.zZ1KDOZzynyRIPizu5zlCkciyESCR2wPi-9AkhKr_6Q';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
