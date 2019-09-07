import * as types from './types.js';

export default {
  [types.CURRENTROUTE]: ({commit, state}, obj) => commit(types.CURRENTROUTE, obj),
  [types.SIDEBARDISPLAY]: ({commit, state}, obj) => commit(types.SIDEBARDISPLAY, obj),
  [types.NAVFONTTRANSCOLOR]: ({commit, state}, obj) => commit(types.NAVFONTTRANSCOLOR, obj),
  [types.CONTACTPAGESWITCH]: ({commit, state}, obj) => commit(types.CONTACTPAGESWITCH, obj),
  [types.NEWSPAGEDATA]: ({commit, state}, obj) => commit(types.NEWSPAGEDATA, obj),
  [types.NEWSPAGEYEARINDEX]: ({commit, state}, obj) => commit(types.NEWSPAGEYEARINDEX, obj),
  [types.NEWSPAGEARTICLEINDEX]: ({commit, state}, obj) => commit(types.NEWSPAGEARTICLEINDEX, obj),
  [types.USER]: ({commit, state}, obj) => commit(types.USER, obj),
  [types.MEPAGEMENUINDEX]: ({commit, state}, obj) => commit(types.MEPAGEMENUINDEX, obj),
  [types.USERDATA]: ({commit, state}, obj) => commit(types.USERDATA, obj),
  [types.MEPAGEDANMAKUDATA]: ({commit, state}, obj) => commit(types.MEPAGEDANMAKUDATA, obj),
  [types.MEPAGEALLUSERDATA]: ({commit, state}, obj) => commit(types.MEPAGEALLUSERDATA, obj),
  [types.EDITORDATA]: ({commit, state}, obj) => commit(types.EDITORDATA, obj),
  [types.CONTACTPAGECOMMENTSDATA]: ({commit, state}, obj) => commit(types.CONTACTPAGECOMMENTSDATA, obj),
  [types.PROJECTPAGEDATA]: ({commit, state}, obj) => commit(types.PROJECTPAGEDATA, obj),
  [types.MEMBERS]: ({commit, state}, obj) => commit(types.MEMBERS, obj),
  [types.LOADED]: ({commit, state}, obj) => commit(types.LOADED, obj),
}
