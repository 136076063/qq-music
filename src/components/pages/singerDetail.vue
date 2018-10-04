<template>
    <transition name="slide">
      <div class="singer-detail">
      </div>
    </transition>
</template>

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
