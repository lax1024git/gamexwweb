<template>
  <div>
    <NavBar class="nav-bar" :title="$t('VIP')" :is-back="false"></NavBar>
    <div class="vip-content">
      <div class="vip-list-wrap">
        <Swipe class="my-swipe" indicator-color="white" ref="swiper">
          <Swipe-item v-for="(item,index) in 6" :key="index">
            <div class="swiper-item">
              <div class="status-box"></div>
              <div class="text-wrap">
                <h3 class="vip-1 vip-text">
                  <img :src="getImgUrl('./../assets/images/vip/icon/'+(index+1)+'.png')">
                  {{ "VIP-" + (item) }}
                </h3>
                <div class="text-box-wrap">
                  <div class="text-box"><p>貢獻值</p> <h4>$&nbsp;-</h4>
                  </div>
                  <div class="text-box"><p>有效投注</p> <h4>$&nbsp;-</h4>
                  </div>
                </div>
              </div>
              <div class="img-box"><img :src="getImgUrl('./../assets/images/vip/tiger/'+(index+1)+'_lock.png')"></div>
            </div>
          </Swipe-item>
        </Swipe>
        <div class="swiper-button-prev" @click="swiperGo('left')"></div>
        <div class="swiper-button-next" @click="swiperGo('right')"></div>
      </div>

      <div class="vip-member-info">
        <div class="welcome-text">
          您好，歡迎回來！
        </div>
        <div class="member-info">
          <div class="d-flex">
            <span class="vip-level">VIP&nbsp;0</span>
            <span class="account">@xwxwxw123</span>
          </div>
<!--          <div>&nbsp;本次登入時間&nbsp;<span class="login-time">2024/09/19 12:12:41 PM</span></div>-->
        </div>
        <div class="progress-wrap">
          <div class="bar-box">
            <p class="d-flex progress-top">貢獻值<span class="ml-auto">0 / 100000</span></p>
            <div class="progressbar"><span class="progressbar-text">0 %</span>
              <div class="bar color2" style="width: 20%;"><span></span></div>
            </div>
          </div>
          <div class="bar-box">
            <p class="d-flex progress-top">有效投注<span class="ml-auto">0 / 2500000</span></p>
            <div class="progressbar"><span class="progressbar-text">0 %</span>
              <div class="bar color5" style="width: 20%;"><span></span></div>
            </div>
          </div>
        </div>
        <div class="bonus-wrap">
          <div class="bonus-item">
            <div class="bonus-img"><span>晉級禮金</span> <img
                src="@/assets/images/vip/dailyBonus.png"></div>
          </div> <!---->
          <div class="bonus-item">
            <div class="bonus-img"><span>每周福利</span> <img
                src="@/assets/images/vip/monthlySalary.png"></div>
          </div>
        </div>
        <div class="bonus-wrap">
          <div class="bonus-item">
            <button type="button" disabled="disabled" class="button btn-1">
              領取禮金
            </button>
          </div> <!---->
          <div class="bonus-item">
            <button type="button" disabled="disabled" class="button btn-2">
              領取周俸
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import {Swipe, SwipeItem} from "vant";
import {ref} from "vue";

let swiper = ref(null);
const swiperGo = (val) => {
  if (val === "left") {
    swiper.value.prev();
  } else {
    swiper.value.next();
  }
};
const getImgUrl = (url) => {
  return new URL(url, import.meta.url).href;
};
</script>

<style scoped lang="less">
.vip-content {
  padding: 8px;
}

.vip-list-wrap {
  position: relative;
  border-radius: 8px;
  padding: 8px 18px;
  background: linear-gradient(180deg, #191D43 47.77%, #191B2C 100%);
  margin-bottom: 8px;
  box-sizing: border-box;
}

.vip-list-wrap {
  border-radius: 8px;
  background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.50) 0%, rgba(19, 49, 84, 0.50) 100%);
}

.vip-list-wrap:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, #B2C6D8 0%, #69FFFF 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.swiper-item {
  position: relative;
  display: flex;
  height: 49.7vw;
  background: url("@/assets/images/vip/top2.1.png") no-repeat center;
  background-size: contain;
  overflow: hidden;
  width: 100%;
}

.status-box {
  position: absolute;
  top: 5px;
  right: 3%;
  height: 80px;
  width: 80px;
  background: url("@/assets/images/vip/lock.png") no-repeat center;
  background-size: contain;
}

.swiper-button-prev {
  position: absolute;
  font-size: 0;
  width: 46px;
  height: 48px;
  left: 10px;
  background: url("@/assets/images/vip/arrow_left.png") no-repeat center;
  top: 45%;
}

.swiper-button-next {
  position: absolute;
  font-size: 0;
  width: 46px;
  height: 48px;
  right: 10px;
  background: url("@/assets/images/vip/arrow_right.png") no-repeat center;
  top: 45%;
}

.text-wrap {
  flex: 0 0 50%;
  padding: 60px 0 0 80px;
  white-space: normal !important;
}

