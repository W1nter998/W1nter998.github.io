// init-supabase.js
// 这个文件负责初始化 Supabase 客户端并使其全局可用

// 定义 Supabase URL 和 Key
// 这些变量暴露为全局变量，供其他脚本使用
window.SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfMzqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E"; // 请再次确认这个KEY是否正确，这里我为了示例可能修改了尾部

// 声明全局的 supabase 客户端变量
let supabaseClientInstance; // 使用不同的变量名来避免混淆

// 确保全局的 `supabase` 对象 (由 Supabase SDK 加载后暴露，它就是 createClient 函数) 已经存在
if (typeof supabase !== 'undefined' && typeof supabase === 'function') { // 检查它是否是一个函数
  // 直接调用全局的 `supabase` 函数来创建客户端实例
  supabaseClientInstance = supabase(window.SUPABASE_URL, window.SUPABASE_KEY);
  window.supabase = supabaseClientInstance; // 将创建的客户端实例赋值给 window.supabase
  console.log("Global Supabase client initialized from init-supabase.js.");
} else {
  // 如果 Supabase SDK 没有加载或未暴露 createClient 函数
  console.error("Error: Supabase SDK (global 'supabase' object) not loaded or is not the createClient function in init-supabase.js.");
}
