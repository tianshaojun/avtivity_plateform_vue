<template>
  <div class="pro_app">
    <common-header></common-header>
    <div class="container">
      <div class="main">
        <div class="paybox">
          <div class="title">在线支付</div>
          <div class="moneyinfo">
            <div class="user">
              <div class="infotitle">商品详情</div>
              <div>{{detile}}积分充值</div>
            </div>
            <div class="user">
              <div class="infotitle">订单号</div>
              <div>{{out_trade_no}}</div>
            </div>
            <div class="user">
              <div class="infotitle">收款方</div>
              <div>北京魔力游网络技术有限公司</div>
            </div>
          </div>
          <div class="erweimabox">
            <div class="num">待支付：
              <span style="color:#FF0000;font-size:18px">{{paynum}}</span> 元
            </div>
            <div class="wximg">
              <div class="wxUrlbox">
                <img class="wxUrl" :src="wxUrl" alt>
              </div>
              <div style="font-size:12px;color:#333;margin-top:10px">使用【微信扫一扫】即可付款</div>
            </div>
            <div class="tips">温馨提示：如果支付成功，此页面没有跳转，请到订单中心查看处理情况</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import { orderqrcode, codestatus } from "@/api/index";
export default {
  name: "paypage",
  components: {
    CommonHeader
  },
  data() {
    return {
      wxUrl: "",
      out_trade_no: "",
      timer: "",
      paynum:'',
      id:'',
      detile:''
    };
  },
  mounted() {
    this.paynum = this.$route.query.paynum;
    this.id  = this.$route.query.id;
     this.detile  = this.$route.query.detile;
    this.load();
  },
  destroyed(){
    clearInterval(this.timer);
  },
  methods: {
    load() {
      var data = {score_id:this.id};
      orderqrcode(data)
        .then(res => {
          console.log(res.data);
          if (res.code == 200) {
            this.out_trade_no = res.data.out_trade_no;
            this.wxUrl = res.data.code_url;
            this.timer = setInterval(() => {
              this.codestatus();
            }, 3000);
          }
        })

        .catch(err => {
          console.log(err);
        });
    },
    codestatus() {
      var data = { out_trade_no: this.out_trade_no };
      codestatus(data)
        .then(res => {
          if (res.code == 200 && res.data.status == 2) {
            clearInterval(this.timer);
           this.$message({
                message: '支付成功！',
                type: 'success',
                duration:1500
              });
              setTimeout(()=>{this.$router.push({ path: '/rechargeDetails'});},1500)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.erweimabox {
  text-align: center;
}
.erweimabox .num {
  margin: 60px 0 40px 0;
}
.erweimabox .wxUrlbox {
  height: 173px;
}
.erweimabox {
}
.wximg {
  width: 180px;
  height: 210px;
  border: 1px solid rgba(225, 225, 225, 1);
  margin: 0 auto;
}
.wxUrl {
  width: 173px;
  height: 173px;
  margin-top: 4px;
}
.tips {
  margin-top: 30px;
  color: #999;
  font-size: 14px;
}
</style>
