<template>
    <div class="account-info">
      <span @click="goToProfile" class="username">{{ userName }}</span>
      <button @click="logout" class="logout-btn">로그아웃</button>
    </div>
  </template>
  
  <script>
  import api from '@/api/axios'

  export default {
    data() {
      return {
        userName: '',
      };
    },
    mounted() {
      this.userName = this.getUserNameFromCookie();
    },
    methods: {
      getUserNameFromCookie() {
        return document.cookie
          .split('; ')
          .find(row => row.startsWith('userName='))
          ?.split('=')[1] || '사용자';
      },
      goToProfile() {
        alert('프로필 페이지는 추후 구현됩니다.');
      },
      logout() {
        try {
          const response = api.get('/sign-out')
          document.cookie = 'userName=; userId=; Max-Age=0';
  
          console.log('로그아웃 성공:', response.data)
          // 여기에 로그인 성공 후 처리 추가 (예: 토큰 저장, 페이지 이동 등)
          this.$router.push('/login');
        } catch (error) {
          console.error('로그아웃 실패:', error)
        }        
      }
    }
  };
  </script>
  
  <style scoped>
  .account-info {
    position: fixed;
    top: 10px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
  }
  .username {
    font-weight: bold;
    cursor: pointer;
  }
  .logout-btn {
    background-color: #369870;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
  .logout-btn:hover {
    background-color: #2b7f60;
  }
  </style>
  