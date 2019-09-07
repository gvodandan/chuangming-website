<template>
  <div class="contact">
    <div class="mapWrapper"></div>
    <v-map class="map"></v-map>
    <v-form class="vForm" v-if="!showComments"></v-form>
    <v-comments class="vComments" ref="comments" v-if="showComments"></v-comments>
  </div>
</template>

<script>
  import {contact_getComments} from '@/api.config';

  import Comments from './comments';
  import Form from './form';
  import Map from './map';

  export default {
    name: 'contact',
    data() {
      return {}
    },
    methods: {
      someAnimation() {
        let contact = this.$el;
        contact.classList.add('animated', 'fadeIn');
      },
      getComments() {
        let commentsData = this.$store.state.contactPageCommentsData;
        if (commentsData !== null) return;
        this.axios.get(contact_getComments).then((res) => {
          if (res.data.status === 'success') {
            this.$store.commit('contactPageCommentsData', res.data.comments);
          } else {
            this.$message.error('无法连接到服务器...');
          }
        });
      }
    },
    computed: {
      showComments() {
        return this.$store.state.contactPageSwitch;
      },
    },
    mounted() {
      this.someAnimation();
      this.$store.commit('navFontTransColor', true);
      this.getComments();
    },
    destroyed() {
      this.$store.commit('navFontTransColor', false);
    },
    components: {
      'v-comments': Comments,
      'v-form': Form,
      'v-map': Map
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../mixin/mixin.stylus'

  .contact
    display flex
    flex-flow row wrap
    width calc(100% + 17px)
    height 100%
    overflow-Y scroll
    overflow-X hidden
    .mapWrapper
      flex 1 1 60%
      min-height 40%
    .map
      position absolute
    .vForm, .vComments
      opacity 0.95
      position relative
      display flex
      flex 1 1 40%
      flex-flow column nowrap
      justify-content center
      height 100%
      min-width 512px
      border-radius 15px 0 0 15px
      box-shadow -5px 10px 15px #C6C6C6
      background-color #FFF
      z-index 2
</style>
