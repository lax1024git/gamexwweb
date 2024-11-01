<template>
  <div class="float-box">
    <div class="menu-item-box" v-for="childList, index in list" :key="index">
      <swiper-container class="menu-item-box" :loop="true" spaceBetween="10" :autoplay="{ delay: 2500 }" ref="swiper">
        <swiper-slide v-for="item, i in childList" :key="i">
          <div class="menu-item" @click="$openLink(item.url)">
            <img :src="item.img" class="menu-item-cover">
            <t-svg name="close2" class="close-icon" @click.stop="remove(index, i)"></t-svg>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { require } from "@/utils/$require";
import Swiper from "swiper";
import { Ref, ref, watch } from "vue";
const { indexMenuStore } = useStore();

const swiper: Ref<(HTMLElement & { swiper: Swiper })[] | null> = ref(null);

const list = ref([
  [
    { img: require("home-float-icon-tel.gif"), url: "", id: "service" }
  ],
  [
    { img: require("home-float-icon-share.gif"), url: "/activityShare", id: "share" },
    // { img: require("home-float-icon-turntable.gif"), url: "/turntable", id: "turntable" },
  ]
]);

watch(() => indexMenuStore.menuData, (newData) => {
  if (!newData?.wg_service || newData.wg_service.length === 0) return;
  const serviceItem = newData.wg_service[0];
  if (!serviceItem.children || serviceItem.children.length === 0) return;
  const href = serviceItem.children[0].href;
  if (href) {
    list.value.forEach(list => {
      list.forEach(item => {
        if (item.id === "service") {
          item.url = href;
        }
      });
    });
  }
}, { immediate: true });


const remove = (index: number, subIndex: number) => {
  list.value[index].splice(subIndex, 1);
  list.value = list.value.filter(item => item.length);
  swiper.value?.[index]?.swiper.removeSlide(1);
};
</script>

<style scoped lang="less" src="@/assets/css/pages/index/floatBox.less"></style>