<template>
  <div class="a">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="b">
      <h2>分类商品更新中 </h2>
      <h2>大家敬请期待...</h2>
      <p>https://github.com/liufunan/super-mall.git</p>
      <div class="c">
        <p>作者:刘富楠</p>
        <p>联系方式:15327338509</p>
        <p>邮箱:1842250314@qq.com</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "Category",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .b{
    width: 100%;
    height: 1500px;
    background-color: gainsboro;
  }
  .b h2{
    line-height: 70px;
    text-align: center;
  }
  .b p{
    text-align: center;
  }
  .c{
    margin-top: 230px;
  }
  .c p{
    text-align: center;
    font-size: 12px;
    color: white;
  }
</style>

