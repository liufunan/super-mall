<template>
   <div class="recommend">
     <!--拿到数据后，对数据进行遍历、展示-->
      <div v-for="item in recommends" class="recommend-item">
        <!--动态获取里面的数据-->
        <a :href="item.link">
          <img :src="item.image">
          <div>{{item.title}}</div>
        </a>

      </div>

   </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
   .recommend{
      display: flex;
      width:100%;
     text-align: center;
     font-size: 12px;

     padding: 10px 0 20px;
     border-bottom: 10px solid gainsboro;

    }
   .recommend-item{
      flex: 1;
   }
   .recommend-item img{
     width: 70px;
     height: 70px;
     margin-bottom: 10px;
   }

</style>
