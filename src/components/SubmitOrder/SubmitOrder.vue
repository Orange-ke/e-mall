<template>
  <div class="container">
    <div class="line"></div>
    <div style="margin-top: 10px;">
      <div class="order-header">
        <div class="amount">
          <span>共{{ amount }}件商品</span>
        </div>
        <van-card
          style="margin: 10px auto;padding: 10px 15px;"
          class="card"
          :num="amount"
          :price="price.toFixed(2)"
          :title="title"
          :desc="info"
          :thumb="src"
        >
        </van-card>
      </div>
      <!--  联系人信息  -->
      <van-cell-group>
        <van-field
          v-model="guestName"
          required
          clearable
          label="客人名"
          placeholder="必填"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="guestPhone"
          clearable
          label="联系方式"
          placeholder="必填，港澳手机须加区号"
          required
        />
      </van-cell-group>
      <!-- 优惠券 -->
      <van-coupon-cell
        class="submitItem"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />

      <!-- 优惠券列表 -->
      <van-popup
        v-model="showList"
        position="bottom"
        style="height: 100vh; overflow: hidden">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      <van-cell-group :border="false">
<!--        <van-cell-->
<!--          :border="false"-->
<!--          title-style="flex: 1"-->
<!--          title="积分抵扣"-->
<!--        >-->
<!--          <div slot="default">-->
<!--            <van-checkbox-->
<!--              v-model="checked"-->
<!--              label-position="left"-->
<!--            >-->
<!--              <span style="margin-left: auto;">当前积分</span>-->
<!--              <span style="color: #D32F2F;margin-left: auto;">{{ points }}</span>-->
<!--            </van-checkbox>-->
<!--          </div>-->
<!--        </van-cell>-->
        <van-cell
          :border="false"
          title="快递费用"
          value="免运费"
        >
        </van-cell>
        <van-field
          v-model="message"
          label="留言"
          type="textarea"
          input-align="right"
          placeholder="请输入留言"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="payment submitItem">
        <div class="payment-header">
          <span>支付方式</span>
        </div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="微信支付" label="微信快捷支付" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" checked-color="#ffd31c" />
              <div slot="icon">
                <svg t="1563863116028" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1145" width="40" height="40"><path d="M571.648 511.94c-10.257 0-20.517 9.525-20.517 21.25 0 9.527 10.255 19.053 20.517 19.053 15.393 0 26.385-9.527 26.385-19.053 0-11.724-10.99-21.25-26.385-21.25v0zM504.225 413c16.123 0 26.385-10.257 26.385-25.651 0-16.123-10.261-25.649-26.385-25.649-15.39 0-30.048 9.527-30.048 25.649-0.001 15.396 14.659 25.651 30.048 25.651v0zM512.287 62.492c-248.427 0-449.813 201.386-449.813 449.813 0 248.425 201.386 449.812 449.813 449.812 248.425 0 449.812-201.386 449.812-449.812 0.001-248.427-201.385-449.813-449.812-449.813v0zM427.275 626.265c-27.119 0-46.906-4.394-72.556-11.725l-74.019 37.38 21.257-63.031c-52.035-36.64-82.818-82.811-82.818-139.243 0-99.67 93.808-175.889 208.137-175.889 101.135 0 191.279 60.097 208.867 145.113-7.328-1.469-13.926-2.199-19.788-2.199-99.67 0-176.619 74.75-176.619 164.894 0 15.388 2.199 29.313 5.863 43.972-5.863 0.728-12.461 0.728-18.324 0.728v0zM732.882 698.085l14.655 52.77-55.697-31.512c-21.252 4.394-41.773 10.99-63.025 10.99-98.206 0-175.889-67.422-175.889-150.968 0-83.547 77.685-150.97 175.889-150.97 93.072 0 176.619 67.423 176.619 150.97 0 46.9-31.512 88.673-72.552 118.721v0zM359.117 361.7c-15.39 0-31.512 9.527-31.512 25.649 0 15.395 16.122 25.656 31.512 25.656 14.66 0 26.385-10.261 26.385-25.656 0-16.122-11.725-25.649-26.385-25.649v0zM686.712 511.94c-10.995 0-20.522 9.525-20.522 21.25 0 9.527 9.527 19.053 20.522 19.053 14.655 0 25.649-9.527 25.649-19.053 0-11.724-10.994-21.25-25.649-21.25v0zM686.712 511.94z" p-id="1146" fill="#1afa29"></path></svg>
              </div>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <order-detail
        class="submitItem"
        :totalPrice="price * amount"
        :shipCost="shipCost"
      >
      </order-detail>
      <van-submit-bar
        :loading="submitBtnLoading"
        :price="(amount * price - couponDeduction) * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { CouponCell, CouponList, Popup, CellGroup, Cell, Field, Checkbox, CheckboxGroup, RadioGroup, Radio, SubmitBar, Card, Stepper } from 'vant'
import GuestProfile from './GuestProfile/GuestProfile'
import PaymentMethod from './PaymentMethod/PaymentMethod'
import OrderDetail from './OrderDetail/OrderDetail'
import { isWeiXin, onBridgeReady, wxPay, h5Pay } from '../../utilities/utilities'
import { store } from '../../store/store'
import axios from 'axios'
// const coupon = {
//   available: 1,
//   condition: '无使用门槛\n最多优惠12元',
//   reason: '',
//   value: 150,
//   name: '优惠券名称',
//   startAt: 1489104000,
//   endAt: 1514592000,
//   valueDesc: '1.5',
//   unitDesc: '元'
// }

