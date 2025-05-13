<template>
  <div class="daily-plan">
    <div class="plan-container">
      <!-- 左侧任务列表 -->
      <a-card class="plan-card" :bordered="false">
        <!-- 顶部标题和添加按钮 -->
        <div class="header">
          <h2>今日计划</h2>
          <div class="header-actions">
            <a-button class="history-btn" @click="showHistory">
              历史模式
            </a-button>
            <a-button class="export-btn" @click="exportTasks">
              导出日报
            </a-button>
            <a-button type="primary" @click="showAddModal">
              <template #icon><PlusOutlined /></template>
              新建计划
            </a-button>
          </div>
        </div>

        <!-- 待办任务列表 -->
        <div class="task-section">
          <h3 class="section-title">
            <span>待完成</span>
            <span class="task-count">{{ todoTasks.length }}</span>
          </h3>
          <div class="task-list">
            <a-list :data-source="todoTasks" :locale="{ emptyText: '暂无待办任务' }">
              <template #renderItem="{ item }">
                <a-list-item>
                  <div class="task-item">
                    <div class="task-content">
                      <a-checkbox 
                        :checked="item.completed"
                        @change="(e) => handleTaskComplete(item.id, e.target.checked)"
                      >
                        <span :class="{ 'task-completed': item.completed }">{{ item.title }}</span>
                      </a-checkbox>
                      <div class="task-info">
                        <a-tag :color="getPriorityColor(item.priority)">{{ item.priority }}</a-tag>
                        <span class="task-time" v-if="item.startTime || item.endTime">
                          {{ item.startTime || '--' }} - {{ item.endTime || '--' }}
                        </span>
                        <span class="task-description" v-if="item.description">
                          {{ item.description }}
                        </span>
                      </div>
                    </div>
                    <div class="task-actions">
                      <a-button type="text" @click="editTask(item)">
                        <template #icon><EditOutlined /></template>
                      </a-button>
                      <a-button type="text" @click="handleDeleteTask(item.id)">
                        <template #icon><DeleteOutlined /></template>
                      </a-button>
                    </div>
                  </div>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>

        <!-- 已完成任务列表 -->
        <div class="task-section">
          <h3 class="section-title">
            <span>已完成</span>
            <span class="task-count">{{ completedTasks.length }}</span>
          </h3>
          <div class="task-list completed-list">
            <a-list :data-source="completedTasks" :locale="{ emptyText: '暂无已完成任务' }">
              <template #renderItem="{ item }">
                <a-list-item>
                  <div class="task-item completed">
                    <div class="task-content">
                      <a-checkbox 
                        :checked="item.completed"
                        @change="(e) => handleTaskComplete(item.id, e.target.checked)"
                      >
                        <span :class="{ 'task-completed': item.completed }">{{ item.title }}</span>
                      </a-checkbox>
                      <div class="task-info">
                        <a-tag :color="getPriorityColor(item.priority)">{{ item.priority }}</a-tag>
                        <span class="task-time" v-if="item.startTime || item.endTime">
                          {{ item.startTime || '--' }} - {{ item.endTime || '--' }}
                        </span>
                        <span class="task-description" v-if="item.description">
                          {{ item.description }}
                        </span>
                      </div>
                    </div>
                    <div class="task-actions">
                      <a-button type="text" @click="handleDeleteTask(item.id)">
                        <template #icon><DeleteOutlined /></template>
                      </a-button>
                    </div>
                  </div>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
      </a-card>

      <!-- 右侧信息栏 -->
      <div class="sidebar">
        <!-- 任务完成度 -->
        <a-card class="sidebar-card completion-card" :bordered="false">
          <h3>今日进度</h3>
          <div class="progress-container">
            <a-progress
              type="circle"
              :percent="completionRate"
              :stroke-color="{
                '0%': '#1890ff',
                '100%': '#1890ff'
              }"
              :stroke-width="8"
            />
            <div class="progress-info">
              <div class="info-item">
                <span class="label">已完成</span>
                <span class="value">{{ completedTasks.length }}</span>
              </div>
              <div class="info-item">
                <span class="label">总任务</span>
                <span class="value">{{ tasks.length }}</span>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 日历 -->
        <a-card class="sidebar-card calendar-card" :bordered="false">
          <a-calendar
            :fullscreen="false"
            @select="onCalendarSelect"
            :mode="'month'"
            :value="selectedDate"
          >
            <template #dateCell="{ current }">
              <div class="date-cell">
                <span>{{ current.date() }}</span>
                <div 
                  v-if="getTaskStatusOnDate(current)" 
                  :class="['task-indicator', getTaskStatusOnDate(current)]"
                ></div>
              </div>
            </template>
          </a-calendar>
        </a-card>

        <!-- AI助手 -->
        <a-card class="sidebar-card ai-assistant-card" :bordered="false">
          <div class="ai-header">
            <RobotOutlined />
            <span>AI 智能助手</span>
          </div>
          <div class="ai-content">
            <div class="ai-suggestions">
              <p class="ai-tip">建议优先处理：</p>
              <div class="suggestion-item" v-for="(item, index) in aiSuggestions" :key="index">
                <BulbOutlined />
                <span class="suggestion-text">{{ item }}</span>
              </div>
            </div>
            <a-button type="primary" block class="generate-btn" @click="askAI">
              生成今日计划
            </a-button>
          </div>
        </a-card>
      </div>
    </div>

    <!-- 新建/编辑任务弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="editingTask ? '编辑计划' : '新建计划'"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form :model="taskForm" :rules="rules" ref="taskFormRef">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="taskForm.title" placeholder="请输入计划标题" />
        </a-form-item>
        <a-form-item label="开始时间" name="startTime">
          <a-time-picker 
            v-model:value="taskForm.startTime" 
            format="HH:mm"
            :minute-step="15"
            placeholder="选择开始时间"
            style="width: 100%"
            :allowClear="true"
            @change="handleStartTimeChange"
          />
        </a-form-item>
        <a-form-item label="结束时间" name="endTime">
          <a-time-picker 
            v-model:value="taskForm.endTime" 
            format="HH:mm"
            :minute-step="15"
            placeholder="选择结束时间"
            style="width: 100%"
            :allowClear="true"
            :disabled="!taskForm.startTime"
            :disabledTime="disabledEndTime"
          />
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <a-select v-model:value="taskForm.priority">
            <a-select-option value="高">高</a-select-option>
            <a-select-option value="中">中</a-select-option>
            <a-select-option value="低">低</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea 
            v-model:value="taskForm.description" 
            placeholder="请输入任务描述（选填）" 
            :rows="4"
            :allowClear="true"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  HistoryOutlined,
  ExportOutlined,
  RobotOutlined,
  BulbOutlined
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { 
  saveDailyTask, 
  getDailyTasks, 
  completeTask, 
  deleteTask, 
  updateTask,
  formatDate,
  formatTime 
} from '@/api/dailyTask'

