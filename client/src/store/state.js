export default {
  // index
  currentRoute: '/', // 当前路由 (暂时没什么用)
  sidebarDisplay: false, // 侧边栏显示
  loaded: false, // 首屏是否加载完毕
  navFontTransColor: false, // 导航栏字体颜色反转

  // contact
  contactPageSwitch: false, // 联系我们页面的切换按钮
  contactPageCommentsData: null, // 评论的数据

  // news
  newsPageData: null, // 新闻页面的数据
  newsPageYearIndex: -1, // 新闻页面已选择的年份
  newsPageArticleIndex: 0, // 新闻页面已选择的文章
  editorData: null, // news发布页面输入的数据

  // user
  user: ['', '', '0'], // 用户输入的账号密码及用户等级
  userData: null, // 存储获得的账号所有数据
  members: null, // about > member 页面各组成员信息

  // me
  mePageMenuIndex: 0, // 个人页面的菜单栏索引
  mePageDanmakuData: null, // 存储弹幕数据
  mePageAllUserData: null, // 暂存所有用户的数据

  // project
  projectPageData: null, // 项目页数据


}
