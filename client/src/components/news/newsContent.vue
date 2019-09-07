<template>
  <div class="contentWrapper">
    <article class="content" v-if="newsData!=null && yearIndex>=0 && articleIndex>=0">
      <div class="conPanel">
        <h1 class="articleTitle">{{ newsData[yearIndex][articleIndex].title }}</h1>
        <span class="articleDescrible">{{ newsData[yearIndex][articleIndex].description }}</span>
        <span class="articleAuthor">{{ newsData[yearIndex][articleIndex].author }}</span>
        <time class="articleDate">{{ newsData[yearIndex][articleIndex].date | moment }}</time>
      </div>
      <div class="conText" v-html="articleContent">
        <!--{{newsData[yearIndex][articleIndex].content}}-->
      </div>
    </article>
  </div>
</template>

<script>
  import moment from 'moment';

  let md = require('markdown-it');

  moment.locale('zh-cn');

  export default {
    name: 'newsContent',
    data() {
      return {
        articleContent: ''
      }
    },
    computed: {
      newsData() {
        return this.$store.state.newsPageData;
      },
      yearIndex() {
        return this.$store.state.newsPageYearIndex;
      },
      articleIndex() {
        return this.$store.state.newsPageArticleIndex;
      }
    },
    methods: {
      mdRender() { // 渲染内容
        this.articleContent = md().render(this.newsData[this.yearIndex][this.articleIndex].content);
      }
    },
    filters: {
      moment(date) {
        return moment(date).format('ll');
      }
    },
    updated() {
      this.mdRender();
    }
  }
</script>

<style lang="stylus" scoped>
  .contentWrapper
    width 100%
    height 100%
    padding-right 60px
    box-shadow 0 0 20px #C6C6C6
    overflow hidden
    background-color transparent

  .content
    width 100%
    height 100%
    padding 40px
    background-color #FFF
    overflow-Y scroll
    .conPanel
      width 100%
      border-radius 5px
      span
        display inline-block
        padding 10px
      .articleTitle
        display inline-block
        position absolute
        max-width 44%
        padding 15px 24px 15px 24px
        margin -70px 0 0 30px
        color #FFF
        font-weight 500
        white-space nowrap
        text-overflow ellipsis
        box-shadow 2px 5px 15px #C6C6C6
        background-color #DF8383
        overflow hidden
      .articleDescrible, .articleAuthor, .articleDate
        padding 20px
        color #C6C6C6
    .conText
      width 100%
      padding-bottom 256px
</style>
