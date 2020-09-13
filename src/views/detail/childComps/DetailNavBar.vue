<template>
  <div id="detail">
    <!--导航栏-->
    <NavBar>
      <div slot="left" class="back" @click="backClick">
         <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
         <div v-for="(item,index) in titles" class="title-item"
              :class="{active:index === currentIndex}"
              @click="titleClick(index)">
             {{item}}
         </div>
      </div>
    </NavBar>

  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        titles:["商品","参数","评论","推荐"],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
         //点击让字体变红色
         this.currentIndex = index;
         //把点击的titleClick事件和当前点击的index传给父组件
         //去完成联动绑定
         this.$emit("titleClick", index)


      },
      backClick(){
        this.$router.back();
        //路由中调用back()，进行返回
      }

    }
  }
</script>

<style scoped>
  .title{
      display: flex;
      font-size: 13px;
    }
  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }
  .back img{
    margin-top: 12px;
  }
</style>
