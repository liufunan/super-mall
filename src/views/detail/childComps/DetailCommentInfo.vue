<template>
  <!--<div>-->
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>

      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>

      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
       <!--服务器在返回时间时，返回的一串数字(时间戳），不会返回固定格式的时间
           因为不同地方时间表示方式可能是不同的，所以我们要将时间戳转化成时间格式的字符串
           将时间戳转成时间格式的字符串：
            1.将时间戳转成Date对象
            2.将date进行格式化，转成对应的字符串

           在开发中将时间戳转成时间格式的字符串很常见，所以不用一步一步自己转化
           系统提供封装方法，直接拿着用就可以了。
            | showDate：要进行过滤
           -->
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key = 'index'>
        </div>
      </div>
    </div>
  <!--</div>-->
</template>

<script>
  import {formatDate} from 'common/utils'
  //传入的formatDate，是封住了时间格式化的方法

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
      }
    },
    filters: {
      //将时间戳转化成时间格式字符串
      showDate(value) {
        //1.将时间戳转化成Date对象
        let date = new Date(value * 1000);
        //2.将date进行格式化
        // return formatDate(date,'yyyy-MM-dd');
        return formatDate(date,'yyyy-MM-dd hh:mm:ss');
        //用传进来的js文件中的formatDate方法,直接传入data和要转化成的格式
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .info-other .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
