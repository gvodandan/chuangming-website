<template>
  <div class="switch" :style="bgi.switch" @click="switchOver">
  </div>
</template>

<script>

  export default {
    name: 'panelSwitch',
    data() {
      return {
        bgi: {
          switch: {
            backgroundImage: `url(${require('@/../static/contact/switch.png')})`
          }
        }
      }
    },
    methods: {
      switchOver() { // 开关触发
        this.changeStatus();
      },
      changeStatus() { // 改变状态
        this.$store.commit('contactPageSwitch', !this.showComments);
      },
      someAnimation() {
        this.switchNode.classList.add('animated', 'rotateIn');
        setTimeout(() => {
          this.switchNode.classList.remove('animated');
        }, 1000);
      }
    },
    computed: {
      showComments() {
        return this.$store.state.contactPageSwitch;
      }
    },
    mounted() {
      this.switchNode = this.$el;
      this.someAnimation();
    }
  }
</script>

<style lang="stylus" scoped>

  .switch
    width 100%
    height 100%
    background-repeat no-repeat
    background-size 100% 100%
    background-position 0 0
</style>
