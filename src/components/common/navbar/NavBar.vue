<template>
  <div class="nav-bar">
    <!--将插槽放在div中，则直接给div设置样式，就可以对该插槽起效果-->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
   .nav-bar{
     /*这里写所有公共的东西*/
     display: flex;
     height: 44px;
     line-height: 44px;
     text-align: center;
     box-shadow: 0 1px 1px rgba(100,100,100,.1);
     /*设置一条阴影*/
   }
   .left, .right{
    width: 60px;
     /*background: red;*/
   }
   .center{
     flex: 1;
     /*background: blue;*/
   }


</style>
