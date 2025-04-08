<template>
    <div class="home-root">
    <!-- 导航栏 -->
    <nav class="navbar">
        <div class="logo">
            <div class="logo-icon">📚</div>
            <span>知汇</span>
        </div>
        <div class="nav-links">
            <a href="#" class="nav-link active">我的学习舱</a>
            <a href="#" class="nav-link">AI实验室</a>
            <a href="#" class="nav-link">灵感社区</a>
        </div>
        <div class="search-bar">
            🔍
            <input type="text" placeholder="搜索知识或提问..." />
        </div>
    </nav>

    <!-- 主内容区 -->
    <div class="container">
        <div class="main-content">
            <!-- 英雄区域 -->
            <section class="hero-section">
                <h1 class="hero-title">构建你的个人知识宇宙</h1>
                <p class="hero-subtitle">
                    知汇将AI智能、知识管理与学习社区完美融合，为每位学习者打造专属的成长空间
                </p>
            </section>

            <!-- 核心功能卡片 -->
            <div class="card-grid">
                <div class="card" :style="{ animationDelay: '0.1s' }">
                    <div class="card-header">
                        <div class="card-icon">📊</div>
                        <h3 class="card-title">学习仪表盘</h3>
                    </div>
                    <p class="card-content">实时追踪学习进度，可视化分析知识掌握情况，智能推荐学习路径</p>
                </div>
                <div class="card" :style="{ animationDelay: '0.2s' }">
                    <div class="card-header">
                        <div class="card-icon">✍️</div>
                        <h3 class="card-title">智能笔记系统</h3>
                    </div>
                    <p class="card-content">三栏式Markdown编辑器，AI辅助写作，知识卡片自动关联</p>
                </div>
                <div class="card" :style="{ animationDelay: '0.3s' }">
                    <div class="card-header">
                        <div class="card-icon">🤖</div>
                        <h3 class="card-title">AI交互中心</h3>
                    </div>
                    <p class="card-content">自然语言提问，智能解答，学习内容一键润色，知识图谱自动构建</p>
                </div>
            </div>

            <!-- 特色功能 -->
            <section class="feature-section">
                <h2 class="section-title">核心特色</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⏱️</div>
                        <h3 class="feature-title">专注学习管理</h3>
                        <p class="feature-desc">四象限待办矩阵，番茄钟计时，学习时长热力图分析，培养深度专注习惯</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🌐</div>
                        <h3 class="feature-title">知识社交网络</h3>
                        <p class="feature-desc">精选笔记分享，互动式知识卡片，学习小组协作，构建你的学术社交圈</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📈</div>
                        <h3 class="feature-title">成长可视化</h3>
                        <p class="feature-desc">学习轨迹日历，知识资产图谱，成就徽章系统，让进步看得见</p>
                    </div>
                </div>
            </section>

            <!-- 数据可视化 -->
            <section class="data-section">
                <h2 class="section-title">你的知识资产</h2>
                <div class="data-card">
                    <div class="data-header">
                        <h3 class="data-title">学习概览</h3>
                    </div>
                    <div class="data-content">
                        <div class="data-item">
                            <div class="data-value">1,248</div>
                            <div class="data-label">累计学习分钟</div>
                        </div>
                        <div class="data-item">
                            <div class="data-value">87</div>
                            <div class="data-label">知识卡片</div>
                        </div>
                        <div class="data-item">
                            <div class="data-value">23</div>
                            <div class="data-label">思维导图</div>
                        </div>
                        <div class="data-item">
                            <div class="data-value">5</div>
                            <div class="data-label">成就徽章</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <p>© 2025 知汇 - 个人学习管理平台</p>
    </footer>
</div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // 滚动动画触发
    const cards = document.querySelectorAll('.card, .feature-card, .data-card')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1
                entry.target.style.transform = 'translateY(0)'
            }
        })
    }, { threshold: 0.1 })

    cards.forEach(card => {
        observer.observe(card)
    })
})
</script>

<style scoped>
.home-root {
  /* 定义组件级 CSS 变量 */
  --primary-bg: #F5F9FF;
  --primary-color: #2A6EBB;
  --primary-light: #E3F2FD;
  --text-color: #333;
  --text-light: #666;
  --card-bg: rgba(255, 255, 255, 0.85);
  --card-shadow: 0 8px 32px rgba(42, 110, 187, 0.1);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --glass-effect: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  --spacing-unit: 24px;
}

