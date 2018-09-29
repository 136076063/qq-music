<template>
    <div class="recommend">
        <Scroll ref="recScroll" class="recommend-content" :data="ListData">
            <div>
                <Slider @srcollRefresh="srcollRefresh" v-if="sliderData.length" :sliderData="sliderData"></Slider>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="item in ListData">
                            <div class="icon"><img v-lazy="item.picurl" :alt="item.listennum"></div>
                            <div class="text">
                                <div class="name">{{item.mvtitle}}</div>
                                <div class="dese">{{item.mvdesc}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import Slider from 'base/slider';
    import Scroll from 'base/scroll';
    import { getRecommend, recommendList } from 'api/recommend';
    import urls from 'api/urls.js';
    export default {
        data () {
            return {
                recommendBanner: [],
                recommendList: [],
                checkloaded: false
            };
        },
        created () {
            // banner数据
            this.createdGetRecommend();
            // 歌单list
            this.createdRecommendList();
        },
        computed: {
            sliderData () {
                return (this.recommendBanner && this.recommendBanner.slider) || [];
            },
            ListData () {
                return (this.recommendList && this.recommendList.mvlist) || [];
            }
        },
        methods: {
            // swiper图片加载完成之后，重新计算better-scroll高度
            srcollRefresh () {
                if (!this.checkloaded) {
                    this.$refs.recScroll.refresh();
                    this.checkloaded = true;
                }
            },
            createdRecommendList () {
                recommendList({
                    url: '/api/recommendList',
                    ops: {
                        g_tk: 5381,
                        jsonpCallback: 'MusicJsonCallback',
                        loginUin: 0,
                        hostUin: 0,
                        format: 'json',
                        inCharset: 'utf8',
                        outCharset: 'GB2312',
                        notice: 0,
                        platform: 'yqq',
                        needNewCode: 0,
                        cmd: 'shoubo',
                        lan: 'all'
                    }
                }).then((res) => {
                    if (res && res.data && res.data.code === 0) {
                        this.recommendList = (res && res.data && res.data.data) || {};
                    }
                });
            },
            createdGetRecommend () {
                let self = this;
                getRecommend({
                    url: urls.getRecommend,
                    ops: {
                        platform: 'h5',
                        uin: 0,
                        needNewCode: 1,
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
                    if (res.code === urls.ERR_OK) {
                        self.recommendBanner = res && res.data;
                    }
                });
            }
        },
        components: {
            Slider,
            Scroll
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                        img
                            width: 60px;
                            height: 60px;
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
