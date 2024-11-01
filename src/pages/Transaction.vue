<template>
  <div class="transaction">
    <NavBar :title="$t('帳戶交易紀錄')" class="nav-bar"></NavBar>
    <div class="tab">
      <div v-for="(item,index) in tabList" :key="index" class="tab-item" :class="tabCurrent==index?'active':''" @click="tabCurrent=index">
        {{item}}
      </div>
    </div>
    <recharge-record v-show="tabCurrent==0"></recharge-record>
    <WithdrawRecords v-show="tabCurrent==1"></WithdrawRecords>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import {ref} from "vue";
import WithdrawRecords from "@/components/page/withdraw/WithdrawRecords.vue";

const tabList = ["存款紀錄", "提款紀錄", "交易紀錄"];

const tabCurrent = ref(0);
</script>
<style scoped lang="less">
.transaction{
  padding: 0 20px;
}
.tab{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.tab-item{
  padding: 6px 8px;
  margin: 0 6px 5px 0;
  color: #999;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
}
.tab-item.active{
  color: #a94442;
  border-color: #a94442;
}
</style>