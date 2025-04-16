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
            <ul>
                <li v-for="item in navItems" :key="item.id" :class="{ 'active': activeItem === item.id }"
                    @click="navigateTo(item)">
                    <div class="nav-icon-container">
                        <component :is="item.icon" class="nav-icon" />
                    </div>
                    <transition name="slide">
                        <span v-show="!isCollapsed" class="nav-label">{{ item.label }}</span>
                    </transition>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import StudyIcon from '@/assets/icon-learning.svg'
import AiIcon from '@/assets/icon-ai.svg'
import BulbIcon from '@/assets/icon-community.svg'
import NoteIcon from '@/assets/icon-note.svg'
import CollapseIcon from '@/assets/icon-collapse.svg'
import ExpandIcon from '@/assets/icon-expand.svg'
import { useRouter } from 'vue-router'

// 定义emit
const emit = defineEmits(['toggle-collapse'])

// 响应式状态
const isCollapsed = ref(false)
const isHovered = ref(false)
const activeItem = ref('study')

// 尝试从父组件获取状态
const isSidePanelCollapsed = inject('isSidePanelCollapsed', null)

// 如果父组件提供了状态，则使用父组件的状态
if (isSidePanelCollapsed !== null) {
    watch(isSidePanelCollapsed, (newValue) => {
        isCollapsed.value = newValue
    })
}

// 导航项配置
const navItems = [
    { id: 'study', label: '我的学习舱', icon: StudyIcon, route: '/dashboard' },
    { id: 'notes', label: '我的笔记', icon: NoteIcon, route: '/notes' },
    { id: 'ai', label: 'AI实验室', icon: AiIcon, route: '/ai-lab' },
    { id: 'community', label: '灵感社区', icon: BulbIcon, route: '/community' }
]

const router = useRouter()

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    // 向父组件发送状态变化
    emit('toggle-collapse', isCollapsed.value)
}

const navigateTo = (item) => {
    activeItem.value = item.id
    if (item.route) {
        router.push(item.route)
    }
}
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
.nav-section ul {
    padding: 0 12px;
    list-style: none;
    margin: 0;
}

.nav-section li {
    margin-top: 15px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    color: #606266;
    padding: 14px;
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