<template>
    <van-col span="11" style="font-size: 14px; box-shadow: 1px 1px 5px #ddd; margin-top: 10px;">
      <div @click="linkToProductDetail(to)">
        <img :src="src" width="100%" height="100%">
        <div class="info" style="padding: 0 5px;"> {{ info }} </div>
        <div class="price price-color" style="padding: 0 5px;">￥ {{ price.toFixed(2) }}</div>
      </div>
    </van-col>
</template>

<script>
import { Col } from 'vant'
export default {
  props: {
    src: {type: String, default: ''},
    info: {type: String, default: ''},
    price: {type: Number, default: 0},
    to: {type: String, default: ''}
  },
  methods: {
    linkToProductDetail: function (path) {
      this.$router.push(path)
    }
  },
  components: {
    'van-col': Col
  }
}
</script>

<style scoped>
  img {
    width: 100%;
    border-radius: 5px;
  }
  .info {
    margin: 5px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .price {
    margin: 5px;
  }
</style>
