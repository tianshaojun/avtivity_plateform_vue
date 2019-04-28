<template>
  <div class="pro_app">
    <common-header></common-header>
    <div class="container">
      <div class="main">
        <div class="dataDetil">
            <img class="userheaderImg" v-if="userInfo.adminUser.headimg" :src="userInfo.adminUser.headimg">
            <div class="surplus">
                <div class="surplusnum">积分余额：<span>{{userInfodata.surplus_integral}}</span></div>
                <el-button class="el-button el-button--primary rechargebtn" @click="rechargebtn">充值</el-button>
            </div>
            <div class="dataitem">
                <div class="dataitemtop">已使用积分</div>
                <div class="dataitembtn">{{userInfodata.extract_integral}}</div>
            </div>
            <div class="dataitem">
                <div class="dataitemtop">项目数</div>
                <div class="dataitembtn">{{count}}</div>
            </div>
            <div class="dataitem">
                <div class="dataitemtop">访客数</div>
                <div class="dataitembtn">{{userInfodata.visitor_num}}</div>
            </div>
            <div class="dataitem">
                <div class="dataitemtop">用户数</div>
                <div class="dataitembtn">{{userInfodata.user_num}}</div>
            </div>
            <div class="dataitem" style="margin-right: 0;">
                <div class="dataitemtop">转发数</div>
                <div class="dataitembtn">{{userInfodata.share_num}}</div>
            </div>
            <div class="tomall">
                <div class="mallbgc">
                    <router-link to="shopmall">
                      <img class="mallimg" src="@/assets/images/mallimg.png" alt="">
                      <p class="malltxt">礼品商城</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="main_null" v-show="listemt">
          <img src="@/assets/images/noProImg.png" alt="">
          <p>您还没有项目</p>
          <router-link class="gocrtBtn" to="/home">去创建</router-link>
        </div>
        <div class="lsit">
          <div class="list_content" v-for="(item,index) in list">
            <div class="lower_content">
              <div class="lower_bgc">
                <img :src="item.img_url" alt>
                <div class="lower_bgc">
                  <i class="el-icon-warning" v-if="item.activity_status==1"></i>
                  <span style="margin-left:3px">{{item.auditStatus}}</span>
                </div>
              </div>
              <div class="lower_title">{{item.activity_name}}</div>
            </div>
            <div class="upper_content">
              <div class="upper_top">
                  <img
                    class="upper_code"
                    :src="item.qrcode_url"
                    alt
                  >
                <div class="upper_btnbox">
                    <el-button type="text" v-if="item.auth_status==1" @click="viewData(item.activity_id,item.type)">
                      <i class="el-icon-view"></i> 数据
                    </el-button>
                  <a
                    :href="item.qrcode_url"
                    :download="item.qrcode_url"
                    v-if="item.auth_status==1"
                  >
                    <el-button type="text" >
                      <i class="el-icon-download"></i> 下载二维码
                    </el-button>
                  </a>
                  <el-button type="text" v-if="item.auth_status==0 && item.class_type==1" @click="Release(item.activity_id,item.type)">
                      <i class="el-icon-upload2"></i> 发布
                    </el-button>
                  <el-button type="text" @click="deletActivity(item.activity_id,item.id,item.class_id,item.type)">
                    <i class="el-icon-delete"></i> 删除
                  </el-button>
                </div>
              </div>
              <div class="upper_btm">
                <div class="upper_btm_btn">
                  <el-button type="text" @click="designM(item.activity_id,item.web_url,item.hfive_url,item.en_name,item.type)">
                    <a href="javascript:;" v-if="item.class_type==1">
                      <i class="el-icon-edit"></i>
                      		设计小程序
                    </a>
                    <a href="javascript:;" v-if="item.class_type==2">
                      <i class="el-icon-edit"></i> 设计小游戏
                    </a>
                  </el-button>
                  <div class="line"></div>
                  <el-button type="text" @click="Mangement(item.activity_id,item.manage_url,item.en_name,item.type)">
                    <a href="javascript:;" v-if="item.class_type==1">
                      <i class="iconfont icon-shezhi"></i>
                      管理小程序
                    </a>
                    <a href="javascript:;" v-if="item.class_type==2">
                      <i class="iconfont icon-shezhi"></i>
                      管理小游戏
                    </a>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align: center;margin-top: 50px;">
          <div class="morelong" v-if="complete&&!listemt">没有更多</div>
      <div class="morelong" v-if="!complete" @click="loadmare()">查看更多</div>
        </div>

      </div>
    </div>



    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import CommonFooter from "@/components/footer";
import { myItem, delactIvity } from "@/api/index";
import { mapGetters } from "vuex";
export default {
  name: "MyProject",
  components: {
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      listemt: false,
      list: [],
      page:1,
      page_size:8,
      complete:false,
      count:0,
      Arrlist:[],
      userInfodata:{}

    };
  },
   computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
