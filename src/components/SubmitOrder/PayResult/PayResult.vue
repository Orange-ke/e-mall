<template>
  <div class="pay-result">
    <div class="box">
      <div class="header">
        <div v-if="payResult.status === 1">
          <svg t="1563761156525" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1117" width="48" height="48"><path d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m244.667733 422.0416l-263.68 263.662933c-6.656 6.673067-15.394133 10.001067-24.132266 10.001067s-17.4592-3.328-24.132267-10.001067l-143.240533-143.240533c-12.032-12.032-14.984533-31.402667-5.0688-45.2096a34.133333 34.133333 0 0 1 51.985066-4.386133l96.3072 96.3072a34.133333 34.133333 0 0 0 48.264534 0l216.746666-216.7296a34.133333 34.133333 0 0 1 51.985067 4.386133c9.949867 13.806933 6.980267 33.1776-5.034667 45.2096z" fill="#d81e06" p-id="1118"></path></svg>
          <div class="title">
            订单支付成功
          </div>
        </div>
        <div v-else-if="payResult.status === 0">
          <svg t="1563761836137" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2216" width="48" height="48"><path d="M874.0352 149.9648c-199.953067-199.953067-524.1344-199.953067-724.0704 0-199.953067 199.953067-199.953067 524.1344 0 724.0704 199.953067 199.953067 524.1344 199.953067 724.0704 0 199.953067-199.953067 199.953067-524.117333 0-724.0704z m-194.56 481.245867c12.8512 12.8512 15.138133 33.9456 3.310933 47.752533a34.048 34.048 0 0 1-25.975466 11.9808 33.9968 33.9968 0 0 1-24.132267-10.001067l-96.546133-96.546133a34.133333 34.133333 0 0 0-48.264534 0L391.3216 680.96a34.0992 34.0992 0 0 1-50.107733-1.979733c-11.844267-13.806933-9.557333-34.901333 3.310933-47.752534l95.0784-95.0784a34.133333 34.133333 0 0 0 0-48.264533l-95.266133-95.266133c-12.014933-12.014933-14.933333-31.368533-5.000534-45.175467a34.133333 34.133333 0 0 1 51.985067-4.369067l96.546133 96.546134a34.133333 34.133333 0 0 0 48.264534 0l95.266133-95.266134c12.014933-12.014933 31.368533-14.933333 45.175467-5.000533a34.133333 34.133333 0 0 1 4.369066 51.985067l-96.546133 96.546133a34.133333 34.133333 0 0 0 0 48.264533l95.0784 95.061334z" fill="#d81e06" p-id="2217"></path></svg>
          <div class="title">
            订单支付失败
          </div>
        </div>
      </div>
      <div class="body">
        <van-cell-group style="border-bottom: 1px solid #f5f5f5;">
          <van-cell title="订单编号" :value="payResult.number" />
          <van-cell title="下单时间" :value="payResult.payTime" />
          <van-cell title="支付方式" :value="payResult.payType" />
          <van-cell title="支付金额" :value="payResult.payTotal + ' 元'" />
          <van-cell v-if="payResult.status === 0" title="失败原因" :value="payResult.failReason" />
        </van-cell-group>
      </div>
      <div class=" footer">
        <van-button class="button" v-if="payResult.status === 0" type="danger" size="large" round @click="payAgain">重新支付</van-button>
        <van-button class="button"  plain type="primary" size="large" round @click="backToHome">{{ payResult.status === 0 ? '返回首页' : '继续逛逛' }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Cell, CellGroup } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      payResult: {
        status: -1,
        number: '',
        payTime: '',
        payType: '',
        payTotal: '',
        failReason: ''
      }
    }
  },
  created: function () {
    this.$toast({
      mask: true,
      message: '支付结果查询中...'
    })
  },
  mounted: function () {
    let outTradeNo = this.$route.query.outTradeNo
    console.log(outTradeNo)
    let vm = this
    axios
      .post('/api/Order/queryOrder', { outTradeNo: outTradeNo })
      .then(response => {
        vm.$toast.clear()
        let totalFee = (Number(response.data.data.weixinQueryResult.total_fee) / 100)
        let cashFee = (Number(response.data.data.weixinQueryResult.cash_fee) / 100)
        if (response.data.data.weixinQueryResult && response.data.data.weixinQueryResult.trade_state === 'SUCCESS') {
          this.payResult.status = 1
          this.payResult.number = response.data.data.weixinQueryResult.out_trade_no
          this.payResult.payTime = response.data.data.orderInfo.pay_date
          this.payResult.payType = '微信支付'
          this.payResult.payTotal = totalFee ? totalFee.toFixed(2) : cashFee.toFixed(2)
          this.payResult.failReason = response.data.data.trade_state_desc
        } else {
          this.payResult.status = 0
          this.payResult.number = response.data.data.weixinQueryResult.out_trade_no
          this.payResult.payTime = response.data.data.orderInfo.pay_date
          this.payResult.payType = '微信支付'
          this.payResult.payTotal = totalFee ? totalFee.toFixed(2) : cashFee.toFixed(2)
          this.payResult.failReason = response.data.data.weixinQueryResult.trade_state_desc
        }
      })
      .catch(error => {
        console.log(error)
        this.$toast('请求错误')
      })
      .finally(() => { vm.$toast.clear() })
  },
  methods: {
    backToHome: function () {
      console.log('home')
      this.$router.push('/')
    },
    payAgain: function () {
      console.log('payAgain')
      // this.$router.back()
      this.$router.replace('/submit-order/order-step?outTradeNo=' + this.payResult.number)
    }
  },
  components: {
    'van-button': Button,
    'van-cell': Cell,
    'van-cell-group': CellGroup
  }
}
</script>

<style scoped>
  .pay-result {
    padding: 80px 10px 0;
    background: #f5f5f5;
  }
  .box {
    padding: 10px 16px;
    background: #fff;
  }
  .header {
    padding: 30px 10px 10px;
    text-align: center;
  }
  .header svg {
    position: absolute;
    margin-top: -60px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .van-cell__title {
    flex: 1
  }
  .van-cell__value {
    flex: 2
  }
  .button {
    margin-top: 15px;
  }
</style>
