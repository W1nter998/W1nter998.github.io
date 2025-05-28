// supabase.js
// 定义 Supabase URL 和 Key
const SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E";

// 声明全局的 supabase 客户端变量
let supabase;

// 定义一个函数来初始化 Supabase 客户端
function initializeSupabaseClient() {
  if (typeof supabaseJs !== 'undefined' && supabaseJs.createClient) {
    supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Global Supabase client initialized from supabase.js.");
    // 确保 `SUPABASE_URL` 也可以被其他脚本访问（用于Edge Function调用）
    window.SUPABASE_URL = SUPABASE_URL; 
  } else {
    console.error("Supabase SDK (supabaseJs) not loaded or 'createClient' method not found in supabase.js.");
    // 可以设置一个重试机制，或者在页面上显示错误
    document.getElementById('signup-message').textContent = '初始化Supabase失败，请稍后再试。';
    document.getElementById('signup-message').style.color = 'var(--error-color)';
  }
}

// 监听 DOMContentLoaded 事件，确保所有 <script defer> 脚本都被解析和执行
// 这样可以确保 supabase.min.js 已经加载并定义了 supabaseJs
document.addEventListener('DOMContentLoaded', () => {
  initializeSupabaseClient();
});

// 作为 fallback，如果 DOMContentLoaded 事件监听器由于某种原因没有触发，
// 也可以使用 window.onload (在所有资源加载完毕后触发)
window.onload = () => {
  if (typeof supabase === 'undefined') { // 只有在之前没有初始化的情况下才尝试初始化
    initializeSupabaseClient();
  }
};
