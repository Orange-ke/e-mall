<template>
  <van-cell-group>
    <van-cell title="商品总价：" :value="'￥' + totalPrice.toFixed(2)" />
    <van-cell title="运费：" :value="'￥' + shipCost.toFixed(2)" />
  </van-cell-group>
</template>

<script>
import { Cell, CellGroup } from 'vant'
export default {
  props: {
    totalPrice: { type: Number, default: 0 },
    shipCost: { type: Number, default: 0 }
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  }
}
</script>

<style scoped>
</style>
