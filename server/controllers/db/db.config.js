const monk = require('monk');

const url = '127.0.0.1:27017/cm';

const db = monk(url);

module.exports = db;