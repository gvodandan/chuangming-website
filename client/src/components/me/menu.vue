<template>
  <div class="menu">
    <el-menu class="menu" @select="menuSelect">

      <el-menu-item index="0">
        <i class="el-icon-document"></i>
        <span>个人信息</span>
      </el-menu-item>

      <el-menu-item index="1">
        <i class="el-icon-message"></i>
        <span>留言查看</span>
      </el-menu-item>

      <el-menu-item index="2" v-if="level > 1">
        <i class="el-icon-view"></i>
        <span>人员管理</span>
      </el-menu-item>

      <el-menu-item index="3" v-if="level > 1">
        <i class="el-icon-news"></i>
        <span>动态管理</span>
      </el-menu-item>

      <el-menu-item index="4" v-if="level > 1">
        <i class="el-icon-edit-outline"></i>
        <span>项目管理</span>
      </el-menu-item>

      <el-menu-item index="5">
        <i class="el-icon-edit"></i>
        <span>弹幕设置</span>
      </el-menu-item>

      <el-menu-item index="99">
        <i class="el-icon-remove-outline"></i>
        <span>溜了溜了</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>

  export default {
    name: 'me_menu',
    data() {
      return {}
    },
    computed: {
      level() {
        return this.$store.state.user[2];
      }
    },
    methods: {
      menuSelect(key, keyPath) { // 菜单栏选择
        this.$store.commit('mePageMenuIndex', Number.parseInt(key));
        if (key === '99') this.loginOut();
      },
      loginOut() {
        this.$store.dispatch('user', ['', '', 0]).then(this.$router.push('/')).then(this.$store.commit('mePageMenuIndex', 0)).then(() => {
          // 清除cookie && session
        });
      }
    }
  }

</script>


<style lang="stylus" scoped>

  .menu
    width 100%
    height 100%


</style>
