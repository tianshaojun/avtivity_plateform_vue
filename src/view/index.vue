<template>
  <div class="wscn-http404-container">
    <common-header :isLogin='isLogin'></common-header>
    <div class="main">
      <!--轮播图-->
      <div class="home_app_header">
        <el-carousel :interval="5000" arrow="never" :height="bannerHeight + 'px'">
          <el-carousel-item v-for="item in banner" :key="item.value">
            <router-link :to="item.url">
              <img :src="item.img" style="object-fit:cover">
              </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--核心功能-->
      <div class="core">
        <div class="coreTitle">核心功能</div>
        <ul>
          <li v-for="item in list" :key="item.titleText">
            <img :src="item.urlimg" alt>
            <p class="coreh3">{{item.titleName}}</p>
            <p class="coreh6">{{item.titleText}}</p>
          </li>
        </ul>
      </div>
      <!--微动平台-->
      <div class="superiority">
        <div>
          <p class="coreTitle line">微动平台优势</p>
          <p class="coretext">强大的技术实力与团队，更优质的产品与服务</p>
        </div>
        <ul>
          <li v-for="item in list2" :key="item.titleText">
            <!--<img :src="item.urlimg" alt>-->
            <p class="img iconfont " :class="item.urlimg"></p>
            <p class="superiority3">{{item.titleName}}</p>
            <p class="superiority6">{{item.titleText}}</p>
          </li>
        </ul>
      </div>
      <!--微动天下合作轮播-->
      <div class="home_app_footer">
        <img src="@/assets/images/firstpage/footerb.png">
      </div>
    </div>
    <div class="more" :style="{ right: rightcss }">
      <div class="dianhua">
        <i class="iconfont icon-dianhua"></i>
        <p>服务咨询：182-2154-4528</p>
      </div>
      <div class="weixin">
        <i class="iconfont icon-weixin1"></i>
        <div class="weixinimg">
          <img
            src="@/assets/images/firstpage/erweim.png"
            alt
            width="117"
            height="117"
          >
          <p>微信扫一扫关注</p>
        </div>
      </div>
      <div class="jiantou" @click="gotop">
        <i class="iconfont icon-shangjiantou"></i>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from "@/components/footer";
