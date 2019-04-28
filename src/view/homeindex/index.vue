<template>
  <el-container>
    <el-header style="height:80px;"><common-header></common-header></el-header>
    <el-container style="margin-top:20px;min-width:1200px;">
      <el-aside width="360px">
        <div class="sidetitle" >管理小程序</div>
        <el-row class="tac">
          <el-col >
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="onRoutes"
              router
              @open="handleOpen"
              @select="handleSelect"
              @close="handleClose"
            >
              <template v-for="(navMenu,i) in newList">
                <!--this.$route.path-->
                <!-- 最后一级菜单 -->
                <el-menu-item v-if="!navMenu.childs"
                              :key="i" :data="navMenu" :index="navMenu.name"
                >
                  <i class="el-icon-location"></i>
                  <span slot="title">{{navMenu.navItem}}</span>
                </el-menu-item>

                <!-- 此菜单下还有子菜单 -->
                <el-submenu v-if="navMenu.childs"
                            :key="i" :index="navMenu.name">
                  <template slot="title">
                    <!--<i class="el-icon-location"></i>-->
                    <i :class="navMenu.icon"></i>
                    <span slot="title">{{navMenu.navItem}}</span>
                  </template>
                  <el-menu-item v-if="!item.childs" v-for="(item,j) in navMenu.childs" :key="j" :index="item.name" >
                    {{ item.navItem }}
                  </el-menu-item>
                  <el-submenu v-if="item.childs" v-for="(item,j) in navMenu.childs" :key="j" :index="item.name">
                    <template slot="title">
                      <span slot="title">{{item.navItem}}</span>
                    </template>
                    <el-menu-item  v-for="(data,k) in item.childs" :key="k" :index="data.name">
                      {{ data.navItem }}
                    </el-menu-item>
                  </el-submenu>
                </el-submenu>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
        <router-view :id="id"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>



</template>

<script>
  import CommonHeader from '@/components/header';
  export default {
    name: 'Homeindex',
    components:{
      CommonHeader
    },
    data () {
      return {
        id:this.$route.query.box_id,
        newList:[{
          name:'homeuser',
          navItem:'用户管理',
          icon:'iconfont icon-yonghu',
          childs:[
            {name:'/homeuser',navItem:'用户管理'}
          ]
        },
//          {
//          name:'shouye',
//          navItem:'提现管理',
//          icon:'iconfont icon-tixianjilu',
//          childs:[
//            {name:'/moneyreviewed',navItem:'提现审核'},
//            {name:'/largereviewed',navItem:'大额审核'},
//            {name:'/moneyRecord',
//              navItem:'提现记录',
////              childs:[
////                {name:'/list03', navItem:'这list03',},
////                {name:'/list04',navItem:'这list04'},
////                {name:'/list010',navItem:'这list010'}
////              ]
//            },
//            {name:'/rewardreviewed',navItem:'奖励记录'},
//            {name:'/refusemoney',navItem:'拒绝提现'},
//            {name:'/moneySurvey',navItem:'提现概况'},
//            {name:'/moneyform',navItem:'提现报表'},
//          ]
//        }
//        ,
//        {
//        name:'goodsAdd',
//        navItem:'商品管理',
//        icon:'iconfont icon-shangpin-',
//        childs:[
//          {name:'/goods',navItem:'商品管理'},
//            {
//              name:'',
//              navItem:'商品管理',
//              childs:[
//                {name:'/list06',navItem:'这list06'},
//                 {name:'/list07',navItem:'这list07'}
//              ]
//            },
//        ]
//      },
        // {
        //     name:'qudao',
        //     navItem:'渠道管理',
        //     childs:[
        //       {name:'/lis',navItem:'渠道管理'}
        //     ]
        //   },
          {
            name:'yingxiao',
            navItem:'营销管理',
            icon:'iconfont icon-yingxiao',
            childs:[
              {name:'/reward',navItem:'奖励管理'},
              {name:'/rule',navItem:'规则管理'}
            ]
          },
           {
             name:'thirdParty',
             navItem:'第三方授权设置',
             icon:'iconfont icon-shengyin',
             childs:[
                // {name:'/basicprofile',navItem:'基本信息'},
               {name:'/wXreview',navItem:'版本管理'}

             ]
           },
            {
             name:'auditpage',
             navItem:'审核页面设置',
             icon:'iconfont icon-shenhexiangmu',
             childs:[
               {name:'/pageedit',navItem:'审核页面管理'}

             ]
           },
        ]

      }
    },
    computed:{
      onRoutes(){
        // this.$route.path
        // debugger
        if(this.$route.path.replace('/','')=='goodsAdd'){
          return '/goods';
        }else if(this.$route.path.replace('/','')=='rulemodify'){
          return '/rule';
        }else if(this.$route.path.replace('/','')=='message'){
          return '/news';
        } else{
          return this.$route.path;
        }

      },
    },
    created(){

    },
    mounted(){
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        if(key=='1'){
          // this.$router.push('/homeindex')
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key,keyPath){
        console.log(key,"555")
//        if(key=='1-1'){
//          this.$router.push('list01')
//        }
      },
    },

  }
</script>

<style scoped>
/deep/ .header {
width: 90%!important;
min-width: 1200px;
}
  .home_app{
    width:100%;
    min-height:100vh;
    background:#F8F8F8;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height:100%;
  }
  .el-container{
    height:calc(100vh-20px);
    /*margin-top:20px;*/
  }
  .sidetitle{
    height:60px;
    background:rgba(125,155,255,1);
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:60px;
    text-align: center;
    padding-right: 63px;
  }
  .el-aside{
    height:calc(100vh - 100px);
    background-color: #fff!important;

  }
  .el-main{
    margin-left:20px;
    height:calc(100vh - 100px);
    background-color:#fff;
    padding:0;
  }
</style>
<style>
  .el-submenu__title{
    padding: 0 82px!important;
  }
  .el-submenu__title i{
    padding-right:10px!important;
  }
  .el-menu-item{
    padding-left: 144px!important;
    font-size: 14px;
    color:#A1A1A1;
    height: 40px!important;
    line-height: 40px!important;
  }
  .el-menu-item.is-active{
    background: #ECF5FF;
  }
  .el-submenu__title{
    font-size: 16px;
  }
  .el-submenu .el-icon-location{
    font-size: 26px;
  }
  .el-header{
    padding:0;
  }
  /*.el-aside{*/
    /*height:calc(100vh - 80px);*/
    /*background-color: #fff!important;*/

  /*}*/

</style>
