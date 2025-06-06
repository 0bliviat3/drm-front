<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import api from '@/api/axios'
import dayjs from 'dayjs'

const users = ref([])
const currentPage = ref(0)
const pageSize = 10
const totalPages = ref(0)

const fetchUsers = async () => {
  try {
    const response = await api.get('/users', {
      params: {
        page: currentPage.value,
        pageSize: pageSize
      }
    })
    users.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (e) {
    console.error('사용자 목록 조회 실패:', e)
  }
}

const formatDate = (dateStr) => {
  return dateStr ? dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss') : '-'
}

const openCreateUserWindow = () => {
  const width = 400
  const height = 450
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2
  const features = `width=${width},height=${height},top=${top},left=${left},resizable=no`

  window.open('/user-create', '_blank', features)
}

const openEditPopup = (user) => {
  const url = `/user-edit?userId=${encodeURIComponent(user.userId)}&name=${encodeURIComponent(user.name)}`
  window.open(
    url,
    '사용자 수정',
    'width=700,height=500,resizable=no,scrollbars=yes'
  )
}

const openDeletePopup = (userId) => {
  const popup = window.open(
    `/user-delete?userId=${userId}`,
    'UserDeleteWindow',
    'width=500,height=250'
  )
}



onMounted(() => {
  fetchUsers()
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

watch(currentPage, fetchUsers)

const handleMessage = (event) => {
  if (event.data === 'user-created' || event.data === 'user-updated' || event.data === 'user-deleted') {
    fetchUsers()
  }
}
</script>

<template>
  <div class="shadow-md rounded-lg p-4 border border-gray-200">
    <!-- 생성 버튼 -->
    <div class="text-right mb-2">
      <button 
       @click="openCreateUserWindow()"
       class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
        사용자 생성
      </button>
    </div>

    <!-- 사용자 테이블 -->
    <table class="w-full table-fixed border-separate border-spacing-y-1">
      <thead class="bg-[#369870] text-white text-sm">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">이름</th>
          <th class="p-2">생성일</th>
          <th class="p-2">수정</th>
          <th class="p-2">삭제</th>
        </tr>
      </thead>
      <tbody class="bg-gray-50 text-sm">
        <tr
          v-for="user in users"
          :key="user.userId"
          class="text-center bg-[gray] hover:bg-[#e5f7f2] hover:text-[#369870] transition-colors"
        >
          <td class="p-2 h-[40px]">{{ user.userId }}</td>
          <td class="p-2 h-[40px]">{{ user.name }}</td>
          <td class="p-2 h-[40px]">{{ formatDate(user.createTime) }}</td>
          <td class="p-2 h-[40px]">
            <button 
              @click="openEditPopup(user)"
              class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              수정
            </button>
          </td>
          <td class="p-2 h-[40px]">
            <button 
              @click="openDeletePopup(user.userId)"  
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="flex justify-center items-center space-x-4 mt-4">
      <button
        @click="currentPage--"
        :disabled="currentPage === 0"
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        이전
      </button>
      <span>Page {{ currentPage + 1 }} / {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages - 1"
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        다음
      </button>
    </div>
  </div>
</template>
