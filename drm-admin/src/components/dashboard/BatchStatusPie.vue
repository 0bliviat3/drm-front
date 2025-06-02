<script setup>
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import api from '@/api/axios'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '배치 상태',
      backgroundColor: ['#369870', '#f87171'], // 성공: 초록, 실패: 빨강
      data: [],
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const fetchData = async () => {
  try {
    const response = await api.get('/batch-status/daily')
    const data = response.data

    console.log(data)

    const complete = response.data.find(item => item.status === 'COMPLETED')?.count || 0
    const fail = response.data.find(item => item.status === 'FAILED')?.count || 0

    chartData.value = {
      labels: ['성공', '실패'],
      datasets: [{
        label: '요청 수',
        data: [complete, fail],
        backgroundColor: ['#369870', '#8FC1A9'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2
      }]
    }
  } catch (error) {
    console.error('배치 상태 불러오기 실패:', error)
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="w-full h-full bg-white rounded-2xl p-4 shadow-md">
    <h2 class="text-lg font-semibold mb-4">오늘의 배치 실행 결과</h2>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
