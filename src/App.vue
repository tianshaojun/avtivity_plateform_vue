<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  body,html{
    background:rgba(248,248,248,1);
    height: 100%;
  }
  #app{
     height: 100%;
  }
  a{
    text-decoration:none;
  }
  *{margin:0;
  padding:0;}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .activess{
    color:#4B73FF;
  }
  .el-message{
    min-width:120px;
  }
</style>
