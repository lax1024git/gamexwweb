<template>
    <div>
        <div class="backindex" @click="back">
            <van-icon class="pointer-events-auto z-999 p-6px rounded-full bg-gradient-to-r bg-#00000066" name="wap-home"
        size="25" @click="backIndex" />
        </div>
        <iframe class="iframe" :src="url" frameborder="0" @load="iframeLoaded" v-if="url && isLink"></iframe>
        <iframe class="iframe" :srcdoc="url" frameborder="0" @load="iframeLoaded" v-else-if="url && !isLink"></iframe>
        <t-svg name="error" class="error-img" v-else-if="isError"></t-svg>
    </div>
</template>

<script setup>
import { onActivated, onDeactivated, ref } from "vue";
import { House } from "@element-plus/icons-vue";
import { game_login_game_api} from "@/api/games";
import { game_user_transout_api } from "@/api/user";
import { GamePlatform } from "@/enum/GamePlatform";
import { ResCode } from "@/enum/ResultCode";
import useStore from "@/store";
import { useRoute,useRouter } from "vue-router";
const $route = useRoute();
const $router = useRouter();
const {userStore,systemStore} = useStore();
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
onActivated(()=>{
  if($route.query.id){
    id.value = $route.query.id;
    getUrl();
  }
});
const iframeLoaded = () => {
  console.log("加载完成");
};
const back = () => {
  if(isError.value){
    $router.back();
    return;
  }
  $router.push("/");
};
onDeactivated(async ()=>{
  await userStore.getUserInfo();
  if(userStore.userInfo.third_balance){
    await game_user_transout_api({tid:0});
  }

});
</script>

<style scoped lang="less">
iframe {
    width: 100%;
    height: 100vh;
}

.backindex {
    position: fixed;
}
.error-img {
  font-size: 500px;
  .position-center();
}
</style>