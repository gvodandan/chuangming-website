import * as types from './types.js'

export default {
  [types.CURRENTROUTE]: state => state.currentRoute,
  [types.SIDEBARDISPLAY]: state => state.sidebarDisplay,
  [types.NAVFONTTRANSCOLOR]: state => state.navFontTransColor,
  [types.CONTACTPAGESWITCH]: state => state.contactPageSwitch,
  [types.NEWSPAGEDATA]: state => state.newsPageData,
  [types.NEWSPAGEYEARINDEX]: state => state.newsPageYearIndex,
  [types.NEWSPAGEARTICLEINDEX]: state => state.newsPageArticleIndex,
  [types.USER]: state => state.user,
  [types.MEPAGEMENUINDEX]: state => state.mePageMenuIndex,
  [types.USERDATA]: state => state.userData,
  [types.MEPAGEDANMAKUDATA]: state => state.mePageDanmakuData,
  [types.MEPAGEALLUSERDATA]: state => state.mePageAllUserData,
  [types.EDITORDATA]: state => state.editorData,
  [types.CONTACTPAGECOMMENTSDATA]: state => state.contactPageCommentsData,
  [types.PROJECTPAGEDATA]: state => state.projectPageData,
  [types.MEMBERS]: state => state.members,
  [types.LOADED]: state => state.loaded,
}
