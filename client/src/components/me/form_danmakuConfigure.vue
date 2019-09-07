<template>
  <div class="danmakuConfigure">
    <el-button class="addButton" type="primary" plain @click="handleAdd()">添加</el-button>
    <template v-if="danmakuData !== null">
      <el-table
        :data="danmakuData"
        style="width: 100%">
        <el-table-column type="index"></el-table-column>

        <el-table-column label="弹幕（最后一条为加速弹幕）">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.context }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.context }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="author_id" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.author_id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="author_name" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.author_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" v-if="userLevel > 1" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.danmaku_id)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>
  </div>
</template>

<script>
  import {danmaku_get, danmaku_add, danmaku_delete} from '@/api.config';

  export default {
    name: 'danmakuConfigure',
    data() {
      return {
        danmakuData: null
      }
    },
    computed: {
      userLevel() {
        return Number.parseInt(this.$store.state.user[2]);
      }
    },
    methods: {
      getDanmaku() {
        this.danmakuData = this.$store.state.mePageDanmakuData; // 本地没有暂存弹幕再取
        if (this.danmakuData !== null) return;
        this.axios.get(danmaku_get).then(res => {
           // console.log(res.data);
          if (res.data.status === 'success') {
            this.danmakuData = res.data.danmaku;
          } else {
            this.$message({
              type: 'error',
              message: res.data.alert ? res.data.alert : '估计服务器开小差了..获取弹幕失败'
            });
          }
        })
      },
      handleAdd() {
        // console.log(this.$store.state.userData);
        const MAX_DANMAKU = 15;
        if(this.danmakuData.length > MAX_DANMAKU) return this.$message.info(`弹幕条数已达上限`);

        this.$prompt('输入内容', '添加弹幕', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
        }).then(async ({value}) => {

          let author = this.$store.state.userData;
          // console.log(userId);
          let postData = {
            context: value,
            author_id: author.id,
            author_name: author.name
          };
          await this.axios.post(danmaku_add, postData).then(res => {
            // console.log(res);
            if (res.data.status === 'success') {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.danmakuData.push({"danmaku_id": res.data.danmaku_id, "context": value, author_id: author.id, author_name: author.name}); // 直接添加对应数据在本地
              this.$store.commit('mePageDanmakuData', this.danmakuData);
            } else {
              this.$message({
                type: 'error',
                message: '出现了一些问题.. 添加失败'
              });
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加'
          });
        });
      },
      handleDelete(danmaku_id) {
        this.$confirm('此操作将永久删除该条弹幕, 是否继续?', '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删掉对应弹幕
          await this.axios.delete(danmaku_delete + '/' + danmaku_id).then(res => {
            if (res.data.status === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.danmakuData.splice(this.danmakuData.findIndex(dm => dm.danmaku_id === danmaku_id), 1); // 去掉本地对应的数据
            } else {
              this.$message({
                type: 'error',
                message: '出现了一些问题.. 删除失败'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted() {
      this.getDanmaku();
    }
  }
</script>

<style lang="stylus" scoped>
  .danmakuConfigure
    width 100%
    height 100%
    .addButton
      width 100%
</style>
