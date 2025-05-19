<template>
    <div class="quadrant-container">
        <!-- 紧急且重要 -->
        <div class="quadrant urgent-important">
            <QuadrantHeader title="紧急且重要" icon="❗" />
            <div class="task-list">
                <template v-if="urgentImportantTasks.length > 0">
                    <TaskItem v-for="(task, index) in urgentImportantTasks" :key="index" :task="task"
                        @toggle="toggleTaskStatus('urgentImportant', index)" />
                </template>
                <div v-else class="empty-state">
                    <span>您还没有添加任务哦~</span>
                </div>
            </div>
        </div>

        <!-- 紧急不重要 -->
        <div class="quadrant urgent-not-important">
            <QuadrantHeader title="紧急不重要" icon="⏳" />
            <div class="task-list">
                <template v-if="urgentNotImportantTasks.length > 0">
                    <TaskItem v-for="(task, index) in urgentNotImportantTasks" :key="index" :task="task"
                        @toggle="toggleTaskStatus('urgentNotImportant', index)" />
                </template>
                <div v-else class="empty-state">
                    <span>您还没有添加任务哦~</span>
                </div>
            </div>
        </div>

        <!-- 重要不紧急 -->
        <div class="quadrant important-not-urgent">
            <QuadrantHeader title="重要不紧急" icon="⭐" />
            <div class="task-list">
                <template v-if="importantNotUrgentTasks.length > 0">
                    <TaskItem v-for="(task, index) in importantNotUrgentTasks" :key="index" :task="task"
                        @toggle="toggleTaskStatus('importantNotUrgent', index)" />
                </template>
                <div v-else class="empty-state">
                    <span>您还没有添加任务哦~</span>
                </div>
            </div>
        </div>

        <!-- 不紧急不重要 -->
        <div class="quadrant not-urgent-not-important">
            <QuadrantHeader title="不紧急不重要" icon="📌" />
            <div class="task-list">
                <template v-if="notUrgentNotImportantTasks.length > 0">
                    <TaskItem v-for="(task, index) in notUrgentNotImportantTasks" :key="index" :task="task"
                        @toggle="toggleTaskStatus('notUrgentNotImportant', index)" />
                </template>
                <div v-else class="empty-state">
                    <span>您还没有添加任务哦~</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import QuadrantHeader from '@/components/task/QuadrantHeader.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import { getAllQuadrantTasks, completeQuadrantTask } from '@/api/quadrant'
import { message } from 'ant-design-vue'

// 任务状态管理
const tasks = reactive({
    urgentImportant: [],
    urgentNotImportant: [],
    importantNotUrgent: [],
    notUrgentNotImportant: []
});

// 计算属性：获取各象限任务
const urgentImportantTasks = computed(() => tasks.urgentImportant);
const urgentNotImportantTasks = computed(() => tasks.urgentNotImportant);
const importantNotUrgentTasks = computed(() => tasks.importantNotUrgent);
const notUrgentNotImportantTasks = computed(() => tasks.notUrgentNotImportant);

// 获取四象限任务列表
const fetchQuadrantTasks = async () => {
    try {
        const res = await getAllQuadrantTasks();
        if (res) {
            // 清空现有任务
            tasks.urgentImportant = [];
            tasks.urgentNotImportant = [];
            tasks.importantNotUrgent = [];
            tasks.notUrgentNotImportant = [];

            // 根据象限类型分类任务
            res.forEach(task => {
                const taskItem = {
                    id: task.quadrantTaskId,
                    title: task.title,
                    desc: task.description || '',
                    time: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '无截止日期',
                    completed: false,
                    taskType: task.taskType // 0:每日任务 1:长期任务
                };

                switch (task.quadrantType) {
                    case 1:
                        tasks.urgentImportant.push(taskItem);
                        break;
                    case 2:
                        tasks.urgentNotImportant.push(taskItem);
                        break;
                    case 3:
                        tasks.importantNotUrgent.push(taskItem);
                        break;
                    case 4:
                        tasks.notUrgentNotImportant.push(taskItem);
                        break;
                }
            });
        }
    } catch (error) {
        console.error('获取四象限任务失败:', error);
        message.error('获取四象限任务失败');
    }
};

// 切换任务状态
const toggleTaskStatus = async (category, index) => {
    try {
        const task = tasks[category][index];
        await completeQuadrantTask(task.id);
        // 从列表中移除任务
        tasks[category].splice(index, 1);
        message.success('任务已完成');
    } catch (error) {
        console.error('完成任务失败:', error);
        message.error('完成任务失败');
    }
};

// 组件挂载时获取数据
onMounted(async () => {
    await fetchQuadrantTasks();
});
</script>

<style scoped>
/* 四象限布局 */
.quadrant-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
}

/* 象限通用样式 */
.quadrant {
    padding: 20px;
    border-radius: 12px;
    min-height: 300px;
}

/* 各象限背景色 */
/* 浅红色 */
.urgent-important {
    background: #ffe6e6;
}

/* 浅黄色 */
.urgent-not-important {
    background: #fff9e6;
}

/* 浅蓝色 */
.important-not-urgent {
    background: #e6f4ff;
}

/* 浅灰色 */
.not-urgent-not-important {
    background: rgb(240, 231, 231);
}

</style>

<style scoped>
/* 新增滚动容器样式 */
.task-list {
    overflow-y: auto;
    height: calc(100% - 60px); /* 留出Header空间 */
    padding-right: 8px;
}

/* 自定义滚动条 */
.task-list::-webkit-scrollbar {
    width: 6px;
}

.task-list::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
}

/* 调整象限容器高度 */
.quadrant {
    padding: 20px;
    border-radius: 12px;
    height: 360px; /* 固定高度 */
    display: flex;
    flex-direction: column;
}

/* 空状态样式 */
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 20px;
}
</style>