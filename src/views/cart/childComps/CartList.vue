<template>
  <div class="cartlist">
      <scroll class="content" ref="scroll">
       <cart-list-item v-for="(item,index) in List" :key="index"
       :item-info="item"
       ></cart-list-item>
      </scroll>
      <bottom-bar></bottom-bar>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import BottomBar from './BottomBar.vue'
import CartListItem from './CartListItem.vue'

export default {
  components: {
    Scroll,
    CartListItem,
    BottomBar

  },
  name:'CartList',
  computed:{
    ...mapGetters({
      List:'cartList'
    })
  },
  activated() {

    this.$refs.scroll.refresh()
  },

}
</script>

<style scoped>
  .cartlist{
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
  .content{
    height: 100vh;
  }
</style>
