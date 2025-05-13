<template>
    <div class="long-term-plan">
        <div class="main-content">
            <!-- 左侧任务列表 -->
            <div class="task-list-container">
                <a-tabs 
                    v-model:activeKey="activeTaskGroup" 
                    type="card"
                    class="custom-tabs"
                >
                    <template #rightExtra>
                        <a-space>
                            <a-select
                                v-model:value="sortType"
                                style="width: 120px"
                                @change="handleSortChange"
                            >
                                <a-select-option value="dueDate">截止日期</a-select-option>
                                <a-select-option value="priority">优先级</a-select-option>
                                <a-select-option value="progress">完成进度</a-select-option>
                            </a-select>
                            <a-button type="primary" @click="showAddGroupModal">
                                <template #icon><PlusOutlined /></template>
                                添加任务组
                            </a-button>
                        </a-space>
                    </template>
                    <a-tab-pane v-for="group in taskGroups" :key="group.key" :tab="group.title">
                        <template #tab>
                            <span class="tab-title">
                                {{ group.title }}
                                <DeleteOutlined 
                                    v-if="taskGroups.length > 1"
                                    class="delete-icon"
                                    @click.stop="confirmDeleteGroup(group)" 
                                />
                            </span>
                        </template>
                        <!-- 任务类别列表 -->
                        <div class="task-categories">
                            <a-collapse 
                                v-model:activeKey="activeCategories"
                                class="custom-collapse"
                            >
                                <a-collapse-panel 
                                    v-for="category in group.categories" 
                                    :key="category.key" 
                                >
                                    <template #header>
                                        <div class="category-header">
                                            <span>{{ category.title }}</span>
                                            <a-space>
                                                <a-button type="link" @click.stop="showAddTaskModal(category)">
                                                    <PlusOutlined />添加任务
                                                </a-button>
                                                <DeleteOutlined 
                                                    class="delete-icon"
                                                    @click.stop="confirmDeleteCategory(group, category)" 
                                                />
                                            </a-space>
                                        </div>
                                    </template>
                                    <!-- 任务列表 -->
                                    <div class="task-list">
                                        <!-- 未完成任务 -->
                                        <div class="task-section">
                                            <div class="section-header">
                                                <h3>进行中</h3>
                                                <span class="task-count">{{ category.tasks.filter(t => !t.completed).length }}个任务</span>
                                            </div>
                                            <a-list :dataSource="category.tasks.filter(t => !t.completed)" class="custom-list">
                                                <template #renderItem="{ item }">
                                                    <a-list-item class="task-list-item">
                                                        <div class="task-item">
                                                            <div class="task-left">
                                                                <a-checkbox 
                                                                    v-model:checked="item.completed"
                                                                    :class="{ 'task-completed': item.completed }"
                                                                    @click.stop
                                                                >
                                                                    {{ item.title }}
                                                                </a-checkbox>
                                                            </div>
                                                            <div class="task-right">
                                                                <a-space>
                                                                    <a-tag :color="getPriorityColor(item.priority)">
                                                                        {{ getPriorityText(item.priority) }}
                                                                    </a-tag>
                                                                    <a-button 
                                                                        type="link"
                                                                        @click="handleTaskClick(item)"
                                                                    >
                                                                        <EditOutlined />
                                                                    </a-button>
                                                                    <a-button 
                                                                        type="link" 
                                                                        danger
                                                                        @click.stop="confirmDeleteTask(category, item)"
                                                                    >
                                                                        <DeleteOutlined />
                                                                    </a-button>
                                                                </a-space>
                                                            </div>
                                                        </div>
                                                        <div class="task-meta">
                                                            <span class="due-date">
                                                                <CalendarOutlined /> {{ item.dueDate }}
                                                            </span>
                                                        </div>
                                                    </a-list-item>
                                                </template>
                                            </a-list>
                                        </div>

                                        <!-- 已完成任务 -->
                                        <div class="task-section completed-section" v-if="category.tasks.filter(t => t.completed).length > 0">
                                            <div class="section-header">
                                                <h3>已完成</h3>
                                                <span class="task-count">{{ category.tasks.filter(t => t.completed).length }}个任务</span>
                                            </div>
                                            <a-list :dataSource="category.tasks.filter(t => t.completed)" class="custom-list">
                                                <template #renderItem="{ item }">
                                                    <a-list-item class="task-list-item completed">
                                                        <div class="task-item">
                                                            <div class="task-left">
                                                                <a-checkbox 
                                                                    v-model:checked="item.completed"
                                                                    :class="{ 'task-completed': item.completed }"
                                                                    @click.stop
                                                                >
                                                                    {{ item.title }}
                                                                </a-checkbox>
                                                            </div>
                                                            <div class="task-right">
                                                                <a-space>
                                                                    <a-tag :color="getPriorityColor(item.priority)">
                                                                        {{ getPriorityText(item.priority) }}
                                                                    </a-tag>
                                                                    <a-button 
                                                                        type="link"
                                                                        @click="handleTaskClick(item)"
                                                                    >
                                                                        <EditOutlined />
                                                                    </a-button>
                                                                    <a-button 
                                                                        type="link" 
                                                                        danger
                                                                        @click.stop="confirmDeleteTask(category, item)"
                                                                    >
                                                                        <DeleteOutlined />
                                                                    </a-button>
                                                                </a-space>
                                                            </div>
                                                        </div>
                                                        <div class="task-meta">
                                                            <span class="due-date">
                                                                <CalendarOutlined /> {{ item.dueDate }}
                                                            </span>
                                                        </div>
                                                    </a-list-item>
                                                </template>
                                            </a-list>
                                        </div>
                                    </div>
                                </a-collapse-panel>
                            </a-collapse>
                            <!-- 添加任务类别按钮 -->
                            <a-button 
                                type="dashed" 
                                block 
                                @click="showAddCategoryModal" 
                                class="add-category-btn"
                            >
                                <PlusOutlined /> 添加任务类别
                            </a-button>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>

            <!-- 右侧任务详情 -->
            <div class="task-detail-container">
                <template v-if="selectedTask">
                    <div class="detail-header">
                        <h2>任务详情</h2>
                        <a-space>
                            <a-button type="primary" @click="handleTaskUpdate">确定</a-button>
                            <a-button @click="cancelEdit">取消</a-button>
                        </a-space>
                    </div>
                    <div class="detail-content">
                        <h3>任务名称</h3>
                        <a-input v-model:value="selectedTask.title" />
                        
                        <h3>截止时间</h3>
                        <a-date-picker 
                            v-model:value="selectedTask.dueDate" 
                            style="width: 100%" 
                            valueFormat="YYYY-MM-DD"
                        />
                        
                        <h3>优先级</h3>
                        <a-radio-group v-model:value="selectedTask.priority" class="priority-group">
                            <a-radio-button value="low">低</a-radio-button>
                            <a-radio-button value="medium">中</a-radio-button>
                            <a-radio-button value="high">高</a-radio-button>
                        </a-radio-group>
                        
                        <h3>描述</h3>
                        <a-textarea 
                            v-model:value="selectedTask.description" 
                            :rows="4" 
                            placeholder="添加任务描述..."
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="task-statistics">
                        <h2>任务概览</h2>
                        <div class="statistics-content">
                            <a-row :gutter="[16, 16]">
                                <a-col :span="12">
                                    <a-card>
                                        <template #title>总任务数</template>
                                        <h3>{{ getTotalTasks() }}</h3>
                                    </a-card>
                                </a-col>
                                <a-col :span="12">
                                    <a-card>
                                        <template #title>已完成</template>
                                        <h3>{{ getCompletedTasks() }}</h3>
                                    </a-card>
                                </a-col>
                                <a-col :span="12">
                                    <a-card>
                                        <template #title>待完成</template>
                                        <h3>{{ getPendingTasks() }}</h3>
                                    </a-card>
                                </a-col>
                                <a-col :span="12">
                                    <a-card>
                                        <template #title>完成率</template>
                                        <h3>{{ getCompletionRate() }}%</h3>
                                    </a-card>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 添加任务组弹窗 -->
        <a-modal
            v-model:open="groupModalVisible"
            title="添加任务组"
            @ok="handleAddGroup"
            @cancel="groupModalVisible = false"
        >
            <a-form :model="newGroup" layout="vertical">
                <a-form-item label="任务组名称" required>
                    <a-input v-model:value="newGroup.title" placeholder="请输入任务组名称" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 添加任务类别弹窗 -->
        <a-modal
            v-model:open="categoryModalVisible"
            title="添加任务类别"
            @ok="handleAddCategory"
            @cancel="categoryModalVisible = false"
        >
            <a-form :model="newCategory" layout="vertical">
                <a-form-item label="类别名称" required>
                    <a-input v-model:value="newCategory.title" placeholder="请输入类别名称" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 添加任务弹窗 -->
        <a-modal
            v-model:open="taskModalVisible"
            title="添加任务"
            @ok="handleAddTask"
            @cancel="taskModalVisible = false"
        >
            <a-form :model="newTask" layout="vertical">
                <a-form-item label="任务名称">
                    <a-input v-model:value="newTask.title" />
                </a-form-item>
                <a-form-item label="优先级">
                    <a-select v-model:value="newTask.priority">
                        <a-select-option value="high">高</a-select-option>
                        <a-select-option value="medium">中</a-select-option>
                        <a-select-option value="low">低</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="截止日期">
                    <a-date-picker 
                        v-model:value="newTask.dueDate" 
                        style="width: 100%" 
                        valueFormat="YYYY-MM-DD"
                    />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 删除确认弹窗 -->
        <a-modal
            v-model:open="deleteModalVisible"
            title="确认删除"
            @ok="handleDelete"
            @cancel="cancelDelete"
            :okType="'danger'"
            okText="删除"
            cancelText="取消"
        >
            <p>{{ deleteConfirmMessage }}</p>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
    PlusOutlined, 
    DeleteOutlined, 
    CalendarOutlined,
    EditOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { listAllLongTermTask } from '@/api/longTermTask'

