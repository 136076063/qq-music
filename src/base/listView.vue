<template>
    <scroll :data="singerInfo"
            class="listview"
            ref="listviewScroll"
            :listenScroll="betterScroll.listenScroll"
            :probeType="betterScroll.probeType"
            @scroll="scrollClick"
    >
        <div>
            <div class="list-group" v-for="(items, index) in singerInfo" :key="index" ref="listviewList">
                <div class="list-group-title">{{items.title}}</div>
                <div class="list-group-item" v-for="(sunItem, subIndex) in items.lists" :key="subIndex">
                    <img class="avatar" v-lazy="sunItem.picUrl" />
                    <div class="name">{{sunItem.userName}}</div>
                </div>
            </div>
        </div>
        <div class="list-shortcut" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove">
            <div class="item" :class="{'current': swiperscrollIndex === index}" v-for="(item, index) in singerInfo" :data-index="index" :key="index">{{index === 0 ? item.title.substr(0, 1) : item.title}}</div>
        </div>
        <div class="list-fixed" v-if="fixedTitle" ref="listFixed">
            <div class="fixed-title">{{fixedTitle.title}}</div>
        </div>
        <loading v-if="!singerInfo.length"></loading>
    </scroll>
</template>

<script>
    import scroll from 'base/scroll';
    import loading from 'base/loading';
    export default {
        data () {
            return {
                tonchInfo: {}, // 手指触碰时初始化tonch参数
                betterScroll: { // 初始化better-scroll参数
                    listenScroll: true,
                    probeType: 3
                },
                heightList: [], // 列表每个组的高度范围值
                swiperscrollIndex: 0, // 列表滑动的索引值
                scrollPageY: 0, // 列表滚动的距离
                scrollDiffY: 0 // 列表每个组距离顶部的距离
            };
        },
        props: {
            singerInfo: {
                type: Array,
                default: []
            }
        },
        computed: {
            fixedTitle () {
                if (this.scrollPageY >= 0) {
                    return '';
                }
                return this.singerInfo[this.swiperscrollIndex] ? this.singerInfo[this.swiperscrollIndex] : '';
            }
        },
        methods: {
            touchstart (e) {
                let Event = e.srcElement ? e.srcElement : e.target, // 获取触发事件的元素
                    focuIndex = Event.dataset.index ? Event.dataset.index : 0; // 获取触发事件的索引
                this.tonchInfo.pageyStart = e.touches[0].pageY; // 获取触发事件的pageY
                this.tonchInfo.focuIndex = focuIndex;
                this._scrollTo(focuIndex);
            },
            touchmove (e) {
                // 获取移动的pageY
                this.tonchInfo.pageyMove = e.touches[0].pageY;
                // 取得移动了几个索引 然后加上初始索引
                let moveIndex = parseInt(this.tonchInfo.focuIndex) + ((this.tonchInfo.pageyMove - this.tonchInfo.pageyStart) / 18 | 0);
                moveIndex = moveIndex < 0 ? 0 : moveIndex; // 获取索引<=0时
                moveIndex = moveIndex > this.singerInfo.length ? this.singerInfo.length - 1 : moveIndex; // 获取索引》=singerInfo长度时
                this._scrollTo(moveIndex);
            },
            // better-scroll获取列表滚动的Y值
            scrollClick (res) {
                this.scrollPageY = res.y;
            },
            // 获取每个title距离顶部的高度
            _getHeightList () {
                let listviewList = this.$refs.listviewList;
                let height = 0;
                this.heightList = [0];
                listviewList.forEach((item, index) => {
                    height += item.clientHeight;
                    this.heightList.push(height);
                });
            },
            // 点击或滑动左侧导航时 跳到对应的列表
            _scrollTo (index) {
                this.swiperscrollIndex = parseInt(index);
                this.$refs.listviewScroll.scrollToElement(this.$refs.listviewList[index], 0);
            }
        },
        watch: {
            singerInfo () {
                this.$nextTick(() => {
                    this._getHeightList();
                });
            },
            scrollPageY (newY) {
                let pageY = -newY;
                if (pageY <= 0) {
                    this.swiperscrollIndex = 0;
                    return;
                }
                for (let i = 0; i < this.heightList.length - 1; i++) {
                    let hei1 = this.heightList[i];
                    let hei2 = this.heightList[i + 1];
                    if (pageY >= hei1 && pageY < hei2) {
                        this.swiperscrollIndex = i;
                        this.scrollDiffY = hei2 - pageY;
                        return;
                    }
                }
                this.swiperscrollIndex = this.heightList.length - 2;
            },
            scrollDiffY (newDiff) {
                let transformDiff = (newDiff > 0 && newDiff < 30) ? newDiff - 30 : 0, transformDiff2;
                if (transformDiff2 === transformDiff) {
                    return;
                }
                transformDiff2 = transformDiff;
                this.$nextTick(() => {
                    this.$refs.listFixed.style.transform = `translate3d(0, ${transformDiff}px, 0)`;
                });
            }
        },
        components: {
            scroll,
            loading
        }
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
