<template>

    <div ref="divRef" style="height: 700px"/>
  </template>
  
  <script setup lang="ts">
  import {AiEditor} from "aieditor";
  import "aieditor/dist/style.css"
  import {onMounted, onUnmounted, ref} from "vue";
  
  const divRef = ref();
  let aiEditor: AiEditor | null = null;
  
  onMounted(() => {
    aiEditor = new AiEditor({
      element: divRef.value as Element,
      placeholder: "点击输入内容...",
      content: '',
    })
  })
  
  onUnmounted(() => {
    aiEditor && aiEditor.destroy();
  })
  </script>