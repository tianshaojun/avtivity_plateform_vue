<template>
  <div class="home_app">
    <common-header></common-header>
    <!--teb切换-->
    <div class="shoptebTabs">
      <!-- 购物车 -->
      <div class="shopcart">
        <div class="cartbtn">
          <el-badge :value="num" :hidden="num==0" :max="99" class="item">
            <el-button
              @click="goshop"
              type="primary"
              class="shopbtn"
            ><img style="width:12px;height:12px;margin-right:10px" src="@/assets/images/gouwuche.png" alt="">购物车</el-button>
          </el-badge>
        </div>
        <div class="cartmall" v-show="cartmallshow">
          <div class="cartmallshow" @click="goshop"></div>
          <div class="title">
            <span>礼品购物车</span>
            <el-button @click="selectall" type="text" class="allselect" size="mini">全选</el-button>
          </div>
          <div class="cartconter">
            <div class="cartlist" v-for="item in card_list">
              <div class="listTop">
                <el-checkbox v-model="item.is_check"></el-checkbox>
                <div class="lisTitle">{{item.goods_name}}</div>
                <el-button
                  type="text"
                  @click="deleteItem(item.goods_id)"
                  class="btn30"
                  size="mini"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <div class="listBtm">
                <div class="listoper">
                  <span class="numtitle">数量</span>
                  <el-button
                    type="text"
                    class="remove btn30"
                    @click="remove(item.goods_id)"
                    size="mini"
                    icon="el-icon-remove-outline"
                  ></el-button>
                  <span class="num">{{item.number}}</span>
                  <el-button
                    @click="add(item.goods_id)"
                    type="text"
                    class="plus btn30"
                    size="mini"
                    icon="el-icon-circle-plus"
                  ></el-button>
                </div>
                <div class="total">
                  <span class="totaltitle">小计:</span>
                  <span class="totalnum">{{item.number*item.integral}}</span>
                  <span class="totalnum">积分</span>
                </div>
              </div>
            </div>
          </div>
          <div class="allprice">
            <span class="alltext">总计：</span>
            <span class="allnum">{{allprics}}积分</span>
          </div>
          <div class="surplusbuy">
            <div class="surplus">
              <span class="surplusnum">可用积分：{{surplus_integral}}积分</span>
              <router-link v-if="surplus_integral<allprics" class="recharge" to="/recharge">积分不足，去充值</router-link>
            </div>
              <el-button @click="jiesuan" v-if="surplus_integral>=allprics && allprics!=0" class="gobuy">去结算</el-button>
              <el-button  v-else disabled class="nogobuy">去结算</el-button>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.id"
          :label="item.name"
          :name="index+''"
        >
          <div class="tebTabs clearfix">
            <div class="tebTabsBox" v-for="item in Arrlist">
              <img class="itemImg" :src="item.goods_img"  @click="jumpdetils(item.id)">
              <div class="itemTitle">{{item.title}}</div>
              <div class="itemInfo">
                <div>
                  <div class="price">
                    {{item.orange}}
                    <span class="pricetxt">积分</span>
                  </div>
                  <div class="monthlysales">月销{{item.stock}}</div>
                </div>
                <div>
                  <el-button type="primary" plain @click="buycart(item)">加入购物车</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="morelong" v-if="complete">没有更多</div>
    <div class="morelong" v-if="!complete" @click="loadmare()">查看更多</div>
    <el-dialog title="支付确认" :visible.sync="dialogTableVisible" :show-close="false">
      <el-table :data="pay_list" stripe>
        <el-table-column property="goods_name" label="商品名称" width="250"></el-table-column>
        <el-table-column property="integral" label="单价"></el-table-column>
        <el-table-column property="number" label="采购数量"></el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">{{scope.row.integral*scope.row.number}}</template>
        </el-table-column>
      </el-table>
      <div class="paybtn">
        <div class="paynum">实际支付：
          <span class="num">{{allprics}}</span> 积分
        </div>
        <el-button class="payfunbtn" @click="ordering" type="primary">立即支付</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonHeader from "@/components/header/index";
