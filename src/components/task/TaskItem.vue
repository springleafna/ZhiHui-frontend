<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <div class="task-main">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-desc">{{ task.desc }}</p>
      <div class="task-time">
        <span class="time-icon">⏰</span>
        {{ task.time }}
      </div>
    </div>
    <button class="check-btn" @click="$emit('toggle')">
      {{ task.completed ? '✓' : '' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  task: Object
})

defineEmits(['toggle'])
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.task-card.completed {
  opacity: 0.6;
  background: #f8f8f8;
}

.task-main {
  flex: 1;
}

.task-title {
  margin: 0 0 8px;
  font-size: 16px;
  color: #333;
}

.task-desc {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.task-time {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #999;
}

.time-icon {
  margin-right: 6px;
}

.check-btn {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.check-btn:hover {
  border-color: #4CAF50;
}

.check-btn:active {
  transform: scale(0.9);
}
</style> 