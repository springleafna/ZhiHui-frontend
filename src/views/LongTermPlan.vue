<template>
    <div class="long-term-plan">
        <div class="main-content">
            <!-- 左侧任务列表 -->
            <div class="task-list-container">
                <a-tabs 
                    v-model:activeKey="activeTaskGroup" 
                    type="card"
                    class="custom-tabs"
                    v-if="taskGroups.length > 0"
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
                            </a-select>
                            <a-button type="primary" @click="showAddGroupModal">
                                <template #icon><PlusOutlined /></template>
                                添加任务组
                            </a-button>
                        </a-space>
                    </template>
                    <a-tab-pane v-for="group in taskGroups" :key="group.key">
                        <template #tab>
                            <div class="tab-title">
                                {{ group.title }}
                                <a-tooltip title="删除任务组">
                                    <DeleteOutlined 
                                        class="delete-icon"
                                        @click.stop="confirmDeleteGroup(group)" 
                                    />
                                </a-tooltip>
                            </div>
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
                                            <span class="category-title">{{ category.title }}</span>
                                            <div class="category-actions">
                                                <a-tooltip title="添加任务">
                                                    <a-button type="link" @click.stop="showAddTaskModal(category)">
                                                        <PlusOutlined />
                                                    </a-button>
                                                </a-tooltip>
                                                <a-tooltip title="删除类别">
                                                    <a-button type="link" danger @click.stop="confirmDeleteCategory(group, category)">
                                                        <DeleteOutlined />
                                                    </a-button>
                                                </a-tooltip>
                                            </div>
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
                                                                    @change="(e) => handleTaskComplete(item, e.target.checked)"
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
                                                                    <a-tooltip title="添加到任务四象限">
                                                                        <a-button type="link" @click.stop="addToMatrix(item)">
                                                                            <TagsOutlined />
                                                                        </a-button>
                                                                    </a-tooltip>
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
                                                                    @change="(e) => handleTaskComplete(item, e.target.checked)"
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
                                                                    <a-tooltip title="添加到任务四象限">
                                                                        <a-button type="link" @click.stop="addToMatrix(item)">
                                                                            <TagsOutlined />
                                                                        </a-button>
                                                                    </a-tooltip>
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

                <!-- 空状态提示 -->
                <div v-else class="empty-state">
                    <a-empty
                        :image="simpleImage"
                        :description="false"
                    >
                        <template #description>
                            <span class="empty-text">您还没有添加计划哦~请先添加任务组</span>
                        </template>
                        <a-button type="primary" @click="showAddGroupModal">
                            <template #icon><PlusOutlined /></template>
                            添加任务组
                        </a-button>
                    </a-empty>
                </div>
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
                            :rows="10" 
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
                <a-form-item label="描述" name="description">
                    <a-textarea 
                        v-model:value="newTask.description" 
                        placeholder="请输入任务描述（选填）" 
                        :rows="4"
                        :allowClear="true"
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

        <!-- 四象限弹窗 -->
        <a-modal
            v-model:open="matrixModalVisible"
            title="将任务加入到任务四象限"
            @ok="confirmAddToMatrix"
            @cancel="() => matrixModalVisible = false"
        >
            <a-form :model="matrixForm" ref="matrixFormRef">
                <a-form-item label="选择象限" name="quadrant">
                    <a-select v-model:value="matrixForm.quadrant" placeholder="请选择任务象限">
                        <a-select-option :value="1">紧急且重要</a-select-option>
                        <a-select-option :value="2">紧急不重要</a-select-option>
                        <a-select-option :value="3">不紧急但重要</a-select-option>
                        <a-select-option :value="4">不紧急不重要</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
    PlusOutlined, 
    DeleteOutlined, 
    CalendarOutlined,
    EditOutlined,
    TagsOutlined
} from '@ant-design/icons-vue'
import { message, Empty } from 'ant-design-vue'
import { 
    listAllLongTermTask, 
    saveLongTermTask, 
    deleteLongTermTask, 
    updateLongTermTask, 
    completeLongTermTask,
    insertGroupTask,
    deleteGroupTask,
    insertCategoryTask,
    deleteCategoryTask
} from '@/api/longTermTask'
import { addTaskToQuadrant } from '@/api/quadrant'

const { simpleImage } = Empty

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

// 四象限相关
const matrixModalVisible = ref(false)
const selectedTaskForMatrix = ref(null)
const matrixForm = ref({
    quadrant: 1
})
const matrixFormRef = ref(null)

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

const handleAddTask = async () => {
    if (!newTask.title) {
        message.error('请输入任务名称')
        return
    }

    try {
        await saveLongTermTask({
            taskName: newTask.title,
            description: newTask.description || '',
            priority: getPriorityNumber(newTask.priority),
            dueDate: newTask.dueDate,
            categoryId: parseInt(currentCategory.value.key)
        })
        
        // 重新获取并更新任务列表
        await updateTaskList()
        message.success('添加任务成功')
        taskModalVisible.value = false
        // 重置表单
        Object.assign(newTask, {
            title: '',
            priority: 'medium',
            dueDate: null,
            description: '',
            completed: false
        })
    } catch (error) {
        console.error('添加任务失败:', error)
    }
}

