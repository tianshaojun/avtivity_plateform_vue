<template>
  <div class="temshow">
    <div class="tem_phone_wrap"><img src="@/assets/images/setactivity_temshow.png" alt=""></div>
    <div class="tem_text_wrap">
      <p class="text">模板效果展示</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TemShow',
    data () {
      return {

      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .temshow{
    width:334px;
    margin:0 auto;
    padding-top:95px;
  }
  .tem_phone_wrap{
    width:100%;
    height:680px;
    position:relative;
  }
  .tem_text_wrap{
    top:60px;
  }
  .tem_text_wrap .text{
    line-height:22px;
    text-align:center;
    font-size:16px;
    font-family:PingFangSC-Regular;
    color:#606266;
    margin:20px;
  }
</style>
