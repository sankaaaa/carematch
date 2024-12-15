import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://lpbyvorfrzlzoycgfdln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnl2b3Jmcnpsem95Y2dmZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzU4NjksImV4cCI6MjA0OTg1MTg2OX0.uUz0IfL30gf7Ri6RT0S62Wn9dm2idHNpFT7ClYTJlgI';

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;