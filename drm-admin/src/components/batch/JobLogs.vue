<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/axios'
import Popup from '@/components/common/PopupModal.vue'

const jobs = ref([])
const showPopup = ref(false)
const selectedMessage = ref('')
const currentPage = ref(0)
const pageSize = 10
const totalPages = ref(0)

const fetchJobLogs = async () => {
  try {
    const response = await api.get('/job-executions', {
      params: { page: currentPage.value, pageSize }
    })

    jobs.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (e) {
    console.error('Failed to fetch job logs:', e)
  }
}

const truncate = (text, maxLength = 30) =>
  text?.length > maxLength ? text.slice(0, maxLength) + '...' : text

onMounted(fetchJobLogs)
watch(currentPage, fetchJobLogs)

function openPopup(msg) {
  selectedMessage.value = msg
  showPopup.value = true
}

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
  }
}

const formatDate = (datetime) =>
  datetime ? new Date(datetime).toLocaleString() : '-'
</script>


<template>
    <div class="p-6 bg-[gray] min-h-[450px] border">
      <Popup :visible="showPopup" :message="selectedMessage" @close="showPopup = false" />
  
      <!-- 표 카드 영역 -->
      <div class="shadow-md rounded-lg p-6 min-h-[400px]">
        <table class="w-full table-fixed border-collapse">
          <thead class="bg-[#369870] text-white text-sm">
            <tr>
              <th class="p-3 border-b border-gray-200 text-left">Job Name</th>
              <th class="p-3 border-b border-gray-200 text-left">Create Time</th>
              <th class="p-3 border-b border-gray-200 text-left">Start Time</th>
              <th class="p-3 border-b border-gray-200 text-left">End Time</th>
              <th class="p-3 border-b border-gray-200 text-left">Status</th>
              <th class="p-3 border-b border-gray-200 text-left">Exit Code</th>
              <th class="p-3 border-b border-gray-200 text-left">Exit Message</th>
            </tr>
          </thead>
          <tbody>
            <tr
                v-for="job in jobs"
                :key="job.jobExecutionId"
                class="text-sm text-gray-800 hover:bg-[#e6f5f0] hover:text-[#1f4033]"
            >
                <td class="p-3 h-[40px] border-b border-gray-200">{{ job.jobName }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">{{ formatDate(job.createTime) }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">{{ formatDate(job.startTime) }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">{{ formatDate(job.endTime) }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">{{ job.status }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">{{ job.exitCode }}</td>
                <td class="p-3 h-[40px] border-b border-gray-200">
                <span
                    class="cursor-pointer text-[#369870] underline hover:text-[#1f4033]"
                    @click="openPopup(job.exitMessage)"
                >
                    {{ truncate(job.exitMessage) }}
                </span>
                </td>
            </tr>
        </tbody>
        </table>
      </div>
  
      <!-- 페이징 영역 -->
      <div class="flex justify-center items-center space-x-4 mt-6">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 0"
          class="px-4 py-2 rounded bg-[#d3ebe1] text-[#1f4033] hover:bg-[#bfe2d3] disabled:opacity-50"
        >
          이전
        </button>
        <span class="text-gray-800 font-medium">
          Page {{ currentPage + 1 }} / {{ totalPages }}
        </span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages - 1"
          class="px-4 py-2 rounded bg-[#d3ebe1] text-[#1f4033] hover:bg-[#bfe2d3] disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  </template>
  
  
