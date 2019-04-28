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
          <p class="recordtit">订单详情</p>
          <div class="tableBox">
            <el-table :data="tableData" :span-method="objectSpanMethod" border>
              <el-table-column prop="order_number" label="订单号"></el-table-column>
              <el-table-column prop="goods_name" label="产品"></el-table-column>
              <el-table-column prop="goods_num" label="数量"></el-table-column>
              <el-table-column prop="order_time" label="订单完成时间"></el-table-column>
              <el-table-column prop="prize_integral" label="单价积分"></el-table-column>
              <el-table-column prop="prize_integral" label="积分总额"></el-table-column>
              <el-table-column prop="statusVal" label="订单状态"></el-table-column>
            </el-table>
          </div>
          <!-- <div class="pagebox" v-if="tableData.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="count"
            ></el-pagination>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import { paymentList,orderList,orderDetail } from "@/api/index";
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
      alldata:''
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
      var data = { page: this.page, page_size: this.page_size, order_id:this.$route.query.order_id };
      //显示账户余额
      paymentList(data)
        .then(res => {
           this.balance = res.data.total_price;
        })
        .catch(err => {
          console.log(err)
        });
      
      orderList(data)
        .then(res => {
          console.log(res);
          this.tableData = res.data.order_list;
        })
        .catch(err => {
          console.log(err);
        });
      orderDetail(data)
        .then(res => {
          this.tableData = res.data.goodsList;
          var resdata = res.data;
          this.tableData.forEach((item, index, array) => {
             this.tableData[index].order_number = resdata.order_number;
             this.tableData[index].prize_integral = resdata.prize_integral;
             this.tableData[index].statusVal = resdata.statusVal;
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.load();
    },
    rechargebtn(){
         this.$router.push({ path: '/recharge'});
    },
    //表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row,column,rowIndex,columnIndex,5555)
        if (columnIndex === 0 || columnIndex === 5 || columnIndex === 6) {
          if (rowIndex % this.tableData.length === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
     }
  }
}
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
  color:rgba(153,153,153,1);
  cursor:default;
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



