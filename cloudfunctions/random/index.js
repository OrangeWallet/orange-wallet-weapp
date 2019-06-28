// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const crypto = require("crypto");
  const buffer1 = crypto.randomBytes(256);
  const buffer2 = crypto.randomBytes(256);
  const buffer3 = crypto.randomBytes(256);
  return {
    random1: buffer1.toString('hex'),
    random2: buffer2.toString('hex'),
    random3: buffer3.toString('hex')
  };
};
