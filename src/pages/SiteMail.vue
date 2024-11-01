<template>
  <div>
    <NavBar class="nav-bar" :title="$t('消息中心')"></NavBar>
    <MsgNotice class="content-box"></MsgNotice>
  </div>
</template>
<script setup lang="ts">
import MsgNotice from "@/components/page/msgCenter/MsgNotice.vue";
import NavBar from "@/components/common/NavBar.vue";
</script>
<style scoped lang="less">

</style>