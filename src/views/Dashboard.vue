<template>
  <div class="dashboard-container">
    <div class="dashboard-row">
      <!-- 便签 -->
      <div class="dashboard-card quick-note">
        <div class="card-header">
          <h2>便签</h2>
          <div class="publish-btn" @click="handlePublishMemo">
            发布
          </div>
        </div>
        <div class="card-content">
          <textarea 
            v-model="memoContent" 
            placeholder="记录灵感..." 
            class="note-input"
          ></textarea>
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
              <div class="stat-label">今日任务数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">64</div>
              <div class="stat-label">长期任务数</div>
            </div>
          </div>
          <div class="stats-container second-row">
            <div class="stat-item">
              <div class="stat-value">15</div>
              <div class="stat-label">便签数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">24</div>
              <div class="stat-label">象限任务数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">48</div>
              <div class="stat-label">知识库数</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-row">
      <!-- 便签列表 -->
      <div class="dashboard-card todo-list">
        <div class="card-header">
          <h2>我的便签</h2>
          <div class="icon-btn"><i class="iconfont icon-refresh" @click="fetchMemoList"></i></div>
        </div>
        <div class="card-content">
          <div class="memo-items">
            <template v-if="memoList.length > 0">
              <div v-for="memo in memoList" :key="memo.memoId" class="memo-item">
                <div class="memo-indicator" :style="{ backgroundColor: getRandomColor(memo.memoId) }"></div>
                <div class="memo-content" @click="openMemoDialog(memo)">{{ truncateText(memo.content) }}</div>
                <div class="memo-time">{{ formatTime(memo.updateTime) }}</div>
                <div class="memo-delete" @click.stop="handleDeleteMemo(memo.memoId)">
                  <i class="iconfont icon-delete"></i>
                </div>
              </div>
            </template>
            <div v-else class="empty-state">
              <i class="iconfont icon-empty"></i>
              <p>您还没有添加便签哦~</p>
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

    <!-- 笔记详情弹窗 -->
    <a-modal
      v-model:open="memoDialogVisible"
      title="笔记详情"
      @ok="handleUpdateMemo"
      @cancel="closeMemoDialog"
      okText="保存"
      cancelText="取消"
    >
      <textarea 
        v-model="editingMemo.content" 
        class="memo-edit-input"
        placeholder="编辑笔记内容..."
      ></textarea>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { insertMemo, getMemoList, updateMemo, deleteMemo } from '@/api/memo'
import { message } from 'ant-design-vue'

// 快速笔记内容
const memoContent = ref('')
// 笔记列表
const memoList = ref([])
// 弹窗显示控制
const memoDialogVisible = ref(false)
// 正在编辑的笔记
const editingMemo = ref({
  memoId: null,
  content: ''
})

// 颜色数组
const colors = [
  '#52c41a', // 绿色
  '#1890ff', // 蓝色
  '#faad14', // 黄色
  '#722ed1', // 紫色
  '#eb2f96', // 粉色
  '#fa541c', // 橙色
]

// 获取随机颜色
const getRandomColor = (id) => {
  return colors[id % colors.length]
}

// 截断文本
const truncateText = (text) => {
  return text.length > 50 ? text.substring(0, 50) + '...' : text
}

// 格式化时间
const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 获取笔记列表
const fetchMemoList = async () => {
  try {
    const res = await getMemoList()
    memoList.value = res || []
  } catch (error) {
    console.error('获取笔记列表失败:', error)
  }
}

// 打开笔记弹窗
const openMemoDialog = (memo) => {
  editingMemo.value = { ...memo }
  memoDialogVisible.value = true
}

// 关闭笔记弹窗
const closeMemoDialog = () => {
  memoDialogVisible.value = false
  editingMemo.value = { memoId: null, content: '' }
}

// 更新笔记
const handleUpdateMemo = async () => {
  if (!editingMemo.value.content.trim()) {
    message.warning('笔记内容不能为空')
    return
  }

  try {
    await updateMemo({
      memoId: editingMemo.value.memoId,
      content: editingMemo.value.content.trim()
    })
    message.success('更新成功')
    memoDialogVisible.value = false
    fetchMemoList() // 刷新列表
  } catch (error) {
    console.error('更新笔记失败:', error)
  }
}

// 发布快速笔记
const handlePublishMemo = async () => {
  if (!memoContent.value.trim()) {
    message.warning('请输入笔记内容')
    return
  }

  try {
    await insertMemo({
      content: memoContent.value.trim()
    })
    message.success('发布成功')
    memoContent.value = ''
    fetchMemoList() // 刷新列表
  } catch (error) {
    console.error('发布笔记失败:', error)
  }
}

// 删除笔记
const handleDeleteMemo = async (memoId) => {
  try {
    await deleteMemo(memoId)
    message.success('删除成功')
    fetchMemoList() // 刷新列表
  } catch (error) {
    console.error('删除笔记失败:', error)
  }
}

// 页面加载时获取笔记列表
onMounted(() => {
  fetchMemoList()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f8faff;
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
.quick-note {
  overflow: visible;
}

.quick-note .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
  border-bottom: none;
  height: 48px;
}

.quick-note .card-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.publish-btn {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.publish-btn:hover {
  background-color: #40a9ff;
}

.quick-note .card-content {
  padding: 12px 20px 20px;
}

.note-input {
  width: 100%;
  height: 160px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: #f5f7fa;
  resize: none;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: background-color 0.3s;
  box-sizing: border-box;
  margin-top: 8px;
}

.note-input::placeholder {
  color: #999;
}

.note-input:focus {
  background-color: #f0f2f5;
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

.stats-container.second-row {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
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

/* 笔记列表样式 */
.memo-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 4px;
}

/* 自定义滚动条样式 */
.memo-items::-webkit-scrollbar {
  width: 4px;
}

.memo-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.memo-items::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.memo-items::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.memo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s;
}

.memo-item:hover {
  background-color: #f0f0f0;
}

.memo-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.memo-content {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.memo-time {
  font-size: 12px;
  color: #999;
  margin-left: 12px;
}

.memo-delete {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4f;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.memo-item:hover .memo-delete {
  opacity: 1;
}

.memo-delete:hover {
  background-color: rgba(255, 77, 79, 0.1);
  border-radius: 50%;
}

/* 弹窗样式 */
.memo-edit-input {
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
}

.memo-edit-input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
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

/* 修改整体背景色 */
:deep(body) {
  background-color: #f8faff;
}

.app-container {
  background-color: #f8faff;
}

/* 便签列表空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #999;
}

.empty-state .iconfont {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}
</style> 