.vip-text {
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 8px;
  margin-bottom: 30px;
  color: var(--dark-primary-title, #FFF);
  text-align: center;
  text-shadow: 0px 2px 0px #0157b4;
  -webkit-text-stroke-width: .5px;
  -webkit-text-stroke-color: #59bcff;
  font-family: "Saira Semi Condensed", sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: .96px;
  text-transform: uppercase;
  height: 36px;
}

.swiper-item .vip-text img {
  max-height: 200%;
  max-width: 200%;
  margin: 0;
}

.swiper-item .text-box-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.swiper-item .text-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.swiper-item .text-box p {
  color: var(--dark-primary-title, #FFF);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
}

.swiper-item .text-box h4 {
  border-radius: 4px;
  background: rgba(0, 0, 0, .4);
  backdrop-filter: blur(1.772277236px);
  color: var(--dark-primary-title, #FFF);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Saira Semi Condensed", sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  display: flex;
  height: 50px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
}

.swiper-item .img-box {
  display: flex;
  flex: 1;
  padding-bottom: 5px;
  align-items: flex-end;
  justify-content: center;
  margin-top: auto;
  height: 85%;
  margin-bottom: 4px;
  overflow: hidden;
  transform: scale(2);
  transform-origin: center 30px;
}

.swiper-item .img-box img {
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
}
.vip-member-info {
  display: flex;
  padding: 24px 16px;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #343c56;
  background: #191b2e;
  margin-bottom: 16px;
  margin-top: 16px;
}
.vip-member-info {
  position: relative;
  border-radius: 8px;
  background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.50) 0%, rgba(19, 49, 84, 0.50) 100%);
}
.vip-member-info:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, #B2C6D8 0%, #69FFFF 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.vip-member-info > * {
  position: relative;
  z-index: 1;
}
.vip-member-info .welcome-text {
  color: var(--dark-primary-title, #FFF);
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}
.vip-member-info .member-info {
  display: flex;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #121423;
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #191E43 43.34%, #0E101E 69.28%, #191B2C 98.59%);
  color: var(--color-03-Light, #CCD1FF);
  font-size: 14px;
}
.vip-member-info .progress-wrap {
  display: flex;
  padding: 32px 16px;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  color: #ccd1ff;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #121423;
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #191E43 43.34%, #0E101E 69.28%, #191B2C 98.59%);
}
.vip-member-info .member-info, .vip-member-info .progress-wrap {
  color: #84C5E9;
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #202D4D 21%, #0C1429 100%);
}
.d-flex {
  display: flex !important;
}
.vip-member-info .member-info .vip-level {
  padding: 0 8px;
  line-height: 40px;
  color: #191d43;
  font-size: 24px;
  margin-right: 8px;
  font-style: italic;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  border-radius: 4px;
  border: .2px solid #57e8f2;
  background: linear-gradient(124deg, #91BCF8 -19.76%, #3A83E9 -1.3%, #4D95FF 28.8%, #FFF 72.72%);
  box-shadow: -0.304px -0.304px .507px 0px rgba(129, 195, 255, .8) inset;
  font-variant: small-caps;
  letter-spacing: .48px;
}
.vip-member-info .member-info .account {
  color: #fff;
  font-size: 24px;
}
.vip-member-info .progress-wrap .progress-top {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
}

.vip-member-info .progress-wrap .progress-top span {
  color: #b7beff;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
}
.vip-member-info .progress-wrap .progress-top span {
  color: #84C5E9;
}
.ml-auto {
  margin-left: auto !important;
}
.vip-member-info .progress-wrap .progressbar {
  border-radius: 32px;
}
.progressbar {
  position: relative;
  display: block;
  width: 100%;
  height: 12px;
  background: #07090c;
}
.progressbar .progressbar-text {
  display: none;
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  font-size: 14px;
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 2;
  color: #fff;
}
.bar {
  position: absolute;
  display: block;
  width: 0px;
  height: 12px;
  top: 1px;
  left: 1px;
  overflow: hidden;
  border-radius: 32px;
}
.vip-member-info .progress-wrap .bar {
  top: 0;
}

.bar.color2 {
  background: linear-gradient(90deg, #DF18FF 2.74%, #ED7BFF 51.37%, #F9D2FF 100%);
}
.bar.color5 {
  background: linear-gradient(90deg, #FFDA18 2.74%, #FF7B7B 82.53%, #FFFDFF 100%);
}
.vip-member-info .bonus-wrap {
  display: flex;
  gap: 32px;
}
.vip-member-info .bonus-wrap .bonus-item {
  flex: 1;
  display: flex;
  gap: 32px;
  justify-content: center;
}
.vip-member-info .bonus-wrap .bonus-item .bonus-img {
  display: flex;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  background: radial-gradient(87.23% 87.23% at 50% 50%, #2C2266 35%, #042853 100%);
}
.vip-member-info .bonus-wrap .bonus-item .bonus-img {
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #202D4D 21%, #0C1429 100%);
}
.vip-member-info .bonus-wrap .bonus-item .bonus-img span {
  color: var(--color-03-Light, #CCD1FF);
  text-align: center;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  line-height: 28px;
  text-transform: uppercase;
}
.vip-member-info .bonus-wrap .bonus-item .bonus-img span {
  color: #84C5E9;
}
.vip-member-info .bonus-wrap .bonus-item .bonus-img img {
  max-width: 100%;
}
.vip-member-info .bonus-wrap .bonus-item .button {
  border-style: none;
  color: #fff;
  background: url("@/assets/images/vip/btn.png") no-repeat center;
  background-size: contain;
  box-shadow: none;
  height: 104px;
  margin: 0;
  width: 100%;
  font-size: 24px;
}
.vip-member-info .bonus-wrap .bonus-item .button {
  color: #1971A2;
  font-weight: 700;
}
.vip-member-info .bonus-wrap .bonus-item .button.btn-2 {
  background-image: url("@/assets/images/vip/btn2.1.png");
  color: #fff;
}
.vip-member-info .bonus-wrap .bonus-item .button[disabled=disabled] {
  opacity: .5;
}
</style>