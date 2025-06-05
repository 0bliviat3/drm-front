<template>
    <div class="request-history-board">
      <table class="request-table">
        <thead>
          <tr>
            <th>요청 ID</th>
            <th>사용자 ID</th>
            <th>요청 IP</th>
            <th>요청 URL</th>
            <th>요청 시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in requestLogs" :key="item.requestId">
            <td>{{ item.requestId }}</td>
            <td>{{ item.userId }}</td>
            <td>{{ item.requestIP }}</td>
            <td>{{ item.requestURL }}</td>
            <td>{{ item.requestTime }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button :disabled="page === 0" @click="changePage(page - 1)">이전</button>
        <span>{{ page + 1 }} / {{ totalPages }}</span>
        <button :disabled="page + 1 >= totalPages" @click="changePage(page + 1)">다음</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '@/api/axios'
  
  const requestLogs = ref([])
  const page = ref(0)
  const totalPages = ref(1)
  const pageSize = 10
  
  const fetchRequestLogs = async () => {
    try {
      const res = await axios.get('/request-historys', {
        params: { page: page.value, pageSize }
      })
      requestLogs.value = res.data.content
      totalPages.value = res.data.totalPages
    } catch (err) {
      console.error('요청 로그 조회 실패:', err)
    }
  }
  
  const changePage = (newPage) => {
    page.value = newPage
    fetchRequestLogs()
  }
  
  onMounted(fetchRequestLogs)
  </script>
  
  <style scoped>
  .request-history-board {
    padding: 1rem;
    color: black;
  }
  .request-table {
    width: 100%;
    border-collapse: collapse;
  }
  .request-table th,
  .request-table td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
  }
  .pagination {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  </style>
  