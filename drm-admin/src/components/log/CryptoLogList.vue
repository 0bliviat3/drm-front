<template>
    <div class="crypto-history-board">
      <table class="history-table">
        <thead>
          <tr>
            <th>파일명</th>
            <th>요청IP</th>
            <th>요청 구분</th>
            <th>상태</th>
            <th>처리 시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in histories" :key="item.cryptoId">
            <td>{{ item.fileRequest?.fileName }}</td>
            <td>{{ item.fileRequest?.requestIP }}</td>
            <td>{{ item.fileRequest?.requestType }}</td>
            <td>{{ translateState(item.processState) }}</td>
            <td>{{ item.processTime }}</td>
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
  
  const histories = ref([])
  const page = ref(0)
  const totalPages = ref(1)
  const pageSize = 10
  
  const fetchCryptoHistories = async () => {
    try {
      const res = await axios.get('/crypto-historys', {
        params: { page: page.value, pageSize }
      })
      histories.value = res.data.content
      totalPages.value = res.data.totalPages
    } catch (e) {
      console.error('암호화 히스토리 조회 실패:', e)
    }
  }
  
  const changePage = (newPage) => {
    page.value = newPage
    fetchCryptoHistories()
  }
  
  const translateState = (state) => {
    switch (state) {
      case 'SUCCESS': return '성공'
      case 'FAIL': return '실패'
      case 'IN_PROCESS': return '처리 중'
      default: return state
    }
  }
  
  onMounted(fetchCryptoHistories)
  </script>
  
  <style scoped>
  .crypto-history-board {
    padding: 1rem;
    color: black;
  }
  .history-table {
    width: 100%;
    border-collapse: collapse;
  }
  .history-table th,
  .history-table td {
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
  