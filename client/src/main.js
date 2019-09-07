import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import 'normalize.css';

import BaiduMap from 'vue-baidu-map';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(BaiduMap, {
  ak: 'EQNzbkU0kXQpMueS5iLYkcvhR81MoSFq'
});
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});

// router.push('index')
