<template>
  <div class="home_app">
    <common-header></common-header>
    <div class="controller con_setactivity">
      <div class="left_box">
        <temShowall :backgroundimg="backgroundimg_iphone"></temShowall>
      </div>
      <div class="right_box">
        <el-form
          class="form"
          :model="form"
          :rules="rules"
          ref="form"
          label-position="left"
          label-width="198px"
        >
          <el-tabs v-model="tabActiveId" type="card">
            <!--样式设置start-->
            <el-tab-pane label="样式设置" name="1">
              <div class="form_module">
                <div class="form_item_activitytem">
                  <h4 class="form_module_title">活动模板选取</h4>
                  <el-radio-group v-model="form.template_type">
                    <div
                      class="acticitytem_val_list"
                      v-for="(item,idx) in formDomData.activityTemArr"
                      :key="idx"
                    >
                      <p class="photo-wrap">
                        <img :src="item.url" alt>
                      </p>
                      <p class="radio_wrap">
                        <el-radio :label="idx+1+''">{{item.label}}</el-radio>
                      </p>
                    </div>
                  </el-radio-group>
                </div>
                    <el-form-item label="活动页面背景图">
                      <el-upload
                        class="avatar-uploader"
                        :action="upUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="form.background_img" :src="form.background_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>

                    <el-form-item label="活动页面Slogan">
                      <el-upload
                        class="avatar-uploader"
                        :action="upUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="form.page_slogan" :src="form.page_slogan" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>

                    <el-form-item label="立即抽奖图片">
                      <el-upload
                        class="avatar-uploader"
                        :action="upUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="form.luckdraw_img" :src="form.luckdraw_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>

                <el-form-item class="form_item_btn" >
                  <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                </el-form-item>
              </div>
            </el-tab-pane>
            <!--样式设置end-->
            <!--基础设置start-->
            <el-tab-pane label="基础设置" name="2">
              <div class="form_module">
                <el-form-item label="活动名称" prop="box_name" class="inputs">
                  <el-input v-model="form.box_name"></el-input>
                  <span class="input_mes">(*必填)</span>
                </el-form-item>
                <el-form-item label="活动时间" prop="activity_time">
                  <el-date-picker
                    v-model="form.activity_time"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                  <span class="input_mes">(*必填)</span>
                </el-form-item>
                  <el-form-item label="授权赠送机会">
                    <div class="drawoneday">新用户授权有  <input type="number" v-model="form.prize_num" min="0" max="100">
                      次抽奖机会
                    </div>
                  </el-form-item>
                <el-form-item label="活动规则" prop="contentInfo" class="inputs">
                  <el-input type="textarea" v-model="form.contentInfo"></el-input>
                  <span class="input_mes">(*必填)</span>
                </el-form-item>

                <div class="form_item_module">
                  <h4 class="form_module_title" @click="ceshi">分享设置</h4>
                  <el-form-item label="分享标题" class="inputs" prop="share_title">
                    <el-input v-model="form.share_title" ></el-input>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                  <el-form-item label="分享图" prop="share_img" ref="formimg">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess4"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.share_img" :src="form.share_img" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                </div>
                <el-form-item label="排行榜额外奖励" >
                  <el-radio-group v-model="form.prize_status">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="2">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" v-if="form.prize_status==1">
                  <el-upload
                    class="avatar-uploader"
                    :action="upUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess5"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="form.prize_img" :src="form.prize_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item class="form_item_btn">
                  <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                  <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                </el-form-item>

              </div>
            </el-tab-pane>
            <!--基础设置end-->
            <!--奖项设置start-->
            <el-tab-pane label="奖项设置" name="3">
              <div class="form_module appreward">
                <el-tabs type="card"  >
                  <el-tab-pane label="奖励一" >
                    <reward v-if="form.activity_prize" :formreward="form.activity_prize[0]" :goodslist="goodslists"  ref="rewardactive1"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励二" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[1]" ref="rewardactive2"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励三" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[2]" ref="rewardactive3"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励四" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[3]" ref="rewardactive4"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励五" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[4]" ref="rewardactive5"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励六" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[5]" ref="rewardactive6"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励七" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[6]" ref="rewardactive7"></reward>
                  </el-tab-pane>
                  <el-tab-pane label="奖励八" >
                    <reward v-if="form.activity_prize" :goodslist="goodslists" :formreward="form.activity_prize[7]" ref="rewardactive8"></reward>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="form_module">
                  <el-form-item class="form_item_btn">
                    <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                    <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                  </el-form-item>
              </div>
            </el-tab-pane>
            <!--奖项设置end-->
            <!--高级设置start-->
            <el-tab-pane label="高级设置" name="4">
              <div class="form_module">
                <div class="form_item_module">
                  <h4 class="form_module_title">授权小程序</h4>
                  <el-form-item label="小程序名称" prop="xcx_name" class="inputs">
                    <el-input v-model="form.xcx_name" placeholder="请输入小程序名称"></el-input>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                  <el-form-item label="小程序AppID" prop="xcx_appid" class="inputs">
                    <el-input v-model="form.xcx_appid" placeholder="请输入小程序AppID"></el-input>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                  <el-form-item label="小程序密钥" prop="xcx_secret" class="inputs">
                    <el-input v-model="form.xcx_secret" placeholder="请输入小程序密钥"></el-input>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                </div>
                <div class="form_item_module">
                  <h4 class="form_module_title">跳转小程序</h4>
                  <el-form-item label="跳转小程序AppID" prop="jump_appid" class="inputs">
                    <el-input v-model="form.jump_appid" placeholder="请输入小程序AppID "></el-input> &nbsp;<el-tooltip
                    class="item" effect="dark" content="若修改此项，需到第三方设置中重新上传代码！" placement="top"><i
                    style="color:red;cursor: pointer;" class="el-icon-question"></i>
                  </el-tooltip>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                </div>
                <el-form-item label="商城兑奖">
                  <el-radio-group v-model="form.mall_type">
                    <el-radio label="1">魔力橙兑奖</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="form_item_btn">
                  <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                  <el-button
                    type="primary"
                    :disabled="disAbled"
                    class="btn"
                    @click="changeTabPage('form')"
                  >保存
                  </el-button>
                </el-form-item>
              </div>
            </el-tab-pane>
            <!--高级设置end-->
          </el-tabs>
        </el-form>
      </div>
      <el-dialog :visible.sync="dialogImage.isVisible">
        <img width="100%" :src="dialogImage.showUrl">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {activityEdit, activityInfo,goodslist } from "@/api/index";
  import CommonHeader from "@/components/header";
  import TemShow from "./components/temShow";
  import temShowall from "@/components/temShowall";
  import reward from "./components/reward";


  export default {
    name: "setJigsaw",
    components: {
      CommonHeader,
      TemShow,
      reward,
      temShowall
    },
    data() {
      var redbag_moneyReg = (rule, value, callback) => {
        if (value == "") {
          return callback(new Error("积分不能为空"));
        } else if (value != "") {
          if (
            /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(value) == false
          ) {
            callback(new Error("请填写大于0的数字"));
          } else {
            callback();
          }
        }
      };
      return {
        goodslists:[{goods_id:'237',goods_name:"迪奥2019口红套装5只装",num:100},{goods_id:'238',goods_name:"迪奥2019口红套装5只装",num:100}],
        tabname:['奖励一','奖励二','奖励三','奖励四','奖励五','奖励六','奖励七','奖励'],
        backgroundimg_iphone: require('@/assets/images/awardimg.png'),
        disAbled: false,
        upUrl: axios.defaults.baseURL + "index/uploadimg",
        box_id: "",
        tabActiveId: "1", //选项卡选中的id
//        tabActiveIdmin:'1',
        form: {
          //表单提交
          //样式设置
          template_type: "1", //选中的模版
          background_img: "", //活动背景图
          page_slogan: "", //slogan图片
          luckdraw_img: "", //抽奖图片
//          ranking_logo: '', //排行图片

          //基础设置
          box_name: "", //活动名称
          activity_time:"",  //活动时间
          prize_num: "3", //每天抽奖机会
          contentInfo: "", //活动规则
          share_title: "", //分享标题
          share_img: "", //朋友圈分享图
          prize_status: '1',  //排行榜奖励
          prize_img:'',

          //奖项配置
          activity_prize:[{
              prize_id: '',
              prize_name: '', //名称
              goods_type: '1', //来源
              prize_integral:'', //积分
              goods_id:'',     //商城
              prize_img: '',    //图片
              prize_num: '8',    //数量
              mall_type: '1',  //方式
              prize_chance: '',  //中奖率
              prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
            prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
             prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
             prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
            prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
             prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
             prize_day: '',    //时长
              prize_oldnum:''
          },{
            prize_id: '',
            prize_name: '', //名称
            goods_type: '1', //来源
            prize_integral:'', //积分
            goods_id:'',     //商城
            prize_img: '',    //图片
            prize_num: '8',    //数量
            mall_type: '1',  //方式
            prize_chance: '',  //中奖率
             prize_day: '',    //时长
              prize_oldnum:''
          }],
//          oppototal: '1',    //总抽奖机会

          //高级设置
          xcx_name: "", //小程序名称
          xcx_appid: "", //小程序AppID
          xcx_secret: "", //小程序密钥
          jump_appid: "", //跳转小程序AppID
          mall_type: "1", //商城兑奖
         
        },
        
        rules: {
          xcx_name: [
            {required: true, message: "请输入小程序名称", trigger: "blur"}
          ],
          xcx_appid: [
            {required: true, message: "请输入小程序AppID", trigger: "blur"}
          ],
          xcx_secret: [
            {required: true, message: "请输入小程序密钥", trigger: "blur"}
          ],
          jump_appid: [
            {required: true, message: "请输入跳转小程序AppID", trigger: "blur"}
          ],
          box_name:[
            {required: true, message: "请填写活动名称", trigger: "blur"}
          ],
          activity_time:[
            {required: true, message: "请填写活动时间", trigger: "blur"}
          ],
          contentInfo: [
            {required: true, message: "请填写活动规则", trigger: "blur"}
          ],
          share_title:[
            {required: true, message: "请填写分享标题", trigger: "blur"}
          ],
          share_img:[
            {required: true, message: "请上传分享图片", trigger: "blur"}
          ],
        },
        formDomData: {
          //form中模版数据
          activityTemArr: [
            {
              url: require("@/assets/images/setjag_tem2.png"),
              label: "模版一"
            }
          ] //活动模板选取数据
        },
        dialogImage: {
          //显示图片弹框
          showUrl: "",
          isVisible: false
        },
      };
    },
    created() {
      this.box_id = this.$route.query.box_id;
      if (!!this.box_id) {
        this.load();
      }
      goodslist({}).then((res)=>{
        this.goodslists  = res.data.goodsList
      })
    },
    methods: {
      ceshi(){
        console.log(this.form.activity_time,this.form.activity_prize,"activity_prize")
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      handleClick(tag) {
        console.log(tag, "tag")
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      //默认数据
      load() {
        var box_id = this.box_id == "" ? "" : this.box_id;
        var data = {box_id: box_id, tmp_id: this.$route.query.tmp_id};
        activityInfo(data)
          .then(res => {
            this.form = res.data;
            console.log(res.data,"*************")
          })
          .catch(err => {
            console.log(err);
          });
      },

      //点击上一页 下一页 发布
      changeTabPage(type) {
        var _this = this;
        let pageIdx = parseInt(this.tabActiveId);
        if (type === "prev") {
          pageIdx--;
        } else if (type === "next") {
          pageIdx++;
        } else if (type === "form") {
          window._hmt.push(['_trackEvent', '保存', 'click', '保存前']);
          let left1 = this.$refs.rewardactive1.changeTabPage('form')
          let left2 = this.$refs.rewardactive2.changeTabPage('form')
          let left3 = this.$refs.rewardactive3.changeTabPage('form')
          let left4 = this.$refs.rewardactive4.changeTabPage('form')
          let left5 = this.$refs.rewardactive5.changeTabPage('form')
          let left6 = this.$refs.rewardactive6.changeTabPage('form')
          let left7 = this.$refs.rewardactive7.changeTabPage('form')
          let left8 = this.$refs.rewardactive8.changeTabPage('form')
          if((left1+left2+left3+left4+left5+left6+left7+left8!=0)){
            // let message = [];
            // let arr = [];
            // left1==1?message.push('奖励一'):'';
            // left2==1?message.push('奖励二'):'';
//            left1==1?arr.push(0):'';
//            left2==1?arr.push(1):'';
//            this.tabActiveIdmin = `tab${arr[0]+1}`
            this.$message({
              message: "奖励设置有未填信息!",
              type: "warning"
            });

            return false
          }
          _this.$refs[type].validate(valid => {
            if (valid) {
              _this.disAbled = true;
              var box_id = this.box_id == "" ? "" : this.box_id;
              var data = _this.form;
              data.box_id = box_id;
              data.tmp_id = this.$route.query.tmp_id;
              console.log(data,"///////////////////////");
              activityEdit(data)
                .then(res => {
                  if (res.code == 200) {

                    const h = this.$createElement;
                    _this.$msgbox({
                      title: "保存成功",
                      message: h("p", null, [
                        h(
                          "p", null, "请前往我的项目去发布小程序！"
                        )
                      ]),
                      showCancelButton: true,
                      confirmButtonText: "确定",
                      showClose: true,
                      center: true,
                      showCancelButton: false,
                      callback: action => {
                        _this.$router.push("/MyProject");
                        window._hmt.push(['_trackEvent', '保存', 'click', '保存成功']);
                      }
                    });
                  } else {
                    _this.disAbled = false;
                  }
                })
                .catch(err => {
                  _this.disAbled = false;
                });
            } else {
              _this.disAbled = false;
              _this.$message({
                message: "您还有未填项",
                type: "warning"
              });
              return false;
            }
          });
        }
        this.tabActiveId = pageIdx.toString();
      },
      //显示图片
      handlePicPreview(file) {
        this.dialogImage.showUrl = file;
        this.dialogImage.isVisible = true;
      },
      handleAvatarSuccess(res, file) {
        this.form.background_img = res.data.path;
      },
      handleAvatarSuccess1(res, file) {
        this.form.page_slogan = res.data.path;
      },
      handleAvatarSuccess2(res, file) {
        this.form.luckdraw_img = res.data.path;
      },
      handleAvatarSuccess3(res, file) {
        this.form.ranking_logo = res.data.path;
      },
      handleAvatarSuccess4(res, file) {
        if (res.code == 200) {
          this.form.share_img = res.data.path;
          if (this.form.share_img) {
            this.$refs.formimg.clearValidate(["share_img"]);
          }
        }

      },
      handleAvatarSuccess5(res, file){
        this.form.prize_img = res.data.path;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      //上传图片失败回调
      handlePicError(err, file, fileList) {
        this.$message.error("图片上传失败！");
      },
      //点击一键获取
      getMallAwardData(type) {
        if (type === "1") {
          //获取兑奖中心
        } else if (type === "2") {
          //获取提现记录
        } else if (type === "3") {
          //获取奖品记录
        }
      }
    }
  };
</script>

<style scoped>
  /deep/ .header {
    width: 90% !important;
    min-width: 1200px;
  }

  .home_app {
    width: 100%;
    min-height: 100vh;
    background: #f8f8f8;
  }

  .con_setactivity {
    padding-top: 18px;
    display: flex;
    background: #f8f8f8;
  }

  .con_setactivity .left_box {
    width: 35%;
    min-width: 354px;
  }

  .con_setactivity .right_box {
    flex: 1;
    min-height: calc(100vh - 98px);
    overflow-y: auto;
    background: #fff;
  }

  /* 表单 */
  .form_module {
    padding: 45px 60px;
  }

  .con_setactivity .right_box .form_module {
    padding: 45px 60px;
  }

  .right_box .form_module .el-form-item {
    margin-bottom: 60px;
  }

  .con_setactivity .right_box .form_module .form_item_activitytem {
    margin-bottom: 50px;
  }

  .right_box .form_module .acticitytem_val_list {
    display: inline-block;
    margin-right: 50px;
    margin-top: 30px;
  }

  .right_box .form_module .acticitytem_val_list .photo-wrap {
    width: 220px;
    height: 180px;
  }

  .right_box .form_module .acticitytem_val_list .radio_wrap {
    margin-top: 30px;
    text-align: center;
  }

  .right_box .form_module .input_mes {

    margin-left: 5px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #5c91ff;
  }

  .right_box .form_module .el-upload .input_mes {
    position: absolute;
    left: 220px;
    bottom: 0;
    height: 15px;
    line-height: 15px;
  }

  .right_box .form_module .form_item_btn {
    padding-top: 40px;
  }

  /* 表单每一项的下一层级 */
  .right_box .form_module .form_item_module .form_module_title {
    margin-bottom: 40px;
  }

  .right_box .form_module .form_item_module .el-form-item {
    margin-bottom: 40px;
  }

  /* 翻倍设置 */
  .right_box .form_module .form_item_double .double_list {
    margin-top: 20px;
  }

  .right_box .form_module .form_item_double .double_list:first-child {
    margin-top: 0;
  }

  .right_box .form_module .form_item_double .double_list .double_item {
    display: inline-block;
    margin-right: 30px;
  }

  .right_box .form_module .form_item_double .double_list .el-input {
    width: 100px;
  }

  .right_box .form_module .form_item_double .double_list .icon_equal {
    padding: 0 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #606266;
  }

  /* 商城兑奖 */
  .form_item_mallaward .mallaward_val {
    padding-left: 10px;
    margin-bottom: 40px;
  }

  .line {
    text-align: center;
  }

  /*新增加round*/
  .el-tag {
    margin: 0 10px 20px;
    line-height: 30px;
    cursor: pointer;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: inherit;
  }

  .drawoneday {
    color: #606266;
  }

  .drawoneday input {
    width: 50px;
    text-align: center;
  }

  .eltag-span span {
    /*margin-bottom: 20px;*/
  }
</style>
<style>
  /* tab */
  .right_box .el-tabs--top.el-tabs--card .el-tabs__item {
    height: 67px;
    padding-right: 40px;
    padding-left: 40px;
    line-height: 67px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #4c4c4c;
  }

  .right_box .el-tabs--top.el-tabs--card .el-tabs__item.is-active {
    font-weight: 600;
    color: #4b73ff;
  }

  .right_box .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border-top: none;
    border-left: none;
    border-radius: 0;
  }

  .right_box .form_module .el-form-item__label,
  .con_setactivity .right_box .form_module .form_module_title {
    line-height: 25px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #333;
  }

  /* 表单 */
  .right_box .form_module .inputs .el-form-item__label {
    line-height: 36px;
  }

  .right_box .form_module .el-form-item__content {
    line-height: 25px;
  }

  .right_box .form_module .el-date-editor .el-range__icon,
  .right_box .form_module .el-date-editor .el-range-separator {
    line-height: 28px;
  }

  .right_box .form_module .form_item_activitytem .el-radio-group {
    margin-right: -65px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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

  /* .right_box .form_module .el-upload--picture-card{
      width:210px;
      height:210px;
      line-height:220px;
      border:2px dotted #DBDFE6;
      background:none;
    }
    .right_box .form_module .el-upload--picture-card .el-icon-plus{
      font-size:45px;
      color:#DBDFE6;
    } */
  /* .right_box .form_module .form_item_rankingprize .el-upload--picture-card{
      width:104px;
      height:104px;
      line-height:110px;
    }
    .right_box .form_module .form_item_rankingprize .el-upload--picture-card .el-icon-plus {
      font-size:30px;
    } */

  .el-date-editor--datetimerange.el-input__inner{
    width: 490px;
  }

  .right_box .form_module .el-input,
  .right_box .form_module .pickers .el-date-editor {
    width: 490px;
  }

  .right_box .form_module .el-textarea__inner {
    width: 490px;
    height: 60px;
  }

  .right_box .form_module .inputs .el-input__inner,
  .right_box .form_module .pickers .el-date-editor {
    height: 36px;
    line-height: 36px;
  }

  .right_box .form_module .btn {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border-color: #7d9bff;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    background: #7d9bff;
  }

  .right_box .form_module .btn.updataPhoto {
    height: 36px;
    margin-top: 20px;
    margin-left: 42px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }

  .right_box .form_module .btn.btn_prev {
    margin-right: 30px;
    border-color: #dcdfe6;
    background: #ffffff;
    color: #606266;
  }

  /* 表单每一项的下一层级 */
  .right_box .form_module .form_item_module .el-form-item__label {
    padding-left: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }

  /deep/ .eltag-span .el-tabs__item {
    height: 40px !important;
    line-height: 40px !important;
  }
</style>
<style>
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "";
    color: #fff;
    margin-right: 4px;
  }

  .appreward {
    padding: 20px 60px !important;
  }

  .appreward .el-tabs__header {
    margin: 0 0 50px;
  }

  .appreward .el-tabs__item {
    height: 42px !important;
    line-height: 42px !important;
    /*margin: 5px;*/
    box-sizing: border-box;
    border: solid 1px #ddd !important;
    border-radius: 4px;
    background: #fff;
    padding: 0 20px !important;
    margin-right: 10px;
  }

  /*.appreward .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{*/
  /*border-color:#409EFF!important;*/
  /*}*/
  .appreward .el-tabs--top.el-tabs--card .el-tabs__item.is-active {
    border-color: #4b73ff !important;
  }

  .appreward .el-tabs--card > .el-tabs__header {
    border: none !important;
  }

  .appreward .el-tabs__nav {
    border: none !important;
  }
  .appreward .el-tabs__nav-wrap{
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 1)!important;
    background-color: #fff!important;
  }
 .right_box .form_module .el-input-number .el-input{
   width: 100%;
 }
</style>

