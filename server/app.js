const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('koa-cors') // 跨域

const index = require('./routes/index')
const users = require('./routes/users')
const news = require('./routes/news')
const danmaku = require('./routes/danmaku')
const comments = require('./routes/comments')
const projects = require('./routes/projects')
const admin = require('./routes/admin')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 跨域
app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(danmaku.routes(), danmaku.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(projects.routes(), projects.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
