<template>
    <nav class="header-nav">
        <div class="nav-section">
            <!-- Logo区域 -->
            <div class="logo-container">
                <LogoIcon class="logo-icon" />
                <span class="logo-text">知汇</span>
            </div>

            <!-- 导航切换 -->
            <div class="nav-toggle">
                <button 
                    class="toggle-btn" 
                    :class="{ active: activeMode === 'personal' }"
                    @click="switchMode('personal')"
                >
                    <UserIcon class="nav-icon" />
                    <span>个人</span>
                </button>
                <button 
                    class="toggle-btn" 
                    :class="{ active: activeMode === 'team' }"
                    @click="switchMode('team')"
                >
                    <TeamIcon class="nav-icon" />
                    <span>团队</span>
                </button>
            </div>
        </div>

        <!-- 右侧功能区 -->
        <div class="nav-section">
            <!-- 实时时钟 -->
            <div class="time-display">
                <ClockIcon class="time-icon" />
                <span class="time-text">{{ currentTime }}</span>
            </div>
        </div>

        <!-- 通知、用户头像 -->
        <div class="nav-section">
            <!-- 通知 -->
            <div class="notice">
                <NoticeIcon class="notice-icon" />
            </div>

            <!-- 用户头像 -->
            <div class="avatar">
                <AvatarIcon class="avatar-icon" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LogoIcon from '@/assets/logo-brain.svg'
import ClockIcon from '@/assets/icon-clock.svg'
import AvatarIcon from '@/assets/icon-avatar.svg'
import NoticeIcon from '@/assets/icon-notice.svg'
import UserIcon from '@/assets/icon-user.svg'
import TeamIcon from '@/assets/icon-user.svg'


// 定义emit
const emit = defineEmits(['mode-change'])

// 响应式状态
const activeMode = ref('personal')
const currentTime = ref('')

// 导航模式切换
const switchMode = (mode) => {
    activeMode.value = mode
    emit('mode-change', mode)
}

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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
    box-sizing: border-box;
}

.nav-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Logo样式 */
.logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-text {
    font-size: 18px;
    font-weight: 600;
    color: #2a6ebb;
}

/* 导航切换按钮 */
.nav-toggle {
    display: flex;
    gap: 8px;
    margin-left: 24px;
}

.toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: #666;
    transition: all 0.3s ease;
}

.toggle-btn:hover {
    background: #f5f5f5;
}

.toggle-btn.active {
    background: #e6f7ff;
    color: #2a6ebb;
}

.nav-icon {
    width: 16px;
    height: 16px;
}

/* 时间显示 */
.time-display {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #606266;
}

.time-icon {
    margin-top: 2px;
}

.time-text {
    font-size: 14px;
}

/* 通知和头像 */
.notice, .avatar {
    cursor: pointer;
    transition: background-color 0.3s;
}

.notice:hover, .avatar:hover {
    background-color: #f5f5f5;
}

.notice-icon, .avatar-icon {
    width: 20px;
    height: 20px;
    color: #666;
}
</style>