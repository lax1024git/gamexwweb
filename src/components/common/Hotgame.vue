<template>
    <div :class="['common-list', index != 0 ? 'All' : '']" v-if="index != 2">
        <template v-if="index == 0">
            <div v-for="item in gameList" class="hot-item" :key="item.href" @click=jumpGameList(item)>
                <div class="game-img-box">
                    <img :src="item?.show_img" alt="">
                </div>
                <span class="game-name">{{ $t(item?.name) }}</span>
            </div>
        </template>
        <template v-else>
            <div class="AllBetReal" v-for="item in gameList" :key="item.name" @click="jumpGameList(item)">
                <img src="@/assets/images/home/Live_bg.png" class="game_bg" alt="">
                <img :src="item.show_img" alt="" class="game-image">
                <div class="content-text">
                    <span class="game-logo-wrap">
                        <span class="img-wrap">
                            <img :src="item.icon_url" alt="">
                        </span>
                    </span>
                    <div class="game-name-BetReal">
                        <span>{{ $t(item.name) }}</span>
                        <b>{{ $t(item.icon) }}</b>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div v-else>
        <div class="tabsList">
            <div :class="['tabitem',activeIndex === index ? 'swiper-pagination-bullet-active' :'']" v-for="(item,index) in gameList" :key="item"
            @click="changeId(index)">{{$t(item.name)}}</div>
        </div>
        <div class="gamelist">
            <div class="gamelistItem" v-for="item in GameList" :key="item" @click="jumpshowGame(item)">
                <img :src="item.icon" alt="">
                <span>{{item.game_name}}</span>
            </div>
            
        </div>
        <More @loadmore="loadmore" :loading="loading" :isMore="nextPage"></More>
        <Empty class="empty" v-if="GameList.length === 0 && !loading"></Empty>
    </div>
</template>

<script setup>
import useStore from "@/store";
import {onActivated, reactive, ref } from "vue";
import { getnewGameList } from "@/api/games";
import { useRouter } from "vue-router";
const $router = useRouter();
const { indexMenuStore } = useStore();
const index = ref(0);
const gameList = ref([]);
gameList.value = indexMenuStore.menuData?.xw_mobile_game_menu[index.value].children;

const changedata = () => {
  gameList.value = indexMenuStore.menuData?.xw_mobile_game_menu[index.value].children[0];
  if(index.value === 2){
    getGameList(activeIndex.value);
  }
};
const activeIndex = ref(0);
const GameList = ref([]);

let data = reactive({
  limit:20,
  page:1,
  t_id:"",
});
const loading = ref(false);
const nextPage = ref(false);
const changeId = (index) =>{
  data.page = 1;
  activeIndex.value = index;
  GameList.value = [];
  getGameList();
};
const getGameList =async () => {
  loading.value = true;
  data.t_id = gameList.value[activeIndex.value].extra;
  const res = await getnewGameList(data);
  loading.value = false;
  if(res.code === 1){
    GameList.value = [...GameList.value,...res.data];
    if(GameList.value.length < res.total){
      nextPage.value = true;
    }else{
      nextPage.value = false;
    }
  }
};
const loadmore = () => {
  data.page++;
  getGameList();
};
const jumpGameList = (item) => {
  $router.push(`/playGameList?id=${item.extra}&title=${item.name}`);
};
const jumpshowGame = (item) => {
  $router.push(`/showGame?id=${item.id}`);
};
defineExpose(({
  index,
  changedata
}));
</script>

<style scoped lang="less">
.common-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: flex-start;
    height: 100%;
    overflow: auto;
    gap: 16px;
    padding-bottom: 10px;
}

.All {
    grid-template-columns: repeat(1, 1fr);
}

.hot-item {
    border-radius: 10px;
    border: none;
    background: none;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px;
        border: 2px solid transparent;
        background: linear-gradient(180deg, #343C56 0%, #485092 100%) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
}

.game-img-box {
    position: relative;
    width: 100%;
    border-radius: 8px 8px 0 0 !important;
    background: none;
    height: 78%;
    object-fit: cover;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px 8px 0 0 !important;
        border: 2px solid transparent;
        background: linear-gradient(180deg, #63ffff 0%, #475560 100%) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: absolute;
        top: 1px;
        left: 1px;
        transform: scale(1);
        transform-origin: center;
        display: block;
        /* width: 100%; */
        margin-bottom: 1px;
    }
}

.game-name {
    position: relative;
    height: auto;
    width: 100%;
    padding: 6px 0;
    text-align: center;
    background: linear-gradient(180deg, #97AFDA -3.42%, #97B6F2 96.58%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    overflow: hidden;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    text-overflow: ellipsis;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
    font-weight: 500;
}

.AllBetReal {
    position: relative;

    .content-text {
        position: absolute;
        top: 0;
        left: 2%;
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
        text-align: center !important;
        padding-right: 4px !important;
        padding-left: 4px !important;
        flex-direction: column !important;
        color: #fff !important;
    }

    .game-logo-wrap {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5%;
        background: none;

        .img-wrap {
            width: 80%;
            overflow: hidden;
            vertical-align: top;
            background: none;
        }
    }

    .game-name-BetReal {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        span {
            font-size: 22px;
            font-weight: bold
        }

        b {
            color: #adbbc3;
            font-size: 16px;
            font-weight: 400;
        }
    }
}

.game_bg {
    width: 100%;
    height: 100%;
}

.game-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.tabsList{
    width:540px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 15px;
    position: sticky;
    top: -5px;
    z-index:5;
    padding: 10px 0px;
    background: rgba(31, 49, 67, 0.8) !important;
    .tabitem{
        color: #c8d5e9;
        padding: 15px 20px;
        font-size: 20px;
        font-weight: 500;
        white-space: nowrap;
        border-radius: 6px;
        border: 1px solid #2c4472;
        background: linear-gradient(180deg, #0E295D -0.27%, #05183E 100.27%);
        text-shadow: none;
        position: relative;
        z-index: -1;
    }
    .swiper-pagination-bullet-active{
        text-shadow: none;
        color: #fff;
        border: 1px solid #6c82ad;
        background: linear-gradient(180deg, #1163AF -0.27%, #032758 100.27%);
    }
}
.gamelist{
    flex: 1;
    display: block;
    width: 540px;
    height: 100%;
    padding: 0 0 135px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    overflow: auto;
    user-select: none;
    cursor: grab;
    transition: transform .3s ease;
    img{
        max-height: 100%;
        max-width: 100%;
        margin: 0 auto;
    }
    span{
        display: block;
        text-align: center;
        color: #fff;
    }
}
</style>