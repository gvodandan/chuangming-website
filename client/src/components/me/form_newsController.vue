<template>
  <div class="newsRelease">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">管理</el-menu-item>
      <el-menu-item index="1">发布</el-menu-item>
    </el-menu>
    <div class="activeContainer">

      <!-- 管理 -->
      <template v-if="activeIndex === '0' && newsData !== null">
        <el-table
          :data="newsData"
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

          <el-table-column label="描述">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column label="作者">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="内容" width="256">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.content }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.content ? scope.row.content.slice(0, 25) : '' }}</el-tag>
                </div>
              </el-popover>
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
        <el-form ref="form" :model="newsReleaseForm" :rules="formRules" label-width="80px">
          <br>
          <el-form-item label="标题" prop="title">
            <el-input v-model="newsReleaseForm.title" placeholder="title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="newsReleaseForm.description" placeholder="description"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="newsReleaseForm.author" placeholder="author"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="newsReleaseForm.date"
              align="left"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyyMMdd"
              placeholder="选择日期"
              :editable="false"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <v-editor></v-editor>
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
  import {news_get, news_delete, news_add} from "../../api.config";

  import editor from './editor_newsRelease';

  export default {
    name: 'userController',
    data() {
      return {
        activeIndex: '0',
        newsData: null,
        newsReleaseForm: {
          title: '',
          description: '',
          author: '',
          date: '',
          content: ''
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
            text: '前天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }, {
            text: '前一周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        formRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          description: [
            {required: false, trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      editorData() {
        return this.$store.state.editorData;
      }
    },
    watch: {
      editorData(val) {
        this.newsReleaseForm.content = val;
      }
    },
    methods: {
      sortNewsData(news) {
        let allNews = [];
        for (let n in news) {
          allNews.push(...news[n]);
        }
        return allNews.sort((a, b) => Number.parseInt(b.date) - Number.parseInt(a.date));
      },
      getData() {
        let newsData = this.$store.state.newsPageData;
        if(newsData !== null) {
          this.newsData = [...this.sortNewsData(newsData)];
        }
        if (newsData === null) {
          this.axios.get(news_get).then(res => {
            if (res.data.status === 'success') {
              this.$store.commit('newsPageData', res.data.news);
              this.newsData = [...this.sortNewsData(res.data.news)];
            } else {
              this.$message.error(res.data.alert ? res.data.alert : '服务器炸了？？');
            }
          })
        }
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
      handleDelete(id) {
        this.$confirm('删除后不能恢复，是否继续？', '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.axios.delete(`${news_delete}/${id}`).then(res => {
            if (res.data.status === 'success') {
              this.$message.success(`已删除！`);
              this.newsData.splice(this.newsData.findIndex(x => x._id === id), 1);
              let spliceData = this.$store.state.newsPageData;
              for(let n in spliceData) {
                let des = spliceData[n].findIndex(x => x._id === id);
                if(des > 0) spliceData[n].splice(des, 1);
              }
              this.$store.commit('newsPageData', spliceData);
            } else {
              this.$message.error(res.data.alert ? res.data.alert : `修改失败..估计是服务器凉了`);
            }
          });
        }).catch(() => {
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.editorData !== '') {

            this.$confirm('确定发布？', '提示', {
              confirmButtonText: '我确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.axios.post(news_add, Object.assign({}, this.newsReleaseForm)).then(res => {
                if (res.data.status === 'success') {
                  this.$message.success('发布成功！');
                  this.$store.dispatch('newsPageData', null)
                    .then(() => this.getData()) // 重新获取数据
                    .then(() => this.onReset('form'))
                    .then(() => this.$store.commit('editorData', null))
                    .then(() => { localStorage.removeItem('editorData') }); // 清空本地保存的编辑内容
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
            this.$message.error('必填项不能留空');
            return false;
          }
        });
      },
      onReset(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.getData();
    },
    components: {
      'v-editor': editor
    }
  }
</script>

<style lang="stylus" scoped>
  .userController
    width 100%
    height 100%
</style>
