<script setup>
import Header from './components/layout/Header.vue'
import SidePanel from './components/layout/SidePanel.vue'
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 创建一个响应式状态来跟踪侧边栏是否折叠
const isSidePanelCollapsed = ref(false)

// 创建一个响应式状态来跟踪当前模式（个人/团队）
const activeMode = ref('personal')

// 提供状态给子组件
provide('isSidePanelCollapsed', isSidePanelCollapsed)
provide('activeMode', activeMode)

// 侧边栏折叠状态改变的处理函数
const handleSidePanelToggle = (collapsed) => {
  isSidePanelCollapsed.value = collapsed
}

// 模式切换处理函数
const handleModeChange = (mode) => {
  activeMode.value = mode
}
</script>

<template>
  <Header v-if="!route.meta.hideLayout" @mode-change="handleModeChange" />
  <div class="app-container" :class="{ 'no-layout': route.meta.hideLayout }">
    <SidePanel v-if="!route.meta.hideLayout" @toggle-collapse="handleSidePanelToggle" />
    <main class="main-content" :class="{ 
      'sidebar-expanded': !isSidePanelCollapsed && !route.meta.hideLayout,
      'no-margin': route.meta.hideLayout 
    }">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* 全局样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 防止body滚动 */
  background-color: #f5f9ff;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 10px;
}

.main-content::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* 应用容器样式 */
.app-container {
  display: flex;
  width: 100%;
  position: relative;
  background-color: #f5f9ff;
}

.app-container {
  height: calc(100vh - 60px);
  margin-top: 40px;
}

.app-container.no-layout {
  height: 100vh;
  margin-top: 0;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f9ff;
  margin-left: 74px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 20px 0 50px 0;
  position: relative;
}

.main-content.sidebar-expanded {
  margin-left: 240px;
}

.main-content.no-margin {
  margin-left: 0;
}
</style>

<style scoped>
.app-container {
  display: flex;
  height: calc(100vh - 60px); /* Header高度为60px */
  width: 100%;
  position: relative;
  margin-top: 40px; /* 为固定的Header留出空间 */
  background-color: #f5f9ff;
}

.app-container.no-layout {
  height: 100vh;
  margin-top: 0;
}

.main-content {
  flex: 1;
  overflow-y: auto; /* 只在主内容区域允许滚动 */
  background-color: #f5f9ff;
  margin-left: 74px; /* 设置为收缩状态的SidePanel宽度 */
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  /* 确保内容底部有足够的空间 */
  padding-bottom: 50px;
  /* 设置合适的内边距 */
  padding-top: 20px;
  position: relative;
}

.main-content.sidebar-expanded {
  margin-left: 240px; /* 设置为展开状态的SidePanel宽度 */
}

.main-content.no-margin {
  margin-left: 0;
}

/* 添加全局背景色 */
:root {
  background-color: #f5f9ff;
}

body {
  background-color: #f5f9ff;
}
</style>