import CommonHeader from "@/components/header/index";
import { getUserInfo, indexbanner } from "@/api/index";
export default {
  name: "index",
  components: {
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      banner:'',
      bannerHeight:'500',
      isLogin:1,
      list: [
        {
          urlimg: require("@/assets/images/firstpage/list01.png"),
          titleName: "小程序",
          titleText: "最佳营销效果就用小程序"
        },
        {
          urlimg: require("@/assets/images/firstpage/list02.png"),
          titleName: "小游戏",
          titleText: "趣味互动，提高用户活跃度"
        },
        {
          urlimg: require("@/assets/images/firstpage/list03.png"),
          titleName: "H5",
          titleText: "移动营销引爆微信、app"
        },
        {
          urlimg: require("@/assets/images/firstpage/list04.png"),
          titleName: "积分商城",
          titleText: "对接魔力橙兑换商城，触达千万用户"
        }
      ],
      list2: [
        {
          urlimg: 'icon-chanpinku',
          titleName: "产品优势",
          titleText:
            "方便快捷的营销活动模板免费试用，趣味性强，个性化DIY，紧密连接“魔力橙”积分商城，触达千万用户"
        },
        {
          urlimg: 'icon-jishufuwu',
          titleName: "技术优势",
          titleText:
            "国内顶尖技术研发团队，打造操作易用的产品与安全稳定的系统，实现智能运营，提升经营效益。"
        },
        {
          urlimg: 'icon-renwu-tuandui',
          titleName: "团队优势",
          titleText:
            "百人服务团队，具备丰富行业服务经验，提供集专业培训、实战、交流等线上线下全方位的优质服务。"
        },
        {
          urlimg: 'icon-shichangtuiguang-1',
          titleName: "市场优势",
          titleText:
            "逾百家服务商，覆盖全国90%城市，为数千万中小微企业赋能，无论你身在何处，均能获得微动天下优质的服务体验。"
        }
      ],
      rightcss: "0",
      count:0,
    };
  },
  created() {
    var data = {};
    indexbanner(data)
      .then(res => {
       this.banner = res.data
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
  },
  methods: {
    gotop() {
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let step = distance / 20; //每步距离
      (function jump() {
        if (distance > 0) {
          distance -= step;
          window.scrollTo(0, distance);
          setTimeout(jump, 10);
        }
      })();
    }
  },
     beforeRouteLeave(to, from, next) {
    if (getUserInfo() ||  to.path=='/helpviews' || to.path=='/home'||to.path=='/') {
      this.isLogin = 1;
      next();
    } else {
      this.isLogin = this.isLogin + 1;
      next(false);
    }
  }
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 251px);
  background: #f8f8f8;
}
.home_app_header {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.home_app_header img {
  width: 100%;
}
.home_app_footer {
  width: 100%;
  /*height: 657px;*/
  margin: 0 auto;
}
.home_app_footer img {
  width: 100%;
}
.core {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.core ul {
  width: 1200px;
  margin: 0 auto 80px;
  display: flex;
  list-style: none;
  justify-content: space-around;
}
.core ul li {
  width: 280px;
  /*height:326px;*/
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 7px 0px rgba(174, 174, 174, 0.43);
  border-radius: 4px;
  border: 1px solid rgba(247, 247, 247, 1);
  text-align: center;
  padding: 50px 0 40px;
}
.core li img {
  width: 170px;
  height: 147px;
  margin: 0 auto 30px;
}
.coreTitle {
  height: 142px;
  line-height: 142px;
  font-size: 32px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
.coreh3 {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
}
.coreh6 {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 230px;
  margin: 0 auto;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.line {
  line-height: 80px;
  height: 80px;
  margin-top: 50px;
}
.coretext {
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-bottom: 50px;
}

.superiority ul {
  width: 1200px;
  margin: 0 auto 80px;
  display: flex;
  list-style: none;
  justify-content: space-around;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 7px 0px rgba(174, 174, 174, 0.23);
  border-radius: 4px;
  border: 1px solid rgba(247, 247, 247, 1);
}
.superiority ul li {
  width: 300px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(240, 240, 240, 0.7);
  border: 1px solid rgba(243, 243, 243, 1);
  padding: 100px 0px 70px;
  color: rgba(51, 51, 51, 1);
}
.superiority ul li:hover {
  transition: 0.2s ease;
  transform: scale(1.1);
  background: url("../assets/images/firstpage/bgc.png") no-repeat;
  color:#fff;
}
.superiority ul li:nth-child(4) .img{
  font-size:60px;
  color:#7D9BFF;
}
.superiority ul li:hover .img{
  color:#fff;
}
.superiority {
  text-align: center;
}
.superiority .img {
  width: 67px;
  height: 62px;
  font-size:50px;
  margin: 0 auto 30px;
  color:#7D9BFF;
}

.superiority3 {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
}
.superiority6 {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  padding: 0 50px;
  line-height: 20px;
}

/*侧边*/

.weixin,
.dianhua {
  width: 50px;
  height: 50px;
  box-shadow: 0px 2px 5px 0px rgba(183, 183, 183, 0.5);
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  cursor: pointer;
}
.jiantou {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(183, 183, 183, 0.5);
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
}
.jiantou i {
  font-size: 30px;
  color: #7d9bff;
  cursor: pointer;
}
   .jiantou:hover{
      background:#7D9BFF;
    }
       .jiantou:hover i{
      color:#fff;
    }
.dianhua i,
.weixin i {
  font-size: 30px;
  color: #7d9bff;
}
.more {
  position: fixed;
  bottom: 100px;
  z-index: 1020;
}
.dianhua:hover i {
  color: #fff;
}
.dianhua:hover {
  background: #7d9bff;
}
.weixin:hover i {
  color: #fff;
}
.weixin:hover {
  background: #7d9bff;
}
.dianhua:hover p {
  display: block;
}
.dianhua p {
  display: none;
  font-size: 14px;
  position: absolute;
  top: 0;
  left: -205px;
  z-index: 180;
  padding: 0 10px;
  background: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(183, 183, 183, 0.5);
  border-radius: 4px 4px 2px 1px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.weixin:hover .weixinimg {
  display: block;
}
.weixin .weixinimg {
  display: none;
  width: 145px;
  height: 171px;
  z-index: 180;
  position: absolute;
  top: 0;
  right: 65px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(183, 183, 183, 0.5);
  border-radius: 4px;
}
.weixinimg p {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0px;
}
.weixin img {
  width: 137px;
  height: 137px;
  padding: 10px 10px 0;
  box-sizing: border-box;
}
</style>
