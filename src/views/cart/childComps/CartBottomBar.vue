<template>
    <div class="bottom-bar">

      <div class="check-content">
         <CheckButton :is-checked="isSelectAll" class="check-button"
                       @click.native="checkClick" ></CheckButton>
         <span>全选</span>
      </div>

      <div class="price">
        合计:{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
         去计算({{checkLength}})
      </div>

    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.checked
          //拿到购物车中的商品，并进行过滤，只返回被选中的商品
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
          //将这些过滤后的商品，进行价格×数量  得到当前每个商品的总价格
          //将所有商品的总价格相加
        }, 0).toFixed(2)
          //保留2位小数
      },
      checkLength(){
           return this.$store.state.cartList.filter(item => item.checked).length;
         //拿到购物车中的商品，并进行过滤，获取过滤后商品的长度
      },

      //15中简写

      isSelectAll(){
        if (this.$store.state.cartList.length === 0){
          // 当数组(购物车中商品)为0时，直接为false，不显示全选
          return false
        }else {
          return !this.$store.state.cartList.find(item => !item.checked)
          //购物车中商品找到有商品不为选中时，则加！为false， 不显示全选
        }
        //  !0  => true
        //  !1  => false

        //用普通遍历来做：
        // for (let item of this.$store.state.cartList){
        //   if (!true.checked){
        //     return false
        //   }
        // }
        //    return true

      }
    },
    methods:{
      //底部汇总中
      checkClick(){
        if(this.isSelectAll){ //isSelectAll判断的是否有不选中的，如果为true，则为全部选中。
          this.$store.state.cartList.forEach(item => item.checked=false)
          //若全部商品选中，则点击后，遍历购物车中所有商品，让它们不选中
        }else{
          this.$store.state.cartList.forEach(item => item.checked=true)
          //若不是全部商品都选中，则点击后，遍历购物车中所有商品，让它们都选中
        }
      },
      //点击全选按钮后所有商品都选中。
      //若原本他们都是选中的，则点击后会让它们全部都为不选中。
      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show("请选择购买的商品",2000)
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    background-color: gainsboro;
    font-size: 14px;
    /*bottom: 40px;*/

    height: 40px;
    line-height: 40px;

  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    /*margin: 5px;*/
    margin-right: 5px;
  }
  .price{
    margin-left: 40px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: red;
    color: floralwhite;
    text-align: center;
  }
</style>
