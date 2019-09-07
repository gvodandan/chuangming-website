const os = require('os');

let host = () => {
  let network = os.networkInterfaces();

  // 有需要请自己修改判断条件，这里主要是为了用来返回上传后的图片url
  // 建议线上环境直接给域名

  // 测试环境
  if (network['以太网']) return '127.0.0.1'; // 本地是中文，所以可以这样判断是不是开发环境，（手动滑稽

  // 线上环境
  if (network['eth0']) return '123.207.109.197'; // 请改成自己线上服务器地址或者域名

}

module.exports = host;