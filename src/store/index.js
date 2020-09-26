import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
//将mutations、actions都抽取在一个单独文件中，然后引入使用
import getters from "./getters"


//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const state ={
   cartList:[]
   //将商品内容放在数组中
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//3.挂载在Vue实例上
export default store
