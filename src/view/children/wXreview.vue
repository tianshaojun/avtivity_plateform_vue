<template>
  <div class="tml">
    <div class="title">版本管理</div>
    <div class="content">
      <div class="relation" v-if="loadMsg.auth_status == 0">
        <p class="relaTitle">授权小程序后，即可发布小程序</p>
        <p class="relaExplain">1、微信官方规定：用户必须自己进行小程序注册。然后才可以将小程序授权给任意第三方进行设计和代码管理。</p>
        <p class="relaExplain">2、微信官方规定：小程序个人开放的服务类目是有严格规定的，内容不在服务类目中的，是审核不通过的。</p>
        <div class="btnBox">
          <a @click="Scanauth" class="auther">我已有小程序，直接授权</a>
          <a href="https://mp.weixin.qq.com" class="registWx" target="_blank">注册小程序账号</a>
        </div>
      </div>
      <div class="onlineEdition edborder">
        <p class="edTitle">线上版本</p>
        <div class="noEdi" v-if="loadMsg.auth_status == 0 || release.audit_status !=5 ">
          <img src="@/assets/images/banben.png" alt>
          <p>暂无版本发布上线</p>
        </div>
        <div class="yesEdi" v-if="loadMsg.auth_status == 1 && release.audit_status==5">
          <div>
            <label class="labelTex">版本号</label>
            <span v-if="release">{{release.commit_id}}</span>
            <label class="labelTex">发布时间</label>
            <span v-if="release">{{release.release_time}}</span>
          </div>
        </div>
      </div>
      <div class="reviewEdition edborder">
        <p class="edTitle">审核版本
          <span v-if="loadMsg.auth_status == 1 && newInfo.audit_status==2 " class="shtype">审核中</span>
          <span v-if="loadMsg.auth_status == 1 && newInfo.audit_status==4" class="shtype">审核通过</span>
           <span v-if="loadMsg.auth_status == 1 && newInfo.audit_status==3" class="shtype">审核失败</span>
        </p>
        <div class="noEdi" v-if="loadMsg.auth_status == 0 || newInfo.length==0">
          <img src="@/assets/images/banben.png" alt>
          <p>暂无版本发布审核</p>
        </div>
        <div
          class="yesEdi"
          v-if="loadMsg.auth_status == 1 && newInfo.length !=0">
          <div>
            <label class="labelTex">版本号</label>
            <span v-if="newInfo">{{newInfo.commit_id}}</span>
          </div>
          <div class="tihsi">
            <p>
              <label class="labelTex">审核时间</label>
              <span v-if="newInfo" >{{newInfo.submit_time}}</span>
            </p>
            <p style="margin-top:10px">
              <label class="labelTex">说明</label>
              <span
                style="font-size:14px;color:#A1A1A1;"
              >微信审核中，请耐心等待。一般审核周期为1-7个工作日，审核成功后即可在审核页面中，切换假页面</span>
            </p>
          </div>
          <div class="bBbtnBox">
            <el-button
              type="info"
              @click="goonline"
              v-if="loadMsg.auth_status == 1 && newInfo.audit_status!= 4"
              :disabled="true"
            >发布</el-button>
            <el-button
              type="primary"
              @click="goonline"
              v-else
              :disabled="false"
            >发布</el-button>
             <el-button
              type="primary"
              @click="revoke"
              v-if="loadMsg.auth_status == 1 && newInfo.audit_status!= 4"
            >撤销审核</el-button>
          </div>
        </div>
      </div>
      <div class="devEdition edborder">
        <p class="edTitle">开发版本</p>
        <div class="noEdi" v-if="loadMsg.auth_status == 0 && !develop">
          <img src="@/assets/images/banben.png" alt>
          <p>暂无开发版本</p>
        </div>
        <div class="yesEdi" v-if="loadMsg.auth_status != 0 && !!develop">
          <div>
            <label class="labelTex">版本号</label>
            <span  v-if="develop" >{{develop.commit_id}}</span>
            
          </div>
          <div class="tihsi">
            <p>
              <label class="labelTex">发布时间</label>
            <span  v-if="develop" >{{develop.create_time}}</span>
            </p>
            <p style="margin-top:10px">
              <label class="labelTex">说明</label>
              <span
                style="font-size:14px;color:#A1A1A1;"
              >为了快速通过微信审核，审核页面和正式不同，请周知！</span>
            </p>
          </div>
          <div class="bBbtnBox">
            <el-button
              v-if="loadMsg.jump_status==1"
              type="primary"
              :disabled="loadMsg.auth_status == 1 && develop.audit_status ==2"
              @click="sendReview"
            >提交审核</el-button>
            <el-button
              v-if="loadMsg.jump_status==2"
              type="primary"
              @click="uploadcode"
            >更新代码</el-button>
            <el-button @click="handlePicPreview()">预览</el-button>
            <el-button @click="designM(loadMsg.web_url)">更改样式</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogImage.isVisible">
      <p style="text-align:center">扫一扫体验小程序</p>
      <img style="width:200px;height:200px;display:block" :src="dialogImage.showUrl">
    </el-dialog>
  </div>