//    console.log(this.$store.state.user);
    console.log(window.location.search,"search");
    console.log(window.location.hash,"hash");
    console.log(window.location.href,"href");
    console.log(window.location.pathname,"pathname");
    this.reQmyItrm({});
  },
  methods: {
    //跳转充值
     rechargebtn(){
         this.$router.push({ path: '/recharge'});
    },
    //数据
    viewData(e,tmp_id) {
       window._hmt.push(['_trackEvent', '数据查看', 'click']);
      this.$router.push({ path: "viewData", query: { box_id: e,tmp_id:tmp_id }});
    },
    //设计小程序/小游戏/h5
    designM(e,url,baseurl,en_name,tmp_id) {
//      class_type   1小程序 2小游戏 3h5
         window._hmt.push(['_trackEvent', '设计小程序', 'click']);
        this.$router.push({ path: url, query: { box_id: e,routerid:'8',"baseurl":baseurl,"en_name":en_name,tmp_id:tmp_id}} );
    },
    //管理小程序/小游戏/h5
    Mangement(id,url,names,tmp_id) {
      window._hmt.push(['_trackEvent', '管理小程序', 'click']);
    	console.log(url)
      localStorage.setItem("box_id", id);
      localStorage.setItem("names", names);
      localStorage.setItem("tmp_id", tmp_id);
        this.$router.push({ path: url});
    },
    Release(id,tmp_id){
      localStorage.setItem("box_id", id);
      localStorage.setItem("tmp_id", tmp_id);
      this.$router.push({ path: "wXreview" });
    },
    //删除
    deletActivity(boxid,id,class_id,tmp_id) {
      var data = { box_id: boxid,item_id:id,class_id:class_id,tmp_id:tmp_id};
      this.$confirm("确定删除该小程序, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delactIvity(data).then(res => {
           window._hmt.push(['_trackEvent', '删除', 'click']);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
              duration:'2000'
            });
            this.page=1;
            this.list=[];
            this.Arrlist=[];
            this.reQmyItrm({});
          }
        }).catch(err=>{
          console.log(err)
        });
      });
    },
//  reQmyItrm: function(data) {
//  	var data={
//  		page:this.page,
////  		pageSize:this.pageSize
//				page_size:this.pageSize
//  	}
//    myItem(data).then(res => {
//      this.total=parseInt(res.data.count)
//      this.list = res.data.list;
//      if (res.data.list.length <= 0) {
//        this.listemt = true;
//      }
//    }).catch(err=>{
//      console.log(err)
//    });
//  },
 //加载
    loadmare() {
      var count = this.count,
        page_size = this.page_size,
        page = this.page;
        console.log(count,page_size,page)
      var num = Math.ceil(parseInt(count) / parseInt(page_size));
      console.log(num)
      if (page < num) {
        this.page = 1 + parseInt(page);
        this.reQmyItrm();
      } else {
          this.complete= true
      }
    },
     reQmyItrm() {
      var that = this;
      var data = {
        page: that.page,
        page_size: that.page_size,
        class_id: that.class_id
      };
      myItem(data)
        .then(res => {
          this.userInfodata = res.data.userInfo;
        	if (res.data.list.length <= 0) {
          this.listemt = true;
        }
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
        .catch(err => {});
    },
    downloadIamge: function(url) {
      var url = url;
      var a = document.createElement("a");
      var event = new MouseEvent("click");

      a.download = Date.parse(new Date());

      a.href = url;
      a.setAttribute("target", "_blank");

      a.dispatchEvent(event);
      return false;
    }
  }
  //  beforeRouteLeave(to,from,next){
  //
  //  }
};
</script>

