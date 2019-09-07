const db = require('./db/db.config');
const ip = require('./ip.js');
const upload = require('./multers/users_multer.js');
const ObjectId = require('mongodb').ObjectId;

exports.get = async (ctx, next) => {
  try {
    await db.get('news').find({}).then(res => {
      ctx.body = {status: 'success'};
      let news = {};
      for (let n of res) {
        let year = n.date.slice(0, 4);
        if (!news[year]) {
          news[year] = [];
        }
        news[year].push(n);
      }
      ctx.body.news = news;
      return ctx.body;
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.upload = async (ctx, next) => {
  const path = `//${ip()}:3000/${ctx.req.file.path.split('/').slice(1).join('/')  || ctx.req.file.path.split('\\').slice(1).join('/')}`;
  ctx.body = {
    status: 'success',
    // filename: ctx.req.file.filename,
    filepath: path
  }
}

exports.delete = async (ctx, next) => {
  const req = ctx.params;
  try {
    let _id = ObjectId(req.id);
    await db.get('news').remove({'_id': _id}).then(res => {
      if (res.result.n === 1) {
        return ctx.body = {status: 'success'}
      } else {
        return ctx.body = {status: 'error', alert: 'not exist'}
      }
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.add = async (ctx, next) => {
  const req = ctx.request.body;
  try {
    await db.get('news').insert({
      title: req.title,
      description: req.description,
      author: req.author,
      date: req.date,
      content: req.content
    }).then(res => {
      return ctx.body = {status: 'success'}
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}