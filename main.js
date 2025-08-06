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

  // 为所有 target=_blank 外链补充安全属性
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
  // 添加滚动时的导航栏效果
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      nav.style.background = 'rgba(255, 255, 255, 0.9)';
      nav.style.backdropFilter = 'blur(25px)';
      nav.style.boxShadow = '0 2px 20px rgba(45, 55, 72, 0.1)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.8)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.boxShadow = '0 1px 3px rgba(45, 55, 72, 0.05)';
    }
    
    lastScrollY = currentScrollY;
  });

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
});