<template>
  <div class="editor-container">
    <div class="editor-header">
      <a-input
        v-model:value="noteTitle"
        placeholder="请输入标题..."
        class="title-input"
        :maxLength="50"
        allowClear
      />
      <div class="header-actions">
        <a-button type="primary" @click="handlePublish" :loading="publishing" size="large" class="publish-btn">
          发布笔记
        </a-button>
      </div>
    </div>

    <div class="editor-content">
      <div ref="divRef" class="editor-area"/>
    </div>

    <!-- 分类选择弹窗 -->
    <a-modal
      v-model:open="categoryModalVisible"
      title="选择笔记分类"
      @ok="handleCategorySelect"
      @cancel="categoryModalVisible = false"
    >
      <div class="category-list">
        <div
          class="category-item"
          :class="{ active: selectedCategoryId === null }"
          @click="selectedCategoryId = null"
        >
          未分类
        </div>
        <div
          v-for="category in categories"
          :key="category.noteCategoryId"
          class="category-item"
          :class="{ active: selectedCategoryId === category.noteCategoryId }"
          @click="selectedCategoryId = category.noteCategoryId"
        >
          {{ category.categoryName }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {AiEditor} from "aieditor";
import "aieditor/dist/style.css"
import {onMounted, onUnmounted, ref} from "vue";
import { message } from 'ant-design-vue';
import { getAllCategories, createNote } from '@/api/note';
import { useRouter } from 'vue-router';

const router = useRouter();
const divRef = ref();
const noteTitle = ref('');
const publishing = ref(false);
const categoryModalVisible = ref(false);
const categories = ref([]);
const selectedCategoryId = ref<number | null>(null);
let aiEditor: AiEditor | null = null;

// 获取所有分类
const fetchCategories = async () => {
  try {
    const res = await getAllCategories();
    categories.value = res;
  } catch (error) {
    console.error('获取分类失败:', error);
  }
};

// 发布笔记
const handlePublish = async () => {
  if (!noteTitle.value.trim()) {
    message.warning('请输入笔记标题');
    return;
  }

  const content = aiEditor?.getHtml();
  if (!content) {
    message.warning('请输入笔记内容');
    return;
  }

  // 显示分类选择弹窗
  categoryModalVisible.value = true;
};

// 选择分类后发布
const handleCategorySelect = async () => {
  if (categoryModalVisible.value) {
    publishing.value = true;
    try {
      await createNote({
        noteCategoryId: selectedCategoryId.value,
        title: noteTitle.value.trim(),
        content: aiEditor?.getHtml() || ''
      });
      message.success('发布成功');
      categoryModalVisible.value = false;
      // 清空编辑器
      noteTitle.value = '';
      aiEditor?.setContent('');
      // 跳转到我的笔记页面
      router.push('/notes');
    } catch (error) {
      console.error('发布失败:', error);
      message.error('发布失败');
    } finally {
      publishing.value = false;
    }
  }
};

onMounted(() => {
  fetchCategories();
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: '',
    ai: {
      models: {
        spark: {
          appId: "77f84ab7",
          apiKey: "ffe8da4f9c3e49cda20a85a42e6e39f6",
          apiSecret: "N2ZmNDQyMTI3YWQwMWY3MmNjODM4MDRm",
          protocol: "ws", //或者 wss
          version: "v4.0", //或者其他
        }
      },
      bubblePanelEnable: true,
      bubblePanelModel: "auto",
    },
  })
})

onUnmounted(() => {
  aiEditor && aiEditor.destroy();
})
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93vh;
  min-height: 0;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.editor-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.title-input {
  flex: 1;
  font-size: 18px;
}

.title-input :deep(.ant-input) {
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 6px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.editor-content {
  flex: 1;
  min-height: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
}

.editor-area {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.category-list {
  max-height: 300px;
  overflow-y: auto;
}

.category-item {
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.category-item:hover {
  background-color: #f5f5f5;
}

.category-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.publish-btn {
  font-size: 16px;
  height: 40px;
  padding: 0 24px;
}
</style>