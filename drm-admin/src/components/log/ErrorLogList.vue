<template>
    <div class="error-log-board">
      <Popup :visible="showPopup" :message="selectedStackTrace" @close="showPopup = false" />
      <table class="log-table">
        <thead>
          <tr>
            <th>에러 코드</th>
            <th>에러 메시지</th>
            <th>리턴 메시지</th>
            <th>이벤트 시간</th>
            <th>StackTrace</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.errorId">
            <td>{{ log.errorCode }}</td>
            <td>{{ log.errorMessage ? log.errorMessage.slice(0, 30) + '...' : '' }}</td>
            <td>{{ log.returnMessage }}</td>
            <td>{{ log.eventTime }}</td>
            <td class="stacktrace-preview" @click="showStackTrace(log.stackTrace)">
              {{ log.stackTrace.slice(0, 10) }}...
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 페이징 -->
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
  import Popup from '@/components/common/PopupModal.vue'
  
  const logs = ref([])
  const page = ref(0)
  const totalPages = ref(1)
  const pageSize = 10
  
  const showPopup = ref(false)
  const selectedStackTrace = ref('')
  
  const fetchErrorLogs = async () => {
    const res = await axios.get('/error-historys', {
      params: {
        page: page.value,
        pageSize
      }
    })
    logs.value = res.data.content
    totalPages.value = res.data.totalPages
  }
  
  const changePage = (newPage) => {
    page.value = newPage
    fetchErrorLogs()
  }
  
  const showStackTrace = (stack) => {
    selectedStackTrace.value = stack
    showPopup.value = true
  }
  
  onMounted(() => {
    fetchErrorLogs()
  })
  </script>
  
  <style scoped>
  .error-log-board {
    padding: 1rem;
    color: black;
  }
  .log-table {
    width: 100%;
    border-collapse: collapse;
  }
  .log-table th,
  .log-table td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
  }
  .stacktrace-preview {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }
  .pagination {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  </style>
  