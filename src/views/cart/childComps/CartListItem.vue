<template>
  <div id="shop-item">

    <!--左侧的选中按钮。-->
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
      <!--将itemInfo.checked传给子组件，itemInfo.checked决定子组件中isChecked的值
          并且给checkClick单击事件，单击后itemInfo.checked值取反，并传给子组件
      -->
    </div>

    <!--对商品数据信息的展示-->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  export default {
    name: "CartListItem",
    props:{
      //接收父组件中传过来的数据(即数组中的商品)
      itemInfo:{
        type:Object,
        default() {
          return {};
        }
      }
    },
    components:{
      CheckButton
    },
    methods:{
      checkClick(){
        //点击事件，每次点击将itemInfo.checked的值取反
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
