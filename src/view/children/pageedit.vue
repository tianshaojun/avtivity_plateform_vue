<template>
  <div class="container">
    <div class="controller con_setactivity">
      <div class="edit_box">
        <el-form class="form" :model="form" ref="form" label-position="left" label-width="198px">
          <el-tabs v-model="tabActiveId" type="card">
            <el-tab-pane label="banner设置" name="1">
              <div class="form_module">
                <div class="form_item_activitytem">
                  <div class="shuomin">说明：
                    <br>1.提交审核小程序时，系统会自动切换成假页面，假页面可提高审核通过率
                    <br>2.审核假页面默认为资讯类信息展示，可自行根据小程序的类目配置对应的展示信息。
                    <br>3.请保持小程序名称、简介，类目与假页面内容保持一致
                  </div>
                  <el-form-item label="Banner1">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.bannerList[0].image" :src="form.bannerList[0].image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*建议尺寸750px*300px)</span>
                  </el-form-item>
                  <el-form-item label="Banner2">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.bannerList[1].image" :src="form.bannerList[1].image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*建议尺寸750px*300px)</span>
                  </el-form-item>
                  <el-form-item label="Banner3">
                    <el-upload
                      class="avatar-uploader"
                      :action="upUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.bannerList[2].image" :src="form.bannerList[2].image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="input_mes">(*建议尺寸750px*300px)</span>
                  </el-form-item>
                  <el-form-item class="form_item_btn">
                    <el-button type="primary" class="btn" @click="changeTabPage('next')">下一步</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="资讯设置" name="2">
              <div class="form_module">
                <div class="form_item_module">
                  <div class="zixunconter">
                    <div class="shuomin">说明：
                      <br>1.提交审核小程序时，系统会自动切换成假页面，假页面可提高审核通过率
                      <br>2.审核假页面默认为资讯类信息展示，可自行根据小程序的类目配置对应的展示信息。
                      <br>3.请保持小程序名称、简介，类目与假页面内容保持一致
                    </div>
                    <el-tabs type="card">
                      <el-tab-pane label="奖励一">
                        <el-form-item label="活动名称" class="inputs">
                          <el-input v-if="form.auditList[0]" v-model="form.auditList[0].title"></el-input>
                        </el-form-item>
                        <el-form-item label="资讯分类">
                          <el-select
                            v-if="form.auditList[0]"
                            v-model="form.auditList[0].classify"
                            placeholder="请选择资讯分类"
                          >
                            <el-option label="今日推荐" value="今日推荐"></el-option>
                            <el-option label="明日推荐" value="明日推荐"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="资讯图片" prop="bgUrl" ref="formNameurl">
                          <el-upload
                            class="avatar-uploader"
                            :action="upUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess4"
                            :before-upload="beforeAvatarUpload"
                          >
                            <img
                              v-if="form.auditList[0].image"
                              :src="form.auditList[0].image"
                              class="avatar"
                            >
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          <span class="input_mes">(*建议尺寸750px*300px)</span>
                        </el-form-item>
                        <p>资讯内容</p>
                        <vue-ueditor-wrap
                          v-if="form.auditList[0]"
                          v-model="form.auditList[0].content"
                          :config="myConfig"
                        ></vue-ueditor-wrap>
                      </el-tab-pane>
                      <el-tab-pane label="奖励二">
                        <el-form-item label="活动名称" class="inputs">
                          <el-input v-if="form.auditList[1]" v-model="form.auditList[1].title"></el-input>
                        </el-form-item>
                        <el-form-item label="资讯分类">
                          <el-select
                            v-if="form.auditList[1]"
                            v-model="form.auditList[1].classify"
                            placeholder="请选择资讯分类"
                          >
                            <el-option label="今日推荐" value="今日推荐"></el-option>
                            <el-option label="明日推荐" value="明日推荐"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="资讯图片" prop="bgUrl" ref="formNameurl">
                          <el-upload
                            class="avatar-uploader"
                            :action="upUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess5"
                            :before-upload="beforeAvatarUpload"
                          >
                            <img
                              v-if="form.auditList[1].image"
                              :src="form.auditList[1].image"
                              class="avatar"
                            >
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          <span class="input_mes">(*建议尺寸750px*300px)</span>
                        </el-form-item>
                        <p>资讯内容</p>
                        <vue-ueditor-wrap
                          v-if="form.auditList[1]"
                          v-model="form.auditList[1].content"
                          :config="myConfig"
                        ></vue-ueditor-wrap>
                      </el-tab-pane>
                      <el-tab-pane label="奖励三">
                        <el-form-item label="活动名称" class="inputs">
                          <el-input v-if="form.auditList[2]" v-model="form.auditList[2].title"></el-input>
                        </el-form-item>
                        <el-form-item label="资讯分类">
                          <el-select
                            v-if="form.auditList[2]"
                            v-model="form.auditList[2].classify"
                            placeholder="请选择资讯分类"
                          >
                            <el-option label="今日推荐" value="今日推荐"></el-option>
                            <el-option label="明日推荐" value="明日推荐"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="资讯图片" prop="bgUrl" ref="formNameurl">
                          <el-upload
                            class="avatar-uploader"
                            :action="upUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess6"
                            :before-upload="beforeAvatarUpload"
                          >
                            <img
                              v-if="form.auditList[2].image"
                              :src="form.auditList[2].image"
                              class="avatar"
                            >
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          <span class="input_mes">(*建议尺寸750px*300px)</span>
                        </el-form-item>
                        <p>资讯内容</p>
                        <vue-ueditor-wrap
                          v-if="form.auditList[2]"
                          v-model="form.auditList[2].content"
                          :config="myConfig"
                        ></vue-ueditor-wrap>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <el-form-item style="margin-top:60px" class="form_item_btn">
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
import { auditxcx, auditupd, gameUrl } from "@/api/index";
import CommonHeader from "@/components/header";
import "@/vue-ueditor-wrap.min.js";
import store from "@/store";
export default {
  name: "pageedit",
  components: {
    CommonHeader,
    VueUeditorWrap
  },
  data() {
    return {
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: 800,
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: process.env.BASEURL+"ueditor/php/controller.php",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/static/UEditor/"
      },
      disAbled: false,
      //        upUrl: axios.defaults.baseURL + "index/uploadimg",
      upUrl: gameUrl + "LG/uploadImg",
      box_id: "",
      tabActiveId: "1", //选项卡选中的id
      form: {
        bannerList: [
          {
            image:""
          },
          {
            image:""
          },{
            image:""
          }
        ],
        auditList: [
          {
            title:"",
            classify: "",
            image:"",
            content:""
          },
          {
            title: "",
            classify: "",
            image:"",
            content: ""
          },{
            title: "",
            classify: "",
            image:"",
            content: ""
          }
        ]
      },
      dialogImage: {
        //显示图片弹框
        showUrl: "",
        isVisible: false
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    //默认数据
    load() {
      var data = {};
      if (localStorage.getItem("box_id")) {
        data.box_id = localStorage.getItem("box_id");
        data.tmp_id = localStorage.getItem("tmp_id");
      }
      auditxcx(data)
        .then(res => {
          if(res.data.auditList.length!=0){
              this.form.auditList = res.data.auditList;
              this.form.bannerList = res.data.bannerList;
          }
          
          
        })
        .catch(err => {});
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
        console.log(this.form, "dddd");
        window._hmt.push(["_trackEvent", "保存", "click", "保存前"]);
        _this.$refs[type].validate(valid => {
          if (valid) {
            _this.disAbled = true;
            var data = {};
            data.box_id = localStorage.getItem("box_id");
            data.tmp_id = localStorage.getItem("tmp_id");
            data.bannerList = _this.form.bannerList;
            data.auditList = _this.form.auditList;
            auditupd(data)
              .then(res => {
                if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "修改成功!",
                      center: true,
                      duration:1500
                    });
                    setTimeout(() => {
                    _this.$router.push("/wXreview");                      
                    }, 1500);
                      window._hmt.push([
                        "_trackEvent",
                        "保存",
                        "click",
                        "保存成功"
                      ]);
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
        this.form.bannerList[0].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.code == 200) {
        this.form.bannerList[1].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    handleAvatarSuccess3(res, file) {
      if (res.code == 200) {
        this.form.bannerList[2].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    handleAvatarSuccess4(res, file) {
      if (res.code == 200) {
        this.form.auditList[0].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    handleAvatarSuccess5(res, file) {
      if (res.code == 200) {
        this.form.auditList[1].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    handleAvatarSuccess6(res, file) {
      if (res.code == 200) {
        this.form.auditList[2].image = res.data.imgUrl;
        if (this.form.bgUrl) {
          this.$refs.formNameurl.clearValidate(["bgUrl"]);
        }
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
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
  }
};
</script>

<style scoped>
/deep/ .header {
  width: 90% !important;
  min-width: 1200px;
}
.container {
  width: 100%;
  min-height: 100vh;
  /* background: #f8f8f8; */
}
.con_setactivity {
  display: flex;
  /* background: #f8f8f8; */
}
.con_setactivity .left_box {
  width: 35%;
  min-width: 354px;
}
.con_setactivity .edit_box {
  flex: 1;
  min-height: calc(100vh - 98px);
  overflow-y: auto;
  background: #fff;
}
/* 表单 */
.con_setactivity .edit_box .form_module {
  padding: 20px 40px;
}
.edit_box .form_module .el-form-item {
  margin-bottom: 60px;
}
.shuomin {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 60px;
}
</style>
<style>
/* tab */
.edit_box .el-tabs--top.el-tabs--card .el-tabs__item {
  height: 60px;
  padding: 0;
  margin-left: 40px;
  line-height: 60px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #4c4c4c;
  border: none;
}
.edit_box .el-tabs--top.el-tabs--card .el-tabs__item.is-active {
  color: #7d9bff;
  border-bottom: 2px solid #7d9bff;
}
.edit_box .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
  border-radius: 0;
}
.edit_box .form_module .el-form-item__label,
.con_setactivity .edit_box .form_module .form_module_title {
  line-height: 25px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #333;
}
/* 表单 */
.edit_box .form_module .inputs .el-form-item__label {
  line-height: 36px;
}
.edit_box .form_module .el-form-item__content {
  line-height: 25px;
}
.edit_box .form_module .el-date-editor .el-range__icon,
.edit_box .form_module .el-date-editor .el-range-separator {
  line-height: 28px;
}
.edit_box .form_module .form_item_activitytem .el-radio-group {
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
.edit_box .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.edit_box .avatar {
  width: 200px;
  height: 80px;
  display: block;
}
.edit_box .form_module .el-input,
.edit_box .form_module .pickers .el-date-editor {
  width: 490px;
}
.edit_box .form_module .el-textarea__inner {
  width: 490px;
  height: 60px;
  min-height: 100px !important;
}
.edit_box .form_module .inputs .el-input__inner,
.edit_box .form_module .pickers .el-date-editor {
  height: 36px;
  line-height: 36px;
}
.edit_box .form_module .btn {
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border-color: #7d9bff;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  background: #7d9bff;
}
.edit_box .form_module .btn.updataPhoto {
  height: 36px;
  margin-top: 20px;
  margin-left: 42px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.edit_box .form_module .btn.btn_prev {
  margin-right: 30px;
  border-color: #dcdfe6;
  background: #ffffff;
  color: #606266;
}
/* 表单每一项的下一层级 */
.edit_box .form_module .form_item_module .el-form-item__label {
  padding-left: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #606266;
}
.zixunconter {
}

.zixunconter .el-tabs__header {
  margin: 0 0 30px;
}

.zixunconter .el-tabs__item {
  height: 40px !important;
  line-height: 40px !important;
  box-sizing: border-box;
  border: solid 1px #ddd !important;
  border-radius: 4px;
  background: #fff;
  padding: 0 20px !important;
  margin: 0 50px 0 0 !important;
}

.zixunconter .el-tabs--top.el-tabs--card .el-tabs__item.is-active {
  border-color: #4b73ff !important;
}

.zixunconter .el-tabs--card > .el-tabs__header {
  border: none !important;
}

.zixunconter .el-tabs__nav {
  border: none !important;
}
.zixunconter .el-tabs__nav-wrap {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 1) !important;
  background-color: #fff !important;
}
</style>

