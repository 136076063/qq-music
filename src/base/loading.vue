<template>
    <div class="loading-box">
        <div class="loading">
            <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
                <div class="rect6"></div>
                <div class="rect7"></div>
                <div class="rect8"></div>
            </div>
            <div class="title">{{title}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: '正在载入'
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

.loading-box
    width: 100%
    height: 100%
    background-color: #1b1b1b
    position: fixed
    top: 0
    right: 0
    .loading
        position: relative
        top: 30%
        .title
            font-size: 8px
            color: #c2c2c2
            margin-top: 6px
            text-align: center
        .spinner
            width: 40px
            height:30px
            text-align:center
            font-size:10px
            display: flex
            flex-direction: row
            margin:0 auto
            div
                background-color: #ffcd32
                height:100%
                width:3px
                margin-right: 2px
                -webkit-animation:stretchdelay 1.2s infinite ease-in-out
                animation:stretchdelay 1.2s infinite ease-in-out
            .rect2
                -webkit-animation-delay:-1.1s
                animation-delay:-1.1s
            .rect3
                -webkit-animation-delay:-1.0s
                animation-delay:-1.0s
            .rect4
                -webkit-animation-delay:-0.9s
                animation-delay:-0.9s
            .rect5
                -webkit-animation-delay:-0.8s
                animation-delay:-0.8s
            .rect6
                -webkit-animation-delay:-0.7s
                animation-delay:-0.7s
            .rect7
                -webkit-animation-delay:-0.6s
                animation-delay:-0.6s
            .rect8
                -webkit-animation-delay:-0.5s
                animation-delay:-0.5s
            .rect9
                -webkit-animation-delay:-0.4s
                animation-delay:-0.4s
            .rect10
                -webkit-animation-delay:-0.3s
                animation-delay:-0.3s

@-webkit-keyframes stretchdelay{
    0%,40%,100%{-webkit-transform:scaleY(0.6)}
    20%{-webkit-transform:scaleY(1.0)}
}
@keyframes stretchdelay{
    0%,40%,100%{transform:scaleY(0.6);-webkit-transform:scaleY(0.6);}
    20%{transform:scaleY(1.0);-webkit-transform:scaleY(1.0);}
}
</style>
