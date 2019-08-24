<template>
  <div class="my-order">
    <my-order-header
      :orderAmount="orderAmount"
      :consumptionSum="consumptionSum"
    >
    </my-order-header>
    <van-tabs
      color="#ffd31c"
      @click="onTabClick"
      v-model="active"
      style="margin: -30px auto 0; font-size: 14px;"
      :sticky="true"
      animated>
      <van-tab
        v-for="(item, index) in tabHeaderConfig"
        :key="index"
      >
        <!-- 自定义tab头 -->
        <div slot="title" style="text-align: center; font-size: 12px;">
          <span>
            {{ item.title }}
            <i style="color: #ffd31c; position: absolute; display: inline-block; top: -8px; right: 10px;"> {{ item.amount }}</i>
          </span>
        </div>
        <div v-if="item.isEmpty" class="empty">
          <div class="img">
          </div>
        </div>
        <van-list
          v-else
          v-model="item.loading"
          :error.sync="item.error"
          :immediate-check="item.immediateCheck"
          :finished="item.finished"
          :offset="offset"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 自定义订单头 -->
          <div v-for="(order, index) in item.list" :key="order.add_time" style="margin-top: 10px;">
            <div
              class="card-header clear"
              style="font-size: 13px; width: 96%; box-sizing: border-box; margin: 0 auto; border-top-left-radius: 15px; border-top-right-radius: 15px; box-shadow: 1px 1px 3px #ddd"
            >
              <div class="time">
                <span>{{ order._add_time }}</span>
              </div>
              <div class="status">
                <span>{{ order._status._title }}</span>
              </div>
            </div>
            <van-card
              style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;"
              :num="order.cartInfo[0].cart_num"
              :title="order.cartInfo[0].productInfo.store_name"
              :desc="order.cartInfo[0].productInfo.attrInfo ? order.cartInfo[0].productInfo.attrInfo.suk : ''"
              :thumb="order.cartInfo[0].productInfo.attrInfo ? order.cartInfo[0].productInfo.attrInfo.image : order.cartInfo[0].productInfo.image"
              @click="order.refund_status === 0 ? linkToDetail(order.order_id) : ''"
            >
              <div slot="price" style="display: block; float: none;text-align: right">
                <span class="price-color" style="font-size: 12px;"> ￥{{ order.cartInfo[0].productInfo.price }}</span>
              </div>
              <div slot="bottom" style="text-align: right; margin-top: 8px; font-size: 13px;">
                <span>共{{ order.cartInfo[0].cart_num }}件商品，总金额</span>
                <span class="price-color">￥{{(order.cartInfo[0].productInfo.price * order.cartInfo[0].cart_num).toFixed(2) }}</span>
              </div>
              <!-- 根据订单状态显示可操作的选项 -->
              <!-- status1: 待支付 is_del===0 && paid===0 && refund_status===0 && status===0 -->
              <div slot="footer" v-if="order.paid === 0 && order.refund_status === 0 && order._status._type === 0">
                <van-button size="small" round @click.stop="onCancel(index, order.order_id)">取消订单</van-button>
                <van-button size="small" round type="danger" class="orange-btn" @click.stop="onPayNow(order.unique)">
                  立即付款
                </van-button>
              </div>
              <!-- status2: 待确认 is_del===0 && paid===0 && refund_status===0 && status===0 -->
              <div slot="footer" v-if="order.paid === 1 && order.refund_status === 0 && order._status._type === 0">
                <van-button size="small" round @click.stop="applyToRefund(order.order_id)" v-if="Number(order.refund_commission) !== 0">申请退款</van-button>
              </div>
              <!-- status3: 待使用 is_del===0 && paid===1 && refund_status===0 && status===1 -->
              <div slot="footer" v-if="order.paid === 1 && order.refund_status === 0 && (order._status._type === 1 || order._status._type === 2)">
                <van-button size="small" round @click.stop="applyToRefund(order.order_id)" v-if="Number(order.refund_commission) !== 0">申请退款</van-button>
                <van-button size="small" round type="danger" class="orange-btn" @click.stop="showCode(order.smsCode)" v-if="order.smsCode.length > 0">
                  显示验票码
                </van-button>
              </div>
              <!-- status4: 待评价/已评价 is_del===0 && paid===1 && refund_status===0 && status===3 -->
              <div slot="footer" v-if="order.paid === 1 && order.refund_status === 0 && order._status._type === 3">
                <van-button size="small" round type="danger" @click.stop="showCode(order.smsCode)" v-if="order.smsCode.length > 0">
                  显示验票码
                </van-button>
                <van-button size="small" round @click.stop="linkToRemark(order.order_id)" class="orange-btn">去评价</van-button>
              </div>
              <!-- status5: 已完成 is_del===0 && paid===1 && refund_status===0 && status===4  -->
              <div slot="footer" v-if="order.paid === 1 && order.refund_status === 0 && order._status._type === 4">
                <div style="font-weight: 600; color: #f56723; padding: 10px 5px; font-size: 14px;">感谢您的评价！！！</div>
              </div>
              <!-- status6: 退款 is_del===0 && paid===1 && refund_status===【0,1,2】 && status=== 【0,1】  -->
              <div slot="footer" v-if="order.paid === 1 && order.refund_status !== 0">
                <div v-if="order.refund_status === 1" style="color: #D32F2F; padding: 10px 0;">退款中...</div>
                <div v-if="order.refund_status === 2" style="color: #388E3C; padding: 10px 0;">已退款</div>
              </div>
            </van-card>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Tabs, Tab, List, Card, Button} from 'vant'
