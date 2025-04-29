<template>
    <div class="long-term-plan">
        <!-- 任务组标签栏 -->
        <a-tabs 
            v-model:activeKey="activeTaskGroup" 
            type="card"
            class="custom-tabs"
        >
            <template #rightExtra>
                <a-button type="primary" @click="showAddGroupModal">
                    <template #icon><PlusOutlined /></template>
                    添加任务组
                </a-button>
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
                                <a-list :dataSource="category.tasks" class="custom-list">
                                    <template #renderItem="{ item }">
                                        <a-list-item class="task-list-item">
                                            <a-list-item-meta>
                                                <template #title>
                                                    <div class="task-item">
                                                        <a-checkbox 
                                                            v-model:checked="item.completed"
                                                            :class="{ 'task-completed': item.completed }"
                                                        >
                                                            {{ item.title }}
                                                        </a-checkbox>
                                                        <a-space>
                                                            <a-tag :color="getPriorityColor(item.priority)">
                                                                {{ getPriorityText(item.priority) }}
                                                            </a-tag>
                                                            <a-button 
                                                                type="text" 
                                                                danger
                                                                @click="confirmDeleteTask(category, item)"
                                                            >
                                                                <DeleteOutlined />
                                                            </a-button>
                                                        </a-space>
                                                    </div>
                                                </template>
                                                <template #description>
                                                    <div class="task-meta">
                                                        <span class="due-date">
                                                            <CalendarOutlined /> {{ item.dueDate }}
                                                        </span>
                                                        <a-progress 
                                                            :percent="item.progress" 
                                                            size="small"
                                                            :status="getProgressStatus(item)"
                                                        />
                                                    </div>
                                                </template>
                                            </a-list-item-meta>
                                        </a-list-item>
                                    </template>
                                </a-list>
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

        <!-- 添加任务组弹窗 -->
        <a-modal
            v-model:visible="groupModalVisible"
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
            v-model:visible="categoryModalVisible"
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
            v-model:visible="taskModalVisible"
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
                    <a-date-picker v-model:value="newTask.dueDate" style="width: 100%" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 删除确认弹窗 -->
        <a-modal
            v-model:visible="deleteModalVisible"
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
import { ref, reactive } from 'vue'
import { 
    PlusOutlined, 
    DeleteOutlined, 
    CalendarOutlined 
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

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
    progress: 0,
    completed: false
})

// 示例数据
const taskGroups = ref([
    {
        key: '1',
        title: '学习',
        categories: [
            {
                key: '1',
                title: '课程学习',
                tasks: [
                    {
                        id: '1',
                        title: '完成高等数学第三章习题',
                        priority: 'high',
                        dueDate: '2024-02-20',
                        progress: 75,
                        completed: false
                    }
                ]
            }
        ]
    }
])

// 删除相关的状态
const deleteModalVisible = ref(false)
const deleteConfirmMessage = ref('')
const deleteCallback = ref(null)

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
        progress: 0,
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
</script>

<style scoped>
.long-term-plan {
    padding: 24px;
    background: #f5f9ff;
    min-height: calc(100vh - 48px);
    overflow-x: hidden;
}

.custom-tabs {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    margin-bottom: 24px;
    overflow-x: auto;
}

.tab-title {
    display: flex;
    align-items: center;
    gap: 8px;
}

.delete-icon {
    font-size: 14px;
    color: #ff4d4f;
    opacity: 0.5;
    transition: all 0.3s;
}

.delete-icon:hover {
    opacity: 1;
}

.task-categories {
    margin-top: 16px;
}

.custom-collapse {
    background: white;
    border-radius: 8px;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.task-list {
    padding: 8px 0;
}

.custom-list {
    background: white;
}

.task-list-item {
    padding: 12px 24px;
    transition: all 0.3s;
}

.task-list-item:hover {
    background: #fafafa;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.task-completed {
    text-decoration: line-through;
    color: #00000040;
}

.task-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    max-width: 100%;
    overflow: hidden;
}

.due-date {
    color: #00000073;
    font-size: 12px;
}

.add-category-btn {
    margin-top: 16px;
}

:deep(.ant-tabs-nav) {
    margin-bottom: 16px;
}

:deep(.ant-tabs-content) {
    overflow-x: auto;
}

:deep(.ant-collapse) {
    max-width: 100%;
    overflow-x: hidden;
}

:deep(.ant-list) {
    max-width: 100%;
    overflow-x: hidden;
}

:deep(.ant-list-item-meta-description) {
    width: 100%;
}

:deep(.ant-progress) {
    width: 200px;
}

:deep(.ant-checkbox-wrapper) {
    flex: 1;
}
</style> 