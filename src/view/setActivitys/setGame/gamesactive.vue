<template>
  <div class="home_app">
    <common-header></common-header>
    <div class="controller con_setactivity">
      <div class="left_box">
        <!--<temShow></temShow>-->
        <div class="temshow">
          <div class="tem_phone_wrap">
            <img class="phonek" src="@/assets/images/setactivity_temshow01.png" alt>
            <!--<div class="phoneIfram"><iframe src="http://test-twobox.molixyou.com/uouxi/yibi/index.html"></iframe></div>-->
            <div class="phoneIfram">
              <iframe :src="$route.query.baseurl"></iframe>
            </div>
          </div>
          <p style="text-align: center;">游戏试玩</p>
        </div>
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
            <el-tab-pane label="样式设置" name="1">
              <div class="form_module">
                <div class="form_item_activitytem">
                  <!--<h4 class="form_module_title">活动模板选取</h4>-->
                  <!--<el-radio-group v-model="form.template_type">-->
                  <!--<div-->
                  <!--class="acticitytem_val_list"-->
                  <!--v-for="(item,idx) in formDomData.activityTemArr"-->
                  <!--:key="idx"-->
                  <!--&gt;-->
                  <!--<p class="photo-wrap">-->
                  <!--<img :src="item.url" alt>-->
                  <!--</p>-->
                  <!--<p class="radio_wrap">-->
                  <!--<el-radio :label="idx+1+''">{{item.label}}</el-radio>-->
                  <!--</p>-->
                  <!--</div>-->
                  <!--</el-radio-group>-->
                  <!--</div>-->
                  <el-form-item label="背景图" prop="bgUrl" ref="formNameurl">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.bgUrl" :src="form.bgUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>

                  <!--<el-form-item label="活动页面slogan">-->
                  <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--:action="upUrl"-->
                  <!--:show-file-list="false"-->
                  <!--:on-success="handleAvatarSuccess2"-->
                  <!--:before-upload="beforeAvatarUpload"-->
                  <!--&gt;-->
                  <!--<img v-if="form.page_slogan" :src="form.page_slogan" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--</el-upload>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="排行榜奖品" class="form_item_rankingprize">-->
                  <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--:action="upUrl"-->
                  <!--:show-file-list="false"-->
                  <!--:on-success="handleAvatarSuccess3"-->
                  <!--:before-upload="beforeAvatarUpload"-->
                  <!--&gt;-->
                  <!--<img v-if="form.prize_img" :src="form.prize_img" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--</el-upload>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="排行榜奖品状态">-->
                  <!--<el-radio-group v-model="form.prize_status">-->
                  <!--<el-radio label="1">开启</el-radio>-->
                  <!--<el-radio label="2">关闭</el-radio>-->
                  <!--</el-radio-group>-->
                  <!--</el-form-item>-->
                  <el-form-item class="form_item_btn">
                    <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="基础设置" name="2">
              <div class="form_module">
                <el-form-item label="活动名称" prop="activityName" class="inputs">
                  <el-input v-model="form.activityName">{</el-input>
                  <span class="input_mes">(*必填)</span>
                </el-form-item>
                <div class="form_item_module">
                  <h4 class="form_module_title">分享设置</h4>
                  <el-form-item label="分享标题" prop="shareTitle" class="inputs">
                    <el-input v-model="form.shareTitle"></el-input>
                    <span class="input_mes">(*必填)</span>
                  </el-form-item>
                  <el-form-item label="分享图" prop="shareImgUrl" ref="formNameshareImgurl">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess4"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.shareImgUrl" :src="form.shareImgUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*必填)</span>
                    <!--<el-button type="primary" class="btn updataPhoto">上传单张图片</el-button>-->
                  </el-form-item>
                </div>

                <!--<div class="form_item_module">-->
                <!--<h4 class="form_module_title">朋友圈分享设置</h4>-->
                <!--<el-form-item label="朋友圈分享图">-->
                <!--<el-upload-->
                <!--class="avatar-uploader"-->
                <!--:action="upUrl"-->
                <!--:show-file-list="false"-->
                <!--:on-success="handleAvatarSuccess5"-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--&gt;-->
                <!--<img v-if="form.friend_img" :src="form.friend_img" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
                <!--&lt;!&ndash;<el-button type="primary" class="btn updataPhoto">上传单张图片</el-button>&ndash;&gt;-->
                <!--</el-form-item>-->
                <!--</div>-->
                <el-form-item class="form_item_btn">
                  <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                  <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                </el-form-item>
              </div>
            </el-tab-pane>
            <el-tab-pane label="奖项设置" name="3">
              <div class="form_module">
                <!--<el-form-item label="活动时间" class="pickers">-->
                <!--<el-date-picker-->
                <!--v-model="form.activity_time"-->
                <!--type="datetimerange"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期"-->
                <!--&gt;</el-date-picker>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="红包奖励" prop="redbag_money" class="inputs">-->
                <!--<el-input v-model="form.redbag_money" placeholder="设置积分" type="number"></el-input>-->
                <!--<span class="input_mes">(*必填)</span>-->
                <!--</el-form-item>-->
                <!--{{form.rewardList[1].score}}-->
                <el-form-item label="分数配置表" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item">
                      <el-input type="number" v-model="form.rewardList[0].score" placeholder="分"></el-input>
                      <span class="icon_equal">=</span>
                      <el-input type="number" v-model="form.rewardList[0].integral" placeholder="分"></el-input>
                    </div>
                    <div class="double_item">
                      <el-input type="number" v-model="form.rewardList[1].score" placeholder="分"></el-input>
                      <span class="icon_equal">=</span>
                      <el-input type="number" v-model="form.rewardList[1].integral" placeholder="分"></el-input>
                    </div>
                  </div>
                  <div class="double_list">
                    <div class="double_item">
                      <el-input type="number" v-model="form.rewardList[2].score" placeholder="分"></el-input>
                      <span class="icon_equal">=</span>
                      <el-input type="number" v-model="form.rewardList[2].integral" placeholder="分"></el-input>
                    </div>
                    <div class="double_item">
                      <el-input type="number" v-model="form.rewardList[3].score" placeholder="分"></el-input>
                      <span class="icon_equal">=</span>
                      <el-input type="number" v-model="form.rewardList[3].integral" placeholder="分"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <!--<el-form-item label="对应积分的配置表" class="form_item_double inputs">-->
                <!--<div class="double_list">-->
                <!--<div class="double_item"  >-->
                <!--<el-input type="number" v-model="form.integralList[0].score" placeholder="倍"></el-input>-->
                <!--<span class="icon_equal">=</span>-->
                <!--<el-input type="number" v-model="form.integralList[1]" placeholder="倍"></el-input>-->
                <!--</div>-->
                <!--</div>-->
                <!--</el-form-item>-->
                <el-form-item label="游戏规则" prop="activityRule">
                  <el-input type="textarea" v-model="form.activityRule"></el-input>
                  <span class="input_mes">(*必填)</span>
                </el-form-item>

                <el-form-item label="兑换次数" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item">
                      <el-input type="number" v-model="form.exchangeCounts" placeholder="次数"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="分享按钮" prop="activityState">
                  <el-radio-group v-model="form.shareFlag">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="2">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
                <template v-if="form.shareFlag === '1'">
                    <el-form-item label="分享次数" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item">
                      <el-input type="number" v-model="form.shareCounts" placeholder="次数"></el-input>
                    </div>
                  </div>
                </el-form-item>
                 <el-form-item label="方案选择" prop="activityState">
                  <el-radio-group v-model="form.shareType">
                    <el-radio label="1">双倍分数</el-radio>
                    <el-radio label="2">分享复活</el-radio>
                    <el-radio label="3">增加兑换次数</el-radio>
                  </el-radio-group>
                </el-form-item>
                <template v-if="form.shareType === '3'">
                <el-form-item  label="方案选择/兑换次数" class="form_item_double inputs">
                  <div class="double_list">
                    <div class="double_item">
                      <el-input type="number" v-model="form.addExchangeCounts" placeholder="次数"></el-input>
                    </div>
                  </div>
                </el-form-item>
                </template>
                </template>
               
                <el-form-item label="活动状态" prop="activityState">
                  <el-radio-group v-model="form.activityState">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="2">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="form_item_btn">
                  <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                  <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                </el-form-item>
              </div>
            </el-tab-pane>
            <el-tab-pane label="高级设置" name="4">
              <div class="form_module">
                <div class="form_item_module">
                  <h4 class="form_module_title">授权小游戏</h4>
                  <!--<el-form-item label="小程序名称" prop="gameName" class="inputs">-->
                  <!--<el-input v-model="form.gameName" placeholder="请输入小程序名称"></el-input>-->
                  <!--<span class="input_mes">(*必填)</span>-->
                  <!--</el-form-item>-->
                  <el-form-item label="小游戏AppID" prop="appid" class="inputs">
                    <el-input v-model="form.appid" placeholder="请输入小游戏AppID"></el-input>
                  </el-form-item>
                  <el-form-item label="小游戏密钥" prop="appSecret" class="inputs">
                    <el-input v-model="form.appSecret" placeholder="请输入小游戏密钥"></el-input>
                  </el-form-item>
                </div>
                <div class="form_item_module">
                  <h4 class="form_module_title">跳转小程序</h4>
                  <el-form-item label="跳转小程序AppID" prop="outAppid" class="inputs">
                    <el-input v-model="form.outAppid" placeholder="请输入小程序AppID "></el-input>
                  </el-form-item>
                  <!--<el-form-item label="默认跳转">-->
                  <!--<el-radio-group v-model="form.jump_type">-->
                  <!--<el-radio label="1">悬浮跳转</el-radio>-->
                  <!--&lt;!&ndash; <el-radio label="2">banner位跳转</el-radio> &ndash;&gt;-->
                  <!--</el-radio-group>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="图片上传" prop="jump_img">-->
                  <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--:action="upUrl"-->
                  <!--:show-file-list="false"-->
                  <!--:on-success="handleAvatarSuccess6"-->
                  <!--:before-upload="beforeAvatarUpload"-->
                  <!--&gt;-->
                  <!--<img v-if="form.jump_img" :src="form.jump_img" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--</el-upload>-->
                  <!--<span class="input_mes">(*必填)</span>-->
                  <!--</el-form-item>-->
                </div>
                <!--<el-form-item label="商城兑奖">-->
                <!--<el-radio-group v-model="form.mall_type">-->
                <!--<el-radio label="1">魔力橙兑奖</el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="form_item_btn">-->
                <!--<el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>-->
                <!--<el-button-->
                <!--type="primary"-->
                <!--:disabled="disAbled"-->
                <!--class="btn"-->
                <!--@click="changeTabPage('form')"-->
                <!--&gt;保存</el-button>-->
                <!--</el-form-item>-->
                <el-form-item class="form_item_btn">
                  <el-button type="primary" class="btn btn_prev" @click="changeTabPage('prev')">上一步</el-button>
                  <el-button
                    type="primary"
                    :disabled="disAbled"
                    class="btn"
                    @click="changeTabPage('form')"
                  >保存</el-button>
                </el-form-item>
              </div>
            </el-tab-pane>
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
import {
  activityEdit,
  activityInfo,
  gamedefault,
  gamesubmit,
  gameUrl
} from "@/api/index";
import CommonHeader from "@/components/header";
import TemShow from "./components/temShow";
import store from "@/store";
export default {
  name: "SetActivity",
  components: {
    CommonHeader,
    TemShow
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
      disAbled: false,
      //        upUrl: axios.defaults.baseURL + "index/uploadimg",
      upUrl: gameUrl + "LG/uploadImg",
      box_id: "",
      tabActiveId: "1", //选项卡选中的id
      form: {
        //表单提交
        //样式设置
        //          template_type: "1", //选中的模版
        bgUrl: "", //活动背景图
        //          page_slogan: "", //slogan图片
        //          prize_img: "", //排行榜奖品图片
        //          prize_status: "1", //排行榜奖品状态

        //基础设置
        activityName: "", //活动名称
        shareTitle: "", //分享标题
        shareImgUrl: "", //活动背景图
        //          friend_img: "", //朋友圈分享图

        //奖项配置
        //          activity_time: "", //活动时间
        //          redbag_money: "", //红包奖励金
        rewardList: [
          { score: 0, integral: 0 },
          { score: 0, integral: 0 },
          { score: 0, integral: 0 },
          { score: 0, integral: 0 }
        ],
        activityRule: "", //活动规则
        activityState: "1", //活动状态
        shareFlag:'1',
        shareCounts:'1',
        shareType:'1',
        addExchangeCounts:'1',
        exchangeCounts:'1',
        //高级设置
        //          xcx_name: "", //小程序名称
        appid: "", //小程序AppID
        appSecret: "", //小程序密钥
        outAppid: "" //跳转小程序AppID
        //          jump_type: "1", //选中默认跳转
        //          jump_img: "", //图片上传数据
        //          mall_type: "1", //商城兑奖
        //          gzh_exchange: "",
        //          gzh_extract: "",
        //          gzh_prize: ""
      },
      rules: {
        bgUrl: [{ required: true, message: "请上传图片" }],
        shareTitle: [
          { required: true, message: "请输入分享标题", trigger: "blur" }
        ],
        shareImgUrl: [{ required: true, message: "请上传图片" }],
        rewardList: [
          {
            type: "array",
            required: true,
            message: "请输入积分配置表",
            trigger: "blur"
          }
        ],
        activityState: [
          { required: true, message: "请选择活动状态", trigger: "blur" }
        ],
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        activityRule: [
          { required: true, message: "请输入游戏规则", trigger: "blur" }
        ]
      },
      formDomData: {
        //form中模版数据
        activityTemArr: [
          {
            url: require("@/assets/images/setactivity_tem1.png"),
            label: "模版一"
          }
        ] //活动模板选取数据
      },
      dialogImage: {
        //显示图片弹框
        showUrl: "",
        isVisible: false
      }
    };
  },
  created() {
    //  	 this.load();
    this.box_id = this.$route.query.box_id;
    this.routerID = this.$route.query.routerid;
    if (!!this.routerID) {
      this.load();
    }
  },
  methods: {
    //默认数据
    load() {
      console.log(this.$route.query.id, "data");
      var data = {
        id: this.box_id
      };

      gamedefault(data)
        .then(res => {
          if (res.code == 200) {
            var formdata = res.data;
            this.form.activityName = formdata.activityName; //活动名称
            this.form.bgUrl = formdata.bgUrl; //背景图片
            this.form.shareTitle = formdata.shareTitle; //分享标题
            this.form.shareImgUrl = formdata.shareImgUrl; //分享图片
            this.form.rewardList = formdata.rewardList; //积分配置表
            this.form.activityState = formdata.activityState; //	活动状态
            this.form.activityRule = formdata.rule; //	游戏规则
            this.form.appid = formdata.appid; //appid
            this.form.appSecret = formdata.appSecret; //appid秘钥
            this.form.exchangeCounts = formdata.exchangeCounts; //积分兑换次数
            this.form.shareFlag = formdata.shareFlag; //分享开关
            this.form.shareCounts = formdata.shareCounts; //分享次数
            this.form.shareType = formdata.shareType; //分享类型(1:双倍分数, 2:分享复活 3: 增加兑换次数)
            this.form.addExchangeCounts = formdata.addExchangeCounts; //增加积分兑换次数(default:1)
          }
        })
        .catch(err => {
          console.log(err, "游戏err");
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
        _this.$refs[type].validate(valid => {
          if (valid) {
            _this.disAbled = true;
            var data = _this.form;
            data.templateId = this.$route.query.tmp_id ? this.$route.query.tmp_id : ""; //小程序id
            data.box_id = this.box_id == "" ? "" : this.box_id; //activeid 活动
            data.gameName = this.$route.query.en_name
              ? this.$route.query.en_name
              : "";
            if (!!this.routerID) {
              data.routerId = this.routerID;
            }
            gamesubmit(data)
              .then(res => {
                if (res.code == 200) {
                  console.log(res.data, "游戏数据");
                  const h = this.$createElement;
                  _this.$msgbox({
                    title: "保存成功",
                    message: h("p", null, [
                      h("p", null, "保存成功，我们客服会在24小时之内联系您！")
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
    handleAvatarSuccess1(res, file) {
      if (res.code == 200) {
        this.form.bgUrl = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    //      handleAvatarSuccess2(res, file) {
    //        this.form.page_slogan = res.data.path;
    //      },
    //      handleAvatarSuccess3(res, file) {
    //        this.form.prize_img = res.data.path;
    //      },
    handleAvatarSuccess4(res, file) {
      this.form.shareImgUrl = res.data.imgUrl;
      if (this.form.shareImgUrl) {
        this.$refs.formNameshareImgurl.clearValidate(["shareImgUrl"]);
      }
    },
    //      handleAvatarSuccess5(res, file) {
    //        this.form.friend_img = res.data.path;
    //      },
    //      handleAvatarSuccess6(res, file) {
    //        console.log(1);
    //        this.form.jump_img = res.data.path;
    //      },
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
    //上传图片成功回调
    handlePicSuc(esponse, file, fileList) {
      console.log(file, esponse, "上传图片成功回调");
    }
    //点击一键获取
    //      getMallAwardData(type) {
    //        if (type === "1") {
    //          //获取兑奖中心
    //        } else if (type === "2") {
    //          //获取提现记录
    //        } else if (type === "3") {
    //          //获取奖品记录
    //        }
    //      }
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

.temshow {
  width: 326px;
  margin: 0 auto;
  padding: 10px 0 50px 0;
}
.tem_phone_wrap {
  width: 100%;
  height: 673px;
  position: relative;
}
.phonek {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.phoneIfram {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 12;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
}
.phoneIfram iframe {
  border: none !important;
  margin-top: 50px;
  width: 290px !important;
  height: 512px !important;
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
.right_box .form_module .el-input,
.right_box .form_module .pickers .el-date-editor {
  width: 490px;
}
.right_box .form_module .el-textarea__inner {
  width: 490px;
  height: 60px;
  min-height: 100px !important;
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
</style>
<style>
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "";
  color: #fff;
  margin-right: 4px;
}
</style>

