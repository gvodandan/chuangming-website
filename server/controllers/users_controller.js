const db = require('./db/db.config');
const ip = require('./ip.js');

exports.check = async (ctx, next) => { // 登录
  const req = ctx.request.body;
  try {
    await db.get('users').find({username: req.username, password: req.password}).then(res => {
      if (res.length === 1) {
        return ctx.body = {
          status: 'success',
          check: 'true',
          id: res[0].id,
          level: res[0].level,
          username: res[0].username,
          name: res[0].name,
          grade: res[0].grade,
          group: res[0].group,
          label: res[0].label,
          email: res[0].email,
          phone_number: res[0].phone_number,
          profile_picture: res[0].profile_picture
        }
      } else {
        return ctx.body = {
          status: 'error',
          check: 'false'
        }
      }
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}

exports.rewrite = async (ctx, next) => { // 修改个人信息
  const req = ctx.request.body;
  try {
    await db.get('users').update(
      {id: req.id},
      {
        $set:
          {
            username: req.username,
            profile_picture: req.profile_picture,
            name: req.name,
            grade: req.grade,
            group: req.group,
            label: req.label,
            email: req.email,
            phone_number: req.phone_number
          }
      }
    ).then(_res => {
      return _res.n === 1 ? ctx.body = {status: 'success'} : ctx.body = {status: 'error'}
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }

}

exports.upload = async (ctx, next) => { // 上传头像
  const path = `//${ip()}:3000/${ctx.req.file.path.split('/').slice(1).join('/') || ctx.req.file.path.split('\\').slice(1).join('/')}`;
  ctx.body = {
    status: 'success',
    // filename: ctx.req.file.filename,
    filepath: path
  }
}


exports.getMembers = async (ctx, next) => { // 获取成员信息
  try {
    await db.get('users').find({}).then(async res => {
      let members = {qt: [], web: [], design: []};
      for (let p of res) {
        let person = {
          id: p.id,
          username: p.username,
          name: p.name,
          grade: p.grade,
          label: p.label,
          profile_picture: p.profile_picture
        };
        members[p.group.toLowerCase()].push(Object.assign({}, person));
      }
      return ctx.body = {status: 'success', members: members}
    });
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }

}