<template>
  <div class="remark">
    <div class="header orange">
      <span>有什么想对你购买的宝贝说的吗？</span>
    </div>
    <van-card
      v-if="productInfo.cartInfo"
      style="margin: 10px auto; border-top-left-radius: 0; border-top-right-radius: 0;"
      :num="productInfo.cartInfo[0].cart_num"
      :title="productInfo.cartInfo[0].productInfo.store_name"
      :desc="productInfo.cartInfo[0].productInfo.attrInfo ? productInfo.cartInfo[0].productInfo.attrInfo.suk : ''"
      :thumb="productInfo.cartInfo[0].productInfo.attrInfo ? productInfo.cartInfo[0].productInfo.attrInfo.image : productInfo.cartInfo[0].productInfo.image"
    >
      <div slot="price" style="display: block; float: none;text-align: right">
        <span class="price-color" style="font-size: 12px;"> ￥{{ productInfo.cartInfo[0].productInfo.price }}</span>
      </div>
    </van-card>
    <van-cell-group>
      <van-field
        v-model="message"
        label="商品评价 :"
        type="textarea"
        input-align="right"
        placeholder="有什么想要具体说明的吗？"
        rows="1"
        autosize
      />
      <van-cell
        title="商品评分 :"
        value-class="value-style"
        center
      >
        <div slot="default">
          <span>{{ prodDescribe }}</span>
          <van-rate
            v-model="prodRate"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
            @change="changeProdRate"
          >
          </van-rate>
        </div>
      </van-cell>
      <van-cell
        title="商家评分 :"
        value-class="value-style"
        center
      >
        <div slot="default">
          <span>{{ merchantDescribe }}</span>
          <van-rate
            v-model="merchantRate"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
            @change="changeMerchantRate"
          >
          </van-rate>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="footer clear">
      <van-button
        style="float: right"
        round size="small"
        type="default"
        class="orange-btn"
        :loading="loading"
        @click="submitRemark"
      >
        提交评价
      </van-button>
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Cell, Rate, Card, Button } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      message: '',
      prodRate: 5,
      merchantRate: 5,
      rateDescribe: [
        '',
        '很差',
        '一般般',
        '还可以',
        '好',
        '非常好'
      ],
      prodDescribe: '非常好',
      merchantDescribe: '非常好',
      productInfo: {},
      orderId: ''
    }
  },
  mounted: function () {
    let orderId = this.$route.query.orderId
    this.orderId = orderId
    console.log(orderId)
    axios
      .get('/ebapi/user_api/get_order.html', {params: { uni: orderId }})
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.productInfo = res.data.data
          this.orderId = res.data.data.cartInfo[0].unique
        } else {
          this.$toast('请求错误')
        }
      })
      .catch(error => {
        console.log(error)
        this.$toast('请求错误')
      })
  },
  methods: {
    changeProdRate: function (rate) {
      console.log(rate)
      this.prodRate = rate
      this.prodDescribe = this.rateDescribe[this.prodRate]
    },
    changeMerchantRate: function (rate) {
      console.log(rate)
      this.merchantRate = rate
      this.merchantDescribe = this.rateDescribe[this.merchantRate]
    },
    submitRemark: function () {
      let params = {
        comment: this.message,
        product_score: this.prodRate,
        service_score: this.merchantRate,
        pics: []
      }
      if (this.message.trim() === '') {
        this.$toast('请填写对商品的评价')
        return false
      }
      axios
        .post('/ebapi/user_api/user_comment_product.html?unique=' + this.orderId, params, {
          headers: {
            'Content-Type': 'x-www-form-urlencoded'
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$toast.success('评价成功')
            this.$router.replace('/user-center/my-order?orderType=4')
          } else {
            this.$toast.fail('失败，请重试')
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast.fail('失败, 请重试')
        })
    }
  },
  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-field': Field,
    'van-rate': Rate,
    'van-card': Card,
    'van-button': Button
  }
}
</script>

<style scoped>
  .header {
    padding: 10px 16px;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
  .footer {
    background: #fff;
    padding: 10px 16px;
    margin-top: 10px;
  }
  .value-style {
    flex: 2;
  }
</style>
