<template>
    <div class="dashboard-grid">
      <CryptoRequestPie />
      <WeeklyRequestBar />
      <WeeklyBatchBar />
      <WeeklyErrorLine />
    </div>
  </template>
  
  <script>
  import CryptoRequestPie from '@/components/dashboard/CryptoRequestPie.vue';
  import WeeklyRequestBar from '@/components/dashboard/WeeklyRequestBar.vue';
  import WeeklyBatchBar from '@/components/dashboard/WeeklyBatchBar.vue';
  import WeeklyErrorLine from '@/components/dashboard/WeeklyErrorLine.vue';
  
  export default {
    components: {
      CryptoRequestPie,
      WeeklyRequestBar,
      WeeklyBatchBar,
      WeeklyErrorLine
    }
  };
  </script>
  
  <style scoped>
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    padding: 20px;
  }
  </style>
  