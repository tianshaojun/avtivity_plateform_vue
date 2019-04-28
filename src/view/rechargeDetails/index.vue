<template>
  <div class="pro_app">
    <common-header></common-header>
    <div class="container">
      <div class="main">
        <div class="Dtitle">
             <img class="userheaderImg" v-if="userInfo.adminUser.headimg" :src="userInfo.adminUser.headimg" alt>
             <div class="balance">账户积分余额：<span>{{balance}}</span></div>
             <div class="btnbox">
                 <el-button class="el-button el-button--primary" @click="rechargebtn">立即充值</el-button>
                 <el-button disabled>提现</el-button>
             </div>
        </div>
        <div class="record">
          <ul class="title tab_tit">
            <li v-for="(tab,index) in tabs" :key='index' :class="{tab_tit_cur:curtab==index}" @click="toggletab(index)" v-html="tab.title"></li>
          </ul>
          <div class="tableBox" v-show="isShowOwnCards">
              <el-table :data="tableData" border>
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="create_time" label="充值时间"></el-table-column>
                <el-table-column prop="account" label="充值账户"></el-table-column>
                <el-table-column prop="payment_val" label="充值方式"></el-table-column>
                <el-table-column prop="payment_money" label="到账金额"></el-table-column>
                <el-table-column prop="order_number" label="充值订单号"></el-table-column>
                <el-table-column prop="status_val" label="状态"></el-table-column>
              </el-table>
          </div>
          <div class="tableBox" v-show="!isShowOwnCards">
              <el-table :data="tableData" border>
                <el-table-column prop="order_number" label="订单号"></el-table-column>
                <!-- <el-table-column prop="" label="产品"></el-table-column> -->
                <el-table-column prop="create_time" label="订单时间"></el-table-column>
                <el-table-column prop="prize_num" label="奖品总数"></el-table-column>
                <el-table-column prop="prize_integral" label="积分总额"></el-table-column>
                <el-table-column prop="statusVal" label="订单状态"></el-table-column>
                <el-table-column prop="id" label="操作"><el-button></el-button>
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick(scope.row.id,scope.row.status)"
                      type="text"
                      size="small"
                      v-if="scope.row.status==1"
                    >查看详情</el-button>
                    <el-button
                      @click="handleClick(scope.row.id,scope.row.status)"
                      type="text"
                      size="small"
                      v-if="scope.row.status==2"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </div>
          <div class="pagebox" v-if="tableData.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="count"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import { paymentList,orderList } from "@/api/index";
import { mapGetters } from "vuex";
export default {
  name: "paypage",
  components: {
    CommonHeader
  },
  data() {
    return {
      page: 1,
      page_size: 10,
      count: 0,
      balance:'',
      tableData: [],
      temp:true,
      tabs:[{id:0,title:"充值记录",iscurTab:true},{id:1,title:"订单记录",iscurTab:false}],
      curtab:0,      
      isShowOwnCards:true   
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      var data = { page: this.page, page_size: this.page_size };
      paymentList(data)
          .then(res => {
            console.log(res);
            this.tableData = res.data.list;
            this.count = parseInt(res.data.count);
            this.balance = res.data.total_price;
            console.log(this.count);
          })
          .catch(err => {
            console.log(err);
          });
      },
      loadList() { 
        var data = { page: this.page, page_size: this.page_size };
        orderList(data)
          .then(res => {
            console.log(res);
            this.tableData = res.data.order_list;
            this.count = parseInt(res.data.count);
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleSizeChange(val) {
        this.page_size = val;
        if( this.isShowOwnCards==true) {
            this.load();
        }else{
          this.loadList();  
        }
      },
      handleCurrentChange(val) {
        this.page = val;
        if( this.isShowOwnCards==true) {
            this.load();
        }else{
          this.loadList();  
        }
        
      },
      rechargebtn(){
        this.$router.push({ path: '/recharge'});
      },
      toggletab:function(index){
        this.page=1;
        this.page_size=10;
        this.curtab=index;
        if(index==0){         
            this.isShowOwnCards=true;
            this.load();       
        }else{
            this.isShowOwnCards=false;  
            this.loadList();     
        }
      },
      handleClick(id){
        this.$router.push({ path: '/rechargeDetails-order', query: {order_id: id}});
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
  height: calc(100vh - 60px);
  margin-top: 20px;
}
.Dtitle {
  width: 1200px;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}
.userheaderImg{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: red;
    display: block;
}
.balance{
    margin-left: 100px;
    color: #333;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.balance span{
    color: #F50909;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:bold;
}
.btnbox{
    flex: 1;
    text-align: right;
}
.record {
  width: 100%;
  min-height: 583px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0 20px 60px 20px;
}
.recordtit {
  color: #333;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
}
.pagebox {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 60px;
}
.tableBox thead tr {
  background: red !important;
}
/* tsj-修改 */
.title{
  width:100%;
  height:66px;
  list-style: none;
  display: flex;
  align-items:center;
}
.title li{
  margin-right:20px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#333;
  cursor:default;
}
.tab_tit li{
  cursor: pointer;
}
.tab_tit_cur{
  font-weight:bold !important;
}
</style>
<style>
.tableBox th,
.tableBox td {
  text-align: center !important;
}
.tableBox thead tr {
  background: #edf2f7 !important;
}
.el-table th {
  background-color: #edf2f7 !important;
}
.el-button--primary {
  background-color: #7d9bff;
  border-color: #7d9bff;
}
</style>