import { Message } from "element-ui";
import { giftmall, buycart, cartlist, editcart,ordering,delcart } from "@/api/index";
export default {
  name: "Home",
  components: {
    CommonHeader
  },
  data() {
    return {
      num:0,
      surplus_integral:0,
      allprics: 0,
      card_list: [],
      pay_list:[],
      dialogTableVisible: false,
      cartmallshow: false,
      hiddenbadge: true,
      activeName: localStorage.getItem("sptab")
        ? localStorage.getItem("sptab")
        : "0",
      state: 0,
      show: false,
      page: 1,
      page_size: 4,
      count: 0,
      class_id: localStorage.getItem("sptype_id")
        ? localStorage.getItem("sptype_id")
        : 0,
      complete: false,
      loading: true,
      editableTabs2: [],
      Arrlist: [],
      list: [],
      rightcss: "0"
    };
  },
  //钩子函数相当于onlong
  mounted() {
    //默认数据
    var data = {
      page: this.page,
      page_size: this.page_size,
      cid: this.class_id
    };
    giftmall(data)
      .then(res => {
        this.editableTabs2 = res.data.category;
        if (res.data.goodsResult.list) {
          for (let i = 0; i < res.data.goodsResult.list.length; i++) {
            this.list.push(res.data.goodsResult.list[i]);
          }
          this.Arrlist = this.list;
          this.count = res.data.goodsResult.count;
          this.loading = false;
        }
        if (this.list.length == this.count) {
          this.complete = true;
        }
      })
      .catch(err => {});
      cartlist({})
        .then(res => {
          if (res.code == 200) {
            this.card_list = res.data.card_list;
            this.surplus_integral = res.data.surplus_integral;
          }
        })
        .catch(err => {});
  },
  watch: {
    card_list: {
      handler(newData, oldData) {
        this.allprics = 0;
        this.num = 0;
        newData.forEach((item, index, array) => {
            if(item.is_check==true){
              this.allprics+=item.number*item.integral;
              this.num =  parseInt(item.number) + this.num;
            }else{
               this.num =  parseInt(item.number) + this.num;
            }
        })
      },
      deep: true,
      immediate: true
    }
  },
  //方法
  methods: {
    handleClick(tab, event) {
      localStorage.setItem("sptab", tab.index);
      localStorage.setItem("sptype_id", this.editableTabs2[tab.index].id);
      var id = this.editableTabs2[tab.index].id;
      if (this.class_id != id) {
        this.loading = true;
        this.Arrlist = [];
        this.list = [];
        this.page = 1;
        this.class_id = id;
        this.load();
      }
    },
    //jumpdetils
    jumpdetils(id){
        this.$router.push({ path: "productdetails", query: { goods_id: id}});
    },
    goshop() {
      var data = {};
      cartlist(data)
        .then(res => {
          if (res.code == 200) {
            this.card_list = res.data.card_list;
            this.surplus_integral = res.data.surplus_integral;
            this.cartmallshow = !this.cartmallshow;
          }
        })
        .catch(err => {});
    },
    //去结算
    jiesuan() {
      this.dialogTableVisible = !this.dialogTableVisible;
      this.cartmallshow = !this.cartmallshow;
      this.pay_list = [];
      this.card_list.forEach((item, index, array) => {
        if(item.is_check==true){
             this.pay_list.push(item)
        }
      });
     
    },
    //提交订单
    ordering(){
       var data = {goods_list:this.pay_list};
      ordering(data)
        .then(res => {
          if (res.code == 200) {
            this.dialogTableVisible = !this.dialogTableVisible;
             this.$message({
                  message: "支付成功！",
                  type: "success",
                  duration: 1000
                });
            setTimeout(()=>{
            this.$router.push({ path: "mygift"});
            },2000)
          }
        })
        .catch(err => {});
    },
   
    //全选
    selectall() {
      this.card_list.forEach((item, index, array) => {
        this.card_list[index].is_check = true;
      });
    },
    //减
    remove(id) {
      this.card_list.forEach((item, index, array) => {
        if (this.card_list[index].goods_id == id && this.card_list[index].number > 1 ) {
          var data = { type: 2, goods_id: id, number: 1 };
          editcart(data).then(res => {
            if (res.code == 200) {
              this.card_list[index].number--;
            }
          });
        }
      });
    },
    //加
    add(id) {
      this.card_list.forEach((item, index, array) => {
        if (
          this.card_list[index].goods_id == id &&
          this.card_list[index].number > 0
        ) {
            var data = { type: 1, goods_id: id, number: 1 };
          editcart(data).then(res => {
            if (res.code == 200) {
                this.card_list[index].number++;
            }
          });
        
        }
      });
    },
    //删除
    deleteItem(id) {
      this.card_list.forEach((item, index, array) => {
        if (this.card_list[index].goods_id == id) {
          var data = {goods_id: id};
          delcart(data).then(res => {
            if (res.code == 200) {
                this.card_list.splice(index, 1);
                    this.$message({
                  message: "删除成功！",
                  type: "success",
                  duration: 1000
                });
            }
          });
          
        }
      });
    },
    //添加购物车
    buycart(item) {
      var data = {
        goods_id: item.id,
        goods_name: item.title,
        number: 1,
        integral: item.orange
      };
      buycart(data)
        .then(res => {
          if (res.code == 200) {
            this.num = parseInt(this.num)+1
            this.$message({
              message: "添加成功！",
              type: "success",
              duration: 1000
            });
          }
        })
        .catch(err => {});
    },
    //加载
    loadmare() {
      var count = this.count,
        page_size = this.page_size,
        page = this.page;
      console.log(count, page_size, page);
      var num = Math.ceil(parseInt(count) / parseInt(page_size));
      console.log(num);
      if (page < num) {
        this.page = 1 + parseInt(page);
        this.load();
      } else {
        this.complete = true;
      }
    },
    load() {
      var that = this;
      var data = {
        page: that.page,
        page_size: that.page_size,
        cid: that.class_id
      };
      giftmall(data)
        .then(res => {
          if (res.data.goodsResult.list) {
            for (let i = 0; i < res.data.goodsResult.list.length; i++) {
              that.list.push(res.data.goodsResult.list[i]);
            }
            that.Arrlist = that.list;
            that.count = res.data.goodsResult.count;
            that.loading = false;
          }
          if (that.list.length == that.count) {
            this.complete = true;
          } else {
            this.complete = false;
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.home_app {
  width: 100%;
  min-height: 100vh -110px;
  background: #f8f8f8;
  position: relative;
}
.el-tabs__nav-wrap {
  box-shadow: 1px 4px 8px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.shopcart {
  width: 100px;
  height: 32px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
}
.shopcart {
  width: 100px;
  height: 32px;
}
.shoptebTabs .tebTabsBox {
  position: relative;
  width: 280px;
  height: 384px;
  float: left;
  margin: 0 14px 14px 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(225, 225, 225, 1);
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.shoptebTabs .tebTabsBox:nth-child(4n) {
  margin: 0 0 14px 0;
}
.tebTabsBox .itemImg {
  cursor: pointer;
  width: 260px;
  height: 260px;
}
.tebTabsBox .itemTitle {
  color: #333;
  font-size: 12px;
  line-height: 17px;
  margin-top: 20px;
  word-break: break-all;
}
.tebTabsBox .itemInfo {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.itemInfo .price {
  color: #f50909;
  font-size: 16px;
  font-weight: bold;
}
.itemInfo .price .pricetxt {
  font-size: 12px;
}
.itemInfo .monthlysales {
  margin-top: 5px;
  color: #999;
  font-size: 12px;
}
.cartmall {
  width: 320px;
  height: 616px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
  border-radius: 5px;
  border: 1px solid rgba(225, 225, 225, 1);
  box-sizing: border-box;
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 22;
}
.cartmall .title {
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f1f1f1;
  padding: 0 20px;
  justify-content: space-between;
}
.cartmall .title .allselect {
  color: #999;
}
.cartconter {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 20px;
}
.cartlist {
  height: 84px;
  border-bottom: 1px solid #f1f1f1;
}
.listTop {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  /* display: none; */
}
.listTop .lisTitle {
  font-size: 12px;
  color: #333;
  line-height: 17px;
  width: 225px;
  margin-left: 5px;
}
.listBtm {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.listoper .numtitle {
  font-size: 12px;
  color: #999;
}
.listoper .num {
  display: inline-block;
  width: 30px;
  font-size: 12x;
  color: #999;
  text-align: center;
  border: 1px solid #dbdfe6;
}
.total .totaltitle {
  font-size: 12px;
  color: #999;
}
.total .totalnum {
  font-size: 14px;
  color: #f50909;
}
.allprice {
  padding-right: 20px;
  box-sizing: border-box;
  text-align: right;
  margin-top: 30px;
}
.allprice .alltext {
  font-size: 12px;
  color: #999;
}
.allprice .allnum {
  font-size: 14px;
  color: #f50909;
}
.surplusbuy {
  border-top: 1px solid #f1f1f1;
  margin-top: 15px;
  padding: 15px 0;
}
.surplus {
  text-align: center;
}
.surplusnum {
  font-size: 12px;
  color: #333;
}
.recharge {
  color: #ff7a00;
  font-size: 12px;
}
.surplusbuy {
  text-align: center;
}
.surplusbuy .gobuy {
  width: 280px;
  height: 34px;
  line-height: 34px;
  background: rgba(255, 122, 0, 1);
  border-radius: 4px;
  color: #fff;
  border: none;
  margin-top: 15px;
  padding: 0;
}
.surplusbuy .nogobuy {
  width: 280px;
  height: 34px;
  line-height: 34px;
  background: #c8c9cc;
  border-radius: 4px;
  color: #fff;
  border: none;
  margin-top: 15px;
  padding: 0;
}
.paybtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  margin-top: 20px;
  height: 80px;
}
.paynum {
  font-size: 14px;
  color: #333;
}
.paynum .num {
  color: #f50909;
  font-size: 18px;
}
.cartmallshow {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0);
  z-index: -1;
}
.shopcart .shopbtn {
  padding: 0;
  margin: 0;
  width: 100px;
  height: 32px;
  line-height: 32px;
}
</style>
<style>
.paybtn .el-button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: rgba(255, 122, 0, 1);
  border-radius: 5px;
  border: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
}
.el-dialog__header {
  text-align: center;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
.el-dialog__body tbody .el-table_1_column_4 {
  color: #f50909;
  font-weight: bold;
}
.el-dialog__body {
  padding: 0;
}
.el-dialog__body .el-table th,
.el-dialog__body .el-table td {
  text-align: center;
}
 {
  text-align: center;
}
.listoper .plus {
  color: #999 !important;
}
.cartconter .btn30 {
  font-size: 16px;
  color: #999;
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
}
.itemInfo .el-button {
  padding: 0;
  margin: 0;
  width: 82px;
  height: 36px;
  line-height: 36px;
  color: #7d9bff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #7d9bff;
  background-color: #fff;
}

.itemInfo .el-button--primary.is-plain:focus,
.itemInfo .el-button--primary.is-plain:hover {
  border: 1px solid #7d9bff;
  background-color: #fff;
  color: #7d9bff;
}
.shoptebTabs .el-tabs__active-bar {
  height: 0 !important;
}
.clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  zoom: 1;
}
.shoptebTabs .el-tabs__nav-wrap {
  box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
  background-color: #fff;
  position: relative;
}

.shoptebTabs .el-tabs__nav-scroll {
  height: 70px !important;
  line-height: 70px !important;
  padding: 0 20px;
}
.shoptebTabs {
  width: 1200px;
  margin: 20px auto 0 auto;
  position: relative;
  background-color: #fff;
}
.shoptebTabs .tebTabs {
  min-height: 600px;
  box-sizing: border-box;
  padding: 0px 19px;
}

.morelong {
  width: 1200px;
  height: 38px;
  line-height: 38px;
  display: block;
  margin: 10px auto 40px;
  background: #fff;
  color: #999999;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.manfontsize {
  font-size: 12px !important;
  margin-right: 4px;
}
</style>
