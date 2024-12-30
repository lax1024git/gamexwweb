<template>
  <!-- <DownTips class="pc-hide"></DownTips> -->
  <div class="header">
    <div class="header-content" id="head">
      <div class="flex items-center gap-1">
        <div class="menu-icon" @click="menuStore.changeShow"></div>
        <img
          :src="systemStore.isPhone ? systemStore.systemDataNew?.site.website_mobile_logo : systemStore.systemDataNew?.site.website_pc_logo"
          class="logo" @click="$router.push('/')" />
      </div>
      <div class="header-content-right">
        <div v-if="userStore.isLogin" class="balance-warp">
          <div class="balance-warp-top">
            <div class="user-label">{{ userStore.userInfo?.level_name }}</div>
            <div class="username">{{ userStore.userInfo?.yphone || userStore.userInfo?.mail }}</div>
            <div class="balance">
              <img src="@/assets/images/home/$.png" class="cion">
              <span class="text-size">{{ $numInit(userStore.userInfo?.balance) }}</span>
              <Refresh :is-refresh="isRefresh" class="refresh-icon" @click="refreshBalance"></Refresh>
            </div>
            <div class="mail-btn" @click="$openLink('/SiteMail')"></div>
          </div>
          <!-- <div class="balance-warp-bottom">
            {{ $numInit(userStore.userInfo?.balance) }}
          </div> -->
        </div>
        <div class="right-box" v-else-if="!userStore.isLogin">
          <div class="login-btn" @click="$router.push('/Login')">{{ $t("登录") }}</div>
          <div class="signup-btn" @click="$router.push('/Register')">{{ $t("注册") }}</div>
        </div>
        <!--  <div class="lang-item">
          <div @click="btnVisible=!btnVisible">
            <span>{{ lang.getLocale() }}</span>
            <TSvg name="caretBottom" class="caretBottom-icon"></TSvg>
          </div>
          <div class="langs-box" v-if="btnVisible">
            <div class="lang-select-item" v-for="item in systemStore.systemData?.alllang" :key="item.value"
                 @click="lang.setLocale(item.value, true);btnVisible=false">
              <img :src="item.icon" style="width: 20px;height: 20px;"/>
              <text>{{ item.label }}</text>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useStore from "@/store";
import DownTips from "@/components/page/index/DownTips.vue";
import { onMounted, ref } from "vue";
import lang from "@/lang";
import { ElementType } from "@/types/utils";
import { openLink } from "@/utils/openLink";
import Refresh from "@/components/common/Refresh.vue";
import quit from "@/utils/quit";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { currentTime } from "@/utils/currentTime";

const { menuStore, userStore, systemStore } = useStore();
const menuList = [
  [{ name: "代理", icon: "agent", url: "/agent" }],
  [
    // { name: "账户详细资料", icon: "statement", url: "/report?current=0" },
    { name: "投注记录", icon: "betRecords", url: "/report?current=0" },
    // { name: "报告", icon: "reorts", url: "/report?current=2" },
    { name: "消息中心", icon: "messageCenter", url: "/msgCenter" },
  ],
  [
    // { name: "取回余额", icon: "retrieveTheBalance", url: "/retrieveTheBalance" },
    { name: "提款管理", icon: "withdrawalManage", url: "/withdraw?current=2" },
    { name: "轮廓", icon: "profile", url: "/profile" },
    { name: "安全中心", icon: "securityCenter", url: "/securityCenter" },
  ],
  [
    { name: "音乐", icon: "music", url: "/music" },
    { name: "反馈", icon: "feedback", url: "/msgCenter?current=4" },
    { name: "常见问题", icon: "question2", url: "/msgCenter?current=0" },
    { name: "退出", icon: "quit", callBack: quit },
  ],
];

const menuVisible = ref(false);
const btnVisible = ref(false);
const tabMenu = (item: ElementType<ElementType<typeof menuList>>) => {
  menuVisible.value = false;
  if (item.callBack) {
    item.callBack();
  } else {
    openLink(item.url);
  }
};

