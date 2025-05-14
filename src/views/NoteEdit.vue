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
          <a-button type="primary" @click="handleUpdate" :loading="updating" size="large" class="update-btn">
            更新笔记
          </a-button>
        </div>
      </div>
  
      <div class="editor-content">
        <div ref="divRef" class="editor-area"/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {AiEditor} from "aieditor";
  import "aieditor/dist/style.css"
  import {onMounted, onUnmounted, ref} from "vue";
  import { message } from 'ant-design-vue';
  import { getNoteDetail } from '@/api/note';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const divRef = ref();
  const noteTitle = ref('');
  const updating = ref(false);
  let aiEditor: AiEditor | null = null;
  
  // 获取笔记详情
  const fetchNoteDetail = async () => {
    try {
      const noteId = Number(route.params.id);
      const noteDetail = await getNoteDetail(noteId);
      noteTitle.value = noteDetail.title;
      aiEditor?.setContent(noteDetail.content);
    } catch (error) {
      console.error('获取笔记详情失败:', error);
      message.error('获取笔记详情失败');
    }
  };
  
  // 更新笔记
  const handleUpdate = async () => {
    if (!noteTitle.value.trim()) {
      message.warning('请输入笔记标题');
      return;
    }
  
    const content = aiEditor?.getHtml();
    if (!content) {
      message.warning('请输入笔记内容');
      return;
    }
  
    updating.value = true;
    try {
      const noteId = Number(route.params.id);
      await getNoteDetail(noteId); // 临时使用getNoteDetail替代updateNote，需要后端提供updateNote API
      message.success('更新成功');
      router.push('/notes');
    } catch (error) {
      console.error('更新失败:', error);
      message.error('更新失败');
    } finally {
      updating.value = false;
    }
  };
  
  onMounted(() => {
    fetchNoteDetail();
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
            protocol: "ws",
            version: "v4.0",
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
  
  .update-btn {
    font-size: 16px;
    height: 40px;
    padding: 0 24px;
  }
  </style>
  