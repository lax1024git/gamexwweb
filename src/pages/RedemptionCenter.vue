<template>
    <NavBar class="nav-bar" :title="$t('兑换中心')"></NavBar>
    <div class="mb-3 mt-1 hint mx-1">
        <span class="text-[30px] font-500">{{ ($t("请输入兑换代码")) }}</span>
        <div class="flex justify-center mt-1">
            <input type="text" v-model="receive" class="text-white w-full h-[70px] p-1 rounded-[8px] bg-[#133154B2]">
        </div>
        <el-button class="full btn" @click="submit" :loading="btnLoading">{{
            $t("提交")
        }}</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { code_receive } from '@/api/redemptioncenter';
import { ElMessage } from "element-plus";
const receive = ref("")
const btnLoading = ref(false)
const submit = async() => {
    if(!receive.value)return;
    btnLoading.value = true;
    const res = await code_receive({"code":receive.value})
    btnLoading.value = false
    if(res.code == 1){
        ElMessage({
        type: "success",
        message: res.msg,
      });
    }

}
</script>

<style lang="less" scoped>
.hint {
    min-height: 200px;
    color: #84c5e9;
    border: 1px solid #84c5e9;
    padding: 16px;
    border-radius: 8px;
    background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.7) 0%, rgba(19, 49, 84, 0.7) 100%);
    z-index: 0;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0);
        background: linear-gradient(180deg, #b2c6d8 0%, #69ffff 100%) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 1;
    }
}
.btn{
  border-style: none;
  margin: 20px auto !important;
  color: #68affb;
  background: url("@/assets/images/submitBtn.png") no-repeat center;
  background-size: contain;
  box-shadow: none;
  height: 104px;
  margin: 0;
  width: 100%;
  font-size: 24px;
}
::v-deep(.el-button.is-loading:before){
  background-color: transparent !important;
}
</style>