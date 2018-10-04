<template>
    <transition name="slide">
      <div class="singer-detail">
      </div>
    </transition>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { getJsonp } from 'api/getData';
    import { singerDetUrl } from 'api/urls';
    export default {
        created () {
            this.getSingerDetInfo();
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        methods: {
            getSingerDetInfo () {
                getJsonp({
                    url: singerDetUrl,
                    ops: {
                        g_tk: 124852753,
                        loginUin: 136076063,
                        hostUin: 0,
                        format: 'jsonp',
                        inCharset: 'utf8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'yqq',
                        needNewCode: 0,
                        singermid: '002J4UUk29y8BY',
                        order: 'listen',
                        begin: 0,
                        num: 88,
                        songstatus: 1
                    },
                    opts: {
                        param: 'jsonpCallback'
                    }
                }).then((res) => {
                    console.error(res);
                });
            }
        }
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer-detail
        position:fixed
        top: 0
        left: 0
        background-color: #222222
        z-index: 1000
        width:100%
        height:100%
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
