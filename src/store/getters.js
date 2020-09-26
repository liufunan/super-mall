export default {
  cartLength(state){
    return state.cartList.length;
  //获取vuex中cartList数组的长度。 (cartList数组用于存放商品)
  },
  cartList(state){
    return state.cartList
  // 获取vuex中cartList数组
  }
}
