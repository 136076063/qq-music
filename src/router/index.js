import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'components/pages/recommend.vue';
import singer from 'components/pages/singer.vue';
import search from 'components/pages/search.vue';
import rank from 'components/pages/rank.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Recommend' // 重定向路径
        },
        {
            path: '/Recommend', // 推荐
            component: Recommend
        },
        {
            path: '/singer', // 歌手
            component: singer
        },
        {
            path: '/search', // 搜索
            component: search
        },
        {
            path: '/rank', // 排行
            component: rank
        }
    ]
});
