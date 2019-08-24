<template>
  <div>
    <!--  导航  -->
    <van-tabbar
      v-model="tabBarActive"
      active-color="#ffd31c"
      style="font-weight: 800"
      route
    >
      <van-tabbar-item to="/">
        <span>首页</span>
        <img
          v-if="!props.active"
          slot="icon"
          slot-scope="props"
          src="../../assets/1-001.png"
        >
        <img
          v-else
          slot="icon"
          slot-scope="props"
          src="../../assets/1-002.png"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="fire-o" to="/hot-product">
        <span>爆款抢购</span>
        <img
          v-if="!props.active"
          slot="icon"
          slot-scope="props"
          src="../../assets/2-001.png"
        >
        <img
          v-else
          slot="icon"
          slot-scope="props"
          src="../../assets/2-002.png"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/recommend">
        <span>推荐</span>
        <img
          v-if="!props.active"
          slot="icon"
          slot-scope="props"
          src="../../assets/3-001.png"
        >
        <img
          v-else
          slot="icon"
          slot-scope="props"
          src="../../assets/3-002.png"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/user-center">
        <span>我的</span>
        <img
          v-if="!props.active"
          slot="icon"
          slot-scope="props"
          src="../../assets/4-001.png"
        >
        <img
          v-else
          slot="icon"
          slot-scope="props"
          src="../../assets/4-002.png"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  data: function () {
    return {
      tabBarActive: 0, // 子类tab
      id: this.$router
    }
  },
  mounted: function () {
    console.log(this.$router)
  },
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  }
}
</script>

<style scoped>
</style>
