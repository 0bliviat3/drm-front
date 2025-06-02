<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js'
import api from '@/api/axios'
import dayjs from 'dayjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale)

const chartData = ref({
  labels: [],
  datasets: [],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
}

const fetchData = async () => {
  const response = await api.get('/error-history/week')
  const result = response.data

  const last7Days = Array.from({ length: 7 }).map((_, i) =>
    dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD')
  )

  const countMap = {}
  result.forEach(item => {
    countMap[dayjs(item.date).format('YYYY-MM-DD')] = item.count
  })

  const labels = last7Days
  const data = last7Days.map(date => countMap[date] ?? 0)

  chartData.value = {
    labels,
    datasets: [
      {
        label: '에러 발생 수',
        backgroundColor: '#f87171',
        borderColor: '#f87171',
        fill: false,
        tension: 0.3,
        data,
      },
    ],
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="w-full h-[350px] bg-white rounded-2xl p-4 shadow-md">
    <h2 class="text-lg font-semibold mb-4">주간 에러 발생 추이</h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
