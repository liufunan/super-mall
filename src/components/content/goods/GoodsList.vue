<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods"  :goodsItem="item"></GoodsListItem>
    <!--item遍历父类中拿到的数组，然后将item依次传递给子组件GoodsListItem-->
    <!--item是数组中的对象，该对象中包含一个商品的所有信息-->
    <!--:goodsItem="item"是将当前item对象传递给子组件-->
    <!--{{goods}}-->
    <!--goods为所有的数据-->
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"

  export default {
    name: "GoodsList",
    props:{
      //拿到父类goods['pop'].list的数据，为一个数组，里面有30个对象
      //拿到对应类型showGoods的数据。
      goods:{
       type:Array,
       default(){
         return []
        }
      }
    },
    //将单个的商品放在该小组件中展示。
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
   .goods{
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
     /*均等分*/
     padding: 2px;
   }

</style>
