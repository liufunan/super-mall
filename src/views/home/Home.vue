<template>
  <div id="home">
    <!--指定写slot为center中的内容-->
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行', '新款', '精选']"
                @tabClick="tabClick" ref="tabControl1"
                class="tab-control" v-show="isTabFixed"></TabControl>

    <!--做下拉加载更多，把下面的内容都放在嵌套的div中。-->
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
    <!--样式、表示、传值(滚动)给子组件、绑定子组件中传出来的scroll 、给子组件传值、接收子组件的值-->

    <!--使用封装的轮播图-->
    <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
    <!--推荐内容-->
    <RecommendView :recommends="recommends"></RecommendView>
    <!--本周流行-->
    <FeatureView></FeatureView>
     <!--下面的导航栏  ,该导航栏可以在多个地方使用，所以放在components中-->
    <TabControl  :titles="['流行', '新款', '精选']"
                @tabClick="tabClick" ref="tabControl2" ></TabControl>
    <!--拿到中间导航栏中，往外传出的内容，
        点击类型时触发tabClick事件，该事件根据我们点击的类型，来展示对应的商品-->
    <!--商品展示-->
    <GoodsList :goods="showGoods"></GoodsList>
    <!--拿到goods['pop'].list数据传递给子组件,该数据中就包含了它的图片、文字、链接...-->
    <!--这里不写pop，而用currentType，currentType默认值为pop，
        根据我们点击的位置index来判断商品类型，然后将商品类型赋给currentType-->

 </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <!--用组件来显示内容，给组件绑定单击事件；组件不能直接绑定，要加上.native修饰符事件-->
    <!--v-show为true时显示,v-show为false时不显示,-->

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from  "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from  "components/content/tabControl/TabControl"
  import GoodsList from  "components/content/goods/GoodsList"
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata ,getHomeGoods} from "network/home"
  import {debounce} from "common/utils";

  //在首页中进行引入，并进行注册和使用。
  export default {
    name: "Home",
    components:{
       NavBar,
      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop

     },
    //将请求到的数据保存起来。
    // data(){
    //   return{
    //     result:null
    //   }
    // }
    //改进一下
    data(){                //有数据后就可以做相关的展示了。
        return{
          banners:[],
          recommends:[],
          //默认一开始page为0，list中的数据为空
          goods:{
            "pop":{page:0, list:[]},
            "new":{page:0, list:[]},
            "sell":{page:0, list:[]}
          },
          currentType:"pop",
          isShowBackTop:false,
          tabOffsetTop:0,
          isTabFixed:false,         //是否给定一个样式
          saveY:0,

          itemImgListener:null

        }
    },
    computed:{
       showGoods(){
         //调用方法后，则请求到了这三种中商品的数据
         //根据index 确定 currentType
         //然后返回当前currentType类型商品的数据。    给到子组件
         return this.goods[this.currentType].list
       }
    },

    //记录位置的内容
    destroyed(){   //加keep-alive后就不会销毁
      console.log("home destroyed");
    },
    activated(){    //再次回到页面时，0毫秒回到之前的保存的位置(即瞬间会到该位置)
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
      //到某个位置
      this.$refs.scroll.refresh();
      //防止点击回来时不能滚动的一些问题。
    },
    deactivated(){   //离开给页面时，记录当前的位置(并保存在saveY中)
      //1.保存y值
      this.saveY = this.$refs.scroll.scroll.y

      //2.取消全局事件的监听*********
      // this.$bus.off("itemImageLoad",this.itemImgListener)


    },
    //声明周期函数,则组件创建完后，就发送网络请求
    created() {
    //一般在created中只写主要逻辑。则在methods中处理请求后，直接在created调用获取到对应的数据。

      //1.请求多个数据
      this.getHomeMultidata();     //this表示 methods中的方法
      //2.请求商品数据
      this.getHomeGoods("pop");
      // this.getHomeGoods(this.currentType);
      this.getHomeGoods("new");
      this.getHomeGoods("sell");

    },

    mounted(){
      //监听item中图片加载完成， (拿子组件scroll中的refresh,则加载完重新刷新)
      // this.$bus.$on("itemImageLoad",()=>{
      //   this.$refs.scroll.scroll.refresh();
      //   console.log("-------");
      // })
      //这里会执行30次，这样就会带来很多不好的问题；如：发送很多次请求对服务器压力大
      //则进行防抖操作

      //1.图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh , 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })


      //对监听的事件进行保存*********
      // this.itemImgListener = ()=>{
      //   refresh()
      // }

      // const refresh = debounce(this.$refs.scroll.refresh , 50)
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
      //*********



      // tabControl的吸顶效果
      //2.获取tabControl的offsetTop
      //$refs.tabControl拿到的是组件tabControl
      //所有的组件都有一个属性$el :用于获取组件中的元素
      //console.log(this.$refs.tabControl.$el);
      // 获取组件对应元素的offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop);
      //问题：
      // 当前获取到的offsetTop是很多图片都没有加载完的offsetTop，所以并不准确。
      // 所以要等内容加载完，再拿它的offsetTop。加载比较慢的是轮播图，所当轮播图加载完，整个就加载完了。
      // 则到methods里，在子组件传过来的事件中(表已经加载完)来获取元素的offsetTop。
      //**拿到tabControl准确的offsetTop后，将值赋给tabOffsetTop
      //this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop

    },
    // * 防抖函数起作用的过程:
    //   * 可以将refresh函数传入到debounce函数中, 生成一个新的函数.
    //   * 之后在调用非常频繁的时候, 就使用新生成的函数.
    //   * 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉
    methods:{

      //事件监听相关的方法

      tabClick(index){
           //当点击导航栏不同的位置的index时，currentType为不同的商品类别
           switch (index) {
             case 0:
               this.currentType="pop"
               break
             case 1:
               this.currentType="new"
               break
             case 2:
               this.currentType="sell"
               break
           }

           this.$refs.tabControl1.currentIndex=index;
           this.$refs.tabControl2.currentIndex=index;
           //让tabControl1 和 tabControl2 的currentIndex保持一致
           //则里面点击哪个就把哪个的类型赋值给tabControl1和tabControl2，(显示的类型一致)

      },
      backClick(){
          this.$refs.scroll.scroll.scrollTo(0,0,500)
      //通过$refs.scroll到scroll组件中，再.scroll拿到组件对象，再.scrollTop(0,0)拿到是组件对象中的方法。
      //0,0为顶部位置，500为500毫秒内回到顶部
      },
      //用子组件传过来的值position，监听scroll绑定的方法
      contentScroll(position){
        // console.log(position);
        //1.判断BackTop是否显示
        this.isShowBackTop = -position.y>1000
        //默认是负值，所以加-号转化下，
        //当isShowBackTop为false时，不显示   ;当isShowBackTop为true时，显示
        //滚动到一定位置时-position.y>1000 就为true，就显示

        //2.决定tabControl是否吸顶(是否给一个position：fixed)
        this.isTabFixed=(-position.y)>this.tabOffsetTop
        //当y轴位置大于tabOffsetTop(tabControl的top值)时，将isTabFixed设置为true

      },
      //接收子组件传送的事件后，给事件绑定对应的方法，进行操作。
      loadMore(){
        // console.log("jiazaigengduo");
        this.getHomeGoods(this.currentType);
        //则可以加载更多的商品信息
        //这里是调用getHomeGoods方法，传入this.currentType当前点击的类型，
        //获得的是当前类型中的下一页中的商品数据(页码会自加)
        this.$refs.scroll.scroll.finishPullUp()
        //完成操作后，再调用一次finishPullUp()，则可以进行下一次的下拉加载更多
      },
      //执行该函数时，轮播图图片已经加载完，此时可以获取tabControl准确的offsetTop
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        //获取到tabControl的offsetTop的值赋给tabOffsetTop。
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },




      //网络请求相关的方法

      //1.调用getHomeMultidata函数，请求首页中轮播图、推荐等数据
      getHomeMultidata(){
        getHomeMultidata()       //返回的是promise，默认执行了reslove(res)，res是请求拿到的数据。
          .then(res =>{          //函数执行完会自动回收，所以将请求拿到的数据存到data中。
            // console.log(res);   //输出拿到的数据。
            //this.result=res;  //将请求到的数据保存到data中

            //将请求到的数据中对应的数据保存到对应的里面
            //this.banners =res.data.banner;
            //this.recommends=res.data.recommend;
            this.banners =res.data.banner.list;
            this.recommends=res.data.recommend.list;
          })
      },
      //2.请求商品数据
      getHomeGoods(type){//传入获取商品的类型
        const page=this.goods[type].page+1    //动态获取页码 ；这里数据为0，则+1，默认为1；
                                               //this.goods[type].page为data中的数据
        getHomeGoods(type,page)                //传参进去，表示后面的参数，代表类型和页码
          .then(res =>{          //传参后，此时res就为pop的第一页数据
            this.goods[type].list.push(...res.data.list)
            //将获取到的pop的第一页数据，保存到上面data中的goods中的pop中的list里面
            this.goods[type].page +=1;     //拿到第一页数据后，则将页码加1；
                                            //这样后，后面动态获取的页码则为当前页的下一页；
            //数组a.push(...数组b)     ：...运算，则将数组b的内容取出来，放到数组a中。
      })
      }

    }

  }
