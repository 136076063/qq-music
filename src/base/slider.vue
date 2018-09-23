<template>
    <section>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in sliderData" @click="toLink(item.linkUrl)">
                    <img :src="item.picUrl" :alt="item.id">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        props: {
            sliderData: {
                type: Object | Array
            }
        },
        mounted () {
            this.$nextTick(() => {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: 3000,
                    speed: 1000,
                    autoplayDisableOnInteraction: false
                });
            });
        },
        methods: {
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import '~swiper/dist/css/swiper.min.css';
    .swiper-container
        min-height: 1px
        img
            width: 100%
        .swiper-pagination-bullet
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.swiper-pagination-bullet-active
                width: 20px
                border-radius: 5px
                background: $color-text-ll

</style>
