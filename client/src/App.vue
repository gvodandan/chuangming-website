<template>
  <div id="app">
    <div class="loadingWrapper" ref="loadingWrapper">
      <img class="loadingIcon" :src="loadingSVG" alt="Loading" />
      <h1>Loading...</h1>
    </div>
    <div class="loadedWrapper" ref="loadedWrapper">
      <div class="navWrapper">
        <v-nav></v-nav>
      </div>
      <div class="sidebarWrapper">
        <v-sidebar></v-sidebar>
      </div>
      <div class="content" @click="closeMenu">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from '@/components/navigator/navigator';
  import sidebar from '@/components/sidebar/sidebar';
  import {checkBrowser} from './mixin/checkBrowser';


  export default {
    name: 'app',
    data() {
      return {
        loadingSVG: require('@/../static/loading/loading-cylon-red.svg')
      }
    },
    computed: {
      sidebarDisplay() {
        return this.$store.state.sidebarDisplay;
      }
    },
    methods: {
      closeMenu() {
        if (this.sidebarDisplay) {
          this.$store.commit('sidebarDisplay', false);
        }
      },
      judgeBrowser() {
        let browser = checkBrowser();
        if (browser === 'IE') {
          let app = this.$el;
          app.innerHTML = '';
          this.$alert('暂不支持IE10及IE10以下浏览器，建议使用Chrome获得最佳浏览体验哦。', '提示', {
            confirmButtonText: '我晓得了'
          });
        }
      },
      checkState() {
        return document.onreadystatechange = () => {
          if(document.readyState === 'complete') {
            setTimeout(() => this.setLoaded(), 2000);
          }
        }
      },
      setLoaded() {
        if (!this.$store.state.loaded) this.$store.commit('loaded', true);
        this.$refs.loadingWrapper.classList.add('animated', 'slideOutDown');
        this.$refs.loadedWrapper.style.display = 'block';
      }
    },
    mounted() {
      this.judgeBrowser();
      this.checkState();
    },
    components: {
      'v-nav': nav,
      'v-sidebar': sidebar
    }
  }
</script>

<style lang="stylus">
  $LoadingBG = #202c2f

  html, body
    margin 0
    padding 0
    width 100vw
    height 100vh
    min-width 512px
    min-height 512px
    overflow hidden
    font-size 18px
  #app
    width 100%
    height 100%
    .loadingWrapper
      display flex
      position absolute
      width 100%
      height 100%
      flex-flow column nowrap
      text-align center
      justify-content center
      z-index 9999
      background-color $LoadingBG
      .loadingIcon
        width 200px
        height 80px
        margin 0 auto
      h1
        font-size 90px
        line-height 80px
        color #fff
    .loadedWrapper
      display none
      width 100%
      height 100%
    .navWrapper
      position fixed
      width 100%
      min-width 512px
      height 60px
      top 0
      z-index 999
    .sidebarWrapper
      position fixed
      height 100%
      right 0
      box-shadow 0 0 1rem #424141
      z-index 999
      background-color #FFF
    .content
      width 100%
      height 100%
    .loading
      width 100%
      height 100%
      z-index 999
</style>
