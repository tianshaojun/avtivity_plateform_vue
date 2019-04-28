<template>
  <div v-loading="loading" mode="out-in" >
    <div class="title">{{content.class_name}}</div>
    <div class="content">
      <p class="littitle">{{content.title}}</p>
      <div class="cont" v-html="content.content"></div>
    </div>
  </div>
</template>

<script>
import { helpdetail } from "@/api/index";
export default {
  name: "helpviews",
  data() {
    return {
      content:[],
      loading:false
    };
  },
  watch: {
    $route(to, from) {
      this.loading = true;
        this.load(to.query.id)
    }
  },
  created() {
    this.loading = true;
   this.load()
  },
  methods: {
    load(id) {
      var data = {id:id}
      helpdetail(data)
        .then(res => {
          this.content = res.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
  padding: 30px 350px 0 50px;
}
.littitle{
  font-size: 16px;
  font-weight: bold;
}
.cont{
  padding:20px 0 50px 0;
}

</style>
<style>
.cont img{
  width: auto;
  height: auto;
      display: inline-block;
}
</style>


