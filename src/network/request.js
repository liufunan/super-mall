//封装axios的网络请求。
//不用export default导出，直接export +内容。,则导入的时候要用{ }来导入

import axios from  "axios"

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // baseURL:"http://123.207.32.32:8000",      //接口修改，为如下：
    baseURL:"最新数据接口,添加微信coderwhy003获取",
    timeout:5000
  })

  //2.axios的请求拦截器
  //拦截instance的请求，拦截的是该请求的config配置
  //拦截成功，即请求发送出去拦截了； 拦截失败，即请求都没发出去没能拦截(断线了)
  instance.interceptors.request.use(config =>{
    return config
    //拦截后，要再给他返回，不然请求拦截了，服务器不会响应，拿不到结果。
  },err => {
    // console.log(err);
  })

  //3.axios的响应拦截器
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data    //只需要返回拦截内容中的data就可以了。
  },err=>{
    console.log(err);
  })
  // 返回请求之后的结果，promise
  return instance (config)

//instance用的是config，并将instance实例返回，axios自身会返回promise，所以那边只需要调用.then()
//这里是借助这边 将请求和拦截在这边来完成了，
}


