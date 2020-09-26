import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"
// import {promised} from "q";

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) =>{   //这里加一个promise对象，可以确保做完后进行其他事情
      // let oldProduct = null;
      // //对购物车里面的内容遍历，看当前加入的商品书否已经存在购物车中
      // for (let item of state.cartList){
      //   if (item.iid === payload.idd){
      //     oldProduct = item;
      //   }
      // }
      //换种写法为：把里面相同的商品给到oldProduct
      let oldProduct=context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct
      //若当前加入的商品书已经存在购物车中，则让它数量加1，否则将该商品加入购物车。
      if(oldProduct){
        // oldProduct.count +=1
        context.commit(ADD_COUNTER,oldProduct);   //将操作放在mutations中做
        resolve("当前的商品数量加+1")
      }else {
        payload.count=1
        // context.state.cartList.push(payload)     //将数据加到数组cartList中，添加新商品
        context.commit(ADD_TO_CART,payload)    //将操作放在mutations中做
        resolve("添加了新的商品")
      }
      //promise中，根据不同的情况执行resolve，且resolve里面传不同的值。
    })
  }
}

//将actions里面的内容单独放出来。

