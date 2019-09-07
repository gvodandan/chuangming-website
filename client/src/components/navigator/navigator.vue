<template>
  <nav class="nav">
    <div class="navLeft">
      <a class="navFun logo_hoverd" :style="img.logo" @click="changeRouter('/')"></a>
    </div>
    <div class="navRight">
      <a class="navFun funInit">login</a>
      <a class="navFun funCopy" :style="{ color: funColor?colorConfig.reverseFontColor:colorConfig.initFontColor }"
         @click="changeRouter('login')">login</a>
      <a class="navFun funInit">menu</a>
      <a class="navFun funCopy" :style="{ color: funColor?colorConfig.reverseFontColor:colorConfig.initFontColor }"
         @click="dispatchDisplay">menu</a>
      <a class="navFun" :style="img.menu" @click="dispatchDisplay"></a>
    </div>
  </nav>
</template>

<script>

  export default {
    name: 'navigator',
    data() {
      return {
        img: {
          logo: {
            backgroundImage: "url(" + require('@/../static/nav/logo.png') + ")"
          },
          menu: {
            backgroundImage: "url(" + require('@/../static/nav/menu.png') + ")"
          }
        },
        colorConfig: { // 导航栏上的字体颜色
          initFontColor: '#FFF', // 默认颜色
          reverseFontColor: '#C0C0C0', // 翻转颜色
        }
      }
    },
    computed: {
      funColor() {
        return this.$store.state.navFontTransColor;
      }
    },
    methods: {
      changeRouter(val) { // 改变路由
        this.$router.push(val);
      },
      dispatchDisplay() { // 侧栏
        this.$store.dispatch('sidebarDisplay', true);
      }
    }
  }
</script>

<style lang="stylus" scoped>

  $fontSize = 20px

  .nav
    width 100%
    height 50px
    padding 10px 0 0 0
    .navFun
      display inline-block
      width 60px
      height 50px
      line-height 48px
      font-size 20px
      text-align center
      vertical-align middle
    .navLeft, .navRight
      min-width 60px
      height 60px
    .navLeft
      float left
      .navFun
        width 50px
        height 50px
        margin-left 25px
        background-position: 0 0
        background-size 100% 100%
        background-repeat no-repeat
      .logo_hoverd:hover
        opacity: 0.7;
        transform: scale(0.8);
        transition: 0.4s;
        transition-timing-function: linear;
    .navRight
      float right
      margin-right 20px
      font-size $fontSize
      .navFun
        position absolute
        &:first-child, &:nth-child(2)
          right 150px
        &:nth-child(3), &:nth-child(4)
          right 80px
      .navFun:last-child
        right 10px
        background-position: 17px 12px
        background-size 26px 26px
        background-repeat no-repeat
      .funInit
        color #2554A0
      .funCopy:hover
        transform scale(1.5, 1.5)
        transition 0.4s ease
        opacity 0

  a
    text-decoration none
    &:link, &:visited, &:active, &:hover
      color #FFF
    cursor pointer
</style>
