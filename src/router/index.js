import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'components/pages/recommend.vue';
import Singer from 'components/pages/singer.vue';
import singerDetail from 'components/pages/singerDetail.vue';
import Search from 'components/pages/search.vue';
import Rank from 'components/pages/rank.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Recommend', // 重定向路径
            component: Recommend
        },
        {
            path: '/Recommend', // 推荐
            component: Recommend
        },
        {
            path: '/Singer', // 歌手
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: singerDetail
                }
            ]
        },
        {
            path: '/Search', // 搜索
            component: Search
        },
        {
            path: '/Rank', // 排行
            component: Rank
        }
    ]
});
