import * as types from './types.js';

export default {
  [types.CURRENTROUTE]: (state, data) => state.currentRoute = data,
  [types.SIDEBARDISPLAY]: (state, data) => state.sidebarDisplay = data,
  [types.NAVFONTTRANSCOLOR]: (state, data) => state.navFontTransColor = data,
  [types.CONTACTPAGESWITCH]: (state, data) => state.contactPageSwitch = data,
  [types.NEWSPAGEDATA]: (state, data) => state.newsPageData = data,
  [types.NEWSPAGEYEARINDEX]: (state, data) => state.newsPageYearIndex = data,
  [types.NEWSPAGEARTICLEINDEX]: (state, data) => state.newsPageArticleIndex = data,
  [types.USER]: (state, data) => state.user = data,
  [types.MEPAGEMENUINDEX]: (state, data) => state.mePageMenuIndex = data,
  [types.USERDATA]: (state, data) => state.userData = data,
  [types.MEPAGEDANMAKUDATA]: (state, data) => state.mePageDanmakuData = data,
  [types.MEPAGEALLUSERDATA]: (state, data) => state.mePageAllUserData = data,
  [types.EDITORDATA]: (state, data) => state.editorData = data,
  [types.CONTACTPAGECOMMENTSDATA]: (state, data) => state.contactPageCommentsData = data,
  [types.PROJECTPAGEDATA]: (state, data) => state.projectPageData = data,
  [types.MEMBERS]: (state, data) => state.members = data,
  [types.LOADED]: (state, data) => state.loaded = data,
}