// 当前激活的任务组
const activeTaskGroup = ref('1')
// 当前展开的任务类别
const activeCategories = ref(['1'])

// 弹窗显示状态
const taskModalVisible = ref(false)
const groupModalVisible = ref(false)
const categoryModalVisible = ref(false)

// 当前选中的任务类别
const currentCategory = ref(null)

// 新任务组数据
const newGroup = reactive({
    title: ''
})

// 新任务类别数据
const newCategory = reactive({
    title: ''
})

// 新任务数据
const newTask = reactive({
    title: '',
    priority: 'medium',
    dueDate: null,
    description: '',
    completed: false
})

// 删除相关的状态
const deleteModalVisible = ref(false)
const deleteConfirmMessage = ref('')
const deleteCallback = ref(null)

// 排序方式
const sortType = ref('dueDate')

// 任务详情抽屉相关
const taskDrawerVisible = ref(false)
const selectedTask = ref(null)

// 获取优先级颜色
const getPriorityColor = (priority) => {
    const colors = {
        high: 'red',
        medium: 'orange',
        low: 'blue'
    }
    return colors[priority] || 'blue'
}

// 获取优先级文本
const getPriorityText = (priority) => {
    const texts = {
        high: '高优先级',
        medium: '中优先级',
        low: '低优先级'
    }
    return texts[priority] || '普通'
}

