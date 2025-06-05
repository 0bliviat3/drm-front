<template>
    <div class="function-manual">
      <h1 class="title">기능 설명서</h1>
  
      <div class="section">
        <h2>📊 대시보드</h2>
        <p>
          일일 암복호화 요청 현황, 주간 요청 건수, 일일 배치 실행 결과, 주간 에러 발생 추이를 시각화하여
          관리자가 시스템을 한눈에 파악할 수 있도록 돕습니다.
        </p>
        <img :src="images.dashboard" alt="대시보드 이미지" class="manual-image" />
      </div>
  
      <div class="section">
        <h2>📦 배치 관리</h2>
        <p>
          현재 사용 중인 배치 목록을 확인하고, 배치의 활성화 상태 변경 또는 세부 수정이 가능한 기능입니다.
          배치 로그도 함께 제공되어 실행 이력 확인이 가능합니다.
        </p>
        <img :src="images.batch" alt="배치 관리 이미지" class="manual-image" />
      </div>
  
      <div class="section">
        <h2>👤 사용자 관리</h2>
        <p>
          관리자 계정의 추가, 수정 및 삭제가 가능한 기능입니다. 비밀번호 확인과 중복 ID 확인 기능을 통해
          안전한 사용자 관리를 지원합니다.
        </p>
        <img :src="images.user" alt="사용자 관리 이미지" class="manual-image" />
      </div>
  
      <div class="section">
        <h2>📄 로그 확인</h2>
        <p>
          시스템 내 발생한 암복호화 로그, 요청 로그, 에러 로그 등을 확인할 수 있으며,
          각 로그 항목은 페이징 및 팝업 상세보기로 구성되어 있습니다.
        </p>
        <img :src="images.log" alt="로그 확인 이미지" class="manual-image" />
      </div>
  
      <div class="section">
        <h2>🔐 암복호화 테스트</h2>
        <p>
          이 기능은 코어 모듈인 암복호화 기능을 직접 테스트할 수 있는 기능입니다.
          암호화 / 복호화 선택, 파일 업로드, 처리 결과 다운로드가 포함되어 있습니다.
        </p>
        <img :src="images.crypto" alt="암복호화 테스트 이미지" class="manual-image" />
  
        <h3 class="sub-title">📌 암복호화 API 명세</h3>
        <pre class="api-spec">
  POST /enc/file
  Content-Type: multipart/form-data
  Body: { sourceFile: File }
  
  POST /dec/file
  Content-Type: multipart/form-data
  Body: { sourceFile: File }
  
  응답: application/octet-stream (바이너리 파일)
        </pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import dashboardImg from '@/assets/images/manual/dashboard.png'
  import batchImg from '@/assets/images/manual/batch.png'
  import userImg from '@/assets/images/manual/user.png'
  import logImg from '@/assets/images/manual/log.png'
  import cryptoImg from '@/assets/images/manual/crypto.png'
  
  const images = {
    dashboard: dashboardImg,
    batch: batchImg,
    user: userImg,
    log: logImg,
    crypto: cryptoImg
  }
  </script>
  
  <style scoped>
  .function-manual {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }
  
  .section {
    margin-bottom: 40px;
  }
  
  .section h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
  
  .section p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .manual-image {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  
  .sub-title {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  
  .api-spec {
    background-color: #f9f9f9;
    padding: 12px;
    border-left: 4px solid #888;
    font-family: monospace;
    white-space: pre-wrap;
  }
  </style>
  