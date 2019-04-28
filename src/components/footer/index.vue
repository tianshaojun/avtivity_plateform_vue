<template>
  <div class="footers">
      <ul class="footerul">
        <li>友情链接：</li>
        <li v-for="(item,index) in list" :key="index"><a :href="item.link" target="_blank">{{item.name}}</a></li>
      </ul>
    <p class="copyfooter">Copyright  2012-2018 hd.vdongchina.com. All Rights Reserved 浙ICP备16000559号-3</p>
  </div>
</template>
<script>
  export default {
    name: "footers",
    data() {
      return {
        list:[
          {name: "微动天下官网",link:'http://www.vdongchina.com/'},
          {name: "管家plus",link:'http://plus.vdongchina.com/'},
          {name: "微尘极速版",link:'http://www.vdongchina.com/product/xcxscpt.html'},
          {name: "魔力橙应用商店",link:'http://www.molixcx.com/'},
          {name: "商学院",link:'http://oldgw-www.vdongchina.com/wdsxy.html'},
           {name: "微尘自由版",link:'http://cloud.vdongchina.com/'}
        ]
      }
    }
  }
</script>
<style>
  .footers {
    width: 100%;
    background: rgba(68, 68, 68, 1);
    box-shadow: 0px 0px 4px 0px rgba(202, 202, 202, 0.5);
    padding:0;
  }

  .copyfooter {
    text-align: center;
    font-size: 14px;
    height: 60px;
    color: #ffffff;
    line-height: 60px;
  }
  .footerul{
    list-style: none;
    text-align: center;
    color:#fff;
    display: flex;
    height:90px;
    line-height: 90px;
    justify-content: center;
    font-family:PingFangSC-Regular;
    font-weight:400;
    border-bottom: 1px solid #818181;
  }
  .footerul li:nth-child(1){
    font-size:14px;
  }
  .footerul li:last-child{
    margin-right: 0px;
  }
  .footerul li{
    margin-right: 40px;

  }
  .footerul li a{
    color:#fff;
    font-size:12px;
  }
</style>
