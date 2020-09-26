<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
        <!--<li v-for="item in cartList">{{item}}</li>-->
        <CartListItem v-for="(item,index) in cartList"
                       :key="index" :item-info="item"></CartListItem>
        <!--在这里，遍历cartList数组中所有商品，并把遍历的商品item传到该组件中，父传子-->
        <!--商品数据传到子组件后，在子组件中进行布局处理-->

    </Scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  import CartListItem from "./CartListItem"
  import { mapGetters } from "vuex"

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(["cartList"])
      // 获取vuex中cartList数组(则获取到了)
    },
    activated() {
      this.$refs.scroll.refresh()
      //进行scroll进行刷新，因为在加入商品数据后高度会改变，所以要进行刷新一下，以防不能滚动。
    }
  }
</script>

<style scoped>
  .cart-list{
    /*滚动给父元素一个高度,则可以确定滚动的高度，且不受鼠标滚轮的影响*/
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
