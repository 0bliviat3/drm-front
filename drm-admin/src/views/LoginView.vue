<template>
    <div class="login-container">
      <div class="login-box">
        <h2>로그인</h2>
        <form @submit.prevent="onLogin" class="login-form">
          <input
            type="text"
            v-model="username"
            placeholder="아이디"
            required
          />
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호"
            required
          />
          <button type="submit">로그인</button>
        </form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/api/axios'
  
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      async onLogin() {
        this.errorMessage = ''
        try {
          const response = await api.post('/sign-in', {
            userId: this.username,
            password: this.password
          })
  
          console.log('로그인 성공:', response.data)
          // 여기에 로그인 성공 후 처리 추가 (예: 토큰 저장, 페이지 이동 등)
  
        } catch (error) {
          console.error('로그인 실패:', error)
          this.errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.'
        }
      }
    }
  }
  </script>
  
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background-color: #f5f5f5; */
  }
  
  .login-box {
    width: 320px;
    padding: 40px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .login-box h2 {
    margin-bottom: 24px;
    font-size: 24px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .login-form input,
  .login-form button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .login-form button {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .login-form button:hover {
    background-color: #369870;
  }

  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 8px;
 }


  </style>
  