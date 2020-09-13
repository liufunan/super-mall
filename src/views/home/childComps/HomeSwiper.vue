<template>
  <Swiper>
    <!--将轮播图的内容在这里先写好，然后再引入到Home中直接使用-->

    <!--v-for遍历banners中的所有项，用：动态获取banners里面的数据-->
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  //导入封装的轮播图组件

  export default {
    name: "HomeSwiper",
    //将Home中得到的数据拿到这里使用
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      //这个方法执行，则轮播图图片加载完。
      imageLoad(){
        if (!this.isLoad){
          // console.log("--");
          this.$emit("swiperImageLoad");
          //将swiperImageLoad传送出去。
          this.isLoad=true
          //设置为true后 !this.isLoad 就为false，则可以防止多次发送的问题。
        }
      }
    }
  }
</script>

<style scoped>

</style>
