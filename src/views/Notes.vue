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
            <template v-if="notes.length > 0">
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
                            <span class="note-category">{{ note.category }}</span>
                            <span class="note-time">{{ formatDateTime(note.updateTime) }}</span>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="empty-state">
                    <a-empty
                        :image="simpleImage"
                        description="您还没有创作笔记哦~"
                    >
                        <a-button type="primary" @click="goToEditor">
                            立即创作
                        </a-button>
                    </a-empty>
                </div>
            </template>
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

    <!-- 新建分类弹窗 -->
    <a-modal
        v-model:open="showAddDialog"
        title="新建分类"
        @ok="addCategory"
        @cancel="cancelAdd"
        :confirmLoading="loading"
    >
        <a-form 
            :model="newCategoryForm"
            :rules="formRules"
            ref="formRef"
        >
            <a-form-item 
                label="分类名称" 
                name="name"
                :validate-trigger="['change', 'blur']"
            >
                <a-input 
                    v-model:value="newCategoryForm.name" 
                    placeholder="请输入分类名称"
                    @pressEnter="addCategory"
                    allowClear
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal, Empty } from 'ant-design-vue'
import { 
    listAllNoteCategories, 
    createNoteCategory, 
    updateNoteCategory,
    getNotesByCategory,
    getNotesWithoutCategory,
    getAllNotes
} from '@/api/note'

// 初始化路由
const router = useRouter()

// Empty组件的简单图片
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

// 笔记数据
const notes = ref([])

// 分类数据
const categories = ref([
    { label: '全部笔记', value: 'all', count: 0 },
    { label: '未分类', value: 'uncategorized', count: 0 }
])

const currentCategory = ref('all')

// 获取所有分类
const fetchCategories = async () => {
    try {
        const categoryList = await listAllNoteCategories()
        // 保留"全部笔记"和"未分类"两个固定选项
        categories.value = [
            { label: '全部笔记', value: 'all', count: 0 },
            { label: '未分类', value: 'uncategorized', count: 0 },
            ...categoryList.map(cat => ({
                label: cat.categoryName,
                value: cat.noteCategoryId.toString(),
                count: 0 // 初始化为0，在获取笔记时更新
            }))
        ]
    } catch (error) {
        console.error('获取分类失败:', error)
    }
}

// 获取笔记列表
const fetchNotes = async () => {
    try {
        let noteList = []
        if (currentCategory.value === 'all') {
            noteList = await getAllNotes()
        } else if (currentCategory.value === 'uncategorized') {
            noteList = await getNotesWithoutCategory()
        } else {
            noteList = await getNotesByCategory(parseInt(currentCategory.value))
        }
        notes.value = noteList.map(note => ({
            id: note.noteId,
            noteCategoryId: note.noteCategoryId,
            title: note.title,
            category: note.categoryName || '未分类',
            updateTime: note.updateTime
        }))
        
        // 更新分类数量
        updateCategoryCounts()
    } catch (error) {
        console.error('获取笔记列表失败:', error)
    }
}

// 更新分类数量
const updateCategoryCounts = async () => {
    try {
        const allNotes = await getAllNotes()
        const uncategorizedNotes = await getNotesWithoutCategory()
        
        // 更新"全部笔记"数量
        categories.value[0].count = allNotes.length
        
        // 更新"未分类"数量
        categories.value[1].count = uncategorizedNotes.length
        
        // 更新其他分类的数量
        for (const category of categories.value.slice(2)) {
            try {
                const categoryNotes = await getNotesByCategory(parseInt(category.value))
                category.count = categoryNotes.length
            } catch (error) {
                console.error(`获取分类 ${category.label} 的笔记数量失败:`, error)
                category.count = 0
            }
        }
    } catch (error) {
        console.error('更新分类数量失败:', error)
    }
}

// 格式化时间
const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return ''
    const date = new Date(dateTimeStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}-${day} ${hours}:${minutes}`
}

// 监听分类变化
const filteredNotes = computed(() => notes.value)

// 页面加载时获取数据
onMounted(async () => {
    await fetchCategories()
    await fetchNotes()
})

// 监听分类切换
watch(currentCategory, async () => {
    await fetchNotes()
})

const goToEditor = () => {
    router.push('/editor')
}

const formRef = ref()
const loading = ref(false)
const showAddDialog = ref(false)
const newCategoryForm = ref({
    name: ''
})

// 表单验证规则
const formRules = {
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        { whitespace: true, message: '分类名称不能为空', trigger: 'blur' },
        { min: 1, max: 20, message: '分类名称长度为1-20个字符', trigger: 'blur' }
    ]
}

// 取消添加分类
const cancelAdd = () => {
    newCategoryForm.value.name = ''
    formRef.value?.resetFields()
    showAddDialog.value = false
}

// 添加分类
const addCategory = async () => {
    if (!formRef.value) return
    
    try {
        // 触发表单验证
        await formRef.value.validate()
        
        const categoryName = newCategoryForm.value.name.trim()
        if (!categoryName) {
            message.warning('分类名称不能为空')
            return
        }
        
        const exists = categories.value.some(c => c.label === categoryName)
        if (exists) {
            message.warning('该分类已存在')
            return
        }

        loading.value = true
        await createNoteCategory({
            categoryName: categoryName
        })
        await fetchCategories() // 重新获取分类列表
        await updateCategoryCounts() // 更新所有分类的数量
        message.success('添加分类成功')
        showAddDialog.value = false
        newCategoryForm.value.name = ''
        formRef.value.resetFields()
    } catch (error) {
        if (error?.errorFields) {
            // 表单验证错误
            return
        }
        console.error('添加分类失败:', error)
        message.error('添加分类失败')
    } finally {
        loading.value = false
    }
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
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    overflow-y: auto;
    max-height: calc(100vh - 48px);
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
    padding: 20px;
    border-radius: 12px;
    transition: all 0.2s;
    margin-bottom: 16px;
    background: #fff;
    border: 1px solid #f0f0f0;
    cursor: pointer;
    
    &:hover {
        background: #fafafa;
        transform: translateX(4px);
        border-color: #e6f4ff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
}

.note-icon {
    width: 48px;
    height: 48px;
    background: #f5f7fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1677ff;
    margin-right: 20px;
    font-size: 24px;
}

.note-content {
    flex: 1;
}

.note-title {
    font-size: 16px;
    color: #1a1a1a;
    margin: 0 0 8px;
    font-weight: 500;
    line-height: 1.4;
}

.note-meta {
    display: flex;
    gap: 16px;
    font-size: 13px;
    color: #999;
}

.note-category {
    color: #1677ff;
    background: #e6f4ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.note-time {
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

/* 空状态样式 */
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 40px;
}
</style>