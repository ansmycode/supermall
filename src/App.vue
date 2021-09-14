<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail" ><router-view/></keep-alive>
    <!-- 属实是懒得做进入detail路由时重新锚定到顶部 所以直接摘出来不缓存 改成每次进入时重新创建 -->
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
