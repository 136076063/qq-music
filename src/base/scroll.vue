<template>
    <div ref="scroll">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
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
            this._initScrool();
        });
    },
    methods: {
        _initScrool () {
            if (!this.$refs.scroll) {
                return;
            }
            this.scroll = new BScroll(this.$refs.scroll, {
                probeType: this.probeType,
                click: this.click
            });
        },
        disable () {
            this.scroll && this.scroll.disable();
        },
        enable () {
            this.scroll && this.scroll.enable();
        },
        refresh () {
            this.scroll && this.scroll.refresh();
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
