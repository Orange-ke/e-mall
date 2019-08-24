<template>
  <div class="my-points-header" align="center">
    <van-row class="row">
      <van-col span="24" style="font-size: 15px">
        <span class="title">当前积分</span>
        <br />
        <span class="value" style="border-bottom: 2px solid #fff">{{ currentPoints }}</span>
      </van-col>
    </van-row>
    <van-row class="subtitle row">
      <van-col span="8">
        <span class="value">{{ accumulativePoints }}</span>
        <br />
        <span class="title">累计积分</span>
      </van-col>
      <van-col span="8">
        <span class="value">{{ accumulativeConsume }}</span>
        <br />
        <span class="title">累计消费</span>
      </van-col>
      <van-col span="8">
        <span class="value">{{ todayPoints }}</span>
        <br />
        <span class="title">今日获得</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col } from 'vant'
import axios from 'axios'
export default {
  data: function () {
    return {
      currentPoints: 0,
      accumulativePoints: 0,
      accumulativeConsume: 0,
      todayPoints: 0
    }
  },
  methods: {
  },
  mounted: function () {
    let vm = this
    let params = {
      isIntegral: 1
    }
    axios
      .get('/ebapi/user_api/get_my_user_info.html', {params: params})
      .then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          vm.currentPoints = res.data.data.integral
          vm.accumulativePoints = res.data.data.sum_integral
          vm.accumulativeConsume = res.data.data.pay_count
          vm.todayPoints = res.data.data.today_integral
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    'van-row': Row,
    'van-col': Col
  }
}
</script>

<style scoped>
  .my-points-header {
    height: 200px;
    padding: 10px 16px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f79621+2,f9c667+99 */
    background: #f79621; /* Old browsers */
    background: -moz-linear-gradient(top,  #f79621 2%, #f9c667 99%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #f79621 2%,#f9c667 99%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #f79621 2%,#f9c667 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79621', endColorstr='#f9c667',GradientType=0 ); /* IE6-9 */
    text-align: center;
    color: #f0f0f0;
  }
  .row {
    height: 100px;
  }
  .subtitle {
    font-size: 12px;
  }
  .title {
    display: inline-block;
    padding: 6px 16px;
  }
  .value {
    display: inline-block;
    padding: 6px 5px;
    color: #fff;
  }
</style>