@media (prefers-color-scheme: dark) {
  .home-root {
    --primary-bg: #1B263B;
    --primary-color: #5393FF;
    --primary-light: rgba(83, 147, 255, 0.15);
    --text-color: #eee;
    --text-light: #aaa;
    --card-bg: rgba(27, 38, 59, 0.7);
    --card-shadow: 0 8px 32px rgba(83, 147, 255, 0.15);
  }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    background: var(--primary-bg);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
    background-image: radial-gradient(circle at 10% 20%, var(--primary-light) 0%, transparent 20%);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-unit);
}

/* 导航栏 */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 72px;
    backdrop-filter: blur(12px);
    background: var(--card-bg);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing-unit);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--primary-color);
}

.logo-icon {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    background: var(--glass-effect);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-links {
    display: flex;
    margin: 0 auto;
}

.nav-link {
    padding: 8px 16px;
    margin: 0 8px;
    border-radius: var(--border-radius);
    transition: var(--transition);
    font-weight: 500;
    position: relative;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
    color: var(--primary-color);
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 3px;
}

.search-bar {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 8px 16px;
    width: 240px;
    transition: var(--transition);
}

.search-bar:focus-within {
    width: 280px;
    background: rgba(255, 255, 255, 0.3);
}

.search-bar input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    color: var(--text-color);
    padding-left: 8px;
}

/* 主内容区 */
.main-content {
    margin-top: 96px;
    padding-bottom: 60px;
}

.hero-section {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit) * 2);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s forwards;
}

.hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-unit);
    background: linear-gradient(90deg, var(--primary-color), #4FC3F7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
}

/* 卡片布局 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-unit);
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: calc(var(--spacing-unit) * 1.5);
    box-shadow: var(--card-shadow);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: var(--transition);
    opacity: 0;
    transform: translateY(20px);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(12, 51, 96, 0.15);
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-unit);
}

.card-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--glass-effect);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    color: var(--primary-color);
    font-size: 1.2rem;
}

.card-title {
    font-size: 1.2rem;
    font-weight: 600;
}

.card-content {
    color: var(--text-light);
    margin-bottom: var(--spacing-unit);
}

/* 特色模块 */
.feature-section {
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-unit);
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 3px;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-unit);
}

.feature-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: var(--spacing-unit);
    box-shadow: var(--card-shadow);
    transition: var(--transition);
    opacity: 0;
    transform: translateY(20px);
}

.feature-card:nth-child(1) {
    animation: fadeInUp 0.6s 0.1s forwards;
}

.feature-card:nth-child(2) {
    animation: fadeInUp 0.6s 0.2s forwards;
}

.feature-card:nth-child(3) {
    animation: fadeInUp 0.6s 0.3s forwards;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(12, 51, 96, 0.15);
}

.feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--glass-effect);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    color: var(--primary-color);
    font-size: 1.5rem;
}

.feature-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.feature-desc {
    color: var(--text-light);
    font-size: 0.95rem;
}

/* 数据可视化 */
.data-section {
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.data-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: var(--spacing-unit);
    box-shadow: var(--card-shadow);
    margin-bottom: var(--spacing-unit);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s 0.4s forwards;
}

.data-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(12, 51, 96, 0.15);
}

.data-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-unit);
}

.data-title {
    font-size: 1.2rem;
    font-weight: 600;
}

.data-content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-unit);
}

.data-item {
    flex: 1;
    min-width: 200px;
    background: var(--glass-effect);
    border-radius: var(--border-radius);
    padding: var(--spacing-unit);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.data-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 8px;
}

.data-label {
    color: var(--text-light);
    font-size: 0.9rem;
}

/* 页脚 */
.footer {
    text-align: center;
    padding: var(--spacing-unit) 0;
    color: var(--text-light);
    font-size: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式调整 */
@media (max-width: 768px) {
    .navbar {
        height: 60px;
    }

    .nav-links {
        display: none;
    }

    .search-bar {
        width: 180px;
    }

    .search-bar:focus-within {
        width: 220px;
    }

    .main-content {
        margin-top: 80px;
    }

    .hero-title {
        font-size: 2rem;
    }

    .card-grid {
        grid-template-columns: 1fr;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }
}
</style>