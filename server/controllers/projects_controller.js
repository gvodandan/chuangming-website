const db = require('./db/db.config');
const ip = require('./ip.js');
const upload = require('./multers/projects_multer.js');
const ObjectId = require('mongodb').ObjectId;

exports.get = async (ctx, next) => {
  try {
    await db.get('projects').find({}).then(res => {
      ctx.body = {status: 'success'};
      ctx.body.projects = res;
      return ctx.body;
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.delete = async (ctx, next) => {
  const req = ctx.params;
  try {
    await db.get('projects').remove({ '_id': ObjectId(req.id) }).then(res => {
      return res.result.n === 1 ? ctx.body = {status: 'success'} : ctx.body = {status: 'error', alert: 'not exist'}
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.upload = async (ctx, next) => {
  const path = `//${ip()}:3000/${ctx.req.file.path.split('/').slice(1).join('/') || ctx.req.file.path.split('\\').slice(1).join('/')}`;
  ctx.body = {
    status: 'success',
    filepath: path
  }
}

exports.add = async (ctx, next) => {
  const req = ctx.request.body;
  try {
    await db.get('projects').insert({
      project_img: req.project_img,
      title: req.title,
      link: req.link,
      author: req.author,
      about: req.about,
      date: req.date
    }).then(res => {
      return ctx.body = {status: 'success'}
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}