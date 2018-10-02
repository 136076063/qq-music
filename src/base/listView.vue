<template>
    <scroll class="listview" :data="data" ref="listviewScroll">
        <div>
            <div class="list-group" v-for="(items, index) in data" :key="index" ref="listviewList">
                <div class="list-group-title">{{items.title}}</div>
                <div class="list-group-item" v-for="(sunItem, subIndex) in items.lists" :key="subIndex">
                    <img class="avatar" v-lazy="sunItem.picUrl" />
                    <div class="name">{{sunItem.userName}}</div>
                </div>
            </div>
        </div>
        <div class="list-shortcut" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove">
            <div class="item" v-for="(item, index) in data" :data-index="index" :key="index">{{index === 0 ? item.title.substr(0, 1) : item.title}}</div>
        </div>
    </scroll>
</template>

<script>
    import scroll from 'base/scroll';
    export default {
        data () {
            return {
                tonchInfo: {}
            };
        },
        props: {
            data: {
                type: Array,
                default: []
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
                moveIndex = moveIndex > this.data.length ? this.data.length - 1 : moveIndex; // 获取索引》=data长度时
                this._scrollTo(moveIndex);
            },
            _scrollTo (index) {
                // 滚动到对应列表
                this.$refs.listviewScroll.scrollToElement(this.$refs.listviewList[index], 0);
            }
        },
        components: {
            scroll
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
