// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const crypto = require("crypto");
  const randoms = [];
  for (let i = 0; i < 10; i++) {
    randoms.push(crypto.randomBytes(256).toString("hex"));
  }
  return randoms;
};
