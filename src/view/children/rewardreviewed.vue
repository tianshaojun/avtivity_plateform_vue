    <template>
  <div>
    <div class="title">奖励记录</div>
    <div class="content">
      <div>
        <el-form :inline="true" :model="formInline" ref="formInli" class="demo-form-inline">
          <el-form-item label="用户ID" prop="user">
            <el-input v-model="formInline.user" placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item label="奖励类型" prop="user">
            <el-input v-model="formInline.user" placeholder="奖励类型"></el-input>
          </el-form-item>
          <!--<el-form-item label="审批人" prop="user">-->
            <!--<el-input v-model="formInline.user" placeholder="审批人"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button @click="resetForm('formInli')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox">
        <el-table :data="tableData" border>
          <el-table-column prop="date" label="用户ID"></el-table-column>
          <el-table-column prop="name" label="用户昵称"></el-table-column>
          <el-table-column prop="province" label="用户头像"></el-table-column>
          <el-table-column prop="city" label="奖励金额(元)"></el-table-column>
          <el-table-column prop="address" label="奖励类型"></el-table-column>
          <el-table-column prop="zip" label="奖励描述"></el-table-column>
          <el-table-column prop="address" label="奖励时间"></el-table-column>
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
  data() {
    return {
        formInline: {
          user: '',
          region: ''
        },
      currentPage4: 4,
      multipleSelection: "",
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
    },
    handleSelectionChange(val) {
      var add = [];
      this.multipleSelection = val;
      val.forEach(i => {
        console.log(add.push(i.address));
        console.log(add);
      });
    },
     resetForm(formName) {
        this.$refs[formName].resetFields();
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
.newAdd {
  margin-bottom: 20px;
}
</style>
<style>
.tableBox{
     margin-top: 20px;
}
.tableBox th,
.tableBox td {
  text-align: center !important;
}
.tableBox thead tr {
  background: #edf2f7;
}
.el-button--primary {
  background-color: #7d9bff;
  border-color: #7d9bff;
}
.el-button {
  /* height:36px;
    line-height: 36px;
    padding: 0 20px; */
}
</style>


