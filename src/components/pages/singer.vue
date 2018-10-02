<template>
    <div class="singer">
        <ListView :data="singerInfo"></ListView>
    </div>
</template>
<script>
    import { getJsonp } from 'api/getData';
    import urls from 'api/urls';
    import Singer from 'common/js/singer';
    import ListView from 'base/ListView';
    export default {
        data () {
            return {
                singerInfo: []
            };
        },
        created () {
            this.getSingerData();
        },
        methods: {
            // 获取歌手信息
            getSingerData () {
                getJsonp({
                    url: urls.singerUrl,
                    ops: {
                        channel: 'singer',
                        page: 'list',
                        key: 'all_all_all',
                        pagesize: 200,
                        pagenum: 2,
                        hostUin: 0,
                        needNewCode: 0,
                        platform: 'yqq',
                        g_tk: 1928093487,
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        format: 'jsonp'
                    },
                    opts: {
                        param: 'jsonpCallback'
                    }
                }).then((res) => {
                    if (res && res.code === urls.ERR_OK) {
                        this.singerInfo = this.initInfo((res && res.data && res.data.list) || []);
                    }
                });
            },
            // 处理无序数据
            initInfo (list) {
                // 将单独的数据按Findex进行分类
                const hotName = '热门';
                const hotNum = 10;
                let map = {
                    hot: {
                        title: hotName,
                        lists: []
                    }
                };
                list.forEach((item, index) => {
                    // 将前10条作为热门数据
                    if (index < hotNum) {
                        map.hot.lists.push(new Singer({
                            data: item
                        }));
                    }
                    // 按Findex进行聚合
                    let key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            lists: []
                        };
                    }
                    map[key].lists.push(new Singer({
                        data: item
                    }));
                });
                // 处理得到map,将之改造为A-Z的有序Array
                let hot = [];
                let arr = [];
                // 对热门与A-z的数据进行区分 （不在A-Z序列内的数据剔除）
                for (let item in map) {
                    let mapKey = map[item];
                    if (mapKey.title.match(/[a-zA-Z]/)) {
                        arr.push(mapKey);
                    } else if (mapKey.title === hotName) {
                        hot.push(mapKey);
                    }
                }
                // 对arr进行A-Z的数据进行有序排列
                arr.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });
                return hot.concat(arr);
            }
        },
        components: {
            ListView
        }
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
