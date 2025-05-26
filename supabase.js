// supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://eiaxcwfyocnnwhkdgioh.supabase.co";
// 注意：在实际生产环境中，公共API Key暴露在前端是正常的，
// 但对于敏感操作，应始终在后端进行身份验证和授权，配合Supabase RLS。
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYXhjd2Z5b2Nubndoa2RnaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NzYyNjEsImV4cCI6MjA2MzU1MjI2MX0.k2SfqrA7mFieCPePznOt5joGO03b7c1DlaH5tjtYq_E";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 渲染顶部导航栏的登录/注册/退出按钮
export async function renderNavActions() {
  const { data: { user } } = await supabase.auth.getUser();
  const navActions = document.getElementById('nav-actions');
  
  // 确保导航元素存在
  if (!navActions) {
    console.warn("Element with id 'nav-actions' not found.");
    return;
  }

  navActions.innerHTML = ''; // 清空现有内容

  // 联系我们链接
  const contactLink = document.createElement('a');
  contactLink.href = 'contact.html';
  contactLink.textContent = '联系我们';
  navActions.appendChild(contactLink);

  // 语言切换器
  const langSwitcher = document.createElement('select');
  langSwitcher.className = 'lang-switcher';
  langSwitcher.id = 'lang-switcher'; // 添加ID方便JavaScript操作
  langSwitcher.innerHTML = `
    <option value="zh-CN">中文</option>
    <option value="en">English</option>
  `;
  navActions.appendChild(langSwitcher);

  // 登录/注册或用户邮箱/退出按钮
  if (user) {
    const userSpan = document.createElement('span');
    userSpan.className = 'user-email';
    userSpan.textContent = user.email;
    navActions.appendChild(userSpan);

    const logoutButton = document.createElement('button');
    logoutButton.id = 'btn-logout';
    logoutButton.className = 'nav-action-button'; // 统一按钮样式
    logoutButton.textContent = '退出';
    navActions.appendChild(logoutButton);

    logoutButton.onclick = async () => {
      await supabase.auth.signOut();
      window.location.reload(); // 退出后刷新页面
    };
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.textContent = '登录';
    navActions.appendChild(loginLink);

    const signupLink = document.createElement('a');
    signupLink.href = 'signup.html';
    signupLink.textContent = '注册';
    navActions.appendChild(signupLink);
  }

  // 为语言切换器添加事件监听器 (目前仅为占位符)
  langSwitcher.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    console.log(`语言已切换到: ${selectedLang}`);
    // 在这里添加实际的语言切换逻辑，例如：
    // updatePageLanguage(selectedLang);
  });
}

// 汉堡菜单切换逻辑
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mainNav = document.querySelector('.nav-main'); // 主导航菜单
  const header = document.querySelector('header'); // header 元素，用于添加 nav-active 类

  if (hamburgerMenu && mainNav && header) {
    hamburgerMenu.addEventListener('click', () => {
      mainNav.classList.toggle('nav-active');
      hamburgerMenu.classList.toggle('active'); // 汉堡菜单图标自身的变化
      header.classList.toggle('nav-active'); // 用于在移动端调整header高度或背景
    });
  } else {
    console.warn("Hamburger menu elements not found. Mobile menu may not function correctly.");
  }

  // 初始化导航操作区
  renderNavActions();
});