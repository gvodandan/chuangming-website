<template>
  <div class="projectRelease">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">管理</el-menu-item>
      <el-menu-item index="1">发布</el-menu-item>
    </el-menu>
    <div class="activeContainer" v-if="projects !== null">
      <!-- 管理 -->
      <template v-if="activeIndex === '0'">
        <el-table
          :data="projects"
          style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column label="ID" width="80">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row._id }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row._id.slice(0, 5) }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="标题">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.title }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title.slice(0, 10) }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="链接">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.link }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">LINK</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="人员">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>

          <el-table-column label="关于" width="256">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.about }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.about.slice(0, 15) }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                disabled>编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row._id)">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>

      <!-- 发布 -->
      <template v-if="activeIndex === '1'">
        <el-form ref="form" :model="projectsReleaseForm" :rules="formRules" label-width="80px">
          <br>
          <el-form-item label="标题" prop="title">
            <el-input v-model="projectsReleaseForm.title" placeholder="title"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="project_img">
            <div class="project_img"
                 :style="{ backgroundImage: `url(${projectsReleaseForm.project_img})` }"></div>
            <el-upload
              class="upload"
              list-type="picture"
              :headers=upload.headers
              :action=upload.url
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :multiple=false
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="upload.fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="projectsReleaseForm.link" placeholder="link"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="projectsReleaseForm.author" placeholder="author"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="about">
            <el-input v-model="projectsReleaseForm.about" placeholder="about"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="projectsReleaseForm.date"
              align="left"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyyMMdd"
              placeholder="date"
              :editable="false"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
            <el-button @click="onReset('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
  import {projects_get, projects_delete, projects_upload, projects_add} from "../../api.config";

  export default {
    name: 'projectRelease',
    data() {
      return {
        activeIndex: '0',
        projects: null,
        projectsReleaseForm: {
          project_img: '',
          title: '',
          link: '',
          author: '',
          about: '',
          date: ''
        },
        upload: {
          headers: {
            enctype: "multipart/form-data"
          },
          url: projects_upload,
          fileList: []
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '前一周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '一个月前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }]
        },
        formRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          project_img: [
            {required: false, trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请输入链接', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          about: [
            {required: true, message: '请输入描述', trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      projectsData() {
        return this.$store.state.projectPageData;
      }
    },
    methods: {
      getProjectsData() {
        if (this.projectsData !== null) return this.projects = this.projectsData;
        this.axios.get(projects_get).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('projectPageData', res.data.projects);
          } else {
            this.$message.error(res.data.alert ? res.data.alert : '无法连接到服务器');
          }
        }).then(() => this.projects = this.projectsData);
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
      handleDelete(id) {
        this.$confirm('是否要永久删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete(`${projects_delete}/${id}`).then(res => {
            if (res.data.status === 'success') {
              this.projects.splice(this.projects.findIndex(p => p._id === id), 1);
              this.$store.dispatch('projectPageData', this.projects).then(() => this.$message.success('删除成功！'));
            } else {
              this.$message.error(res.data.alert ? res.data.alert : '估计服务器有点问题...删除失败');
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        })
      },

      handleSuccess(res, fileList) {
        // console.log(res);
        if (res.status === 'success') {
          this.$message.success(`上传成功~~提交保存后才生效~`);
          this.projectsReleaseForm.project_img = res.filepath;
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
        const checkSize = file.size / 1024 / 1024 < 2; // 限制512KB
        if (!checkType) {
          this.$message.error('上传图片只支持 JPG/PNG 格式');
        }
        if (!checkSize) {
          this.$message.error('上传图片须小于 2 MB');
        }
        return checkType && checkSize;
      },

      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$confirm('确定发布？', '提示', {
              confirmButtonText: '我确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.axios.post(projects_add, Object.assign({}, this.projectsReleaseForm)).then(res => {
                if (res.data.status === 'success') {
                  this.$message.success('发布成功！');
                  this.$store.dispatch('projectPageData', null)
                    .then(() => this.getProjectsData()) // 重新获取数据
                    .then(() => this.onReset('form'));
                } else {
                  this.$message.error(res.data.alert ? res.data.alert : `发布失败..估计是服务器凉了`);
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消操作'
              });
            });

          } else {
            return false;
          }
        });
      },
      onReset(formName) {
        this.upload.fileList = [];
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.getProjectsData();
    }
  }
</script>

<style lang="stylus" scoped>
  .projectRelease
    width 100%
    height 100%
</style>
