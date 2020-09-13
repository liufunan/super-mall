<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {            //接收父组件App.vue中的属性
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed:{
      //动态决定isActive的状态
      isActive(){
        return this.$route.path == this.path
        //  当前活跃的路径 是否是 当前的路径
        //  则只有当前活跃的这个path为true(点击谁谁活跃，则点击谁，就给谁对应的效果)
      },
      activeStyle(){
        //动态决定color
        return this.isActive ? {color:this.activeColor} : {}
        //  若isActive为true，处于活跃，则color：父组件中接收的activeColor值， 并把color给style中使用
        //  若不处于活跃，则不设置color
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
        //  若点击,则将从父组件中拿到的path给 url ，
        //  则点击谁就显示谁的path，然后展现响应路径的路由组件。
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
