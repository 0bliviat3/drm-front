<template>
  <div>
    <SideMenu />
    <AccountInfo />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';
import AccountInfo from '@/components/AccountInfo.vue';

export default {
  components: {
    SideMenu,
    AccountInfo
  }
};
</script>

<style scoped>
.main-content {
  margin-left: 220px;
  padding: 1rem;
}
</style>
