<script setup>
import PieChart from '@/components/dashboard/CryptoRequestPie.vue'
import WeeklyRequestBar from '@/components/dashboard/WeeklyRequestBar.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4">
    <div class="bg-white rounded-2xl shadow p-4">
      <PieChart />
    </div>
    <div class="bg-white rounded-2xl shadow p-4">
      <WeeklyRequestBar />
    </div>
    <!-- 나머지 2개 컴포넌트 자리 -->
  </div>
</template>
