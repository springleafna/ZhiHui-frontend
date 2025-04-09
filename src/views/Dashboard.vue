<template>
  <div class="dashboard-container">
    <!-- 第一行 -->
    <div class="dashboard-row">
      <!-- 快速笔记 -->
      <div class="dashboard-card quick-note">
        <div class="card-header">
          <h2>快速笔记</h2>
          <div class="icon-btn"><i class="iconfont icon-mic"></i></div>
        </div>
        <div class="card-content">
          <textarea placeholder="记录灵感..." class="note-input"></textarea>
        </div>
      </div>

      <!-- 今日学习 -->
      <div class="dashboard-card today-learning">
        <div class="card-header">
          <h2>今日学习</h2>
          <div class="icon-btn"><i class="iconfont icon-chart"></i></div>
        </div>
        <div class="card-content">
          <div class="progress-chart">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="#e8f4fc" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e8f4fc"
                stroke-width="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#1890ff"
                stroke-width="12"
                stroke-dasharray="439.6"
                stroke-dashoffset="329.7"
                stroke-linecap="round"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div class="progress-text">
              <div class="progress-value">4.5</div>
              <div class="progress-label">小时</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 本周趋势 -->
      <div class="dashboard-card weekly-trend">
        <div class="card-header">
          <h2>本周趋势</h2>
          <div class="icon-btn"><i class="iconfont icon-arrow-up"></i></div>
        </div>
        <div class="card-content">
          <div class="trend-chart">
            <svg width="100%" height="100" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M0,80 Q30,70 60,65 T120,55 T180,35 T240,45 T300,20"
                fill="none"
                stroke="#1890ff"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- 学习成果 -->
      <div class="dashboard-card learning-results">
        <div class="card-header">
          <h2>学习成果</h2>
          <div class="icon-btn"><i class="iconfont icon-chart"></i></div>
        </div>
        <div class="card-content">
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-value">32</div>
              <div class="stat-label">笔记数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">8</div>
              <div class="stat-label">思维导图</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">64</div>
              <div class="stat-label">知识卡片</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二行 -->
    <div class="dashboard-row">
      <!-- 待办事项 -->
      <div class="dashboard-card todo-list">
        <div class="card-header">
          <h2>待办事项</h2>
          <div class="icon-btn"><i class="iconfont icon-plus"></i></div>
        </div>
        <div class="card-content">
          <div class="todo-items">
            <div class="todo-item">
              <div class="todo-indicator completed"></div>
              <div class="todo-content">完成论文初稿</div>
              <div class="todo-star"><i class="iconfont icon-star"></i></div>
            </div>
            <div class="todo-item">
              <div class="todo-indicator inprogress"></div>
              <div class="todo-content">复习考试重点</div>
              <div class="todo-star"><i class="iconfont icon-star"></i></div>
            </div>
            <div class="todo-item">
              <div class="todo-indicator pending"></div>
              <div class="todo-content">整理学习笔记</div>
              <div class="todo-star"><i class="iconfont icon-star"></i></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工作区 -->
      <div class="dashboard-card workspace">
        <div class="card-header">
          <h2>工作区</h2>
        </div>
        <div class="card-content">
          <div class="workspace-items">
            <div class="workspace-item">
              <div class="workspace-icon"><i class="iconfont icon-note"></i></div>
              <div class="workspace-info">
                <div class="workspace-title">笔记整稿</div>
                <div class="workspace-desc">机器学习算法概述...</div>
              </div>
              <div class="workspace-bookmark"><i class="iconfont icon-bookmark"></i></div>
            </div>
            
            <div class="workspace-item">
              <div class="workspace-icon"><i class="iconfont icon-doc"></i></div>
              <div class="workspace-info">
                <div class="workspace-title">学习清单</div>
                <div class="workspace-desc">Python进阶课程规划...</div>
              </div>
              <div class="workspace-bookmark"><i class="iconfont icon-bookmark"></i></div>
            </div>
          </div>
          
          <div class="ai-assistant">
            <div class="ai-icon"><i class="iconfont icon-robot"></i></div>
            <div class="ai-content">
              <div class="ai-title">AI写作助手</div>
              <div class="ai-desc">让AI帮助你优化文章结构和表达...</div>
            </div>
            <button class="ai-btn">开始写作</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三行 -->
    <div class="dashboard-row">
      <!-- AI助手 -->
      <div class="dashboard-card ai-helper">
        <div class="card-header">
          <h2>AI助手</h2>
          <div class="icon-btn"><i class="iconfont icon-chat"></i></div>
        </div>
        <div class="card-content">
          <div class="ai-message">需要帮助优化你的学习计划吗？</div>
          <button class="start-btn">开始对话</button>
        </div>
      </div>

      <!-- 学习统计 -->
      <div class="dashboard-card learning-stats">
        <div class="card-header">
          <h2>学习统计</h2>
          <div class="icon-btn"><i class="iconfont icon-calendar"></i></div>
        </div>
        <div class="card-content">
          <div class="heatmap-container">
            <div class="heatmap-row">
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell medium"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell low"></div>
              <div class="heatmap-cell empty"></div>
              <div class="heatmap-cell high"></div>
            </div>
            <div class="heatmap-row">
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell empty"></div>
              <div class="heatmap-cell low"></div>
              <div class="heatmap-cell medium"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell high"></div>
            </div>
            <div class="heatmap-row">
              <div class="heatmap-cell empty"></div>
              <div class="heatmap-cell low"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell empty"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell medium"></div>
              <div class="heatmap-cell empty"></div>
            </div>
            <div class="heatmap-row">
              <div class="heatmap-cell medium"></div>
              <div class="heatmap-cell empty"></div>
              <div class="heatmap-cell low"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell medium"></div>
              <div class="heatmap-cell high"></div>
              <div class="heatmap-cell low"></div>
            </div>
          </div>
          <div class="heatmap-legend">
            <div class="legend-label">较少</div>
            <div class="legend-items">
              <div class="legend-item empty"></div>
              <div class="legend-item low"></div>
              <div class="legend-item medium"></div>
              <div class="legend-item high"></div>
            </div>
            <div class="legend-label">较多</div>
          </div>
        </div>
      </div>

      <!-- 成就徽章 -->
      <div class="dashboard-card achievements">
        <div class="card-header">
          <h2>成就徽章</h2>
          <div class="icon-btn"><i class="iconfont icon-trophy"></i></div>
        </div>
        <div class="card-content">
          <div class="badge-container">
            <div class="badge-row">
              <div class="badge-item active">
                <div class="badge-icon"><i class="iconfont icon-light"></i></div>
              </div>
              <div class="badge-item active">
                <div class="badge-icon"><i class="iconfont icon-rocket"></i></div>
              </div>
              <div class="badge-item active">
                <div class="badge-icon"><i class="iconfont icon-fire"></i></div>
              </div>
            </div>
            <div class="badge-row">
              <div class="badge-item empty">
                <div class="badge-icon"><i class="iconfont icon-diamond"></i></div>
              </div>
              <div class="badge-item active">
                <div class="badge-icon"><i class="iconfont icon-star"></i></div>
              </div>
              <div class="badge-item empty">
                <div class="badge-icon"><i class="iconfont icon-crown"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 设置 -->
      <div class="dashboard-card settings">
        <div class="card-header">
          <h2>设置</h2>
          <div class="icon-btn"><i class="iconfont icon-settings"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以添加业务逻辑
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  cursor: pointer;
}