<style scoped>
.userheaderImg{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.dataDetil{
  font-size: 14px;
  color: #333;
  width: 100%;
  height: 130px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 2px 5px 0 hsla(0,0%,84%,.45);
  padding: 0 20px;
}
.dataitem{
  text-align: center;
  margin-right: 100px;
}
.dataitem .dataitemtop{}
.dataitem .dataitembtn{
  margin-top: 35px;
  font-weight: bold;
}
.tomall{
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}
.mallimg{
  width: 70px;
  height: 70px;
}
.malltxt{
  color: #333;
  font-size: 14px;
  margin-top: 5px;
}
.mallbgc{
  width: 130px;
  border-left: 1px solid #ECECEC;
  box-sizing: border-box;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.surplus{
  margin-left: 20px;
  margin-right: 100px;  
}
.surplusnum span{
  color: #F50909;
}
.rechargebtn{
  padding: 6px 20px !important;
  margin-top: 25px;
}
.main_null {
  margin-top: 154px;
  text-align: center;
}
.main_null img{
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.main_null p{
  font-size: 14px;
  color: #666;
  margin-top: 30px;
}
.gocrtBtn{
  display: block;
width:78px;
line-height: 40px;
height:40px;
background:rgba(125,155,255,1);
border-radius:5px;
font-size: 14px;
color: #fff;
margin: 40px auto 0;
}
/*設置*/
@font-face {
  font-family: "iconfont";
  src: url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUAAAsAAAAAB9wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8nEgZY21hcAAAAYAAAABLAAABcOdOthxnbHlmAAABzAAAAVAAAAHofyPXsmhlYWQAAAMcAAAALwAAADYTkL8PaGhlYQAAA0wAAAAcAAAAJAffA4RobXR4AAADaAAAAAgAAAAICAEAAGxvY2EAAANwAAAABgAAAAYA9AAAbWF4cAAAA3gAAAAgAAAAIAEQALduYW1lAAADmAAAAUUAAAJtPlT+fXBvc3QAAATgAAAAHwAAADDc4maCeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWScwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeqT1TY27438AQw9zA0AAUZgTJAQDjaAwweJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISf6b2/z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQCF1goBAHicjU7bagIxFMxJNPFS1hWyCep6wbqJgm53XUkQxMuzgiu+lH5AH+zfFPraD+hP9Gf6GaVtaGkpxYe+zMwZ5gyDCgi9PxSA3KFbdI8e0RNCIKTgNUhSyjwiKXN8SWtAWQx9ypJUXYHSl0qnSpsYa6WTVKvZyj0YuyTaWMeZWYGxHZgaK7quMBMyFZJ2sBQy0TGxSnvQV5oy4WFGuewQJuQSpkIaq5bYmlkxBr0E1yE9IB4wJ9wZA3kFwBgX2GAzrlSFHIyAB4QHze31thlwEnAYDaSoVsabASvg/0fn0XpSLy62vcPNobddFP14HTEWrWP/l1mfOPPN5CeMT/kXzncAu/knwnP1gg+5bIfldJdHvB4GlRIu0bDbDakTlSCs8yjfpeWwLc8FW71e62+w5tv9cZiFjVarEWbD4976KlfnzJefTfkJ1t+jHKIPoudD/HicY2BkYGAAYpMLBz7F89t8ZeBmYQCBGxa2nQj6/1QWRuZsIJeDgQkkCgAz3QokAHicY2BkYGBu+N/AEMMCZDEwAEkwjQSYAEc0Am0EAAAABAEAAAAAAAAA9AAAAAEAAAACAKsABAAAAAAAAgAAAAoACgAAAP8AAAAAAAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICJkYmRmYGtOCO1KiOTgQEAEMgCpwA=")
    format("woff");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-shezhi:before {
  content: "\e626";
}

.pro_app {
  width: 100%;
  /*min-height: 100vh-120px;*/
  height:calc(100vh - 120px);
  background: #f8f8f8;
}
.container {
  width: 100%;
  background-color: #f8f8f8;
}
.main {
  width: 1200px;
  margin: 0 auto;
  min-height: 700px;
}
.lsit {
  overflow: hidden;
}
.list_content {
  width: 288px;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(207, 206, 206, 0.33);
  border-radius: 4px;
  margin-top: 20px;
  float: left;
  margin-left: 16px;
  position: relative;
}
.list_content:nth-child(4n + 1) {
  margin-left: 0;
}
.lower_content {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lower_bgc {
  position: relative;
  width: 288px;
  height: 238px;
}
.lower_bgc > img {
  width: 100%;
  height: 100%;
}
.lower_bgc .lower_bgc {
  position: absolute;
  top: 0;
  right: 0;
  width: 76px;
  height: 30px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0px 0px 0px 20px;
}
.lower_title {
  width: 100%;
  height: 62px;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 62px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  text-align: center;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.list_content:hover .upper_content {
  display: block;
}
.upper_content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
.upper_top {
  box-sizing: border-box;
  width: 288px;
  height: 238px;
  padding: 40px 14px 0 14px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px 4px 0px 0px;
  position: relative;
}
.upper_btm {
  height: 62px;
  background-color: #fff;
  padding-top: 8px;
  box-sizing: border-box;
}
.upper_code {
  height: 116px;
  width: 116px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
.upper_btnbox {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  /* flex-direction: column; */
  margin-top: 12px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  padding: 0 15px;
}
.upper_btnbox .el-button--text {
  color: #fff !important;
}
.upper_btnbox .el-button--text:hover {
  color: #8ba5ff;
}
.upper_btm_btn {
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
.line {
  height: 40px;
  width: 1px;
  background-color: #f2f2f2;
}
.upper_btm_btn .el-button--text a {
  font-size: 16px;
  font-weight: 400;
  color: #606266;
}
.upper_btm_btn .el-button--text a:hover {
  color: #4b73ff;
}
.el-button {
  padding: 6px;
}
.morelong {
      width: 200px;
    line-height: 40px;
    display: block;
    margin: 10px auto;
    background: #f1f1f1;
    color: #d1d1d1;
    text-align: center;
    font-size: 14px;
    border-radius: 24px;
    cursor: pointer;
}
</style>
