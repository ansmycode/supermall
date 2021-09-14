<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 最顶部导航 nvabar组件 -->
    <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   v-show="isTabFixed"
                   />

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            > <!-- scroll组件控制滚动 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>  <!-- 主页滚动广告 swiper组件 -->
      <recommend-view :recommends="recommends"/><!-- 推荐视图组件 -->
      <feature-view/><!-- 本周流行视图组件 -->
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   />
                   <!-- 控制 流行,新款,精选三选项组件 -->
      <good-list :goods="showGoods"/>
    </scroll>
    <div></div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- .native修饰符监听组件根元素的原生事件 -->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import { getHomeMultidata, getHomeGoods } from "network/home.js"
  import { debounce } from 'common/utils.js'
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.scroll.y

    },
    mounted() {
      //通过事件总线$bus监听图片加载重复刷新来解决scrollerheight因为图片未加载时就已经确认高度的问题
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImgLoad',()=>{
        refresh();
      })


    },
    methods: {
      //homeswiper组件传来的自定义事件用于监听图片加载
      swiperImgLoad(){
        //获取tabcontrol组件offsettop
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },
        //事件监听相关的方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      //返回最顶部事件触发
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },

      contentScroll(position) {
        //拖到一定程度出现返回最高处组件
        this.isShowBackTop = (-position.y) > 1000
        //
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //加载更多事件
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {

          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }


</style>
