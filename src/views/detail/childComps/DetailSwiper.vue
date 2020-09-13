<template>
  <!--<Swiper class="detail-swiper" :style="">-->
    <!--<SwiperItem v-for="item in topImages">-->
      <!--<img :src="item" alt=""/>-->
    <!--</SwiperItem>-->
  <!--</Swiper>-->
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }

  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
