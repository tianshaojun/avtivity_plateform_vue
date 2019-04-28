<template>
  <div>
    <section>
      <p class="goodsTitle" >新增消息</p>
      <div class="goodsContent">
        <span class="goodsName">消息类型</span>
        <el-radio v-model="radiox" label="1">小程序</el-radio>
        <el-radio v-model="radiox" label="2">公众号</el-radio>
      </div>
      <div class="goodsContent">
        <span class="goodsName">消息号</span>
        <input class="goodsinput" type="text" name="" v-model="infoCode" placeholder="请输入消息号">
      </div>
      <div class="goodsContent">
        <span class="goodsName">消息模板ID</span>
        <input class="goodsinput" type="text" name="" v-model="infoID" placeholder="请输入消息模板ID">
      </div>
      <div class="goodsContent">
        <span class="goodsName">消息跳转链接</span>
        <input class="goodsinput" type="text" name="" v-model="infolink" placeholder="请输入跳转链接">
      </div>
      <div class="goodsContent">
        <span class="goodsName">标题</span>
        <input class="goodsinput" type="text" name="" v-model="infoTitle" placeholder="请输入标题">
      </div>
      <div class="goodsContent">
        <span class="goodsName">提示信息</span>
        <input class="goodsinput" type="text" name="" v-model="infoMessage" placeholder="请输入提示信息">
      </div>
      <div class="goodsContent">
        <span class="goodsName">状态</span>
        <el-radio v-model="radio" label="1">正常</el-radio>
        <el-radio v-model="radio" label="2">冻结</el-radio>
      </div>
      <div class="goodsContent" style="padding-left:220px;" >
        <el-button type="primary" @click="submitMessage">提交</el-button>
        <el-button>返回</el-button>
      </div>
    </section>



  </div>
</template>

<script>
  import CommonHeader from '@/components/header'
  export default {
    name: 'goods',
    components:{
      CommonHeader
    },
    data () {
      return {
        radio: '1',
        radiox:'1',
        infoCode:'',
        infoID:'',
        infolink:'',
        infoTitle:'',
        infoMessage:'',

      }
    },
    created(){
      var data=this.$route.params.id

      console.log(data,"333")
    },
    mounted(){

    },
    methods:{
      submitMessage(){
        console.log(this.infoMessage,this.infoTitle,this.infolink,this.infoID,this.infoCode,this.radiox,this.radio)
        //      发送请求
          this.$axios.post('/index',{
            name:'yi',
          }).then(res=>{
            console.log(res)

          }).catch(err=>{
            console.log(err)
          })

      }




    }
  }
</script>

<style scoped>
  .goodsTitle{
    width:100%;
    height:60px;
    line-height: 60px;
    border-bottom:1px solid rgba(241,241,241,1);
    padding:0 40px;
    box-sizing: border-box;
  }
  .goodsContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
  }
  .goodsContents{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
  }
  .goodsName{
    width:100px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
    margin-right:30px;
  }
  .goodsContent .goodsinput{
    width:400px;
    height:36px;
    border-radius:5px;
    border:1px solid rgba(219,223,230,1);
    margin-right: 10px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height:20px;
    padding-left:10px;
    outline: none;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color:rgba(192,196,204,1);} 
   input:-moz-placeholder, textarea:-moz-placeholder { color:rgba(192,196,204,1); } 
    input::-moz-placeholder, textarea::-moz-placeholder { color:rgba(192,196,204,1);} 
                                                                                                                                                                                                                                input:-ms-input-placeholder, textarea:-ms-input-placeholder {color: #fff;} 
  .uploadbtn{
    width:120px;
    height:36px;
    background:rgba(171,190,255,1);
    border-radius:5px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:20px;
    outline: none;
    border:none;
    margin-top: 20px;
  }
  .goodsContent button{
    width:100px;
    margin-right:40px;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-radio__input.is-checked .el-radio__inner{
    border-color:rgba(75,115,255,1);
    background:rgba(75,115,255,1);
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:rgba(75,115,255,1);
  }
  .el-button--primary{
    width:auto;
  }
</style>
