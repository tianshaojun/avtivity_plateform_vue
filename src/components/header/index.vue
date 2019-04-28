<template>
  <div class="headerBox">
    <div class="header">
      <img src="@/assets/images/logo.png" class="headerImg">
      <div class="herderTab">
        <router-link class="tempLib" to="/" exact :class="{'activess':$route.meta.active==='/'}">首页</router-link>
        <router-link class="tempLib" to="/home" exact :class="{'activess':$route.meta.active==='/home'}">模板库</router-link>
        <router-link class="myProject" to="/MyProject" :class="{'activess':$route.meta.active==='/MyProject'}">我的项目</router-link>
        <a class="tempLib" href="http://www.vdongchina.com/about.html" @click="aboutwd" exact target="_blank">关于微动</a>
         <router-link class="tempLib" to="/help" exact :class="{'activess':$route.meta.active==='/help'}">帮助</router-link>
      </div>
      <div class="headerRight">
        <ul class="headerRightUl" v-show="!userInfo.sessionKey">
          <li @click="loginMask">登录</li>
          <li @click="registerMask">注册</li>
        </ul>
        <ul class="headerRightUl" v-if="userInfo.sessionKey">
          <li>
            <i v-if="!userInfo.adminUser.headimg" class="iconfont icon-morentouxiang"></i>
            <!--<img src="@/assets/images/suo.png" alt>-->
            <img class="userheaderImg" v-if="userInfo.adminUser.headimg" :src="userInfo.adminUser.headimg" alt>

          </li>
          <el-dropdown @command="handleCommand">
            <!-- <span class="el-dropdown-link">用户名</span> -->
            <span class="el-dropdown-link">{{userInfo.adminUser.nickname}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="c">我的钱包</el-dropdown-item>
              <el-dropdown-item command="l">我的礼品</el-dropdown-item>
              <el-dropdown-item command="t">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ul>
      </div>
    </div>
    <!-- login -->
    <div class="logon_Bj" v-show="loginshow">
      <!--账号登录 -->
      <div class="logon">
        <div class="logon_import">
          <img src="@/assets/images/xxx.png" class="logon_import_shut" @click="closelogin">
          <img
            src="@/assets/images/erweilogin.png"
            class="logon_import_switch"
            @click="switchLogin"
          >
          <div class="logon_import_nav">
            <p class="logon_import_nav_left">登录</p>
            <p class="logon_import_nav_right" @click="goRegster">注册</p>
          </div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item prop="phone">
              <el-input
                v-model.number="ruleForm.phone"
                placeholder="请输入注册手机号"
                @keyup.enter.native="loginBtn('ruleForm')"
                :maxlength="11"
              />
              <img src="@/assets/images/rt.png" class="el-inputImg">
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                placeholder="请输入登录密码"
                @keyup.enter.native="loginBtn('ruleForm')"
              ></el-input>
              <img src="@/assets/images/suo.png" class="el-inputImg">
            </el-form-item>
            <div class="el-forgetBox">
              <p class="el-forget" @click="forgetPass">忘记密码?</p>
            </div>
            <el-form-item>
              <el-button type="primary" @click="loginBtn('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--账号登录end-->
    </div>
    <!--二维码-->
    <div class="logon_Bj" v-show="codeshow">
      <div class="logon_QR">
        <div class="logon_QR_box">
          <img src="@/assets/images/xxx.png" class="logon_QR_box_shut" @click="closelogin">
          <img src="@/assets/images/erweima.png" class="logon_QR_box_switch" @click="switchLogin">
          <div class="logon_QR_box_text">
            <div id="wxqr_login"></div>
          </div>
        </div>
      </div>
      <!--二维码end-->
    </div>
    <!-- 注册 -->
    <div class="register_mask" v-if="registerShow">
      <div class="reg_box">
        <div class="reg_heard">
          <div class="erweimalogin" @click="goCode">
            <img src="@/assets/images/erweilogin.png" alt>
          </div>
          <div class>
            <button type="button" @click="closelogin" class="reg_close">
              <img src="@/assets/images/xxx.png" class="closeImg">
            </button>
          </div>
        </div>
        <div class="reg_body">
          <div class="loginreg_txt">
            <div @click="goLoin">登录</div>
            <div class="active">注册</div>
          </div>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            class="reg-ruleForm"
          >
            <el-form-item prop="mobile">
              <el-input
                type="mobile"
                placeholder="请输入注册手机号"
                v-model="ruleForm2.mobile"
                autocomplete="off"
                :maxlength="11"
                class="el-input"
              ></el-input>
              <img src="@/assets/images/rt.png" class="el-inputImg">
            </el-form-item>
            <el-form-item prop="checkcode">
              <el-input
                type="text"
                placeholder="请输入验证码"
                class="codeIpt"
                v-model="ruleForm2.checkcode"
                autocomplete="off"
              ></el-input>
              <el-button
                class="codeBtn"
                type="primary"
                @click="getmessagebtn(1)"
              >{{getmessagetext}}</el-button>
              <!--v-if="flag"-->
              <el-button class="codeBtns">{{getmessagetexted}}s后重新获取</el-button>

            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                class="el-input"
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm2.pass"
                autocomplete="off"
              ></el-input>
              <img src="@/assets/images/suo.png" class="el-inputImg">
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                class="el-input"
                type="password"
                v-model="ruleForm2.checkPass"
                placeholder="请再次输入密码"
                autocomplete="off"
              ></el-input>
              <img src="@/assets/images/suo.png" class="el-inputImg">
            </el-form-item>
            <el-form-item class="greement" prop="greement">
              <el-checkbox name="type" v-model="ruleForm2.greement" autocomplete="off"></el-checkbox>
              <span class="firstment">同意</span>
              <!--<router-link to="/agreenment">-->
              <a class="mentName" href="/#/agreement" target="block">《微动天下》</a>
              <!--</router-link>-->
              <span>用户注册协议</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 忘记密码 -->
    <div class="register_mask" v-if="forgetpaShow">
      <div class="Forget_box">
        <div class="reg_heard">
          <div class="erweimalogin" @click="goCode">
            <img src="@/assets/images/erweilogin.png" alt>
          </div>
          <div class>
            <button type="button" @click="closelogin" class="reg_close">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
        </div>
        <div class="reg_body">
          <div class="loginreg_txt">
            <div class="active">找回密码</div>
          </div>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            class="reg-ruleForm"
          >
            <el-form-item prop="mobile">
              <el-input
                type="mobile"
                placeholder="请输入注册手机号"
                v-model="ruleForm2.mobile"
                :maxlength="11"
                autocomplete="off"
                class="el-input"
              ></el-input>
              <img src="@/assets/images/rt.png" class="el-inputImg">
            </el-form-item>
            <el-form-item prop="checkcode">
              <el-input
                type="code"
                placeholder="请输入验证码"
                class="codeIpt"
                v-model="ruleForm2.checkcode"
                autocomplete="off"
              ></el-input>
              <el-button
                class="codeBtn"
                type="primary"
                @click="getmessagebtn(2)"
              >{{getmessagetext}}</el-button>
              <el-button class="codeBtns">{{getmessagetexted}}s后重新获取</el-button>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                class="el-input"
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm2.pass"
                autocomplete="off"
              ></el-input>
              <img src="@/assets/images/suo.png" class="el-inputImg">
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                class="el-input"
                type="password"
                v-model="ruleForm2.checkPass"
                placeholder="请再次输入密码"
                autocomplete="off"
              ></el-input>
              <img src="@/assets/images/suo.png" class="el-inputImg">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForget('ruleForm2')">重置密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 忘记密码end-->
    <!--关联-->
    <div class="register_mask" v-show="associated">
      <div class="Forget_box">
        <div class="reg_heard" style="height:30px">
          <!--<div class="erweimalogin" @click="goCode">-->
          <!--<img src="@/assets/images/erweilogin.png" alt>-->
          <!--</div>-->
          <div class>
            <button type="button" @click="closelogin" class="reg_close">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </div>
        </div>
        <div class="reg_body">
          <div class="loginreg_txt">
            <div class="active" style="width:100%;border:none;">关联账号</div>
          </div>
          <div>
            <div class="associatedtitle">
              <img style="display:block" :src="wxInfo.headimg" alt>
            </div>
            <p class="associatedName">{{wxInfo.nickname}}</p>
            <p class="associatedName">您尚未关联活动平台账号</p>

            <div class="associatedNew" @click="associatedNew">关联新账号</div>

            <div class="associatedOld" @click="associatedOld">关联已有账号</div>
          </div>
        </div>
      </div>
    </div>
    <input id="inputtype" type="text"  :value="type" style="display: none;">
    <input id="mobilecode" type="text" :value="ruleForm2.mobile" style="display: none;">
    <input id="codesends" type="text" :value="codesends" style="display: none;">
    <div class="tncode"  style="display:none;"></div>
    <!--关联end-->
    <img :src="imgsrc" alt style="display:none;">
  </div>
</template>

<script>
import "@/wxLogin.js";
import '@/utils/tn_code/tn_code.js'
import { mapGetters } from "vuex";
import { getmessage, codelogin,tokenlogin } from "@/api/index";

export default {
  name: "Header",
  props: ["isLogin"],
  data() {
    //
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var checkMoblie = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于六位"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatecode = (rule, value, callback) => {
      if (value === "") {
        console.log(2);
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var checkgreement = (rule, value, callback) => {
      console.log("value", value);
      if (value.length === 0) {
        callback(new Error("请勾选协议"));
      } else {
        callback();
      }
    };
    return {
      type:'',
      valuemodel:'',
      timer: "",
      flag: "",
      getmessagetext: "获取验证码",
      getmessagetexted: 60,
      ids: "3",
      loginshow: false,
      codeshow: false,
      registerShow: false,
      forgetpaShow: false,
      user: {},
      ruleForm: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      ruleForm2: {
        pass: "",
        checkPass: "",
        mobile: "",
        checkcode: "",
        greement: []
      },
      rules2: {
        checkcode: [{ validator: validatecode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        mobile: [{ validator: checkMoblie, trigger: "blur" }],
        greement: [{ validator: checkgreement, trigger: "blur" }]
      },
      associated: false, //关联账号
      openid: '',
      wxInfo: "",
      imgsrc: "",
      codesends:"000"
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  watch: {
    codesends: {
      handler(newName, oldName) {
        console.log(newName,oldName,'obj.a changed');
      },
      immediate: true,
      deep: true
    },
    isLogin(val) {
      console.log(val);
      if (val != 1) {
        this.loginMask();
      }
    },
    registerShow: function(newV) {
      if (newV == false) {
        this.ruleForm2 = {
          pass: "",
          checkPass: "",
          mobile: "",
          checkcode: "",
          greement: []
        };
        this.flag = "";
        this.getmessagetexted = 60;
        clearInterval(this.timer);
      }
    },
    forgetpaShow: function(newV) {
      if (newV == false) {
        this.ruleForm2 = {
          pass: "",
          checkPass: "",
          mobile: "",
          checkcode: "",
          greement: []
        };
        this.flag = "";
        this.getmessagetexted = 60;
        clearInterval(this.timer);
      }
    }
  },
     created() {
//       var code = this.GetQueryString("code");
//       var sessionKey = this.GetQueryString("wd_token");
//      if (!!code) {
//        codelogin({ code: code }).then(res => {
//          if (res.data.user_id == 0) {
//            this.associated = true;
//            this.openid = res.data.openid;
//            this.wxInfo = res.data;
//          } else {
//            this.$store.commit("SET_USER", res.data);
//            this.$message({
// 	message: "登录成功!",
//              type: "success",
//              center: true
//            });
//             this.imgsrc = res.data.ssoData.sso_url;
//          this.$router.push("/");
//           window.history.replaceState(null,null,process.env.WEBURL)
//          }
//        });
//      }else{
//           if(!!sessionKey){
//          tokenlogin({ sessionKey: sessionKey }).then(res => {
//            if(res.code == 200){
//              this.$store.commit("SET_USER", res.data);
//               this.$router.push("/");
//              window.history.replaceState(null,null,process.env.WEBURL)
//            }
//        });
//      }
//      if(!localStorage.getItem("session") && this.GetQueryString("wd_token") == null){
// //         window.location.href="https://test-sso.vdongchina.com/index/platform";
//              window.location.href=`${process.env.CODE_SSO_BASEURL}index/platform`
//      }
//      };
     },
  mounted() {
    var session=localStorage.getItem("session")
    if (!session) {
      var obj = new WxLogin({
        id: "wxqr_login",
        appid: "wxe611ae156791a819",
        scope: "snsapi_login",
        redirect_uri: "http://hd.vdongchina.com/",
        state: "web_login",
        href: "https://test-onebox.molixyou.com/static/css/wxlogin.css"
      });
    }
    // if (!this.$store.state.user.info.sessionKey) {
    //   var obj = new WxLogin({
    //     id: "wxqr_login",
    //     appid: "wxe611ae156791a819",wxb7f30dadec2adb32
    //     scope: "snsapi_login",
    //     redirect_uri: "http://test-platform.molixyou.com",
    //     state: "web_login",
    //     href: "https://test-onebox.molixyou.com/static/css/wxlogin.css"
    //   });
    // }
  },
  methods: {
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    //      关联新账号
    associatedNew() {
      this.associated = false;
      this.registerShow = true;
    },
    //      关联已有账号
    associatedOld() {
      this.associated = false;
      this.loginshow = true;
    },
    // 弹出登录
    loginMask() {
       window._hmt.push(['_trackEvent', '登录', 'click', 'before', 88]);
      this.loginshow = true;
    },
    // // 弹出注册
    registerMask() {
       window._hmt.push(['_trackEvent', '注册', 'click', 'before', 88]);
      this.registerShow = true;
    },
    // 关闭登录
    closelogin() {
      this.loginshow = false;
      this.codeshow = false;
      this.registerShow = false;
      this.forgetpaShow = false;
      this.associated = false;
      this.ruleForm = {
        phone: "",
        password: ""
      };
      this.ruleForm2 = {
        pass: "",
        checkPass: "",
        mobile: "",
        checkcode: "",
        greement: []
      };
    },
    goRegster() {
      this.loginshow = false;
      this.registerShow = true;
    },
    goLoin() {
      this.loginshow = true;
      this.registerShow = false;
    },
    // 切换登录状态
    switchLogin() {
      this.loginshow = !this.loginshow;
      this.codeshow = !this.codeshow;
    },
    // 忘记密码
    forgetPass() {
      this.loginshow = !this.loginshow;
      this.forgetpaShow = true;
    },
    goCode() {
      this.codeshow = true;
      this.registerShow = false;
      this.forgetpaShow = false;
    },
    //    获取验证码
    getmessagebtn(type) {
      if(type==1){
        var data = {
          type: type,
        };
      }else{
        var data = {
          type: type,
        };
      }
      if (this.ruleForm2.mobile == "") {
        this.$message({
          type: "warning",
          message: "手机号不能为空!",
          center: true,
           duration:1500
        });
        return false;
      }
      this.type=type
     console.log( document.querySelector('#inputtype').value,"+++++++++")
      data.mobile = this.ruleForm2.mobile;

      getmessage(data)
        .then(res => {
          if (res.code == 200) {
            this.flag = 1;
            let num = 60;
            var _this = this;
            this.timer = setInterval(function() {
              num--;
              if (num > 0) {
                _this.getmessagetexted = num;
              } else {
                clearInterval(this.timer);
                _this.flag = "";
              }
            }, 1000);
          }else if(res.code==2533){
            console.log("页面里面")
            document.querySelector('.tncode').click()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //    登录请求
    loginBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            mobile: this.ruleForm.phone,
            password: this.ruleForm.password,
            openid: this.openid
          };
          this.$store
            .dispatch("getuser", data)
            .then(res => {
              console.log(res.code, "66");
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "登录成功!",
                  center: true,
                  duration:1500
                });
                window._hmt.push(['_trackEvent', '登录', 'click', 'success']);
                this.closelogin();
                this.imgsrc = res.data.ssoData.sso_url;
                  this.$router.push("/");
                window.history.replaceState(null,null,process.env.WEBURL)
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //    注册请求
    submitForm(formName) {
       window._hmt.push(['_trackEvent', '注册', 'click', 'submit']);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let datas = {
            password: this.ruleForm2.pass,
            com_password: this.ruleForm2.checkPass,
            mobile: this.ruleForm2.mobile,
            verify_code: this.ruleForm2.checkcode,
            openid: this.openid
          };
          this.$store
            .dispatch("getregister", datas)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data,
                   duration:1500
                });
                this.loginshow = true;
                this.registerShow = false;
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    handleCommand(command) {
      if(command=='t'){
            this.$store
        .dispatch("LogOut")
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        })
        .catch(err => {});
      }else if(command=='c'){
        this.$router.push("/rechargeDetails");
      }else if(command=='l'){
        this.$router.push("/mygift");
      }
    
    },
    //    扫码登录
    scanningLogin() {},
     aboutwd(){
      window._hmt.push(['_trackEvent', '关于微动', 'click','关于微动'])
    },
    //    重置密码
    submitForget(formName) {
      window._hmt.push(['_trackEvent', '忘记密码', 'click', 'Reset']);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let datas = {
            password: this.ruleForm2.pass,
            com_password: this.ruleForm2.checkPass,
            mobile: this.ruleForm2.mobile,
            verify_code: this.ruleForm2.checkcode,
            type: 2
          };
          this.$store
            .dispatch("getregister", datas)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data,
                   duration:1500
                });
                this.flag = "";
                this.getmessagetexted = 60;
                this.closelogin();
                this.loginshow = true;
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    reg_close() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
/*关联*/
.associatedtitle {
  padding: 10px 0;
}

.associatedtitle img {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.associatedName {
  font-size: 14px;
  color: #666;
  text-align: center;
  padding: 10px 0;
}
.associatedNew {
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #60a0ff;
  color: #fff;
  display: inline-block;
  border: 1px solid #60a0ff;
  border-radius: 6px;
  margin: 20px 0;
  cursor: pointer;
}
.associatedOld {
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #fff;
  color: #60a0ff;
  display: inline-block;
  border: 1px solid #60a0ff;
  border-radius: 6px;
  margin-bottom: 40px;
  cursor: pointer;
}

/*关联*/
#wxqr_login {
  margin-top: -20px;
}

.headerBox {
  width: 100%;
  background-color: #fff;
}

.header {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.herderTab {
  flex: 1;
  font-size: 14px;
}

.herderTab .myProject {
  margin-left: 80px;
  font-size:14px;
  color: #333;
}

.herderTab .tempLib {
  margin-left: 80px;
  color: #333;
  font-size: 14px;
}
.herderTab .tempLib:first-child{
  margin-left: 200px;
}
.header .herderTab .activess {
  color: #4b73ff;
}
.userheaderImg{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.headerImg {
  width: 123px;
  height: 40px;
}

.headerRight {
  display: flex;
  align-content: center;
}

.headerRightImg {
  width: 40px;
  height: 40px;
  background: darkcyan;
  margin-right: 20px;
}

.headerRightUl {
  padding: 0;
  margin: 0;
  display: flex;
  list-style-type: none;
  align-items: center;
  cursor: pointer;
}

.headerRightUl li {
  margin: 0 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
}

.logon_Bj {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

.logon {
  width: 280px;
  /* height: 400px; */
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -210px;
  margin-top: -186px;
  background: #fff;
  border-radius: 5px;
  z-index: 999;
  padding: 0 70px 30px 70px;
}

.logon .el-forgetBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}

.logon .el-forget {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(144, 147, 153, 1);
  cursor: pointer;
}

.logon_import_switch {
  position: absolute;
  left: -54px;
  top: -62px;
  width: 164px;
  height: 50px;
  cursor: pointer;
}

.logon_import_nav {
  margin-top: 76px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.logon_import_nav_left {
  width: 80px;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-bottom: 10px;
  border-bottom: 2px solid #4b73ff;
  cursor: pointer;
}

.logon_import {
  position: relative;
}

.logon_import_nav_right {
  width: 80px;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(144, 147, 153, 1);
  cursor: pointer;
}

.logon_import_shut {
  width: 16px;
  height: 16px;
  position: absolute;
  right: -50px;
  top: -58px;
  cursor: pointer;
}

/*二维码*/
.logon_QR {
  width: 420px;
  height: 373px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -210px;
  margin-top: -186px;
  background: #fff;
  border-radius: 5px;
  z-index: 999;
}

.logon_QR_box {
  position: relative;
}

.logon_QR_box_text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logon_QR_box_text img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.logon_QR_box_text p {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.logon_QR_box_shut {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 20px;
  top: 18px;
  cursor: pointer;
}

.logon_QR_box_switch {
  cursor: pointer;
  width: 164px;
  height: 50px;
  margin: 16px 0 30px 16px;
}

.logon_QR_box_center {
  width: 154px;
  height: 154px;
  background: tan;
  margin: 0 auto 40px auto;
  display: block;
}

.register_mask {
  position: fixed;
  z-index: 1029;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.reg_box {
  width: 420px;
  height: 486px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  margin-left: -210px;
  top: 50%;
  margin-top: -243px;
  padding: 16px 20px 0 16px;
}

.closeImg {
  width: 16px;
  height: 16px;
}

.reg_heard {
  width: 100%;
  height: 50px;
  position: relative;
}

.reg_close {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
}

.erweimalogin {
  cursor: pointer;
  width: 170px;
  height: 50px;
}

.erweimalogin > img {
  width: 170px;
  height: 50px;
}

.reg_body {
  padding: 0 50px 0 54px;
}

.loginreg_txt {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.loginreg_txt > div {
  font-size: 20px;
  font-weight: 400;
  color: #909399;
  width: 80px;
  line-height: 48px;
  text-align: center;
  font-weight: 400;
}

.loginreg_txt .active {
  border-bottom: 2px solid #4b73ff;
  color: #333;
}

.reg_body .el-input {
  position: relative;
}

.reg_body .el-inputImg {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -10px;
}

.reg_body .el-button--primary {
  width: 100%;
  background: #7d9bff;
}

.codeIpt {
  width: 166px;
}

.reg-ruleForm {
  margin-top: 20px;
}

.reg_body .codeBtn {
  width: 84px;
  padding: 12px 0;
  float: right;
}

.reg_body .codeBtns {
  display: none;
  width: 120px;
  padding: 12px 0;
  float: right;
  border: none;
  background: #999;
  color: #fff;
}

.greement {
  text-align: center;
  font-size: 12px;
}

.greement .firstment {
  margin-left: 5px;
}

.greement .mentName {
  color: #7d9bff;
}

.Forget_box {
  width: 420px;
  /* height: 398px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  margin-left: -210px;
  top: 50%;
  margin-top: -199px;
  padding: 16px 20px 0 16px;
}

/*默认头像*/
@font-face {
  font-family: "iconfont";
  src: url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAARgAAsAAAAABqgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8pUghY21hcAAAAYAAAABLAAABcOdXtjdnbHlmAAABzAAAAKgAAACsE8Ji8mhlYWQAAAJ0AAAALwAAADYTj+WbaGhlYQAAAqQAAAAcAAAAJAfeA4NobXR4AAACwAAAAAgAAAAICAAAAGxvY2EAAALIAAAABgAAAAYAVgAAbWF4cAAAAtAAAAAgAAAAIAEQAD9uYW1lAAAC8AAAAUUAAAJtPlT+fXBvc3QAAAQ4AAAAJgAAADe8XkRXeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGBye6T/TZ27438AQw9zA0AAUZgTJAQDkfQxBeJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISf6b//z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQCb2AolAHicY2BhYPh/mHkvsy0DP4M8gyGDEQMDIx8jux6juh2juZmRuByjuCoQixmZA/lAUaCcMIylpAbiAmUNmfey/t679zcL06w6nzU+dbOZ/s5gNNZSDlLSMWFkSvD0SGRam7TMiiPJV9Yj0FPWJ5nPak0GY/2e36ysv/dMuG0sL298e0KcZZSEqLBEtFVgLhNTbuA/ZsZAd4sICSlZORmxQBO/KEYA4rUpDXicY2BkYGAAYt+da0zj+W2+MnCzMIDADYuA8wj6/2EWBmZbIJeDgQkkCgAh8AoGAHicY2BkYGBu+N/AEMPCAAJAkpEBFTABAEcIAmsEAAAABAAAAAAAAAAAVgAAAAEAAAACADMABAAAAAAAAgAAAAoACgAAAP8AAAAAAAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICJkYmRmYE3N78oNa8kv7QiMzEvnYEBADZNBbMAAA==")
    format("woff");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 35px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #999;
}

.icon-morentouxiang:before {
  content: "\e62f";
}
</style>
<style type="text/css">
.headerBox .el-input__inner {
  padding: 0 15px 0 36px;
}

.headerBox .el-input {
  position: relative;
}

.headerBox .el-inputImg {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -10px;
}

.headerBox .el-button--primary {
  width: 100%;
  background: #7d9bff;
}

.reg_body .el-input__inner {
  padding: 0 15px 0 36px;
}

.greement .el-form-item__content {
  line-height: 25px;
}

.codeIpt .el-input__inner {
  padding-left: 15px;
}
</style>
