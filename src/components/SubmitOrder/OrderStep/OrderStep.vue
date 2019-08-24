<template>
  <div class="order-step">
    <div class="header clear">
      <svg class="header-item img" t="1563951757823" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3390" width="48" height="48"><path d="M235.039619 808.906154c-28.9084 0-49.927109-23.754007-49.927109-52.922327L185.11251 529.367553c0-7.370875-5.977132-13.328563-13.334703-13.328563-7.370875 0-13.334703 5.957689-13.334703 13.328563l0 226.617297c0 43.884486 32.984229 79.589686 76.595492 79.589686 7.357572 0 13.334703-5.963829 13.334703-13.334703C248.374322 814.871005 242.397191 808.906154 235.039619 808.906154z" p-id="3391" fill="#ffffff"></path><path d="M300.110637 809.400411l-13.334703 0c-7.357572 0-13.334703 5.963829-13.334703 13.334703s5.977132 13.334703 13.334703 13.334703l13.334703 0c7.370875 0 13.334703-5.963829 13.334703-13.334703S307.481512 809.400411 300.110637 809.400411z" p-id="3392" fill="#ffffff"></path><path d="M866.090039 489.369583l-54.250578 0L811.839461 367.443673c0-41.702798-31.800263-76.978209-71.643714-87.919399 0.827855-4.559852 0.481977-9.392928-1.254573-14.049994l-57.543577-154.369833c-2.474354-6.628978-7.475252-12.006452-13.908778-14.94334-6.445806-2.936889-13.776771-3.210112-20.404726-0.723477L185.269076 267.830955c-4.628414 1.727341-8.487302 4.604878-11.385305 8.184403l-21.364587 0c-50.968835 0-87.416955 41.019229-87.416955 91.428316l0 468.548372c0 51.515281 36.449143 93.420693 87.416955 93.420693l561.889247 0c50.968835 0 97.43103-41.905412 97.43103-93.420693L811.839461 729.392192l54.250578 0c51.046606 0 92.430132-41.383526 92.430132-92.429109L958.520171 581.800739C958.520171 530.74697 917.136645 489.369583 866.090039 489.369583zM640.742664 154.73413l45.203528 121.281227L315.844993 276.015358 640.742664 154.73413zM758.501672 835.992045c0 21.721721-22.906709 40.080857-44.093241 40.080857L152.519184 876.072903c-21.187555 0-34.079166-18.359137-34.079166-40.080857L118.440018 367.443673c0-21.3564 12.163017-38.089503 34.079166-38.089503l561.889247 0c21.916149 0 44.093241 16.733103 44.093241 38.089503l0 121.92591L677.582711 489.369583c-51.04763 0-92.431156 41.378409-92.431156 92.431156l0 55.162344c0 51.045583 41.383526 92.429109 92.431156 92.429109l80.918961 0L758.501672 835.992045zM905.182382 636.963083c0 21.589714-17.502629 39.09132-39.092343 39.09132L677.582711 676.054403c-21.591761 0-39.092343-17.502629-39.092343-39.09132L638.490368 581.800739c0-21.589714 17.501606-39.099507 39.092343-39.099507l188.507328 0c21.590737 0 39.092343 17.509792 39.092343 39.099507L905.182382 636.963083z" p-id="3393" fill="#ffffff"></path><path d="M705.723631 582.815859c-14.116509 0-25.562189 11.460006-25.562189 25.576515 0 14.114462 11.446703 25.548886 25.562189 25.548886 14.102183 0 25.561166-11.434423 25.561166-25.548886C731.284797 594.275865 719.825814 582.815859 705.723631 582.815859z" p-id="3394" fill="#ffffff"></path></svg>
      <div class="header-item detail">
        <div>
          {{ orderHint }}
        </div>
        <div>
          {{ addTimeYear }} {{ addTimeHour }}
        </div>
      </div>
    </div>
    <van-card
      v-if="orderInfo.cartInfo"
      style="margin: 10px auto; border-top-left-radius: 0; border-top-right-radius: 0;"
      :num="orderInfo.cartInfo[0].cart_num"
      :title="orderInfo.cartInfo[0].productInfo.store_name"
      :desc="orderInfo.cartInfo[0].productInfo.attrInfo ? orderInfo.cartInfo[0].productInfo.attrInfo.suk : ''"
      :thumb="orderInfo.cartInfo[0].productInfo.attrInfo ? orderInfo.cartInfo[0].productInfo.attrInfo.image : orderInfo.cartInfo[0].productInfo.image"
    >
      <div slot="price" style="display: block; float: none;text-align: right">
        <span class="price-color" style="font-size: 12px;"> ￥{{ orderInfo.cartInfo[0].productInfo.price }}</span>
      </div>
    </van-card>
    <div class="line"></div>
    <van-steps :active="active" active-color="#ffd31c">
      <van-step>待付款</van-step>
      <van-step>待确认</van-step>
      <van-step>待使用</van-step>
      <van-step>待评价</van-step>
      <van-step>已完成</van-step>
    </van-steps>
    <van-cell-group class="item" style="border-bottom: 1px solid #f5f5f5;">
      <van-cell title="验票码" v-if="oderDetail.smsCode.length > 0">
        <div slot="default">
          <div
            style="font-size: 20px; color: #f56723; font-weight: 600; border-right: 2px solid #ddd; margin: 3px 0; padding-right: 5px;"
            v-for="(item, index) in oderDetail.smsCode"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </van-cell>
      <van-cell title="订单编号">
        <div slot="default">
          <span>{{ oderDetail.number }}</span>
          <button class="van-button van-button--default van-button--mini" type="button" v-clipboard:copy="oderDetail.number" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
        </div>
      </van-cell>
      <van-cell title="下单时间" :value="oderDetail.payTime" />
      <van-cell title="订单状态" :value="oderDetail.payStatus" />
      <van-cell title="支付方式" :value="oderDetail.payType" />
    </van-cell-group>
    <van-cell-group class="item" style="border-bottom: 1px solid #f5f5f5;">
      <van-cell title="客户姓名" :value="oderDetail.guestName" />
      <van-cell title="联系电话" :value="oderDetail.guestPhone" />
    </van-cell-group>
    <van-cell-group class="item" style="border-bottom: 1px solid #f5f5f5;">
      <van-cell title="支付金额" :value="oderDetail.price" />
      <van-cell title="实付款" :value="'￥'+ oderDetail.payTotal" value-class="price-color" />
    </van-cell-group>
    <van-cell-group class="item" style="border-bottom: 1px solid #f5f5f5; margin-bottom: 50px;">
      <van-cell title="退款说明" :value="oderDetail.refundInfo" />
    </van-cell-group>
    <!-- status1: 待支付 is_del===0 && paid===0 && refund_status===0 && status===0 -->
    <div slot="footer" v-if="orderInfo.paid === 0 && orderInfo.refund_status === 0 && orderInfo._status._type === 0" class="footer">
      <van-cell value-class="align-right">
        <van-button style="padding: 0 16px;" slot="default" type="default" class="orange-btn" round size="small" @click="payNow">立即付款</van-button>
      </van-cell>
    </div>
    <!-- status2: 待确认 is_del===0 && paid===0 && refund_status===0 && status===0 -->
    <div slot="footer" v-if="orderInfo.paid === 1 && orderInfo.refund_status === 0 && orderInfo._status._type === 0 && Number(orderInfo.refund_commission) !== 0" class="footer">
      <van-cell value-class="align-right">
        <van-button size="small" round @click.stop="applyToRefund(orderInfo.order_id)">申请退款</van-button>
      </van-cell>
    </div>
    <!-- status3: 待使用 is_del===0 && paid===1 && refund_status===0 && status===1 -->
    <div slot="footer" v-if="orderInfo.paid === 1 && orderInfo.refund_status === 0 && (orderInfo.status === 1 || orderInfo._status._type === 2) && Number(orderInfo.refund_commission) !== 0" class="footer">
      <van-cell value-class="align-right">
        <van-button size="small" round @click.stop="applyToRefund(orderInfo.order_id)">申请退款</van-button>
      </van-cell>
    </div>
    <!-- status4: 待评价/已评价 is_del===0 && paid===1 && refund_status===0 && status===3 -->
    <div slot="footer" v-if="orderInfo.paid === 1 && orderInfo.refund_status === 0 && orderInfo._status._type === 3" class="footer">
      <van-cell value-class="align-right">
        <van-button size="small" round @click.stop="linkToRemark(orderInfo.order_id)" type="default" class="orange-btn">去评价</van-button>
      </van-cell>
    </div>
    <!-- status5: 已完成 is_del===0 && paid===1 && refund_status===0 && status===4  -->
    <div slot="footer" v-if="orderInfo.paid === 1 && orderInfo.refund_status === 0 && orderInfo._status._type === 4" class="footer">
      <van-cell value-class="align-right">
        <div style="font-weight: 600; color: #f56723; padding: 10px 5px; font-size: 14px;">感谢您的评价！！！</div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Step, Steps, Cell, CellGroup, Button, Card } from 'vant'
