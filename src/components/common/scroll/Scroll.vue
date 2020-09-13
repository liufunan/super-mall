<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  //导入better-scroll框架

  export default {
    name: "Scroll",
    props:{              //根据父组件中使用的时的传值，来给它对应的值
      probeType:{
        type:Number,
        default:0        //默认为0，则默认不监听滚动的值
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,
        message:"哈哈"
      }
    },
    mounted() {
     // this.scroll = new BScroll(document.querySelector(".wrapper")
     // 为了能确保拿到是该页面中的wrapper，则可用$refs来绑定元素，
     // ref如果是绑定在普通元素中，那么通过this.ref.refname获取到的是一个元素对象。
     // ref如果是绑定在组件中的，那么通过this.ref.refname获取到的是一个组件对象。
      this.scroll = new BScroll(this.$refs.wrapper, {
        click:true,
        probeType:this.probeType,
        //用上面定义的属性中的值
        pullUpLoad:this.pullUpLoad
        //值为父组件中传过来的值
      });
      this.scroll.scrollTo(0,0,500);
      //给scroll对象一个scrollTo方法，scrollTo(0,0)为页面回到顶部
      //0,0为顶部位置，500为500毫秒内回到顶部

      //监听滚动的位置 ,父组件引用后，滚动里面的内容时，就会实时监听响应
      //只有probeType为2或3才要监听，0或1时可以不监听位置
      if (this.probeType ===2 ||this.probeType ===3){
        this.scroll.on("scroll",(position)=>{
          // console.log(position);
          // 将该事件，和它的动态位置发出去了。在父组件中使用
          this.$emit("scroll",position)
        })
      }

      //监听上拉事件， 依据的是滚动页面的区域，当滚动区域到底时触发该事件
      //可以做判断，只有this.pullUpLoad为true时，才执行
      if(this.pullUpLoad){
          this.scroll.on("pullingUp",()=>{
          // console.log("上拉加载更多");
          this.$emit("pullingUp")
          // 将事件传送给父组件 ,让父组件做上拉加载更多中的操作。
        })
      }

    },
    methods:{
      //重新做一次刷新
      refresh() {
        this.scroll && this.scroll.refresh()
        // console.log("---");
      }
      // ,
      // finishPullUp(){
      //   this.scroll && this.scroll.finishPullUp();
      // }
    }
  }
</script>

<style scoped>

</style>
