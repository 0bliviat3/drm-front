<script setup>
import PieChart from '@/components/dashboard/CryptoRequestPie.vue'
import WeeklyRequestBar from '@/components/dashboard/WeeklyRequestBar.vue'
import BatchStatusPie from '@/components/dashboard/BatchStatusPie.vue'
import WeeklyErrorLine from '@/components/dashboard/WeeklyErrorLine.vue'
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
      <BatchStatusPie />
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
      <WeeklyErrorLine />
    </div>
  </div>
</template>

