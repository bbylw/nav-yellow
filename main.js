document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");
 
  // 预加载优化 - 确保字体图标已加载
  function ensureFontsLoaded() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready;
    }
    // 降级处理：等待一个短暂的延迟
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  // 主题切换：通过 data-theme 属性显式控制（优先级高于系统偏好）
  const root = document.documentElement;
  const THEME_KEY = 'webnav-theme';
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // 若无保存，默认不设置 data-theme，让 CSS 的 prefers-color-scheme 生效
    return null;
  }
  applyTheme(getPreferredTheme());

  // 可选：若页面需要开关按钮，支持通过自定义事件触发切换
  window.toggleTheme = function (next) {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const target = next || (current === 'dark' ? 'light' : 'dark');
    applyTheme(target);
    localStorage.setItem(THEME_KEY, target);
  };
 
  // 主题切换：通过 data-theme 属性显式控制（优先级高于系统偏好）
  if (!window.__webnavThemeInit__) {
    const rootEl = document.documentElement;
    const THEME_KEY = 'webnav-theme';
    function applyTheme(theme) {
      if (theme === 'dark') {
        rootEl.setAttribute('data-theme', 'dark');
      } else {
        rootEl.removeAttribute('data-theme');
      }
    }
    function getPreferredTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      // 若无保存，默认不设置 data-theme，让 CSS 的 prefers-color-scheme 生效
      return null;
    }
    applyTheme(getPreferredTheme());
    // 对外暴露切换方法
    window.toggleTheme = function (next) {
      const current = rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const target = next || (current === 'dark' ? 'light' : 'dark');
      applyTheme(target);
      localStorage.setItem(THEME_KEY, target);
    };
    // 防重复初始化标记
    window.__webnavThemeInit__ = true;
  }
 
  // 为所有 target="_blank" 外链补充安全属性
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });
 
  // 仅处理站内锚点的点击，外链不拦截
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      if (!href.startsWith("#")) {
        // 外链：不处理 active 状态也不阻止默认行为
        return;
      }
 
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
 
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
 
        const newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "#" +
          targetId;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    });
  });
 
  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        const activeLink = document.querySelector('nav a[href="' + hash + '"]');
        if (activeLink) {
          navLinks.forEach((l) => l.classList.remove("active"));
          activeLink.classList.add("active");
        }
      }
    }
  }
 
  window.addEventListener("hashchange", handleHashChange);
  // 首次载入时按现有 hash 定位并高亮
  handleHashChange();
 
  // 增强的视觉效果和交互
  // 添加滚动时的导航栏效果（根据当前主题分别设置，避免暗色下文字变灰）
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('nav');
  
  function applyNavStyleByTheme(scrolled) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!nav) return;
    if (isDark) {
      // 暗色主题：降低 blur、提高不透明度与阴影深度，增强前景对比
      if (scrolled) {
        nav.style.background = 'rgba(17, 24, 39, 0.78)';   // #111827
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.boxShadow = '0 2px 18px rgba(0,0,0,0.45)';
      } else {
        nav.style.background = 'rgba(17, 24, 39, 0.68)';
        nav.style.backdropFilter = 'blur(14px)';
        nav.style.boxShadow = '0 1px 12px rgba(0,0,0,0.35)';
      }
      // 强制文字与图标使用高对比颜色（避免受背景影响视觉发灰）
      nav.style.color = '#eef2f7';
    } else {
      // 亮色主题维持原有白色玻璃方案
      if (scrolled) {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.backdropFilter = 'blur(25px)';
        nav.style.boxShadow = '0 2px 20px rgba(45, 55, 72, 0.1)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.boxShadow = '0 1px 3px rgba(45, 55, 72, 0.05)';
      }
      nav.style.color = '';
    }
  }
  // 初始应用一次
  applyNavStyleByTheme(window.scrollY > 100);
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    applyNavStyleByTheme(currentScrollY > 100);
    lastScrollY = currentScrollY;
  });
  
  // 监听 data-theme 变化（通过切换按钮或系统设置），实时刷新 nav 行内样式
  const themeObserver = new MutationObserver(() => {
    applyNavStyleByTheme(window.scrollY > 100);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
 
  // 优化的卡片动画 - 减少延迟
  ensureFontsLoaded().then(() => {
    const cards = document.querySelectorAll('.link-card');
    
    // 立即检查是否支持Intersection Observer
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
 
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            if (card.classList.contains('animate-in')) {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              card.classList.remove('animate-in');
            }
            observer.unobserve(card); // 停止观察已动画的元素
          }
        });
      }, observerOptions);
 
      // 为卡片添加动画类并观察
      cards.forEach((card, index) => {
        // 首屏卡片立即显示，其他的添加动画类
        const rect = card.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) {
          card.classList.add('animate-in');
          // 立即开始观察，不需要延迟
          observer.observe(card);
        }
      });
    } else {
      // 降级处理：不支持IntersectionObserver时立即显示所有卡片
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  });
 
  // 为卡片添加点击涟漪效果
  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(45, 55, 72, 0.2);
        width: 10px;
        height: 10px;
        left: ${x - 5}px;
        top: ${y - 5}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 999;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
 
  // 添加涟漪动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // 主题按钮事件绑定与图标状态初始化
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const updateIcons = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const sun = themeBtn.querySelector('.theme-icon-sun');
      const moon = themeBtn.querySelector('.theme-icon-moon');
      if (sun && moon) {
        sun.style.opacity = isDark ? '0' : '1';
        sun.style.transform = isDark ? 'rotate(45deg) scale(0.8)' : 'rotate(0deg) scale(1)';
        moon.style.opacity = isDark ? '1' : '0';
        moon.style.transform = isDark ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(0.8)';
      }
    };
    themeBtn.addEventListener('click', () => {
      window.toggleTheme();
      updateIcons();
    });
    // 初始根据当前主题设置图标可见性
    updateIcons();
  }
});