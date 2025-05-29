<template>
    <div class="account-info">
      <span @click="goToProfile" class="username">{{ userName }}</span>
      <button @click="logout" class="logout-btn">로그아웃</button>
    </div>
  </template>
  
  <script>
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
        document.cookie = 'userName=; Max-Age=0';
        this.$router.push('/login');
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
  