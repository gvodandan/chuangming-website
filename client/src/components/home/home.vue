<template>
  <div class="home" :style="bgi.home">
    <div class="middle">
      <div class="midText" ref="midText" :style="bgi.midText"></div>
      <div class="midButtons" ref="midButtons">
        <el-button class="midButton" :style="bgi.midButtonAbout" @click="changeRouter('about')" plain round></el-button>
        <el-button class="midButton" :style="bgi.midButtonProjects" @click="changeRouter('projects')" plain
                   round></el-button>
      </div>
    </div>
    <div class="danmaku" v-if="danmaku.length > 0">
      <span v-for="(dm, index) in danmaku" ref="span">{{dm.context}}</span>
    </div>
  </div>
</template>

<script>
  import {index_getDanmaku} from '@/api.config.js';

  export default {
    data() {
      return {
        bgi: {
          home: {
            backgroundImage: `url(${require('@/../static/home/bg.png')})`
          },
          midText: {
            backgroundImage: `url(${require('@/../static/home/family.png')})`
          },
          midButtonAbout: {
            backgroundImage: `url(${require('@/../static/home/about.png')})`
          },
          midButtonProjects: {
            backgroundImage: `url(${require('@/../static/home/works.png')})`
          }
        },
        danmaku: [], // 弹幕
        shootDanmaku: false
      }
    },
    methods: {
      changeRouter(val) {
        this.$router.push(val);
        this.$store.commit('currentRoute', val);
      },
      someAnimations() { // 动画
        let home = this.$el,
          loaded = this.$store.state.loaded;
        home.classList.add('animated', loaded ? 'fadeIn' : 'slideInDown');

        let midButtons = this.$refs.midButtons.children;
        this.$refs.midText.classList.add('animated', 'rollIn');
        midButtons[0].classList.add('animated', 'slideInLeft');
        midButtons[1].classList.add('animated', 'slideInRight');

      },

      // 弹幕  - 原 JS 定时器实现
//      shoot() { // 发射弹幕
//        let spans = this.$el.querySelectorAll('.danmaku span'),
//          timeSpace = 10, // 小于16.7就都一样（requestAnimationFrame）
//          speed = 1, // 每次移动距离
//          left = document.body.clientWidth, // px
//          top = 15; // 百分比
//        Array.from(spans).map((x, i) => {
//          let setFunc = (_speed, space) => {
//            setTimeout(() => {
//              this.initSpan(x, left, top + (7 * i) % 65 + 10);
//              this.moveSpan(x, _speed, timeSpace);
//            }, space * 500);
//          };
//          i === spans.length - 1 ? setFunc(speed * 8, 40) : setFunc(speed, i); // 最后位置上的弹幕速度加快
//        });
//      },
//      initSpan(node, left, top) { // 初始化spanNode位置
//        node.style.left = left + Math.random() * 50 ** 2 + 'px';
//        node.style.top = top + '%';
//        node.style.display = 'inline';
//      },
//      moveSpan(node, speed, timeSpace) { // 给span添加定时器
//        let func = () => {
//          let val = Number.parseInt(node.style.left);
//          if (val < -(30 * node.textContent.length)) { // 超过一定长度就移除
//            clearInterval(move);
//            node.parentNode.removeChild(node);
//          } else {
//            return window.requestAnimationFrame(() => { node.style.left = val - speed + 'px' });
//          }
//        };
//        let move = setInterval(func, timeSpace);
//      },

      // 弹幕  - 改用CSS3实现
      shoot() { // 发射弹幕
        let spans = this.$el.querySelectorAll('.danmaku span'),
          distance = window.outerWidth,
          time = 35, // 弹幕移动速度（即存在时间）
          left = distance, // px
          top = 15; // 百分比
        Array.from(spans).map((x, i) => {
          let setFunc = (_speed, space) => {
            let _data = this.initSpan(x, left, top + (7 * i) % 65 + 10);
            this.moveSpan(x, i, _data.distance, (_data.percent + 1) * _speed);
          };
          i === spans.length - 1 ? setFunc(time / 3, 3 * i) : setFunc(time, i); // 最后位置上的弹幕速度加快
        });
      },
      initSpan(node, left, top) { // 初始化spanNode位置
        let randomDistance = Math.random() * 50 ** 2;
        node.style.left = left + randomDistance + 'px';
        node.style.top = top + '%';
        node.style.display = 'inline';
        let distance = left + randomDistance + 2 * node.clientWidth;
        let percent = ( randomDistance + node.clientWidth ) / distance;
        return {
          distance: distance,
          percent: percent
        }
      },
      moveSpan(node, index, distance, time) { // 设置 transform translate
        let style = document.createElement('style');
        let keyFrames = `
          @keyframes scroll_right_to_left_${index} {
            100% { transform: translateX(${-distance}px) }
          }
        `;
        style.type = 'text/css';
        style.innerHTML = keyFrames;
        document.head.appendChild(style);
        node.style.animation = `scroll_right_to_left_${index} ${time}s linear forwards`;
      },
      getDanmaku() { // 拿到弹幕
        return this.axios.get(index_getDanmaku).then(res => {
          if (res.data.status === 'success') {
            this.danmaku = res.data.danmaku;
          }
        });
      }
    },
    watch: {
      shootDanmaku(val) {
        if (val === true) {
          console.log(Date());
          this.getDanmaku().then(() => this.$nextTick(() => {
            this.shoot()
          }));
        }
      }
    },
    mounted() {
      this.shootDanmaku = Math.random() > 0.8; // 发射弹幕概率0.2
      this.someAnimations();
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .home
    display flex
    flex-flow column nowrap
    justify-content center
    width 100%
    height 100%
    baseBgConfig()
    .middle
      flex 0 1 233px
      display flex
      flex-flow column nowrap
      width 468px
      margin 0 auto
      z-index 999
      .midText
        flex 1 1 135px
        baseBgConfig()
        background-position 50% 25%
        background-size: 100% 33%
      .midButtons
        flex 0 1 85px
        text-align center
        line-height 85px
        .midButton
          width 130px
          height 40px
          margin 0 25px 0 25px
          baseBgConfig()
          background-color transparent
    .danmaku
      position absolute
      width 100%
      height 100%
      opacity 0.6
      overflow hidden
      span
        position absolute
        display none
        white-space nowrap
        font-size 25px
        cursor default
</style>
