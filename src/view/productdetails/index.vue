<template>
  <div class="home_app">
    <common-header></common-header>
    <!--teb切换-->
    <div class="productconter">
      <div class="producttitle">
        <div>所有礼品/
          <span class="tilename">{{goods.title}}</span>
        </div>
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
             <el-button @click="jiesuan" v-if="surplus_integral>=allprics" class="gobuy">去结算</el-button>
              <el-button  v-if="surplus_integral<allprics" disabled class="nogobuy">去结算</el-button>
          </div>
        </div>
      </div>
      </div>
      <div class="details">
          <img :src="goods.goods_img" class="productImg">
          <div class="productInfo">
              <p class="protitle">{{goods.title}}</p>
              <div class="priceright">
                <span class="texttitle">优惠价：</span><span class="pricenum">{{goods.orange}}积分</span>
              </div>
              <div class="needknow">
                <span class="texttitle">需知：</span><span class="needknowsay ">该礼品为虚拟商品，购买后创建活动可直接派奖</span>
              </div>
              <div class="stock">
                <span class="texttitle">库存：</span><span>999+</span>
              </div>
              <div class="numchange">
                  <div>
                     <span class="texttitle">数量</span>
                     <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
                     <span style="color:#999;font-size:14px;margin-left:10px">库存不足时，用户可预约商品</span>
                  </div>
                  <div class="joincart">
                    <span class="texttitle"></span>
                     <el-button
              @click="buycart(goods)"
              type="primary"
              class="shopbtn"
              icon="iconfont icon-gouwuche manfontsize"
            >加入购物车</el-button>
                  </div>
              </div>
          </div>
      </div>
       <div class="goodsinfo">
           <p style="margin-bottom:20px;">礼品详情</p>   
           <div v-html="goodsinfo.describe"></div>
        </div>
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
  </div>
</template>

<script>
import CommonHeader from "@/components/header/index";
import { Message } from "element-ui";
import { giftmall, buycart, cartlist, editcart,ordering,delcart,malldetails} from "@/api/index";
export default {
  name: "productdetails",
  components: {
    CommonHeader
  },
  data() {
    return {
      num:0,
      num8: 1,
      surplus_integral:0,
      allprics: 0,
      card_list: [],
      pay_list:[],
      dialogTableVisible: false,
      cartmallshow: false,
      hiddenbadge: true,
      show: false,
      loading: true,
      goods:'',
      goodsinfo:''
    };
  },
  mounted() {
     cartlist({})
        .then(res => {
          if (res.code == 200) {
            this.card_list = res.data.card_list;
            this.surplus_integral = res.data.surplus_integral;
          }
        })
        .catch(err => {});
    //默认数据
    var data = {
      goods_id: this.$route.query.goods_id?this.$route.query.goods_id:0
    };
    malldetails(data)
      .then(res => {
          if(res.code==200){
            this.goods = res.data.goods;
            this.goodsinfo = res.data.goodsinfo;
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
      handleChange(value) {
        this.num8 = value;
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
            console.log(res)
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
        number: this.num8,
        integral: item.orange
      };
      buycart(data)
        .then(res => {
          if (res.code == 200) {
             this.num = parseInt(this.num)+this.num8;
            this.$message({
              message: "添加成功！",
              type: "success",
              duration: 1000
            });
          }
        })
        .catch(err => {});
    },
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
.productconter {
  width: 1200px;
  margin: 20px auto 0 auto;
  position: relative;
  background-color: #fff;
  padding-bottom: 50px;
}
.producttitle {
  height: 70px;
  box-shadow: 0px 2px 5px 0px rgba(214, 214, 214, 0.45);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 14px;
  color: #333;
}
.tilename{
    color: #999;
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
.shopcart .shopbtn {
  padding: 0;
  margin: 0;
  width: 100px;
  height: 32px;
  line-height: 32px;
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
.cartmall .title{
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #F1F1F1;
  padding:0 20px;
  justify-content: space-between;
}
.cartmall .title .allselect{
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
.details{
    display: flex;
    padding: 20px 0 30px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #F1F1F1;
}
.productImg{
    width:400px;
    height:400px;
}
.productInfo{
  flex: 1;
  box-sizing: border-box;
  padding-left: 20px;
}
.protitle{
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.priceright{
  margin-top: 30px;
}
.texttitle{
  width: 80px;
  display: inline-block;
  font-size: 14px;
  color: #333;
}
.needknow{
  font-size: 14px;
  color: #333;
  margin-top:20px; 
}
.stock{
  font-size: 14px;
  color: #333;
  margin-top:20px; 
}
.priceright .pricenum{
  font-size: 16px;
  color: #F50909;
  font-weight: bold;
}
.numchange{
  border-top: 1px solid #F1F1F1;
  margin-top: 60px;
  padding-top: 20px;
}
.joincart{
  margin-top: 60px;
}
.goodsinfo{
  box-sizing: border-box;
  padding: 20px;
}
</style>
<style>
.manfontsize {
  font-size: 12px !important;
  margin-right: 4px;
}
.numchange .el-input-number{
  width: 80px;
}
.numchange .el-input-number__decrease, .numchange .el-input-number__increase{
  width: 25px;
}
.numchange .el-input-number.is-controls-right .el-input__inner {
    padding-left: 0px;
    padding-right: 25px;
}
</style>

