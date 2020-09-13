import {request} from "./request";

//getHomeMultidata:获取首页的多个数据
export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

//用封装的axios来获取对应的数据。
//getHomeGoods：获取流行、新款、精选 几种类别的商品数据。
//传参为：商品的类型，和哪一页的商品。
export function getHomeGoods(type,page) {
    return request({
       url: "home/data",        //所有类型的都在里面
       params:{       //根据传进来的后面参数，来获取对应类型的商品
         type,
         page
       }
    })
}
