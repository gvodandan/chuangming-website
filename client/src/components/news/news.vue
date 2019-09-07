<template>
  <div class="news">
    <div class="timelineWrapper">
      <v-timeline ref="timeline"></v-timeline>
    </div>
    <div class="newsContentWrapper">
      <v-newsContent></v-newsContent>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
  import {news_get} from "../../api.config";

  import Timeline from './timeline';
  import NewsContent from './newsContent';

  export default {
    data() {
      return {}
    },
    methods: {
      someAnimations() {
        let news = this.$el;
        news.classList.add('animated', 'fadeIn');
        this.$nextTick(() => {
          this.$refs.timeline.$el.classList.add('animated', 'slideInUp');
        });
      },
      getData() {
        if (!this.$store.state.newsPageData) {
          let data;
          this.axios.get(news_get).then(res => {
            data = res.data.news;
            for (let year in data) {
              data[year].sort((a, b) => Number.parseInt(b.date) - Number.parseInt(a.date));
            }
            // console.log(data);
          }).then(() => this.$store.commit('newsPageData', data));
        }
      }
    },
    mounted() {
      this.$store.commit('navFontTransColor', true);
      this.getData();
      this.someAnimations();
    },
    destroyed() {
      this.$store.commit('navFontTransColor', false);
    },
    components: {
      'v-timeline': Timeline,
      'v-newsContent': NewsContent
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .news
    display flex
    flex-flow row nowrap
    width 100%
    height 100%
    padding-top 60px
    background-color #DDE4E5
    .timelineWrapper
      flex 0 0 23%
      min-width 256px
    .newsContentWrapper
      flex 1 1 65%
      min-width 256px
    .space
      flex 0 0 12%

  @keyframes enter
    from
      opacity 0.2
    to
      opacity 1

  @keyframes leave
    from
      opacity 1
    to
      opacity 0.2
</style>
