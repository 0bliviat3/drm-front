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
        const name = this.$cookies.get('userName')
        return name ? name :'사용자';
      },
      goToProfile() {
        const url = `/user-edit?userId=${this.$cookies.get('userId')}&name=${this.$cookies.get('userName')}`
        window.open(
          url,
          '사용자 수정',
          'width=700,height=500,resizable=no,scrollbars=yes'
        )
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
  