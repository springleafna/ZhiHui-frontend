<template>
    <div class="notes-container">
        <!-- 左侧筛选区 -->
        <div class="filter-panel">
            <div class="data-section">
                <h3>笔记元数据</h3>
                <div class="data-item">
                    <div class="data-label">思维密度</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 78%"></div>
                        <span class="progress-text">78%</span>
                    </div>
                </div>
                <div class="data-item">
                    <div class="data-label">关联强度</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 64%"></div>
                        <span class="progress-text">64%</span>
                    </div>
                </div>
            </div>

            <div class="curve-section">
                <h3>认知能量曲线</h3>
                <div class="curve-chart">
                    <!-- 这里可以使用echarts等图表库实现曲线图 -->
                </div>
            </div>

            <div class="tags-section">
                <h3>标签筛选</h3>
                <div class="tags-grid">
                    <span class="tag">AI</span>
                    <span class="tag">伦理学</span>
                    <span class="tag">心理学</span>
                    <span class="tag">认知科学</span>
                    <span class="tag">设计</span>
                    <span class="tag">创新</span>
                    <span class="tag">知识管理</span>
                    <span class="tag">效率</span>
                    <span class="tag">教育</span>
                    <span class="tag">未来科技</span>
                    <span class="tag">系统思维</span>
                    <span class="tag">方法论</span>
                </div>
            </div>

            <div class="content-type-section">
                <h3>内容形态</h3>
                <div class="type-grid">
                    <div class="type-item active">
                        <i class="icon-layers"></i>
                        <span>全部</span>
                    </div>
                    <div class="type-item">
                        <i class="icon-file-text"></i>
                        <span>文字</span>
                    </div>
                    <div class="type-item">
                        <i class="icon-image"></i>
                        <span>脑图</span>
                    </div>
                    <div class="type-item">
                        <i class="icon-film"></i>
                        <span>多媒体</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 中间笔记列表 -->
        <div class="notes-list">
            <div class="note-item" v-for="note in notes" :key="note.id">
                <div class="note-icon">
                    <i class="icon-file-text"></i>
                </div>
                <div class="note-content">
                    <h3 class="note-title">{{ note.title }}</h3>
                    <div class="note-meta">
                        <span class="note-category">{{ note.category }}</span>
                        <span class="note-path">{{ note.path }}</span>
                    </div>
                    <div class="note-time">{{ note.time }}</div>
                </div>
            </div>
        </div>

        <!-- 右侧快速操作区 -->
        <div class="quick-actions">
            <div class="action-section">
                <h3>快速记录</h3>
                <button class="action-button voice">
                    <i class="icon-mic"></i>
                    <span>语音速记</span>
                </button>
                <button class="action-button image">
                    <i class="icon-camera"></i>
                    <span>图片描述</span>
                </button>
            </div>

            <div class="action-section">
                <h3>认知梯度</h3>
                <button class="action-button reorganize">
                    <i class="icon-shuffle"></i>
                    <span>重组洞察</span>
                </button>
            </div>

            <div class="action-section">
                <h3>导出中心</h3>
                <div class="export-grid">
                    <button class="export-button">
                        <i class="icon-file-pdf"></i>
                        <span>PDF</span>
                    </button>
                    <button class="export-button">
                        <i class="icon-image"></i>
                        <span>图片</span>
                    </button>
                    <button class="export-button">
                        <i class="icon-share2"></i>
                        <span>分享</span>
                    </button>
                    <button class="export-button">
                        <i class="icon-code"></i>
                        <span>HTML</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const notes = ref([
    {
        id: 1,
        title: '热券-CouponFury',
        category: 'springleaf',
        path: '默认知识库',
        time: '03-11 22:44'
    },
    {
        id: 2,
        title: '八股',
        category: 'springleaf',
        path: '默认知识库',
        time: '02-27 10:31'
    },
    {
        id: 3,
        title: '编程相关',
        category: 'springleaf',
        path: '默认知识库',
        time: '02-25 10:31'
    },
    {
        id: 4,
        title: '毕设智囊团——毕业设计全流程辅助平台需求文档',
        category: 'springleaf',
        path: '默认知识库',
        time: '02-23 23:03'
    }
])
</script>

<style scoped>
.notes-container {
    display: flex;
    height: 100%;
    background-color: var(--el-bg-color);
    padding: 0;
    gap: 20px;
    margin: 0;
}

.filter-panel, .notes-list, .quick-actions {
    margin-top: 20px;
    margin-bottom: 20px;
}

.filter-panel {
    margin-left: 20px;
    width: 280px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.data-section, .curve-section, .tags-section, .content-type-section {
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
}

h3 {
    font-size: 16px;
    color: #303133;
    margin-bottom: 16px;
    font-weight: 500;
}

.data-item {
    margin-bottom: 12px;
}

.data-label {
    font-size: 14px;
    color: #606266;
    margin-bottom: 8px;
}

.progress-bar {
    height: 6px;
    background: #e4e7ed;
    border-radius: 3px;
    position: relative;
}

.progress {
    height: 100%;
    background: #1890ff;
    border-radius: 3px;
}

.progress-text {
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 12px;
    color: #909399;
}

.curve-chart {
    height: 200px;
    background: #f5f7fa;
    border-radius: 8px;
}

.tags-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    padding: 6px 12px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
    transition: all 0.2s;
}

.tag:hover {
    background: #e6f7ff;
    color: #1890ff;
}

.type-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
}

.type-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;
    background: #f5f7fa;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
}

.type-item i {
    font-size: 16px;
}

.type-item span {
    white-space: nowrap;
}

.type-item.active {
    background: #e6f7ff;
    color: #1890ff;
}

/* 中间笔记列表样式 */
.notes-list {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 20px;
    overflow-y: auto;
}

.note-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;
    transition: all 0.2s;
}

.note-item:hover {
    background: #f5f7fa;
}

.note-icon {
    width: 40px;
    height: 40px;
    background: #e6f7ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1890ff;
    margin-right: 16px;
}

.note-content {
    flex: 1;
}

.note-title {
    font-size: 16px;
    color: #303133;
    margin-bottom: 8px;
    font-weight: normal;
}

.note-meta {
    font-size: 14px;
    color: #909399;
}

.note-category {
    margin-right: 8px;
}

.note-time {
    font-size: 14px;
    color: #909399;
    margin-top: 4px;
}

/* 右侧快速操作区样式 */
.quick-actions {
    margin-right: 20px;
    width: 280px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.action-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #1890ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    margin-bottom: 12px;
    transition: all 0.2s;
}

.action-button:hover {
    background: #40a9ff;
}

.export-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.export-button {
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    background: white;
    color: #606266;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.export-button:hover {
    background: #f5f7fa;
    border-color: #c0c4cc;
}

/* 图标样式 */
[class^="icon-"] {
    font-size: 20px;
}
</style> 