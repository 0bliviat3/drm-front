<template>
    <div class="crypto-test">
    <Popup :visible="showPopup" :message="errMsg" @close="showPopup = false" />
      <!-- 상단 영역 -->
      <div class="top-bar">
        <select v-model="mode">
          <option value="encrypt">암호화</option>
          <option value="decrypt">복호화</option>
        </select>
        <button class="run-btn" :disabled="!selectedFile" @click="runCrypto">실행</button>
      </div>
  
      <!-- 파일 드래그앤드롭 영역 -->
      <div
        class="drop-zone"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <p>여기로 파일을 드래그하세요</p>
      </div>
  
      <!-- 하단 파일 선택 및 파일명 -->
      <div class="file-info">
        <span class="file-name">{{ selectedFile?.name || '선택된 파일 없음' }}</span>
        <input ref="fileInput" type="file" class="hidden-input" @change="handleFileSelect" />
        <button @click="triggerFileInput">파일 선택</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from '@/api/axios'
  import Popup from '@/components/common/PopupModal.vue'
  
  const mode = ref('encrypt')
  const selectedFile = ref(null)
  const fileInput = ref(null)

  const showPopup = ref(false)
  const errMsg = ref('')
  
  const triggerFileInput = () => {
    fileInput.value.click()
  }
  
  const handleFileSelect = (e) => {
    selectedFile.value = e.target.files[0]
  }
  
  const handleDrop = (e) => {
    if (e.dataTransfer.files.length > 0) {
      selectedFile.value = e.dataTransfer.files[0]
    }
  }

  const showError = (err) => {
    errMsg.value = err
    showPopup.value = true
  }
  
  const runCrypto = async () => {
    if (!selectedFile.value) return
  
    const formData = new FormData()
    formData.append('sourceFile', selectedFile.value)
  
    const url = mode.value === 'encrypt' ? '/enc/file' : '/dec/file'
  
    try {
      const res = await axios.post(url, formData, {
        responseType: 'blob', // 중요: 파일 다운로드 위해
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
  
      // 다운로드 처리
      const blob = new Blob([res.data])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `processed_${selectedFile.value.name}`
      link.click()
      URL.revokeObjectURL(link.href)
    } catch (err) {
        if (err.response && err.response.data instanceof Blob) {
            const textBlob = await err.response.data.text()
            try {
                const json = JSON.parse(textBlob)
                showError(json.message);
            } catch (ex) {
                alert('에러가 발생했지만 메시지를 파싱할 수 없습니다.')
            }
        } else {
            alert('알 수 없는 오류가 발생했습니다.')
        }
    }
  }
  </script>
  
  <style scoped>
  .crypto-test {
    border: 1px solid #ccc;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .run-btn {
    background-color: #369870;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
  }
  
  .drop-zone {
    border: 2px dashed #aaa;
    padding: 2rem;
    text-align: center;
    margin-bottom: 1rem;
    background-color: #fff;
    color: #333;
  }
  
  .file-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .file-name {
    flex: 1;
    padding-right: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }
  
  .hidden-input {
    display: none;
  }
  </style>
  