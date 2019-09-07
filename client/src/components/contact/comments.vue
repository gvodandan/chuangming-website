<template>
  <div class="commentsWrapper">
    <div class="comments">
      <v-switch class="switch"></v-switch>
      <div class="contents">
        <div class="contentPanel" v-for="comment in commentsData">
          <div class="conText">
            <p>
              <span class="name">{{ comment.name }}</span>
              <span class="sex" :style="comment.sex==='male'?bgi.userSex.male:bgi.userSex.female"></span>
              <span class="date">{{ comment.date | moment }}</span>
            </p>
            <p><span class="text">{{ comment.text }}</span></p>
          </div>
          <div class="replyText" v-for="reply in comment.reply">
            <span>{{ reply.name }}</span>
            <span>{{ reply.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import {contact_getComments} from '@/api.config';

  import Switch from './switch';

  moment.locale('zh-cn');

  export default {
    name: "comments",
    data() {
      return {
        bgi: {
          userSex: {
            male: {
              backgroundImage: `url(${require('@/../static/contact/male.png')})`
            },
            female: {
              backgroundImage: `url(${require('@/../static/contact/female.png')})`
            }
          }
        }
      }
    },
    computed: {
      commentsData() {
        return this.$store.state.contactPageCommentsData;
      }
    },
    methods: {
      someAnimation() {
        let contents = this.$el.querySelector('.contents');
        contents.classList.add('animated', 'slideInUp');
      },
    },
    filters: {
      moment: (date) => {
        let _date = new Date(),
          today = `${_date.getFullYear()}-${(_date.getMonth() + 1).toString().padStart(2, '0')}-${_date.getDate().toString().padStart(2, '0')}`;
        return today === date ? '今天' : moment(date).from(today);
      }
    },
    mounted() {
      this.someAnimation();
    },
    components: {
      'v-switch': Switch
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/contactUs/switch.stylus'

  .commentsWrapper
    width 100%
    height 100%
    overflow hidden

  .comments
    width calc(100% + 17px)
    height 100%
    overflow-Y scroll
    background-color #D8E1E9
    .switch
      position absolute
      top 0
      margin 50px 0 0 20px
      switchConfig()
    .contents
      width 90%
      height 100%
      margin 0 auto
      .contentPanel
        min-height 120px
        margin 80px 40px 0 40px
        padding 20px 60px 20px 60px
        background-color #FFF
        border-radius 5px
        box-shadow 2px 5px 45px #B7C3D4
        &:last-child
          margin-bottom 400px
        .conText
          border-bottom 1px solid lightgray
          .name
            font-size 18px
            font-weight 600
          .sex
            display inline-block
            width 20px
            height 20px
            vertical-align bottom
            margin-left 5px
            background-size 100% 100%
          .date
            float right
            color #97999C
          .text
            display inline-block
            padding 5px 0 10px 0
            line-height 30px
            color #97999C
        .replyText
          display flex
          flex-flow row nowrap
          margin 15px 0 15px 0
          line-height 20px
          & span:first-child
            display inline-block
            flex 1 0 30%
            padding 10px 10px 0 10px
            text-align right
            font-size 15px
          & span:last-child
            display inline-block
            flex 1 1 70%
            padding 10px 0 0 10px
            color #97999C
</style>
