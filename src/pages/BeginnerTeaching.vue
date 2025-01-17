<template>
    <NavBar class="nav-bar" :title="$t('新手教学')"></NavBar>
    <tempalte v-if="dataList.length">
        <div class="mb-1 mt-1 hint mx-1" v-for="item in dataList" @click="jumpdetail(item?.id)">
            <div class="text-[25px]">{{ item.news_title }}</div>
        </div>
    </tempalte>
    <Empty class="empty" v-if="dataList.length === 0 && !loading"></Empty>
    <More @loadmore="loadmore" :loading="loading" :is-more="nextpage"></More>
</template>

<script setup>
import { interlocution} from '@/api/help';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
const $router = useRouter();
const loading = ref(false)
const dataList = ref([])
const nextpage = ref(false)
const pageInof = reactive({
    page: 1,
    limit: 10,
})

const loadmore = () => {
    pageInof.page++;
    getdata()
}
const jumpdetail = (id) => {
    $router.push(`/BeginnerTeachingDetail/${id}`)
}
const getdata = async () => {
    loading.value = true;
    const res = await interlocution({ ...pageInof });
    loading.value = false
    if (res.code === 1) {
        dataList.value = res.data
    }
    console.log(res, "问答列表")
}
onMounted(() => {
    getdata()
})
</script>

<style lang="less" scoped>
.hint {
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

.empty {
    height: 500px;
}
</style>