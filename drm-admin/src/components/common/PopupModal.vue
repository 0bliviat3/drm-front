<template>
    <div
      v-if="visible"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        ref="popup"
        class="bg-white rounded shadow-lg w-[600px] max-h-[80vh] overflow-auto relative"
        :style="{ top: position.top + 'px', left: position.left + 'px', position: 'absolute', color: 'white'}"
        @mousedown.stop
      >
        <div
          class="bg-gray-200 px-4 py-2 cursor-move flex justify-between items-center"
          @mousedown="startDrag"
        >
          <span class="font-semibold">Exit Message</span>
          <button class="text-black hover:text-red-500" @click="close">✕</button>
        </div>
        <div class="p-4 whitespace-pre-wrap text-sm">
          {{ message }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    visible: Boolean,
    message: String,
  })
  
  const emit = defineEmits(['close'])
  
  const popup = ref(null)
  const position = ref({ top: 0, left: 0 })
  
  const close = () => {
    emit('close')
  }
  
  let isDragging = false
  let offsetX = 0
  let offsetY = 0
  
  function startDrag(e) {
    isDragging = true
    offsetX = e.clientX - position.value.left
    offsetY = e.clientY - position.value.top
  
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
  
  function onDrag(e) {
    if (!isDragging) return
    position.value.left = e.clientX - offsetX
    position.value.top = e.clientY - offsetY
  }
  
  function stopDrag() {
    isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
  </script>
  
  <style scoped>
  /* Optional smoother animation */
  </style>
  