// 任务列表数据
const tasks = ref([])

// 计算属性：待办任务和已完成任务
const todoTasks = computed(() => tasks.value?.filter(task => !task.completed) || [])
const completedTasks = computed(() => tasks.value?.filter(task => task.completed) || [])

// 弹窗相关
const modalVisible = ref(false)
const taskFormRef = ref(null)
const editingTask = ref(null)
const taskForm = ref({
  title: '',
  startTime: null,
  endTime: null,
  priority: '中',
  description: ''
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: '请输入计划标题', trigger: 'blur' }],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
  endTime: [
    {
      validator: (rule, value) => {
        if (!value || !taskForm.value.startTime) {
          return Promise.resolve();
        }
        if (value.isBefore(taskForm.value.startTime)) {
          return Promise.reject('结束时间必须在开始时间之后');
        }
        return Promise.resolve();
      },
      trigger: 'change'
    }
  ]
}

// 选中的日期
const selectedDate = ref(dayjs())

// 获取任务列表
const fetchTasks = async (date) => {
  try {
    // 确保日期格式正确
    const formattedDate = formatDate(date)
    console.log('请求日期:', formattedDate) // 添加日志
    const res = await getDailyTasks(formattedDate)
    
    if (!res) {
      tasks.value = []
      return
    }
    
    // 处理已完成和未完成的任务时添加类型转换
    const completedTasks = (res.dailyTaskCompletedVOList || []).map(task => ({
        ...task,
        id: task.dailyTaskId,
        completed: task.completed === 1,  // 将数字转为布尔值
        priority: getPriorityText(task.priority)
    }))
    
    const notCompletedTasks = (res.dailyTaskNotCompletedVOList || []).map(task => ({
        ...task,
        id: task.dailyTaskId,
        completed: task.completed === 1,  // 将数字转为布尔值
        priority: getPriorityText(task.priority)
    }))
    
    // 合并所有任务
    tasks.value = [...notCompletedTasks, ...completedTasks]
    console.log('处理后的任务列表:', tasks.value) // 添加日志
  } catch (error) {
    console.error('获取任务列表失败:', error)
    tasks.value = [] // 发生错误时清空任务列表
    message.error('获取任务列表失败')
  }
}

