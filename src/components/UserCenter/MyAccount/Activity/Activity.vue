<template>
  <div class="activity">
    <van-cell-group :border="false">
      <van-cell
        title-style="flex: 2; font-size: 13px"
        v-for="(activity, index) in activities"
        :icon="activity.icon"
        :title="activity.title"
        :label="activity.label"
        center
        :key="index"
        :border="false"
        style="line-height: 100%;font-size: 12px"
      >
        <template slot="default">
          <van-button type="primary" disabled size="mini" style="padding: 0 6px;" round>已结束</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Icon } from 'vant'
export default {
  data () {
    return {
      activities: [
        { title: '最新拼团活动', label: '最新的优惠商品上架拼团', icon: '../../../../assets/pintuan.png' },
        { title: '当前限时秒杀', label: '最新的商品秒杀进行中', icon: '../../../../assets/miaosha.png' },
        { title: '砍价活动', label: '呼朋唤友来砍价', icon: '../../../../assets/kanjia.png' }
      ]
    }
  },
  methods: {
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-button': Button,
    'van-icon': Icon
  }
}
</script>

<style scoped>
</style>
