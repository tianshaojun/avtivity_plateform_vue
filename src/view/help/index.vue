<template>
  <el-container>
    <el-header><common-header :isLogin='isLogin'></common-header></el-header>
    <el-container style="margin-top:20px;min-width:1200px;">
      <el-aside width="360px">
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
                            :key="i" :index="navMenu.id">
                  <template slot="title">
                    <!--<i class="el-icon-location"></i>-->
                    <i :class="navMenu.icon"></i>
                    <span slot="title">{{navMenu.class_name}}</span>
                  </template>
                  <el-menu-item v-if="!item.childs" v-for="(item,j) in navMenu.childs" :key="j" :index="i==0&&j==0?'/helpviews':'/helpviews?id='+item.id" >
                    {{ item.title }}
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
        <router-view ></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>



</template>

<script>
  import CommonHeader from '@/components/header';
  import { helplist,helpdetail,getUserInfo} from "@/api/index";
  export default {
    name: 'Homeindex',
    components:{
      CommonHeader
    },
    data () {
      return {
        isLogin:1,
        newList:[{
          id:'1',
          class_name:'用户管理',
          childs:[
            {title:'用户管理',id:3},
            {title:'用户管理222',id:32}
          ]
        },
          {
            id:'2',
            class_name:'营销管理',
            childs:[
              {title:'奖励管理',id:1},
            ]
          },
           {
             id:'3',
             class_name:'第三方授权设置',
             childs:[
               {title:'版本管理',id:4}
             ]
           },
        ]

      }
    },
    computed:{
      onRoutes(){
        // var help_id =localStorage.getItem("help_id");
        if(this.$route.path.replace('/','')=='helpviews'){
          return '/helpviews';
        }else{
          return this.$route.path;
        }

      },
    },
    created(){
      var data ={};
      helplist(data)
        .then(res => {
         this.newList = res.data
        })
        .catch(err => {
          console.log(err);
        });
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
      handleSelect(index){
          // localStorage.setItem("help_id",index);
      },
    },
    beforeRouteLeave(to, from, next) {
    if (getUserInfo() ||  to.path=='/helpviews' || to.path=='/home'||to.path=='/') {
      this.isLogin = 1;
      next();
    } else {
      this.isLogin = this.isLogin + 1;
      next(false);
    }
  }
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
