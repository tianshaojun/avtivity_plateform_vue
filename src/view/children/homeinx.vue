<template>
  <div>
    <div class="title">用户管理</div>
    <div class="content">
      <div>
        <el-form :inline="true" :model="formData" ref="formData" class="form-inline">
          <el-form-item label="用 户 I D" prop="user_id" style="width:280px;">
            <el-input v-model="formData.user_id" placeholder="请输入您要查询的ID"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname" style="width:280px;">
            <el-input v-model="formData.nickname" placeholder="请输入您要查询的昵称"></el-input>
          </el-form-item>
          <el-form-item label="上级用户ID" prop="user_pid" style="width:280px;">
            <el-input v-model="formData.user_pid" placeholder="请输入您要查询的ID"></el-input>
          </el-form-item>
          <br>
          <!--<el-form-item label="用户状态" prop="use_state" style="width:280px;">
            <el-select v-model="formData.use_state" placeholder="正常" style="width:185px;">
              <el-option label="正常" value="1"></el-option>
              <el-option label="封杀" value="2"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="创建时间" prop="slot_time" style="width:495px;">
            <el-date-picker
              v-model="formData.slot_time"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="user_pname" label="上级用户"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column label="用户头像">
            <template slot-scope="scope">
              <img :src="scope.row.headimg" class="head_pic">
            </template>
          </el-table-column>
          <el-table-column prop="area" label="地区"></el-table-column>
          <el-table-column prop="phone_type" label="手机机型"></el-table-column>
          <el-table-column prop="status_val" label="用户状态"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row.id,scope.row.status)"
                type="text"
                size="small"
                v-if="scope.row.status==1"
              >封杀</el-button>
              <el-button
                @click="handleClick(scope.row.id,scope.row.status)"
                type="text"
                size="small"
                v-if="scope.row.status==2"
              >解冻</el-button>
              <!-- <router-link to="/rulemodify">
                <el-button type="text" size="small">统计</el-button>
              </router-link> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox" v-if="tableData.length>0" >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formData.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="formData.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { userIndex, userStatus } from "@/api/index";
export default {
  name: "goodsAdmin",
  props:['id'],
  data() {
    return {
      formData: {
        user_id: "",
        nickname: "",
        user_pid: "",
        use_state: "",
        slot_time: "",
        page: 1,
        page_size: 10
      },
      count: 0,
      multipleSelection: "",
      GoodData: {
        id: "",
        time: ""
      },
      tableData: []
    };
  },
  mounted() {

  },
  created() {
    this.load();
  },

  methods: {
    load() {
      var data = this.formData;
      data.box_id = localStorage.getItem("box_id");
      data.tmp_id = localStorage.getItem("tmp_id");
      userIndex(data).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.count = parseInt(res.data.count);
        console.log(this.count);
      }).catch(err=>{
        console.log(err)
      });
    },
    //封杀
    handleClick(id, status) {
       window._hmt.push(['_trackEvent', '用户管理', 'click','封杀']);
      var data = {
          box_id: localStorage.getItem("box_id"),
          tmp_id:localStorage.getItem("tmp_id"),
          user_id: id,
          status: status==1?2:1
        };
        var text = status==1?"确定封杀该用户, 是否继续?":"确定为该用户解冻, 是否继续?"
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        userStatus(data).then(res => {
             this.$message({
          type: "success",
          message: "修改成功!"
        });
        setTimeout(()=>{
          window.location.reload();
        },2000)
        }).catch(err=>{
          console.log(err)
        });

      });
    },
    onSubmit() {
       window._hmt.push(['_trackEvent', '用户管理', 'click','搜索']);
      this.load();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formData.page_size = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.formData.page = val;
      this.load();
    }
  },

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
.tableBox thead tr {
  background: #edf2f7 !important;
}
</style>
<style>
  .el-button--text{
    padding:0 3px;
  }
.el-dropdown .el-button {
  width: 185px !important;
}
.tableBox {
  margin-top: 20px;
}
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
.el-button {
  /* height:36px;
    line-height: 36px;
    padding: 0 20px; */
}
.el-form--inline .el-form-item__label {
  width: 90px;
}
.head_pic {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
</style>


