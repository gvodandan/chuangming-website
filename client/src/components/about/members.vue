<template>
  <div class="members">
    <div class="title" v-show="!titleHidden" ref="title"
         :style="currentGroup==='web'?bgi.title.web:currentGroup==='design'?bgi.title.design:bgi.title.qt">
    </div>
    <div class="transition" :style="bgi.transition" @click="showMembers()"></div>
    <div class="individuals" v-if="members !== null">
      <div class="member" v-for="m in currentGroup==='web'?members.web:currentGroup==='qt'?members.qt:members.design">

        <div class="pers" :style="{ backgroundImage: `url(${m.profile_picture || defaultPicture})` }">
          <span class="label">{{ m.label }}</span>
        </div>
        <span class="name">{{ m.name }}</span>

      </div>
    </div>
  </div>
</template>

<script>
  import {member_getMembers} from '@/api.config';

  const profile_picture_default_img = require('@/../static/about/members/t.png');

  export default {
    data() {
      return {
        bgi: {
          title: { // 三个组的图
            qt: {backgroundImage: `url(${require('@/../static/about/members/qt.png')})`},
            web: {backgroundImage: `url(${require('@/../static/about/members/web.png')})`},
            design: {backgroundImage: `url(${require('@/../static/about/members/design.png')})`},
          },
          transition: {
            backgroundImage: `url(${require('@/../static/about/members/members.png')})`
          },
          member: {
            // backgroundImage: `url(${require('@/../static/about/members/test.png')})`
          }
        },
        titleHidden: false,
        defaultPicture: profile_picture_default_img, // 默认头像
        currentGroup: null, //选择的组别
        members: null, // 存成员信息
      }
    },
    methods: {
      someAnimation() {
        const members = this.$el;
        members.classList.add('animated', 'slideInDown');
      },
      getMembers() { // 获取数据
        let membersData = this.$store.state.members;
        if(membersData !== null) return this.members = membersData;
        this.axios.get(member_getMembers).then(res => {
          if (res.data.status === 'success') {
            this.$store.dispatch('members', res.data.members).then(() => this.members = res.data.members);
          } else {
            this.$message.error(res.data.alert ? res.data.alert : '获取成员失败...');
          }
        })
      },
      lockMembers() { // 展开Members
        const page = this.$el;
        const title = this.$el.querySelector('.title');
        const midPos = this.$el.querySelector('.transition').offsetTop;
        page.addEventListener('scroll', () => {
          if (midPos - page.scrollTop <= 0) {
            title.style.display = 'none';
          }
        });
      },
      showMembers() { // 动画过渡
        this.$el.classList.add('animated', 'slideOutUp');
        setTimeout(() => {
          this.$el.querySelector('.title').style.display = 'none';
          setTimeout(() => {
            this.$el.classList.remove('animated', 'slideOutUp');
            this.$el.classList.add('animated', 'slideInDown');
          }, 200);
        }, 300);
      }
    },
    created() {
      this.getMembers();
    },
    mounted() {
      this.currentGroup = this.$route.query.group;
      this.someAnimation();
      this.lockMembers();
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .members
    display flex
    flex-flow column nowrap
    width calc(100% + 17px)
    height 100%
    overflow-Y scroll
    overflow-X hidden
    .title, .transition, .individual
      flex 1 1 auto
      baseBgConfig()
      z-index 10
    .title
      position relative
      flex 0 0 50%
      max-height calc(100% - 80px)
      background-position cover;
    .transition
      flex 0 0 80px
      background-size 200px 50px
      background-color #A0A0A0
      cursor pointer
    .individuals
      flex 1 1 50%
      display flex
      flex-flow row wrap
      align-content flex-start
      width calc(100% + 17px)
      overflow-Y scroll
      overflow-X hidden
      .member
        $labelColor = #C6C6C6
        flex 1 0 20%
        display flex
        flex-flow column nowrap
        justify-content center
        min-width 268px
        max-width 388px
        .shadow
          display inline-block
        .pers, .name
          margin 0 auto
          transition all .5s
        .name
          transition all .3s
        .pers
          position relative
          flex 0 0 232px
          width 66%
          color $labelColor
          border-color $labelColor
          cursor pointer
          baseBgConfig()
          background-size 200px 200px
          background-position 50% 100%
        .pers:hover
          color #dd6161
          border-color #dd6161
          background-size 220px 220px
        .name:hover
          font-size 20px
          color #dd6161
          background-color: #e9e9eb;

          .tip
            position absolute
            display inline-block
            width 80%
            height 50%
            margin 25% 0 0 10%
            opacity 0
        .label
          position absolute
          height 25px
          top 15%
          right -2%
          padding 0 5px 0 5px
          font-size 14px
          font-weight 600
          color inherit
          text-align center
          line-height 25px
          border 2px solid
          border-color inherit
          border-radius 20px
        .name
          $nameHeight = 50px
          $bgColor = #ECECEC

          flex 0 0 $nameHeight
          width 66%
          margin 0 auto 30px auto
          line-height $nameHeight
          text-align center
          background-color $bgColor

  .hide-leave-active
    transition transform 2s ease

  .hide-leave-to
    transform translateY(-100%)


</style>
