import lang from "@/lang";
import { ref } from "vue";
export const passwordRule = () => [
  {
    required: true,
    message: lang.t("密码6-20位字符"),
    trigger: "change",
    max: 20,
    min: 6,
  },
];

export const passwordAgainRule = (getPassword: () => string) => [
  {
    required: true,
    message: lang.t("密码6-20位字符"),
    trigger: "change",
    max: 20,
    min: 6,
  },
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (getPassword() !== value) {
        callback(new Error(lang.t("两次密码输入不一致")));
      }
      callback();
    },
    trigger: "change",
  },
];

export const usernameRule = () => [
  {
    required: true,
    message: lang.t("请输入邮箱"),
    trigger: "change",
  },
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error(lang.t("邮箱格式不正确")));
      }
      callback();
    },
    trigger: "change",
  },
];

export const phoneRule = (num?, phone_num?) => [
  {
    required: true,
    message: lang.t("请输入手机号码"),
    trigger: "change",
  },
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (!/^\d+$/.test(value)) {
        callback(new Error(lang.t("手机号码格式不正确")));
        return;
      }
      let numbers = ref([]);
      let pLength = ref([]);
      if(num && phone_num){
        numbers.value = num.match(/\d+/g).map(Number);
        pLength.value = phone_num.match(/\d+/g).map(Number);
      }
      
      if (numbers.value.length > 0 && !numbers.value.includes(Number(value.charAt(0)))) {
        callback(new Error(lang.t("手机号码格式不正确")));
        return; // 错误后直接返回，避免后续执行
      }
      if (pLength.value.length > 0 && !pLength.value.includes(value.length)) {
        callback(new Error(lang.t("手机号码格式不正确")));
        return; // 错误后直接返回，避免后续执行
      }
      callback();
    },
    trigger: "change",
  },
];

export const usernameAndPhoneRule = () => [
  {
    required: true,
    message: lang.t("请输入用户名"),
    trigger: "change",
  },
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (!/^\d+$/.test(value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error(lang.t("用户名格式不正确")));
      }
      callback();
    },
    trigger: "change",
  },
];

export const phoneCodeRule = () => [
  {
    required: true,
    message: lang.t("请输入验证码"),
    trigger: "change",
  },
];

export const promotionCode = () => [
  {
    required: true,
    message: lang.t("请输入邀请码"),
    trigger: "change",
  },
];
export const payPasswordRule = () => [
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (!/^\d{6}$/.test(value)) {
        callback(new Error(lang.t("密码6位数字")));
      }
      callback();
    },
    trigger: "change",
  },
];

export const payPasswordAgainRule = (getPassword: () => string) => [
  {
    validator: (
      _rule: unknown,
      value: string,
      callback: (err?: Error) => void
    ) => {
      if (!/^\d{6}$/.test(value)) {
        callback(new Error(lang.t("密码6位数字")));
      }
      if (getPassword() !== value) {
        callback(new Error(lang.t("两次密码输入不一致")));
      }
      callback();
    },
    trigger: "change",
  },
];
