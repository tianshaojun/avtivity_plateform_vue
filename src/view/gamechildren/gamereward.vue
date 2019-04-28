<template>
  <div>
    <div class="title">奖励管理-游戏</div>
    <div class="content">
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="rewarForm"
        class="rewar_form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <!--<el-form-item label="用户打开小程序奖励">-->
              <!--<el-input v-model="rewarForm.redbag_money" type="number"></el-input>-->
            <!--</el-form-item>-->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第一段用户数">
              <el-input v-model="rewarForm.rewardList[0].score" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="masternum" label="第一段获取金额">
              <el-input v-model="rewarForm.rewardList[0].integral" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第二段用户数">
              <el-input v-model="rewarForm.rewardList[1].score" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="masternum" label="第二段获取金额">
              <el-input v-model="rewarForm.rewardList[1].integral" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第三段用户数">
              <el-input v-model="rewarForm.rewardList[2].score" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="masternum" label="第三段获取金额">
              <el-input v-model="rewarForm.rewardList[2].integral" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第四段用户数">
              <el-input v-model="rewarForm.rewardList[3].score" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="masternum" label="第四段获取金额">
              <el-input v-model="rewarForm.rewardList[3].integral" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item class="rewarForm_formBtn">
            <el-button type="primary" @click="submitForm(rewarForm)">提交</el-button>
            <!--<el-button>返回</el-button>-->
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import { rewardgame,rewardupdate } from "@/api/index";
export default {
  name: "reward",
  components: {
    CommonHeader
  },
  data() {
    return {
      box_id:"",
      labelPosition: "left",
      rewarForm: {
        rewardList:[
          {score:0,integral:0},
          {score:0,integral:0},
          {score:0,integral:0},
          {score:0,integral:0}],
      }
    };
  },
  created() {
    this.getRewarddata()
  },
  methods: {
//    拉取默认数据
    getRewarddata(){
    	var data={}
      if(localStorage.getItem("box_id")){
        data.activityId = localStorage.getItem("box_id");
      }
      if(localStorage.getItem("names")){
        data.gameName = localStorage.getItem("names");
      }
      rewardgame(data).then(res=>{
        if(res.code==200){
        if(res.data){
          console.log(res,"返回的数据")
        this.rewarForm.rewardList=res.data.awardList
        }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
//    修改提交数据
    submitForm(data){
      var data = data
      if(localStorage.getItem("box_id")){
        data.activityId = localStorage.getItem("box_id");
      }
      if(localStorage.getItem("names")){
        data.gameName = localStorage.getItem("names");
      }
      rewardupdate(data).then(res=>{
        console.log(res)
        if(res.code==200){
          if(res.data){
               this.$message({
          type: "success",
          message: "提交成功！"
        });
            console.log(res,"返回的数据")
          }
        }else{

        }
      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
  padding: 30px 0 0 40px;
  box-sizing: border-box;
  overflow: hidden;
}
.rewarForm_formBtn {
  margin-top: 80px;
  margin-left: 22%;
}
  .masternum{
    margin-left:40px;

  }

</style>



