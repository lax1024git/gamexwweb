<template>
  <div class="game-box">
    <div class="tabs-warp">
      <el-skeleton animated :loading="false">
        <template #template>
          <div class="game-list skeleton-warp">
            <AspectRatio aspect="204/153" v-for="i in 24" :key="i">
              <el-skeleton-item variant="image" class="skeleton-item" />
            </AspectRatio>
          </div>
        </template>
        <template #default>
          <div class="game-content">
            <div class="game-content-left">
              <ul class="game-tab">
                <li v-for="(item, index) in indexMenuStore.menuData?.xw_mobile_game_menu"
                  :class="[activeIndex == index ? 'swiper-pagination-bullet-active' : '']" :style="{'--acImg': `url(${item.select_icon_url})`,'--Img':`url(${item.icon_url})`}" :key="index" @click="changeType(index)">
                  <span>{{ $t(item.name) }}</span>
                </li>
              </ul>
            </div>
            <div class="game-content-right">
              <Hotgame ref="Hot"></Hotgame>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { nextTick, onActivated, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const {indexMenuStore } = useStore();
const activeIndex = ref(0);
const Hot = ref(null);
const changeType = (index) => {
  /* if(activeIndex.value === index)return; */
  activeIndex.value = index;
  if(Hot.value){
    Hot.value.index = index;
    Hot.value.changedata();
  }
};
watch($route,()=>{
  if($route.query.gameId){
    let menuIndex = indexMenuStore.menuData?.xw_mobile_game_menu.findIndex(item=>item.href==$route.fullPath)
    if(activeIndex.value == menuIndex)return;
    changeType(menuIndex);
  }
});
onMounted(()=>{
  nextTick(async()=>{
    await changeType(activeIndex.value);
  })
  
});
</script>

<style scoped lang="less" src="@/assets/css/pages/index/gameList.less"></style>
<style scoped lang="less">
.game-content {
  display: flex;
  gap: 20px;
  overflow-y: auto;
  height: 56vh;
  padding-bottom: 50px;

  &-left {
    width: 21%;
  }

  &-right {
    flex: 1;
  }
}
.game-tab {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 24%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 30px 0px 0px;
  border-radius: 0 5px 0 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0);
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  transform: none;
  right: 10px;

  li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 50px;
    flex: 1;
    color: #97a8c7;
    text-align: center;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    background: #0c1429;
    -webkit-box-shadow: 2px 1px 4px 0px #545c70;
    -moz-box-shadow: 2px 1px 4px 0px #545c70;
    box-shadow: 2px 1px 4px 0px #545c70;
    height: calc(19.5% - 7px);
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(3, 3, 3, 0.3) 0%, rgba(51, 66, 107, 0.6) 100%);
    box-shadow: none;
  }

  li.swiper-pagination-bullet-active {
    box-shadow: none;
    color: #fff;
    background: radial-gradient(96.76% 96.76% at 50% 3.24%, #1F53A0 0%, #1764AB 30.5%, #0C1429 100%);
  }

  li:before {
    content: "";
    display: block;
    width: 100%;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    height: 60%;
    margin-top: -3px;
    background: var(--Img) center no-repeat;
    background-size: contain;

  }

  span {
    font-size: 25px;
    overflow: hidden;
    /* text-decoration: none;
    line-height: 1; */
    width: 100%;
    text-overflow: ellipsis;
    padding: 4px 1px;
    white-space:nowrap;
  }

  li:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    border: 1px solid transparent;
    background: linear-gradient(270deg, #263557 0%, #3b4d71 100%) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  li.swiper-pagination-bullet-active:after {
    background: linear-gradient(180deg, #63ffff 0%, #d6d6d6 100%) border-box;
  }

  li.swiper-pagination-bullet-active:before {
    /* background: var(--amg) center no-repeat; */
    content: "";
    display: block;
    width: 100%;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    height: 60%;
    margin-top: -3px;
    background: var(--acImg) center no-repeat;
    background-size: contain;
    animation: aniGame .8s ease-out infinite;
    -webkit-animation: aniGame .8s ease-out infinite;
  }

  @keyframes aniGame {
    0% {
      transform: translateY(-3px);
    }

    50% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-3px);
    }
  }
}
</style>