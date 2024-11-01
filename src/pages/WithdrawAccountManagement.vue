<template>
  <div>
    <NavBar :title="$t('設定銀行帳戶')" class="nav-bar"></NavBar>
    <ManageAccount></ManageAccount>
  </div>
</template>
<script setup lang="ts">

import NavBar from "@/components/common/NavBar.vue";
import ManageAccount from "@/components/page/withdraw/ManageAccount.vue";
</script>
<style scoped lang="less" >

</style>