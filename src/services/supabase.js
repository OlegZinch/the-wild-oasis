import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://yvykkisaoyylqpjsdedw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2eWtraXNhb3l5bHFwanNkZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTE4NTIsImV4cCI6MjA3MDA2Nzg1Mn0.o6K0aRbXpiph866RZg6wwHd_pfhyuDonLlFQc1aQe_M'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