const showAddCategoryModal = () => {
    categoryModalVisible.value = true
    newCategory.title = ''
}

const handleAddCategory = async () => {
    if (!newCategory.title) {
        message.error('请输入类别名称')
        return
    }

    try {
        await insertCategoryTask({
            categoryName: newCategory.title,
            groupId: parseInt(activeTaskGroup.value)
        })
        
        // 重新获取并更新任务列表
        await updateTaskList()
        message.success('添加类别成功')
        categoryModalVisible.value = false
        newCategory.title = ''
    } catch (error) {
        console.error('添加类别失败:', error)
    }
}

const showAddGroupModal = () => {
    groupModalVisible.value = true
    newGroup.title = ''
}

const handleAddGroup = async () => {
    if (!newGroup.title) {
        message.error('请输入任务组名称')
        return
    }

    try {
        await insertGroupTask({
            groupName: newGroup.title
        })
        
        // 重新获取并更新任务列表
        await updateTaskList()
        message.success('添加任务组成功')
        groupModalVisible.value = false
        newGroup.title = ''
    } catch (error) {
        console.error('添加任务组失败:', error)
    }
}

// 确认删除任务组
const confirmDeleteGroup = (group) => {
    deleteConfirmMessage.value = `确定要删除任务组"${group.title}"吗？这将删除该组下的所有任务类及任务。`;
    deleteCallback.value = () => handleDeleteGroup(group);
    deleteModalVisible.value = true;
};

// 处理删除任务组
const handleDeleteGroup = async (group) => {
    try {
        await deleteGroupTask(parseInt(group.key))
        // 重新获取并更新任务列表
        await updateTaskList()
        
        // 如果当前激活的任务组被删除，切换到第一个任务组或清空
        if (activeTaskGroup.value === group.key) {
            if (taskGroups.value.length > 0) {
                activeTaskGroup.value = taskGroups.value[0].key
            } else {
                activeTaskGroup.value = ''
            }
        }
        
        message.success('任务组删除成功')
    } catch (error) {
        console.error('删除任务组失败:', error)
        message.error('删除任务组失败')
    }
    deleteModalVisible.value = false
}

// 确认删除任务类别
const confirmDeleteCategory = (group, category) => {
    deleteConfirmMessage.value = `确定要删除任务类别"${category.title}"吗？这将删除该类别下的所有任务。`
    deleteCallback.value = () => handleDeleteCategory(category)
    deleteModalVisible.value = true
}

