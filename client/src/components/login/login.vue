<template>
  <div class="login">
    <div class="loginWrapper" :style="bgi.loginBg"></div>
    <div class="loginPanel">
      <div class="loginImg" :style="bgi.loginImg"></div>
      <div class="loginCheck" @keyup.enter="submitLoginData">
        <input class="checkBox" @change="checked(0)" v-model="login.inputsValue[0]" type="text" maxlength="16"
               placeholder="username" autofocus>
        <input class="checkBox" @change="checked(1)" v-model="login.inputsValue[1]" type="password" maxlength="16"
               placeholder="password">
      </div>
      <div class="loginSubmit" :style="bgi.loginSubmit" @click="submitLoginData"></div>
    </div>
  </div>
</template>

<script>
  import {users_check} from '@/api.config.js';

  export default {
    data() {
      return {
        login: {
          inputsValue: ['', '', '0'], // 账号 密码 等级
          inputsState: [false, false]
        },
        bgi: {
          loginBg: {
            backgroundImage: `url(${require('@/../static/login/bg_login.jpg')})`
          },
          loginImg: {
            backgroundImage: `url(${require('@/../static/login/login.png')})`
          },
          loginSubmit: {
            backgroundImage: `url(${require('@/../static/login/submit.png')})`
          }
        }
      }
    },
    methods: {
      checked(index) { // 输入验证
        let checkBox = document.querySelectorAll('.checkBox'),
          res = this.login.inputsValue[index].match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,16}$/); // 匹配中英文和数字
        checkBox[index].style.backgroundColor = res ? '#67C23A' : '#FA5555';
        this.login.inputsState[index] = res ? true : false;
      },
      submitLoginData() { // 登录

        let state = this.login.inputsState;
        if (state.every(x => x === true)) { // 通过输入验证

          //发送ajax
          this.axios.post(users_check, {
            username: this.login.inputsValue[0],
            password: this.login.inputsValue[1]
          }).then(async res => { // 验证账号密码
            let data = res.data;
            if (data.status === 'success') {

              if (data.check === 'true') {
                // console.log('data:', data);
                // 登录成功
                this.login.inputsValue[2] = data.level;

                // 存到vuex
                this.$store.dispatch('user', this.login.inputsValue)
                  .then(() => { this.$store.commit('userData', res.data); })
                  .then(async () => {
                    await this.$store.dispatch('currentRoute', 'me').then(() => this.$router.push('me')); // 切路由
                  })
                  .then(() => { this.$notify.success({title: '登录成功'}); });

              }

            } else {
              data.check === 'false' ? this.$notify.error({
                title: '登陆失败',
                message: '账号密码错误'
              }) : this.$notify.error({title: '登陆失败', message: '请求失败'});
            }
          })


        }
        else {
          this.$notify({
            title: '警告',
            message: '输入不规范，请重试',
            type: 'warning'
          })
        }
      },
      someAnimations() {
        let login = this.$el,
          loginImg = this.$el.querySelector('.loginImg'),
          loginCheck = this.$el.querySelector('.loginCheck'),
          loginSubmit = this.$el.querySelector('.loginSubmit');
        login.classList.add('animated', 'fadeIn');
        loginImg.classList.add('animated', 'fadeInDown');
        loginCheck.classList.add('animated', 'flipInX');
        loginSubmit.classList.add('animated', 'fadeInUp');
      }
    },
    mounted() {
      this.someAnimations();
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .login
    width 100%
    height 100%
    .loginWrapper
      position absolute
      width 100%
      height 100%
      filter brightness(66%) contrast(70%)
      baseBgConfig()
      background-color #D6D6D6
    .loginPanel
      display flex
      flex-flow column nowrap
      justify-content center
      width 100%
      height 100%
      .loginImg, .loginCheck, .loginSubmit
        flex 0 1 200px
        width 32%
        min-width 378px
        margin 0 auto
        baseBgConfig()
        z-index 10
      .loginImg
        background-size 256px 60%
        background-position 50% 25%
      .loginCheck
        display flex
        flex-flow column nowrap
        justify-content space-around
        min-height 198px
        .checkBox
          flex 0 1 60px
          width calc(100% - 50px)
          padding 0 25px 0 25px
          color #FFF
          opacity 0.8
          border 0
          border-radius 5px
          outline none
          background-color #707070
          cursor auto
          &::placeholder
            font-size 26px
            color #FFF
            text-align center
            opacity 0.8
      .loginSubmit
        cursor pointer
        background-size 65px 65px
        background-position 48% 50%
</style>
