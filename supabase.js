// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase 项目地址和匿名 key
const SUPABASE_URL = 'https://eiaxcwfyocnnwhkdgioh.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2NubndoaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)