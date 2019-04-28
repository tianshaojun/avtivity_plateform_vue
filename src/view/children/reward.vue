<template>
  <div>
    <div class="title">奖励管理</div>
    <div class="content">
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="rewarForm"
        class="rewar_form"
      >
         <div v-if='tmp_id == 27'>
            <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="打开任务奖励" class="form_item_double inputs">
                  <div class="double_list" >
                    <div class="double_item" style="display:flex;">
                      <el-input type="number" v-model="rewarForm.money_open.open_num" placeholder="次"></el-input>
                      <span class="icon_equal">~</span>
                      <el-input type="number" v-model="rewarForm.money_open.number" placeholder="块"></el-input>
                    </div>
                  </div>
                </el-form-item>
                </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="新用户奖励" prop="invite_number" class="inputs">
                  <el-input v-model="rewarForm.authorize_number" placeholder="设置邀请好友奖励" type="number"></el-input>
                </el-form-item>
                 </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="邀请好友奖励" prop="invite_number" class="inputs">
                  <el-input v-model="rewarForm.invite_number" placeholder="设置邀请好友奖励" type="number"></el-input>
                </el-form-item>
                 </el-col>
          </el-row>
            <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="中奖积分范围" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item" style="display:flex;">
                      <el-input type="number" v-model="rewarForm.money1.min_money" placeholder="最小"></el-input>
                      <span class="icon_equal">~</span>
                      <el-input type="number" v-model="rewarForm.money1.max_money" placeholder="最大"></el-input>
                    </div>
                  </div>
                </el-form-item>
                    </el-col>
          </el-row>

 <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="未中奖积分范围" class="form_item_double inputs">
                  <div class="double_list" >
                    <div class="double_item" style="display:flex;margin-bottom:10px;">
                      <el-input type="number" v-model="rewarForm.money2.min_money" placeholder="最小"></el-input>
                      <span class="icon_equal">~</span>
                      <el-input type="number" v-model="rewarForm.money2.max_money" placeholder="最大"></el-input>
                    </div>
                    <div class="double_item" style="display:flex;">
                      <el-input type="number" v-model="rewarForm.money3.min_money" placeholder="最小"></el-input>
                      <span class="icon_equal">~</span>
                      <el-input type="number" v-model="rewarForm.money3.max_money" placeholder="最大"></el-input>
                    </div>
                  </div>
                </el-form-item> 
                   </el-col>
          </el-row>
         </div>
    
       <div v-if='tmp_id == 1'>
          <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户打开小程序奖励">
              <el-input v-model="rewarForm.redbag_money" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第一段用户数">
              <el-input v-model="rewarForm.money1.number" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第一段获取金额">
              <el-input v-model="rewarForm.money1.money" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第二段用户数">
              <el-input v-model="rewarForm.money2.number" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第二段获取金额">
              <el-input v-model="rewarForm.money2.money" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第三段用户数">
              <el-input v-model="rewarForm.money3.number" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第三段获取金额">
              <el-input v-model="rewarForm.money3.money" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="第四段用户数">
              <el-input v-model="rewarForm.money4.number" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第四段获取金额">
              <el-input v-model="rewarForm.money4.money" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </div>
      <div v-if='tmp_id == 32'>
          <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="新用户授权奖励">
              <el-input v-model="rewarForm.draw_num1" type="number"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
           <el-row :gutter="20">
              <el-col :span="10">
             <el-form-item label="邀请人数奖励次数" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item" style="display:flex;">
                      <el-input type="number" v-model="rewarForm.invite_num" placeholder="人数"></el-input>
                      <span class="icon_equal">~</span>
                      <el-input type="number" v-model="rewarForm.draw_num2" placeholder="次数"></el-input>
                    </div>
                  </div>
                </el-form-item>
                </el-col>
          
        </el-row>
        
       </div>
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
import { getreward,setreward } from "@/api/index";
export default {
  name: "reward",
  components: {
    CommonHeader
  },
  data() {
    return {
      tmp_id:1,
      box_id:"",
      labelPosition: "left",
      rewarForm: {
        redbag_money: "",
        invite_num:'',
        draw_num2:'',
        draw_num1:'',
        money1:
          {
            number: "5",
            money: "3"
          },
        money2:
          {
            number: "5",
            money: "3"
          },
        money3:
          {
            number: "5",
            money: "3"
          },
        money4:
          {
            number: "5",
            money: "3"
          },
           invite_number:"1",
        	money_open:{    
					open_num:"5",
					number:"2"
				},
        money1:{    
                min_money:"100",
                max_money:"200"
              },
        money2:{    
                min_money:"200",
                max_money:"300"
              },
        money3:{    
                min_money:"300",
                max_money:"400"
              },
      }
    };
  },
  created() {
    this.tmp_id = localStorage.getItem("tmp_id");
    this.getRewarddata()
  },
  methods: {
//    拉取默认数据
    getRewarddata(){
      var data ={}
      if(localStorage.getItem("box_id")){
        data.box_id = localStorage.getItem("box_id");
         data.tmp_id = localStorage.getItem("tmp_id");
      }
      console.log(data)
      getreward(data).then(res=>{
      console.log(res,"返回的数据")
        if(res.code==200){
        if(res.data){
          this.rewarForm=res.data
        }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
//    修改提交数据
    submitForm(data){
       window._hmt.push(['_trackEvent', '奖励管理', 'click','奖励管理提交']);
      var data = data
      if(localStorage.getItem("box_id")){
        data.box_id = localStorage.getItem("box_id");
         data.tmp_id = localStorage.getItem("tmp_id");
      }
      setreward(data).then(res=>{
        console.log(res)
        if(res.code==200){
               this.$message({
          type: "success",
          message: "提交成功！"
        });
        }else{

        }
      }).catch(err=>{

        console.log(err)
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      if (key == "1") {
        this.$router.push("/homeindex");
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      if (key == "1-1") {
        this.$router.push("list01");
      }
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
.icon_equal{
  margin:0 20px;
}

</style>



