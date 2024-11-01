<template>
  <div>
    <NavBar class="nav-bar" :title="$t('客戶服務')" :isBack="false"></NavBar>
    <div class="page-content">
      <img src="@/assets/images/servise_banner.png">
      <div class="services-link" @click="$openLink(indexMenuStore.menuData?.wg_service[0]?.children?.[0].href || '')">
        <div class="icon"><img src="@/assets/images/Line.png" width="45"></div>
        <div class="text">
          <span>{{ $t('LINE 客服') }}</span>
          <b>{{$t('LINE 客戶服務')}}</b>
        </div>
        <div class="join">{{$t('JOIN NOW')}}</div>
      </div>
      <div class="card-box">
        <Tabs v-model:active="active" :shrink="true" class="service-tabs" animated>
          <Tab v-for="(tab, index) in indexMenuStore.menuData?.wg_service" :key="index">
            <template #title>
              <div class="title-box">
                <img :src="tab.icon_url" class="title-icon">
                <span>{{ tab.name }}</span>
              </div>
            </template>
            <div class="service-list">
              <div class="service-item" v-for="(item, index) in tab.children" :key="index">
                <img :src="item.icon_url" class="service-item-icon" />
                <div class="service-item-content">
                  <div class="item-name">{{ tab.name }}</div>
                  <div class="item-desc">{{ item.name }}</div>
                </div>
                <el-button type="primary" @click="$openLink(item.href)">{{ $t("现在联系") }}</el-button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import { ref } from "vue";
import { Tab, Tabs } from "vant";
import useStore from "@/store";
const active = ref(0);
const { indexMenuStore } = useStore();

</script>

<style scoped lang="less" src="@/assets/css/pages/msgCenter/support.less"></style>
<style scoped lang="less">
.page-content {
  img {
    max-width: 100%;
  }
}

.page-content .services-link {
  display: flex;
  align-items: center;
  padding: 0 13px;
  height: 19vw;
  background: url("@/assets/images/servise_input.png") no-repeat center;
  background-size: contain;
}

.page-content .services-link .icon {
  flex: 0 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-content .services-link .text {
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 26px;
  white-space: nowrap;
}

.page-content .services-link .join {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 26px;
  width: 188px;
  height: 74px;
  margin: 0 20px 0 auto;
  background: url("@/assets/images/login/btn.png") no-repeat center;
  background-size: contain;
}

.page-content .services-link .text b {
  color: #54738b;
  font-weight: normal;
  font-size: 20px;
}
</style>