// 处理删除任务类别
const handleDeleteCategory = async (category) => {
    try {
        await deleteCategoryTask(parseInt(category.key))
        // 重新获取并更新任务列表
        await updateTaskList()
        message.success('删除任务类别成功')
    } catch (error) {
        console.error('删除任务类别失败:', error)
        message.error('删除任务类别失败')
    }
    deleteModalVisible.value = false
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
const handleTaskUpdate = async () => {
    if (selectedTask.value) {
        try {
            await updateLongTermTask({
                longTermTaskId: parseInt(selectedTask.value.id),
                taskName: selectedTask.value.title,
                description: selectedTask.value.description || '',
                priority: getPriorityNumber(selectedTask.value.priority),
                dueDate: selectedTask.value.dueDate
            })
            
            // 重新获取并更新任务列表
            await updateTaskList()
            message.success('任务更新成功')
            selectedTask.value = null
        } catch (error) {
            console.error('更新任务失败:', error)
            message.error('更新任务失败')
        }
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

// 更新任务列表数据
const updateTaskList = async () => {
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
            
            // 如果有任务组且当前没有选中的任务组，自动选中第一个
            if (taskGroups.value.length > 0 && !activeTaskGroup.value) {
                activeTaskGroup.value = taskGroups.value[0].key
            }
        }
    } catch (err) {
        console.error('加载长期任务失败:', err)
        message.error('加载长期任务失败')
    }
}

// 挂载时获取数据
onMounted(async () => {
    await updateTaskList()
})

// 添加到四象限
const addToMatrix = (task) => {
    selectedTaskForMatrix.value = task
    matrixModalVisible.value = true
}

// 确认添加到四象限
const confirmAddToMatrix = async () => {
    if (selectedTaskForMatrix.value && matrixForm.value.quadrant) {
        try {
            const success = await addTaskToQuadrant({
                task: selectedTaskForMatrix.value,
                quadrantType: matrixForm.value.quadrant,
                taskType: 1 // 1表示长期任务
            })
            
            if (success) {
                const quadrantLabels = {
                    1: '紧急且重要',
                    2: '紧急不重要',
                    3: '不紧急但重要',
                    4: '不紧急不重要'
                }
                message.success(`已将任务 "${selectedTaskForMatrix.value.title}" 添加到 ${quadrantLabels[matrixForm.value.quadrant]}`)
                matrixModalVisible.value = false
                selectedTaskForMatrix.value = null
                matrixForm.value.quadrant = 1
            }
            // 如果 success 为 false (任务已存在)，则不执行这里的成功提示和modal关闭逻辑

        } catch (error) {
            console.error('添加到四象限失败:', error)
            message.error('添加到四象限失败')
        }
    }
}

// 优先级文本转数字
const getPriorityNumber = (priority) => {
    const priorityMap = {
        low: 0,
        medium: 1,
        high: 2
    }
    return priorityMap[priority] || 0
}

// 确认删除任务
const confirmDeleteTask = (category, task) => {
    deleteConfirmMessage.value = `确定要删除任务"${task.title}"吗？`
    deleteCallback.value = () => handleDeleteTask(task)
    deleteModalVisible.value = true
}

// 处理删除任务
const handleDeleteTask = async (task) => {
    try {
        await deleteLongTermTask(parseInt(task.id))
        // 重新获取并更新任务列表
        await updateTaskList()
        message.success('删除任务成功')
    } catch (error) {
        console.error('删除任务失败:', error)
        message.error('删除任务失败')
    }
    deleteModalVisible.value = false
}

// 处理任务完成状态更新
const handleTaskComplete = async (task, completed) => {
    try {
        await completeLongTermTask(parseInt(task.id), completed ? 1 : 0)
        // 更新本地状态
        task.completed = completed
        message.success(`任务${completed ? '已完成' : '已取消完成'}`)
    } catch (error) {
        // 如果API调用失败，恢复复选框状态
        task.completed = !completed
        console.error('更新任务状态失败:', error)
        message.error('更新任务状态失败')
    }
}
</script>

<style scoped>
.long-term-plan {
    padding: 16px;
    background: #f5f9ff;
    min-height: calc(100vh - 48px);
}

.main-content {
    display: flex;
    gap: 16px;
    height: 100%;
    max-width: 1600px;
    margin: 0 auto;
}

.task-list-container {
    flex: 2;
    min-width: 0;
}

.task-detail-container {
    width: 380px;
    background: white;
    border-radius: 8px;
    padding: 20px;
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
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.task-list-item {
    padding: 20px 24px;
    border-radius: 8px;
    margin-bottom: 12px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
}

.task-list-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.task-left :deep(.ant-checkbox-wrapper) {
    font-size: 16px;
}

.task-right {
    flex-shrink: 0;
    margin-left: 24px;
}

.task-right :deep(.ant-tag) {
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
}

.task-right :deep(.ant-btn-link) {
    font-size: 16px;
    padding: 8px;
}

.task-meta {
    margin-top: 12px;
    padding-left: 24px;
}

.due-date {
    color: #666;
    font-size: 14px;
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
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
}

.section-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
    font-weight: 500;
}

.task-count {
    font-size: 15px;
    color: #666;
    background: #f5f7fa;
    padding: 4px 12px;
    border-radius: 16px;
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
.delete-icon {
    margin-left: 8px;
    cursor: pointer;
    color: #ff4d4f;
    opacity: 1; /* 确保图标可见 */
    font-size: 16px; /* 设置图标大小 */
}

.delete-icon:hover {
    opacity: 1;
}

.tab-title {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    padding-right: 24px;
}

.delete-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #999;
    cursor: pointer;
    transition: all 0.3s;
    opacity: 0;
}

.tab-title:hover .delete-icon {
    opacity: 1;
    color: #ff4d4f;
}

:deep(.ant-tabs-tab) {
    position: relative;
    padding-right: 8px !important;
}

:deep(.ant-tabs-tab-active) .delete-icon {
    color: #fff;
    opacity: 0.8;
}

:deep(.ant-tabs-tab-active) .delete-icon:hover {
    opacity: 1;
}

:deep(.ant-tabs-tab) {
    margin: 0 4px 0 0 !important;
    padding: 8px 16px !important;
    transition: all 0.3s;
}

:deep(.ant-tabs-tab:hover) {
    color: #1890ff;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 24px;
}

.category-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.category-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.category-actions :deep(.ant-btn) {
    padding: 4px 8px;
    height: auto;
}

:deep(.ant-collapse-header) {
    padding: 16px 24px !important;
    font-size: 16px !important;
}

:deep(.ant-collapse-content-box) {
    padding: 24px !important;
}

.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    padding: 24px;
}

.empty-text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-bottom: 16px;
    display: block;
}

:deep(.ant-empty) {
    margin: 32px 0;
}

:deep(.ant-empty-image) {
    height: 100px;
    margin-bottom: 24px;
}

.add-category-btn {
    margin-top: 16px;
    height: 48px;
    font-size: 16px;
}
</style>