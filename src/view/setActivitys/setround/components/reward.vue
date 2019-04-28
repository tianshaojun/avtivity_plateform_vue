<template>
  <div>
    <el-form
      class="form"
      :model="formreward"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="198px"
    >
      <el-form-item label="奖励名称" class="prize_name" prop="prize_name">
        <el-input v-model="formreward.prize_name" placeholder="设置奖励名称"></el-input>
        <span class="input_mes">(*必填)</span>
      </el-form-item>
      <el-form-item label="奖励来源">
        <el-radio-group v-model="formreward.goods_type">
          <el-radio label="1">礼品商城</el-radio>
          <el-radio label="2">礼橙积分</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="formreward.goods_type==1">

        <el-select v-model="formreward.goods_id" @change="changesele" placeholder="选择礼品商城奖品">
          <el-option
            v-for="item in goodslist"
            :label="item.goods_name+'(库存'+item.number+')'"
            :value="item.goods_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" v-if="formreward.goods_type==2" >
        <el-input v-model="formreward.prize_integral" placeholder="设置礼橙积分"></el-input>
      </el-form-item>
      <el-form-item label="奖励图片" prop="prize_img" class="inputs" ref="formimgreward">
        <el-upload
          class="avatar-uploader"
          :action="upUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess6"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formreward.prize_img" :src="formreward.prize_img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>
        <span class="input_mes">(*必填)</span>
      </el-form-item>
      <el-form-item label="奖励数量" class="inputs" prop="prize_num">
        <el-input-number v-model="formreward.prize_num" placeholder="奖励数量"  @change="handleChange" controls-position="right" :min="0" :max="maxnum"></el-input-number>
        <span class="input_mes">(*必填)</span>
      </el-form-item>
      <!-- <el-form-item label="兑奖方式">
        <el-radio-group v-model="formreward.mall_type">
          <el-radio label="1">商城兑奖</el-radio>
          <el-radio label="2">客服/公众号二维码</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="中奖率" class="inputs" prop="prize_chance">
        <el-input v-model='formreward.prize_chance' placeholder="中奖率（百分比）" type="number"></el-input>
        <span class="input_mes">(*必填)</span>
      </el-form-item>
      <el-form-item label="兑奖固定时长" prop="prize_day">
        <div class="drawoneday">领取后当日生效,有效天数 <input type="number" v-model="formreward.prize_day" min="0"> 天 </div>
        <span class="input_mes">(*必填)</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'reward',
    props: ['formreward',"goodslist"],
    data() {
      return {
        maxnum:10,
        upUrl: axios.defaults.baseURL + "index/uploadimg",
        rules: {
          prize_name: [
            {required: true, message: "请填写奖励名称", trigger: "blur"}
          ],
          prize_img: [
            {required: true, message: "请上传奖励图片", trigger: "blur"}
          ],
          prize_num: [
            {required: true, message: "请填写奖励数量", trigger: "blur"}
          ],
          prize_chance: [
            {required: true, message: "请填写中奖率", trigger: "blur"}
          ],
          prize_day: [
            {required: true, message: "请填写兑奖时长 ", trigger: "blur"}
          ]
        }
      }
    },
    watch: {
      formreward: {
        deep: true,
        handler(val) {
          this.formreward = val;
           this.goodslist.forEach((item, index, array) => {
          if(item.goods_id==val.goods_id){
            this.maxnum = parseInt(this.goodslist[index].number);
          }
        })
        }
      },
      goodslist: {
        deep: true,
        handler(val) {
           val.forEach((item, index, array) => {
          if(item.goods_id==this.formreward.goods_id){
            this.maxnum = parseInt(this.goodslist[index].number);
          }
        })
        }
      },
    },
    mounted() {
        console.log(this.formreward, "formreward组件内")
        console.log(this.goodslist, "formreward组件555555内")
    },
    methods: {
      changesele(v){
        this.formreward.prize_num=0;
        this.goodslist.forEach((item, index, array) => {
          if(item.goods_id==v){
            this.maxnum = parseInt(this.goodslist[index].number);
          }
        })
        console.log(v,'111111111')
      },
      handleChange(val){
        console.log(val,'00000000000')
      },
      changeTabPage(type) {
        var index = 0
        this.$refs[type].validate(valid => {
          if (valid) {
            index = 0
          } else {
            index = 1
          }
        })
        return index
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
      handlePicPreview(file) {
        this.dialogImage.showUrl = file;
        this.dialogImage.isVisible = true;
      },
      handleAvatarSuccess6(res, file) {
        if (res.code == 200) {
          this.formreward.prize_img = res.data.path;
          if (this.formreward.prize_img) {
            this.$refs.formimgreward.clearValidate(["prize_img"]);
          }
        }
      },
    }
  }
</script>

<style scoped>
  .drawoneday {
    color: #606266;
    font-size: 14px;
  }

  .drawoneday input {
    width: 50px;
    text-align: center;
  }

  .input_mes {
    margin-left: 5px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #5c91ff;
  }
  .el-dropdown{
    border: 1px solid #ccc;
    padding: 5px 20px;
    border-radius: 3px;
  }

</style>
