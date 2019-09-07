<template>
  <div class="pwork">
    <div class="projects" :style="bgi.probg">
      <div class="pro_content">
        <div class="pro_content_work" ref="work" :style="bgi.prowork"></div>
        <div class="pro_content_carousel" ref="carousel" v-show="projects !== null">
          <el-carousel :interval="4000" type="card" height="480px">
            <el-carousel-item v-for="item in projects" :key="item._id">
              <div class="pro_content_img" :style="{ backgroundImage: `url(${item.project_img})` }"
                   @click="turnOn(item._id)"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <transition name='fade'>
      <div class="mask" v-if="show" @click="turnOff()">
        <div class="pro_click">
          <div class="click_left" ref="left" :style="{ backgroundImage: `url(${projects[proid].project_img})` }"></div>
          <div class="click_right" ref="right" @click="preventDefault($event)">
            <div class="right_title">
              <p>{{ projects[proid].title }}</p>
            </div>
            <div class="right_essay">
              <p>{{ projects[proid].link }}</p>
              <p>{{ projects[proid].author }}</p>
              <p>{{ projects[proid].about }}</p>
              <p>{{ projects[proid].date | moment }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {projects_get} from "../../api.config";

  import moment from 'moment';

  moment.locale('zh-cn');

  export default {
    data() {
      return {
        bgi: {
          probg: {
            backgroundImage: `url(${require('@/../static/projects/bg.jpg')})`
          },
          prowork: {
            backgroundImage: `url(${require('@/../static/projects/work.png')})`
          }
        },
        projects: null,
        show: false,
        proid: ""
      }
    },
    computed: {
      projectsData() {
        return this.$store.state.projectPageData;
      }
    },
    methods: {
      turnOn(id) {
        this.proid = this.projects.findIndex(p => p._id === id);
        this.show = true;
      },
      turnOff() {
        this.show = false
      },
      preventDefault(event) {
        event.stopPropagation();
      },
      someAnimations() {
        let pwork = this.$el;
        pwork.classList.add('animated', 'fadeIn');
        this.$nextTick(() => {
          this.$refs.work.classList.add('animated', 'zoomIn');
          this.$refs.carousel.classList.add('animated', 'slideInDown');
        });
      },
      getProjectsData() {
        if (this.projectsData !== null) return this.projects = this.projectsData;
        this.axios.get(projects_get).then(res => {
          // console.log('res', res.data.projects);
          if (res.data.status === 'success') {
            this.$store.commit('projectPageData', res.data.projects);
          } else {
            this.$message.error(res.data.alert ? res.data.alert : '估计服务器崩了...');
          }
        }).then(() => this.projects = this.projectsData);// .then(() => console.log('projects:', this.projects));
      }
    },
    filters: {
      moment() {
        return moment().format('ll');
      }
    },
    mounted() {
      this.getProjectsData();
      this.someAnimations();
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  @keyframes fadeIn {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  $maskcolor = rgb(232, 232, 232)

  .pwork
    height 100%
    width 100%
    .projects
      width: 100%
      height: 100%
      baseBgConfig()
      display flex
      flex-flow column
      justify-content center
      .pro_content
        flex 0 1 auto
        display flex
        flex-flow column
        width 85%
        height 650px
        margin 0 auto
        .pro_content_work
          min-height 100px
          baseBgConfig()
          margin-top 20px
          background-size 360px 70px
        .pro_content_carousel
          margin 35px 50px 0px 50px
          overflow hidden
          .pro_content_img
            width 100%
            height 100%
            baseBgConfig()
    .mask
      position fixed
      display flex
      flex-flow row nowrap
      top 0
      bottom 0
      right 0
      left 0
      z-index 10
      background rgba(0, 0, 0, 0.76)
      color $maskcolor
      .pro_click
        flex 1 0 33%
        display flex
        flex-flow column nowrap
        justify-content center
        align-items center
        min-wdith 256px
        max-width 512px
        height 100%
        margin 0 auto
        .click_left
          flex 1 0 428px
          width 100%
          max-height 628px
          margin-top 50px
          baseBgConfig()
          background-color transparent
          background-size cover
        .click_right
          flex 1 0 180px
          width 100%
          max-height 256px
          display flex
          flex-direction column
          justify-content space-around
          .right_title
            width 100%
            height 60px
            font-size 20px
            letter-spacing 5px
            line-height 50px
            text-align center
            vertical-align bottom
          .right_essay
            width 80%
            min-height 120px
            line-height 12px
            overflow hidden
            margin 0 auto
            text-overflow ellipsis

  .fade-enter-active, .fade-leave-active
    transition: opacity 0.5s

  .fade-enter, .fade-leave-to
    opacity: 0

</style>
