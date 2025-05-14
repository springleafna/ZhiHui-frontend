<template>
    <div class="note-detail-container">
      <div class="note-header">
        <h1 class="note-title">{{ note.title }}</h1>
        <div class="note-meta">
          <span class="note-category" v-if="note.categoryName">{{ note.categoryName }}</span>
          <span class="note-time">{{ formatDateTime(note.updateTime) }}</span>
        </div>
      </div>
      <div class="note-body">
        <!-- 目录区域 -->
        <div class="toc-container" v-if="showToc && tocHtml">
          <div class="toc-header">
            <h3>目录</h3>
            <a-switch 
              v-model:checked="tocFixed" 
              size="small"
              :checkedChildren="'固定'"
              :unCheckedChildren="'跟随'"
            />
          </div>
          <div class="toc-content" v-html="tocHtml"></div>
        </div>
        <!-- 内容区域 -->
        <div class="note-content markdown-body" v-html="renderedContent"></div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { getNoteDetail } from '@/api/note'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-toc-done-right'

const route = useRoute()
const note = ref({})
const tocFixed = ref(false)
const showToc = ref(true)
const tocHtml = ref('') // 使用ref存储目录HTML

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

// 配置锚点插件
md.use(anchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkSpace: false,
  slugify: (s) => s.toLowerCase().replace(/\s+/g, '-')
})

// 配置目录插件（关键修复部分）
md.use(tocPlugin, {
  containerClass: 'toc-list',
  containerId: 'toc',
  listClass: 'toc-list-items',
  itemClass: 'toc-list-item',
  linkClass: 'toc-list-link',
  level: [1, 2, 3, 4],
  listType: 'ul',
  callback: function(html) {
    // 将生成的目录HTML存入响应式变量
    tocHtml.value = html
    // 返回空字符串避免在内容中显示目录
    return ''
  }
})

// 渲染后的内容（自动添加目录占位符）
const renderedContent = computed(() => {
  if (!note.value.content) return ''
  // 动态添加[[toc]]占位符到内容开头
  return md.render(`[[toc]]\n${note.value.content}`)
})

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

// 获取笔记详情
const fetchNoteDetail = async () => {
  try {
    const noteId = parseInt(route.params.id)
    if (!noteId) {
      message.error('笔记ID无效')
      return
    }
    const data = await getNoteDetail(noteId)
    note.value = data
  } catch (error) {
    console.error('获取笔记详情失败:', error)
    message.error('获取笔记详情失败')
  }
}

onMounted(() => {
  fetchNoteDetail()
})
</script>

<style scoped>
.note-detail-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.note-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.note-title {
  font-size: 28px;
  color: #1a1a1a;
  margin: 0 0 16px;
  font-weight: 600;
  line-height: 1.4;
}

.note-meta {
  display: flex;
  gap: 16px;
  align-items: center;
}

.note-category {
  color: #1677ff;
  background: #e6f4ff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.note-time {
  color: #999;
  font-size: 14px;
}

.note-body {
  display: flex;
  gap: 32px;
}

.toc-container {
  width: 250px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  padding: 16px;
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.toc-container.fixed {
  position: fixed;
  top: 24px;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.toc-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.toc-content {
  font-size: 14px;
}

:deep(.toc-list) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

:deep(.toc-list-items) {
  list-style: none;
  padding-left: 0;
}

:deep(.toc-list-item) {
  margin: 8px 0;
  padding-left: 16px;
}

:deep(.toc-list-link) {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1.4;
}

:deep(.toc-list-link:hover) {
  color: #1677ff;
  background: #f5f5f5;
}

.note-content {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  padding: 32px;
}

/* Markdown 样式 */
:deep(.markdown-body) {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

:deep(.markdown-body h1) {
  font-size: 2em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

:deep(.markdown-body h2) {
  font-size: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

:deep(.markdown-body h3) {
  font-size: 1.25em;
}

:deep(.markdown-body h4) {
  font-size: 1em;
}

:deep(.markdown-body p) {
  margin-top: 0;
  margin-bottom: 16px;
}

:deep(.markdown-body blockquote) {
  margin: 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

:deep(.markdown-body code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}

:deep(.markdown-body pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

:deep(.markdown-body pre code) {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

:deep(.markdown-body table) {
  display: block;
  width: 100%;
  overflow: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
}

:deep(.markdown-body table th) {
  font-weight: 600;
}

:deep(.markdown-body table td),
:deep(.markdown-body table th) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(.markdown-body table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

:deep(.markdown-body table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

:deep(.markdown-body img) {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

:deep(.markdown-body hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

/* 标题锚点样式 */
:deep(.header-anchor) {
  float: left;
  margin-left: -20px;
  padding-right: 4px;
  opacity: 0;
  text-decoration: none;
  color: #1677ff;
}

:deep(.markdown-body h1:hover .header-anchor),
:deep(.markdown-body h2:hover .header-anchor),
:deep(.markdown-body h3:hover .header-anchor),
:deep(.markdown-body h4:hover .header-anchor),
:deep(.markdown-body h5:hover .header-anchor),
:deep(.markdown-body h6:hover .header-anchor) {
  opacity: 1;
}
</style>
