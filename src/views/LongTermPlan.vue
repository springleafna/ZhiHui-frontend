<template>
    <div class="plan-container">
        <!-- 顶部分类标签栏 -->
        <div class="category-header">
            <div class="category-item active">
                <span class="category-text">课程</span>
                <span class="category-count">2</span>
            </div>
            <div class="category-item">
                <span class="category-text">阅读</span>
                <span class="category-count">1</span>
            </div>
            <div class="category-item">
                <span class="category-text">项目</span>
                <span class="category-count">0</span>
            </div>
            <button class="add-category-btn">
                <span>+</span>
                新建分组
            </button>
        </div>

        <!-- 视图切换和操作栏 -->
        <div class="operation-bar">
            <div class="left-section">
                <div class="view-switch">
                    <button 
                        :class="['switch-btn', viewMode === 'grid' ? 'active' : '']" 
                        @click="viewMode = 'grid'"
                    >
                        <i class="el-icon-grid"></i>
                    </button>
                    <button 
                        :class="['switch-btn', viewMode === 'list' ? 'active' : '']" 
                        @click="viewMode = 'list'"
                    >
                        <i class="el-icon-menu"></i>
                    </button>
                </div>
            </div>
            <div class="right-section">
                <button class="filter-btn">
                    <i class="el-icon-date"></i>
                    按截止日期
                </button>
                <button class="filter-btn">
                    <i class="el-icon-rank"></i>
                    按优先级
                </button>
                <button class="filter-btn">
                    <i class="el-icon-finished"></i>
                    按完成状态
                </button>
            </div>
        </div>

        <!-- 计划列表区域 -->
        <div :class="['plans-wrapper', viewMode]">
            <template v-if="viewMode === 'grid'">
                <div class="plan-grid">
                    <div v-for="plan in plans" :key="plan.id" class="plan-item">
                        <div class="plan-content">
                            <div class="plan-status" :class="plan.status">
                                <i v-if="plan.status === 'urgent'" class="el-icon-warning"></i>
                                <i v-else-if="plan.status === 'completed'" class="el-icon-check"></i>
                            </div>
                            <div class="plan-info">
                                <h3 class="plan-title">{{ plan.title }}</h3>
                                <div class="plan-progress">
                                    <div class="progress-bar">
                                        <div class="progress" :style="{ width: plan.progress + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="plan-date">{{ plan.date }}</div>
                        </div>
                    </div>
                    <div class="add-plan-card">
                        <button class="add-plan-btn">
                            <span>+</span>
                            添加计划
                        </button>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="plan-list">
                    <div v-for="plan in plans" :key="plan.id" class="plan-row">
                        <div class="plan-checkbox">
                            <input type="checkbox" :checked="plan.status === 'completed'">
                        </div>
                        <div class="plan-info">
                            <div class="plan-title">{{ plan.title }}</div>
                            <div class="plan-progress">
                                <div class="progress-bar">
                                    <div class="progress" :style="{ width: plan.progress + '%' }"></div>
                                </div>
                            </div>
                        </div>
                        <div class="plan-meta">
                            <span class="plan-date">{{ plan.date }}</span>
                            <span class="plan-category">{{ plan.category }}</span>
                        </div>
                        <div class="plan-actions">
                            <i class="el-icon-more"></i>
                        </div>
                    </div>
                    <div class="add-plan-row">
                        <button class="add-plan-btn">
                            <span>+</span>
                            添加计划
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('grid')

const plans = [
    {
        id: 1,
        title: '完成高等数学第三章习题',
        date: '2024-02-20',
        category: '课程',
        progress: 75,
        status: 'urgent'
    },
    {
        id: 2,
        title: '阅读《深入理解计算机系统》第四章',
        date: '2024-02-22',
        category: '阅读',
        progress: 100,
        status: 'completed'
    },
    {
        id: 3,
        title: '准备英语演讲稿',
        date: '2024-02-25',
        category: '课程',
        progress: 30,
        status: 'normal'
    }
]
</script>

<style scoped>
.plan-container {
    padding: 20px;
    height: 100%;
    background-color: var(--el-bg-color);
}

/* 顶部分类标签栏 */
.category-header {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
}

.category-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--el-fill-color-lighter);
}

.category-item.active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.category-count {
    font-size: 12px;
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
}

.add-category-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 16px;
    border: 1px dashed var(--el-border-color);
    border-radius: 20px;
    background: transparent;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    transition: all 0.3s;
}

.add-category-btn:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}

/* 操作栏 */
.operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.view-switch {
    display: flex;
    gap: 4px;
    padding: 2px;
    background: var(--el-fill-color-light);
    border-radius: 6px;
}

.switch-btn {
    padding: 6px 10px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    color: var(--el-text-color-regular);
}

.switch-btn.active {
    background: white;
    color: var(--el-color-primary);
}

.right-section {
    display: flex;
    gap: 12px;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: none;
    background: var(--el-fill-color-light);
    border-radius: 6px;
    color: var(--el-text-color-regular);
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn:hover {
    background: var(--el-fill-color-dark);
}

/* 计划列表区域 */
.plans-wrapper {
    height: calc(100% - 120px);
    overflow-y: auto;
}

.plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    padding: 4px;
}

.plan-item {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    overflow: hidden;
}

.plan-content {
    padding: 16px;
}

.plan-status {
    margin-bottom: 12px;
}

.plan-status.urgent {
    color: var(--el-color-danger);
}

.plan-status.completed {
    color: var(--el-color-success);
}

.plan-title {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
}

.plan-progress {
    margin-bottom: 12px;
}

.progress-bar {
    height: 4px;
    background: var(--el-fill-color-light);
    border-radius: 2px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: var(--el-color-primary);
    border-radius: 2px;
    transition: width 0.3s;
}

.plan-date {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.add-plan-card {
    border: 1px dashed var(--el-border-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
}

.add-plan-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    transition: all 0.3s;
}

.add-plan-btn:hover {
    color: var(--el-color-primary);
}

/* 列表视图 */
.plan-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.plan-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.plan-checkbox {
    display: flex;
    align-items: center;
}

.plan-checkbox input {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    cursor: pointer;
}

.plan-meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.plan-actions {
    color: var(--el-text-color-secondary);
    cursor: pointer;
    padding: 4px;
}

.add-plan-row {
    padding: 12px;
    border: 1px dashed var(--el-border-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
}
</style> 