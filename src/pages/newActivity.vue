<template>
    <div class="activity">
        <NavBar :title="$t('活动')" class="nav-bar"></NavBar>
        <div class="categories">
            <swiper-container speed="20" :loop="false" :autoplay="false" class="swiper" slidesPerView="3" ref="swiper">
                <swiper-slide :class="['swiper-slide', activeIndex === index ? 'active' : '']" v-for="(item, index) in actionTypeList"
                    :key="item.id" @click="getActionList(index)">
                    {{ $t(item.name) }}
                </swiper-slide>
            </swiper-container>
        </div>
        <div class="content">
            <div class="content-item" v-for="item in actionList" :key="item" @click="jumpdetail(item)">
                <img :src="item.c_img" alt="">
            </div>
        </div>
    </div>
    <More :loading="loading" :isMore="false"></More>
    <Empty  v-if="actionList.length == 0 && !loading"></Empty>
    
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { action_list_api} from "@/api/action";
import { useRouter } from "vue-router";
const $router = useRouter();
const loading = ref(false);
const swiper = ref(null);
const activeIndex = ref(0);
/* 类型列表 */
const actionTypeList = ref([]);
/* 列表 */
const actionList = ref([]);
const pageInfo = reactive({
  page:1,
  limit:70,
  type_id:"",
});
const move = (index) => {
  activeIndex.value = index;
  if (swiper.value) {
    swiper.value.swiper.slideTo(index, 500);
  }
};
const getActionList = async(index) => {
  loading.value = true;
  if(index === activeIndex.value) return;
  move(index);
  if(actionTypeList.value.length){
    let type_id = actionTypeList.value[index].id;
    pageInfo.type_id = type_id;
  }
  const res = await action_list_api({...pageInfo});
  if(res.code === 1){
    loading.value = false;
    actionTypeList.value = [...[{id:"",name:"全部"}],...res.type_list];
    actionList.value = res.data;
  }
};
const jumpdetail = (item) => {
  $router.push(`/activityContent?id=${item.id}`);
};
onMounted(()=>{
  getActionList();
  activeIndex.value = 0;
});

</script>

<style lang="less" scoped>
.activity {
    padding-bottom: 200px;
    margin: 20px 20px;
}

.categories {
    position: relative;
    height: auto;
    color: #ccd1ff;
    background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.5) 0%, rgba(19, 49, 84, 0.5) 100%) !important;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 0;
    margin-bottom: 15px !important;
    z-index: 0;

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
        mask-composite: exclude
    }
}

.swiper {
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    min-width: 100%;
    padding-right: 50px;
    text-align: center;
    padding-left: 0;
}

.swiper-slide {
    position: relative;
    border: 1px solid transparent !important;
    background-clip: padding-box !important;
    border-radius: 6px;
    margin: 20px 5px;
    padding: 30px 24px;
    min-height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow:auto;
    font-size: 25px;
    display: table-cell;
    min-width: auto;
    background-color: #000 !important;
    background: radial-gradient(96.76% 96.76% at 50% 3.24%, #202d4d 21%, #0c1429 100%);
    color: #84c5e9;
    position: relative;
    border: 1px solid transparent !important;
    background-clip: padding-box !important;
}

.swiper-slide.active {
    background: linear-gradient(180deg, #b2c6d8 -37.18%, #69ffff 100%);
    color: #1971a2;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.content-item {
    position: relative;
    height: auto;
    color: #ccd1ff;
    background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.5) 0%, rgba(19, 49, 84, 0.5) 100%) !important;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 0;
    margin-bottom: 8px !important;
    z-index: 0;
    border-radius: 14px;
    overflow: hidden;
    display: block;
    color: #1976d2;
    border: none;
    padding: 1px;
    width: 100%;
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
    }
    img{
        width:100%;
        height: auto;
    }
}
</style>