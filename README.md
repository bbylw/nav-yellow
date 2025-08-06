# WebNav Hub - Modern Glass Edition

一个现代化的网址导航单页应用，采用优雅的玻璃拟态设计和温暖的黄色主题。项目追求简洁、美观、高效的用户体验，为用户提供快速、直观的网站导航服务。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## ✨ 核心特性

### 🎨 现代化设计
- **玻璃拟态效果**: 采用半透明背景和模糊滤镜，营造现代感十足的视觉效果
- **统一黄色主题**: 所有导航卡片采用温暖的黄色渐变，视觉统一且醒目
- **中性色背景**: 清爽的蓝灰渐变背景，完美衬托黄色导航卡片
- **精致的阴影系统**: 多层次阴影效果，增强视觉深度和层次感

### 🚀 交互体验
- **流畅动画**: 悬停上升、点击涟漪等Material Design风格的交互反馈
- **智能滚动（主题感知）**: 导航栏在滚动时按当前主题分别应用样式
  - 亮色：白色玻璃（更强 blur、更轻阴影）
  - 暗色：深色玻璃（更低 blur、更高不透明与阴影），确保文字不发灰
- **入场动画**: 卡片进入视口时的优雅淡入效果，无显示延迟
- **响应式设计**: 完美适配桌面、平板和手机等各种设备

### 🔧 技术优化
- **零延迟显示**: 卡片默认可见，JavaScript增强而非依赖
- **字体预加载**: 确保图标字体加载完成后再执行动画
- **性能优化**: Intersection Observer API实现高效的滚动动画
- **容错处理**: JavaScript失效时仍能正常使用所有功能
- **可访问性**: 主题切换按钮带 aria-label，滚动定位时同步高亮当前导航项

### 🌐 丰富内容
- **AI工具集合**: ChatGPT、Claude、Gemini等40+个AI平台
- **开发工具**: GitHub、Vercel、Railway等开发和部署平台
- **实用服务**: 域名管理、网络测试、图床、代理等60+个工具
- **资讯娱乐**: 科技媒体、社交平台、云存储、邮箱服务

## 🏗️ 项目结构

```
navw/
├── index.html       # 页面核心结构，包含所有导航链接
├── style.css        # 现代化CSS样式，实现玻璃拟态设计
├── main.js          # 交互逻辑：动画、导航、涟漪效果
├── README.md        # 项目说明文档
├── LICENSE          # MIT开源许可证
└── icon.svg         # SVG格式网站图标
```

## 🚀 快速开始

### 静态部署
项目为纯静态页面，无需构建步骤：

```bash
# 克隆项目
git clone https://github.com/your-username/navw.git

# 直接部署到任何静态托管服务
# GitHub Pages / Netlify / Vercel / 自己的服务器
```

### 本地预览
```bash
# 使用任意本地服务器
npx serve .
# 或者
python -m http.server 8000
```

## 🎯 设计亮点

### 配色系统
```css
:root {
  /* 中性背景 - 蓝灰渐变 */
  --bg-primary: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e0 100%);
  
  /* 黄色主题 */
  --accent-primary: #ffd93d;
  --accent-secondary: #ffed4a;
  --accent-tertiary: #f6d55c;
  
  /* 文字颜色 */
  --text-primary: #2d3748;
  --text-secondary: rgba(45, 55, 72, 0.7);
}
```

### 核心技术特性
- **CSS Grid & Flexbox**: 现代化布局系统
- **CSS Custom Properties**: 主题色彩统一管理  
- **Backdrop Filter**: 玻璃拟态背景模糊效果
- **Intersection Observer**: 高性能滚动动画
- **CSS Transform**: 硬件加速的3D变换

### 性能优化策略
- **关键CSS内联**: 避免渲染阻塞
- **字体预连接**: `<link rel="preconnect">` 加速字体加载
- **图标延迟加载**: Font Awesome按需加载
- **脚本defer**: 非阻塞JavaScript执行
- **动画优化**: 使用transform避免重排重绘
- **触控优化**: 针对 hover:none / pointer:coarse 设备降低阴影与动效幅度，提升稳定与续航

