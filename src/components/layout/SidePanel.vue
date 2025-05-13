<template>
    <div class="side-panel" :class="{ 'collapsed': isCollapsed, 'expanded': !isCollapsed }"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="panel-top">
            <button class="collapse-btn" @click="toggleCollapse">
                <component :is="isCollapsed ? ExpandIcon : CollapseIcon" class="collapse-icon" />
            </button>
        </div>
        <!-- 导航菜单 -->
        <nav class="nav-section">
            <template v-if="activeMode === 'personal'">
                <ul>
                    <li v-for="item in personalNavItems" :key="item.id" 
                        :class="{ 'active': activeItem === item.id }"
                        @click="navigateTo(item)">
                        <div class="nav-icon-container">
                            <component :is="item.icon" class="nav-icon" />
                        </div>
                        <transition name="slide">
                            <span v-show="!isCollapsed" class="nav-label">{{ item.label }}</span>
                        </transition>
                    </li>
                </ul>
            </template>
            <template v-else>
                <ul>
                    <li v-for="item in teamNavItems" :key="item.id" 
                        :class="{ 'active': activeItem === item.id }"
                        @click="navigateTo(item)">
                        <div class="nav-icon-container">
                            <component :is="item.icon" class="nav-icon" />
                        </div>
                        <transition name="slide">
                            <span v-show="!isCollapsed" class="nav-label">{{ item.label }}</span>
                        </transition>
                    </li>
                </ul>
            </template>
        </nav>
    </div>
</template>

<script setup>
import { ref, inject, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TaskIcon from '@/assets/icon-task.svg'
import PlanIcon from '@/assets/icon-task.svg'
import NoteIcon from '@/assets/icon-note.svg'
import KnowledgeIcon from '@/assets/icon-task.svg'
import QuadrantIcon from '@/assets/icon-task.svg'
import ProjectIcon from '@/assets/icon-task.svg'
import TeamIcon from '@/assets/icon-task.svg'
import CollapseIcon from '@/assets/icon-collapse.svg'
import ExpandIcon from '@/assets/icon-expand.svg'

// 定义emit
const emit = defineEmits(['toggle-collapse'])

// 响应式状态
const isCollapsed = ref(false)
const isHovered = ref(false)
const activeItem = ref('')
const router = useRouter()
const route = useRoute()

// 获取当前模式（个人/团队）
const activeMode = inject('activeMode', ref('personal'))

// 个人导航项
const personalNavItems = [
    { id: 'task-center', label: '任务中心', icon: TaskIcon, route: '/dashboard' },
    { id: 'daily-plan', label: '每日计划', icon: PlanIcon, route: '/daily-plan' },
    { id: 'long-term-plan', label: '长期计划', icon: PlanIcon, route: '/long-term-plan' },
    { id: 'task-quadrant', label: '任务四象限', icon: QuadrantIcon, route: '/priority' },
    { id: 'notes', label: '我的笔记', icon: NoteIcon, route: '/notes' },
    { id: 'knowledge', label: '知识库', icon: KnowledgeIcon, route: '/knowledge' }
]

// 团队导航项
const teamNavItems = [
    { id: 'inbox', label: '收件箱', icon: TaskIcon, route: '/team/inbox' },
    { id: 'my-tasks', label: '我的任务', icon: TaskIcon, route: '/team/my-tasks' },
    { id: 'schedule', label: '日程安排', icon: PlanIcon, route: '/team/schedule' },
    { id: 'projects', label: '团队项目', icon: ProjectIcon, route: '/team/projects' },
    { id: 'members', label: '团队成员', icon: TeamIcon, route: '/team/members' }
]

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    emit('toggle-collapse', isCollapsed.value)
}

const navigateTo = (item) => {
    activeItem.value = item.id
    if (item.route) {
        router.push(item.route)
    }
}

// 根据路由路径获取对应的导航项ID
const getNavItemIdByRoute = (path) => {
    const allNavItems = [...personalNavItems, ...teamNavItems]
    const matchedItem = allNavItems.find(item => item.route === path)
    return matchedItem ? matchedItem.id : 'task-center'
}

// 初始化选中状态
const initActiveItem = () => {
    activeItem.value = getNavItemIdByRoute(route.path)
}

// 监听路由变化
watch(() => route.path, (newPath) => {
    activeItem.value = getNavItemIdByRoute(newPath)
}, { immediate: true })

// 组件挂载时初始化
onMounted(() => {
    initActiveItem()
})
</script>

<style scoped>
/* 基础布局 */
.side-panel {
    --primary-color: #2A6EBB;
    --active-bg: #E0EFFF;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 240px;
    height: 100%;
    background: white;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
    position: fixed;
    left: 0;
    top: 60px; /* Header高度为60px */
    bottom: 0;
    z-index: 100;
    overflow-y: auto;
}

/* 收缩状态 */
.collapsed {
    width: 74px;
}

/* 展开状态 */
.expanded {
    width: 240px;
}

/* 面板顶部区域 */
.panel-top {
    height: 30px;
    padding: 10px;
}

/* 控制区样式 */
.control-section {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
}

.logo-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
}

.logo-text {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-color);
}

.collapse-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: var(--transition);
    z-index: 101;
}

.collapse-icon {
    width: 14px;
    height: 14px;
}

/* 导航菜单 */
.nav-section {
    padding: 20px 0;
}

.nav-section ul {
    padding: 0 12px;
    list-style: none;
    margin: 0;
}

.nav-section li {
    margin-top: 4px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    color: #606266;
    padding: 12px;
}

.nav-section li:hover {
    background: #f5f9ff;
}

.nav-section li.active {
    background: var(--active-bg);
    color: var(--primary-color);
}

.nav-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    flex-shrink: 0;
}

.nav-icon {
    width: 20px;
    height: 20px;
}

.nav-label {
    font-size: 14px;
    white-space: nowrap;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>