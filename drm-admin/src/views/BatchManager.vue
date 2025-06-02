<script setup>
import { ref } from 'vue'
import JobLogs from '@/components/batch/JobLogs.vue'
import StepLogs from '@/components/batch/StepLogs.vue'
import BatchList from '@/components/batch/BatchList.vue'

const currentTab = ref('job')

const tabs = [
  { key: 'job', label: 'Job 로그' },
  { key: 'step', label: 'Step 로그' },
  { key: 'list', label: '배치 목록' }
]
</script>

<template>
  <!-- 전체를 꽉 채우도록 min-h-[80vh] 이상 지정 -->
  <div class="w-full min-h-[80vh] p-6 bg-white rounded shadow">
    <!-- 탭 메뉴 -->
    <div class="flex justify-start border-b mb-6 space-x-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="currentTab = tab.key"
        class="px-4 py-2 font-semibold transition"
        :class="{
          'border-b-2 border-[#369870] text-[#369870]': currentTab === tab.key,
          'text-gray-500 hover:text-[#369870]': currentTab !== tab.key
        }"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 탭 내용 -->
    <div class="mt-4">
      <JobLogs v-if="currentTab === 'job'" />
      <StepLogs v-else-if="currentTab === 'step'" />
      <BatchList v-else />
    </div>
  </div>
</template>
