<template>
  <div class="bill-record">
    <van-grid :border="1===2" :column-num="2">
      <van-grid-item to="/user-center/my-account/attendance">
        <div slot="default" class="item clear" style="background: #fff6d1;" >
          <div class="info">
            <span style="font-size: .8em">签到领积分</span>
            <br />
            <span style="font-size: .7em">赚积分抵现金</span>
          </div>
          <div class="icon">
            <img src="../../../../assets/gift.png" />
          </div>
        </div>
      </van-grid-item>
      <van-grid-item to="/user-center/get-coupon">
        <div slot="default" class="item clear"  style="background: #fff3f3;">
          <div class="info">
            <span style="font-size: .8em">领取优惠券</span>
            <br />
            <span style="font-size: .7em">满减享优惠</span>
          </div>
          <div class="icon">
            <img src="../../../../assets/money.png" />
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
export default {
  methods: {
  },
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem
  }
}
</script>

<style scoped>
  .item {
    font-size: 100%;
    padding: 5px 8px;
    color: #D32F2F;
  }
  .item .info {
    width: 70%;
    display: inline-block;
    float: left;
  }
  .item .icon {
    width: 30%;
    height: 100%;
    display: inline-block;
    float: right;
  }
  .item .icon img {
    width: 100%;
  }
</style>
