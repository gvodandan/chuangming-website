<template>
  <div class="userController">
    <el-button class="addButton" type="primary" plain @click="addUserDialogVisible = true">添加</el-button>
    <el-table v-if="allUserData !== null"
              :data="allUserData"
              style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        :label=table_labels[0]
        width="60">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.level>1?'#F56C6C':'#409EFF' }">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[1]>
        <template slot-scope="scope">
          <span :style="{ color: scope.row.level>1?'#F56C6C':'#409EFF' }">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[2]>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.password }}</p>
            <div slot="reference">
              <el-tag size="medium">******</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[3]
        width="60">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.level>1?'#F56C6C':'#409EFF' }">{{ scope.row.level }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[4]>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[5]>
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[6]>
        <template slot-scope="scope">
          <span>{{ scope.row.group }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[7]>
        <template slot-scope="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[8]
        width="130">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.email">
            <p>{{ scope.row.email }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.email.split('@')[1] }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[9]>
        <template slot-scope="scope">
          <span>{{ scope.row.phone_number }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[10]>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p><a :href=scope.row.profile_picture target="_blank">{{ scope.row.profile_picture }}</a></p>
            <div slot="reference">
              <el-tag size="medium">LINK</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        :label=table_labels[11]
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editUser(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            v-if="scope.row.level < 3"
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 添加面板 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible" width="50%">
      <el-form :model="addUser" :rules="rules" :label-width="formLabelWidth" ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" placeholder="用于登录的账号（注册后无法修改）">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" placeholder="登录密码">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addUser.name" placeholder="个人真实姓名">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="年级" prop="grade">
          <el-select v-model="addUser.grade" placeholder="请选择年级">
            <template v-for="y in grades">
              <el-option
                :key="y"
                :label="y"
                :value="y">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="组别" prop="group">
          <el-select v-model="addUser.group" placeholder="请选择组别">
            <template v-for="g in groups">
              <el-option
                :key="g"
                :label="g"
                :value="g">
              </el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="头衔" prop="label">
          <el-input v-model="addUser.label" placeholder="将会显示在成员展示的右上角">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email" placeholder="以后可能会用到">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone_number">
          <el-input v-model="addUser.phone_number" placeholder="以后可能会用到">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button type="primary" @click="confirmAdd()">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 编辑面板 -->
    <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible" width="50%">

      <div v-if="editUserData !== null">
        <el-form :label-width="formLabelWidth" :model="editUserData" :rules="rules" ref="editForm">
          <el-form-item label="id" prop="id">
            <el-input v-model="editUserData.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUserData.username">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editUserData.password">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-input v-model="editUserData.level" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editUserData.name">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>

          <el-form-item label="年级" prop="grade">
            <el-select v-model="editUserData.grade" placeholder="请选择年级">
              <template v-for="y in grades">
                <el-option
                  :key="y"
                  :label="y"
                  :value="y">
                </el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="组别" prop="group">
            <el-select v-model="editUserData.group" placeholder="请选择组别">
              <template v-for="g in groups">
                <el-option
                  :key="g"
                  :label="g"
                  :value="g">
                </el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="头衔" prop="label">
            <el-input v-model="editUserData.label">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserData.email">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone_number">
            <el-input v-model="editUserData.phone_number">
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="头像" prop="profile_picture">
            <el-input v-model="editUserData.profile_picture"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button type="primary" @click="confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {users_all, users_delete, users_edit, users_register} from '@/api.config';

  export default {
    name: 'userController',
    data() {
      return {
        allUserData: null,
        table_labels: ['ID', 'Username', 'Password', 'Level', 'Name', 'Grade', 'Group', 'Label', 'E-mail', 'PN', 'PP', 'Handle'],
        grades: [],
        groups: ['web', 'qt', 'design'],
        addUser: {
          username: '',
          password: '',
          level: '',
          name: '',
          grade: '',
          group: '',
          label: '',
          email: '',
          phone_number: '',
          profile_picture: ''
        },
        addUserDialogVisible: false,
        editUserDialogVisible: false,
        editUserData: null,
        formLabelWidth: '100px',
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          grade: [
            {required: true, message: '请选择年级', trigger: 'blur'}
          ],
          group: [
            {required: true, message: '请选择组别', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入头衔', trigger: 'blur'}
          ],
          email: [
            {required: false, trigger: 'blur'}
          ],
          phone_number: [
            {required: false, trigger: 'blur'}
          ],
          profile_picture: [
            {required: false, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      userData() {
        return this.$store.state.userData;
      }
    },
    methods: {
      getAllUserData() { // 拿到全部用户数据 并暂存
        this.allUserData = this.$store.state.mePageAllUserData;
        if (this.allUserData !== null) return;
        let userData = this.$store.state.userData;
        this.axios.get(`${users_all}/${userData.id}`).then(res => {
          // console.log(res.data);
          if (res.data.status === 'success') {
            this.$store.dispatch('mePageAllUserData', res.data.users).then(() => this.allUserData = res.data.users);
          }
        });
      },
      cancelAdd() {
        this.$message({
          type: 'info',
          message: '取消添加'
        });
        this.addUserDialogVisible = false;
      },
      confirmAdd() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {

            this.axios.post(users_register, Object.assign({}, this.addUser)).then(res => {
              if (res.data.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                });
                this.addUser.id = res.data.id;
                this.addUser.level = '1';
                this.allUserData.push(Object.assign({}, this.addUser));
                this.$store.dispatch('mePageAllUserData', this.allUserData).then(() => this.addUserDialogVisible = false);
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.alert ? res.data.alert : '估计服务器有点问题...添加失败'
                });
              }
            })

          } else {
            return false;
          }
        });

      },
      editUser(index, row) {
        this.editUserData = row;
        this.editUserDialogVisible = true;
      },
      cancelEdit() {
        this.$message({
          type: 'info',
          message: '取消编辑'
        });
        this.editUserDialogVisible = false;
      },
      confirmEdit() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {

            this.axios.put(users_edit, Object.assign({}, this.editUserData)).then(res => {
              if (res.data.status === 'success') {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                });
                this.editUserDialogVisible = false;
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.alert ? res.data.alert : '估计服务器有点问题...修改失败'
                });
              }
            })

          } else {
            return false;
          }
        });
      },
      deleteUser(index, row) {
        this.$confirm('是否要永久删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let source = this.userData;
          this.axios.delete(users_delete + '/' + source.id + '&' + row.id).then(res => {
            if (res.data.status === 'success') {
              this.$message.success('删除成功!');
              this.allUserData.splice(this.allUserData.findIndex(user => user.id === row.id), 1);
              this.$store.commit('mePageAllUserData', this.allUserData);
            } else {
              this.$message.error(res.data.alert ? res.data.alert : '估计服务器有点问题...删除失败');
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      }
    },
    mounted() {
      for (let y = 2011; y < new Date().getFullYear(); y++) this.grades.push(y.toString());
      this.getAllUserData();
    }
  }
</script>

<style lang="stylus" scoped>


  .userController
    width 100%
    height 100%
    .addButton
      width 100%
    a
      $defaultColor = #409EFF
      $hoverColor = #E6A23C
      text-decoration none
      &:link
        color $defaultColor
      &:active
        color $defaultColor
      &:visited
        color $defaultColor
      &:hover
        color $hoverColor
</style>
