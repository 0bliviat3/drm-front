<template>
    <div class="chart-card">
      <h3>암/복호화 요청 비율</h3>
      <canvas ref="pieChart" width="400" height="300"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        // 예시 API 응답
        const data = {
          encryptCount: 120,
          decryptCount: 80
        };
  
        this.renderChart(data);
      },
      renderChart(data) {
        const ctx = this.$refs.pieChart;
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['암호화 요청', '복호화 요청'],
            datasets: [{
              data: [data.encryptCount, data.decryptCount],
              backgroundColor: ['#369870', '#85cfc2']
            }]
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-card {
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  </style>
  