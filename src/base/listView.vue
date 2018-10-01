<template>
    <scroll class="listview" :data="data">
        <div>
            <div class="list-group" v-for="(items, index) in data" :key="index">
                <div class="list-group-title">{{items.title}}</div>
                <div class="list-group-item" v-for="(sunItem, subIndex) in items.lists" :key="subIndex">
                    <img class="avatar" v-lazy="sunItem.picUrl" />
                    <div class="name">{{sunItem.userName}}</div>
                </div>
            </div>
        </div>
        <div class="list-shortcut">
            <div class="item" v-for="(item, index) in data" :key="index">{{index === 0 ? item.title.substr(0, 1) : item.title}}</div>
        </div>
    </scroll>
</template>

<script>
    import scroll from 'base/scroll';
    export default {
        props: {
            data: {
                type: Array,
                default: []
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
