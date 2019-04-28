<template>
  <div class="home_app">
    <common-header :isLogin='isLogin'></common-header>

    <div class="home_app_header">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 1" :key="item.value">
          <img src="@/assets/images/homeBj.png">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--teb切换-->
    <div class="tebTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.id"
          :label="item.name"
          :name="index+''"
        >
          <div class="tebTabs">
            <div class="tebTabsMa">
              <div class="tebTabsBox" v-for="item in Arrlist">
                <img :src="item.img_url" class="tebTabsBoxImg">
                <p class="tebTabsBoxP">{{item.name}}</p>
                <div class="tebTabsBoxShow">
                  <div class="tebTabsBoxShowTop">
                    <img v-if="item.class_type==1 || item.class_type==2" class="img1" :src="item.qrcode_url">
                    <img class="fang" v-if="item.class_type==3" :src="item.qrcode_url" alt=""/>
                    <p>扫码预览</p>
                  </div>
                  <div class="tebTabsBoxShowBott">
                    <!-- <router-link to="/setActivity"> -->
                    <a href="javascript:;"
                       @click="Make(item.web_url,item.id,item.hfive_url,item.en_name,item.class_type,item.name)">
                      <p>开始制作</p>
                    </a>
                    <!-- </router-link> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="morelong" v-if="complete">没有更多</div>
    <div class="morelong" v-if="!complete" @click="loadmare()">查看更多</div>

    <div class="more" :style="{ right: rightcss }">
      <div class="dianhua">
        <i class="iconfont icon-dianhua"></i>
        <p>服务咨询：182-2154-4528</p>
      </div>
      <div class="weixin">
        <i class="iconfont icon-weixin1"></i>
        <div class="weixinimg">
          <img src="@/assets/images/firstpage/erweim.png" alt="" width="117" height="117">
          <p>微信扫一扫关注</p>
        </div>
      </div>
      <div class="jiantou" @click="gotop"><i class="iconfont icon-shangjiantou"></i></div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import CommonFooter from "@/components/footer";
  import CommonHeader from "@/components/header/index";
  import {Message} from "element-ui";
  import {getUserInfo, indexaAtion} from "@/api/index"; // 验权
  export default {
    name: "Home",
    components: {
      CommonHeader,
      CommonFooter
    },
    data() {
      return {
        arr: [
          {srcs: "@/assets/images/homeBj.png"},
          {srcs: "@/assets/images/homeBj.png"}
        ],
        isLogin: 1,
        activeName: localStorage.getItem("tab") ? localStorage.getItem("tab") : '0',
        state: 0,
        show: false,
        page: 1,
        page_size: 8,
        count: 0,
        class_id: localStorage.getItem("type_id") ? localStorage.getItem("type_id") : 0,
        complete: false,
        loading: true,
        editableTabs2: [],
        Arrlist: [],
        list: [],
        rightcss: '0'
      };
    },
    //钩子函数相当于onlong
    mounted() {
      //默认数据
      var data = {
        page: this.page,
        page_size: this.page_size,
        class_id: this.class_id
      };
      indexaAtion(data)
        .then(res => {
          this.editableTabs2 = res.data.classList;
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              this.list.push(res.data.list[i]);
            }
            this.Arrlist = this.list;
            this.count = res.data.count;
            this.loading = false;
          }
          if (this.list.length == this.count) {
            this.complete = true;
          }
        })
        .catch(err => {
        });
    },
    //方法
    methods: {
      gotop() {
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let step = distance / 20; //每步距离
        (function jump() {
          if (distance > 0) {
            distance -= step;
            window.scrollTo(0, distance);
            setTimeout(jump, 10)
          }
        })()
      },
      handleClick(tab, event) {
        localStorage.setItem("tab", tab.index)
        localStorage.setItem("type_id", this.editableTabs2[tab.index].id)
        var id = this.editableTabs2[tab.index].id;
        if (this.class_id != id) {
          this.loading = true;
          this.Arrlist = [];
          this.list = [];
          this.page = 1;
          this.class_id = id;
          this.load();
        }
      },
      //Make
      Make(e, Tid, baseurl, en_name, class_type, name) {
        console.log(e,"-----------")
        window._hmt.push(['_trackEvent', 'make', 'class_type' + class_type, name, 99]);
        this.$router.push({"path": e, query: {"tmp_id": Tid, "baseurl": baseurl, 'en_name': en_name}});   //tid 是判定是小程序、小游戏id

//        this.$router.push({"path": 'setRound', query: {"tmp_id": Tid, "baseurl": baseurl, 'en_name': en_name}});



      },
      //加载
      loadmare() {
        var count = this.count,
          page_size = this.page_size,
          page = this.page;
        console.log(count, page_size, page)
        var num = Math.ceil(parseInt(count) / parseInt(page_size));
        console.log(num)
        if (page < num) {
          this.page = 1 + parseInt(page);
          this.load();
        } else {
          this.complete = true
        }
      },
      load() {
        var that = this;
        var data = {
          page: that.page,
          page_size: that.page_size,
          class_id: that.class_id
        };
        indexaAtion(data)
          .then(res => {
            if (res.data.list) {
              for (let i = 0; i < res.data.list.length; i++) {
                that.list.push(res.data.list[i]);
                console.log(that.list);
              }
              that.Arrlist = that.list;
              that.count = res.data.count;
              that.loading = false;
            }
            if (that.list.length == that.count) {
              this.complete = true;
            } else {
              this.complete = false;
            }
          })
          .catch(err => {
          });
      }
    },
    beforeRouteLeave(to, from, next) {
      if (getUserInfo() || to.path == '/helpviews' || to.path == '/home' || to.path == '/') {
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

  .home_app {
    width: 100%;
    min-height: 100vh -110px;
    background: #f8f8f8;
    position: relative;
  }

  .home_app_header {
    width: 1200px;
    height: 300px;
    margin: 20px auto 0;
  }

  .home_app_header img {
    width: 100%;
    height: 100%;
  }

  .el-tabs__nav-wrap {
    box-shadow: 1px 4px 8px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .weixin, .dianhua {
    width: 50px;
    height: 50px;
    background: #fff;
    box-shadow: 0px 2px 5px 0px rgba(183, 183, 183, 0.5);
    border-radius: 4px;
    text-align: center;
    line-height: 50px;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
  }

  .jiantou {
    cursor: pointer;
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
    color: #7D9BFF;
  }

  .jiantou:hover {
    background: #7D9BFF;
  }

  .jiantou:hover i {
    color: #fff;
  }

  .dianhua i, .weixin i {
    font-size: 30px;
    color: #7D9BFF;
  }

  .more {
    position: fixed;
    bottom: 100px;
    z-index: 99999;
  }

  .weixin:hover {
    background: #7D9BFF;
  }

  .weixin:hover i {
    color: #fff;
  }

  .dianhua:hover {
    background: #7D9BFF;
  }

  .dianhua:hover i {
    color: #fff;
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
<style>
  /*登录*/
  .el-tabs__nav-wrap {
    box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
    background-color: #fff;
  }

  .data-v-bc2d8efa {
    width: 1200px;
    margin: 0 auto;
  }

  .el-tabs__nav-scroll {
    height: 56px !important;
    line-height: 56px !important;
    padding: 0 24px;
  }

  .tebTabsMa {
    margin-right: -16px;
    min-height: 315px;
  }

  .tebTabs {
    width: 1200px;
    margin: 20px auto 0 auto;
  }

  .tebTabsBox {
    position: relative;
    width: 288px;
    height: 300px;
    float: left;
    box-shadow: 0px 2px 6px 0px rgba(207, 206, 206, 0.33);
    margin: 0 16px 16px 0;
  }

  .tebTabsBox .tebTabsBoxImg {
    width: 100%;
    height: 238px;
  }

  .tebTabsBoxP {
    text-align: center;
    height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #606266;
    line-height: 60px;
    background: #fff;
  }

  /*.el-tabs__content {*/
  /*margin-top: 15px;*/
  /*}*/
  .tebTabsBox:hover .tebTabsBoxShow {
    display: block;
  }

  .tebTabsBoxShow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 300px;
    z-index: 80;
    display: none;
  }

  .tebTabsBoxShowTop {
    width: 100%;
    height: 198px;
    background: rgba(0, 0, 0, 0.4);
    padding-top: 40px;
  }

  .tebTabsBoxShowTop .img1 {
    width: 120px !important;
    height: 120px !important;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }

  .tebTabsBoxShowTop .fang {
    width: 100px !important;
    height: 100px !important;
    display: block;
    margin: 10px auto 0;
    border: 5px solid #fff;
  }

  .tebTabsBoxShowTop p {
    margin-top: 16px;
    text-align: center;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }

  .tebTabsBoxShowBott {
    background: #fff;
  }

  .tebTabsBoxShowBott p {
    margin: 10px auto 0 auto;
    width: 160px;
    height: 42px;
    line-height: 42px;
    background: rgba(125, 155, 255, 1);
    border-radius: 8px;
    color: #fff;
    text-align: center;
  }

  .morelong {
    width: 1200px;
    height: 38px;
    line-height: 38px;
    display: block;
    margin: 10px auto 40px;
    background: #fff;
    color: #999999;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 260px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-tabs__header {
    margin: 0;
  }
</style>
