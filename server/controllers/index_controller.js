const db = require('./db/db.config');


exports.get = async (ctx, next) => {
  try {
    return ctx.body = {status: 'success'}
  } catch (e) {
    throw e;
    return ctx.body = {status: 'error'}
  }
}