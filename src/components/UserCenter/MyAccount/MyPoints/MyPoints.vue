<template>
  <div class="my-points">
    <my-points-header></my-points-header>
    <van-tabs
      animated
      swipeable
      v-model="active"
      type="line"
      title-active-color="#F44336"
      style="margin: -30px auto 0; width: 90%;border-radius: 10px 10px">
      <van-tab title="分值明细">
        <points-detail></points-detail>
      </van-tab>
      <van-tab title="分值提升">
        <points-lift></points-lift>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import MyPointsHeader from './MyPointsHeader/MyPointsHeader'
import PointsDetail from './PointsDetail/PointsDetail'
import PointsLift from './PointsLift/PointsLift'
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
  },
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'my-points-header': MyPointsHeader,
    'points-detail': PointsDetail,
    'points-lift': PointsLift
  }
}
</script>

<style scoped>
  .my-points {
    padding-bottom: 10px;
  }
</style>
