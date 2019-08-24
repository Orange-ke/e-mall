<template>
  <div>
    <van-row class="row">
      <van-col span="6" class="img"></van-col>
      <van-col span="12">购买商品可获得积分奖励</van-col>
      <van-col span="6" class="button">
        <van-button size="mini" round style="margin-top: 16px; border-color: #c8a86b; color: #c8a86b">赚积分</van-button>
      </van-col>
    </van-row>
    <van-row  class="row">
      <van-col span="6" class="img"></van-col>
      <van-col span="12">每日签到可获得积分奖励</van-col>
      <van-col span="6" class="button">
        <van-button size="mini" round style="margin-top: 16px; border-color: #c8a86b; color: #c8a86b">赚积分</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Button } from 'vant'
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button
  }
}
</script>

<style scoped>
  .row {
    height: 60px;
    padding: 10px 5px;
    margin-top: 16px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#e9e9ce+0,fcfff4+100 */
    background: #e9e9ce; /* Old browsers */
    background: -moz-linear-gradient(left,  #e9e9ce 0%, #fcfff4 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  #e9e9ce 0%,#fcfff4 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  #e9e9ce 0%,#fcfff4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e9e9ce', endColorstr='#fcfff4',GradientType=1 ); /* IE6-9 */
    color: #c8a86b;
    font-size: 15px;
  }
  .img {
    height: 60px;
    background-image: url('../../../../../assets/score.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .button {
    text-align: center;
  }
</style>
