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

      <!-- AI助手 -->
      <div class="dashboard-card ai-helper">
        <div class="card-header">
          <h2>AI助手</h2>
          <div class="icon-btn"><i class="iconfont icon-chat"></i></div>
        </div>
        <div class="card-content">
          <div class="ai-message">需要帮助创建你的任务吗？</div>
          <button class="start-btn" @click="openAIChat">开始对话</button>
        </div>
      </div>

      <!-- 欢迎 -->
      <div class="dashboard-card project-introduction">
        <div class="card-header">
          <h2>你好</h2>
        </div>
        <div class="card-content">
          <p>欢迎来到知汇！</p>
          <p>这是一个帮助您记录灵感、管理任务、学习统计以及AI助手的综合性应用。</p>
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
              <div class="stat-value">{{ noteCount }}</div>
              <div class="stat-label">笔记数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ dailyTaskCount }}</div>
              <div class="stat-label">今日任务数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ longTermTaskCount }}</div>
              <div class="stat-label">长期任务数</div>
            </div>
          </div>
          <div class="stats-container second-row">
            <div class="stat-item">
              <div class="stat-value">{{ memoCount }}</div>
              <div class="stat-label">便签数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ quadrantTaskCount }}</div>
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
            <template v-if="recentNotes.length > 0">
              <div 
                v-for="note in recentNotes" 
                :key="note.noteId" 
                class="workspace-item"
                @click="goToNoteDetail(note.noteId)"
              >
                <div class="workspace-icon"><i class="iconfont icon-note"></i></div>
                <div class="workspace-info">
                  <div class="workspace-title">{{ note.title }}</div>
                  <div class="workspace-desc">{{ truncateText(note.content || '') }}</div>
                </div>
                <div class="workspace-bookmark"><i class="iconfont icon-bookmark"></i></div>
              </div>
            </template>
            <div v-else class="empty-state">
              <i class="iconfont icon-empty"></i>
              <p>您还没有添加笔记哦~</p>
            </div>
          </div>
          
          <div class="ai-assistant">
            <div class="ai-icon"><i class="iconfont icon-robot"></i></div>
            <div class="ai-content">
              <div class="ai-title">AI写作助手</div>
              <div class="ai-desc">让AI帮助你优化文章结构和表达...</div>
            </div>
            <button class="ai-btn" @click="goToEditor">开始写作</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 便签详情弹窗 -->
    <a-modal
      v-model:open="memoDialogVisible"
      title="便签详情"
      @ok="handleUpdateMemo"
      @cancel="closeMemoDialog"
      okText="保存"
      cancelText="取消"
    >
      <textarea 
        v-model="editingMemo.content" 
        class="memo-edit-input"
        placeholder="编辑便签内容..."
      ></textarea>
    </a-modal>

    <!-- AI对话弹窗 -->
    <a-modal
      v-model:open="aiDialogVisible"
      title="AI助手"
      :footer="null"
      width="800px"
      class="ai-chat-modal"
    >
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessagesRef">
          <div v-for="(message, index) in chatMessages" :key="index" 
               :class="['message', message.type === 'ai' ? 'ai-message' : 'user-message']">
            <div class="message-content">{{ message.content }}</div>
          </div>
        </div>
        <div class="chat-input">
          <a-input
            v-model:value="userInput"
            placeholder="请输入您的问题..."
            @pressEnter="handleSendMessage"
          >
            <template #suffix>
              <a-button type="primary" @click="handleSendMessage" :loading="loading">
                发送
              </a-button>
            </template>
          </a-input>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { insertMemo, getMemoList, updateMemo, deleteMemo } from '@/api/memo'
import { message } from 'ant-design-vue'
import { getNoteCount, getAllNotes } from '@/api/note'
import { getDailyTaskCount } from '@/api/dailyTask'
import { getLongTermTaskCount } from '@/api/longTermTask'
import { getMemoCount } from '@/api/memo'
import { getQuadrantTaskCount } from '@/api/quadrant'
import { generateTask } from '@/api/ai'
import { useRouter } from 'vue-router'

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

const noteCount = ref(0)
const dailyTaskCount = ref(0)
const longTermTaskCount = ref(0)
const memoCount = ref(0)
const quadrantTaskCount = ref(0)