</template>

<script>
import { wxopenload, wxScanauth, uploadcode, submitaudit ,goonline,revoke} from "@/api/index";
export default {
  name: "wXreview",
  data() {
    return {
      dialogImage: {
        //显示图片弹框
        showUrl: "",
        isVisible: false
      },
      loadMsg: "",
      release: "",
      newInfo: "",
      develop:''
    };
  },
  created() {
    this.load();

    // this.uploadcode()
  },
  methods: {
    load() {
      var data = {};
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      wxopenload(data)
        .then(res => {
          if (res.code == 200) {
            this.loadMsg = res.data;
            this.newInfo = res.data.newInfo;
            this.release = res.data.release;
            this.develop = res.data.develop
            if (res.data.develop == '') {
              this.uploadcode();
            }
          } else if (res.code == 2000) {
              window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlePicPreview() {
      this.dialogImage.showUrl = this.loadMsg.develop.qrcode_url;
      this.dialogImage.isVisible = true;
    },
    designM(path) {
      window._hmt.push(['_trackEvent', '版本管理', 'click','更改样式']);
      this.$router.push({
        path:path,
        query: { box_id: localStorage.getItem("box_id"),tmp_id: localStorage.getItem("tmp_id")}
      });
    },
    //去授权
    Scanauth() {
       window._hmt.push(['_trackEvent', '版本管理', 'click','去授权']);
      window.location.href =process.env.BASEURL+"open/Scanauth?box_id=" +
        localStorage.getItem("box_id")+'&tmp_id='+localStorage.getItem("tmp_id");
    },
    //发布上线
    goonline(){
      window._hmt.push(['_trackEvent', '版本管理', 'click','发布上线']);
      var data = {};
      //edition_id
      data.edition_id = this.loadMsg.newInfo.id;
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      goonline(data)
        .then(res => {
          if(res.code ==200){
           window.location.reload();
         }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //撤销审核revoke
      revoke(){
         window._hmt.push(['_trackEvent', '版本管理', 'click','撤销审核']);
      var data = {};
      //edition_id
      data.edition_id = this.loadMsg.newInfo.id;
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
       this.$confirm('是否撤销审核，每天最多撤销一次！', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
      revoke(data)
        .then(res => {
          if(res.code ==200){
           window.location.reload();
         }
        })
        .catch(err => {
          console.log(err);
        });
      })
    },
    //提交审核
    sendReview() {
      window._hmt.push(['_trackEvent', '版本管理', 'click','提交审核']);
      var data = {};
      //edition_id
      data.edition_id = this.loadMsg.develop.id;
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      submitaudit(data)
        .then(res => {
          if(res.code ==200){
           window.location.reload();
         }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上传代码
    uploadcode() {
      window._hmt.push(['_trackEvent', '版本管理', 'click','上传代码']);
      var data = {};
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      uploadcode(data)
        .then(res => {
         if(res.code ==200){
           window.location.reload();
         }

        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.title {
  padding-left: 40px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
}
.content {
  padding: 30px 150px 100px 40px;
  min-width: 1300px;
  box-sizing: border-box;
}
.relation {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(219, 223, 230, 1);
}
.relaTitle {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.relaExplain {
  color: #a1a1a1;
  font-size: 16px;
  margin-left: 200px;
}
.btnBox {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
}
.auther {
  padding: 0 12px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  background: rgba(125, 155, 255, 1);
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.registWx {
  display: inline-block;
  padding: 0 12px;
  height: 36px;
  line-height: 36px;
  border: 1px solid rgba(219, 223, 230, 1);
  border-radius: 3px;
  color: #606266;
  font-size: 14px;
  margin-left: 70px;
}
.edborder {
  box-sizing: border-box;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(219, 223, 230, 1);
  padding: 20px 60px 20px 20px;
  margin-top: 50px;
  padding-right: 50px;
}
.edborder .edTitle {
  font-size: 16px;
  color: #333;
}
.noEdi {
  text-align: center;
}
.noEdi img {
  width: 56px;
  height: 46px;
  display: inline-block;
}
.noEdi p {
  color: #a1a1a1;
  font-size: 12px;
  margin-top: 15px;
}
.yesEdi {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.yesEdi .labelTex {
  width: 80px;
  color: #a1a1a1;
  display: inline-block;
}
.yesEdi span {
  margin-right: 50px;
}
.yesEdi .bBbtnBox {
  float: 1;
}
.yesEdi {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tihsi {
  flex: 1;
}
.shtype {
  color: #1aad19;
  border: 1px solid #1aad19;
  font-size: 12px;
  margin-left: 5px;
  border-radius: 2px;
}
.el-button--primary:hover{
      color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
}
</style>
<style>
.tml .el-dialog {
  width: 242px;
  margin-top: 35vh !important;
}
</style>

