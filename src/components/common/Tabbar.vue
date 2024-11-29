<template>
  <div class="k-component">
    <div class="v-bottom-navigation--fixed">
      <div class="newtabbar-item" v-for="item in tabsList" :key="item.name" @click="openToLink(item)">
        <span class="v-btn__content">
          <span :style="[{'color':activeIndex == item.url ? '#68affb':''}]">{{ item.name }}</span>
          <i :class="[`v-icon`, item.icon,activeIndex == item.url ? 'active' : '']"></i>
        </span>
      </div>
    </div>
  </div>
  <Popup v-model:show="showPopup" position="bottom" class="custom-popup">
    <div class="center-box">
      <ul class="">
        <li class="withdraw" @click="$router.push('/Deposit')">
          <span>{{$t("存款")}}</span>
        </li>
        <li class="deposit01" @click="$router.push('/Withdraw')">
          <span>{{$t("提款")}}</span>
        </li>
      </ul>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Popup } from "vant";
import router from "@/router";
import { useRoute } from "vue-router";
// [
//   {name: "首页", icon: "Inicio-def", activeIcon: "Inicio", url: "/home"},
//   {name: "晋升", icon: "Promotion-def", activeIcon: "Promotion", url: "/promotion"},
//   {name: "订金", icon: "Depósito-def", activeIcon: "Depósito", url: "/deposit"},
//   {name: "代理人", icon: "Agente-def", activeIcon: "Agente", url: "/agent/shareLink"},
//   {name: "轮廓", icon: "Perfil-def", activeIcon: "Perfil", url: "/userCenter"},
// ]
const $route = useRoute();
const activeIndex = ref();
let tabsList = reactive([
  { name: "首页", icon: "home", url: "/home" },
  { name: "線上客服", icon: "servise", url: "/OnlineServices" },
  { name: "存提", icon: "deposit", url: "" },
  { name: "帳務", icon: "Accounts", url: "/Transaction" },
  { name: "轮廓", icon: "mine", url: "/userCenter" },
]);
let showPopup = ref(false);
// 获取assets静态图片
const getAssetsImge = name => {
  return new URL(name, import.meta.url).href;
};
watch($route,()=>{
  activeIndex.value = $route.fullPath;
},{immediate:true});
const openToLink = (item) => {
  activeIndex.value = item.icon;
  if (item.url) {
    router.push(item.url);
  } else {
    activeIndex.value = "";
    showPopup.value = !showPopup.value;
  }
};
</script>

<!-- <style scoped lang="less" src="@/assets/css/components/tabbar.less"></style> -->
<style lang="less" scoped>
.k-component {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5555;

  &:before {
    top: -126px;
    height: 126px;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #1b1e1a, #3aa2ec, #1c1e1c);
  }
}

.v-bottom-navigation--fixed {
  background: #0c1429;
  border: none;
  padding: 3px 16px 10px 16px;
  z-index: 10;
  position: fixed;
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  width: 100%;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  color: rgba(0, 0, 0, .87);
  max-width: 100%;
  transition: .3s cubic-bezier(.25, .8, .5, 1);
}

.newtabbar-item {
  color: rgba(0, 0, 0, .6) !important;
  width: 100%;
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 300;
  justify-content: center;
  vertical-align: middle;
  white-space: nowrap;
  will-change: box-shadow;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  flex: 0 1 auto;
  font-size: .75rem;
  height: inherit;
  max-width: 168px;
  min-width: 80px;
  position: relative;
  text-transform: none;
}

.v-btn__content {
  padding-bottom: 8px;
  justify-content: flex-start;
  gap: 3px;
  color: #fff;
  flex-direction: column-reverse;
  height: inherit;
  line-height: normal;
  position: relative;
  transition: inherit;
  transition-property: opacity;
  display: flex;
  flex: 1 0 auto;
  align-items: center;

  span {
    color: #fff;
    line-height: 2;
    font-size: 25px;
  }

  i {
    height: 60px;
    width: 60px;
    background-size: contain;
    background-position: center;
  }

  .v-icon {
    align-items: center;
    display: inline-flex;
    -webkit-font-feature-settings: "liga";
    font-feature-settings: "liga";
    font-size: 24px;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    position: relative;
    text-indent: 0;
    transition: .3s cubic-bezier(.25, .8, .5, 1), visibility 0s;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }
  .active{
    transform: scale(1.2);
  }
  .v-icon::after {
    background-color: currentColor;
    border-radius: 50%;
    content: "";
    display: inline-block;
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: scale(1.3);
    width: 100%;
    transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
  }

  .home {
    background: url(@/assets/images/tabbar/home_1.png) no-repeat center;
    background-size: contain;
  }

  .servise {
    background: url(@/assets/images/tabbar/servise_1.png) no-repeat center;
    background-size: contain;
  }

  .deposit {
    border-radius: 50px;
  }

  .deposit::before {
    content: "";
    height: 80px;
    width: 80px;
    position: absolute;
    top: -40px;
    left: -13px;
    display: block;
    background: url(@/assets/images/tabbar/logo_a_1.png) no-repeat center;
    background-size: contain;
    z-index: 999
  }

  .deposit::after {
    display: inline-block;
    height: 100px;
    pointer-events: none;
    width: 100px;
    transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
    content: "";
    position: absolute;
    top: -50px;
    left: -25px;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    background: linear-gradient(0deg, #14307B 0%, #2D84DC 100%);
    border: 1px solid #2D84DC;
    /*  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; */
    mask-composite: exclude;
    opacity: 1;
    transform: scale(1);
    border-radius: inherit;
  }

  .Accounts {
    background: url(@/assets/images/tabbar/Accounts_1.png) no-repeat center;
    background-size: contain;
  }

  .mine {
    background: url(@/assets/images/tabbar/my_1.png) no-repeat center;
    background-size: contain;
  }
}

.center-box {
  /* height: 125px; */
  height: 200px;
  margin-bottom: 130px;

  ul {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    height: 200px;
    background: url("@/assets/images/tabbar/deposit_bg.png") no-repeat center bottom;
    background-size: contain;
    filter: drop-shadow(0px 0px 6px #69C9FF);

    li {
      flex: 1;
      text-align: center;
      height: 70px;
      line-height: 68px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      color: #fff;
      background-size: contain;
      position: relative;
      height: 100%;
      
    }
    li span{
      position: absolute;
      bottom: 5%;
      font-size: 30px;
    }
    li.withdraw{
      background: url(@/assets/images/tabbar/withdraw_bg.png);
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    order: -1;
    }
    li.withdraw::before{
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        background: url(@/assets/images/tabbar/coin.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 30%;
        left: 70%;
        }
    li.withdraw span{
      left: 60%;
    }
    li.deposit01::before{
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        background: url(@/assets/images/tabbar/atm.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 30%;
        left: 15%;
        }
    li.deposit01 span{
      left: 25%;
    }
    
  }
}

.custom-popup{
  background: transparent !important;
}
</style>