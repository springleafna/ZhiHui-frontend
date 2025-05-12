<template>
    <div class="container">
        <!-- 头部工具栏 -->
        <a-row justify="space-between" align="middle" class="toolbar">
            <a-col :span="8">
                <h1 class="title">我的知识库</h1>
            </a-col>
            <a-col :span="16" class="search-area">
                <a-space :size="16">
                    <a-input 
                        placeholder="搜索知识库" 
                        allow-clear 
                        style="width: 300px"
                        v-model:value="searchText"
                        @change="handleSearch"
                    >
                        <template #prefix>
                            <search-outlined />
                        </template>
                    </a-input>
                    <a-button type="primary" @click="showModal">新建知识库</a-button>
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

        <!-- 编辑知识库模态框 -->
        <a-modal v-model:visible="editModalVisible" :title="isEdit ? '编辑知识库' : '创建知识库'" @ok="handleSubmit" @cancel="handleCancel">
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
        <a-spin :spinning="loading">
            <a-row :gutter="[16, 24]">
                <a-col 
                    v-for="item in filteredKnowledgeBases" 
                    :key="item.name" 
                    :span="6" 
                    class="card-col"
                >
                    <a-card 
                        class="knowledge-card"
                        hoverable
                        @click="handleCardClick(item)"
                    >
                        <template #actions>
                            <a-tooltip title="设置">
                                <setting-outlined key="setting" />
                            </a-tooltip>
                            <a-tooltip title="编辑">
                                <edit-outlined key="edit" @click.stop="handleEdit(item)" />
                            </a-tooltip>
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
        </a-spin>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {
    SettingOutlined,
    EditOutlined,
    FileTextOutlined,
    SearchOutlined
} from '@ant-design/icons-vue';

// 响应式数据
const modalVisible = ref(false);
const editModalVisible = ref(false);
const isEdit = ref(false);
const currentEditId = ref(null);
const formState = reactive({
    id: null,
    name: '',
    description: ''
});
const searchText = ref('');
const loading = ref(false);
const knowledgeBases = ref([
    {
        name: '知识库测试',
        description: '这是示例知识库介绍内容'
    }
]);

// 计算属性
const filteredKnowledgeBases = computed(() => {
    return knowledgeBases.value.filter(item => 
        item.name.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

// 显示创建对话框
const showModal = () => {
    modalVisible.value = true;
};

// 显示编辑对话框
const handleEdit = (item) => {
    isEdit.value = true;
    currentEditId.value = item.id;
    Object.assign(formState, item);
    editModalVisible.value = true;
};

// 提交表单
const handleSubmit = () => {
    if (isEdit.value) {
        const index = knowledgeBases.value.findIndex(item => item.id === currentEditId.value);
        if (index !== -1) {
            knowledgeBases.value[index] = { ...formState };
        }
    } else {
        knowledgeBases.value.push({ 
            ...formState,
            id: Date.now() // 生成唯一ID
        });
    }
    
    editModalVisible.value = false;
    handleCancel();
};

// 取消操作
const handleCancel = () => {
    editModalVisible.value = false;
    isEdit.value = false;
    currentEditId.value = null;
    Object.assign(formState, { id: null, name: '', description: '' });
};

// 处理搜索
const handleSearch = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 300);
};

// 处理卡片点击
const handleCardClick = (item) => {
    console.log('点击知识库:', item);
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
    font-size: 20px;
    color: rgba(0, 0, 0, .85);
    font-weight: 600;
}

.search-area {
    display: flex;
    justify-content: flex-end;
}

.card-col {
    margin-bottom: 16px;
    transition: transform 0.2s;
}

.card-col:hover {
    transform: translateY(-4px);
}

.knowledge-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s;
}

.knowledge-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-weight: 500;
    font-size: 16px;
}

.card-description {
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>