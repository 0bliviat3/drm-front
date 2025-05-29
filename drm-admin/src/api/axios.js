// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/drm-server', // 프록시와 매칭
  withCredentials: true   // 쿠키 포함 설정
})

export default api
