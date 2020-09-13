<template>
  <div class="wrapper">
  <ul>
    <ul class="content">
      <button v-on:click="btnClick">按钮</button>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表100</li>
    </ul>
  </ul>
  </div>
</template>
<!--
0.引入
1.设置固定高度、背景
2.new一个对象，设置对象
3.具体的功能操作
-->
<script>
  import BScroll from "better-scroll"
  //引入better-scroll框架

  export default {
    name: "Category",
    created() {
      //不能在这里面拿数据
      // new BScroll(".wrapper",{
      // })
    },
    mounted() {
      //绑定.wrapper后，即给它里面的内容设置滚动
      this.scroll = new BScroll((".wrapper"),{
          probeType:3,      //来设置获取滚动位置
          pullUpLoad:true   //来设置上拉加载更多
      })
      //获取滚动位置
      this.scroll.on("scroll",(position)=>{
        // console.log(position);
      })
      //设置上拉加载更多
      this.scroll.on("pullingUp",()=>{
        console.log("上拉加载更多");
      })
    },
    methods:{
      btnClick(){
        console.log("btnClick");
      }
    }

  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background: skyblue;
    /*overflow: hidden;*/
  }

</style>

