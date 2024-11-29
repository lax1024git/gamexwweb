<template>
    <div class="app-container">
        <NavBar title="登录"></NavBar>
        <div class="logo">
            <img :src="systemStore.isPhone ? systemStore.systemDataNew?.site.website_mobile_logo : systemStore.systemDataNew?.site.website_pc_logo"
                class="" />
        </div>
        <div class="register-box">
            <div class="register-box-content">
                <div class="register-title">{{ $t("登录") }}</div>
                <!-- closeIco -->
                <!-- <div @click="emit('closed')" class="closeIco size-100px absolute top-3vh right-2.5vh"></div> -->
                <!-- 分段器 -->
                <el-segmented v-model="active" block size="large"
                    :options="[{ label: '邮箱登录', value: 0 }, { label: '手机登录', value: 1 }]"
                    class="bg-transparent border-base border-white border-4px mt-1 mb-2">
                    <template #default="{ item }">
                        <div class="center">
                            <t-svg :name="item.value ? 'dianhua' : 'yonghu'" class="title-icon"></t-svg>
                            <div class="py-15px text-23px">{{ $t(item.label) }}</div>
                        </div>
                    </template>
                </el-segmented>
                <!-- 表单 -->
                <Tabs v-model:active="active" class="tabs px-4px" :show-header="false" animated>
                    <Tab
                        v-if="systemStore.systemData?.data.phone_bind == PhoneBind.email || systemStore.systemData?.data.phone_bind == PhoneBind.all">
                        <el-form :model="formEmail" :rules="rules" ref="formEmailRef">
                            <el-form-item prop="username">
                                <el-input size="large" v-model="formEmail.username" :placeholder="$t('邮箱')">
                                    <template #prefix>
                                        <t-svg name="user" class="input-icon"></t-svg>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code" v-if="systemStore.systemData?.data.phone_check == OpenState.open">
                                <el-input size="large" :placeholder="$t('验证码')" v-model="formEmail.code">
                                    <template #prefix>
                                        <t-svg name="key" class="input-icon"></t-svg>
                                    </template>
                                    <template #suffix>
                                        <div class="send-code">
                                            <SendCode :email="formEmail.username" scene="verify"
                                                :beforSend="beforSendEmail"></SendCode>
                                        </div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password" v-else>
                                <el-input size="large" v-model="formEmail.password" :placeholder="$t('密码')"
                                    type="password">
                                    <template #prefix>
                                        <t-svg name="pass" class="input-icon"></t-svg>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </Tab>
                    <Tab
                        v-if="systemStore.systemData?.data.phone_bind == PhoneBind.phone || systemStore.systemData?.data.phone_bind == PhoneBind.all">
                        <el-form :model="formPhone" :rules="rules" ref="formPhoneRef">

                            <div class="desc">{{ $t("此字段仅用于注册或登录，不可用于链接！") }}</div>
                            <el-form-item prop="phone">
                                <el-input size="large" :placeholder="$t('输入手机号码')" v-model="formPhone.phone"
                                    inputmode="tel" type="tel">
                                    <template #prefix>
                                        <el-select v-model="formPhone.qh" class="select">
                                            <el-option :label="`+${item.label}`" :value="item.value"
                                                v-for="item in systemStore.systemData?.idc" :key="item.value" />
                                        </el-select>
                                    </template>
                                    >
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code" v-if="systemStore.systemData?.data.phone_check == OpenState.open">
                                <el-input size="large" :placeholder="$t('验证码')" v-model="formPhone.code">
                                    <template #prefix>
                                        <t-svg name="key" class="input-icon"></t-svg>
                                    </template>
                                    <template #suffix>
                                        <div class="send-code">
                                            <SendCode :qh="formPhone.qh" :phone="formPhone.phone" scene="verify"
                                                :beforSend="beforSendPhone">
                                            </SendCode>
                                        </div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password" v-else>
                                <el-input size="large" v-model="formPhone.password" :placeholder="$t('密码')"
                                    type="password">
                                    <template #prefix>
                                        <t-svg name="pass" class="input-icon"></t-svg>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </Tab>
                </Tabs>
                <!-- PWord操作 -->
                <el-checkbox size="large" v-model="checkbox18YearsOld"
                    v-if="systemStore.systemData?.data.phone_check == OpenState.open">
                    <span>{{ $t("我已年满18岁，我已阅读并同意") }}</span>
                    <span class="user-rule" @click.stop.prevent="$openLink('/rule')">{{ $t("《用户协议》") }}</span>
                </el-checkbox>
                <div class="flex items-center justify-between" v-else>
                    <el-checkbox :label="$t('记住密码')" fill="#0080FF" size="large" v-model="checkboxRememberPass" />
                    <div class="cursor-pointer select-none text-white"
                        @click="$openLink('/retrievePassword'); isShow = false">{{
                        $t("忘记密码?") }}</div>
                </div>
            </div>
            <!-- bottom -->
            <div>
                <!-- button -->
                <div class="center flex-col my-30px space-y-30px">
                    <el-button size="large" style="font-size: 14px;letter-spacing: 7px;text-indent: 7px;" @click="login"
                        :loading="loginLoading"
                        class="animate-rubber-band w-75% ring-3 ring-cyan-400/70 bg-gradient-to-t from-cyan-300 to-blue-500 rounded-full">
                        {{ $t("登录") }}
                    </el-button>
                    <el-button size="large" style="font-size: 14px;letter-spacing: 7px;text-indent: 7px;"
                        @click="$router.push('/Register'); isShow = false"
                        class="animate-rubber-band !ml-0 w-75% ring-3 ring-cyan-400/70 bg-gradient-to-t from-sky-400 to-blue-700 rounded-full">
                        {{ $t("注册账户") }}
                    </el-button>
                </div>
                <!-- link -->
                <div class="link-list">
                    <div class="link text-white" @click="$router.push('/msgCenter?current=0'); isShow = false">{{
                        $t("客户服务") }}
                    </div>
                </div>
            </div>
        </div>
    
            <!-- <div class="other-title">
      <span>{{ $t("其他登录方式") }}</span>
    </div>
    <div class="other-box">
      <img :src="$require('google.png')" alt="" class="other-login-item">
      <img :src="$require('facebook.png')" alt="" class="other-login-item">
    </div> -->
