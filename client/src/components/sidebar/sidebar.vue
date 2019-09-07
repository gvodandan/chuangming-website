<template>
  <nav class="sidebar">
    <el-menu router class="menu" :collapse="!display">
      <el-button v-if="display" class="closeButton" @click="closeSidebar" icon="el-icon-close" plain round
                 size="medium"></el-button>
      <el-menu-item title="家" index="/" @click="closeSidebar">
        <span class="fontConfig">Home</span>
      </el-menu-item>
      <el-menu-item title="动态" index="news" @click="closeSidebar">
        <span class="fontConfig">News</span>
      </el-menu-item>
      <el-menu-item title="项目" index="projects" @click="closeSidebar">
        <span class="fontConfig">Projects</span>
      </el-menu-item>
      <el-menu-item title="了解一下" index="about" @click="closeSidebar">
        <span class="fontConfig">About</span>
      </el-menu-item>
      <el-menu-item title="联系我们" index="contact" @click="closeSidebar">
        <span class="fontConfig">Contact us</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      display() {
        return this.$store.state.sidebarDisplay
      }
    },
    methods: {
      closeSidebar() {
        this.$store.dispatch('sidebarDisplay', false);
      }
    }
  }
</script>

<style lang="stylus" scoped>

  $fontSize = 17px

  .sidebar
    margin-right -65px
    background-color inherit
    .menu:not(.el-menu--collapse)
      width 280px
    .menu
      background-color inherit
      .fontConfig
        font-size $fontSize
      .closeButton
        position absolute
        float left
        margin-left 155px
        z-index 10
        border 0
        font-size 24px
        background-color transparent
</style>
