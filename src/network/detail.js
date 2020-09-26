import {request} from "./request"

//详细页的网络请求
//根据参数iid，来传值进行请求。
//获取的是http://152.136.185.210:8000/api/z8/detail?iid=xxx 的数据。
export function getDetail(iid) {
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

//获取推荐商品的数据。 (推荐商品的数据单独放在了一个url中)
export function getRecommend() {
   return request({
     url:"/recommend"
   })
}


//在该类型中，根据itemInfo, columns, services来找到里面的具体数据
//则他的实际即可放入多种数据，然后一起展示数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    // 保存一个价格，最底的价格
  }
}

//创建店铺信息的对象
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

