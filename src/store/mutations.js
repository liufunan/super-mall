import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"

export default {
  //mutations的目的是修改state中状态。
  //mutations中的每个方法尽可能完成的事件比较单一一点。
  //所以可以把该内容放在actions里面

  //mutations可以进行做一个跟踪，所以在这里进行数量增加和整个加入购物车的操作。
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    //将这个作为单选框值,放在模型中。
    state.cartList.push(payload)
  }
}
//将mutations中的内容单独放出来写，