## 🛠️ 自定义指南

### 添加新的导航链接
在对应分类的`.link-grid`中添加：
```html
<div class="link-card">
  <a href="https://example.com" target="_blank"></a>
  <i class="fa-solid fa-star"></i>
  <h3>网站名称</h3>
</div>
```

### 添加新分类
1. 在导航栏添加链接：
```html
<li><a href="#new-category">新分类</a></li>
```

2. 在主内容区添加分类：
```html
<h2 class="category-title" id="new-category" tabindex="-1">新分类</h2>
<section class="link-grid">
  <!-- 添加卡片 -->
</section>
```

### 修改主题色彩
在`style.css`顶部的`:root`中修改CSS变量：
```css
:root {
  --accent-primary: #your-color;  /* 修改主色调 */
  --bg-primary: your-gradient;    /* 修改背景渐变 */
}
```

## 🌟 特色功能

### 智能动画系统
- **视口检测**: 首屏卡片立即显示，屏幕外卡片滚动显示
- **性能友好**: 动画完成后自动停止观察，节省资源
- **优雅降级**: 不支持现代API时自动回退到静态显示

### 交互细节
- **Material Design涟漪**: 点击时的圆形扩散效果
- **微动画**: 悬停时卡片轻微上浮和缩放
- **智能导航（主题感知）**: 滚动时导航栏根据 data-theme 分支调整玻璃层与阴影，暗色下始终保持高对比文字
- **平滑滚动**: 锚点跳转使用CSS smooth行为

## 📱 响应式设计

| 断点 | 屏幕尺寸 | 网格列数 | 特殊优化 |
|------|----------|----------|----------|
| Desktop | >1200px | auto-fill(150px) | 完整功能 |
| Tablet | 768-1200px | auto-fill(140px) | 优化间距 |
| Mobile | 480-768px | auto-fill(130px) | 精简导航 |
| Small | <480px | 2列固定 | 最小化UI |

## 🔍 浏览器兼容性

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ IE 不支持 (使用现代浏览器获得最佳体验)

## 🌓 主题与可定制
- **双通道暗色模式**:
  - 自动遵循系统偏好 `prefers-color-scheme: dark`；
  - 显式覆盖：通过 `:root[data-theme="dark"]` 精细化变量与组件外观。
- **主题开关按钮**: 导航栏右侧提供显式切换，图标随主题过渡（太阳/月亮）。
  开发者可以在 JS 中调用 [`window.toggleTheme()`](main.js:31) 进行程序化切换。
- **滚动样式联动**: 通过主题感知的滚动样式函数，在切换主题后使用 [`MutationObserver`](main.js:169) 立即重算导航行内样式，避免对比异常。

## 📊 性能指标

- **首次内容绘制 (FCP)**: < 1.2s
- **最大内容绘制 (LCP)**: < 2.5s  
- **首次输入延迟 (FID)**: < 100ms
- **累积布局偏移 (CLS)**: < 0.1

## 🤝 贡献指南

欢迎提交Issues和Pull Requests！

### 开发指南
1. Fork项目到你的GitHub账户
2. 创建feature分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送到分支: `git push origin feature/AmazingFeature`
5. 创建Pull Request

#### 本次重要变更（Changelog）
- UI：导航卡片渐变与高光层全面升级，动效曲线优化。
- 触控：在触控设备上降低阴影与动效幅度。
- 主题：新增显式 `data-theme` 切换与持久化（`localStorage`），提供导航栏主题按钮与图标交互。
- 暗色：修复滚动后暗色主题导航栏文字发灰问题，采用主题感知的滚动样式与较低 blur，显著提升对比度。
- 可维护性：监听 `data-theme` 变化实时刷新导航样式，避免旧行内样式残留。

### 代码规范
- HTML使用语义化标签
- CSS遵循BEM命名规范
- JavaScript使用ES6+语法
- 保持代码简洁和注释清晰

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

---

<p align="center">
  <strong>WebNav Hub</strong> - 现代化网址导航的最佳选择
  <br>
  <em>简洁 · 优雅 · 高效</em>
</p>