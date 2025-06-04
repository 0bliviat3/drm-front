<template>
    <div class="container">
      <h2>사용자 생성</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="userId">ID</label>
          <input id="userId" v-model="userId" />
          <button type="button" @click="checkDuplicate">중복확인</button>
          <span v-if="idCheckStatus === true" class="success">사용 가능</span>
          <span v-if="idCheckStatus === false" class="error">이미 존재하는 ID</span>
        </div>
  
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input id="password" type="password" v-model="password" />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input id="confirmPassword" type="password" v-model="confirmPassword" />
          <span v-if="password && confirmPassword && !isPasswordMatch" class="error">비밀번호가 일치하지 않습니다</span>
        </div>
  
        <div class="form-group">
          <label for="name">이름</label>
          <input id="name" v-model="name" />
        </div>
  
        <button type="submit" :disabled="!canSubmit">생성</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import api from '@/api/axios'
  
  const userId = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const name = ref('')
  const idCheckStatus = ref(null) // true: 사용 가능, false: 중복, null: 미확인
  
  const isPasswordMatch = computed(() => password.value === confirmPassword.value)
  const canSubmit = computed(() =>
    userId.value &&
    password.value &&
    confirmPassword.value &&
    name.value &&
    isPasswordMatch.value &&
    idCheckStatus.value === true
  )
  
  const checkDuplicate = async () => {
    if (!userId.value) return
    try {
      const res = await api.get('/user', { params: { userId: userId.value } })
      idCheckStatus.value = !res.data // 존재하면 true → 사용 불가
    } catch (e) {
      console.error('중복 확인 실패', e)
      idCheckStatus.value = null
    }
  }
  
  const handleSubmit = async () => {
    try {
      await api.post('/sign-up', {
        userId: userId.value,
        password: password.value,
        name: name.value
      })
      alert('사용자 생성 완료')
      window.opener?.postMessage('user-created', '*') // 부모창에 알림
      window.close()
    } catch (e) {
      console.error('생성 실패', e)
      alert('사용자 생성 실패')
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    width: 300px;
  }
  .form-group {
    margin-bottom: 16px;
  }
  input {
    width: 100%;
    padding: 6px;
  }
  button {
    margin-top: 8px;
  }
  .success {
    color: green;
    font-size: 0.8rem;
  }
  .error {
    color: red;
    font-size: 0.8rem;
  }
  </style>
  