// init-supabase.js
// 这个文件负责初始化 Supabase 客户端并使其全局可用

// 定义 Supabase URL 和 Key
// 这些变量暴露为全局变量，供其他脚本使用
window.SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E";

// 声明全局的 supabase 客户端变量
// 确保全局的 `supabase` 对象 (由 Supabase SDK 加载后暴露) 已经存在
if (typeof supabase !== 'undefined' && supabase.createClient) {
  // 使用全局的 `supabase` 对象来创建客户端实例
  window.supabase = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
  console.log("Global Supabase client initialized from init-supabase.js.");
} else {
  // 如果 Supabase SDK 没有加载或未暴露 createClient 方法
  console.error("Error: Supabase SDK (global 'supabase' object) not loaded or 'createClient' method not found in init-supabase.js.");
  // 可以在这里设置一个标志或全局错误消息，以便前端在 DOMContentLoaded 中检查
}

// 注意：这里不再需要 DOMContentLoaded 或 window.onload 监听器，
// 因为 `defer` 属性已经保证了脚本的加载和执行顺序。