const recentNotes = ref([])

const router = useRouter()

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

// 获取最近的两条笔记
const fetchRecentNotes = async () => {
  try {
    const notes = await getAllNotes()
    if (notes && notes.length > 0) {
      recentNotes.value = notes
        .sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
        .slice(0, 4)
    } else {
      recentNotes.value = []
    }
  } catch (error) {
    console.error('获取最近笔记失败:', error)
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
    await Promise.all([
      fetchMemoList(), // 刷新列表
      fetchStats() // 更新统计数据
    ])
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
    await Promise.all([
      fetchMemoList(), // 刷新列表
      fetchStats() // 更新统计数据
    ])
  } catch (error) {
    console.error('发布笔记失败:', error)
  }
}

// 删除笔记
const handleDeleteMemo = async (memoId) => {
  try {
    await deleteMemo(memoId)
    message.success('删除成功')
    await Promise.all([
      fetchMemoList(), // 刷新列表
      fetchStats() // 更新统计数据
    ])
  } catch (error) {
    console.error('删除笔记失败:', error)
  }
}

const fetchStats = async () => {
  try {
    const [noteRes, dailyTaskRes, longTermTaskRes, memoRes, quadrantTaskRes] = await Promise.all([
      getNoteCount(),
      getDailyTaskCount(),
      getLongTermTaskCount(),
      getMemoCount(),
      getQuadrantTaskCount()
    ])
    
    noteCount.value = noteRes
    dailyTaskCount.value = dailyTaskRes
    longTermTaskCount.value = longTermTaskRes
    memoCount.value = memoRes
    quadrantTaskCount.value = quadrantTaskRes
  } catch (error) {
    console.error('获取统计数据失败:', error)
    message.error('获取统计数据失败')
  }
}

// AI对话相关
const aiDialogVisible = ref(false)
const userInput = ref('')
const chatMessages = ref([])
const loading = ref(false)
const chatMessagesRef = ref(null)

// 打开AI对话
const openAIChat = () => {
  aiDialogVisible.value = true
  chatMessages.value = [{
    type: 'ai',
    content: '你好！我是你的AI助手，我可以帮你创建你的任务，请告诉我你的需求。'
  }]
}

// 发送消息
const handleSendMessage = async () => {
  if (!userInput.value.trim()) {
    message.warning('请输入内容')
    return
  }

  // 添加用户消息
  chatMessages.value.push({
    type: 'user',
    content: userInput.value.trim()
  })

  const currentInput = userInput.value
  userInput.value = ''
  loading.value = true

  try {
    // 调用AI接口
    const response = await generateTask(currentInput)
    
    // 添加AI回复
    chatMessages.value.push({
      type: 'ai',
      content: response
    })
  } catch (error) {
    message.error('获取AI回复失败')
  } finally {
    loading.value = false
    // 滚动到底部
    await nextTick()
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
    }
  }
}

// 页面加载时获取笔记列表和统计数据
onMounted(() => {
  fetchMemoList()
  fetchStats()
  fetchRecentNotes()
})

// 跳转到笔记详情页
const goToNoteDetail = (noteId) => {
  router.push({ name: 'NoteDetail', params: { id: noteId } })
}

// 跳转到笔记创作页
const goToEditor = () => {
  router.push({ name: 'Editor' })
}
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

/* 项目介绍 */
.project-introduction .card-header {
  border-bottom: 1px solid #f0f0f0;
}

.project-introduction .card-content {
  padding: 15px 20px;
}

.project-introduction .card-content p {
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
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
  height: 400px;
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
  margin-bottom: 20px;
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

/* AI对话弹窗样式 */
.ai-chat-modal :deep(.ant-modal-body) {
  padding: 0;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.message {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.message-content {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.user-message {
  align-items: flex-end;
}

.user-message .message-content {
  background-color: #1890ff;
  color: white;
}

.ai-message {
  align-items: flex-start;
}

.ai-message .message-content {
  background-color: white;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chat-input {
  padding: 16px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
}

.chat-input :deep(.ant-input) {
  border-radius: 20px;
  padding-right: 100px;
}

.chat-input :deep(.ant-input-suffix) {
  right: 8px;
}

.chat-input :deep(.ant-btn) {
  border-radius: 16px;
}
</style> 