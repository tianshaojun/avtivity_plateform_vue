import Service from './service';
// import axi from './apiaxios';
// export default {
//   queryList(url,type,data) {
//     return service({
//       url: url,
//       method: type,
//       data
//     })
//   }
// }

// 奖励管理提交数据  ---获取验证码
export var ssourl=process.env.CODE_SSO_BASEURL;

export function getmessage(sceneid) {
  return Service({
    url: '/index/message',
    method: 'post',
    data: sceneid
  })
}
// 图表
export  function chart(data){
  return Service({
    url: '/activity/datacount',
    method: 'post',
    data
  })
}
// 登录
export  function getQRCodeLoginMes(data){
  return Service({
    url: 'index/login',
    method: 'post',
    data
  })
}

// 注册
export function getRegister(data) {
  return Service({
    url:'index/register',
    method:'post',
    data
  })
}

// 修改密码
export function resetpass(data) {
  return Service({
    url:'',
    method:'post',
    data
  })
}

//扫描二维码登陆
export function QRCodeLogin(sceneid) {
  return Service({
    url: 'login/Checkqrcodestatus',
    method: 'post',
    data: sceneid
  })
}

//退出
export function logout(data) {
  return Service({
    url: 'index/loginout',
    method: 'post',
    data
  })
}

// 用户管理
export function userIndex(sceneid) {
  return Service({
    url: 'user/index ',
    method: 'post',
    data: sceneid
  })
}

// 设置活动
export function activityEdit(sceneid) {
  return Service({
    url: 'activity/index',
    method: 'post',
    data: sceneid
  })
}

// 获取用户信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem("session"))
}

// 我的项目
export function myItem(sceneid) {
  return Service({
    url: 'adminuser/myitem',
    method: 'post',
    data: sceneid
  })
}

//封杀
export function userStatus(sceneid) {
  return Service({
    url: 'user/status',
    method: 'post',
    data: sceneid
  })
}

// 小程序详情
export function activityInfo(sceneid) {
  return Service({
    url: 'activity/activityinfo',
    method: 'post',
    data: sceneid
  })
}
//删除我的项目
export function delactIvity(sceneid) {
  return Service({
    url: 'activity/delactivity',
    method: 'post',
    data: sceneid
  })
}
// 商品管理index
export function goodsIndex(sceneid) {
  return Service({
    url: 'goods/index',
    method: 'post',
    data: sceneid
  })
}
// 商品添加
export function goodsAdd(sceneid) {
  return Service({
    url: 'goods/addgoods',
    method: 'post',
    data: sceneid
  })
}
// 商品详情
export function goodsInfo(sceneid) {
  return Service({
    url: 'goods/goodsinfo',
    method: 'post',
    data: sceneid
  })
}
// 商品修改
export function goodsUpd(sceneid) {
  return Service({
    url: 'goods/updgoods',
    method: 'post',
    data: sceneid
  })
}
// 商品删除
export function goodDel(sceneid) {
  return Service({
    url: 'goods/delgoods',
    method: 'post',
    data: sceneid
  })
}
//规则管理
export function markeTing(sceneid) {
  return Service({
    url: 'marketing/content',
    method: 'post',
    data: sceneid
  })
  }
// 奖励管理拉取数据
export function getreward(sceneid) {
  return Service({
    url: 'marketing/reward',
    method: 'post',
    data: sceneid
  })
}
//规则添加
export function marketingAdd(sceneid) {
  return Service({
    url: 'marketing/contentadd',
    method: 'post',
    data: sceneid
  })
}
// 奖励管理提交数据
export function setreward(sceneid) {
  return Service({
    url: 'marketing/rewardupd',
    method: 'post',
    data: sceneid
  })
}
//规则详情
export function marketingInfo(sceneid) {
  return Service({
    url: 'marketing/contentinfo',
    method: 'post',
    data: sceneid
  })
}
//规则修改
export function marketingUpd(sceneid) {
  return Service({
    url: 'marketing/contentupd',
    method: 'post',
    data: sceneid
  })
}
//规则删除
export function marketingDel(sceneid) {
  return Service({
    url: 'marketing/contentdel',
    method: 'post',
    data: sceneid
  })
}
//审核假页面
export function audit(sceneid) {
  return Service({
    url: 'adminuser/itemstatus',
    method: 'post',
    data: sceneid
  })
}

