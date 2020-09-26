<template>
  <div class="check-button" :class="{check: isChecked}">
     <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      //isChecked为true时为选中，check的样式起效果。默认为不选中；
      //isChecked为父组件传过来的值，每次点击时isChecked值取反；
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check{
    /*选中时加上去的效果*/
    border-color: red;
    background-color: red;
  }

</style>