// 获取进度条状态
const getProgressStatus = (task) => {
    if (task.completed) return 'success'
    if (task.progress >= 100) return 'success'
    if (new Date(task.dueDate) < new Date()) return 'exception'
    return 'active'
}

// 方法定义
const showAddTaskModal = (category) => {
    currentCategory.value = category
    taskModalVisible.value = true
    // 重置表单
    Object.assign(newTask, {
        title: '',
        priority: 'medium',
        dueDate: null,
        description: '',
        completed: false
    })
}

const handleAddTask = () => {
    if (!newTask.title) {
        message.error('请输入任务名称')
        return
    }

    if (currentCategory.value) {
        const task = {
            id: Date.now().toString(),
            ...newTask
        }
        
        // 找到对应的任务类别并添加任务
        const group = taskGroups.value.find(g => g.key === activeTaskGroup.value)
        if (group) {
            const category = group.categories.find(c => c.key === currentCategory.value.key)
            if (category) {
                category.tasks.push(task)
                message.success('添加任务成功')
                taskModalVisible.value = false
            }
        }
    }
}

const showAddCategoryModal = () => {
    categoryModalVisible.value = true
    newCategory.title = ''
}

const handleAddCategory = () => {
    if (!newCategory.title) {
        message.error('请输入类别名称')
        return
    }

    const group = taskGroups.value.find(g => g.key === activeTaskGroup.value)
    if (group) {
        const category = {
            key: Date.now().toString(),
            title: newCategory.title,
            tasks: []
        }
        group.categories.push(category)
        message.success('添加类别成功')
        categoryModalVisible.value = false
    }
}

