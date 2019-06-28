// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async(event, context) => {
  return {
    sum: event.a + event.b
  }
}