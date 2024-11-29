<template>
  <div class="more-box" v-if="!props.loading" @click="loadmore">
    <!-- <span>{{ $t("显示42款游戏中的10款") }}</span> -->
     <div v-if="isMore">
      <span class="more">{{ $t("加载更多") }}</span>
      <t-svg name="bottom"></t-svg>
     </div>
     
  </div>
  <div class="more-box" v-else>
    <div class="loader">
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue";
const emit = defineEmits(["loadmore","isMore"]);
const loadmore = () => {
  emit("loadmore");
};
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  isMore:{
    type:Boolean,
    default:false
  }
});
</script>

<style scoped lang="less" src="@/assets/css/components/more.less"></style>