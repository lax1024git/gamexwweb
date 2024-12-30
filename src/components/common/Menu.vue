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
                <li class="game-item active" @click="jumpUrl('/home?gameId=2')">ATG電子</li>
                <li class="game-item">战神赛特</li>
              </ul>
            </div>
            <div class="scroll-content">
              <div classs="horizontal-menu" style="display:flex;gap:10px">
                <div class="menu-item" @click="jumpUrl(indexMenuStore.menuData?.xw_mobile_game_menu[0].href)">
                  <img :src="indexMenuStore.menuData?.xw_mobile_game_menu[0].icon_url" style="width:15px;height:15px"/>
                 {{$t(`${indexMenuStore.menuData?.xw_mobile_game_menu[0].name}`)}}
                </div>
                <div class="menu-item disabled">
                  {{$t("我的最爱")}}
                </div>
                <div class="menu-item" @click="jumpUrl('/history')">
                  {{$t("历史记录")}}
                </div>
              </div>
              <div class="menuList">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_game_menu.slice(1)" :key="item.href" @click="jumpUrl(item.href)">
                  <img :src="item.icon_url" class="img_size"/>
                  <span>{{$t(item.name)}}</span>
                </div>
              </div>
              <div class="menuList bg">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_navbar" :key="item.href" @click="jumpUrl(item.href)">
                  <img :src="item.icon_url" class="img_size"/>
                  <span>{{$t(item.name)}}</span>
                </div>
              </div>
              <div class="menuList bg">
                <div class="menu-item1" v-for="item in indexMenuStore.menuData?.xw_mobile_right_menu" :key="item.href" @click="jumpUrl(item.href)">
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
import { useRouter } from "vue-router";
const {
  menuStore,
  downloadTipStore,
  homeActveStore,
  systemStore,
  gameTypeStore,
  indexMenuStore
} = useStore();
const $router = useRouter();

const linkHideMenu = () => {
  if (systemStore.isPhone) {
    menuStore.changeShow();
  }
};
const toHome = (index: number) => {
  homeActveStore.changeActive(index);
  linkHideMenu();
};

const jumpUrl = (url) => {
  $router.push(url);
  menuStore.changeShow();
};
</script>

<style scoped lang="less" src="@/assets/css/components/menu.less"></style>
