<template>
  <div id="detail">
    <detail-nav-bar class="dnavbar" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"
      @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import {getDetail , Goods , Shop , GoodsParam,getRecommend} from 'network/detail'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {debounce} from 'common/utils.js'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


export default {

  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null
    }
  },
  components:{
    DetailNavBar,//详情页顶部导航
    DetailSwiper,//详情页滚动图片
    DetailBaseInfo,//详情页商品信息
    DetailShopInfo,//详情页店铺信息
    Scroll,
    DetailGoodsInfo,//详情页商品详情信息
    DetailParamInfo, //详情页商品尺寸信息
    DetailCommentInfo,//详情页评论信息
    GoodsList,
    DetailBottomBar
  },
  //创建时执行
  created() {
    this.iid=this.$route.params.iid
    getDetail(this.iid).then(res => {
    this.topImages=res.result.itemInfo.topImages
    const data=res.result
    //商品信息
    this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    //商家信息
    this.shop=new Shop(data.shopInfo)
    //商品详情信息
    this.detailInfo=data.detailInfo
    //商品参数信息
    this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    //详情页评论信息
    if (data.rate.CRate !== 0) {
      this.commentInfo = data.rate.list[0]
    }

    })
    //详情页下方推荐商品信息
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })

    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    },300)
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    //添加进购物车
    addToCart(){
      //定义product对象获取信息
      const product = {}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      //发出请求
      this.$store.dispatch('addCart',product)
    }
  },

}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .dnavbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