const showAddGroupModal = () => {
    groupModalVisible.value = true
    newGroup.title = ''
}

const handleAddGroup = () => {
    if (!newGroup.title) {
        message.error('请输入任务组名称')
        return
    }

    const group = {
        key: Date.now().toString(),
        title: newGroup.title,
        categories: []
    }
    taskGroups.value.push(group)
    message.success('添加任务组成功')
    groupModalVisible.value = false
}

// 确认删除任务组
const confirmDeleteGroup = (group) => {
    deleteConfirmMessage.value = `确定要删除任务组"${group.title}"吗？这将删除该组下的所有任务类别和任务。`
    deleteCallback.value = () => {
        const index = taskGroups.value.findIndex(g => g.key === group.key)
        if (index !== -1) {
            taskGroups.value.splice(index, 1)
            message.success('删除任务组成功')
        }
    }
    deleteModalVisible.value = true
}

// 确认删除任务类别
const confirmDeleteCategory = (group, category) => {
    deleteConfirmMessage.value = `确定要删除任务类别"${category.title}"吗？这将删除该类别下的所有任务。`
    deleteCallback.value = () => {
        const groupIndex = taskGroups.value.findIndex(g => g.key === group.key)
        if (groupIndex !== -1) {
            const categoryIndex = group.categories.findIndex(c => c.key === category.key)
            if (categoryIndex !== -1) {
                group.categories.splice(categoryIndex, 1)
                message.success('删除任务类别成功')
            }
        }
    }
    deleteModalVisible.value = true
}

// 确认删除任务
const confirmDeleteTask = (category, task) => {
    deleteConfirmMessage.value = `确定要删除任务"${task.title}"吗？`
    deleteCallback.value = () => {
        const taskIndex = category.tasks.findIndex(t => t.id === task.id)
        if (taskIndex !== -1) {
            category.tasks.splice(taskIndex, 1)
            message.success('删除任务成功')
        }
    }
    deleteModalVisible.value = true
}

// 处理删除操作
const handleDelete = () => {
    if (deleteCallback.value) {
        deleteCallback.value()
        deleteModalVisible.value = false
        deleteCallback.value = null
    }
}

// 取消删除
const cancelDelete = () => {
    deleteModalVisible.value = false
    deleteCallback.value = null
}

// 处理排序变化
const handleSortChange = (value) => {
    const group = taskGroups.value.find(g => g.key === activeTaskGroup.value)
    if (group) {
        group.categories.forEach(category => {
            category.tasks.sort((a, b) => {
                switch (value) {
                    case 'dueDate':
                        return new Date(a.dueDate) - new Date(b.dueDate)
                    case 'priority':
                        const priorityWeight = { high: 3, medium: 2, low: 1 }
                        return priorityWeight[b.priority] - priorityWeight[a.priority]
                    case 'progress':
                        return b.progress - a.progress
                    default:
                        return 0
                }
            })
        })
    }
}

// 修改任务列表点击事件
const handleTaskClick = (task) => {
    selectedTask.value = {
        ...task,
        dueDate: task.dueDate || null
    }
    taskDrawerVisible.value = true
}

