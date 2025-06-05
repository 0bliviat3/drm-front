<template>
    <div class="container">
      <div class="form-row">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" />
        <button @click="verifyPassword">비밀번호 확인</button>
      </div>
  
      <div class="form-row button-row">
        <button @click="deleteUser" :disabled="!passwordVerified">삭제</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/api/axios'
  
  const userId = ref('')
  const password = ref('')
  const passwordVerified = ref(false)
  
  onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    userId.value = params.get('userId') || ''
  })
  
  const verifyPassword = async () => {

    try {
      const res = await api.post('/sign-in', {
        userId: userId.value,
        password: password.value,
      })
  
      if (res.data && res.data.userId === userId.value) {
        alert('비밀번호 확인 성공')
        passwordVerified.value = true
      } else {
        alert('비밀번호가 일치하지 않습니다.')
      }
    } catch (err) {
      alert('비밀번호 확인 실패')
    }
  }
  
  const deleteUser = async () => {
    try {
      await api.delete('/user', {
        data: {
          userId: userId.value,
          password: password.value,
        },
      })
  
      window.opener.postMessage('user-deleted', '*')
      window.close()
    } catch (err) {
      alert('사용자 삭제 실패')
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
    width: 100px;
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
    background-color: #c0392b;
    color: white;
    border: none;
    border-radius: 4px;
  }
  </style>
  