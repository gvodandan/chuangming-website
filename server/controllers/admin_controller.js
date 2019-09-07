const db = require('./db/db.config');


exports.getAll = async (ctx, next) => { // 获取所有用户数据 (管理员操作)
  const req = ctx.params;
  try {
    await db.get('users').find({id: req.id}).then(async res => {
      if (res.length === 1) {
        await db.get('users').find({}).then(res => {
          const ret = {status: 'success', users: res}
          return ctx.body = ret;
        });
      } else {
        return ctx.body = {status: 'error', alert: "no permission"}
      }
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.register = async (ctx, next) => { // 注册 （管理员操作）
  const req = ctx.request.body;
  try {
    let check = await db.get('users').count({'username': req.username}),
      count = await db.get('users').count({});
    if (check === 0) {
      await db.get('users').find({}, {sort: {"id": -1}, limit: 1}).then(async res => {
        let _id = count < 1 ? '1001' : (Number.parseInt(res[0].id) + 1).toString();
        await db.get('users').insert({
          id: _id,
          username: req.username,
          password: req.password,
          level: '1',
          name: req.name,
          grade: req.grade,
          group: req.group,
          label: req.label,
          email: req.email,
          phone_number: req.phone_number,
          profile_picture: req.profile_picture || ''
        }).then(_res => {
          return ctx.body = {status: 'success', id: _res.id}
        }); // 插入
      });
    } else {
      return ctx.body = {status: 'error', alert: 'repeated username'}
    }
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.edit = async (ctx, next) => { // 修改用户信息 (管理员操作)
  const req = ctx.request.body;

  try {
    await db.get('users').find({id: req.id}).then(async res => {
      if (res.length === 1) {
        await db.get('users').update(
          {id: req.id},
          {
            $set:
              {
                username: req.username,
                password: req.password,
                name: req.name,
                grade: req.grade,
                group: req.group,
                label: req.label,
                email: req.email,
                phone_number: req.phone_number,
                profile_picture: req.profile_picture
              }
          }
        ).then(_res => {
          return _res.n === 1 ? ctx.body = {status: 'success'} : ctx.body = {status: 'error'}
        });
      } else {
        return ctx.body = {status: 'error', alert: 'user not exist'}
      }
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }

}

exports.delete = async (ctx, next) => { // 删除用户 (管理员操作)
  const req = ctx.params;
  try {
    await db.get('users').find({id: req.src_id}).then(async res => {
      if (res.length === 1) {
        await db.get('users').remove({'id': req.des_id}).then(_res => {
          if (_res.result.n === 1) {
            return ctx.body = {status: 'success'}
          }
        })
      } else {
        return ctx.body = {status: 'error', alert: "no permission"}
      }
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}