// 保存任务更新
const handleTaskUpdate = () => {
    if (selectedTask.value) {
        // 更新原始任务数据
        const group = taskGroups.value.find(g => g.key === activeTaskGroup.value)
        if (group) {
            group.categories.forEach(category => {
                const taskIndex = category.tasks.findIndex(t => t.id === selectedTask.value.id)
                if (taskIndex !== -1) {
                    category.tasks[taskIndex] = { ...selectedTask.value }
                }
            })
        }
        message.success('任务更新成功')
    }
}

// 取消编辑
const cancelEdit = () => {
    selectedTask.value = null
}

// 获取任务统计数据
const getTotalTasks = () => {
    let total = 0
    taskGroups.value.forEach(group => {
        group.categories.forEach(category => {
            total += category.tasks.length
        })
    })
    return total
}

const getCompletedTasks = () => {
    let completed = 0
    taskGroups.value.forEach(group => {
        group.categories.forEach(category => {
            completed += category.tasks.filter(task => task.completed).length
        })
    })
    return completed
}

const getPendingTasks = () => {
    return getTotalTasks() - getCompletedTasks()
}

const getCompletionRate = () => {
    const total = getTotalTasks()
    if (total === 0) return 0
    return Math.round((getCompletedTasks() / total) * 100)
}

// 定义任务组状态
const taskGroups = ref([])

// 挂载时获取数据
onMounted(async () => {
    try {
        const res = await listAllLongTermTask()
        if (res) {
            taskGroups.value = res.map(group => ({
                key: group.groupId.toString(),
                title: group.groupName,
                categories: group.categoryTaskVOList.map(category => ({
                    key: category.categoryId.toString(),
                    title: category.categoryName,
                    tasks: category.longTermTaskDTOList.map(task => ({
                        id: task.longTerTaskId.toString(),
                        title: task.taskName,
                        priority: task.priority === 0 ? 'low' : task.priority === 1 ? 'medium' : 'high',
                        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null,
                        description: task.description,
                        completed: task.completed === 1
                    }))
                }))
            }))
        }
    } catch (err) {
        console.error('加载长期任务失败:', err)
        message.error('加载长期任务失败')
    }
})
</script>

<style scoped>
.long-term-plan {
    padding: 24px;
    background: #f5f9ff;
    min-height: calc(100vh - 48px);
}

.main-content {
    display: flex;
    gap: 24px;
    height: 100%;
}

.task-list-container {
    flex: 1;
    min-width: 0;
}

.task-detail-container {
    width: 400px;
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.detail-header h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.detail-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.detail-content h3 {
    margin: 0;
    font-size: 14px;
    color: #333;
}

.task-statistics h2 {
    margin: 0 0 24px 0;
    font-size: 18px;
    color: #333;
}

.statistics-content :deep(.ant-card) {
    border-radius: 8px;
}

.statistics-content :deep(.ant-card-head-title) {
    font-size: 14px;
    color: #666;
}

.statistics-content h3 {
    margin: 0;
    font-size: 24px;
    color: #1890ff;
    text-align: center;
}

.custom-tabs {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.task-list-item {
    padding: 16px 24px;
    border-radius: 4px;
    margin-bottom: 8px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px 0;
}

.task-left {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.task-right {
    flex-shrink: 0;
    margin-left: 16px;
}

.task-meta {
    margin-top: 8px;
    padding-left: 22px;
}

.due-date {
    color: #666;
    font-size: 13px;
}

.task-completed {
    text-decoration: line-through;
    color: #00000040;
}

.priority-group {
    width: 100%;
    display: flex;
}

:deep(.ant-list-item) {
    flex-direction: column;
    align-items: stretch;
}

:deep(.ant-checkbox-wrapper) {
    color: #333;
}

:deep(.ant-btn-link) {
    padding: 4px 8px;
}

:deep(.ant-space) {
    flex-wrap: nowrap;
}

:deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active) {
    background: #1890ff;
    border-color: #1890ff;
}

:deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn) {
    color: #fff;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
    background-color: #1890ff;
    border-color: #1890ff;
}

.task-section {
    margin-bottom: 24px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
}

.section-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.task-count {
    font-size: 14px;
    color: #999;
}

.completed-section {
    opacity: 0.8;
}

.completed-section .task-list-item {
    background: #fafafa;
}

.task-list-item.completed {
    opacity: 0.8;
}
</style>