</div>
</template>

<script setup lang="ts">
import { Ref, computed, onMounted, ref } from "vue";
// import Popup from "@/components/common/Popup.vue";
import { Popup } from "vant";
import { Tab, Tabs } from "vant";
import { passwordRule, phoneCodeRule, phoneRule, usernameRule } from "@/utils/rule";
import { login_login_api } from "@/api";
import { ResCode } from "@/enum/ResultCode";
import { ElMessage, FormInstance } from "element-plus";
import lang from "@/lang";
import Token from "@/storage/Token";
import { useRouter } from "vue-router";
import SendCode from "@/components/common/SendCode.vue";
import useStore from "@/store";
import { AccountType } from "@/enum/AccountType";
import { PhoneBind } from "@/enum/PhoneBind";
import { OpenState } from "@/enum/OpenState";
import BaseStorage from "@/storage/BaseStorage";
import Encryption from "@/utils/Encryption";
const {systemStore, envStore} = useStore();
const isShow = ref(false);
const $router = useRouter();
const active = ref(0);

const activeType = computed(() => {
  const typeList: AccountType[] = [];
  if (systemStore.systemData?.data.phone_bind == PhoneBind.email || systemStore.systemData?.data.phone_bind == PhoneBind.all) {
    typeList.push(AccountType.email);
  }
  if (systemStore.systemData?.data.phone_bind == PhoneBind.phone || systemStore.systemData?.data.phone_bind == PhoneBind.all) {
    typeList.push(AccountType.phone);
  }
  return typeList[active.value];
});

