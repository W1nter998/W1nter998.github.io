// supabase.js
const SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E";

// 将 supabase 客户端设置为全局变量
// 确保 supabaseJs 已经通过 CDN 加载
let supabase;
try {
  if (typeof supabaseJs !== 'undefined' && supabaseJs.createClient) {
    supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Global Supabase client initialized from supabase.js.");
  } else {
    console.error("Supabase SDK (supabaseJs) not loaded or 'createClient' method not found.");
  }
} catch (e) {
  console.error("Error initializing global Supabase client in supabase.js:", e);
}

// 确保 SUPABASE_URL 和 SUPABASE_KEY 也能在其他脚本中访问（可选，如果需要）
// window.SUPABASE_URL = SUPABASE_URL;
// window.SUPABASE_KEY = SUPABASE_KEY;
