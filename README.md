# 基于 Vue.js 搭建的创明工作室官网

Vue 2 + Koa 2 + MongoDB 开发一个工作室官网，集 *成员*、*动态*、*项目*、*成员登录*、*人员管理*、*评论的展示与发布* 于一体。

## 环境

- CentOS-7.3-x64
- Nginx-1.12.2
- Node.js-8.9.4
- MongoDB-3.6.2

## 源码

🎉 https://github.com/vvzt/ChuangMing-Website

## 预览

🎉 Link

## 技术栈
- <b>Webpack</b>：📦 使用 Vue-cli 快速构建，自带 Webpack 。

- <b>Element UI</b>：📦 UI 框架

- <b>ES6、ES7</b>：📦 涉及到了 ES6、ES7 新特性，如 Promise、Async/Await 等...

- <b>Vue 2</b>：📦 前端基于 Vue.js 框架

- <b>Koa 2</b>：📦 后端基于 Koa 2 框架

- <b>PM2</b>：📦 进程管理，用于守护Node进程

- <b>Stylus</b>：📦 CSS预处理，灵活简洁

- <b>Vuex</b>：🗃️ 各组件的状态管理/共享

- <b>Vue-Router</b>：🗃️ 页面路由

- <b>Axios</b>：🗃️ 基于 Promise 的 HTTP 库

- <b>Moment.js</b>：🗃️ 时间处理的库，便于对时间进行格式化显示

- <b>Babel</b>：🗃️ 将 ES6、ES7 转换成可以在浏览器中运行的代码

- <b>Flex</b>：🗃️ 弹性布局

- <b>CSS3</b>：🗃️ CSS3的过渡动画及部分样式

- <b>Animate.css</b>：🗃️ CSS3动画库，有一些常用动画的封装

- <b>LocalStorage</b>：🗃️ 用于存储待发布的数据

- <b>Mavon-Editor</b>：🗃️ 支持 Markdown 语法的编辑器插件，依赖 Markdown-it 进行渲染

- <b>Normalize.css</b>：🗃️ 确保各浏览器的默认样式的一致性

- <b>Monk</b>：🖖 Node.js中用于操作 MongoDB 的中间件

- <b>Koa-Cros</b>：🖖 解决开发环境下的跨域问题

- <b>Koa-Multer</b>：🖖 实现图片上传

- <b>Koa-Static</b>：🖖 实现静态文件的访问

## 项目建立

### Client

```
# 安装依赖
npm install

# Client
npm run dev
```

### Server

```
# 安装依赖
npm install

# 1 > Node
npm start

# 2 > 如果使用 PM2
# 在 Server 目录下
pm2 start ./bin/www --watch
```

### Database

> 启动服务
```
# MongoDB 的 bin 目录下
mongod --dbpath dbpath
# --dbpath:  数据库默认存储路径
```
> 导入
```
mongorestore -h <hostname><:port> -d dbname <path>
# -h： MongoDB所在服务器地址
# -d： 需要恢复的数据库实例
# --dir： 备份数据所在位置
# <path>： 需要恢复的数据所在位置
```
> OK


## Attention

> 更改 /client/src/api.config.js 下的 host，即可指定后端接口

> 修改 /server/controllers/ip.js 中对应的线上ip

> 为避免安全问题，建议 ```mongodb.conf``` 配置中绑定访问 ip ，即 ```bind_ip=0.0.0.0```

> 由于 Vue-Router 为 History 模式，服务器端需要进行相应配置：[Vue-Router-HTML5 History 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)

> 当前百度地图 AK 为测试用，上线后需要修改 AK（当然不修改也可以）。 

> 使用腾讯云/阿里云等云服务器时，记得配置安全组，打开 ```3000``` 端口

> 建议配置 gzip

> 建议使用 pm2 部署 Node 项目

> 未完待续...
