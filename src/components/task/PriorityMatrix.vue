<template>
    <div class="quadrant-container">
        <!-- 紧急且重要 -->
        <div class="quadrant urgent-important">
            <QuadrantHeader title="紧急且重要" icon="❗" />
            <TaskItem v-for="(task, index) in urgentImportantTasks" :key="index" :task="task"
                @toggle="toggleTaskStatus('urgentImportant', index)" />
        </div>

        <!-- 紧急不重要 -->
        <div class="quadrant urgent-not-important">
            <QuadrantHeader title="紧急不重要" icon="⏳" />
            <TaskItem v-for="(task, index) in urgentNotImportantTasks" :key="index" :task="task"
                @toggle="toggleTaskStatus('urgentNotImportant', index)" />
        </div>

        <!-- 重要不紧急 -->
        <div class="quadrant important-not-urgent">
            <QuadrantHeader title="重要不紧急" icon="⭐" />
            <TaskItem v-for="(task, index) in importantNotUrgentTasks" :key="index" :task="task"
                @toggle="toggleTaskStatus('importantNotUrgent', index)" />
        </div>

        <!-- 不紧急不重要 -->
        <div class="quadrant not-urgent-not-important">
            <QuadrantHeader title="不紧急不重要" icon="📌" />
            <TaskItem v-for="(task, index) in notUrgentNotImportantTasks" :key="index" :task="task"
                @toggle="toggleTaskStatus('notUrgentNotImportant', index)" />
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import QuadrantHeader from './QuadrantHeader.vue'
import TaskItem from './TaskItem.vue'

// 任务状态管理
const tasks = reactive({
    urgentImportant: [
        {
            title: '完成项目提案',
            desc: '撰写并提交季度项目提案文档',
            time: '今天18:00',
            completed: false
        }
    ],
    urgentNotImportant: [
        {
            title: '回复客户邮件',
            desc: '关于产品咨询的5封未读邮件',
            time: '今天12:00',
            completed: false
        },
        {
            title: '购买办公用品',
            desc: '订购打印机墨盒和A4纸',
            time: '明天15:00',
            completed: false
        }
    ],
    importantNotUrgent: [
        {
            title: '学习新技术',
            desc: '研究新的前端框架技术文档',
            time: '周五18:00',
            completed: false
        },
        {
            title: '团队周会',
            desc: '每周三上午的固定团队会议',
            time: '周三10:00',
            completed: false
        }
    ],
    notUrgentNotImportant: [
        {
            title: '整理办公桌',
            desc: '清理桌面和归档文件',
            time: '本周内',
            completed: false
        }
    ]
});

// 计算属性：获取各象限任务
const urgentImportantTasks = computed(() => tasks.urgentImportant);
const urgentNotImportantTasks = computed(() => tasks.urgentNotImportant);
const importantNotUrgentTasks = computed(() => tasks.importantNotUrgent);
const notUrgentNotImportantTasks = computed(() => tasks.notUrgentNotImportant);

// 切换任务状态
const toggleTaskStatus = (category, index) => {
    tasks[category][index].completed = !tasks[category][index].completed;
};
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
.urgent-important {
    background: #ffe6e6;
}

/* 浅粉色 */
.urgent-not-important {
    background: #fff9e6;
}

/* 浅黄色 */
.important-not-urgent {
    background: #e6f4ff;
}

/* 浅蓝色 */
.not-urgent-not-important {
    background: #f5f5f5;
}

/* 浅灰色 */
</style>