// 刷新余额
const isRefresh = ref(false);
const refreshBalance = async () => {
  if (isRefresh.value) return;
  isRefresh.value = true;
  await userStore.getUserInfo();
  isRefresh.value = false;
};
</script>
<style scoped lang="less">
.header-content {
  height: var(--header-height);
  background-color: var(--color1);
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 10px 0px rgba(0, 16, 74, 0.5);
  position: fixed;
  width: 100%;
  z-index: 110;
  justify-content: space-between;
  padding: 0 26px;
}

.header-content::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1px;
  height: 1px;
  background: linear-gradient(to right, #1b1e1a, #3aa2ec, #1c1e1c);
  z-index: -1;
}

.user-label {
  padding: 5px;
  font-size: 3vw;
  color: #000;
  font-style: italic;
  background: linear-gradient(287deg, #63FFFF 22.92%, #4D95FF 61.33%);
  border-radius: 5px;
  margin-right: 10px;
}

.username {
  font-size: 30px;
}

.user-label:after {}

.balance-warp {
  margin-right: 30px;
}

.balance {
  position: relative;
  color: #fff15a;
  padding: 0 6px;
  white-space: nowrap;
  border-radius: 50px;
  background: #1a2134;
  display: flex;
  align-items: center;
  margin-right: 4px;
  gap: 10px;
}

.balance-warp-top {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.balance-warp-bottom {
  position: relative;
  color: #fff;
  padding: 0 8px;
  margin-left: 30px;
  white-space: nowrap;
  margin-top: 10px;
}

.header-content-right {
  display: flex;
  align-items: center;
}

.lang-item {
  position: relative;
  line-height: 1.5;
  span {
    font-size: 24px;
  }
}

.langs-box {
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(0, 0, 0, .8);
  border: 1px solid #3aa2ec;
  border-radius: 5px;
  z-index: 1;
  gap: 10px;
  padding: 10px 0;
}

.lang-select-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  gap: 5px;
  padding: 0 5px;
}

.logo {
  height: 70px;
  object-fit: contain;
  margin-right: 50px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 899px) {
    display: none;
  }

  .md({
    display: block
  });
}

.right-box {
  display: flex;
  /* margin-right: 30px; */
}

.login-button {
  background: radial-gradient(103.07% 103.07% at 50% 22.13%, #0CB6CD 0%, #435B99 50%, #192458 100%);
  border-radius: 4px;
  position: relative;
}

.login-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, #63FFFF 0%, #19262F 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.reg-button {
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #191E43 43.34%, #0E101E 69.28%, #191B2C 98.59%);
  border-radius: 4px;
  position: relative;
}

.reg-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, #B2C6D8 0%, #69FFFF 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.header {
  height: var(--header-height);
}

.login-btn,
.signup-btn {
  background: radial-gradient(103.07% 103.07% at 50% 22.13%, #0cb6cd 0%, #435b99 50%, #192458 100%);
  color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: none;
  position: relative;
  min-width: 57px;
  padding: 10px 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin-left: 8px !important;
  cursor: pointer;
  /* &:before{
    
  } */
}

.login-btn:before {
  content: "";
  width: 40px;
  height: 100%;
  line-height: 1;
  display: block;
  margin-right: 2px;
  background: url("@/assets/images/home/login_btn.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.signup-btn {
  background: transparent;
}

.signup-btn:before {
  content: "";
  width: 40px;
  height: 100%;
  line-height: 1;
  display: block;
  margin-right: 2px;
  background: url("@/assets/images/home/register_btn.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.login-btn:after,
.signup-btn:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.login-btn:after {
  background: linear-gradient(180deg, #5AA1E3 0%, #114164 100%) border-box;
}

.signup-btn:after {
  background: linear-gradient(180deg, #3F699B 0%, #546979 100%) border-box;
}
.cion{
  height:40px;
  transform: translateY(-4px);
}
.text-size{
  font-size: 25px;
}
.menu-icon {
  min-width: 40px;
  height: 40px;
  background: url("@/assets/images/home/menu.png") no-repeat center;
  background-size: contain;
  margin-right: 5px;
}
.mail-btn{
  flex-shrink: 1;
  height: 50px;
  position: relative; 
  padding-right: 4px;
  text-decoration: none;
  &::before{
    content: "";
    width: 40px;
    height: 100%;
    display: block;
    background: url("@/assets/images/home/mail.png") no-repeat center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>