// navigation.js

import { supabase } from './supabase.js';

// 导航菜单数据结构
const navLinks = [
  { text: '首页', href: 'index.html' },
  {
    text: '关于我们',
    href: 'about.html',
    dropdown: [
      { text: '公司介绍', href: 'about.html' }
    ]
  },
  {
    text: '知识分享',
    href: 'knowledge.html',
    dropdown: [
      { text: '财税知识', href: 'knowledge.html' }
    ]
  },
  {
    text: '服务范围',
    href: 'services.html',
    dropdown: [
      { text: '服务清单', href: 'services.html' }
    ]
  },
  {
    text: '热点新闻',
    href: 'news.html',
    dropdown: [
      { text: '行业资讯', href: 'news.html' }
    ]
  },
  { text: '论坛', href: 'forum.html' },
];

/**
 * 动态生成导航菜单并渲染到指定容器
 * @param {string} containerId - 导航菜单要插入的容器ID
 * @param {string} currentPage - 当前页面的文件名 (e.g., 'index.html', 'forum.html')
 */
export async function renderNavigationBar(containerId, currentPage) {
  const navContainer = document.getElementById(containerId);
  if (!navContainer) {
    console.error(`导航容器元素未找到: #${containerId}`);
    return;
  }

  // 清空现有内容
  navContainer.innerHTML = '';

  const currentPath = window.location.pathname.split('/').pop();

  // 创建主导航菜单 (ul.nav-main)
  const navMain = document.createElement('ul');
  navMain.className = 'nav-main';

  navLinks.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;

    // 高亮当前页面
    if (currentPath === link.href) {
      a.classList.add('active');
    }

    if (link.dropdown) {
      li.classList.add('dropdown');
      // 为下拉菜单添加点击事件，以支持移动端
      a.addEventListener('click', (e) => {
        // 在桌面端不阻止默认跳转，在移动端阻止默认跳转并切换下拉菜单
        if (window.innerWidth <= 768) { // 假设 768px 是移动端断点
          e.preventDefault();
          li.classList.toggle('dropdown-active'); // 切换下拉菜单的显示
        }
      });

      const dropdownMenu = document.createElement('ul');
      dropdownMenu.className = 'dropdown-menu';
      link.dropdown.forEach(subLink => {
        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.href = subLink.href;
        subA.textContent = subLink.text;
        subLi.appendChild(subA);
        dropdownMenu.appendChild(subLi);
      });
      li.appendChild(a);
      li.appendChild(dropdownMenu);
    } else {
      li.appendChild(a);
    }
    navMain.appendChild(li);
  });

  // 创建导航操作区 (nav-actions)
  const navActions = document.createElement('div');
  navActions.className = 'nav-actions';
  navActions.id = 'nav-actions'; // 添加ID方便后续Supabase登录状态渲染

  // 联系我们链接
  const contactLink = document.createElement('a');
  contactLink.href = 'contact.html';
  contactLink.textContent = '联系我们';
  navActions.appendChild(contactLink);

  // 语言切换器 (占位符)
  const langSwitcher = document.createElement('select');
  langSwitcher.className = 'lang-switcher';
  langSwitcher.id = 'lang-switcher';
  langSwitcher.innerHTML = `
    <option value="zh-CN">中文</option>
    <option value="en">English</option>
  `;
  // 语言切换功能待实现
  langSwitcher.addEventListener('change', (event) => {
    console.log(`语言已切换到: ${event.target.value}`);
    // 在这里添加实际的语言切换逻辑
  });
  navActions.appendChild(langSwitcher);

  // 汉堡菜单图标
  const hamburgerMenu = document.createElement('div');
  hamburgerMenu.className = 'hamburger-menu';
  hamburgerMenu.id = 'hamburger-menu';
  hamburgerMenu.innerHTML = `<span></span><span></span><span></span>`;

  // 将所有元素添加到容器
  navContainer.appendChild(navMain);
  navContainer.appendChild(navActions);
  navContainer.appendChild(hamburgerMenu); // 汉堡菜单在主导航之后，方便定位

  // 汉堡菜单事件监听
  hamburgerMenu.addEventListener('click', () => {
    navMain.classList.toggle('nav-active'); // 激活主导航
    hamburgerMenu.classList.toggle('active'); // 激活汉堡菜单动画
    // 在移动端，可能需要调整 header 的高度或样式，这里可以直接操作 header
    document.querySelector('header').classList.toggle('nav-active');
  });

  // 渲染登录/注册/退出状态
  await renderAuthStatus(navActions);

  // 监听 Supabase 认证状态变化，重新渲染导航操作区
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event, session);
    await renderAuthStatus(navActions);
  });

  // 当点击导航菜单外部时收起移动端菜单和下拉菜单
  document.addEventListener('click', (event) => {
    const isClickInsideNav = navContainer.contains(event.target);
    const isClickInsideHamburger = hamburgerMenu.contains(event.target);

    if (window.innerWidth <= 768 && !isClickInsideNav && !isClickInsideHamburger) {
      if (navMain.classList.contains('nav-active')) {
        navMain.classList.remove('nav-active');
        hamburgerMenu.classList.remove('active');
        document.querySelector('header').classList.remove('nav-active');
      }
    }

    // 关闭所有打开的下拉菜单（桌面端和移动端）
    document.querySelectorAll('.dropdown-active').forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('dropdown-active');
      }
    });
  });

  // 在窗口大小变化时调整菜单状态
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMain.classList.remove('nav-active');
      hamburgerMenu.classList.remove('active');
      document.querySelector('header').classList.remove('nav-active');
      // 桌面端时确保所有下拉菜单可见
      document.querySelectorAll('.dropdown').forEach(li => li.classList.remove('dropdown-active'));
    }
  });

}

