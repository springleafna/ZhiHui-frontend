<template>
    <div class="notes-container">
        <!-- 左侧筛选区 -->
        <div class="filter-panel">
            <div class="category-section">
                <h3 class="section-title">笔记分类</h3>
                <div class="category-list">
                    <div 
                        class="category-item" 
                        v-for="category in categories" 
                        :key="category.value"
                        :class="{ active: currentCategory === category.value }"
                        @click="currentCategory = category.value">
                        <i class="icon-folder"></i>
                        <span class="label">{{ category.label }}</span>
                        <span class="count">{{ category.count }}</span>
                    </div>
                </div>
                
                <div class="category-actions">
                    <a-button 
                        type="primary" 
                        block
                        @click="showAddDialog = true"
                        class="action-btn">
                        <template #icon><i class="icon-plus"></i></template>
                        新建分类
                    </a-button>
                </div>
            </div>
        </div>

        <!-- 中间笔记列表 -->
        <div class="notes-list">
            <div 
                class="note-item" 
                v-for="note in filteredNotes" 
                :key="note.id">
                <div class="note-icon">
                    <i class="icon-file-text"></i>
                </div>
                <div class="note-content">
                    <h3 class="note-title">{{ note.title }}</h3>
                    <div class="note-meta">
                        <span class="note-path">{{ note.path }}</span>
                        <span class="note-time">{{ note.time }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧快速操作区 -->
    <div class="quick-actions">
        <div class="action-section">
            <button class="action-button primary" @click="goToEditor">
                <i class="icon-edit"></i>
                <span>开始创作</span>
            </button>
        </div>

        <div class="action-section">
            <h3 class="section-title">快速记录</h3>
            <div class="quick-grid">
                <button class="quick-button">
                    <i class="icon-mic"></i>
                    <span>语音速记</span>
                </button>
                <button class="quick-button">
                    <i class="icon-camera"></i>
                    <span>图片描述</span>
                </button>
            </div>
        </div>

        <div class="action-section">
            <h3 class="section-title">导出格式</h3>
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
                    <i class="icon-share"></i>
                    <span>分享</span>
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'

// 初始化路由
const router = useRouter()

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

const goToEditor = () => {
    router.push('/editor')
}

const categories = ref([
    { label: '全部笔记', value: '全部', count: 4 },
    { label: '默认知识库', value: '默认', count: 4 },
    { label: '个人笔记', value: '个人', count: 0 },
    { label: '工作笔记', value: '工作', count: 0 },
    { label: '学习笔记', value: '学习', count: 0 }
])

const currentCategory = ref('全部')

const filteredNotes = computed(() => {
    if (currentCategory.value === '全部') return notes.value
    return notes.value.filter(note => note.category === currentCategory.value)
})

const showAddDialog = ref(false)
const newCategoryForm = ref({
    name: ''
})

const addCategory = () => {
    if (!newCategoryForm.value.name.trim()) {
        message.warning('分类名称不能为空')
        return
    }
    
    const exists = categories.value.some(c => c.label === newCategoryForm.value.name)
    if (exists) {
        message.warning('该分类已存在')
        return
    }

    categories.value.push({
        label: newCategoryForm.value.name,
        value: newCategoryForm.value.name,
        count: 0
    })
    
    showAddDialog.value = false
    newCategoryForm.value.name = ''
}

const handleDelete = async () => {
    Modal.confirm({
        title: '删除确认',
        content: `确认删除分类 "${currentCategory.value}" 吗？`,
        okType: 'danger',
        onOk: () => {
            const index = categories.value.findIndex(c => c.value === currentCategory.value)
            if (index > -1) {
                categories.value.splice(index, 1)
                currentCategory.value = '全部'
            }
        }
    })
}
</script>

<style scoped>
.notes-container {
    display: flex;
    height: 100vh;
    gap: 16px;
    padding: 24px;
    background: #f8f9fa;
}

/* 统一边距和圆角 */
.filter-panel, 
.notes-list, 
.quick-actions {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.filter-panel {
    width: 260px;
    flex-shrink: 0;
}

.notes-list {
    flex: 1;
    min-width: 400px;
}

.quick-actions {
    width: 240px;
    flex-shrink: 0;
}

.section-title {
    font-size: 15px;
    color: #1a1a1a;
    margin: 0 0 16px;
    font-weight: 600;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

/* 分类列表样式优化 */
.category-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 20px;
}

.category-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
    
    &:hover {
        background: #f5f7fa;
    }
    
    &.active {
        background: #e6f4ff;
        color: #1677ff;
        
        .count {
            background: rgba(22,119,255,0.1);
            color: #1677ff;
        }
    }
}

.icon-folder {
    margin-right: 12px;
    font-size: 18px;
}

.count {
    margin-left: auto;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    background: #f5f5f5;
}

/* 笔记列表优化 */
.note-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    transition: all 0.2s;
    margin-bottom: 8px;
    
    &:hover {
        background: #fafafa;
        transform: translateX(4px);
    }
}

.note-icon {
    width: 36px;
    height: 36px;
    background: #f5f5f5;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    margin-right: 16px;
}

.note-title {
    font-size: 15px;
    color: #1a1a1a;
    margin: 0 0 4px;
}

.note-meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #999;
}

/* 按钮样式统一 */
.action-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    &.primary {
        background: #1677ff;
        color: white;
        
        &:hover {
            background: #4096ff;
        }
    }
}

/* 右侧操作区优化 */
.quick-actions {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.action-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* 快速记录网格 */
.quick-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
}

/* 导出格式网格 */
.export-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

/* 按钮样式优化 */
.quick-button, .export-button {
    height: 80px;
    padding: 12px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.export-button {
    height: auto;
    padding: 10px;
    flex-direction: row;
    gap: 8px;
}

.quick-button:hover, .export-button:hover {
    border-color: #1677ff;
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.1);
    transform: translateY(-2px);
}

.quick-button i {
    font-size: 20px;
    margin-bottom: 8px;
}

.export-button i {
    font-size: 16px;
}

/* 主操作按钮优化 */
.action-button.primary {
    height: 48px;
    font-size: 15px;
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.2);
}
</style>