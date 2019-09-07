<template>
  <div class="newsMenu">
    <div class="yearSelector">
      <el-select v-model="yearIndex">
        <el-option v-for="item in this.years" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <ul class="timeline" v-if="newsData !== null"> <!-- 等待获取数据后加载 -->
      <li v-for="(article, index) in newsData[yearIndex]"
          :style="{
            backgroundColor: pointColors[~~(Math.random()*10)%pointColors.length]
            }" @click="timePointClick(index)">
        <span :class="index===articleIndex?'titleFocus':''">{{ article.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'timeline',
    data() {
      return {
        screenHeight: document.body.clientHeight,
        years: [],
        yearIndex: 0,
        pointColors: [ // 时间点的颜色
          'purple',
          'skyblue',
          'khaki',
          '#DF8383',
          'lightgray',
        ]
      }
    },
    computed: {
      newsData() {
        return this.$store.state.newsPageData;
      },
      articleIndex() {
        return this.$store.state.newsPageArticleIndex;
      }
    },
    watch: {
      newsData() { // 获取到news数据就开始设置年份选择
        this.yearInit();
      },
      yearIndex(val) { //
        this.$store.commit('newsPageYearIndex', val);
      }
    },
    methods: {
      yearInit() { // 初始化选择的年份
        for (let year in this.newsData)
          this.years.push(year);
        this.years.sort((a, b) => b - a);
        this.yearIndex = this.years[0];
      },
      setTimePointPosition() { // 时间点位置
        if (this.newsData === null || this.articleIndex < 0) return;
        // 数据加载完才能继续
        this.timeline = this.$el.querySelector('.timeline');
        let timeNodes = this.timeline.childNodes,
          maxHeight = this.screenHeight - this.timeline.offsetTop - 100; // -100 以保证底部留空
        Array.from(timeNodes).map((node, index) => {
          node.style.marginTop = `${index / (timeNodes.length + 0.5) * maxHeight}px`; // +0.5以获得更nice的位置
        });
      },
      throttle(fn) { // 去抖
        clearTimeout(fn.body);
        fn.body = setTimeout(() => {
          fn();
        }, 400);
      },
      onResize() { // 改变窗口高度时，重设时间轴上时间点的位置
        this.screenHeight = document.body.clientHeight;
        this.setTimePointPosition();
      },
      timePointClick(index) { // 点击对应的时间点
        this.$store.commit('newsPageArticleIndex', index);
      }
    },
    mounted() {
      window.onresize = () => this.throttle(this.onResize);
      this.yearInit();
    },
    updated() {
      this.setTimePointPosition();
    }
  }
</script>

<style lang="stylus" scoped>
  .newsMenu
    width 100%
    height 100%
    margin-top 25px
    text-align center
    .yearSelector
      font-size 25px
    .timeline
      display inline-block
      list-style-type none
      height 100%
      margin-top 0
      padding-top 20px
      border-left 3px solid #B1C6CA
      li
        display inline-block
        float left
        width 15px
        height 15px
        margin-left -49px
        border-radius 50%
        cursor pointer
        span
          position absolute
          display inline-block
          height 15px
          max-width 120px
          margin-left 15px
          line-height 15px
          white-space nowrap
          text-align left
          text-overflow ellipsis
          overflow hidden
          font-size 14px
          cursor pointer
          opacity 0.1
          animation leave .8s ease
          &:hover
            animation enter .5s ease
            animation-fill-mode forwards
        .titleFocus
          opacity 0.7 !important
          animation none
          &:hover
            animation none

  @keyframes enter
    from
      opacity 0.1
    to
      opacity 0.7

  @keyframes leave
    from
      opacity 0.7
    to
      opacity 0.1


</style>
