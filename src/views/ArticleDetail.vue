<template>
  <div class="article-detail-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">知识圈</span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb-item">人工智能</span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb-item">机器学习</span>
      <span class="separator">&gt;</span>
      <span class="breadcrumb-item active">深度学习基础</span>
    </div>

    <!-- 文章标题区域 -->
    <div class="article-header">
      <h1 class="article-title">深度学习基础：神经网络架构与优化策略</h1>
      <div class="article-meta">
        <div class="author-info">
          <div class="author-avatar">
            <img src="@/assets/avatar.png" alt="作者头像" />
          </div>
          <div class="author-name">
            <div class="name">张明远</div>
            <div class="title">人工智能研究员</div>
          </div>
        </div>
        <div class="article-rating">
          <div class="stars">
            <i class="iconfont icon-star-filled"></i>
            <i class="iconfont icon-star-filled"></i>
            <i class="iconfont icon-star-filled"></i>
            <i class="iconfont icon-star-filled"></i>
            <i class="iconfont icon-star"></i>
          </div>
        </div>
        <div class="article-stats">
          <div class="stat-item">
            <i class="iconfont icon-time"></i>
            <span>阅读时间 15分钟</span>
          </div>
          <div class="stat-item">
            <i class="iconfont icon-level"></i>
            <span>难度：中等</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章简介 -->
    <div class="article-summary">
      <p>神经网络是深度学习的核心基础，其架构设计直接影响模型的学习能力和性能表现。本文将深入探讨神经网络的基本构成要素、常见架构以及优化策略，帮助读者建立系统性的认知模型。</p>
    </div>

    <!-- 文章内容区域，左侧内容，右侧工具栏 -->
    <div class="article-content-wrapper">
      <!-- 左侧内容 -->
      <div class="article-content">
        <!-- 知识导图 -->
        <div class="knowledge-map">
          <div class="section-header">
            <i class="iconfont icon-mind-map"></i>
            <h2>知识导图</h2>
          </div>
          <div class="map-placeholder">
            <div class="map-content">
              <div class="map-text">交互式知识导图</div>
            </div>
          </div>
        </div>

        <!-- 神经网络基础架构 -->
        <div class="content-section">
          <h2 class="section-title">1. 神经网络基础架构</h2>
          <p>神经网络的基本构建单元是神经元，通过不同的连接方式形成层级结构，典型的神经网络包含输入层、隐藏层和输出层，每一层都承担着特定的数据处理功能。</p>
          
          <div class="info-note">
            <p>关于神经网络架构的选择，业界存在不同观点。有研究表明，增加网络深度不一定能提升模型性能，可能会导致梯度消失等问题。</p>
          </div>
        </div>

        <!-- 优化策略 -->
        <div class="content-section">
          <h2 class="section-title">2. 优化策略</h2>
          <p>模型优化是提升神经网络性能的关键环节，常见的优化策略包括：学习率调整、批量归一化、dropout正则化等，选择合适的优化器和超参数对模型训练至关重要。</p>
          
          <!-- 性能对比表格 -->
          <div class="performance-comparison">
            <div class="section-header">
              <i class="iconfont icon-chart"></i>
              <h3>性能对比</h3>
            </div>
            <div class="chart-placeholder">
              <div class="chart-content">
                <div class="chart-text">优化策略性能对比图表</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧工具栏 -->
      <div class="article-sidebar">
        <!-- AI阅读助手 -->
        <div class="sidebar-widget ai-assistant">
          <div class="widget-header">
            <h3>AI 阅读助手</h3>
            <i class="iconfont icon-light-bulb"></i>
          </div>
          <div class="widget-content">
            <div class="key-points">
              <h4>核心要点</h4>
              <ul>
                <li>
                  <i class="iconfont icon-check"></i>
                  <span>神经网络的层级结构设计</span>
                </li>
                <li>
                  <i class="iconfont icon-check"></i>
                  <span>优化策略的选择与应用</span>
                </li>
              </ul>
            </div>
            
            <div class="reading-speed">
              <h4>阅读速度</h4>
              <div class="speed-control">
                <i class="iconfont icon-slow"></i>
                <div class="speed-slider">
                  <div class="slider-track">
                    <div class="slider-progress" style="width: 60%"></div>
                  </div>
                </div>
                <i class="iconfont icon-fast"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- 知识验证 -->
        <div class="sidebar-widget knowledge-validation">
          <div class="widget-header">
            <h3>知识验证</h3>
            <i class="iconfont icon-verify"></i>
          </div>
          <div class="widget-content">
            <div class="references">
              <h4>参考文献</h4>
              <div class="reference-item">
                <i class="iconfont icon-document"></i>
                <span>深度学习基础理论研究</span>
              </div>
              <div class="reference-doi">
                DOI: 10.1234/journal.ai.2023.01
              </div>
            </div>
            
            <div class="fact-check">
              <h4>事实核查</h4>
              <div class="fact-item">
                <i class="iconfont icon-check-circle"></i>
                <span>内容已通过AI核验</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 阅读模式 -->
        <div class="sidebar-widget reading-mode">
          <div class="widget-header">
            <h3>阅读模式</h3>
            <i class="iconfont icon-settings"></i>
          </div>
          <div class="widget-content">
            <div class="mode-options">
              <div class="mode-option active">
                <i class="iconfont icon-book"></i>
                <span>专注模式</span>
              </div>
              <div class="mode-option">
                <i class="iconfont icon-chat"></i>
                <span>讨论模式</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = ref(route.params.id)

