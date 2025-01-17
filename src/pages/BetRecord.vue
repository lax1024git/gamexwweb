<template>
  <div>
    <NavBar :title="$t('投注记录')" class="nav-bar"></NavBar>
    <div class="input-list">
      <!-- <el-select class="round input" size="large" v-model="form.Sport" :placeholder="$t('级别')">
        <el-option :label="$t(item.name)" :value="item.value" v-for="item in levelList" :key="item.value" />
      </el-select> -->

      <el-select class="round input" size="large" v-model="form.settlement" :placeholder="$t('所有')">
        <el-option :label="$t(item.name)" :value="item.value" v-for="item in settlementList" :key="item.value" />
      </el-select>
      <div>
        <el-date-picker v-model="form.time" :start-placeholder="$t('开始日期')" :end-placeholder="$t('结束日期')"
                        size="large" type="daterange" prefix-icon="none" class="round " format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" />
      </div>
    </div>
    <Empty class="empty" :loading="loading" v-if="list.length === 0"></Empty>
    <el-table :data="list" size="large" class="t-table" v-else>
      <el-table-column :label="$t('游戏名称')">
        <template #default="scope">
          {{ scope.row.game_name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('输赢金额')">
        <template #default="scope">
          {{ scope.row.gb_winprice }}  
        </template>
      </el-table-column>
      <el-table-column :label="$t('下注金额')">
        <template #default="scope">
          {{ scope.row.gb_price }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('状态')">
        <template #default="scope">
          {{ $t(systatus[scope.row.gb_winlose]) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('下注时间')">
        <template #default="scope">
          {{ scope.row.gb_overtime }}
        </template>
      </el-table-column>
      <template #append v-if="form.page !== -1">
        <More @loadmore="loadmore" :loading="loading" :is-more="form.nextPage"></More>
      </template>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/common/NavBar.vue";
import { Ref, onActivated, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ResCode } from "@/enum/ResultCode";
import {game_orderlist_api } from "@/api/team";
import { GameOrderlistItem } from "@/types/api/team";
import { levelList } from "@/data/levelList";
import { settlementList } from "@/data/settlement";
import More from "@/components/common/More.vue";
import Empty from "@/components/common/Empty.vue";
const $route = useRoute();
const active = ref(0);
watch(() => $route.query.current, v => {
  if ($route.path === "/report") {
    active.value = Number(v) || 0;
  }
}, { immediate: true });

const systatus = ["无效", "未结算", "输", "赢", "平"];
// 时间控制
const form = ref({
  page: 1,
  limit: 10,
  time: "",
  settlement: "",
/*   Sport: 0, */
  nextPage:false
});
// form.value.Sport, 
watch(() => [form.value.time, form.value.settlement], () => {
  form.value.page = 1;
  list.value = [];
  getList();
});

const loading = ref(false);
const list: Ref<GameOrderlistItem[]> = ref([]);
const getList = async () => {
  loading.value = true;
  const res = await game_orderlist_api({
    page: form.value.page,
    limit: form.value.limit,
    settlement: form.value.settlement,
    /* sports: form.value.Sport, */
    date: form.value.time ? form.value.time?.[0] + "|" + form.value.time?.[1] : new Date().toISOString().split('T')[0] + "|" + new Date().toISOString().split('T')[0] ,
  });
  loading.value = false;
  if (res.code === ResCode.success) {
    list.value = [
      ...list.value,
      ...res.data
    ];
    if (list.value.length < res.total) {
      form.value.nextPage = true;
    }else{
      form.value.nextPage = false;
    }
    /* if (res.data.length < form.value.limit) form.value.page = -1; */
  }
};

const loadmore = () => {
  form.value.page++;
  getList();
};
onActivated(() => {
  form.value.page = 1;
  list.value = [];
  getList();
});
</script>
<style scoped lang="less" src="@/assets/css/pages/report.less"></style>
<style scoped lang="less">

</style>