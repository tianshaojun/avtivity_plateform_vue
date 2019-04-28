<template>
  <div>
    <div class="title">{{titleName}}</div>
    <div class="addcont">
      <el-form
        class="form"
        :model="goodData"
        :rules="rules"
        ref="goodData"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="商品名称" prop="title" class="inputs">
          <el-input v-model="goodData.title" placeholder="请输入商品名称"></el-input>
          <span class="input_mes">(*必填)</span>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_img">
          <el-upload
            class="avatar-uploader"
            :action="upUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goodData.goods_img" :src="goodData.goods_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="input_mes">(*必填)</span>
        </el-form-item>
        <el-form-item label="消耗金币" prop="gold" class="inputs">
          <el-input v-model="goodData.gold" placeholder="请输入消耗金币" type="number"></el-input>
          <span class="input_mes">(*必填)</span>
        </el-form-item>
        <el-form-item label="兑换金额" prop="ex_money" class="inputs">
          <el-input v-model="goodData.ex_money" placeholder="请输入兑换金额" type="number"></el-input>
          <span class="input_mes">(*必填)</span>
        </el-form-item>
        <el-form-item label="商品排序" class="inputs">
          <el-input v-model="goodData.list_order" placeholder="请输入排序（数字大小排序）"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="goodData.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form_item_btn">
          <el-button type="primary" :disabled="disdata" @click="goodsAdd('goodData')" class="btn btn_prev">提交</el-button>
          <el-button @click="backGoog">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { goodsAdd, goodsUpd, goodsInfo } from "@/api/index";
export default {
  name: "goodsAdd",
  data() {
    return {
      disdata:false,
      upUrl:axios.defaults.baseURL+'index/uploadimg',
      titleName: "新增商品",
      goodData: {
        title: "",
        goods_img: "",
        gold: "",
        ex_money: "",
        list_order: "",
        status: "1"
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        goods_img: [
          { required: true, message: "请上传商品图片", trigger: "blur" }
        ],
        gold: [{ required: true, message: "请输入消耗金币", trigger: "blur" }],
        ex_money: [
          { required: true, message: "请输入兑换金额", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (!!this.$route.query.upid) {
      this.titleName = "商品修改";
      this.goodsInfo();
    }
  },
  methods: {
    goodsAdd(formname) {
      var _this = this;
      var data = _this.goodData;
      data.box_id = localStorage.getItem("box_id");
       data.tmp_id = localStorage.getItem("tmp_id");
      _this.$refs[formname].validate(valid => {
        if (valid) {
          _this.disdata=true
          if (!!_this.$route.query.upid) {
            data.goods_id = _this.$route.query.upid;
             goodsUpd(data).then(res => {
              if (res.code == 200) {
                _this.$message({
                  message: "修改商品成功",
                  type: "success"
                });
                setTimeout(function() {
                  _this.$router.push("/goods");
                }, 3000);
              }else{
                _this.disdata=false
              }
            }).catch(err=>{
               _this.disdata=false
             });
          } else {
            goodsAdd(data).then(res => {
              if (res.code == 200) {
                _this.$message({
                  message: "新增商品成功",
                  type: "success"
                });
                setTimeout(function() {
                  _this.$router.push("/goods");
                }, 3000);
              }else{
                _this.disdata=false
              }
            }).catch(err=>{
              _this.disdata=false
            });
          }
        }
      });
    },
    //修改
    goodsInfo() {
      var data = {};
      data.box_id = localStorage.getItem("box_id");
      data.goods_id = this.$route.query.upid;
       data.tmp_id = localStorage.getItem("tmp_id");
      goodsInfo(data).then(res => {
        this.goodData = res.data;
      }).catch(err=>{
        console.log(err)
      });
    },
    backGoog() {
      this.$router.push("/goods");
    },
    handleAvatarSuccess(res, file) {
      console.log(res,"6666666666");
      this.goodData.goods_img = res.data.path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.addcont {
  padding-top: 20px;
  padding-left: 40px;
}
.input_mes {
  margin-left: 5px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #5c91ff;
}
</style>
<style>
.addcont .el-input {
  width: 230px;
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
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "";
  color: #fff;
  margin-right: 0px;
}
</style>
