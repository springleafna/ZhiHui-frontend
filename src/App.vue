<script setup>
import Header from './components/layout/Header.vue'
import SidePanel from './components/layout/SidePanel.vue'
import { ref, provide } from 'vue'

// 创建一个响应式状态来跟踪侧边栏是否折叠
const isSidePanelCollapsed = ref(true)

// 提供该状态给子组件
provide('isSidePanelCollapsed', isSidePanelCollapsed)

// 侧边栏折叠状态改变的处理函数
const handleSidePanelToggle = (collapsed) => {
  isSidePanelCollapsed.value = collapsed
}
</script>

<template>
  <Header />
  <div class="app-container">
    <SidePanel @toggle-collapse="handleSidePanelToggle" />
    <main class="main-content" :class="{ 'sidebar-expanded': !isSidePanelCollapsed }">
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
  overflow: hidden;
}
</style>

<style scoped>
.app-container {
  display: flex;
  height: calc(100vh - 60px); /* Header高度为60px */
  width: 100%;
  position: relative;
  margin-top: 60px; /* 为固定的Header留出空间 */
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f7fa;
  margin-left: 74px; /* 设置为收缩状态的SidePanel宽度 */
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.main-content.sidebar-expanded {
  margin-left: 240px; /* 设置为展开状态的SidePanel宽度 */
}
</style>
