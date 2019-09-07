<template>
  <div class="form">
    <v-switch class="switch"></v-switch>
    <div class="contactImg" :style="contactImg" ref="contactImg"></div>
    <el-form class="ruleForm" width="100%" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-position="left"
             label-width="50px">

      <el-form-item label="姓名" prop="name" style="width: 50%; font-weight: 700">
        <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder="Name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex" style="width: 50%; font-weight: 700;">
        <el-radio v-model="ruleForm.sex" label="male" style="margin-left: 10px">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="female">女</el-radio>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" style="width: 90%; font-weight: 700;">
        <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="E-mail"></el-input>
      </el-form-item>

      <el-form-item label="留言" prop="text" style="width: 90%; height: 105px; font-weight: 700;">
        <el-input type="textarea" resize="none" :rows="4" :maxlength="255" v-model="ruleForm.text"
                  placeholder="Message"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button round :disabled="submitState" :type="submitButton?'success':'primary'"
                   @click="submitForm('ruleForm')" class="btn">提交
        </el-button>

        <el-button round @click="resetForm('ruleForm')" class="btn">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {contact_addComments} from "../../api.config";

  import {BaiduMap, BmMarker, BmLabel} from 'vue-baidu-map';
  import Switch from './switch';

  export default {
    name: 'msgForm',
    data() {
      let checkName = (rule, value, callback) => {
        let res = value.match(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_-]){1,20}$/);
        if (!res) {
          callback(new Error('这是什么哦'));
        }
        else {
          callback();
        }
      };
      let checkEmail = (rule, value, callback) => {
        let res = value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        if (!res) {
          callback(new Error('这怕不是个邮箱吧'))
        }
        else {
          callback();
        }
      };
      let checkMessage = (rule, value, callback) => {
        if (!value) {
          callback(new Error('不能是空的'));
        }
        else {
          callback();
        }
      };
      return {
        contactImg: {
          backgroundImage: `url(${require('@/../static/contact/contact.png')})`
        },
        ruleForm: { // 三个输入框
          name: '',
          sex: 'male',
          email: '',
          text: ''
        },
        rules: {
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          text: [
            {validator: checkMessage, trigger: 'blur'}
          ]
        },
        submitButton: false, // 控制提交按钮的颜色
        submitState: false // 是否已经提交
      }
    },
    methods: {
      submitForm(formName) { // 提交事件
        // console.log(this.$store.state.contactPageCommentsData);
        this.$refs[formName].validate((valid) => {
          if (valid) { // successful
            this.axios.post(contact_addComments, Object.assign({}, this.ruleForm)).then(res => {
              if (res.data.status === 'success') {
                this.$notify({
                  title: '留言成功！',
                  message: '留言成功！',
                  type: 'success'
                });
                let comments = this.$store.state.contactPageCommentsData,
                  obj = Object.assign({}, this.ruleForm),
                  date = new Date();
                obj.comment_id = (comments.reduce((a, b) => +a.comment_id > +b.comment_id ? +a.comment_id : +b.comment_id) + 1).toString();
                obj.date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                obj.reply = [];
                comments.push(Object.assign({}, obj));
                this.$store.dispatch('contactPageCommentsData', comments).then(() => {
                  this.submitButton = !this.submitButton;
                  this.submitState = !this.submitState;
                });
              } else {
                this.$notify({
                  title: '留言失败',
                  message: '服务器开小差了！',
                  type: 'error'
                });
              }
            });

            // todoAjax

          } else { // failed
            this.$notify({
              title: '输入有误',
              message: '我觉得不行，请重试',
              type: 'warning'
            });
            return false;
          }
        });
      },
      resetForm(formName) { // 表单重置
        this.$refs[formName].resetFields();
      },
      someAnimations() { // 动画
        this.$nextTick(() => {
          this.$refs.contactImg.classList.add('animated', 'bounceIn');
        });
      }
    },
    mounted() {
      this.someAnimations();
    },
    components: {
      'v-switch': Switch
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'
  @import '../../mixin/contactUs/switch.stylus'

  .form
    display flex
    flex-flow column nowrap
    justify-content center
    width 100%
    height 100%
    baseBgConfig()
    .switch
      position absolute
      top 0
      margin 50px 0 0 20px
      switchConfig()

  .contactImg
    display inline-block
    flex 1 1 36%
    width 80%
    min-width 388px
    min-height 60px
    margin 0 auto
    baseBgConfig()
    background-size 362px 68px
    background-position 52% 66%;

  .ruleForm
    flex 1 1 64%
    width 75%
    min-width 412px
    min-height 64%
    margin 0 auto
    padding-left 10%
    .btn
      width 100px
      height 40px
      border-radius 50px
</style>
