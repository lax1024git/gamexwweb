<template>
  <transition name="menu">
    <div class="menu-box" v-if="menuStore.isShow" :class="{ 'other-top-padding': downloadTipStore.isShow }">
      <el-skeleton animated :loading="gameTypeStore.loading">
        <template #template>
          <div class="top-menu-list">
            <el-skeleton-item variant="image" class="top-menu-item" v-for="i in 6" :key="i" />
          </div>
        </template>
        <template #default>
          <div class="top-menu-list">
            <div></div>
            <div class="top-games">
              <ul>
                <li class="game-item active">ATG電子</li>
                <li class="game-item">ATG戰神賽特</li>
              </ul>
            </div>
            <div class="scroll-content">
              <div classs="horizontal-menu" style="display:flex;gap:10px">
                <div class="menu-item">
                  <img src="@/assets/images/home/Hot_a.png" style="width:15px;height:15px"/>
                  热门
                </div>
                <div class="menu-item disabled">
                  热门
                </div>
                <div class="menu-item disabled">
                  热门
                </div>
              </div>
              <div class="menuList">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_game_menu" :key="item.href" @click="$router.push(item.href)">
                  <img :src="item.icon_url" class="img_size"/>
                  <span>{{$t(item.name)}}</span>
                </div>
              </div>
              <div class="menuList bg">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_navbar" :key="item.href" @click="$router.push(item.href)">
                  <img :src="item.icon_url" class="img_size"/>
                  <span>{{$t(item.name)}}</span>
                </div>
              </div>
              <div class="menuList bg">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_right_menu" :key="item.href" @click="$router.push(item.href)">
                  <img :src="item.icon_url" class="img_size"/>
                  <span>{{$t(item.name)}}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
      
      <!-- <div class="lang-box">
        <el-popover placement="right" trigger="click">
          <div class="lang-select-item" v-for="item in systemStore.systemData?.alllang" :key="item.value"
            @click="lang.setLocale(item.value, true)">
            {{ item.label }}
          </div>
          <template #reference>
            <div class="lang-item">
              <t-svg name="lang" class="lang-item-icon"></t-svg>
              <span>{{ lang.getLocale() }}</span>
            </div>
          </template>
        </el-popover>
        <div class="lang-item" @click="downloadApp"
          v-if="envStore.getDevice() !== DeviceType.iosApp && envStore.getDevice() !== DeviceType.androidApp">
          <t-svg name="download" class="lang-item-icon"></t-svg>
          <span>{{ $t("APP 下载") }}</span>
        </div>
      </div> -->
    </div>
  </transition>
  <Overlay :show="menuStore.isShow" @click="menuStore.changeShow" z-index="100" class="overlay"></Overlay>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { Overlay } from "vant";
import lang from "@/lang";
import { useRouter } from "vue-router";
import { LoopState } from "@/enum/Music";
import isSvgLink from "@/utils/isSvgLink";
import downloadApp from "@/utils/downloadApp";
import { DeviceType } from "@/enum/DeviceType";
import { keysOf } from "element-plus/es/utils";
const {
  menuStore,
  downloadTipStore,
  homeActveStore,
  systemStore,
  gameTypeStore,
  musicStore,
  envStore,
  indexMenuStore
} = useStore();
const $router = useRouter();
const activityList = [
  {
    name: "活动",
    icon: "event.png",
    color: "linear-gradient( 180deg, #CDFFF5 0%, #82E8D3 16%, #4AD6B9 100%)",
    url: "/promotion/activity/all",
  },
  {
    name: "历史性",
    icon: "history.png",
    color: "linear-gradient( 180deg, #F3E0FF 0%, #EDC7FF 16%, #A544D7 100%)",
    url: "/promotion/history",
  },
  {
    name: "贵宾",
    icon: "vip.png",
    color: "linear-gradient( 180deg, #FFF8E0 0%, #FFF0C7 19%, #EEB20E 100%)",
    url: "/promotion/vip",
  },
  {
    name: "代理人",
    icon: "agent.png",
    color: "linear-gradient( 180deg, #FFEFCB 0%, #F8C98A 26%, #EE4545 100%)",
    url: "/agent/shareLink",
  },
];
const linkHideMenu = () => {
  if (systemStore.isPhone) {
    menuStore.changeShow();
  }
};
const toHome = (index: number) => {
  homeActveStore.changeActive(index);
  linkHideMenu();
};
</script>

<style scoped lang="less" src="@/assets/css/components/menu.less"></style>
