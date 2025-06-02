<script setup>
import PieChart from '@/components/dashboard/CryptoRequestPie.vue'
import WeeklyRequestBar from '@/components/dashboard/WeeklyRequestBar.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4">
    <div class="rounded-2xl shadow p-4 bg-gray-50 border border-blue-500">
      <PieChart />
    </div>
    <div class="rounded-2xl shadow p-4 bg-gray-50 border border-blue-500">
      <WeeklyRequestBar />
    </div>
    <!-- 나머지 2개 자리도 동일하게 -->
  </div>
</template>

