<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import api from '@/api/axios'
import dayjs from 'dayjs'
import ToggleSwitch from '@/components/common/ToggleSwitch.vue'

const jobs = ref([])
const currentPage = ref(0)
const pageSize = 10
const totalPages = ref(0)

const fetchJobs = async () => {
  try {
    const response = await api.get('/jobs', {
      params: { page: currentPage.value, pageSize }
    })
    jobs.value = response.data
    totalPages.value = Math.ceil(response.data.length / pageSize)
  } catch (e) {
    console.error('Failed to fetch jobs:', e)
  }
}

const toggleState = async (job, val) => {
  try {
    if (val) {
        await api.put('/batch-management/edit', {
            jobBeanName: job.jobBeanName,
            state: 'ENABLE',
            cronExpression: job.cronExpression
        })
        console.log('toggle on!')
    } else {
        await api.put('/batch-management/disable', null, {
            params: { jobBeanName: job.jobBeanName }
        })
    }
    
    fetchJobs()
  } catch (e) {
    console.error('Failed to toggle job state:', e)
  }
}

// 📌 수정 창 열기
const openCronEditWindow = (job) => {
  const width = 500
  const height = 300
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=no`

  window.open(
    `/cron-edit?jobBeanName=${encodeURIComponent(job.jobBeanName)}&cron=${encodeURIComponent(job.cronExpression)}`,
    '_blank',
    windowFeatures
  )
}

// 📌 postMessage 수신
const handleMessage = (event) => {
  if (event.data === 'cron-updated') {
    fetchJobs()
  }
}

onMounted(() => {
  fetchJobs()
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

watch(currentPage, fetchJobs)

const formatDate = (dateStr) => {
  return dateStr ? dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss') : '-'
}
</script>


<template>
  <div class="shadow-md rounded-lg p-4 border border-gray-200">
    <table class="w-full min-h-[450px] table-fixed border-separate border-spacing-y-1">
      <thead class="bg-[#369870] text-white text-sm">
        <tr>
          <th class="p-2">Job Name</th>
          <th class="p-2">Cron Expression</th>
          <th class="p-2">State</th>
          <th class="p-2">생성일</th>
          <th class="p-2">수정일</th>
          <th class="p-2">수정</th>
          <th class="p-2">활성화</th>
        </tr>
      </thead>
      <tbody class="bg-gray-50 text-sm">
        <tr
          v-for="job in jobs"
          :key="job.jobBeanName"
          class="text-center bg-[gray] hover:bg-[#e5f7f2] hover:text-[#369870] transition-colors"
        >
          <td class="p-2 h-[40px]">{{ job.jobBeanName }}</td>
          <td class="p-2 h-[40px]">{{ job.cronExpression }}</td>
          <td class="p-2 h-[40px]">{{ job.state }}</td>
          <td class="p-2 h-[40px]">{{ formatDate(job.createdDate) }}</td>
          <td class="p-2 h-[40px]">{{ formatDate(job.modifiedDate) }}</td>
          <td class="p-2 h-[40px]">
            <button
                @click="openCronEditWindow(job)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                수정
            </button>
          </td>
          <td class="p-2 h-[40px]">
            <ToggleSwitch class="toggle-btn"
            :model-value="job.state === 'ENABLE'"
            @update:model-value="(val) => toggleState(job, val)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
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
<style>
.toggle-btn {
    margin: 0 auto;
}
</style>