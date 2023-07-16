// 云函数入口文件
const cloud = require('wx-server-sdk')
  cloud.init({
  env: 'cloud1-1gqx3ugm4244089e',  // 打开微信云开发控制平台，右上角点击[设置] - [环境设置] 
  traceUser: true
  }),

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


    
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

async function getCellphone(event){
  console.log(event.id.data.phoneNumber);
  return event.id.data.phoneNumber;
  }