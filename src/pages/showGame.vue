<template>
  <div>

    <div class="backindex" id="draggable" @mousedown="startDrag" @touchstart="startDrag" @mouseup="stopDrag"
      @touchend="stopDrag" @mousemove="drag" @touchmove="drag"
      :style="{ left: position.x + 'px', top: position.y + 'px' }">
      <van-icon class="pointer-events-auto z-999 p-6px rounded-full bg-gradient-to-r bg-#00000066" name="wap-home"
        size="25" @click="back" />
    </div>
    <iframe class="iframe" :src="url" frameborder="0" v-if="url && isLink"></iframe>
    <iframe class="iframe" :srcdoc="url" frameborder="0" v-else-if="url && !isLink"></iframe>
    <t-svg name="error" class="error-img" v-else-if="isError"></t-svg>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated, ref } from "vue";
import { House } from "@element-plus/icons-vue";
import { game_login_game_api } from "@/api/games";
import { game_user_transout_api } from "@/api/user";
import { GamePlatform } from "@/enum/GamePlatform";
import { ResCode } from "@/enum/ResultCode";
import useStore from "@/store";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
const $route = useRoute();
const $router = useRouter();
const { userStore, systemStore } = useStore();
const id = ref("");
const url = ref("");
const isError = ref(false);
const isLink = ref(true);
const getUrl = async () => {
  isError.value = false;
  url.value = "";
  const res = await game_login_game_api({ gid: id.value, platform: systemStore.isPhone ? GamePlatform.phone : GamePlatform.pc });
  if (res.code === ResCode.success) {
    url.value = res.data;
    isLink.value = url.value.startsWith("http");
  } else {
    isError.value = true;
  }
};
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const longPressTimer = ref(null);
const LONG_PRESS_DELAY = 300; // 长按延迟（毫秒）
const clicked = ref(false); // 点击状态
let offset = { x: 0, y: 0 }; // 偏移量
const startDrag = (e) => {
  e.preventDefault(); // 阻止默认行为
  offset.x = (e.clientX || e.touches[0].clientX) - position.value.x; // 计算相对偏移
  offset.y = (e.clientY || e.touches[0].clientY) - position.value.y;
  longPressTimer.value = setTimeout(() => {
    isDragging.value = true; // 设置拖拽状态
    clicked.value = false; // 确保长按不被视为点击
  }, LONG_PRESS_DELAY);
};
const drag = (e) => {
  if (!isDragging.value) return; // 非拖拽状态直接返回
  // 获取新位置
  const newX = (e.clientX || e.touches[0].clientX) - offset.x;
  const newY = (e.clientY || e.touches[0].clientY) - offset.y;
  // 获取浏览器窗口的宽度和高度
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  // 获取拖拽元素的宽度和高度
  const element = document.getElementById('draggable');
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;
  // 确保新位置在可视区域内
  position.value.x = Math.max(0, Math.min(newX, windowWidth - elementWidth));
  position.value.y = Math.max(0, Math.min(newY, windowHeight - elementHeight));
};
const stopDrag = () => {
  clearTimeout(longPressTimer.value); // 清除定时器
  if (!isDragging.value) {
    clicked.value = true; // 如果不是拖拽，则标记为点击
    setTimeout(() => (clicked.value = false), 200); // 短暂显示点击效果
    if ($route.query.isback) {
      $router.back();
      return; 
    }
    $router.push("/");
  }
  isDragging.value = false; // 重置拖拽状态
};
onActivated(() => {

  if ($route.query.id) {
    id.value = $route.query.id;
    getUrl();
  }else{
    $router.push("/");
  }
});

onDeactivated(async () => {
  await userStore.getUserInfo();
  if (userStore.userInfo.third_balance) {
    const res = await game_user_transout_api({ tid: 0 });
    if (res.code === 1) {
      await userStore.getUserInfo();
    }
  }

});
</script>

<style scoped lang="less">
iframe {
  width: 100%;
  height: 100vh;
}

.backindex {
  cursor: pointer;
  position: absolute;
}

.error-img {
  font-size: 500px;
  .position-center();
}
</style>