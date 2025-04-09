<template>
  <div class="community-page">
    <!-- 左侧用户信息栏 -->
    <div class="user-sidebar">
      <div class="user-profile">
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="用户头像" />
        </div>
        <h2 class="username">张小明</h2>
        <p class="user-title">知识探索家</p>
        
        <div class="user-stats">
          <div class="stat-item">
            <div class="number">2.8k</div>
            <div class="label">影响力</div>
          </div>
          <div class="stat-item">
            <div class="number">1.2k</div>
            <div class="label">获赞</div>
          </div>
          <div class="stat-item">
            <div class="number">328</div>
            <div class="label">收藏</div>
          </div>
        </div>
        
        <div class="ai-assistant">
          <div class="ai-icon">
            <i class="iconfont icon-robot"></i>
          </div>
          <div class="ai-title">AI 灵感加速器</div>
          <p class="ai-description">基于你的兴趣，为你推荐以下话题：</p>
          <div class="ai-suggestions">
            <div class="suggestion-item">
              <i class="iconfont icon-code"></i>
              <span>Python 数据分析实践技巧</span>
            </div>
            <div class="suggestion-item">
              <i class="iconfont icon-chart"></i>
              <span>效率提升工具分享</span>
            </div>
            <div class="suggestion-item">
              <i class="iconfont icon-design"></i>
              <span>产品设计思维</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="content-area">
      <!-- 顶部导航栏 -->
      <div class="nav-tabs">
        <div class="tab active">全部</div>
        <div class="tab">笔记</div>
        <div class="tab">问答</div>
        <div class="tab">资源</div>
      </div>

      <!-- 标签筛选 -->
      <div class="tag-filters">
        <div class="tag">Python</div>
        <div class="tag">数据分析</div>
        <div class="tag">机器学习</div>
        <div class="tag">产品设计</div>
        <div class="tag">效率工具</div>
      </div>

      <!-- 文章列表 -->
      <div class="article-list">
        <!-- 使用v-for循环渲染文章列表 -->
        <div v-for="article in articles" :key="article.id" class="article-item" @click="goToArticleDetail(article.id)">
          <div class="author-info">
            <img src="@/assets/avatar.png" alt="作者头像" class="author-avatar" />
            <div class="author-name">{{ article.author }}</div>
            <div class="post-time">{{ article.time }}</div>
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-tags">
              <div v-for="(tag, index) in article.tags" :key="index" class="tag">{{ tag }}</div>
            </div>
            <div class="article-actions">
              <div class="action">
                <i class="iconfont icon-like"></i>
                <span>{{ article.likes }}</span>
              </div>
              <div class="action">
                <i class="iconfont icon-comment"></i>
                <span>{{ article.comments }}</span>
              </div>
              <div class="action">
                <i class="iconfont icon-bookmark"></i>
                <span>{{ article.bookmarks }}</span>
              </div>
              <div class="action share">
                <i class="iconfont icon-share"></i>
                <span>分享</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧动态和热门话题 -->
    <div class="right-sidebar">
      <!-- 实时动态 -->
      <div class="realtime-updates">
        <div class="section-header">
          <h3>实时动态</h3>
          <i class="iconfont icon-refresh"></i>
        </div>
        <div class="update-list">
          <div class="update-item">
            <div class="status-icon active"></div>
            <div class="update-content">
              <div class="user-name">陈小云</div>
              <div class="activity">正在编写机器学习笔记</div>
              <div class="time">刚刚</div>
            </div>
          </div>
          <div class="update-item">
            <div class="status-icon"></div>
            <div class="update-content">
              <div class="user-name">王大力</div>
              <div class="activity">回答了一个Python问题</div>
              <div class="time">5分钟前</div>
            </div>
          </div>
          <div class="update-item">
            <div class="status-icon"></div>
            <div class="update-content">
              <div class="user-name">张三</div>
              <div class="activity">分享了学习资源</div>
              <div class="time">10分钟前</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门话题 -->
      <div class="hot-topics">
        <h3 class="section-header">热门话题</h3>
        <div class="topic-list">
          <div class="topic-item">
            <div class="topic-title">AI 工具效率提升指南</div>
            <div class="topic-meta">
              <div class="topic-likes">
                <i class="iconfont icon-fire"></i>
                <span>95</span>
              </div>
              <div class="topic-trend up">+5</div>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-title">Python 自动化办公</div>
            <div class="topic-meta">
              <div class="topic-likes">
                <i class="iconfont icon-fire"></i>
                <span>88</span>
              </div>
              <div class="topic-trend up">+3</div>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-title">数据分析入门攻略</div>
            <div class="topic-meta">
              <div class="topic-likes">
                <i class="iconfont icon-fire"></i>
                <span>82</span>
              </div>
              <div class="topic-trend down">-2</div>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-title">产品经理必备技能</div>
            <div class="topic-meta">
              <div class="topic-likes">
                <i class="iconfont icon-fire"></i>
                <span>75</span>
              </div>
              <div class="topic-trend up">+4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以导入需要的组件和方法
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { fetchArticles, fetchHotTopics } from '@/api/community'

