<template>
    <div class="log-management">
      <div class="tab-header">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab', { active: currentTab === tab.key }]"
          @click="currentTab = tab.key"
        >
          {{ tab.label }}
        </div>
      </div>
  
      <div class="tab-content">
        <component :is="currentComponent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import ErrorLogList from '@/components/log/ErrorLogList.vue'
  import CryptoLogList from '@/components/log/CryptoLogList.vue'
  import CryptoResultLogList from '@/components/log/CryptoResultLogList.vue'
  import RequestLogList from '@/components/log/RequestLogList.vue'
  
  // 탭 정의
  const tabs = [
    { key: 'errorLog', label: '에러 로그', component: ErrorLogList },
    { key: 'cryptoLog', label: '암복호화 로그', component: CryptoLogList },
    { key: 'cryptoResultLog', label: '암복호화 결과 로그', component: CryptoResultLogList },
    { key: 'requestLog', label: '요청 로그', component: RequestLogList },
  ]
  
  const currentTab = ref('errorLog')
  
  // 현재 탭 컴포넌트 반환
  const currentComponent = computed(() => {
    const tab = tabs.find(t => t.key === currentTab.value)
    return tab ? tab.component : null
  })
  </script>
  
  <style scoped>
  .log-management {
    padding: 16px;
  }
  
  .tab-header {
    display: flex;
    border-bottom: 2px solid #ccc;
    margin-bottom: 16px;
  }
  
  .tab {
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .tab.active {
    color: #369870;
    border-bottom-color: #369870;
    font-weight: bold;
  }
  
  .tab-content {
    background: #fff;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 300px;
  }
  </style>
  