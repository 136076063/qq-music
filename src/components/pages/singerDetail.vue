<template>
    <transition name="slide">
      <div class="singer-detail">
      </div>
    </transition>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { getJsonp } from 'api/getData';
    import { singerDetUrl, ERR_OK } from 'api/urls';
    import SingerDetail from 'common/js/singerDetail.js';
    export default {
        data () {
            return {
                singerDetailInfo: []
            };
        },
        created () {
            this.getSingerDetInfo();
        },
        computed: {
            ...mapGetters([
                'singerInfo'
            ])
        },
        methods: {
            getSingerDetInfo () {
                if (!this.singerInfo.UserId) {
                    this.$router.push({
                        path: '/singer'
                    });
                    return;
                }
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
                        singermid: this.singerInfo.UserId,
                        order: 'listen',
                        begin: 0,
                        num: 88,
                        songstatus: 1
                    },
                    opts: {
                        param: 'jsonpCallback'
                    }
                }).then((res) => {
                    if (res && res.code === ERR_OK) {
                        this.singerDetailInfo = this._initInfo((res && res.data && res.data.list) || []);
                    } else {
                        console.error(res.message);
                    }
                });
            },
            _initInfo (items) {
                let arr = [];
                items.forEach((item) => {
                    arr.push(new SingerDetail(item.musicData));
                });
                return arr;
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
