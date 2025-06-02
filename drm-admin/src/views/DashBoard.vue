<script setup>
import PieChart from '@/components/dashboard/CryptoRequestPie.vue'
import WeeklyRequestBar from '@/components/dashboard/WeeklyRequestBar.vue'
// 다른 컴포넌트도 아래처럼 추가 예정
</script>

<template>
  <div class="grid grid-cols-2 gap-6 p-6">
    <div class="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
      <PieChart />
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
      <WeeklyRequestBar />
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
      <!-- 향후: WeeklyBatchBar.vue -->
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
      <!-- 향후: WeeklyErrorLine.vue -->
    </div>
  </div>
</template>

