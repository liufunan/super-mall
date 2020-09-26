<template>
   <div class="toast" v-show="isShow">
     <div>{{message}}</div>
   </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      //显示的文字信息
      // message:{
      //   type:String,
      //   default:" "
      // },
      // //决定是否显示
      // show:{
      //   type: Boolean,
      //   default: false
      // }
    },
    data(){
      return{
        message:" ",
        isShow:false
      }

    },
    methods:{
      show(message="默认文字",duration=2000){     //给message、duration一个默认值
        this.isShow =true
        this.message=message

        setTimeout(()=>{
          this.isShow=false;
          this.message=""
        },duration)

      }
    }


  }
</script>

<style scoped>
   .toast{
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50% , -50%);

     z-index: 999;

     color: white;
     background-color: rgba(0,0,0,0.75);
     padding: 8px 10px;
   }
</style>
