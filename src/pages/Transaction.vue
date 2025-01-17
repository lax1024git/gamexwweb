<template>
  <div class="transaction">
    <NavBar :title="$t('账户交易记录')" class="nav-bar"></NavBar>
    <div class="tab">
      <div :class="['tab-item', tabCurrent == index ? 'active' : '']" v-for="(item, index) in tabList" :key="item"
        @click="tabCurrent = index">
        {{ $t(item) }}
      </div>
    </div>
    <div class="tab days_content">
      <div :class="['tab-item days', DataCyrrent === item.value ? 'active' : '']" v-for="item in DataTime" :key="item.value"
        @click="showDateRange(item.value)">{{ $t(item.title) }}</div>
    </div>
    <div class="content">
      <WithdrawRecords :startDate="startDate" :endDate="endDate" v-if="tabCurrent == 1"></WithdrawRecords>
      <DepositTow :startDate="startDate" :endDate="endDate" v-else-if="tabCurrent == 0"></DepositTow>
      <TransactionRecoed :startDate="startDate" :endDate="endDate" v-else-if="tabCurrent == 2"></TransactionRecoed>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import { onActivated, ref } from "vue";
import WithdrawRecords from "@/components/page/withdraw/WithdrawRecords.vue";
import DepositTow from "@/components/common/DepositTow.vue";
import TransactionRecoed from "@/components/common/TransactionRecoed.vue";
import { useRoute } from "vue-router";
const tabList = ["存款记录", "提款记录", "交易记录"];
const $route = useRoute();
const DataTime = [{title:"今日",value:"today"}, {title:"昨天",value:"yesterday"},{title:"七日内",value:"last7"}, {title:"30日内",value:"last30"}];
const tabCurrent = ref<Number>(0);
const DataCyrrent = ref("today");
let startDate = ref("");
let endDate = ref("");
const showDateRange = (range) => {
  let sDate,eDate;
  DataCyrrent.value = range;
  const now = new Date();
  switch (range) {
  case "today":
    sDate = eDate = now;
    break;
  case "yesterday":
    sDate = eDate = new Date(now);
    sDate.setDate(now.getDate() - 1);
    break;
  case "last7":
    sDate = new Date(now);
    sDate.setDate(now.getDate() - 6); // 包含今天的七天
    eDate = now;
    break;
  case "last30":
    sDate = new Date(now);
    sDate.setDate(now.getDate() - 29); // 包含今天的30天
    eDate = now;
    break;
  default:
    break;
  }
  const formatDate = (date) => date.toISOString().split("T")[0];
  startDate.value = formatDate(sDate);
  endDate.value = formatDate(eDate);
};
onActivated(()=>{
  if($route.query.id){
    tabCurrent.value = Number($route.query.id);
  }
  showDateRange(DataCyrrent.value);
});
</script>
<style scoped lang="less">
.transaction {
  padding: 0 20px;
}

.tab {
  position: relative;
  height: auto;
  color: #ccd1ff;
  width: 100%;
  background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.5) 0%, rgba(19, 49, 84, 0.5) 100%) !important;
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 8px !important;
  z-index: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around !important;
  margin-top: 20px;

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
}

.tab-item {
  background: radial-gradient(96.76% 96.76% at 50% 3.24%, #202d4d 21%, #0c1429 100%);
  color: #84c5e9;
  position: relative;
  border: 1px solid transparent !important;
  background-clip: padding-box !important;
  overflow: visible;
  border-radius: 6px;
  flex-grow: 1;
  margin: 18px 15px;
  /* min-width: 100px;
  max-width: 200px; */
  font-size: 20px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  overflow: scroll;
  /* text-overflow: ellipsis; */
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  padding: 25px 8px;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: -2px !important;
    border-radius: inherit;
    background: linear-gradient(180deg, #b2c6d8 0%, #69ffff 100%) border-box;
  }
}

.days {
  flex-grow: 0;
  border-radius: 6px;
  padding: 2px 16px;
  background: none;
  margin: 0;

  &::before {
    background: transparent !important;
  }
}

.days_content {
  justify-content: flex-start !important;
  padding: 15px;
  margin-bottom: 20px !important;
}

.tab-item.active {
  background: linear-gradient(180deg, #b2c6d8 -37.18%, #69ffff 100%);
  color: #1971a2;
}

.tab-item.days.active {
  border: 1px solid #fff !important;
  color: white;
  background: transparent !important;
}

.v-alert {
  height: 50vh;
  margin: 0 !important;
  opacity: 1;

  &::after {
    content: "";
    display: block;
    height: 50%;
    width: 200px;
    position: absolute;
    background: url("@/assets/images/loading.png") center bottom / contain no-repeat;
    top: 30%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.v-alert__wrapper {
  color: #DADBF3;
  font-size: 14px;
  transform: translateX(-50%);
  position: absolute;
  top: 56%;
  left: 50%;
  align-items: center;
  border-radius: inherit;
  display: flex;
}

.v-alert__content {
  font-size: .3rem;
  flex: 1 1 auto;
}

.content {
  background: radial-gradient(87.23% 87.23% at 50% 12.77%, rgba(60, 132, 217, 0.5) 0%, rgba(19, 49, 84, 0.5) 100%) !important;
}
</style>