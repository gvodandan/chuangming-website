const db = require('./db/db.config');


exports.get = async (ctx, next) => {
  try {
    await db.get('comments').find({}).then(res => {
      ctx.body = {status: 'success'}
      ctx.body.comments = res;
      return ctx.body;
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.add = async (ctx, next) => {
  const req = ctx.request.body;
  try {
    await db.get('comments').find({}, {sort: {'comment_id': -1}, limit: 1}).then(async res => {
      const _id = res ? (Number.parseInt(res[0].comment_id) + 1).toString() : 0;
      let t = new Date(),
        date = `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, '0')}-${t.getDate().toString().padStart(2, '0')}`;
      await db.get('comments').insert({
        comment_id: _id,
        date: date,
        name: req.name,
        sex: req.sex,
        email: req.email,
        text: req.text,
        reply: []
      }).then(_res => {
        return ctx.body = {status: 'success'}
      })
    })
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.reply = async (ctx, next) => {
  const req = ctx.request.body;
  try {
    await db.get('comments').find({comment_id: req.comment_id}).then(async res => {
      if (res.length === 1) {
        const reply = res[0].reply,
          _id = (Math.max(...reply.map(r => Number.parseInt(r.reply_id)), -1) + 1).toString();
        await db.get('comments').update(
          {comment_id: req.comment_id},
          {
            $push:
              {
                reply:
                  {
                    reply_id: _id,
                    user_id: req.user_id,
                    name: req.name,
                    text: req.text
                  }
              }
          }
        ).then(_res => {
          return ctx.body = {status: 'success', reply_id: _id}
        });
      } else {
        return ctx.body = {status: 'error', alert: 'not exist'}
      }
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.delete = async (ctx, next) => {
  const arr = ctx.params.id.split(',');
  try {
    if (!arr[0].includes('-')) { // 删除个人评论
      await db.get('comments').remove({comment_id: arr[0]}).then(res => {
        return res.result.n === 1 ? ctx.body = {status: 'success'} : ctx.body = {
          status: 'error',
          alert: 'not exist'
        }
      })
    } else { // 删除评论中的回复
      let index = arr[0].split('-')[0];
      let arr_reply = arr.map(r => r.split('-')[1]);
      await db.get('comments').update(
        {comment_id: index},
        {$pull: {reply: {reply_id: {$in: arr_reply}}}},
        {multi: true}
      ).then(res => {
        if (res.n > 0) return ctx.body = {status: 'success'}
        else return ctx.body = {status: 'error', alert: 'not exist'}
      })
    }
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}