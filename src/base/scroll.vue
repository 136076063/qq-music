<template>
    <div ref="scroll">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    import Bscroll from 'better-scroll';

    export default {
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在滑动的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted () {
            this.$nextTick(() => {
                this._initScroll();
            });
        },
        methods: {
            _initScroll () {
                let self = this;
                if (!this.$refs.scroll) {
                    return;
                }
                this.scroll = new Bscroll(this.$refs.scroll, {
                    probeType: this.probeType,
                    click: this.click
                });
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        self.$emit('scroll', pos);
                    });
                }
            },
            // 代理better-scroll的disable方法
            disable () {
                this.scroll && this.scroll.disable();
            },
            // 代理better-scroll的enable方法
            enable () {
                this.scroll && this.scroll.enable();
            },
            // 代理better-scroll的refresh方法
            refresh () {
                this.scroll && this.scroll.refresh();
            },
            scrollTo () {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        watch: {
            data () {
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        }
    };
</script>
