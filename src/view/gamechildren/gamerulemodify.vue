<template>
  <div>
    <div class="title">{{titleName}}-游戏</div>
    <div class="content">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="rule_form"
      >
        <!--<el-form-item label="规则类型" prop="region">
          <el-select v-model="ruleForm.type">
            <el-option label="活动规则" value="1"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="规则描述" prop="rule">
          <el-input type="textarea" v-model="ruleForm.rule"></el-input>
        </el-form-item>
        <!--<el-form-item label="状态">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">冻结</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item class="rule_formBtn">
          <el-button type="primary" :disabled="disdata" @click="marketingAdd('ruleForm')">提交</el-button>
          <el-button @click="backGoog">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {marketingInfo, marketingUpd ,GameaddRuleList} from "@/api/index";
export default {

  name: "rulemodify",
  data() {
    return {
      disdata:false,
      titleName:"新增规则",
      labelPosition: "left",
      ruleForm: {

        rule: "",

      },
      rules: {
        rule: [
          { required: true, message: "请输入活动规则描述", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
	console.log(this.$route.query)
    if (!!this.$route.query.upid) {
      this.titleName = "规则修改";
      this.ruleForm.rule=this.$route.query.rule
//    this.marketingInfo();
    }
  },
  methods: {
    marketingInfo(){
      var data = {
      box_id : localStorage.getItem("box_id"),
      content_id:this.$route.query.upid
      };
      marketingInfo(data).then(res => {
              if (res.code == 200) {
               this.ruleForm= res.data
              }
            }).catch(err=>{
        console.log(err)
      });
    },
    marketingAdd(formname) {
      var _this = this;
      var data = _this.ruleForm;
      data.activityId = localStorage.getItem("box_id");
      data.gameName = localStorage.getItem("names");
      _this.$refs[formname].validate(valid => {
        if (valid) {
          _this.disdata=true
          if (!!_this.$route.query.upid) {
            data.ruleId=_this.$route.query.upid
            GameaddRuleList(data).then(res => {
              if (res.code == 200) {
                _this.$message({
                  message: "修改规则成功",
                  type: "success"
                });
                setTimeout(function() {
                  _this.$router.push("/gamerule");
                }, 3000);
              }else{
                _this.disdata=false
              }
            }).catch(err=>{
              _this.disdata=false
            });
          } else {
            GameaddRuleList(data).then(res => {
              if (res.code == 200) {
                _this.$message({
                  message: "新增规则成功",
                  type: "success"
                });
                setTimeout(function() {
                  _this.$router.push("/gamerule");
                }, 3000);
              }else{
                _this.disdata=false
              }
            }).catch(err=>{
              _this.disdata=false
            });
          }
        }
      });
    },
    backGoog() {
      this.$router.push("/gamerule");
    },
  }
};
</script>

<style scoped>
.home_app {
  width: 100%;
  min-height: 100vh;
  background: #f8f8f8;
}
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
.rule_form {
  width: 460px;
}
</style>
<style>
.rule_form .el-input__inner {
  width: 230px;
}
.rule_form .rule_formBtn {
  margin-left: 70px;
  margin-top: 80px;
}
.el-textarea__inner {
  min-height: 140px !important;
}
</style>


