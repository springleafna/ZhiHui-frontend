<script setup>
import Header from './components/layout/Header.vue'
import SidePanel from './components/layout/SidePanel.vue'
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 创建一个响应式状态来跟踪侧边栏是否折叠
const isSidePanelCollapsed = ref(false)

// 提供该状态给子组件
provide('isSidePanelCollapsed', isSidePanelCollapsed)

// 侧边栏折叠状态改变的处理函数
const handleSidePanelToggle = (collapsed) => {
  isSidePanelCollapsed.value = collapsed
}
</script>

<template>
  <Header v-if="!route.meta.hideLayout" />
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

.app-container.no-layout {
  height: 100vh;
  margin-top: 0;
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

.main-content.no-margin {
  margin-left: 0;
}
</style>
