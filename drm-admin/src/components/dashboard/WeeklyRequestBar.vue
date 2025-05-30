<template>
    <div class="w-full h-full">
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/api/axios'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = ref(null)
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '주간 요청 건수 (일별)'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  
  const loadData = async () => {
    try {
      const response = await api.get('/file-request-historys/weekly-counts')
  
      const labels = response.data.map(item => item.date)
      const counts = response.data.map(item => item.count)
  
      chartData.value = {
        labels,
        datasets: [{
          label: '요청 건수',
          data: counts,
          backgroundColor: '#369870',
          borderRadius: 6
        }]
      }
    } catch (error) {
      console.error('막대그래프 데이터 로딩 실패:', error)
    }
  }
  
  onMounted(() => {
    loadData()
  })
  </script>
  