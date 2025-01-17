<template>
  <div class="page-box">
    <NavBar :title="$t('找回密码')" class="nav-bar"></NavBar>
    <div class="content-box ">
      <div class="change-password-main">
        <Tabs v-model:active="active" class="tabs" animated>
      <Tab v-if="systemStore.systemData?.data.phone_bind == PhoneBind.email || systemStore.systemData?.data.phone_bind == PhoneBind.all">
        <template #title>
          <div class="tab-title">
            <t-svg name="yonghu" class="title-icon"></t-svg>
            <span>{{ $t("邮箱") }}</span>
          </div>
        </template>
        <el-form :model="formEmail" :rules="rules" ref="formEmailRef">
          <el-form-item prop="mail">
            <el-input size="large" v-model="formEmail.mail" :placeholder="$t('邮箱')">
              <template #prefix>
                <t-svg name="user" class="input-icon"></t-svg>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="mail_code">
            <el-input size="large" v-model="formEmail.mail_code" :placeholder="$t('验证码')">
              <template #prefix>
                <t-svg name="key" class="input-icon"></t-svg>
              </template>
              <template #suffix>
                <div class="send-code">
                  <SendCode :email="formEmail.mail" scene="register" :beforSend="beforSendEmail"></SendCode>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" v-model="formEmail.password" :placeholder="$t('密码')" type="password">
              <template #prefix>
                <t-svg name="pass" class="input-icon"></t-svg>
              </template>
            </el-input>
          </el-form-item>
          <PassLevel :password="formEmail.password"></PassLevel>
          <el-form-item prop="passwordAgain">
            <el-input size="large" v-model="formEmail.passwordAgain" :placeholder="$t('再次确认密码，与密码相同')" type="password">
              <template #prefix>
                <t-svg name="pass" class="input-icon"></t-svg>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

      </Tab>
      <Tab v-if="systemStore.systemData?.data.phone_bind == PhoneBind.phone || systemStore.systemData?.data.phone_bind == PhoneBind.all">
        <template #title>
          <div class="tab-title">
            <t-svg name="dianhua" class="title-icon"></t-svg>
            <span>{{ $t("手机") }}</span>
          </div>
        </template>
        <el-form :model="formPhone" :rules="rules" ref="formPhoneRef">
          <el-form-item prop="phone">
            <el-input size="large" v-model="formPhone.phone" :placeholder="$t('输入手机号码')" inputmode="tel" type="tel">
              <template #prefix>
                <el-select v-model="formPhone.qh" class="select">
                  <el-option :label="`+${item.label}`" :value="item.value" v-for="item in systemStore.systemData?.idc"
                    :key="item.value" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input size="large" v-model="formPhone.code" :placeholder="$t('验证码')">
              <template #prefix>
                <t-svg name="key" class="input-icon"></t-svg>
              </template>
              <template #suffix>
                <div class="send-code">
                  <SendCode :qh="formPhone.qh" :phone="formPhone.phone" scene="register" :beforSend="beforSendPhone">
                  </SendCode>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" v-model="formPhone.password" :placeholder="$t('密码')" type="password">
              <template #prefix>
                <t-svg name="pass" class="input-icon"></t-svg>
              </template>
            </el-input>
          </el-form-item>
          <PassLevel :password="formPhone.password"></PassLevel>
          <el-form-item prop="passwordAgain">
            <el-input size="large" v-model="formPhone.passwordAgain" :placeholder="$t('再次确认密码，与密码相同')" type="password">
              <template #prefix>
                <t-svg name="pass" class="input-icon"></t-svg>
              </template>
            </el-input>
          </el-form-item>

        </el-form>
      </Tab>
    </Tabs>
    <el-button type="primary" size="large" class="full login-btn" @click="register" :loading="bthLoading">{{ $t("提交")
      }}</el-button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import Popup from "@/components/common/Popup.vue";
import PassLevel from "./PassLevel.vue";
import { Tab, Tabs } from "vant";
import useStore from "@/store";
import SendCode from "./SendCode.vue";
import { passwordAgainRule, passwordRule, phoneCodeRule, phoneRule, usernameRule } from "@/utils/rule";
import { ElMessage, FormInstance } from "element-plus";
import lang from "@/lang";
import { PhoneBind } from "@/enum/PhoneBind";
import { ResCode } from "@/enum/ResultCode";
import { forget_mail_api, forget_phone_pwd } from "@/api/user";
import { openLink } from "@/utils/openLink";
const isShow = ref(false);
const active = ref(0);
const { systemStore } = useStore();
const emit = defineEmits(["closed"]);
onMounted(() => {
  isShow.value = true;
});
const formEmailRef: Ref<FormInstance | null> = ref(null);
const formPhoneRef: Ref<FormInstance | null> = ref(null);


const formEmail = ref({
  mail: "",
  password: "",
  passwordAgain: "",
  mail_code: "",
});

const formPhone = ref({
  password: "",
  passwordAgain: "",
  qh: systemStore.systemData?.idc_default || "",
  phone: "",
  code: "",
});

// 表单规则
const rules = {
  mail: usernameRule(),
  password: passwordRule(),
  passwordAgain: passwordAgainRule(() => active.value == 1 ? formEmail.value.password : formPhone.value.password),
  phoneUsername: phoneRule(),
  phone: phoneRule(systemStore.systemData?.mail_phone_reg_rule?.phone_rule,systemStore.systemData?.mail_phone_reg_rule?.phone_num_rule),
  code: phoneCodeRule(),
  mail_code: phoneCodeRule()
};

// 发送验证码前的验证
const beforSendPhone = async () => {
    try {
        const result = await formPhoneRef.value?.validateField(["phone"]);
        // 假设 result 包含验证通过的结果，您可以进一步处理
        return result
    } catch (error) {
        console.error("Error validating phone field:", error);
         
    }
}
const beforSendEmail = async () =>await formEmailRef.value?.validateField(["username"])



// 提交
const bthLoading = ref(false);
const register = async () => {
  // 验证数据
  const validate = await (active.value == 1 ? formEmailRef : formPhoneRef).value?.validateField().then(()=>{
    return true
  }).catch(()=>{
    return false
  });
  if (!validate) return;


  bthLoading.value = true;

  const res = await (active.value === 1 ? forget_mail_api(formEmail.value) : forget_phone_pwd(formPhone.value));
  bthLoading.value = false;
  if (res.code === ResCode.success) {
    ElMessage({
      message: lang.t("提交成功，请重新登录"),
      type: "success",
    });
    isShow.value = false;
    openLink("/login");
  }
};

</script>

<style scoped lang="less" src="@/assets/css/pages/loginPass.less"></style>