<template>
  <div class="about">
    <transition name="scrollTach">
      <div class="pagesWrapper">
        <div class="pages">
          <div class="pageOneBg" :style="bgi.pageOne"></div>
          <div class="pageOne">
            <div class="someWords" :style="bgi.someWords"></div>
            <div class="more" :style="bgi.more" @click="scrollTach"></div>
          </div>
          <div class="pageTwo">
            <div class="wedo">
              <div class="wedoImg" :style="bgi.pageTwo.wedo"></div>
              <div class="wedoText">
                <p v-for="p in allText.wedoDescription">{{ p }}</p>
              </div>
            </div>
            <div class="groups">
              <div class="cate" :style="bgi.pageTwo.groups.qt">
                <div class="wrapper"></div>
                <div class="cateRows" :style="bgi.pageTwo.groups.textQt"></div>
                <div class="cateRows">
                  <p>{{ allText.groupsDescription.qt }}</p>
                </div>
                <div class="cateRows learnMore" @click="changeRouter('qt')" :style="bgi.pageTwo.groups.learnMore"></div>
              </div>
              <div class="cate" :style="bgi.pageTwo.groups.web">
                <div class="wrapper"></div>
                <div class="cateRows" :style="bgi.pageTwo.groups.textWeb"></div>
                <div class="cateRows">
                  <p>{{ allText.groupsDescription.web }}</p>
                </div>
                <div class="cateRows learnMore" @click="changeRouter('web')"
                     :style="bgi.pageTwo.groups.learnMore"></div>
              </div>
              <div class="cate" :style="bgi.pageTwo.groups.design">
                <div class="wrapper"></div>
                <div class="cateRows" :style="bgi.pageTwo.groups.textDesign"></div>
                <div class="cateRows">
                  <p>{{ allText.groupsDescription.design }}</p>
                </div>
                <div class="cateRows learnMore" @click="changeRouter('design')"
                     :style="bgi.pageTwo.groups.learnMore"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        bgi: {
          someWords: {
            backgroundImage: `url(${require('@/../static/about/create.png')})`
          },
          more: {
            backgroundImage: `url(${require('@/../static/about/more.png')})`
          },
          pageOne: {
            backgroundImage: `url(${require('@/../static/about/bg.jpg')})`
          },
          pageTwo: {
            wedo: {
              backgroundImage: `url(${require('@/../static/about/wedo.png')})`
            },
            groups: {
              qt: {
                backgroundImage: `url(${require('@/../static/about/bg_qt.jpg')})`
              },
              web: {
                backgroundImage: `url(${require('@/../static/about/bg_web.jpg')})`
              },
              design: {
                backgroundImage: `url(${require('@/../static/about/bg_design.jpg')})`
              },
              textQt: {
                backgroundImage: `url(${require('@/../static/about/qt.png')})`
              },
              textWeb: {
                backgroundImage: `url(${require('@/../static/about/web.png')})`
              },
              textDesign: {
                backgroundImage: `url(${require('@/../static/about/design.png')})`
              },
              learnMore: {
                backgroundImage: `url(${require('@/../static/about/learnmore.png')})`
              }
            }
          }
        },
        allText: { // 第二页的文字描述
          wedoDescription: [
            '我们在做什么',
            '？？？'
          ],
          groupsDescription: {
            qt: '这里是软件组',
            web: '这是网站组',
            design: '然后这是设计组'
          }
        },
      }
    },
    methods: {
      changeRouter(val) {
        this.leaveAnimations();
        setTimeout(() => {
          this.$router.push({path: '/members', query: {group: val}})
        }, 400);
      },
      scrollTach() {
        let scrollDiv = this.$el.querySelector('.pagesWrapper');
        let viewDiv = this.$el.querySelector('.pages');
        this.scrollAnimation();
        setTimeout(() => {
          scrollDiv.scrollTop = viewDiv.clientHeight / 2;
        }, 1000);
      },
      scrollAnimation() { // 点击more图标后进入第二页的动画
        let pageOneBg = this.$el.querySelector('.pageOneBg'),
          pageOne = this.$el.querySelector('.pageOne'),
          pageTwo = this.$el.querySelector('.pageTwo');
        pageOneBg.classList.add('animated', 'fadeOut');
        pageOne.classList.add('animated', 'fadeOutUp');
        pageTwo.classList.remove('animated', 'fadeInDown');
        setTimeout(() => {
          pageOne.classList.remove('animated', 'fadeOutUp');
          pageTwo.classList.add('animated', 'fadeInDown');
          setTimeout(() => {
            pageOneBg.classList.remove('animated', 'fadeOut');
          }, 1000);
        }, 1000);
      },
      someAnimations() { // 进页面的动画
        let about = this.$el,
          someWords = about.querySelector('.someWords'),
          more = about.querySelector('.more');
        about.classList.add('animated', 'fadeIn');
        someWords.classList.add('animated', 'slideInDown');
        more.classList.add('animated', 'slideInUp');
      },
      leaveAnimations() { // 点击learn more后触发的离开动画
        let about = this.$el;
        about.classList.add('animated', 'zoomOut');
      }
    },
    mounted() {
      this.someAnimations();
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .about
    width 100%
    height 100%
    overflow hidden
    .pagesWrapper
      width calc(100% + 17px)
      height 100%
      overflow-x hidden
      overflow-y scroll
      .pages
        display flex
        flex-flow column nowrap
        width 100%
        height 200%
        .pageOne, .pageTwo
          position relative
          flex 0 0 50%
          min-width 512px
        .pageOneBg
          position absolute
          width 100%
          height 100%
          filter blur(2px) brightness(66%)
          baseBgConfig()
        .pageOne
          position relative
          display flex
          flex-flow column nowrap
          justify-content space-around
          -vendor-animation-duration: 3s;
          -vendor-animation-delay: 2s;
          -vendor-animation-iteration-count: infinite;
          .someWords, .more
            position relative
            baseBgConfig()
          .someWords
            flex 0 0 500px
            width 100%
            height 200px
            min-width 428px
            background-size 768px 233px
          .more
            flex 0 0 50px
            width 100%
            height 50px
            margin-bottom 0
            cursor pointer
            background-size 35px 35px
            animation dynamic 1s infinite
            animation-direction alternate

        .pageTwo
          display flex
          flex-flow column nowrap
          background-color #FFF
          .wedo, .groups
            flex 0 0 50%
          .wedo
            display flex
            flex-flow column nowrap
            justify-content center
            .wedoImg, .wedoText
              flex 1 1 50%
            .wedoImg
              baseBgConfig()
              background-size 512px 148px
              background-position 50% 100%
            .wedoText
              max-height 312px
              text-align center
              font-size 20px
              font-weigth 500
              line-height 20px
              letter-spacing 2px
          .groups
            display flex
            flex-flow row nowrap
            .cate
              position relative
              flex 1 1 33.333%
              display flex
              flex-flow column nowrap
              baseBgConfig()
              .wrapper
                position absolute
                width 100%
                height 100%
                opacity 0.6
                filter contrast(45%)
                pointer-events none
                background-color #C6C6C6
              &:first-child > .wrapper, &:last-child > .wrapper
                background-color #017FF0
              .cateRows
                flex 1 1 120px
                font italic 500 18px / 70px arial, sans-serif
                color #FFF
                text-align center
                baseBgConfig()
                background-size 120px 50px
                z-index 10
              .learnMore
                cursor pointer
                background-size 200px 40px
                background-position 50% 15%
                animation default .5s ease
                &:hover
                  animation large .8s ease
                  animation-fill-mode forwards

  @keyframes dynamic
    from
      background-size 35px 35px
      background-position-y 0px
    to
      background-size 40px 40px
      background-position-y 20px

  @keyframes large
    from
      transform skew(0, 0)
      background-size 200px 40px
    to
      transform skew(-6deg, 2deg) translateY(-25px)
      background-size 220px 50px

  @keyframes default
    from
      transform skew(-6deg, 2deg) translateY(-25px)
      background-size 220px 50px
    to
      transform skew(0, 0)
      background-size 200px 40px

</style>
