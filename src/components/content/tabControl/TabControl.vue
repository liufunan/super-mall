<template>
  <div class="tab-control">
  <!--这个封装的组件，使用时只是文字不一样，所以不用插槽-->
   <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index===currentIndex}"
        @click="itemClick(index)">
      <!--动态绑定了一个样式,当index===currentIndex时，样式起效果 -->
     <span>{{item}}</span>
   </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{    //从父组件Home中拿到titles数据
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    //实现谁被选中，就变为红色，且下面有一个红色横杠
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
      //将点击的这个index赋值给currentIndex，则点击谁currentIndex就等于谁的index，就会添加active的样式
      //即点击谁，给谁添加该样式
         this.currentIndex=index
         // this.$emit("tabClick",index)
         this.$emit('tabClick', index)
         //将点击事件和对应的index往外面传。
      }
    }
  }
</script>

<style scoped>
   .tab-control {
     display: flex;
     text-align: center;
     font-size: 15px;
     height: 40px;
     line-height: 40px;
     background: #ffffff;
   }
  .tab-control-item{
    flex: 1;
  }
   .tab-control-item span{
     padding: 3px;
   }
  .active{
    /*给导航栏中的文字设置颜色和横线*/
    color: var(--color-high-text);
  }
   .active span{
     border-bottom: 3px solid var(--color-tint);
   }
</style>
