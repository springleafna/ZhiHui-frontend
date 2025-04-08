<template>
    <div class="side-panel" :class="{ 'collapsed': isCollapsed, 'expanded': !isCollapsed }"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <button class="collapse-btn" @click="toggleCollapse">
                <component :is="isCollapsed ? ExpandIcon : CollapseIcon" />
        </button>
        <!-- 导航菜单 -->
        <nav class="nav-section">
            <ul>
                <li v-for="item in navItems" :key="item.id" :class="{ 'active': activeItem === item.id }"
                    @click="activeItem = item.id">
                    <component :is="item.icon" class="nav-icon" />
                    <transition name="slide">
                        <span v-show="!isCollapsed">{{ item.label }}</span>
                    </transition>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import StudyIcon from '@/assets/icon-learning.svg'
import AiIcon from '@/assets/icon-ai.svg'
import BulbIcon from '@/assets/icon-community.svg'
import CollapseIcon from '@/assets/icon-collapse.svg'
import ExpandIcon from '@/assets/icon-expand.svg'

// 响应式状态
const isCollapsed = ref(false)
const isHovered = ref(false)
const activeItem = ref('study')

// 导航项配置
const navItems = [
    { id: 'study', label: '我的学习舱', icon: StudyIcon },
    { id: 'ai', label: 'AI实验室', icon: AiIcon },
    { id: 'community', label: '灵感社区', icon: BulbIcon }
]

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
/* 基础布局 */
.side-panel {
    --primary-color: #2A6EBB;
    --active-bg: #E0EFFF;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 240px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
    position: relative;
}

/* 收缩状态 */
.collapsed {
    width: 74px;
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
    top: 24px;
    right: -12px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    padding: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: var(--transition);
}

/* 导航菜单 */

.nav-section ul {
    padding: 12px;
    list-style: none;
}

.nav-section li {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    color: #606266;
}

.nav-section li:hover {
    background: #f5f9ff;
}

.nav-section li.active {
    background: var(--active-bg);
    color: var(--primary-color);
}

.nav-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
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