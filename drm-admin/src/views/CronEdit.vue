<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios'

const route = useRoute()
const jobBeanName = ref(route.query.jobBeanName || '')
const cronExpression = ref(route.query.cron || '')
const state = ref(route.query.state || '')

const save = async () => {
  try {
    await api.put('/batch-management/edit', {
      jobBeanName: jobBeanName.value,
      cronExpression: cronExpression.value,
      state: state.value
    })

    // ✅ 부모창에 알림 후 닫기
    if (window.opener) {
      window.opener.postMessage('cron-updated', '*')
    }
    window.close()
  } catch (e) {
    alert('수정 실패')
  }
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-lg font-bold mb-4 text-[#369870]">크론 표현식 수정</h2>
    <div class="mb-4">
      <label class="block font-semibold">Job Name</label>
      <input v-model="jobBeanName" disabled class="border p-2 rounded w-full bg-gray-100" />
    </div>
    <div class="mb-4">
      <label class="block font-semibold">Cron Expression</label>
      <input v-model="cronExpression" class="border p-2 rounded w-full" />
    </div>
    <button
      @click="save"
      class="bg-[#369870] text-white px-4 py-2 rounded hover:bg-[#2e7d6b]"
    >
      저장
    </button>
  </div>
</template>
