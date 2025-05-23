// supabase.js
import { createClient as _createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const createClient = (url, key) => {
  return _createClient(url, key);
};

// 全局实例
export const supabase = createClient(
  'https://eiaxcwfyocnnwhkdgioh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2NubndoaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E'
);