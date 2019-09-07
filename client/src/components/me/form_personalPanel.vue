<template>
  <div class="personal" v-if="menuIndex === 0 && personal_form !== null">
    <el-form ref="personal_form" :model="personal_form" label-width="80px">

      <el-form-item label="头像">
        <div class="profile_picture"
             :style="{ backgroundImage: `url(${personal_form.profile_picture || personal.profile_picture.url})` }"></div>
        <el-upload
          class="upload"
          :headers=personal.headers
          :action=personal.uploadURL
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :multiple=false
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="personal_form.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">图片框框大小(px)：200 x 200 </div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过512kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="USER_ID">
        <el-input v-model="personal_form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="personal_form.username" placeholder="是你登录的账号，谨慎修改">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="personal_form.name" placeholder="某些场合会用到">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="头衔">
        <el-autocomplete
          v-model="personal_form.label"
          :fetch-suggestions="querySearch"
          placeholder="显示于成员页面的右上角">
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix">
          </i>
          <template slot-scope="props">
            <div class="name">{{ props.item.value }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>

      <el-form-item label="年级">
        <el-select v-model="personal_form.grade" clearable placeholder="请选择">
          <el-option v-for="g in grade" :key="g" :label="g" :value="g"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="组别" :span="12">
        <el-select v-model="personal_form.group" clearable placeholder="请选择">
          <template v-for="g in personal.groups">
            <el-option :key="g" :label="g" :value="g"></el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="personal_form.email" placeholder="以后可能会用到">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="personal_form.phone_number" placeholder="以后可能会用到">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm" :disabled="submitted">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {users_rewrite, users_upload} from "@/api.config";

  const profile_picture_default_img = require('@/../static/about/members/t.png');

  export default {
    name: 'form_personal',
    data() {
      return {
        personal: {
          profile_picture: {name: 'default', url: profile_picture_default_img},
          fileList: [{name: 'default', url: ''}],
          uploadURL: users_upload,
          headers: {
            enctype: "multipart/form-data"
          },
          groups: ['web', 'qt', 'design'],
          labels: [
            {"value": "仅作参考，可自填"},
            {"value": "PS"},
            {"value": "Pr/Ae"},
            {"value": "C/C++"},
            {"value": "Python"},
            {"value": "JAVA"},
            {"value": "JavaScript"},
            {"value": "PHP"},
            {"value": "Scala"},
            {"value": "Ruby"},
            {"value": "机器学习"},
            {"value": "全栈"},
            {"value": "国奖"},
            {"value": "大佬"},
            {"value": "弱鸡"},
            {"value": "渣渣辉"},
          ],
        },
        personal_form: { // ajax获取的数据
          id: '',
          username: '',
          profile_picture: '',
          name: '',
          label: '',
          email: '',
          phone_number: '',
          grade: '',
          group: ''
        },
        submitted: false
      }
    },
    computed: {
      menuIndex() {
        return this.$store.state.mePageMenuIndex;
      },
      userData() {
        return this.$store.state.userData;
      },
      grade() {
        let grade = [];
        for (let y = new Date().getFullYear() - 1; y > 2010; y--) {
          grade.push(y.toString());
        }
        return grade;
      }
    },
    watch: {
      userData(val) {
        this.personal_form = val;
      }
    },
    methods: {
      querySearch(queryString, cb) {
        let labels = this.personal.labels;
        let results = queryString ? labels.filter(this.createFilter(queryString)) : labels;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (label) => {
          return (label.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSuccess(res, fileList) {
        // console.log(res);
        if (res.status === 'success') {
          this.$message.success(`上传成功~~提交保存后才生效~`);
          this.personal.profile_picture.url = this.personal_form.profile_picture = res.filepath;
          this.$el.querySelector('.profile_picture').style.backgroundImage = `url(${res.filepath})`;
        } else {
          this.handleError();
        }
      },
      handleError() {
        this.$message.error(`上传失败，请重试-.-`);
      },
      handleExceed() {
        this.$message.warning(`单次限制选择 1 个文件上传`);
      },
      beforeRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file) {
        const checkType = file.type === 'image/jpeg' || file.type === 'image/png';
        const checkSize = file.size / 1024 / 1024 < 0.5; // 限制512KB
        if (!checkType) {
          this.$message.error('上传图片只支持 JPG/PNG 格式');
        }
        if (!checkSize) {
          this.$message.error('上传图片不能大于 512 KB');
        }
        return checkType && checkSize;
      },
      submitForm() {
        this.$confirm('提交后不能撤回，请仔细检查，是否继续？', '提示', {
          confirmButtonText: '可以，继续',
          cancelButtonText: '算了算了',
          type: 'info'
        }).then(() => {
          this.submitted = true;
          let putData = this.personal_form;
          this.axios.put(users_rewrite, putData).then(res => {
            if (res.data.status === 'success') {
              this.$message.success(`修改成功！`);
            } else {
              this.submitted = false;
              this.$message.error(res.data.alert ? res.data.alert : `修改失败..估计是服务器凉了`);
            }
          });
          return;
        }).catch(() => {
          this.$message({type: 'info', message: '已取消操作'})
        });
      }
    },
    mounted() {
      this.personal_form = this.$store.state.userData;
    }
  }
</script>

<style lang="stylus" scoped>
  .personal
    width 100%
    height 100%
    .profile_picture
      width 200px
      height 200px
      margin 10px
      background-size 100% 100%
</style>
