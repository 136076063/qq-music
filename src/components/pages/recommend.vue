<template>
    <div class="recommend">
        <div class="recommend-content">
            <Slider  v-if="sliderData.length" :sliderData="sliderData"></Slider>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from 'base/slider';
    import { getRecommend } from 'api/recommend';
    import urls from 'api/urls.js';
    export default {
        data () {
            return {
                recommendData: []
            };
        },
        created () {
            this.createdGetRecommend();
        },
        computed: {
            sliderData () {
                return (this.recommendData && this.recommendData.slider) || [];
            }
        },
        methods: {
            toLink (url) {
                document.location.href = url;
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
                    if (res.code === 0) {
                        self.recommendData = res && res.data;
                    }
                });
            }
        },
        components: {
            Slider
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