</script>

<style scoped>
     #home{
       /*固定定位脱离文本流，所以给他留个位置*/
       /*padding-top: 44px;*/
       height: 100vh;
       /*vh->viewport height*/
       position: relative;
     }
     .home-nav{
       /*这里只设置首页中的样式*/
       background-color: var(--color-tint);
       color: white;
       /*上面导航栏固定定位，不让他随着滚动*/
       /*position: fixed;*/
       /*left: 0;*/
       /*right: 0;*/
       /*top: 0;*/
       /*z-index: 9;*/
       /*之前为了不让导航一起滚动设置的，现在滚动内容用了better-scroll后，则可以删除这些内容了*/
     }
  /*.tab-control{*/
    /*!*设置中间的导航栏置顶停留，top的位置是留给最上面的那个导航栏的*!*/
    /*!*sticky是当达到某个值时，就会把position设置为flex，不是这个值时由会设置回来*!*/
    /*!*但有些浏览器不支持sticky*!*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
  /*}*/

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*上下留出位置，则中间就为滚动区域*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.fixed{*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 44px;*/
  /*}*/

  /*.content{*/
    /*!*scoped是作用域的意思，意味着设置的该样式，只对该页面内容起效果*!*/
    /*!*height: calc(100% - 94px);*!*/
    /*!*height: calc(100% - 50px);*!*/
    /*height: 300px;*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/

</style>
