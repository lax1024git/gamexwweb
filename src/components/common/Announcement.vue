<template>

  <Popup v-model:show="isShow" @closed="emit('closed')" @touchmove.stop @touchend.stop @touchstart.stop>
    <div class="box">
      <div class="tabs">
        <div :class="['tabs-item', id == tab.id ? 'active' : '']" @click="changtab(tab.id)"
          v-for="tab in messageTabList">{{ $t(tab.name) }}</div>
      </div>
      <Empty class="empty" :loading="loading" v-if="list.length == 0"></Empty>
      <ul class="list-content" v-else>
        <li class="content01" @click="tabItem(item.id)" v-for="item in list">
          <div class="w-2/3 truncate">{{item.title}}</div>
          <div class="w-1/3 text-right">{{ item.add_time }}</div>
        </li>
      </ul>
    </div>
    <!--  <div class="box">
      <swiper-container class="swiper" :loop="false" :centeredSlides="true" :allowTouchMove="false" spaceBetween="10px"
        :navigation="{
          nextEl: '.announcement-right-popup', prevEl: '.announcement-left-popup'
        }">
        <swiper-slide v-for="item in list" :key="item.id">
          <div class="content html" v-html="item.content"></div>
          <el-button class="full btn" type="primary" size="large" @click="$openLink(item.jump_url); isShow = false">{{
            $t('了解')
          }}</el-button>
        </swiper-slide>
      </swiper-container>
      
      <t-svg name="left" class="announcement-left announcement-left-popup"></t-svg>
      <t-svg name="right" class="announcement-right announcement-right-popup"></t-svg>
    </div> -->
    <div class="tip" @click="todayHide">
      <el-switch v-model="value1" />
      <span style="padding-left: 10px;">{{ $t("今天不再提醒") }}</span>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { notice_list_api, notice_type_api } from "@/api";
import { ResCode } from "@/enum/ResultCode";
import { NoticeListApiItem } from "@/types/api";
import { ref, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import BaseStorage from "@/storage/BaseStorage";
const $router = useRouter()
const timeStorage = new BaseStorage("announcementTime");
const isShow = ref(false);
const emit = defineEmits(["closed"]);
const list: Ref<NoticeListApiItem[]> = ref([]);
const id = ref<number>();
const loading = ref(false)
const value1 = ref(false)
const changtab = (num) => {
  list.value = []
  id.value = num
  getData()
}
const getData = async () => {
  loading.value = true
  const res = await notice_list_api({
    page: 1,
    limit: 10,
    type: id.value,
  });
  loading.value = false
  if (res.code === ResCode.success) {
    list.value = res.data;
  }
};
const tabItem = (id) => {
  isShow.value = false;
  $router.push(`/msgCenter?id=${id}&current=1`);

};
const messageTabList = ref([])
const todayHide = () => {
  // 设置时间
  timeStorage.setData(moment().format("YYYY-MM-DD"));
  isShow.value = false;
};

onMounted(async () => {
  // 判断隐藏时间
  if (timeStorage.getData() === moment().format("YYYY-MM-DD")) return;
  const res = await notice_type_api()
  if (res.code === 1) {
    messageTabList.value = res.data;
    id.value = messageTabList.value[0].id
    if (res.data.length) {
      isShow.value = true;
    }
  }
  await getData();
});
</script>

<style scoped lang="less" src="@/assets/css/components/announcement.less"></style>
<style scoped lang="less">
.tabs {
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  gap: 20px;
  z-index: 10;
  padding: 20px;
  overflow: hidden;
  align-items: center;
  background: #151e34;

  &-item {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
  }
}
.active {
  background: linear-gradient(to right, #327ee5, #1e2b76);
}
.list-content{
  height:450px;
  overflow: auto;
  @media (min-width:541px) {
    height: 150px;
  }
}
.box{
  @media (min-width:541px) {
    min-height: 2rem;
  }
}
.content01 {
  position: relative;
  top: 20px;
  margin-top: 10px;
  padding: 20px 10px;
  border-radius: 10px;
  background-image: linear-gradient(#151e34, #141a2a);
  display: flex;
}
</style>