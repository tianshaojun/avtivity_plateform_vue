<template>
  <div class="page-mygift-index">
    <common-header></common-header>
    <div class="page-container">
       <p>我的礼品</p>
       <el-table ref="filterTable" :data="tableData" border :header-cell-style="{background:'#EDF2F7',color:'#333',height:'50px',margin:0,padding:0}">
          <el-table-column  prop="order_goods_id" align="center" label="商品编码"></el-table-column>
          <el-table-column  prop="goods_name" align="center" label="礼品名称"></el-table-column>
          <!-- <el-table-column  prop="" align="center" label="操作类型"></el-table-column> -->
          <el-table-column  prop="status" align="center" label="消耗数量"></el-table-column>
          <el-table-column  prop="activity_time" align="center" label="活动时间"></el-table-column>
          <el-table-column  prop="activity_name" align="center" label="使用活动"></el-table-column>
          <el-table-column  prop="statusVal" align="center" label="派发粉丝"
           :filters="[{ text: '未派发', value: '未派发' }, { text: '已派发', value: '已派发' }]"
           :filter-method="filterTag"
           filter-placement="bottom-end">
              <template slot-scope="scope">
                 <div
                  :type="scope.row.tag === '未派发' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.statusVal}}
                 </div>
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
import { giftDetail,myGift } from "@/api/index";
import { mapGetters } from "vuex";
export default {
  name: "page-mygift-giftState",
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
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.load(); 
  },
  //方法
  methods: {
     load() {
      var data = { page: this.page, page_size: this.page_size,prize_id:this.$route.query.prize_id};
      giftDetail(data)
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
    handleSizeChange(val) {
      this.page_size = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.load();
    },
    filterTag(value, row) {
        return row.statusVal === value;
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    }
  }
};
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
  margin-top:86px;
  margin-left:20px;
  width:1160px;
}
.pagebox{
  margin-top:20px;
  display: flex;
  padding:0 20px;
  float:right;
}
.el-icon-arrow-down:before{
  font-size:14px;
}
</style>