// 优先级数字转文本
const getPriorityText = (priority) => {
  const priorityMap = {
    0: '低',
    1: '中',
    2: '高'
  }
  return priorityMap[priority] || '低'
}

// 优先级文本转数字
const getPriorityNumber = (priority) => {
  const priorityMap = {
    '低': 0,
    '中': 1,
    '高': 2
  }
  return priorityMap[priority] || 0
}

// 删除任务
const handleDeleteTask = async (taskId) => {
  try {
    await deleteTask(taskId)
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    message.success('任务删除成功')
  } catch (error) {
    console.error('删除任务失败:', error)
    message.error('删除任务失败')
  }
}

// 完成/取消完成任务
const handleTaskComplete = async (taskId, completed) => {
  try {
    // 将布尔值转为数字 0/1
    await completeTask(taskId, completed ? 1 : 0)
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.completed = completed
    }
    message.success('任务状态更新成功')
  } catch (error) {
    console.error('更新任务状态失败:', error)
    message.error('更新任务状态失败')
  }
}

// 添加每日任务
const handleModalOk = async () => {
  try {
    await taskFormRef.value.validate()
    
    // 额外验证结束时间
    if (taskForm.value.endTime && taskForm.value.startTime) {
      if (taskForm.value.endTime.isBefore(taskForm.value.startTime)) {
        message.error('结束时间必须在开始时间之后')
        return
      }
    }

    const formData = {
      title: taskForm.value.title,
      startTime: taskForm.value.startTime ? formatTime(taskForm.value.startTime) : null,
      endTime: taskForm.value.endTime ? formatTime(taskForm.value.endTime) : null,
      priority: getPriorityNumber(taskForm.value.priority),
      description: taskForm.value.description || '',
      taskDate: formatDate(selectedDate.value)
    }

    if (editingTask.value) {
      await updateTask({
        dailyTaskId: editingTask.value.id,
        ...formData
      })
      message.success('任务更新成功')
    } else {
      await saveDailyTask(formData)
      message.success('任务创建成功')
    }

    // 重新获取任务列表
    await fetchTasks(selectedDate.value)
    modalVisible.value = false
    taskFormRef.value?.resetFields()
  } catch (error) {
    console.error('保存任务失败:', error)
    message.error('保存任务失败')
  }
}

// 处理弹窗取消
const handleModalCancel = () => {
  modalVisible.value = false
  taskFormRef.value?.resetFields()
}

// 获取优先级标签颜色
const getPriorityColor = (priority) => {
  const colors = {
    '高': 'error',
    '中': 'warning',
    '低': 'default'
  }
  return colors[priority] || 'default'
}

// 计算完成率
const completionRate = computed(() => {
  if (tasks.value.length === 0) return 0
  return Math.round((completedTasks.value.length / tasks.value.length) * 100)
})

// 获取某日期的任务状态
const getTaskStatusOnDate = (date) => {
  // 这里需要根据实际数据判断，目前先模拟
  const formattedDate = formatDate(date);
  const tasksOnDate = tasks.value.filter(task => formatDate(dayjs(task.taskDate)) === formattedDate);
  if (tasksOnDate.length === 0) {
    return null;
  }
  const allCompleted = tasksOnDate.every(task => task.completed);
  return allCompleted ? 'all-completed' : 'not-all-completed';
}

// 日历日期选择
const onCalendarSelect = async (date) => {
  selectedDate.value = date
  const formattedDate = formatDate(date)
  console.log('选择日期:', formattedDate) // 添加日志
  await fetchTasks(date)
  message.info(`查看 ${formattedDate} 的任务`)
}

// 组件挂载时获取任务列表
onMounted(async () => {
  await fetchTasks(selectedDate.value)
})

// AI建议
const aiSuggestions = ref([
  '建议将"产品周会"提前15分钟开始，以便充分准备'
])

// 获取AI建议
const askAI = () => {
  message.loading('正在分析您的任务...')
  // 这里可以调用实际的AI接口
  setTimeout(() => {
    aiSuggestions.value = [
      '检测到连续会议，建议预留中场休息时间',
      '建议设置任务提醒，避免错过重要节点',
      '本周任务量偏高，建议合理分配时间'
    ]
    message.success('已更新建议')
  }, 1500)
}

// 查看历史记录
const showHistory = () => {
  message.info('查看历史记录')
  // 这里可以实现查看历史记录的逻辑
}

