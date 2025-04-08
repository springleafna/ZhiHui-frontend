<script setup>
import Header from './components/layout/Header.vue'
import SidePanel from './components/layout/SidePanel.vue'
</script>

<template>
  <Header />
  <main class="main-content">
    <router-view></router-view>
  </main>
  <SidePanel />
</template>

<style scoped>

</style>
