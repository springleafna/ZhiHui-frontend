<template>
  <div class="quadrant-header">
    <span class="quadrant-icon">{{ icon }}</span>
    <h2 class="quadrant-title">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  icon: String
})
</script>

<style scoped>
.quadrant-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.quadrant-icon {
  font-size: 24px;
  margin-right: 12px;
}

.quadrant-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}
</style> 