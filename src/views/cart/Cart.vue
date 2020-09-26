<template>
  <div class="cart">
    <!--导航-->
     <NavBar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
        <!--替换 slot="center" 的插槽   ,cartLength为数组中商品的长度-->
     </NavBar>

    <!--商品列表-->
     <CartList></CartList>

    <!--底部汇总-->
    <CartBottomBar></CartBottomBar>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import { mapGetters } from "vuex"


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //mapGetters可以将计算属性中的内容放在getters文件中，然后进行指定后，可以在该页面直接使用。
      //mapGetters将store中的getter映射到局部计算属性中
      //mapGetters语法为：
      ...mapGetters(["cartLength"])
      //获取vuex中cartList数组的长度。

    }

  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
   .nav-bar{
     background-color: var(--color-tint);
     color: white;
     /*font-weight:700;*/
   }
</style>
