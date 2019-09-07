<template>
  <div class="editor">
    <mavon-editor v-model="value" ref=md  @imgAdd="$imgAdd" @save="saveData(value, render)"
                  placeholder="开始编辑...  （图片上传限制 2M ，建议多使用外链）"
                  :image_filter="checkImg"></mavon-editor>
  </div>
</template>

<script>
  import {news_imgUpload} from "../../api.config";

  let md = require('markdown-it');

  export default {
    name: 'editor',
    data() {
      return {
        value: ''
      }
    },
    methods: {
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('image', $file);
        this.axios({
          url: news_imgUpload,
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then(res => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          if (res.data.status === 'success') {
            this.$message.success(`${$file.name} 已上传`);
            this.$refs.md.$img2Url(pos, res.data.filepath);
          } else {
            this.$message.error('图片上传失败...请重试');
            return false;
          }
        });
      },
      checkImg(file) {
        const checkType = file.type === 'image/jpeg' || file.type === 'image/png';
        const checkSize = file.size / 1024 / 1024 < 2; // 限制 2M
        if (!checkType) {
          this.$message.error('上传图片只支持 JPG/PNG 格式');
        }
        if (!checkSize) {
          this.$message.error('上传图片不能大于 2 MB');
        }
        return checkType && checkSize;
      },
      saveData(value, render) {
        localStorage.setItem('editorData', value);
      },
      getLocalData() {
        let localData = localStorage.getItem('editorData');
        this.value = localData ? localData : '';
      }
    },
    watch: {
      value(val) {
        this.$store.commit('editorData', val);
      }
    },
    mounted() {
      this.getLocalData();
    },
    destroyed() {
      let data = this.$store.state.editorData;
      if (data !== null && data !== '') {
        localStorage.setItem('editorData', this.value);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .editor
    width 100%
    height 100%
</style>
