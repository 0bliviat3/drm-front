<template>
  <div class="w-full h-full flex justify-center items-center">
    <Pie :data="chartData" :options="chartOptions" v-if="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = ref(null)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: '오늘의 암호화 / 복호화 요청 비율'
    }
  }
}

const loadData = async () => {
  try {
    const response = await api.get('/crypto-request/stats')

    console.log(response)
    // 응답 예: [{ type: "ENCRYPT", count: 20 }, { type: "DECRYPT", count: 30 }]
    const encrypt = response.data.find(item => item.type === 'ENCRYPT')?.count || 0
    const decrypt = response.data.find(item => item.type === 'DECRYPT')?.count || 0

    chartData.value = {
      labels: ['암호화 요청', '복호화 요청'],
      datasets: [{
        label: '요청 수',
        data: [encrypt, decrypt],
        backgroundColor: ['#369870', '#8FC1A9'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2
      }]
    }
  } catch (err) {
    console.error('파이차트 데이터 불러오기 실패:', err)
  }
}

onMounted(() => {
  loadData()
})
</script>
