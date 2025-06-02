<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import Popup from '@/components/common/PopupModal.vue'

const jobs = ref([])
const showPopup = ref(false)
const selectedMessage = ref('')

const fetchJobLogs = async () => {
  try {
    const response = await api.get('/job-executions', {
      params: { page: 0, pageSize: 10 }
    })
    jobs.value = response.data
  } catch (e) {
    console.error('Failed to fetch job logs:', e)
  }
}

const truncate = (text, maxLength = 30) =>
  text?.length > maxLength ? text.slice(0, maxLength) + '...' : text



function openPopup(msg) {
  selectedMessage.value = msg
  showPopup.value = true
}


const formatDate = (datetime) =>
  datetime ? new Date(datetime).toLocaleString() : '-'

onMounted(fetchJobLogs)
</script>

<template>
  <div class="p-4 relative">
    <Popup :visible="showPopup" :message="selectedMessage" @close="showPopup = false" />
    <table class="w-full table-auto border border-gray-300 rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">Job Name</th>
          <th class="p-2 border">Create Time</th>
          <th class="p-2 border">Start Time</th>
          <th class="p-2 border">End Time</th>
          <th class="p-2 border">Status</th>
          <th class="p-2 border">Exit Code</th>
          <th class="p-2 border">Exit Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.jobExecutionId" class="text-sm text-center">
          <td class="p-2 border">{{ job.jobName }}</td>
          <td class="p-2 border">{{ formatDate(job.createTime) }}</td>
          <td class="p-2 border">{{ formatDate(job.startTime) }}</td>
          <td class="p-2 border">{{ formatDate(job.endTime) }}</td>
          <td class="p-2 border">{{ job.status }}</td>
          <td class="p-2 border">{{ job.exitCode }}</td>
          <td class="p-2 border">
            <span class="cursor-pointer text-blue-600 underline" @click="openPopup(job.exitMessage)">
              {{ truncate(job.exitMessage) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
