// Created by vzt7
// 在此切换本地/线上环境
// 线上环境接口建议给域名

// const host = '//127.0.0.1:3000';
const host = '//123.207.109.197:3000';


// 用户
export const users_check = `${host}/users`;
export const users_rewrite = `${host}/users`;
export const users_upload = `${host}/users/avatar`;

// 管理员
export const users_all = `${host}/admin/users`;
export const users_register = `${host}/admin/users`;
export const users_delete = `${host}/admin/users`;
export const users_edit = `${host}/admin/users`;

// 弹幕
export const index_getDanmaku = `${host}/danmaku`;
export const danmaku_get = index_getDanmaku;
export const danmaku_add = `${host}/danmaku`;
export const danmaku_delete = `${host}/danmaku`;

// 成员信息
export const member_getMembers = `${host}/users`;

// 评论
export const contact_getComments = `${host}/comments`;
export const contact_addComments = `${host}/comments`;
export const me_getComments = `${host}/comments`;
export const me_deleteComment = `${host}/comments`;
export const me_replyComment = `${host}/comments`;

// 动态 news
export const news_imgUpload = `${host}/news/upload`;
export const news_get = `${host}/news`;
export const news_delete = `${host}/news`;
export const news_add = `${host}/news`;

// 项目 projects
export const projects_upload = `${host}/projects/upload`;
export const projects_get = `${host}/projects`;
export const projects_delete = `${host}/projects`;
export const projects_add = `${host}/projects`;
