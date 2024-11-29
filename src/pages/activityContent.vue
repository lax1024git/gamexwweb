<template>
    <div class="activityContent">
        <NavBar :title="$t('活动详情')" class="nav-bar"></NavBar>
        <div class="content">
            <!-- <div class="promotion-module-action">
                <el-button class="apply-btn" :loading="false">
                    <span class="btn-text">
                        此優惠目前無法申請(未符合資格)
                    </span>
                </el-button>
            </div> -->
            <div class="promotion-content">
                <div v-html="contentItem.c_detail"></div>
            </div>
        </div>
        <more :loading="loading" :isMore="false"></more>
    </div>
</template>

<script setup>
import { onActivated, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { action_detail_api} from "@/api/action";
const $route = useRoute();
let contentItem = ref({});
const loading = ref(false);
onActivated(async ()=>{
  loading.value = true;
  contentItem.value = {};
  let id = $route.query.id;
  const res = await action_detail_api({action_id:id});
  if(res.code === 1){
    contentItem.value = res.data;
  }
  loading.value = false;
});
</script>

<style lang="less" scoped>
.activityContent {
    padding-bottom: 200px;
}

.content {
    display: flex;
    flex-direction: column-reverse;
    padding: 4%;
    gap: 40px;
    white-space: normol !important;
}

.promotion-module-action {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: normal !important;
}

.apply-btn {
    white-space: normal !important;
    -webkit-appearance: button;
    will-change: box-shadow;
    /*  background-color: #f5f5f5; */
    border: none !important;
    min-width: 64px;
    min-height: 40px;
    width: 100%;
    background: url("@/assets/images/mine/SubmitBtn.png") no-repeat center;
    background-size: contain;
    box-shadow: none;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    text-transform: uppercase;
    padding: 0 20px;
    height: 80px;
    color: #1971a2;
    text-align: center;
}

.btn-text {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
    transition: inherit;
    transition-property: opacity;
    word-break: break-word !important;
    flex: unset !important;
}

::v-deep .el-button.is-loading:before {
    background: transparent !important;
}

.promotion-content {
    word-break: break-all;
    overflow: auto;

    white-space: normal !important;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>