<template>
    <div class="gamelist">
        <NavBar :title="$t($route.query.title)" class="nav-bar"></NavBar>
        <div class="search">
            <div class="searchContent">
                <el-input v-model="keyword" class="searchInput" :input-style="{
                    'height': '30px', 'font-size': '14px',
                    'color': 'black',
                }" :placeholder="$t('游戏名称')">
                    <template #suffix >
                        <el-icon @click="searchBtn" size="16" color="black">
                            <Search />
                        </el-icon>
                    </template>

                </el-input>
                <el-select v-model="value" class="selectStyle" :placeholder="$t('全部游戏')">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div class="content">
            <div class="row">
                <div v-for="item in gameList" class="game-item" :key="item.id" @click="jumpshowGame(item)">
                    <img :src="item?.gi_headimg"  alt="">
                    <div class="game-name">{{item?.game_name}}</div>
                </div>
            </div>
        </div>
        <More :loading="loading" :is-more="nextpage" @loadmore="loadMore"></More>
        <Empty class="empty"  v-if="gameList.length === 0 && !loading"></Empty>
    </div>
</template>

<script setup>
import { onActivated, onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getnewGameList } from "@/api/games";
import Empty from "@/components/common/Empty.vue";
import { useRoute,useRouter } from "vue-router";
const value = ref("");
const keyword = ref("");
const options = [{ label: "全部游戏" }];
const $route = useRoute();
const $router = useRouter();
const gameList = ref([]);

const loading = ref(false);
const nextpage = ref(true);
let data = reactive({
  limit:"20",
  page:1,
  t_id: "",
  keywords:""
});


const getGameList = async () => {
  loading.value = true;
  const res = await getnewGameList(data);
  if(res.code === 1){
    gameList.value = [...gameList.value,...res.data];
    if(gameList.value.length == res.total){
      nextpage.value = false;
    }
  }
  loading.value = false;
};

const loadMore = () => {
  data.page++;
  getGameList();
};

const searchBtn = () => {
  /* if(keyword.value == data.keywords) return; */
  gameList.value = [];
  data.keywords = keyword.value;
  getGameList();
};

const jumpshowGame = (item) => {
  $router.push(`/showGame?id=${item.id}`);
};
onActivated(()=>{
  gameList.value = [];
  if($route.query.id){
    data.t_id = $route.query.id;
  }
  getGameList();
});
</script>

<style scoped lang="less">
.gamelist{
    padding-bottom: 200px;
}
.search {
    padding: 40px !important;
    background: rgba(31, 49, 67, 0.8) !important;
    height: 250px;
}

.searchContent {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
}

.searchInput {
    background: #99c1e4;
    border-radius: 10px;
    padding: 5px;
    border: none;
    /* padding-bottom:35px; */
}

::v-deep .el-input__wrapper {
    border-bottom: none !important;
}

::v-deep ::placeholder {
    color: black !important;
}

.selectStyle {
    height: 30px !important;
    border: none;
    background: #99c1e4 !important;
    border-radius: 10px;
}

::v-deep .selectStyle .el-select__wrapper {
    height: 70px !important;
    color: #000;
    background: #99c1e4;
    border-radius: 10px;

    span {
        color: #000 !important;
        font-size: 28px;
    }
}

::v-deep .el-select__caret {
    color: #000;
    font-size: 38px;
}

.content {
    width: 100%;
    padding: 60px;
    margin-right: auto;
    margin-left: auto; 

    .row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}

.game-item {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    border-radius: 10px;
    padding: 8px !important;
    border-width: thin;
    display: block;
    max-width: 100%;
    outline: none;
    text-decoration: none;
    transition-property: box-shadow, opacity;
    overflow-wrap: break-word;
    position: relative;
    white-space: normal;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &::before {
        background: currentColor;
        bottom: 0;
        content: "";
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity .2s;
    }
    img{
        margin: 8px auto 0px;
        max-width: 90%;
        width:90%;
        border-radius: 15px 15px 0px 0px;
    }
    .game-name{
        width: 250px;
        text-align: center;
        /* margin-top: 40px; */
        padding: 20px;
        font-size: 27px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>