<template>
  <div class="location" v-loading="baiduMap.isLoading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <baidu-map class="bdmap" :center="baiduMap.center" :zoom="baiduMap.zoom"
               :scroll-wheel-zoom="true" :min-zoom="baiduMap.zoom-5" :max-zoom="baiduMap.zoom+5">
      <bm-marker :position="baiduMap.position" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="创明工作室"
                  :labelStyle="{color: '#DC143C', fontSize : '16px', backgroundColor: 'transparent', border: '2px solid #DC143C', fontWeight: 600}"
                  :offset="{width: -25, height: 30}"/>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
  import {BaiduMap, BmMarker, BmLabel} from 'vue-baidu-map';

  export default {
    name: 'bdMap',
    data() {
      return {
        baiduMap: { // 百度地图参数
          ak: '1',
          center: {lng: 114.402065, lat: 30.498713},
          position: {lng: 114.402365, lat: 30.499013},
          zoom: 19,
          isLoading: true
        }
      }
    },
    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          this.baiduMap.isLoading = false;
        }
      };
      setTimeout(() => this.baiduMap.isLoading = false, 5000);
    },
    components: {
      BaiduMap,
      BmMarker,
      BmLabel
    }
  }
</script>

<style lang="stylus" scoped>
  .location
    width 100%
    height 100%

  .bdmap
    width 100%
    height 100%
</style>
