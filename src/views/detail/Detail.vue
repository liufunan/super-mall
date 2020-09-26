<template>
   <div id="detail">
      <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>

      <!--将要滚动的内容放在Scroll中即可 ,而Scroll也要有一个高度-->
      <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

       <DetailSwiper :top-images="topImages"></DetailSwiper>
       <!--将数据topImages传给子组件DetailSwiper-->
       <DetailBaseInfo :goods="goods"></DetailBaseInfo>
       <!--goods对象为Goods的实例，获取多个数据放在goods对象中-->
       <!--将goods数据传到DetailBaseInfo组件中，在DetailBaseInfo中进行获取与设置样式后，再导入使用-->
       <DetailShopInfo :shop="shop"></DetailShopInfo>
       <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
       <!--请求到数据，保存起来；然后传到对应的组件中将数据进行操作展示。-->
       <DetailParamInfo :param-info="paramInfo" ref="param"></DetailParamInfo>
       <!--创建实例获取数据，在该页面中保存数据，然后将数据传到组件中展示操作-->
       <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
       <GoodsList :goods="recommends" ref="recommend"></GoodsList>
       <!--推荐商品-->
     </Scroll>

      <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
      <!--底部栏 ，   接收子组件中传出的addCart方法-->

     <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
     <!--用组件来显示内容，给组件绑定单击事件；组件不能直接，要绑定加上.native修饰符事件-->
     <!--v-show为true时显示,v-show为false时不显示,-->

     <!--<Toast :message="message" :show="show"></Toast>-->

   </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from  "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import {debounce} from "common/utils";

  // import Scroll from "components/common/scroll/Scroll"
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from "components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop"
  //使用之前首页中的GoodsList组件

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

  import { mapActions } from "vuex"

  // import Toast from "components/common/toast/Toast"

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop,
      // Toast
    },
    data(){
      return{
        iid:null,             //商品iid
        topImages:[],         //轮播图图片
        goods:{},
        shop :{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        // itemImgListener:null
        themeTopYs:[],      //放导航栏文字对应的值(每个index对应数组中一个值)
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false
        // message:" ",
        // show:false
      }
    },
    created() {
      //1.保存传入的iid
      // console.log(this.$route.params);
      this.iid =this.$route.params.iid
      //将当前url后面携带的参数(params)中的iid赋值给this.iid(在这里面保存了点击的商品的iid)

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        // console.log(res);
        //reg是数据整个大的对象
        //获取顶部图片轮播数据
        const data = res.result      //直接用data来表示里面的内容
        this.topImages = data.itemInfo.topImages

       //2.获取商品信息
        //goods对象为Goods的实例，获取多个数据放在goods对象中
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

       //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info ,data.itemParams.rule);

        //6.取出评论信息
        if (data.rate.cRate !==0){
            this.commentInfo = data.rate.list[0]
        }

      })

      //3.请求推荐商品数据
      getRecommend().then(res =>{
        // console.log(res);
        // 输出获取到的数据 res
        this.recommends = res.data.list
        // 将推荐商品的数据保存到recommends中

        //展示商品的信息，可以不用重新创建一个数组，可以直接用之前首页时的GoodsList来展示。
      })

       //4.给getThemeTopY赋值，给对应的文字  (用debounce是为了防抖动，防止传入很多次)
        this.getThemeTopY = debounce(()=>{
          //这里获取导航栏中每个文字的滚动位置，并push到themeTopYs数组中；
          //给组件对应的ref，来获取；对应组件就是对应文字内容
          //参数的位置  (组件不能直接获取，要用$el拿到元素后获取)
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //最后加一个无限大，设置最后一个组件的区间
        // console.log(this.themeTopYs);
      },100)

    },
    methods:{

      ...mapActions(["addCart"]),

      //执行该方法，即图片加载后进行刷新。
      imageLoad(){
         this.$refs.scroll.refresh();

         this.getThemeTopY();
        //在这里调用是让内容都加载出来后，再获取能准确获取到位置
      },
      //传递的事件，index为当前点击文字的index
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
        //点击哪个文字，就获取哪个文字的位置，就滚动哪个文字对应的位置上($refs.scroll：滚动)
        //对应文字的位置如何获取？？
      },
      //拿到Scroll中事件，进行监听，触发则执行contentScroll
      contentScroll(position){
        //1.获取滚动位置的y值
        const positionY =-position.y
        //将positionY和主题中值进行对比
        //列出一个的值[0,7938,9120,9452，无限大]
        //positionY在 0到7938之间 index=0   =》第一个文字
        //positionY在 7938到9120之间 index=1  =》第二个文字
        //positionY在 9120到9452之间 index=2  =》第三个文字
        //positionY在 9452到无限大之间 index=3 =》第四个文字

        let length = this.themeTopYs.length;
        for(let i=0; i<length-1 ;i++) {
           if(this.currentIndex !== i &&
             (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
             //this.currentIndex !=i  是防止赋值过于频繁
             this.currentIndex = i
             //console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
             //根据当前滚动的位置，获取到对应的i值后
             //将当前i值传给导航栏DetailNarBar的currentIndex，
             //在导航栏DetailNarBar中currentIndex=index，就对应的文字显示颜色
          }
        }

        //3.是否显示回到顶部  (y大于1000的时候，isShowBackTop为true，则显示)
        this.isShowBackTop = -position.y>1000

      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
        //通过$refs.scroll到scroll组件中，再.scroll拿到组件对象，再.scrollTop(0,0)拿到是组件对象中的方法。
        //0,0为顶部位置，500为500毫秒内回到顶部
      },
      addToCart(){
        // console.log("-----");
        //在这里将当前商品加入购物车。
        //1.获取购物车需要展示的信息
           const product = {}
           product.image = this.topImages[0];
           product.title = this.goods.title;
           product.desc = this.goods.desc;
           product.price = this.goods.realPrice;
           //使用的是保存的最底价格
           product.iid = this.iid;

        //2.将商品添加到购物车
        //将内容放到vuex中,公共管理和使用, 然后将vuex中数据
        //点击一次就将当前商品加入vuex的cartList里面
        //    this.$store.commit("addCart",product)
        this.$store.dispatch("addCart",product).then(res => {

          // this.show = true;
          // this.message = res;
          // //改变变量中show、message的值
          // setTimeout(() =>{
          //   this.show = false;
          //   this.message = "";
          //   //消失，则就是把show变为false，则传给子组件的是false，则就不显示了
          // },1500)

          this.$toast.show(res,1500)
          // this.$toast.show()

          // console.log(this.$toast);
        })

         //3.添加到购物车成功

         //这里用promise，则可以确保前面actionsl中添加的事情做完后，来进行下一步操作(顺序)

      }

    },
    mounted() {
      //   const refresh = debounce(this.$refs.scroll.refresh , 50)
    //
    //   this.itemImgListener = ()=>{
    //     refresh()
    //   }
    //
    //   this.$bus.$on('itemImageLoad',this.itemImgListener )
    // },
    // deactivated(){
    //   this.$bus.off("itemImageLoad",this.itemImgListener)
    },
    updated() {
      // this.themeTopYs=[]
      //
      // //所有数据赋完值后，在获取位置
      // //这里获取导航栏中每个文字的滚动位置，并push到themeTopYs数组中；
      // //给组件对应的ref，来获取；对应组件就是对应文字内容
      // this.themeTopYs.push(0)
      // //参数的位置  (组件不能直接获取，要用$el拿到元素后获取)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      // console.log(this.themeTopYs);

    }

  }
</script>

<style scoped>
   #detail {
     position: relative;
     z-index: 99;
     background-color: #fff;
     /*把底部内容覆盖上*/
     /*height: 100vh;*/
     /*高度为屏幕的高度*/
   }
   .detail-nav {
     position: relative;
     z-index: 9;
     background-color: #fff;
     /*导航栏置顶*/
   }
   .content {
     /*height: calc(100% - 44px);*/
     height: calc(100vh - 44px);
     /*background: #ffffff;*/
   }
</style>
