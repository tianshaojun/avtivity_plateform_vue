<template>
  <div>
    <div class="title">规则管理-游戏</div>
    <div class="content">
      <div class="newAdd">
        <router-link to="/gamerulemodify">
          <el-button type="primary">新增</el-button>
        </router-link>
      </div>
      <div class="tableBox">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="rule" label="规则描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="updRule(scope.row.id,scope.row.rule)">修改</el-button>
              <el-button type="text" @click="delRule(scope.row.id)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox" v-if="tableData.length>0" >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="RuleData.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="RuleData.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { markeTing,marketingDel,GameRuleList,GamedelRuleList} from "@/api/index";
export default {
  name: "goodsAdmin",
  data() {
    return {
       count: 0,
      RuleData: {
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
    //修改
   updRule(upid,rule){
     this.$router.push({path:'/gamerulemodify',query:{upid:upid,rule:rule}});
   },
   //删除
   delRule(id){
         var data = {
          ruleId: id,
         activityId: localStorage.getItem("box_id"),
        gameName : localStorage.getItem("names")
        };
      this.$confirm("确定删除该规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        GamedelRuleList(data).then(res => {
          console.log(res);
             this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.load()
        });

      }).catch(err=>{
        console.log(err)
      });
   },
   load() {
       var data = this.RuleData;
      data.activityId = localStorage.getItem("box_id");
      GameRuleList(data).then(res => {
        console.log(res);
        this.tableData = res.data.ruleList;
        this.count = parseInt(res.data.count);
      }).catch(err=>{
        console.log(err)
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     handleSizeChange(val) {
      this.RuleData.page_size = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.RuleData.page = val;
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
</style>


