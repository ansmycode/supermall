<template>
  <div class="profile">
    <nav-bar class="navbar"><div slot="center">我的商城</div></nav-bar>
    <div class="message">
      <h2>当前属于未完工页面</h2>
    <strong>模块进度(3/5)</strong>
    <p>商城主页 √</p>
    <p>商品详情页 √</p>
    <p>商品分类页 ×</p>
    <p>商品购物车 √</p>
    <p>用户主页 ×</p>
    </div>

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'

  export default {
    name: "Profile",
    components: {
        NavBar

    }
  }
</script>

<style scoped>
  .profile{
    height: 100vh;
    position: relative;
  }
   .navbar{
    background-color: var(--color-high-text);
    color: #fff;
  }
  .message{
    text-align: center;
  }
</style>
