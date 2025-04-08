<template>
    <nav class="header-nav">
        <div class="nav-section">
            <!-- Logo区域 -->
            <div class="logo-container">
                <LogoIcon class="logo-icon" />
                <span class="logo-text">知汇</span>
            </div>

            <!-- 导航链接 -->
            <ul class="nav-items">
                <li v-for="item in navItems" :key="item.id" class="nav-item" :class="{ active: activeNav === item.id }"
                    @click="activeNav = item.id">
                    <component :is="item.icon" class="item-icon" />
                    <span class="item-label">{{ item.label }}</span>
                </li>
            </ul>
        </div>

        <!-- 右侧功能区 -->
        <div class="nav-section">
            <!-- 实时时钟 -->
            <div class="time-display">
                <ClockIcon class="time-icon" />
                <span class="time-text">{{ currentTime }}</span>
            </div>

            <!-- 搜索框 -->
            <div class="search-box">
                <input type="text" placeholder="搜索笔记、任务..." class="search-input" />
                <SearchIcon class="search-icon" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LogoIcon from '@/assets/logo-brain.svg'
import LearningIcon from '@/assets/icon-learning.svg'
import AiIcon from '@/assets/icon-ai.svg'
import CommunityIcon from '@/assets/icon-community.svg'
import ClockIcon from '@/assets/icon-clock.svg'
import SearchIcon from '@/assets/icon-search.svg'

// 响应式状态
const activeNav = ref('learning')
const currentTime = ref('')

// 导航项配置
const navItems = [
    { id: 'learning', label: '我的学习舱', icon: LearningIcon },
    { id: 'ai', label: 'AI实验室', icon: AiIcon },
    { id: 'community', label: '灵感社区', icon: CommunityIcon }
]

// 时间更新逻辑
let timer = null
const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>

<style scoped>
.header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: #ffffff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    border-top: 1px solid #e4e7ed;
}

.nav-section {
    display: flex;
    align-items: center;
    gap: 32px;
}

/* Logo样式 */
.logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-icon {
    width: 32px;
    height: 32px;
}

.logo-text {
    font-size: 18px;
    font-weight: 600;
    color: #2a6ebb;
}

/* 导航项 */
.nav-items {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #606266;

    &:hover {
        background: #f5f9ff;
    }

    &.active {
        background: #e0f2fe;
        color: #2a6ebb;
    }
}

.item-icon {
    width: 20px;
    height: 20px;
}

.item-label {
    font-size: 14px;
    font-weight: 500;
}

/* 时间显示 */
.time-display {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #606266;
}

.time-icon {
    width: 16px;
    height: 16px;
}

.time-text {
    font-size: 14px;
}

/* 搜索框 */
.search-box {
    position: relative;
    width: 220px;
}

.search-input {
    width: 100%;
    padding: 8px 32px 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 16px;
    font-size: 13px;
    transition: all 0.2s ease;

    &:focus {
        border-color: #2a6ebb;
        outline: none;
        box-shadow: 0 0 4px rgba(42, 110, 187, 0.2);
    }
}

.search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #909399;
}
</style>