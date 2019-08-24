<template>
  <div class="bill-record">
    <van-grid :border="1===2">
      <van-grid-item
        style="color: #FF5722"
        v-for="(item, index) in recordItems"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        :to="item.to"
      />
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
export default {
  data: function () {
    return {
      recordItems: [
        { text: '账单记录', icon: 'column', to: {path: '/user-center/my-account/bill-record', query: {type: 0}} },
        { text: '消费记录', icon: 'bill', to: {path: '/user-center/my-account/bill-record', query: {type: 1}} },
        { text: '充值记录', icon: 'balance-list', to: {path: '/user-center/my-account/bill-record', query: {type: 2}} },
        { text: '积分中心', icon: 'gem', to: {path: '/user-center/my-account/my-points'} }
      ]
    }
  },
  methods: {
  },
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem
  }
}
</script>

<style scoped>
  .bill-record {
    margin-top: 16px;
    border-bottom: 1px solid #ddd;
  }
</style>
