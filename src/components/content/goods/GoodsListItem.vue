<template>
  <div class="goods-item" @click="itemClick">
    <!--父组件中遍历，遍历一个商品信息该组件中就拿到一个商品信息，
        然后获取一个商品的信息。这样就可以一次拿到所有商品的所有信息-->

    <img :src="showImage" alt="" @load="imageLoad">
    <!--获取每个对象中的图片-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <!--获取每个对象中的文字描述-->
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
      <!--对价格和收藏进行样式的设置-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      //拿到父组件遍历的一个个小的item
      //每个小item是一个对象，每个对象中包含了一个商品的所有数据
      goodsItem:{
        type:Object,
        default(){
          return []
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      //若有goodsItem.image则取goodsItem.image，若没有则取goodsItem.show.img
      // 多个地方引用，所以要进行判断选择
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit("itemImageLoad")
        //不同的页面中可能都要监听
        // if(this.$route.path.indexOf("/home")){
        //   this.$bus.$emit("homeItemImageLoad")
        // }else if(this.$route.path.indexOf("/detail")){
        //   this.$bus.$emit("detailItemImageLoad")
        // }
      },
      itemClick(){
        this.$router.push("/detail/" + this.goodsItem.iid);
        // console.log(this.goodsItem.iid);
        //触发事件时，给url一个地址，并且传递当前商品的iid  (goodsItem为一个个的商品)
      }
    }

  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
