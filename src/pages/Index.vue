<template>
  <div>
    <!-- <DownTips class="m-hide"></DownTips> -->
    <div class="indexTop">
      <Banner></Banner>
      <Notice></Notice>
      <JackPot></JackPot>
    </div>
    <RightMenu></RightMenu>
    <GameList></GameList>
    <FloatBox></FloatBox>
    <Menu></Menu>

  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/page/index/Banner.vue";
import DownTips from "@/components/page/index/DownTips.vue";
import GameList from "@/components/page/index/GameList.vue";
import JackPot from "@/components/page/index/JackPot.vue";
import Notice from "@/components/page/index/Notice.vue";
import FloatBox from "@/components/page/index/FloatBox.vue";
import Menu from "@/components/common/Menu.vue";
</script>

<style scoped lang="less">
.indexTop{
  /* padding: .6rem .5rem .1rem .5rem; */
    padding: 15px 0px;
    background: radial-gradient(96.76% 96.76% at 50% 3.24%, rgba(32, 45, 77, 0.8) 21%, rgba(12, 20, 41, 0.8) 100%);
    margin: 10px;
    border-radius: 14px;
}
</style>