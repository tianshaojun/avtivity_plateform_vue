<template>
  <div class="home_app">
    <common-header></common-header>
    <div class="controller con_setactivity">
      <div class="left_box">
        <div class='temshow'>
        	<div class="tem_phone_wrap">
        		<img class="phonek" src="@/assets/images/setactivity_temshow01.png" alt="">
        		<div class="phoneIfram"><iframe :src="tmpInfo.filePath"></iframe></div>
        	</div>
        	<p style="text-align: center;">游戏试玩</p>
        </div>
      </div>
      <div class="right_box">
					<p class="titlename">游戏名称:</p>
					<p class="titletext" style="margin-bottom:26px;">{{tmpInfo.name}}</p>
					<p class="titlename">游戏介绍:</p>
					<p class="titletext">{{tmpInfo.describe}}</p>
      		<div class="erweima">
      			<img :src="tmpInfo.qrcode_url" alt="" />
      			<p>扫码预览</p>
      		</div>

     <div class="linkdres">
     	<p>链接地址：</p>
     	<input type="text" readonly="readonly" v-model="tmpInfo.filePath"/> <span class="btn" :data-clipboard-text="tmpInfo.filePath" @click="copy">复制</span>
     </div>
      </div>
    </div>
  </div>
</template>

<script>
import { templateH5 } from "@/api/index";
import CommonHeader from "@/components/header";
import Clipboard from 'clipboard'
export default {
  name: "setH5",
  components: {
    CommonHeader
  },
  data() {
    return {
    	tmpInfo:[]
    }
  },
  created() {

  		  var data = {}
  		  data.tmp_id = this.$route.query.tmp_id;
      templateH5(data).then(res=>{
        console.log(res)
        if(res.code==200){
						this.tmpInfo = res.data.tmpInfo;
        }else{

        }
      }).catch(err=>{

        console.log(err)
      })
  },
  methods: {
    //默认数据
    copy() {
  console.log("666")
  var clipboard = new Clipboard('.btn')
  clipboard.on('success', (e) => {
	 this.$message({
          message: '复制成功',
          type: 'success',
          duration:1000
        });
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', (e) => {
    // 不支持复制
    console.log('该浏览器不支持自动复制')
    // 释放内存
    clipboard.destroy()
  })
},

  }
};
</script>

<style scoped>
/deep/ .header {
  width: 90% !important;
  min-width: 1200px;
}
.home_app {
  width: 100%;
  min-height: 100vh;
  background: #f8f8f8;
}
.con_setactivity {
  padding-top: 18px;
  display: flex;
  background: #f8f8f8;
  min-width: 1200px;
}
.con_setactivity .left_box {
  width: 35%;
  min-width: 354px;
}
.con_setactivity .right_box {
  flex: 1;
  min-height: calc(100vh - 98px);
  overflow-y: auto;
  background: #fff;
  padding: 35px 0 0 35px;
  position: relative;
}

.temshow{
	    width: 326px;
    margin: 0 auto;
    padding:10px 0 50px 0;
}
.tem_phone_wrap{
	    width: 100%;
    height: 673px;
    position: relative;
}
.phonek{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.phoneIfram{
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 12;
	box-sizing: border-box;
	padding: 20px;
	border-radius: 20px;
}
.phoneIfram iframe{
		border: none !important;
		margin-top:50px;
		width: 290px !important;
		height: 512px !important;
}
.right_box{
}
.titlename{
	height:22px;
	font-size:16px;
	font-family:PingFangSC-Medium;
	color:rgba(51,51,51,1);
	line-height:22px;
	padding-left: 10px;
	margin-bottom:26px;
	position:relative;
	font-weight: bold;
}
.titlename:before{
	content:'';
	position:absolute;
	top:3px;
	left:0;
	width:2px;
	height:18px;
	background:#7D9BFF;
}
.titletext{
	width:500px;
	letter-spacing: 1;
	font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(96,98,102,1);

}
.linkdres p{
	font-size:16px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(102,102,102,1);
margin-top:150px;
}
.linkdres input{
	width:490px;
height:36px;
border-radius:5px;
border:1px solid rgba(219,223,230,1);
margin-top:26px;
font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(96,98,102,1);
padding:5px;
box-sizing: border-box;
}
.linkdres span{
		font-size:12px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(92,145,255,1);
margin-left:10px;
cursor: pointer;
}
.erweima{
	position: absolute;
	top: 210px;
	left: 630px;
	width: 152px;
	height: 200px;
}
.erweima img{
	width: 152px;
	height: 152px;
	margin-bottom:10px;
}
.erweima p{
	text-align: center;
}
</style>

