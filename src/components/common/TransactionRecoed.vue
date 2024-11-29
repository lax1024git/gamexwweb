<template>
    <div class="depositRecords">
        <Empty class="empty" :loading="loading" v-if="list.length === 0"></Empty>
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
                    {{ $numInit(scope.row.price) }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('变更后余额')">
                <template #default="scope">
                    {{ $numInit(scope.row.new_price) }}
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
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watch } from "vue";
import Empty from "./Empty.vue";
import useStore from "@/store";
import { transaction_record_api } from "@/api/withdraw";
import { ResCode } from "@/enum/ResultCode";
import { TransactionRecord } from "@/types/api/recharge";
const props = defineProps(["startDate", "endDate"]);

watch(props, () => {
  console.log(props.startDate,props.endDate,"这是时间期间！！！");
  form.value.page = 1;
  list.value = [];
  getList();
});

// 时间控制
const form = ref({
  page: 1,
  limit: 10,
  nextPage:false
});

const loading = ref(false);
const list: Ref<TransactionRecord[]> = ref([]);
const getList = async () => {
  loading.value = true;
  const res = await transaction_record_api({
    page: form.value.page,
    limit: form.value.limit,
    start_time: props.startDate || "",
    end_time: props.endDate || ""
  });
  loading.value = false;
  if (res.code === ResCode.success) {
    list.value = [
      ...list.value,
      ...res.data,
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

onMounted(() => {
  getList();
});
</script>

<style scoped lang="less">
.depositRecords{
  padding-bottom:200px;
}
.empty {
    height: 500px;
}
</style>