//审核假页面
export function codelogin(sceneid) {
  return Service({
    url: 'index/codelogin',
    method: 'post',
    data: sceneid
  })
}
//授权load
export function wxopenload(sceneid) {
  return Service({
    url: 'open/index',
    method: 'post',
    data: sceneid
  })
}
//去授权
export function wxScanauth(sceneid) {
  return Service({
    url: 'open/Scanauth',
    method: 'post',
    data: sceneid
  })
}
//上传代码open/uploadcode
export function uploadcode(sceneid) {
  return Service({
    url: 'open/uploadcode',
    method: 'post',
    data: sceneid
  })
}
//提交审核
export function submitaudit(sceneid) {
  return Service({
    url: 'open/submitaudit',
    method: 'post',
    data: sceneid
  })
}
//发布上线
export function goonline(sceneid) {
  return Service({
    url: 'open/goonline',
    method: 'post',
    data: sceneid
  })
}
//撤销审核
export function revoke(sceneid) {
  return Service({
    url: 'open/cancelaudit',
    method: 'post',
    data: sceneid
  })
}
//wo_tonken
export function tokenlogin(sceneid) {
  return Service({
    url: 'index/tokenlogin',
    method: 'post',
    data: sceneid
  })
}
//分类
export function indexaAtion(sceneid) {
  return Service({
    url: 'index/index',
    method: 'post',
    data: sceneid
  })
}
//h5游戏
export function templateH5(sceneid) {
  return Service({
    url: 'index/template',
    method: 'post',
    data: sceneid
  })
}
//帮助菜单
export function helplist(sceneid) {
  return Service({
    url: 'index/help',
    method: 'post',
    data: sceneid
  })
}
//帮助详情
export function helpdetail(sceneid) {
  return Service({
    url: 'index/helpdetails',
    method: 'post',
    data: sceneid
  })
}
//banner
export function indexbanner(sceneid) {
  return Service({
    url: 'index/banner',
    method: 'post',
    data: sceneid
  })
}
//假页面拉取数据
export function auditxcx(sceneid) {
  return Service({
    url: 'auditxcx/index',
    method: 'post',
    data: sceneid
  })
}
//假页面提交数据
export function auditupd(sceneid) {
  return Service({
    url: 'auditxcx/auditupd',
    method: 'post',
    data: sceneid
  })
}
//支付
export function orderqrcode(sceneid) {
  return Service({
    url: 'payment/orderqrcode',
    method: 'post',
    data: sceneid
  })
}
//支付查询
export function codestatus(sceneid) {
  return Service({
    url: 'payment/status',
    method: 'post',
    data: sceneid
  })
}
//支付查询
export function paymentList(sceneid) {
  return Service({
    url: 'payment/list',
    method: 'post',
    data: sceneid
  })
}
//套餐
export function paymentScore(sceneid) {
  return Service({
    url: 'payment/score',
    method: 'post',
    data: sceneid
  })
}
//礼品订单
export function myGift(sceneid) {
  return Service({
     url: 'giftmall/ordergoods',
     method: 'post',
     data: sceneid
  })
}
//礼品状态
export function giftDetail(sceneid) {
  return Service({
    url: 'giftmall/ordercode',
    method: 'post',
    data: sceneid
  })
}
//商城列表giftmall/index
export function giftmall(sceneid) {
  return Service({
    url: 'giftmall/index',
    method: 'post',
    data: sceneid
  })
}
//添加购物车giftmall/buycart
export function buycart(sceneid) {
  return Service({
    url: 'giftmall/buycart',
    method: 'post',
    data: sceneid
  })
}
//购物车列表giftmall/cartlist
export function cartlist(sceneid) {
  return Service({
    url: 'giftmall/cartlist',
    method: 'post',
    data: sceneid
  })
}
//编辑购物车giftmall/editcart
export function editcart(sceneid) {
  return Service({
    url: 'giftmall/editcart',
    method: 'post',
    data: sceneid
  })
}
//生成订单giftmall/ordering
export function ordering(sceneid) {
  return Service({
    url: 'giftmall/ordering',
    method: 'post',
    data: sceneid
  })
}
//订单列表
export function orderList(sceneid) {
  return Service({
    url: 'giftmall/orderlist',
    method: 'post',
    data: sceneid
  })
}
//订单详情
export function orderDetail(sceneid) {
  return Service({
    url: 'giftmall/orderinfo',
    method: 'post',
    data: sceneid
  })
}
//删除订单giftmall/delcart
export function delcart(sceneid) {
  return Service({
    url: 'giftmall/delcart',
    method: 'post',
    data: sceneid
  })
}
//商品详情
export function malldetails(sceneid) {
  return Service({
    url: 'giftmall/details',
    method: 'post',
    data: sceneid
  })
}
//未使用商品
export function goodslist(sceneid) {
  return Service({
    url: 'activity/goodslist',
    method: 'post',
    data: sceneid
  })
}
// 以下为游戏项目平台---------------------------------------------------------------------------------------------------------------------------------------------------
// export  var gameUrl='https://vd-game.vdongchina.com/'
export var gameUrl=process.env.GAME_BASEURL;
//游戏设计制作的拉取默认数据
export function gamedefault(sceneid) {
  return Service({
    url: `${gameUrl}LG/getDesignPageData`,
    method: 'post',
    data: sceneid
  })
}
//游戏设计制作提交数据
export function gamesubmit(sceneid) {
  return Service({
    url: `${gameUrl}LG/storeDesignPageData`,
    method: 'post',
    data: sceneid
  })
}


//以下为游戏项目管理平台
// 用户管理
export function gameuser(sceneid) {
  return Service({
    url: `${gameUrl}LG/findUserPaging`,
    method: 'post',
    data: sceneid
  })
}

// 用户管理封杀
export function gamekill(sceneid) {
  return Service({
    url: `${gameUrl}LG/killUser`,
    method: 'post',
    data: sceneid
  })
}
//昵称搜索
export function searchName(sceneid) {
  return Service({
    url: `${gameUrl}LG/findUser`,
    method: 'post',
    data: sceneid
  })
};

//获取奖励管理
export function rewardgame(sceneid) {
  return Service({
    url: `${gameUrl}LG/getRewardList`,
    method: 'post',
    data: sceneid
  })
}
//提交奖励管理
export function rewardupdate(sceneid) {
  return Service({
    url: `${gameUrl}LG/updateRewardList`,
    method: 'post',
    data: sceneid
  })
}
//游戏规则管理列表
export function GameRuleList(sceneid) {
  return Service({
    url: `${gameUrl}LG/getRuleList`,
    method: 'post',
    data: sceneid
  })
}
//游戏规则管理列表
export function GamedelRuleList(sceneid) {
  return Service({
    url: `${gameUrl}LG/delRuleList`,
    method: 'post',
    data: sceneid
  })
}
//游戏规则新增修改
export function GameaddRuleList(sceneid) {
  return Service({
    url: `${gameUrl}LG/updateRuleList`,
    method: 'post',
    data: sceneid
  })
}
