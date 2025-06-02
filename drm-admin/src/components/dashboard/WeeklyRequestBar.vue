<template>
  <div class="w-full h-full bg-white">
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

// 유틸: 최근 7일 날짜 배열 생성
const getLast7Days = () => {
  const days = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    days.push(`${yyyy}-${mm}-${dd}`)
  }

  return days
}

const loadData = async () => {
  try {
    const response = await api.get('/request-history/week-stats')
    const dataMap = new Map()

    console.log(response.data)

    response.data.forEach(item => {
      dataMap.set(item.date, item.count)
    })

    const labels = getLast7Days()
    const counts = labels.map(date => dataMap.get(date) || 0)

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
    console.error('주간 요청 건수 데이터 로딩 실패:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>
