<template>
  <div class="page-mygift-index">
    <common-header></common-header>
    <div class="page-container">
       <p>我的礼品</p>
       <div class="btn-search">
          <input type="text" v-model="seachtxt" placeholder="请输入礼品名称">
          <button @click="handleSearch()">查询</button>
       </div>
       <el-table :data="tableData" :header-cell-style="{background:'#EDF2F7',color:'#333'}"  :cell-style="cellStyle" border>
          <el-table-column  prop="id" align="center" label="商品编码"></el-table-column>
          <el-table-column  align="center" label="礼品名称">
            <template slot-scope="scope">
              <div class="giftName">
                <img :src="scope.row.goods_img">
                <span>{{scope.row.goods_name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column  prop="surplus_num" align="center" label="剩余数量"></el-table-column>
          <el-table-column  prop="goods_num" align="center" label="采购数量"></el-table-column>
          <el-table-column  prop="order_time" align="center" label="采购时间"></el-table-column>
          <el-table-column  prop="pay_integral" align="center" label="支付金额"></el-table-column>
          <el-table-column  prop="id" align="center" label="操作">
             <template slot-scope="scope">
                <el-button
                   @click="handleClick(scope.row.id)"
                   type="text"
                   size="small"
                >查看详情</el-button>
             </template>
          </el-table-column>
       </el-table>
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
</template>

<script>
import CommonHeader from "@/components/header/index";
import { myGift } from "@/api/index";
export default {
  name: "page-mygift-index",
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
      seachtxt:''
    };
  },
  mounted() { 
    this.load();
  },
  //方法
  methods: {
    load(goods_name) {
      var data = { page: this.page, page_size: this.page_size ,goods_name:goods_name?goods_name:''};
      myGift(data)
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

      //查询
      handleSearch(){
         var goods_name = this.seachtxt;
         this.load(goods_name)
      },
      //操作
      handleClick(id) {
          this.$router.push({path: '/mygift-giftState', query: {prize_id: id}})
      },
      cellStyle:function (row, column, rowIndex, columnIndex) {
          if(row.column.label === "支付金额"){
               return 'font-weight:bold;color:red;'
            }else{
                return ''
            }
         },
      handleSizeChange(val) {
        this.page_size = val;
        this.load();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.load();
       },
    },
 
   
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
.page-container{
    width:1200px;
    height:1315px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 5px 0px rgba(214,214,214,0.45);
    margin-top:20px;
    left:50%;
    margin-left:-600px;
    position: relative;
    margin-bottom:88px;
}
.page-container p{
    width:100%;
    height:22px;
    padding:20px;
    border-bottom:1px solid #F5F5F5;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.page-container .btn-search{
    margin-top:30px;
    padding-left:20px;
    padding-right:20px;
}
.page-container .btn-search input{
    width:220px;
    height:20px;
    border-radius:5px;
    border:1px solid rgba(219,223,230,1);
    outline:none;
    padding-top:8px;
    padding-left:10px;
    padding-bottom:8px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(192,196,204,1);
    line-height:20px;
}
.page-container .btn-search button{
    width:84px;
    height:36px;
    background:rgba(125,155,255,1);
    border-radius:3px;
    border:none;
    outline:none;
    margin-left:30px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 36px;
}
.el-table{
  margin-top:20px;
  margin-left:20px;
  width:1160px;
}
.giftName{
  display:flex;
}
.giftName img{
  width:60px;
  height:60px;
  margin-right:14px;
}
.giftName span{
  display:flex;
  justify-content: center;
  align-items: center;
}
.pagebox{
  margin-top:20px;
  display: flex;
  padding:0 20px;
  float:right;
}
</style>


