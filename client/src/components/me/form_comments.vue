<template>
  <div class="comments">
    <el-table v-if="comments !== null"
              :data="comments"
              style="width: 100%">
      <el-table-column type="expand" name="comments">
        <template slot-scope="scope">
          <p>
            <span :style="{ color: '#409EFF', fontSize: '22px' }">{{scope.row.name}}：</span>
            <span :style="{ textIndent: '2rem', fontSize: '18px' }">{{ scope.row.text }}</span>
          </p>
          <p :style="{ color: '#909399', fontSize: '22px' }">{{ scope.row.reply.length > 0 ? 'Reply：' : '' }}</p>
          <template v-for="reply in scope.row.reply">
            <p :style="{ textIndent: '2rem', fontSize: '16px' }">
              <span :style="{ color: '#409EFF' }">{{ reply.name }}</span> ： <span :style="{ color: '#909399' }">{{ reply.text }}</span>
            </p>
          </template>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>

      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名">
        <template slot-scope="scope">
          <span><span :style="{ color: '#409EFF' }">{{ scope.row.name }}</span>&nbsp;&nbsp;({{ scope.row.sex }})</span>
        </template>
      </el-table-column>

      <el-table-column
        label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="留言">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.text }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.text ? scope.row.text.slice(0, 13):'' }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="replyComment(scope.$index, scope.row)">回复
          </el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="userLevel > 1"
            @click="deleteComment(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>


    <!-- 点击删除后弹出的选择框 -->
    <el-dialog
      title="最少选择一个需要删除的评论"
      :visible.sync="dialogVisible"
      width="30%">

      <!-- 内容 -->
      <div v-if="deleteDialog.data !== null">
        <el-checkbox-group v-model="deleteSelection" :min="1">
          <el-checkbox :style="{ color: '#303133' }" :label="deleteDialog.data.comment_id"
                       :key="deleteDialog.data.comment_id">{{deleteDialog.data.name}}：{{deleteDialog.data.text.length > 18 ? deleteDialog.data.text.slice(0, 15).concat('...') : deleteDialog.data.text}}
          </el-checkbox>
          <template v-for="reply in deleteDialog.data.reply">
            <br>
            <el-checkbox :style="{ color: '#909399' }" :label="deleteDialog.data.comment_id + '-' + reply.reply_id"
                         :key="deleteDialog.data.comment_id + '-' + reply.reply_id">{{reply.name}}：{{reply.text.length > 18 ? reply.text.slice(0, 15).concat('...') : reply.text}}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()">确 定</el-button>
      </span>
    </el-dialog>
    <!------------------------>

  </div>

</template>

<script>
  import {me_getComments, me_deleteComment, me_replyComment} from "@/api.config";

  export default {
    name: 'form_comments',
    data() {
      return {
        value: '',
        comments: null,
        dialogVisible: false,
        deleteDialog: {
          index: 0,
          data: null
        },
        deleteSelection: []
      }
    },
    computed: {
      userData() {
        return this.$store.state.userData;
      },
      userLevel() {
        return this.$store.state.user[2];
      }
    },
    methods: {
      getComments() {
        let commentsData = this.$store.state.contactPageCommentsData;
        if (commentsData !== null) return this.comments = commentsData;
        this.axios.get(me_getComments).then(res => {
          this.$store.dispatch('contactPageCommentsData', res.data.comments).then(() => this.comments = res.data.comments);
        })
      },
      replyComment(index, row) { // 回复评论
        this.$prompt('输入需要回复的内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          if (value) {
            // console.log(this.comments[index]);
            let _comment_id = this.comments[index].comment_id;
            this.axios.put(me_replyComment, {
              comment_id: _comment_id,
              name: this.userData.name,
              user_id: this.userData.id,
              text: value
            }).then(res => {
              // console.log(res.data);

              if (res.data.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '回复成功'
                });
                // console.log(this.comments);
                this.comments.find(c => c.comment_id === _comment_id).reply.push({ // 加入本地数据
                  reply_id: res.data.reply_id,
                  user_id: this.userData.id,
                  name: this.userData.name,
                  text: value
                });

              } else {
                this.$message({
                  type: 'error',
                  message: res.data.alert ? res.data.alert : '估计服务器开小差了..回复失败'
                });
              }


            });
          } else {
            this.$message({
              type: 'warning',
              message: '输入不能为空.'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      deleteComment(index, row) { // 删除评论按钮，点击后出现选择对话框然后执行confirmDelete()
        this.dialogVisible = true;
        this.deleteDialog.index = index;
        this.deleteDialog.data = row;
      },
      confirmDelete() {
        // console.log(this.deleteSelection);
        if (this.deleteSelection.length < 1) {
          this.$message({
            type: 'error',
            message: '至少选一个吧'
          });
          return;
        }

        let comment_id = [], reply_id = [];
        Array.from(this.deleteSelection).map(sel => { // 分离 comment 和 reply
          (sel.includes('-') ? reply_id : comment_id).push(sel);
        });
        this.axios.delete(`${me_deleteComment}/${comment_id.concat(reply_id)}`).then(res => {

          if (res.data.status === 'success') {
            if (comment_id.length > 0) { // 删除对应的本地评论/回复
              this.comments.splice(this.comments.findIndex(c => c.comment_id === comment_id[0]), 1);
            } else {
              let comment_el = this.comments.find(c => c.comment_id === reply_id[0].split('-')[0]);
              reply_id.map(r_id => comment_el.reply.splice(comment_el.reply.findIndex(r => r.reply_id === r_id.split('-')[1]), 1));
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.alert ? res.data.alert : '估计服务器有点飘了...删除失败'
            });
          }

        }).then(() => {
          this.dialogVisible = false;
          this.deleteSelection = [];
        });

      }
    },
    mounted() {
      this.getComments();
    }
  }
</script>

<style lang="stylus" scoped>
  .comments
    width 100%
    height 100%

    .deleteDOM
      background-color red
      input:first-child
        color red
</style>
