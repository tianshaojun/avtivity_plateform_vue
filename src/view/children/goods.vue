<template>
  <div>
    <div class="title">商品管理</div>
    <div class="content">
      <div>
        <el-form :inline="true" :model="GoodData" ref="GoodData" class="demo-form-inline">
          <el-form-item label="商品ID" prop="goods_id">
            <el-input v-model="GoodData.goods_id" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goods_title">
            <el-input v-model="GoodData.goods_title" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('GoodData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="newAdd">
        <router-link :to="{ path:'goodsAdd'}">
          <el-button type="primary">新增</el-button>
        </router-link>
      </div>
      <div class="tableBox">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="商品ID"></el-table-column>
          <el-table-column prop="title" label="商品名称"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.goods_img" class="head_pic">
            </template>
          </el-table-column>
          <el-table-column prop="gold" label="消耗积分"></el-table-column>
          <el-table-column prop="ex_money" label="兑换金额"></el-table-column>
          <el-table-column prop="list_order" label="排序"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="updgoods(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="deletGood(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox" v-if="tableData.length>0">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="GoodData.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="GoodData.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsIndex, goodsAdd,goodsUpd,goodDel } from "@/api/index";
export default {
  name: "goodsAdmin",
  data() {
    return {
       count: 0,
      currentPage4: 4,
      GoodData: {
        goods_id: "",
        goods_title: "",
        page: 1,
        page_size: 10
      },
      tableData: []
    };
  },
  created() {
    this.load()
  },
  methods: {
     load() {
       var data = this.GoodData;
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      goodsIndex(data).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.count = parseInt(res.data.count);
      }).catch(err=>{
        console.log(err)
      });
    },
    //查询
    onSubmit() {
     this.load()
    },
    //修改
    updgoods(id){
      this.$router.push({path: '/goodsAdd', query: {upid: id}})
    },
    //删除
    deletGood(id){
        var data = {
          goods_id: id,
         box_id: localStorage.getItem("box_id"),
        tmp_id:localStorage.getItem("tmp_id")
        };
      this.$confirm("确定该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        goodDel(data).then(res => {
          console.log(res);
             this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.load()
        }).catch(err=>{
          console.log(err)
        });

      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     handleSizeChange(val) {
      this.GoodData.page_size = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.GoodData.page = val;
      this.load();
    }
  }
};
</script>

<style scoped>
.title {
  padding-left: 40px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
}
.content {
  padding: 30px 150px 0 40px;
}
.pagebox {
  text-align: right;
  margin-top: 20px;
      margin-bottom: 60px;
}
.newAdd{
    margin-bottom: 20px;
}
</style>
<style>
.tableBox th,
.tableBox td {
  text-align: center !important;
}
.tableBox thead tr {
  background: #edf2f7;
}
.el-button--primary{
    background-color: #7D9BFF;
     border-color:#7D9BFF;
}
.el-button{
    /* height:36px;
    line-height: 36px;
    padding: 0 20px; */
}
.head_pic {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
</style>