// 渲染用户登录状态（内部函数，由 renderNavigationBar 调用）
async function renderAuthStatus(navActionsElement) {
  const { data: { user } } = await supabase.auth.getUser();

  // 移除旧的登录/注册/退出元素，只保留联系我们和语言切换
  Array.from(navActionsElement.children).forEach(child => {
    if (child.id === 'user-auth-area' || child.id === 'btn-logout' || child.id === 'login-link' || child.id === 'signup-link') {
      navActionsElement.removeChild(child);
    }
  });

  const authDiv = document.createElement('div');
  authDiv.id = 'user-auth-area'; // 为auth相关元素创建一个容器

  if (user) {
    const userSpan = document.createElement('span');
    userSpan.className = 'user-email';
    userSpan.textContent = user.email;
    authDiv.appendChild(userSpan);

    const logoutButton = document.createElement('button');
    logoutButton.id = 'btn-logout';
    logoutButton.className = 'nav-action-button';
    logoutButton.textContent = '退出';
    logoutButton.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('退出失败:', error.message);
        alert('退出失败，请重试。');
      } else {
        console.log('用户已退出');
        // 退出后，刷新当前页面或重定向到首页
        window.location.reload();
      }
    });
    authDiv.appendChild(logoutButton);
  } else {
    const loginLink = document.createElement('a');
    loginLink.id = 'login-link';
    loginLink.href = 'login.html';
    loginLink.textContent = '登录';
    authDiv.appendChild(loginLink);

    const signupLink = document.createElement('a');
    signupLink.id = 'signup-link';
    signupLink.href = 'signup.html';
    signupLink.textContent = '注册';
    authDiv.appendChild(signupLink);
  }
  navActionsElement.appendChild(authDiv);
}

// 确保DOM加载完成后再渲染导航
document.addEventListener('DOMContentLoaded', () => {
    // 调用 navContainer 渲染，currentPage 参数用于高亮当前页面
    // 这里需要根据每个页面的实际文件名来传入正确的 currentPage
    // 例如，在 index.html 中调用 renderNavigationBar('nav-container', 'index.html');
    // 在 forum.html 中调用 renderNavigationBar('nav-container', 'forum.html');
    // 稍后在每个HTML文件中会统一更新
});