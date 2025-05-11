<template>
    <div class="container">
        <!-- 头部工具栏 -->
        <a-row justify="space-between" align="middle" class="toolbar">
            <a-col :span="8">
                <h1 class="title">我的知识库</h1>
            </a-col>
            <a-col :span="16" class="search-area">
                <a-space :size="16">
                    <a-input placeholder="知识库名称" allow-clear style="width: 200px" />
                    <a-button type="primary" @click="showModal">新建</a-button>
                </a-space>
            </a-col>
        </a-row>

        <!-- 创建知识库模态框 -->
        <a-modal v-model:visible="modalVisible" title="创建知识库" @ok="handleSubmit" @cancel="handleCancel">
            <a-form :model="formState" layout="vertical">
                <a-form-item label="知识库名称" name="name" :rules="[{ required: true, message: '请输入知识库名称' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="知识库介绍" name="description">
                    <a-textarea v-model:value="formState.description" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 知识库卡片列表 -->
        <a-row :gutter="16">
            <a-col v-for="item in knowledgeBases" :key="item.name" :span="6" class="card-col">
                <a-card class="knowledge-card">
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                    </template>
                    <a-card-meta>
                        <template #avatar>
                            <a-avatar :style="{ backgroundColor: '#1890ff' }">
                                <template #icon><file-text-outlined /></template>
                            </a-avatar>
                        </template>
                        <template #title>
                            <span class="card-title">{{ item.name }}</span>
                        </template>
                        <template #description>
                            <div class="card-description">{{ item.description || '暂无介绍' }}</div>
                        </template>
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
    SettingOutlined,
    EditOutlined,
    FileTextOutlined
} from '@ant-design/icons-vue';

// 响应式数据
const modalVisible = ref(false);
const formState = reactive({
    name: '',
    description: ''
});
const knowledgeBases = ref([
    {
        name: '知识库测试',
        description: '这是示例知识库介绍内容'
    }
]);

// 显示创建对话框
const showModal = () => {
    modalVisible.value = true;
};

// 提交表单
const handleSubmit = () => {
    knowledgeBases.value.push({ ...formState });
    modalVisible.value = false;
    Object.assign(formState, { name: '', description: '' });
};

// 取消创建
const handleCancel = () => {
    modalVisible.value = false;
    Object.assign(formState, { name: '', description: '' });
};
</script>

<style scoped>
.container {
    padding: 24px;
    background: #f0f2f5;
    min-height: 100vh;
}

.toolbar {
    margin-bottom: 24px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.title {
    margin: 0;
    font-size: 18px;
    color: rgba(0, 0, 0, .85);
}

.search-area {
    display: flex;
    justify-content: flex-end;
}

.card-col {
    margin-bottom: 16px;
}

.knowledge-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
    font-weight: 500;
}

.card-description {
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 1.6;
}
</style>