<template>
  <div>
    <div class="title">消息管理</div>
    <div class="content">
      <div class="newAdd">
        <router-link :to="{ path:'message',query:{id:'456'}}">
        <el-button type="primary">新增</el-button>
        </router-link>
      </div>
      <div class="tableBox">
        <el-table :data="tableData" border>
          <el-table-column prop="date" label="ID"></el-table-column>
          <el-table-column prop="name" label="消息类型"></el-table-column>
          <el-table-column prop="province" label="消息号"></el-table-column>
          <el-table-column prop="city" label="消息模板ID"></el-table-column>
          <el-table-column prop="address" label="消息跳转链接"></el-table-column>
          <el-table-column prop="zip" label="标题"></el-table-column>
          <el-table-column prop="address" label="提示信息"></el-table-column>
          <el-table-column prop="zip" label="类型"></el-table-column>
          <el-table-column prop="zip" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{ path:'message',query:{id:'456'}}">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              </router-link>
                <el-button type="text" size="small" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="2"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsAdmin",
  props:['id'],
  data() {
    return {
      currentPage4: 4,
      GoodData: {
        id: "",
        time: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {
    //      console.log(this.$store.state.user);
    //      console.log(this.$request)
    console.log(this.id,"消息管理的box_id")
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
</style>


