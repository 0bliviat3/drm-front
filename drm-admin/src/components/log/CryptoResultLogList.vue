<template>
    <div class="crypto-result-board">
      <table class="result-table">
        <thead>
          <tr>
            <th>파일명</th>
            <th>요청IP</th>
            <th>요청 구분</th>
            <th>프로세스 상태</th>
            <th>재시도 횟수</th>
            <th>종료 시간</th>
            <th>파일 상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in results" :key="item.cryptoResultId">
            <td>{{ item.fileRequest?.fileName }}</td>
            <td>{{ item.fileRequest?.requestIP }}</td>
            <td>{{ item.fileRequest?.requestType }}</td>
            <td>{{ translateProcessState(item.processState) }}</td>
            <td>{{ item.retryCount }}</td>
            <td>{{ item.processEndTime }}</td>
            <td>{{ translateFileState(item.fileState) }}</td>
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
  
  const results = ref([])
  const page = ref(0)
  const totalPages = ref(1)
  const pageSize = 10
  
  const fetchCryptoResults = async () => {
    try {
      const res = await axios.get('/crypto-results', {
        params: { page: page.value, pageSize }
      })
      results.value = res.data.content
      totalPages.value = res.data.totalPages
    } catch (err) {
      console.error('암복호화 결과 조회 실패:', err)
    }
  }
  
  const changePage = (newPage) => {
    page.value = newPage
    fetchCryptoResults()
  }
  
  const translateProcessState = (state) => {
    switch (state) {
      case 'SUCCESS': return '성공'
      case 'FAIL': return '실패'
      case 'IN_PROCESS': return '처리 중'
      default: return state
    }
  }
  
  const translateFileState = (state) => {
    switch (state) {
      case 'EXIST': return '존재함'
      case 'REMOVED': return '삭제됨'
      default: return state
    }
  }
  
  onMounted(fetchCryptoResults)
  </script>
  
  <style scoped>
  .crypto-result-board {
    padding: 1rem;
    color: black;
  }
  .result-table {
    width: 100%;
    border-collapse: collapse;
  }
  .result-table th,
  .result-table td {
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
  