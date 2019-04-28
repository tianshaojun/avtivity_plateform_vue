<template>
  <div>
    <div class="title">审核页面</div>
    <div class="page">
      <div class="page_left">
        <img src="@/assets/images/fake.png" alt="">
        <div>假页面展示</div>
      </div>
      <div class="page_right">
        <p>注: 待小程序在微信小程序后台审核通过后将假页面切换成正式页面</p>
        <div class="pageright_radio" >
          <el-radio v-model="radio" label="1">假页面</el-radio>
          <el-radio v-model="radio" label="2">正式页面</el-radio>
        </div>
        <el-button type="primary" class="subbtn" :disabled="disbtn" @click="submitradio()">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { audit } from "@/api/index";
  export default {
    name: "",
    data() {
      return {
        disbtn:false,
        radio:'1',
      };
    },
    mounted() {

    },
    methods: {
      submitradio(){
        let _this=this
        _this.disbtn=true
        let data={
          itemStatus:_this.radio,
          box_id: localStorage.getItem("box_id")?localStorage.getItem("box_id"): '',
           tmp_id : localStorage.getItem("tmp_id")
        }
        audit(data).then(res=>{
          if(res.code==200){
            _this.$message({
              type: "success",
              message: res.data,
                   duration:1500
            });
            setTimeout(function(){
              _this.disbtn=false
            },2000)
          }else{
            _this.disbtn=false
          }
        }).catch(err=>{
          _this.disbtn=false
          console.log(err)
        })
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
  .page{
    display: flex;
    justify-content: center;
  }
.page_left{
  text-align: center;
  margin-right:150px;
}
.page_left img{
  width:350px;
  height:550px;
  margin:50px auto 20px;
}

  .page_right{
    padding:100px 0;
    box-sizing: border-box;
    font-size: 16px;
    color: #606266;
  }
  .pageright_radio{
    margin-top:50px;
  }
  .subbtn{
    margin-top:100px;
    /*margin-left:50px;*/
  }
</style>



