<template>
  <div id="cart">
    <nav-bar class="navbar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list class="cartlist"></cart-list>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    NavBar,
    CartList
  },
  name:'Cart',
  computed:{
    //返回购物车中的个数
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
  #cart{
    height: 100vh;
  }

  .navbar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

</style>
