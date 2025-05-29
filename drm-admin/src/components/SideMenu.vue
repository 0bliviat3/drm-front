<template>
    <nav class="side-menu">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="menu-link">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [
          { name: '대쉬보드', path: '/dashboard' },
          { name: '배치관리', path: '/batch' },
          { name: '사용자관리', path: '/users' },
          { name: '로그확인', path: '/logs' },
          { name: '암복호화 테스트', path: '/crypto' },
          { name: '기능 설명서', path: '/docs' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .side-menu {
    width: 220px;
    background-color: #ffffff;
    height: 100vh;
    padding-top: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  }
  
  .side-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-link {
    display: block;
    padding: 12px 20px;
    margin: 8px 10px;
    border-radius: 12px;
    text-decoration: none;
    color: #1f4033;
    background-color: #d2f0e5; /* 선명한 느낌 */
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .menu-link:hover {
    background-color: #369870;
    color: #fff;
  }
  </style>
  