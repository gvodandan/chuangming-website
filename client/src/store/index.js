import Vue from 'vue'
import Vuex from 'vuex';
import state from './state.js';
import actions from './actions';
import mutations from './mutations';
import getters from './getters.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
