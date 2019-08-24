<template>
  <div class="container">
    <user-center-header />
    <my-remain
      :src="userData.avatar"
      :name="userData.nickname"
      :id="userData.uid"
      :colConfig="myRemain"
      :level="userData.level"
      :showSave="userData.showSave"
    >
    </my-remain>
    <my-panel
      :column="myOrder.columnNum"
      :border="border"
      :title="myOrder.title"
      :is-link="myOrder.isLink"
      :value="myOrder.text"
      :items="myOrder.orderItems"
      :to="myOrder.to"
    >
    </my-panel>
    <!--  我的服务  -->
    <service-panel></service-panel>
    <!-- 系统升级提示--待去除 -->
    <div style="text-align: justify; padding: 10px 16px; font-size: 14px;">
      <div style="padding: 10px 16px; background: #fff">
        温馨提示: 亲爱的用户，由于前段时间系统升级，部分用户存在ID重复的问题，如发现，请及时联系大象客服。为此带来的不便我们深感抱歉!
      </div>
    </div>
    <img class="footerImg" src="../../assets/support.png" />
  </div>
</template>

<script>
import { Cell, Icon } from 'vant'
import UserCenterHeader from './UserCenterHeader/UserCenterHeader'
import MyRemain from './MyRemain/MyRemain'
import MyPanel from './MyPanel/MyPanel'
import ServicePanel from './MyPanel/ServicePanel'
import { store } from '../../store/store'
import axios from 'axios'
export default {
  data () {
    return {
      show: false,
      loading: true,
      userData: this.$store.getters.userData,
      border: false,
      myRemain: [
        { title: '累计收入',
          value: '0',
          style: '',
          to: ''
        },
        {
          title: '可提现',
          value: '0',
          style: '',
          to: ''
        },
        { title: '待提现',
          value: '0',
          style: '',
          to: ''
        }
      ],
      myOrder: {
        columnNum: 5,
        isLink: true,
        title: '我的订单',
        text: '全部订单',
        to: {path: '/user-center/my-order', query: { orderType: 0 }},
        orderItems: [
          {icon: 'icon_1', text: '待付款', amount: 0, to: {path: '/user-center/my-order', query: { orderType: 0 }}},
          {icon: 'icon_2', text: '待确认', amount: 0, to: {path: '/user-center/my-order', query: { orderType: 1 }}},
          {icon: 'icon_5', text: '待使用', amount: 0, to: {path: '/user-center/my-order', query: { orderType: 2 }}},
          {icon: 'icon_3', text: '待评价', amount: 0, to: {path: '/user-center/my-order', query: { orderType: 3 }}},
          {icon: 'icon_4', text: '售后', amount: 0, to: {path: '/user-center/my-order', query: { orderType: -3 }}}
        ]
      }
    }
  },
  mounted: function () {
    let vm = this
    this.userData = store.getters.userData
    this.initOrder(function (config) {
      vm.myOrder.orderItems[0].amount = config.unpaid_count
      vm.myOrder.orderItems[1].amount = config.unshipped_count
      vm.myOrder.orderItems[2].amount = config.received_count
      vm.myOrder.orderItems[3].amount = config.evaluated_count
      vm.myOrder.orderItems[4].amount = config.refund_count
    }, function (error) {
      vm.$toast.fail(error)
    })
    this.initMyRemain(function (res) {
      vm.myRemain[0].value = res.totalCommisionWithFeture
      vm.myRemain[1].value = res.balance
      vm.myRemain[2].value = res.canWithdrawInFeture
    }, function (error) {
      vm.$toast.fail(error)
    })
  },
  methods: {
    initOrder: function (success, fail) {
      // 初始化订单数量
      axios
        .get('/ebapi/auth_api/get_order_data.html')
        .then(res => {
          if (res.data.code === 200) {
            success(res.data.data)
          }
        })
        .catch(error => {
          console.log(error)
          fail(error)
        })
    },
    initMyRemain: function (success, fail) {
      // 初始化个人中心头部信息（累计收入，可提现金额，待提现金额）
      axios
        .get('/api/Withdraw/getCommisionInfo')
        .then(res => {
          if (res.data.code === 200) {
            success(res.data.data)
          }
        })
        .catch(error => {
          console.log(error)
          fail(error)
        })
    }
  },
  components: {
    'user-center-header': UserCenterHeader,
    'my-remain': MyRemain,
    'my-panel': MyPanel,
    'service-panel': ServicePanel,
    'van-cell': Cell,
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .footerImg {
    display: block;
    width: 150px;
    height: 50px;
    margin: 10px auto;
  }
  .van-dialog__message {
    text-align: left;
  }
</style>
