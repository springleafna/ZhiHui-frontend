<template>
    <div class="note-detail-container">
      <div class="note-header">
        <div class="title-row">
          <h1 class="note-title">{{ note.title }}</h1>
          <a-button type="primary" @click="handleEdit" class="edit-btn">
            <template #icon><EditOutlined /></template>
            编辑
          </a-button>
        </div>
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
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { getNoteDetail } from '@/api/note'
import { EditOutlined } from '@ant-design/icons-vue'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-toc-done-right'

const route = useRoute()
const router = useRouter()
const note = ref({})
const tocFixed = ref(false)
const showToc = ref(true)
const tocHtml = ref('') // 使用ref存储目录HTML

// 编辑按钮点击事件
const handleEdit = () => {
  const noteId = route.params.id
  router.push(`/note/${noteId}/edit`)
}

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  // 确保生成带有id的标题
  header: { level: [1, 2, 3, 4, 5, 6], slugify: (s) => s.toLowerCase().replace(/\s+/g, '-') }
})

// 配置锚点插件 - 确保标题生成ID
md.use(anchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkSpace: false,
  level: [1, 2, 3, 4, 5, 6],
  slugify: (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
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
  pattern: /^\[\[toc\]\]|\[toc\]$/im,  // 支持[[toc]]和[toc]格式
  callback: function(html) {
    // 将生成的目录HTML存入响应式变量
    if (html && html.length > 30) { // 检查生成的HTML是否有实际内容
      tocHtml.value = html
      showToc.value = true
    } else {
      showToc.value = false
    }
    console.log('目录生成回调:', html)
    // 返回空字符串避免在内容中显示目录
    return ''
  }
})

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
    
    // 加载笔记内容后，检查是否有标题
    if (data.content) {
      // 检查Markdown标题或HTML标题
      const hasMarkdownHeadings = /^#{1,6}\s+.+$/m.test(data.content)
      const hasHtmlHeadings = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(data.content)
      showToc.value = hasMarkdownHeadings || hasHtmlHeadings
      
      if (hasMarkdownHeadings) {
        // 对于Markdown内容，使用常规处理方式
        const contentWithToc = `[[toc]]\n\n${data.content}`
        md.render(contentWithToc)
      } else if (hasHtmlHeadings) {
        // HTML内容需要特殊处理
        processHtmlContent(data.content)
      }
    }
  } catch (error) {
    console.error('获取笔记详情失败:', error)
    message.error('获取笔记详情失败')
  }
}

// 处理HTML格式的内容并生成目录
const processHtmlContent = (htmlContent) => {
  try {
    // 创建临时DOM解析HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    
    // 提取所有标题元素
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    if (headings.length === 0) {
      showToc.value = false
      return
    }
    
    // 生成目录HTML
    let tocItems = '<ul class="toc-list-items">'
    
    headings.forEach((heading, index) => {
      // 为标题添加ID（如果没有）
      if (!heading.id) {
        heading.id = `heading-${index}`
      }
      
      const level = parseInt(heading.tagName.substring(1))
      const text = heading.textContent
      const id = heading.id
      
      // 添加目录项，根据标题级别添加缩进样式
      tocItems += `<li class="toc-list-item" style="padding-left: ${(level-1) * 16}px">
        <a class="toc-list-link" href="#${id}">${text}</a>
      </li>`
    })
    
    tocItems += '</ul>'
    
    // 设置目录HTML
    tocHtml.value = `<nav id="toc" class="toc-list">${tocItems}</nav>`
    showToc.value = true
    
    // 更新内容中的标题（添加ID）
    note.value.content = tempDiv.innerHTML
  } catch (error) {
    console.error('处理HTML内容失败:', error)
    showToc.value = false
  }
}

// 渲染后的内容
const renderedContent = computed(() => {
  if (!note.value.content) return ''
  
  // 检查是否为HTML内容
  const isHtmlContent = /<\/?[a-z][\s\S]*>/i.test(note.value.content)
  
  if (isHtmlContent) {
    // 如果是HTML内容，直接返回
    return note.value.content
  } else {
    // 如果是Markdown内容，进行渲染
    // 先判断content中是否至少有一个标题
    const hasHeadings = /^#{1,6}\s+.+$/m.test(note.value.content)
    
    // 如果有标题，先尝试生成目录
    if (hasHeadings) {
      // 明确添加[[toc]]标记并渲染一次来生成目录
      const contentWithToc = `[[toc]]\n\n${note.value.content}`
      md.render(contentWithToc)
    } else {
      // 没有标题，不显示目录
      showToc.value = false
    }
    
    // 再渲染实际内容
    return md.render(note.value.content)
  }
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

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.note-title {
  font-size: 28px;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
  line-height: 1.4;
}

.edit-btn {
  margin-left: 16px;
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