.card-content {
  padding: 15px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 快速笔记 */
.note-input {
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.note-input:focus {
  border-color: #1890ff;
}

/* 今日学习 */
.progress-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 160px;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  font-size: 28px;
  font-weight: 600;
  color: #1890ff;
}

.progress-label {
  font-size: 14px;
  color: #666;
}

/* 本周趋势 */
.trend-chart {
  height: 100px;
  width: 100%;
}

/* 学习成果 */
.stats-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

/* 待办事项 */
.todo-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.todo-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
}

.todo-indicator.completed {
  background-color: #52c41a;
}

.todo-indicator.inprogress {
  background-color: #faad14;
}

.todo-indicator.pending {
  background-color: #1890ff;
}

.todo-content {
  flex: 1;
  font-size: 14px;
}

.todo-star {
  color: #faad14;
  cursor: pointer;
}

/* 工作区 */
.workspace-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.workspace-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.workspace-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #e6f7ff;
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.workspace-info {
  flex: 1;
}

.workspace-title {
  font-size: 14px;
  font-weight: 500;
}

.workspace-desc {
  font-size: 12px;
  color: #666;
}

.workspace-bookmark {
  color: #1890ff;
  cursor: pointer;
}

.ai-assistant {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #1890ff;
  color: white;
  margin-top: 10px;
}

.ai-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.ai-content {
  flex: 1;
}

.ai-title {
  font-size: 14px;
  font-weight: 500;
}

.ai-desc {
  font-size: 12px;
  opacity: 0.8;
}

.ai-btn {
  padding: 6px 12px;
  border-radius: 4px;
  background-color: white;
  color: #1890ff;
  font-size: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

/* AI助手 */
.ai-helper .card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 15px;
}

.ai-message {
  font-size: 14px;
  color: #333;
}

.start-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

/* 学习统计 */
.heatmap-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.heatmap-row {
  display: flex;
  gap: 4px;
}

.heatmap-cell {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.heatmap-cell.empty {
  background-color: #f0f0f0;
}

.heatmap-cell.low {
  background-color: #b7deff;
}

.heatmap-cell.medium {
  background-color: #69c0ff;
}

.heatmap-cell.high {
  background-color: #1890ff;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}

.legend-items {
  display: flex;
  gap: 4px;
  margin: 0 8px;
}

.legend-item {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-item.empty {
  background-color: #f0f0f0;
}

.legend-item.low {
  background-color: #b7deff;
}

.legend-item.medium {
  background-color: #69c0ff;
}

.legend-item.high {
  background-color: #1890ff;
}

/* 成就徽章 */
.badge-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.badge-row {
  display: flex;
  justify-content: space-around;
}

.badge-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-item.active {
  background-color: #ffe58f;
  color: #fa8c16;
}

.badge-item.empty {
  background-color: #f5f5f5;
  color: #d9d9d9;
}

.badge-icon {
  font-size: 24px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .dashboard-row {
    flex-wrap: wrap;
  }
  
  .dashboard-card {
    min-width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .dashboard-card {
    min-width: 100%;
  }
}
</style> 