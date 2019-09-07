const multer = require('koa-multer');


let storage = multer.diskStorage({
  destination: function (req, file, cb) { // 设置上传后文件路径
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) { // 给上传文件重命名，获取添加后缀名
    let fileFormat = (file.originalname).split(".");
    cb(null, 'projects' + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

let upload = multer({ //添加配置文件到multer对象
  storage: storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 2, // 限制2M
    fields: 10,
    headerPairs: 10
  }
});

//导出对象
module.exports = upload;
