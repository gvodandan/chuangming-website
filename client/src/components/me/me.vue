<template>
  <div class="me" v-if="isLogin">
    <div class="menu">
      <v-menu></v-menu>
    </div>
    <div class="panelWrapper">
      <div class="panel">

        <!-- 个人信息 -->
        <v-form-personal-panel v-if="menuIndex === 0"></v-form-personal-panel>

        <!-- 查看留言 -->
        <v-form-comments v-if="menuIndex === 1"></v-form-comments>

        <!-- 用户管理 -->
        <v-form-user-controller v-if="menuIndex === 2"></v-form-user-controller>

        <!-- 管理动态 -->
        <v-form-news-controller v-if="menuIndex === 3"></v-form-news-controller>

        <!-- 管理项目 -->
        <v-form-project-controller v-if="menuIndex === 4"></v-form-project-controller>

        <!-- 弹幕设置 -->
        <v-form-danmaku-configure v-if="menuIndex === 5"></v-form-danmaku-configure>

      </div>
    </div>
  </div>
</template>

<script>
  import {users_getOne} from "@/api.config";

  import Menu from './menu';
  import Form_personalPanel from './form_personalPanel';
  import Form_comments from './form_comments';
  import Form_userController from './form_userController';
  import Form_newsController from './form_newsController';
  import Form_projectController from './form_projectController';
  import Form_danmakuConfigure from './form_danmakuConfigure';

  export default {
    name: 'normalUser',
    data() {
      return {
        isLogin: false
      }
    },
    computed: {
      menuIndex() {
        return this.$store.state.mePageMenuIndex;
      },
      userLevel() {
        return this.$store.state.user[2];
      }
    },
    methods: {
      checkUser() {
        this.user = this.$store.state.user;
        // console.log('me=>user:' + this.user);
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            if (this.user[0] === '' || this.user[1] === '') {
              this.$router.go(-1);
              reject('no user');
            } else {
              resolve('success');
            }
          });
        });
      },
//      getUserData() {
//        this.axios.post(users_getOne, {
//          username: this.user[0],
//          password: this.user[1]
//        }).then(res => {
//          // console.log(res);
//          if (res.data.status === 'success') {
//            this.$store.dispatch('userData', res.data).then(() => this.isLogin = true);
//          } else {
//            this.$notify.warning('获取用户信息失败');
//          }
//
//        })
//      }
    },
    mounted() {
      this.$store.commit('navFontTransColor', true);
      this.checkUser().then(() => { this.isLogin = true; }).catch(e => console.log(e));
    },
    destroyed() {
      this.$store.commit('navFontTransColor', false);
    },
    components: {
      'v-menu': Menu,
      'v-form-personal-panel': Form_personalPanel,
      'v-form-comments': Form_comments,
      'v-form-user-controller': Form_userController,
      'v-form-news-controller': Form_newsController,
      'v-form-project-controller': Form_projectController,
      'v-form-danmaku-configure': Form_danmakuConfigure
    }
  }
</script>

<style lang="stylus" scoped>
  .me
    display flex
    flex-flow row nowrap
    width 100%
    height 100%
    .menu
      flex 0 0 200px
      height 100%
      padding-top 40px
    .panelWrapper
      flex 0 1 80%
      height 100%
      padding-top 20px
      overflow hidden
    .panel
      width calc(96% + 10px)
      height 85%
      padding 45px 50px 20px 50px
      overflow-Y scroll
      overflow-X hidden


</style>
