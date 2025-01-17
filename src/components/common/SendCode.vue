<template>
  <span v-if="loading">{{ $t("发送中") }}</span>
  <span v-else-if="time">{{ time }}s</span>
  <span v-else @click.stop.prevent="sendCode">{{ $t("接收代码") }}</span>
</template>

<script setup lang="ts">
import { sendcode_index_api, sendcode_mail_api } from "@/api/user";
import { ResCode } from "@/enum/ResultCode";
import { ref } from "vue";
import useStore from "@/store";
const time = ref(0);
const content = ref(0)
const {systemStore} = useStore()
const props = defineProps<{
  qh?: string,
  phone?: string,
  email?: string,
  /* scene: "bind" | "verify" | "forget" | "register", */
  beforSend?: () => boolean | Promise<boolean>
}>();
const loading = ref(false);
const sendEmailCode = async () => await sendcode_mail_api({ email: props.email || "" });
const sendPhoneCode = async () => await sendcode_index_api({ qh: props.qh || "", phone: props.phone || "" });
const sendCode = async () => {
  console.log("111111111")
  if (props.beforSend) {
    
    const flag = await props.beforSend();
    console.log(1111111111,flag)
    if (!flag) return;
    if (systemStore.systemData?.data?.mail_phone_ip_num.phone_open == 1) {
      content.value++;
      if (systemStore.systemData?.data?.mail_phone_ip_num.phone_ip_num) {
        if (content.value > systemStore.systemData?.data?.mail_phone_ip_num.phone_ip_num) {
          return;
        }
      }
    } 
  }
  loading.value = true;
  const res = await (props.phone ? sendPhoneCode : sendEmailCode)();
  loading.value = false;
  if (res.code === ResCode.success) {
    time.value =  props.phone ? systemStore.systemData?.data?.mail_phone_ip_num.phone_time : systemStore.systemData?.data?.mail_phone_ip_num.mail_time;;
    const timeId = setInterval(() => {
      time.value--;
      if (time.value === 0) clearInterval(timeId);
    }, 1000);
  }
};
</script>

<style scoped lang="less"></style>