// 可以在这里获取文章详情数据
onMounted(() => {
  // fetchArticleDetail(articleId.value)
  console.log('加载文章ID:', articleId.value)
})
</script>

<style scoped>
.article-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  height: 100%;
  /* 移除滚动设置，让父容器(main-content)处理滚动 */
  overflow: visible;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  cursor: pointer;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #1890ff;
  font-weight: 500;
}

.separator {
  margin: 0 8px;
  color: #ccc;
}

/* 文章标题区域 */
.article-header {
  margin-bottom: 30px;
}

.article-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name .name {
  font-size: 16px;
  font-weight: 500;
}

.author-name .title {
  font-size: 13px;
  color: #666;
}

.stars {
  color: #faad14;
  font-size: 16px;
}

.article-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.stat-item i {
  margin-right: 5px;
  font-size: 16px;
}

/* 文章简介 */
.article-summary {
  background-color: #f5f9ff;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.6;
  transition: border-radius 0.3s ease;
}

.article-summary:hover {
  border-radius: 16px;
}

/* 文章内容区域 */
.article-content-wrapper {
  display: flex;
  gap: 30px;
  position: relative;
}

.article-content {
  flex: 1;
  transition: border-radius 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}

.article-content:hover {
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.knowledge-map {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.section-header i {
  margin-right: 10px;
  font-size: 20px;
  color: #1890ff;
}

.section-header h2, .section-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.map-placeholder, .chart-placeholder {
  background-color: #f9f9f9;
  border-radius: 8px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ddd;
  transition: border-radius 0.3s ease;
}

.map-placeholder:hover, .chart-placeholder:hover {
  border-radius: 16px;
}

.map-content, .chart-content {
  text-align: center;
  color: #999;
}

.content-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.content-section p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
}

.info-note {
  background-color: #fff3e0;
  border-left: 4px solid #faad14;
  padding: 15px;
  border-radius: 0 4px 4px 0;
  margin: 20px 0;
  transition: border-radius 0.3s ease;
}

.info-note:hover {
  border-radius: 0 12px 12px 0;
}

.info-note p {
  margin: 0;
  color: #876800;
}

.performance-comparison {
  margin-top: 30px;
}

/* 右侧工具栏 */
.article-sidebar {
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.sidebar-widget {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
  transition: border-radius 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-widget:hover {
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.widget-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.widget-header i {
  font-size: 18px;
  color: #1890ff;
}

.widget-content {
  padding: 15px 20px;
}

.key-points h4, .reading-speed h4, .references h4, .fact-check h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.key-points ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-points li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.key-points li i {
  color: #52c41a;
  margin-right: 8px;
  margin-top: 2px;
}

.speed-control {
  display: flex;
  align-items: center;
}

.speed-slider {
  flex: 1;
  height: 4px;
  background-color: #f0f0f0;
  border-radius: 2px;
  margin: 0 10px;
  position: relative;
}

.slider-track {
  position: relative;
  height: 100%;
}

.slider-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #1890ff;
  border-radius: 2px;
}

.reference-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.reference-item i {
  margin-right: 8px;
  color: #1890ff;
}

.reference-doi {
  font-size: 12px;
  color: #999;
  margin-left: 20px;
}

.fact-item {
  display: flex;
  align-items: center;
}

.fact-item i {
  margin-right: 8px;
  color: #52c41a;
}

.mode-options {
  display: flex;
  gap: 10px;
}

.mode-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, border-radius 0.3s;
}

.mode-option:hover {
  background-color: #f5f5f5;
  border-radius: 10px;
}

.mode-option.active {
  background-color: #e6f7ff;
}

.mode-option i {
  font-size: 24px;
  margin-bottom: 8px;
  color: #1890ff;
}

.ai-assistant {
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
}

.ai-assistant .widget-header {
  background-color: #f6ffed;
  border-bottom: 1px solid #b7eb8f;
}

.ai-assistant .widget-header i {
  color: #52c41a;
}

/* 移除多余的滚动条样式 */
/* 使用App.vue中定义的全局滚动条样式 */

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-content-wrapper {
    flex-direction: column;
  }
  
  .article-sidebar {
    width: 100%;
    position: static;
  }
}
</style> 