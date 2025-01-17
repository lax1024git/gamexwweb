<template>
    <div class="custom-float">
        <span :class="['main-icon',activeIndex ? 'select_img' : '']" @click="activeIndex = !activeIndex"></span>
        <div class="custom-float-content" v-show="activeIndex" >
            <div class="custom-float-item" v-for="item in indexMenuStore.menuData?.xw_mobile_right_menu" :key="item.href" @click="$openLink(item.href)">
                <div class="toggle-icon" :style="{'--img':`url(${item.icon_url})`}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useStore from "@/store";
import { ref } from "vue";
const {indexMenuStore} = useStore();
const activeIndex = ref(false);
</script>

<style lang="less" scoped>
.custom-float {
    position: fixed;
    right: 10px;
    top: 40vh;
    z-index: 7;
    @media (min-width:427px) {
        top: 20vh;
    }
    @media (min-width:573px) {
        top: 12vh;
        
    }
}

.main-icon {
    display: block;
    width: 100px;
    height: 100px;
    /* left: 315px; */
    margin-bottom: 50px;
    background: url(@/assets/images/tabbar/float_collapse.png) no-repeat center;
    background-size: contain;
    transition: background-image .5s ease;
}
.select_img{
    background: url(@/assets/images/tabbar/float_expand.png) no-repeat center;
    background-size: contain;   
}
.custom-float-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-items: center;
    justify-self: center;
}

.custom-float-item {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    background-size: contain;
    transition: top .3s ease, opacity .3s ease, background .3s ease;
    /* pointer-events: none; */ //禁止点击
}
.toggle-icon {
    width: 60px;
    height: 60px;
    opacity: 1;
    background: no-repeat center;
    background-size: cover;
    transition: all .3s ease;
    transform: scale(2);
    background-image: var(--img);
    transition: all 0.5s ease;
}
</style>