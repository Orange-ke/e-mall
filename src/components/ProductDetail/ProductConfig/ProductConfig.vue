<template>
  <div class="product-config">
    <van-cell-group>
      <van-cell style="color: #323233; padding: 5px 10px" :border="false">
        <div slot="title">
          <span class="red-span" v-if="showSave" style="padding: 2px 15px;">购买返现:{{ returnCash }} 元</span>
          <span class="blue-span" v-if="showSave" style="padding: 2px 15px;">推荐返佣:{{ rebate }} 元</span>
        </div>
      </van-cell>
      <van-cell :title="'退款说明 : ' + reFund" class="item"  :border="false" />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
export default {
  props: {
    reFund: { type: String, default: '' },
    returnCash: { type: Number, default: 0 },
    rebate: { type: Number, default: 0 },
    showSave: {type: Boolean, default: false}
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  }
}
</script>

<style scoped>
</style>