// 初始化路由
const router = useRouter()

// 模拟文章数据
const articles = ref([
  {
    id: '1',
    title: 'Python 数据分析必备技巧总结',
    summary: '在数据分析项目中，经常会遇到数据清洗和预处理的问题。这里分享一些实用的 Pandas 技巧，帮助大家提高数据处理效率。',
    author: '李大勇',
    time: '2 小时前',
    tags: ['Python', '数据分析', '编程技巧'],
    likes: 128,
    comments: 32,
    bookmarks: 45
  },
  {
    id: '2',
    title: '如何提升学习效率？分享我的知识管理方法',
    summary: '良好的知识管理系统是提升学习效率的关键。我使用的是双链笔记方法，配合以下工具和技巧...',
    author: '王思琪',
    time: '4 小时前',
    tags: ['效率提升', '知识管理', '学习方法'],
    likes: 256,
    comments: 48,
    bookmarks: 89
  },
  {
    id: '3',
    title: '深度学习基础：神经网络架构与优化策略',
    summary: '神经网络是深度学习的核心基础，其架构设计直接影响模型的学习能力和性能表现。本文深入探讨神经网络的基本构成要素。',
    author: '张明远',
    time: '昨天',
    tags: ['深度学习', '人工智能', '神经网络'],
    likes: 312,
    comments: 56,
    bookmarks: 127
  }
])

// 跳转到文章详情页
const goToArticleDetail = (articleId) => {
  router.push({ name: 'ArticleDetail', params: { id: articleId } })
}

// 页面加载时获取数据的逻辑可以在这里实现
// onMounted(async () => {
//   // 获取文章列表
//   // articles.value = await fetchArticles()
//   // 获取热门话题
//   // hotTopics.value = await fetchHotTopics()
// })
</script>

<style scoped>
.community-page {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  height: 100%;
}

/* 左侧用户信息栏样式 */
.user-sidebar {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 120px);
}

.user-profile {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: border-radius 0.3s ease, box-shadow 0.3s ease;
}

.user-profile:hover {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 15px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
}

.user-title {
  color: #666;
  text-align: center;
  margin-bottom: 15px;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.number {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.label {
  font-size: 12px;
  color: #666;
}

.ai-assistant {
  background-color: #f0f5ff;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.ai-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #4080ff;
  margin-bottom: 10px;
}

.ai-icon {
  margin-right: 5px;
  color: #4080ff;
}

.ai-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.suggestion-item {
  background-color: #fff;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.suggestion-item i {
  margin-right: 8px;
  color: #4080ff;
}

/* 中间内容区样式 */
.content-area {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: visible;
  height: auto;
  padding-bottom: 80px;
  margin-bottom: 40px;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
}

.tab.active {
  font-weight: 600;
  color: #4080ff;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4080ff;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 3px 10px;
  font-size: 12px;
  cursor: pointer;
}

/* 文章列表 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 30px;
}

.article-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-radius 0.3s;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  max-height: 300px;
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.article-item:last-child {
  margin-bottom: 40px;
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-weight: 500;
  margin-right: 10px;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.article-content {
  overflow: hidden;
}

.article-summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  color: #666;
  line-height: 1.5;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.article-actions {
  display: flex;
  gap: 12px;
}

.action {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.action i {
  margin-right: 5px;
}

.action.share {
  margin-left: auto;
}

/* 右侧栏样式 */
.right-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 120px);
}

.realtime-updates, .hot-topics {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: border-radius 0.3s ease, box-shadow 0.3s ease;
}

.realtime-updates:hover, .hot-topics:hover {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.update-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.status-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  margin-top: 5px;
  margin-right: 10px;
}

.status-icon.active {
  background-color: #4cd964;
}

.update-content {
  flex: 1;
}

.user-name {
  font-weight: 500;
}

.activity {
  font-size: 14px;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
}

.topic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  transition: transform 0.2s;
  cursor: pointer;
}

.topic-item:hover {
  transform: translateX(5px);
}

.topic-title {
  font-weight: 500;
}

.topic-meta {
  display: flex;
  align-items: center;
}

.topic-likes {
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #ff4d4f;
}

.topic-trend {
  font-size: 12px;
  font-weight: 600;
}

.topic-trend.up {
  color: #52c41a;
}

.topic-trend.down {
  color: #ff4d4f;
}
</style>