export default {
  data () {
    return {
      // overlay
      submitBtnLoading: false,
      // 商品配置
      amount: 0,
      price: 0,
      title: '',
      info: '',
      src: '',
      // 联系人信息
      guestName: '',
      guestPhone: '',
      // 商品价格信息
      shipCost: 0,
      // 优惠券信息
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      couponDeduction: 0,
      // 支付方式
      checked: false,
      radio: '1',
      // 积分
      points: 0,
      // 留言
      message: '',
      // key
      key: ''
    }
  },
  mounted: function () {
    let params = {
      cartId: this.$route.query.cartId
    }
    let vm = this
    axios
      .post('/ebapi/auth_api/confirm_order.html', params)
      .then(response => {
        let config = response.data
        console.log(config)
        if (config.code === 400) {
          vm.$toast('页面已过期，请重新确认购买')
          vm.$router.back()
          return false
        }
        if (config.data.cartInfo) {
          if (config.data.cartInfo[0].productInfo.attrInfo) {
            vm.price = Number(config.data.cartInfo[0].productInfo.attrInfo.price)
            vm.info = config.data.cartInfo[0].productInfo.attrInfo.suk
            vm.src = config.data.cartInfo[0].productInfo.attrInfo.image
          } else {
            vm.price = Number(config.data.cartInfo[0].productInfo.price)
            vm.src = config.data.cartInfo[0].productInfo.image
          }
          vm.title = config.data.cartInfo[0].productInfo.store_name
          vm.amount = config.data.cartInfo[0].cart_num
          vm.shipCost = Number(config.data.cartInfo[0].productInfo.postage)
          vm.key = config.data.orderKey
        } else {
          console.log('无商品')
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
      console.log(this.coupons[index])
      if (this.coupons[index]) {
        this.couponDeduction = Number(this.coupons[index].valueDesc)
      } else {
        this.couponDeduction = 0
      }
    },
    onExchange (code) {
      // if (code === '888888888888888888888') {
      //   this.coupons.push(coupon)
      // } else {
      this.$toast('验证码错误')
      // }
    },
    onSubmit: function () {
      let vm = this
      vm.confirmOrder(function () {
        console.log('购买')
        let isWX = isWeiXin()
        const params2 = isWX ? {
          unique: vm.key,
          payType: 'weixin',
          payScene: 'js'
        } : {
          unique: vm.key,
          payType: 'weixin',
          payScene: 'h5'
        }
        if (isWX) {
          wxPay(params2, onBridgeReady)
        } else {
          h5Pay(params2)
        }
      })
    },
    confirmOrder: function (payBill) {
      let vm = this
      let guestName = this.guestName.trim()
      let guestPhone = this.guestPhone.trim()
      let key = this.key
      // 校验
      if (guestName === '') {
        this.$toast('请输入您的名称')
        return false
      }
      if (guestPhone === '') {
        this.$toast('请输入您的手机号码')
        return false
      }
      if (!(/^[1][3-9]\d{9}$|^[0][0][8][5][2|3][6|9]\d{6,7}$/.test(guestPhone))) {
        this.$toast('请输入正确的电话号码')
        return false
      }
      let params = {
        addressId: 0,
        couponId: 0,
        formId: '',
        guestMail: '',
        guestName: guestName,
        guestPhone: guestPhone,
        mark: '',
        payType: 'weixin',
        pinkId: 0,
        useIntegral: false
      }
      this.submitBtnLoading = true
      axios
        .post('/ebapi/auth_api/create_order.html?key=' + key, params)
        .then(response => {
          if (response.data.code === 200) {
            console.log(response.data)
            this.submitBtnLoading = false
            // 跳转到小程序中支付
            // 判断是否是小程序环境
            if (store.getters.userData.isMiniprogram) {
              this.$wx.miniProgram.navigateTo({url: '/pages/order_confirm/index?key=' + key + '&redirectUrl=' + encodeURIComponent('https://shop.power-travel.com.cn/dist/index.html#/submit-order/pay-result')})
            } else {
              // 获取到调用支付接口所用到的数据
              payBill()
            }
          } else {
            this.submitBtnLoading = false
            if (response.config.timeout === 1) {
              vm.$toast('订单页面超时，请刷新页面')
            }
          }
          // 订单提交错误
          // 订单超时
          // 订单提交成功
        })
        .catch(error => {
          vm.$toast('异常，请重试')
          console.log(error)
          if (store.getters.userData.uid === 1337 || store.getters.userData.uid === 213 || store.getters.userData.uid === 74) {
          }
          this.submitBtnLoading = false
        })
        .finally(() => { this.submitBtnLoading = false })
    }
  },
  components: {
    'van-coupon-cell': CouponCell,
    'van-coupon-list': CouponList,
    'van-popup': Popup,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-field': Field,
    'van-checkbox': Checkbox,
    'van-checkbox-group': CheckboxGroup,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-submit-bar': SubmitBar,
    'guest-profile': GuestProfile,
    'payment-method': PaymentMethod,
    'order-detail': OrderDetail,
    'van-card': Card,
    'van-stepper': Stepper
  }
}
</script>

<style scoped>
  .line {
    width: 100%;
    height: 1px;
    background-image: url("../../assets/line.jpg");
    background-position: center;
    background-size: cover;
  }
  .submitItem {
    margin-top: 10px;
  }
  .van-contact-card::before {
    background: #fff;
  }
  .payment-header {
    border-bottom: 1px solid #f7f7f7;
    padding: 10px 15px;
    font-size: 15px;
    background: #fff;
  }
  .amount {
    border-bottom: 1px solid #f7f7f7;
    padding: 10px 15px;
    font-size: 14px;
  }
  .order-header {
    background: #fff;
  }
  .van-card__thumb {
    width: 60px;
    height: 60px;
  }
  .van-card__content {
    min-height: 60px;
  }
  .van-submit-bar__button {
    background: #ffd31c;
    color: #212121;
    border: 1px solid #ffd31c;
  }
</style>
