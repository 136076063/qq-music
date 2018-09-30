<template>
    <section>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in sliderData" :data-Lick="item.linkUrl" :key="index">
                    <img :src="item.picUrl" @load="loadImage" :alt="item.id">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import Swiper from 'swiper';
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
                    autoplayDisableOnInteraction: false,
                    onClick (swiper) {
                        window.location.href = swiper.clickedSlide.dataset.lick;
                    }
                });
            });
            window.addEventListener('resize', () => {
                console.log('视口宽度-------:', window.innerWidth);
            });
        },
        methods: {
            loadImage () {
                // 调用父组件方法，重新计算滚动容器的高度
                this.$emit('srcollRefresh');
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~swiper/dist/css/swiper.min.css';
    @import "~common/stylus/variable"

    .swiper-container
        min-height: 1px
        img
            width: 100%
</style>
