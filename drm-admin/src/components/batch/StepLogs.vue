<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/axios'
import Popup from '@/components/common/PopupModal.vue'

const steps = ref([])
const showPopup = ref(false)
const selectedMessage = ref('')
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = 10

const fetchStepLogs = async () => {
  try {
    const response = await api.get('/step-executions', {
      params: { page: currentPage.value, pageSize }
    })
    steps.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (e) {
    console.error('Failed to fetch step logs:', e)
  }
}

const truncate = (text, maxLength = 30) =>
  text?.length > maxLength ? text.slice(0, maxLength) + '...' : text

onMounted(fetchStepLogs)
watch(currentPage, fetchStepLogs)

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

    <div class="shadow-md rounded-lg p-4 border border-gray-200">
      <table class="w-full table-fixed border-separate border-spacing-y-1">
        <thead class="bg-[#369870] text-white">
          <tr>
            <th class="p-2 text-sm font-semibold">Step Name</th>
            <th class="p-2 text-sm font-semibold">Create Time</th>
            <th class="p-2 text-sm font-semibold">Start Time</th>
            <th class="p-2 text-sm font-semibold">End Time</th>
            <th class="p-2 text-sm font-semibold">Status</th>
            <th class="p-2 text-sm font-semibold">Commit</th>
            <th class="p-2 text-sm font-semibold">Read</th>
            <th class="p-2 text-sm font-semibold">Write</th>
            <th class="p-2 text-sm font-semibold">Exit Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="step in steps"
            :key="step.stepExecutionId"
            class="text-center text-sm hover:bg-[#e5f7f2] hover:text-[#369870] transition-colors"
          >
            <td class="p-2 h-[40px]">{{ step.stepName }}</td>
            <td class="p-2 h-[40px]">{{ formatDate(step.createTime) }}</td>
            <td class="p-2 h-[40px]">{{ formatDate(step.startTime) }}</td>
            <td class="p-2 h-[40px]">{{ formatDate(step.endTime) }}</td>
            <td class="p-2 h-[40px]">{{ step.status }}</td>
            <td class="p-2 h-[40px]">{{ step.commitCount }}</td>
            <td class="p-2 h-[40px]">{{ step.readCount }}</td>
            <td class="p-2 h-[40px]">{{ step.writeCount }}</td>
            <td class="p-2 h-[40px]">
              <span
                class="cursor-pointer underline"
                @click="openPopup(step.exitMessage)"
              >
                {{ truncate(step.exitMessage) || '-' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-4 mt-4">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 0"
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>Page {{ currentPage + 1 }} / {{ totalPages }}</span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages - 1"
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>