// 导出任务
const exportTasks = () => {
  const data = {
    date: dayjs().format('YYYY-MM-DD'),
    tasks: tasks.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `任务计划_${dayjs().format('YYYY-MM-DD')}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  message.success('导出成功')
}

// 处理开始时间变化
const handleStartTimeChange = (time) => {
  // 如果开始时间被清空，同时清空结束时间
  if (!time && taskForm.value.endTime) {
    taskForm.value.endTime = null;
  }
  // 如果结束时间早于开始时间，清空结束时间
  else if (time && taskForm.value.endTime && 
    taskForm.value.endTime.isBefore(time)) {
    taskForm.value.endTime = null;
  }
};

// 禁用结束时间的选项
const disabledEndTime = (now) => {
  if (!taskForm.value.startTime) {
    return false;
  }
  return {
    disabledHours: () => {
      const hours = [];
      const startHour = taskForm.value.startTime.hour();
      for (let i = 0; i < startHour; i++) {
        hours.push(i);
      }
      return hours;
    },
    disabledMinutes: (selectedHour) => {
      const minutes = [];
      if (selectedHour === taskForm.value.startTime.hour()) {
        const startMinute = taskForm.value.startTime.minute();
        for (let i = 0; i < startMinute; i++) {
          minutes.push(i);
        }
      }
      return minutes;
    }
  };
};

// 显示新增弹窗
const showAddModal = () => {
  editingTask.value = null
  taskForm.value = {
    title: '',
    startTime: null,
    endTime: null,
    priority: '中',
    description: ''
  }
  modalVisible.value = true
}

// 编辑任务
const editTask = (task) => {
  editingTask.value = task
  taskForm.value = {
    title: task.title,
    startTime: task.startTime ? dayjs(task.startTime, 'HH:mm') : null,
    endTime: task.endTime ? dayjs(task.endTime, 'HH:mm') : null,
    priority: task.priority,
    description: task.description || ''
  }
  modalVisible.value = true
}
</script>

<style scoped>
.daily-plan {
  padding: 24px;
  background: #f5f9ff;
  min-height: calc(100vh - 48px);
  overflow-x: hidden;
}

.plan-container {
  display: flex;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.plan-card {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.task-section {
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
}

.task-count {
  font-size: 14px;
  color: #8c8c8c;
  font-weight: normal;
}

.task-list {
  background: #fff;
  border-radius: 8px;
}

.completed-list {
  opacity: 0.8;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.3s;
}

.task-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-info {
  margin-left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-time {
  color: #8c8c8c;
  font-size: 12px;
}

.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.task-completed {
  text-decoration: line-through;
  color: #8c8c8c;
}

.completed .task-actions {
  opacity: 0.5;
}

:deep(.ant-list-item) {
  padding: 12px 24px;
}

:deep(.ant-checkbox-wrapper) {
  font-size: 14px;
}

:deep(.ant-tag) {
  margin: 0;
}

.sidebar {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  margin-bottom: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.sidebar-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
}

.completion-card .progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.progress-info {
  display: flex;
  gap: 24px;
}

.info-item {
  text-align: center;
}

.info-item .label {
  display: block;
  color: #8c8c8c;
  font-size: 12px;
}

.info-item .value {
  display: block;
  font-size: 20px;
  font-weight: 500;
  color: #262626;
}

.calendar-card :deep(.ant-picker-calendar) {
  border-radius: 8px;
}

.date-cell {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.task-indicator {
  position: absolute;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all 0.3s;
}

.task-indicator.all-completed {
  background-color: #52c41a; /* 绿色 */
}

.task-indicator.not-all-completed {
  background-color: #ff4d4f; /* 红色 */
}

/* 优化日历头部选择器样式，让年月日对齐 */
.calendar-card :deep(.ant-picker-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calendar-card :deep(.ant-picker-header-view) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendar-card :deep(.ant-picker-header-view button) {
  display: flex;
  align-items: center;
}

/* 鼠标悬停在有任务的日期上时的样式 */
.date-cell:hover .task-indicator {
  transform: scale(1.2);
  background-color: #40a9ff;
}

.ai-assistant-card {
  background: #fff;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #000;
}

.ai-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ai-tip {
  color: #666;
  margin: 0 0 12px;
  font-size: 14px;
}

.ai-suggestions {
  margin-bottom: 16px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  color: #333;
}

.suggestion-item :deep(.anticon) {
  margin-top: 4px;
  color: #666;
}

.suggestion-text {
  font-size: 14px;
  line-height: 1.6;
}

.generate-btn {
  background: #1890ff;
  border: none;
  height: 40px;
  font-size: 14px;
}

.generate-btn:hover {
  background: #40a9ff;
}

.task-description {
  color: #8c8c8c;
  font-size: 12px;
  margin-left: 8px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
