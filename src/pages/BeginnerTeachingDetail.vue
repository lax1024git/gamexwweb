<template>
    <NavBar class="nav-bar" :title="$t('教学详情')"></NavBar>

    <div class="mb-1 mt-1 hint mx-1">
        <div v-html="content?.news_content"></div>
    </div>
</template>

<script setup>
import { interlocution_detail } from '@/api/help';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const content = ref({})
const $route = useRoute()
const getdetail = async(id) => {
    const res = await interlocution_detail({"news_id":id})
    if(res.code === 1){
        content.value = res.data
    }
    
}
onMounted(()=>{
    getdetail($route.params.id)
})
</script>

<style lang="less" scoped>
.hint {
    /* color: #84c5e9; */
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

.empty {
    height: 500px;
}
</style>