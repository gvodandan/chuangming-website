const db = require('./db/db.config');


exports.get = async (ctx, next) => {
  try {
    await db.get('danmaku').find({}).then(res => {
      ctx.body = {status: 'success'};
      ctx.body.danmaku = [];
      for (let dm of res) {
        ctx.body.danmaku.push({danmaku_id: dm.danmaku_id, author_id: dm.author_id, author_name: dm.author_name, context: dm.context});
      }
    }).then(() => {
      return ctx.body
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.add = async (ctx, next) => {
  const req = ctx.request.body;
  try {
    await db.get('danmaku').find({}, {sort: {'danmaku_id': -1}, limit: 1}).then(async res => {
      const _id = Number.parseInt(res[0].danmaku_id) + 1;
      await db.get('danmaku').insert({
        danmaku_id: _id.toString(),
        context: req.context,
        author_id: req.author_id,
        author_name: req.author_name
      }).then(_res => {
        return ctx.body = {status: 'success', danmaku_id: _res.danmaku_id}
      });
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.delete = async (ctx, next) => {
  const req = ctx.params;
  // console.log(req);
  try {
    await db.get('danmaku').remove({'danmaku_id': req.id}).then(res => {
      return res.result.n === 1 ? ctx.body = {status: 'success'} : ctx.body = {status: 'error', alert: 'not exist'}
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}