import { isWeiXin, onBridgeReady, wxPay, h5Pay } from '../../../utilities/utilities'
import { store } from '../../../store/store'
import axios from 'axios'
export default {
  data () {
    return {
      active: 0,
      loading: false,
      // 订单描述
      orderHint: '',
      amount: 0,
      price: 0,
      originPrice: 0,
      title: '',
      src: '',
      addTimeYear: '',
      addTimeHour: '',
      oderDetail: {
        number: '',
        payTime: '',
        payStatus: '',
        payType: '',
        guestName: '',
        guestPhone: '',
        payTotal: '',
        price: 0,
        originPrice: 0,
        refundInfo: '',
        smsCode: []
      },
      orderInfo: {},
      key: '',
      copyBtn: null
    }
  },
  mounted: function () {
    let outTradeNo = this.$route.query.outTradeNo
    console.log(outTradeNo)
    let vm = this
    axios
      .get('/ebapi/user_api/get_order.html', {params: { uni: outTradeNo }})
      .then(response => {
        console.log(response.data.data)
        let result = response.data.data
        vm.orderInfo = result
        vm.addTimeYear = result.add_time_y
        vm.addTimeHour = result.add_time_h
        vm.active = result._status._type
        vm.amount = result.cartInfo[0].cart_num
        if (result.cartInfo[0].productInfo.attrInfo) {
          vm.price = result.cartInfo[0].productInfo.attrInfo.price
          vm.originPrice = result.cartInfo[0].productInfo.attrInfo.price
          vm.title = result.cartInfo[0].productInfo.store_name + '(' + result.cartInfo[0].productInfo.attrInfo.suk + ')'
          vm.src = result.cartInfo[0].productInfo.attrInfo.image
        } else {
          vm.price = result.cartInfo[0].productInfo.price
          vm.originPrice = result.cartInfo[0].productInfo.ot_price
          vm.title = result.cartInfo[0].productInfo.store_name
          vm.src = result.cartInfo[0].productInfo.image
        }
        vm.oderDetail.smsCode = result.smsCode
        vm.oderDetail.number = result.order_id
        vm.oderDetail.payTime = result._pay_time
        vm.oderDetail.payStatus = result._status._title
        vm.oderDetail.payType = result._status._payType
        vm.oderDetail.guestName = result.guest_name
        vm.oderDetail.guestPhone = result.guest_phone
        vm.oderDetail.payTotal = result.pay_price
        vm.oderDetail.price = result.total_price
        vm.oderDetail.refundInfo = Number(result.refund_commission) === 0 ? '暂不支持退货' : '支持退款'
        vm.key = response.data.data.unique
        vm.orderHint = result._status._msg
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
    onCopy: function () {
      this.$toast({
        message: '复制成功',
        type: 'success'
      })
    },
    onError: function () {
      this.$toast({
        message: '复制失败',
        type: 'error'
      })
    },
    payNow: function () {
      console.log('payNow')
      let vm = this
      let isWX = isWeiXin()
      let params = isWX ? {
        unique: vm.key,
        payType: 'weixin',
        payScene: 'js'
      } : {
        unique: vm.key,
        payType: 'weixin',
        payScene: 'h5'
      }
      if (isWX) {
        if (store.getters.userData.isMiniprogram) {
          this.$wx.miniProgram.navigateTo({url: '/pages/order_confirm/index?key=' + vm.key + '&redirectUrl=' + encodeURIComponent('https://shop.power-travel.com.cn/dist/index.html#/submit-order/pay-result')})
        } else {
          // 获取到调用支付接口所用到的数据
          wxPay(params, onBridgeReady)
        }
      } else {
        h5Pay(params)
      }
    },
    linkToRemark: function (orderId) {
      this.$router.push('/user-center/my-order/remark?orderId=' + orderId)
    },
    applyToRefund: function (orderId) {
      console.log(orderId)
      this.$dialog.confirm({
        title: '确认退款码？',
        message: '确认后将不能修改'
      }).then(() => {
        // on confirm
        axios
          .get('/ebapi/user_api/get_order.html', {params: { uni: orderId }})
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              let params = {
                text: '退款',
                refund_reason_wap_img: '',
                refund_reason_wap_explain: '',
                uni: res.data.data.unique
              }
              axios
                .post('/ebapi/auth_api/apply_order_refund.html', params, {
                  headers: {'Content-Type': 'application/x-www.form-urlencoded'}
                })
                .then(res => {
                  console.log(res)
                  if (res.data.code === 200) {
                    this.$toast.success('申请成功，请耐心等待')
                  } else {
                    this.$toast.fail(res.data.msg)
                  }
                })
                .catch(error => {
                  console.log(error)
                  this.$toast.fail('申请失败，请重试')
                })
            } else {
              this.$toast.fail('失败，请重试')
            }
          })
          .catch(error => {
            console.log(error)
            this.$toast.fail('失败，请重试')
          })
      }).catch(() => {
        // on cancel
      })
    }
  },
  components: {
    'van-steps': Steps,
    'van-step': Step,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-button': Button,
    'van-card': Card
  }
}
</script>

<style scoped>
  .card {
    width: 95%;
    margin: -10px 2.5% 10px;
    border-radius: 15px;
    box-shadow: 1px 1px 5px #eee;
  }
  .line {
    width: 100%;
    height: 1px;
    background-image: url("../../../assets/line.jpg");
    background-position: center;
    background-size: cover;
  }
  .item {
    margin-top: 10px;
  }
  .align-right {
    text-align: right;
  }
  .van-cell__title {
    flex: 1
  }
  .van-cell__value {
    flex: 2
  }
  .header {
    padding: 10px 16px 16px 16px;
    background: #ffd31c;
    color: #212121;
  }
  .header-item {
    display: inline-block;
    font-size: 14px;
  }
  .header-item.img {
    float: right;
  }
  .header-item.detail {
    float: left;
  }
  .detail {
    margin-left: 10px;
  }
  .detail div {
    margin-top: 5px;
  }
  .footer {
    display: block;
    width: 100%;
    position: fixed;
    bottom: 0
  }
</style>
