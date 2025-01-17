<template>
    <div class="history">
        <NavBar :title="$t('历史')" ></NavBar>
        <div class="card-box">
      <div class="top-input-box">
        <el-date-picker v-model="form.time" :start-placeholder="$t('开始日期')" :end-placeholder="$t('结束日期')" size="large"
          type="daterange" prefix-icon="none" class="round search" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
      </div>
      <Empty class="empty" v-if="list.length === 0" :loading="loading"></Empty>

      <el-table :data="list" size="large" class="t-table" v-else>
        <el-table-column :label="$t('类型')">
          <template #default="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('子类型')">
          <template #default="scope">
            {{ scope.row.child_type }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('变更余额')">
          <template #default="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('变更后余额')">
          <template #default="scope">
            {{ scope.row.new_price }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('时间')">
          <template #default="scope">
            {{ scope.row.add_time }}
          </template>
        </el-table-column>
        <template #append v-if="form.page !== -1">
          <More @loadmore="loadmore" :loading="loading" :is-more="form.nextPage"></More>
        </template>
      </el-table>
    </div>
    </div>

</template>
<script setup lang="ts">
import { ResCode } from "@/enum/ResultCode";
import { Ref, onActivated, ref, watch } from "vue";
import More from "@/components/common/More.vue";
import { my_balanceRecord_api } from "@/api/user";
import { BalanceRecordItem } from "@/types/api/user";


// 时间控制
const form = ref({
  page: 1,
  limit: 10,
  time: "",
  nextPage:false,
});

watch(() => form.value.time, () => {
  form.value.page = 1;
  list.value = [];
  getList();
});

const loading = ref(false);
const list: Ref<BalanceRecordItem[]> = ref([]);
const getList = async () => {
  loading.value = true;
  const res = await my_balanceRecord_api({
    page: form.value.page,
    limit: form.value.limit,
    start_time: form.value.time?.[0] || new Date().toISOString().split('T')[0],
    end_time: form.value.time?.[1] || new Date().toISOString().split('T')[0]
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

<style lang="less" setup>
.history{
    padding: 20px 20px 20px 20px;
}
</style>