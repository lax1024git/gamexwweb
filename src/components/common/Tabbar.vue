<template>
  <div class="pc-hide tabbar-box">
    <div class="tabbar-content">
      <div class="tabbar-item" v-for="(item, index) in tabsList" :key="index" @click="openToLink(item)"
           :class="{ active: $route.path.startsWith(item.url),financial:index==2 }">
<!--        <t-svg :name="item.activeIcon" class="item-icon animate" v-if="$route.path.startsWith(item.url)"></t-svg>-->
<!--        <t-svg :name="item.icon" class="item-icon " v-else></t-svg>-->
        <img :src="getAssetsImge(item.icon)" alt="" style="height: 30px" class="item-icon " >
        <div class="item-icon" v-if="index==2"></div>
        <div class="itme-name">{{ $t(item.name) }}</div>
      </div>
    </div>
    <Popup v-model:show="showPopup" position="bottom">
      <div class="center-box">
        <ul class="">
          <li class="withdraw" @click="$router.push('/Withdraw')">提款</li>
          <li class="deposit" @click="$router.push('/Deposit')">存款</li>
        </ul>
      </div>
    </Popup>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {Popup} from "vant";
import router from "@/router";
// [
//   {name: "首页", icon: "Inicio-def", activeIcon: "Inicio", url: "/home"},
//   {name: "晋升", icon: "Promotion-def", activeIcon: "Promotion", url: "/promotion"},
//   {name: "订金", icon: "Depósito-def", activeIcon: "Depósito", url: "/deposit"},
//   {name: "代理人", icon: "Agente-def", activeIcon: "Agente", url: "/agent/shareLink"},
//   {name: "轮廓", icon: "Perfil-def", activeIcon: "Perfil", url: "/userCenter"},
// ]
let tabsList = reactive([
  {name: "首页", icon: "../../assets/images/tabbar/Home.png", url: "/home"},
  {name: "帳務", icon: "../../assets/images/tabbar/Accounts_a.png", url: "/Transaction"},
  {name: "存提", icon: "../../assets/images/tabbar/deposit.svg", url: ""},
  {name: "線上客服", icon: "../../assets/images/tabbar/servise_a.png", url: "/OnlineServices"},
  {name: "轮廓", icon: "../../assets/images/tabbar/my_a.png", url: "/userCenter"},
]);
let showPopup = ref(false);
// 获取assets静态图片
const getAssetsImge = name => {
  return new URL(name, import.meta.url).href;
};

const openToLink = (item) => {
  console.log(item);
  if (item.url){
    router.push(item.url);
  }else {
    showPopup.value = true;
  }
};
</script>

<style scoped lang="less" src="@/assets/css/components/tabbar.less"></style>
<style lang="less" scoped>
.center-box {
  background: url("@/assets/images/tabbar/circle.png") no-repeat center bottom;
  height: 125px;
  margin-bottom: 130px;

  ul {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    gap: 10px;

    li {
      flex: 1;
      text-align: center;
      height: 70px;
      line-height: 68px;
      margin-bottom: 55px;
      font-size: 16px;
      padding: 0 20px;
      overflow: hidden;
      white-space: nowrap;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      color: #fff;
      background: url("@/assets/images/tabbar/left.png") no-repeat center bottom;
      background-size: contain;
    }

    li:nth-child(2) {
      height: 70px;
      line-height: 68px;
      background-image: url("@/assets/images/tabbar/right.png");
    }
  }
}

::v-deep .van-popup {
  background: transparent;
}
.financial{
  img{
    position: absolute;
    height: 100px !important;
    top: -60px;
  }
}
</style>