const formEmailRef: Ref<FormInstance | null> = ref(null);
const formPhoneRef: Ref<FormInstance | null> = ref(null);
const emit = defineEmits(["closed"]);

// 表单
const formEmail = ref({
  username: "",
  password: "",
  code: "",
  account_type: AccountType.email
});

const formPhone = ref({
  password: "",
  qh: systemStore.systemData?.idc_default || "",
  phone: "",
  code: "",
  account_type: AccountType.phone
});


// 表单规则
const rules = {
  username: usernameRule(),
  password: passwordRule(),
  phone: phoneRule(),
  code: phoneCodeRule()
};

// 18岁协议
const checkbox18YearsOld = ref(true);

// 记住密码
type passStorageType = { password: string, username: string, qh?: string, account_type: number }
const passStorage = new BaseStorage<string>("usernameData", true);
const checkboxRememberPass = ref(true);
const rememberPass = (data: passStorageType) => {
  if (checkboxRememberPass.value) {
    passStorage.setData(Encryption.encrypt({
      username: data.username,
      password: data.password,
      account_type: data.account_type,
      qh: data.qh
    }));
  } else {
    passStorage.removeData();
  }

};
const getRememberPass = () => {
  const rememberStr = passStorage.getData();

  if (rememberStr) {
    const rememberPass = Encryption.decrypt<passStorageType>(rememberStr);
    if (rememberPass.account_type === AccountType.email) {
      formEmail.value.username = rememberPass.username;
      formEmail.value.password = rememberPass.password;
    } else if (rememberPass.account_type === AccountType.phone) {
      formPhone.value.phone = rememberPass.username;
      formPhone.value.password = rememberPass.password;
      formPhone.value.qh = rememberPass.qh || formPhone.value.qh;
      active.value = 1;
    }
  }
};


// 发送验证码前的验证
const beforSendPhone = async () => Boolean(await formPhoneRef.value?.validateField(["phone"]));
const beforSendEmail = async () => Boolean(await formEmailRef.value?.validateField(["username"]));

// 执行登录操作
const loginLoading = ref(false);
const login = async () => {
  // 验证数据
  const validate = await (activeType.value == AccountType.email ? formEmailRef : formPhoneRef).value?.validate();
  if (!validate) return;
  if (!checkbox18YearsOld.value) {
    ElMessage({
      message: lang.t("首先查看并同意用户协议"),
      type: "error",
    });
    return;
  }
  loginLoading.value = true;
  // 手机号码注册，表单用户名取电话号码
  const formData = activeType.value == AccountType.email ? formEmail.value : {
    ...formPhone.value,
    username: formPhone.value.phone,
  };
  const res = await login_login_api({
    ...formData,
    device_type: envStore.getDevice()
  });
  loginLoading.value = false;
  if (res.code === ResCode.success) {
    Token.setData(res.data);
    isShow.value = false;
    $router.push("/");
    rememberPass(formData);
    ElMessage({
      message: lang.t("登录成功"),
      type: "success",
    });
  }
};

onMounted(() => {
  getRememberPass();
  isShow.value = true;
});
</script>

<style scoped lang="less" src="@/assets/css/components/login.less"></style>
<style></style>
<style scoped lang="less">
.app-container {
    width: 100%;
    min-height: 100vh;
    background: url("@/assets/images/bg.jpg") no-repeat;
}

.logo {
    padding-top: 2vh;
    text-align: center;
    margin-bottom: 4vh;

    //width: 200px;
    img {
        width: 200px;
        border-radius: 50px;
    }
}

.register-box {
    width: 95%;
    height: 67vh;
    background: url("@/assets/images/login/register_bg.1.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    padding-top: 5vh;

    //margin-top: 13vh;
    &-content {
        width: 80%;
        margin: 0 auto;
        max-height: 54vh;
        overflow: auto;
    }
}

.register-title {
    text-align: center;
    font-size: 36px;
    font-weight: 900;
}
</style>