// init-supabase.js
// 这个文件负责初始化 Supabase 客户端并使其全局可用

// 定义 Supabase URL 和 Key
// 这些变量暴露为全局变量，供其他脚本使用
window.SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E";

// 在 DOMContentLoaded 事件中初始化 Supabase 客户端
document.addEventListener('DOMContentLoaded', () => {
  // 检查全局的 `supabase` 对象是否存在 (由 Supabase SDK 加载后暴露)
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    // 使用全局的 `supabase` 对象来创建客户端实例
    window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
    console.log("Global Supabase client initialized from init-supabase.js.");
  } else {
    // 如果 Supabase SDK 没有加载或未暴露 createClient 方法
    console.error("Supabase SDK (global 'supabase' object) not loaded or 'createClient' method not found in init-supabase.js.");
    // 页面上的错误消息可能会在 signup.html 的 DOMContentLoaded 逻辑中处理
  }
});

// 作为额外的保障，也可以在 window.onload 中再次检查和初始化
window.onload = () => {
  if (typeof window.supabase === 'undefined' || !window.supabase.auth) { // 只有在没有初始化的情况下才尝试
    if (typeof supabase !== 'undefined' && supabase.createClient) {
      window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
      console.log("Global Supabase client initialized (fallback) from init-supabase.js.");
    }
  }
};
