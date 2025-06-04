<template>
    <div class="container">
      <div class="form-row">
        <label for="userId">ID</label>
        <input type="text" id="userId" v-model="userId" disabled />
      </div>
  
      <div class="form-row">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" />
      </div>
  
      <div class="form-row">
        <label for="currentPassword">기존 비밀번호</label>
        <input
          type="password"
          id="currentPassword"
          v-model="currentPassword"
        />
        <button @click="checkPassword">비밀번호 확인</button>
      </div>
  
      <div class="form-row">
        <label for="newPassword">새 비밀번호</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          :disabled="!passwordVerified"
        />
      </div>
  
      <div class="form-row button-row">
        <button @click="modifyUser" :disabled="!passwordVerified">수정</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/api/axios'
  
  const userId = ref('')
  const name = ref('')
  const currentPassword = ref('')
  const newPassword = ref('')
  const passwordVerified = ref(false)
  
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    userId.value = urlParams.get('userId') || ''
    name.value = urlParams.get('name') || ''
  })
  
  const checkPassword = async () => {
    try {
      const response = await api.post('/sign-in', {
        userId: userId.value,
        password: currentPassword.value,
      })
  
      if (response.data && response.data.userId === userId.value) {
        alert('비밀번호 확인 성공')
        passwordVerified.value = true
      } else {
        alert('비밀번호가 일치하지 않습니다.')
        passwordVerified.value = false
      }
    } catch (e) {
      alert('비밀번호가 일치하지 않습니다.')
      passwordVerified.value = false
    }
  }
  
  const modifyUser = async () => {
    try {
      await api.put('/user', {
        userId: userId.value,
        password: newPassword.value,
        name: name.value,
      })
  
      window.opener.postMessage('user-updated', '*')
      window.close()
    } catch (e) {
      alert('수정 실패')
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .form-row label {
    width: 120px;
    font-weight: bold;
  }
  
  .form-row input {
    flex: 1;
    padding: 6px;
    margin-right: 8px;
  }
  
  .form-row button {
    padding: 6px 10px;
  }
  
  .button-row {
    justify-content: center;
  }
  
  .button-row button {
    width: 100px;
    background-color: #369870;
    color: white;
    border: none;
    border-radius: 4px;
  }
  </style>
  