import MyOrderHeader from './MyOrderHeader/MyOrderHeader'
import axios from 'axios'
export default {
  data () {
    return {
      active: this.$route.query.orderType,
      loading: false,
      offset: -15,
      listAdvanced: {
        unPayed: [],
        unShipped: [],
        unReceived: [],
        received: [],
        completed: []
      },
      orderAmount: 0,
      consumptionSum: 0,
      tabHeaderConfig: [
        {
          title: '待付款',
          amount: 0,
          list: [],
          error: false,
          loaded: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: 0,
            page: 1,
            limit: 10
          }
        },
        {
          title: '待确认',
          amount: 0,
          list: [],
          loaded: false,
          error: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: 1,
            page: 1,
            limit: 10
          }
        },
        {
          title: '待使用',
          amount: 0,
          list: [],
          loaded: false,
          error: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: 2,
            page: 1,
            limit: 10
          }
        },
        {
          title: '待评价',
          amount: 0,
          list: [],
          loaded: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: 3,
            page: 1,
            limit: 10
          }
        },
        {
          title: '已完成',
          amount: 0,
          list: [],
          loaded: false,
          error: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: 4,
            page: 1,
            limit: 10
          }
        },
        {
          title: '售后',
          amount: 0,
          list: [],
          loaded: false,
          error: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          isEmpty: false,
          params: {
            type: -3,
            page: 1,
            limit: 10
          }
        }
      ],
      type: 0
    }
  },
  created: function () {
    let type = this.$route.query.orderType
    switch (type) {
      case 0: // 待支付
        this.active = 0
        break
      case 1: // 待确认
        this.active = 1
        break
      case 2: // 待使用
        this.active = 2
        break
      case 3: // 待评价
        this.active = 3
        break
      case 4: // 已完成
        this.active = 4
        break
      case -3: // 售后
        this.active = 5
        break
    }
    this.tabHeaderConfig[this.active].immediateCheck = true
    this.configFormHead()
  },
  methods: {
    configFormHead: function () {
      axios
        .get('/ebapi/auth_api/get_order_data.html')
        .then(response => {
          let config = response.data.data
          this.tabHeaderConfig[0].amount = config.unpaid_count
          this.tabHeaderConfig[1].amount = config.unshipped_count
          this.tabHeaderConfig[2].amount = config.received_count
          this.tabHeaderConfig[3].amount = config.evaluated_count
          this.tabHeaderConfig[4].amount = config.complete_count
          this.tabHeaderConfig[5].amount = config.refund_count
          this.orderAmount = config.order_count
          this.consumptionSum = config.sum_price
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkToDetail: function (outTradeNo) {
      this.$router.push('/submit-order/order-step?outTradeNo=' + outTradeNo)
    },
    onLoad () {
      // 异步更新数据
      this.getData(this.active)
    },
    onTabClick (info) {
      if (this.tabHeaderConfig[info].loaded) {
        return false
      }
      this.getData(this.active)
    },
    getData (info) {
      axios
        .get('/ebapi/user_api/get_user_order_list.html', {params: this.tabHeaderConfig[info].params})
        .then(response => {
          if (response.data.code === 200) {
            let config = response.data
            this.tabHeaderConfig[info].list = this.tabHeaderConfig[info].list.concat(config.data)
            this.tabHeaderConfig[info].loaded = true
            this.tabHeaderConfig[info].loading = false
            this.tabHeaderConfig[info].params.page += 1
            if (config.data.length === 0) {
              this.tabHeaderConfig[info].isEmpty = true
            }
            if (config.data.length < 10) {
              this.tabHeaderConfig[info].finished = true
            }
          } else {
            this.$toast('获取数据异常')
          }
        })
        .catch(error => {
          console.log(error)
          this.tabHeaderConfig[info].error = true
        })
    },
    onCancel: function (index, orderId) {
      console.log('cancel')
      // /ebapi/auth_api/cancel_order.html
      let vm = this
      vm.tabHeaderConfig[0].cancelLoading = true
      this.cancelApi(orderId, function () {
        console.log(vm.tabHeaderConfig[0])
        vm.tabHeaderConfig[0].list.splice(index, 1)
        vm.configFormHead()
        vm.$toast({
          type: 'success',
          message: '取消成功'
        })
      })
    },
    onPayNow: function (outTradeNo) {
      this.$router.push('/submit-order/order-step?outTradeNo=' + outTradeNo)
    },
    cancelApi: function (orderId, callback) {
      let vm = this
      axios
        .post('/ebapi/auth_api/cancel_order.html', {order_id: orderId})
        .then(response => {
          console.log(response)
          if (response.data.code === 200) {
            callback()
          } else {
            vm.$toast({
              type: 'fail',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
          vm.$toast({
            type: 'fail',
            message: '错误，请重试'
          })
        })
    },
    linkToRemark: function (orderId) {
      this.$router.push('/user-center/my-order/remark?orderId=' + orderId)
    },
    applyToRefund: function (orderId) {
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
        // 关闭弹出框
      })
    },
    showCode: function (code) {
      let result = ''
      if (code.length > 0) {
        for (let item in code) {
          result = result + '\n' + '[ ' + code[item] + ' ]'
        }
      }
      this.$dialog.alert({
        title: '验证码',
        message: '<div style="font-size: 20px; color: #f56723; font-weight: 600;">' + result + '</div>'
      })
    }
  },
  components: {
    'my-order-header': MyOrderHeader,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List,
    'van-card': Card,
    'van-button': Button
  }
}
</script>

<style scoped>
  .my-order {
    padding-bottom: 16px;
  }

  .card-header {
    background: #fff;
    padding: 10px 16px;
    border-bottom: 1px solid #f7f7f7;
  }

  .time {
    width: 70%;
    display: inline-block;
    float: left;
  }

  .status {
    color: #D32F2F;
    width: 30%;
    display: inline-block;
    text-align: right;
    float: right;
  }

  .empty {
    height: 200px;
    padding: 10px 16px;
  }

  .empty .img {
    height: 200px;
    background-image: url("../../../assets/noOrder.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
