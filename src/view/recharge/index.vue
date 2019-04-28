<template>
  <div class="pro_app">
    <common-header></common-header>
    <div class="container">
      <div class="main">
        <div class="paybox">
          <div class="title">在线红包充值</div>
          <div class="moneyinfo">
            <div class="user">
              <div class="infotitle">当前账号</div>
              <div>{{userInfo.adminUser.nickname}}</div>
            </div>
            <div class="monyenum">
              <div class="infotitle">充值金额</div>
              <div class="itembox">
                <template v-for="(item,index) in navList">
                <div class="item" v-if="item.z_score!=0"  :class="{active:item.isActive}" @click="activeFun(item)">
                  <div class="monernum">￥{{item.price}}</div>
                  <div class="jfnum">{{item.score/10000}}万积分</div>
                  <div class="z_score">赠送{{item.z_score}}积分</div>
                </div>
                <div class="item" v-if="item.z_score==0"  :class="{active:item.isActive}" @click="activeFun(item)">
                  <div class="monernum">￥{{item.price}}</div>
                  <div class="jfnumtop">{{item.score/10000}}万积分</div>
                </div>
                <!-- <div class="iteminpt" v-if='navList.length == index+1' :class="{active:item.isActive}" @click="activeFun(item)">
                  <div class="jfnum"><el-input @blur="change" v-model="changenum" placeholder="其他金额"  type="text"></el-input></div>
                  <div class="monernum"> <span>{{changejfnum}}</span> <span style="color:#4B73FF;font-size:16px">积分</span> </div>
                </div> -->
                </template>
              </div>
            </div>
            <div class="paytype">
              <div class="infotitle">支付方式</div>
              <div class="payitembox">
                <div class="payitem"><img src="@/assets/images/wxpay.png" alt="">微信支付</div>
              </div>
            </div>
          </div>
          <div class="tipspay">
              <div class="tipspayleft">提示：未使用积分可进行在我的钱包里退款操</div>
              <div class="tipspayright"> <span class="paymoney">应付金额：<span>{{money}}</span> 元</span> <el-button class="paybtn" @click="paybtn">立即支付</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import {paymentScore } from "@/api/index";
import { mapGetters } from "vuex";
export default {
  name: "recharge",
  components: {
    CommonHeader
  },
  data() {
    return {
      navList:[],
      id:'',
      money:'',
      detile:''
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    activeFun(data){
      this.money = data.price;
      this.id = data.id;
      this.detile = data.score;
      this.navList.forEach(function(obj){
       obj.isActive = false;
      });
      data.isActive = !data.isActive;
    },
    change(e){
      this.money = this.price;
      console.log(this.money,this.jfnum )
    },
    paybtn(){
      this.$router.push({ path: '/paypage', query: { paynum: this.money,id:this.id,detile:this.detile}});
    },
     load() {
      var data ={}
      paymentScore(data).then(res => {
        var list = res.data;
        this.money = res.data[0].price;
        this.id = res.data[0].id;
        this.detile = res.data[0].score;
       list.forEach(function(item,index){
            if(index==0){
                  item.isActive=true
            }else{
              item.isActive=false
            }
        })
        this.navList = list;
      }).catch(err=>{
      });
    },
  }
};
</script>

<style scoped>
.pro_app {
  width: 100%;
  /*min-height: 100vh-120px;*/
  height: calc(100vh);
  background: #f8f8f8;
}
.container {
  width: 100%;
  background-color: #f8f8f8;
}
.main {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  height: calc(100vh - 60px);
  margin-top: 20px;
}
.title {
  box-sizing: border-box;
  padding-left: 40px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  color: #333;
}
.moneyinfo {
  box-sizing: border-box;
  padding-left: 40px;
}
.moneyinfo > div {
  display: flex;
  margin-top: 30px;
}
.infotitle {
  width: 100px;
}
.itembox {
  display: flex;
}
.item {
  cursor: pointer;
  margin-left: 30px;
  width: 120px;
  height: 75px;
  border-radius: 5px;
  border: 1px solid rgba(219, 223, 230, 1);
  text-align: center;
  box-sizing: border-box;
  padding-top: 10px;
}
.iteminpt{
    margin-left: 30px;
    width: 170px;
    height: 75px;
    border-radius: 5px;
    border: 1px solid rgba(219, 223, 230, 1);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.iteminpt .runmony{
  width:56px;
  height:20px;
  font-size: 14px;
  color: #999;
  border: none;
  outline-color: none;
}
.item .monernum {
  font-weight: bold;
  color: #4b73ff;
  font-size: 16px;
}
.item .jfnum {
  color: #999;
  font-size: 14px;
  margin-top: 6px;
}
.jfnumtop{
  color: #999;
  font-size: 14px;
  margin-top: 16px;
}
.z_score{
  color: #F26820;
  font-size: 10px;
  margin-top: 5px;
}
.item:first-child {
  margin-left: 0;
}
.paytype {
  align-items: center;
}
.payitembox {
  display: flex;
}
.payitem {
  width: 130px;
  height: 40px;
  background: rgba(0, 188, 3, 1);
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  align-items: center;
  display: flex;
  justify-content: center;
}
.payitem img{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.tipspay{
    border-top: 1px solid #F1F1F1;
    margin-top: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 30px 40px 0 40px;
}
.tipspay .tipspayleft{
    font-size: 14px;
    color: #999;
}
.tipspayright .paymoney{
    color: #333;
    font-size: 14px;
}
.tipspayright .paymoney span{
    color:#FF0000;
    font-size: 18px;
}
.paybtn{
    width:100px;
    height:40px;
    color: #fff;
    background:rgba(255,122,0,1);
    border-radius:5px;
    margin-left: 20px;
}
.active{
 border: 1px solid #4B73FF;
 position: relative;
 overflow: hidden;
}
.active::after{
      border-bottom: 12px solid #4B73FF;
     /* border-right: 9px solid transparent; */
     border-top: 12px solid transparent;
      border-left: 12px solid transparent;
      content: " ";
     display: block;
     height: 0;
     width: 0;
     position: absolute;
     right: 0;
     bottom: 0;
}
</style>
<style>
.jfnum .el-input__inner{
  padding:0;
  border:none;
  width: 60px;
  height: 20px;
  line-height: 20px;
  color:#999;
}
</style>
