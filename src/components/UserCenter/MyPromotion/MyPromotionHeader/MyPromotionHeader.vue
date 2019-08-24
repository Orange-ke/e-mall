<template>
  <div class="my-promotion-header">
    <div class="main item">
      <span class="main-title">可提现</span>
      <br />
      <span class="main-value">{{ balance.toFixed(2) }}</span>
      <div class="more sub-title" @click="linkToWithdrawList">
        <span style="vertical-align: middle">提现记录</span>
        <van-icon name="arrow" style="vertical-align: middle"></van-icon>
      </div>
    </div>
    <div class="sub item clear">
      <div>
        <span class="sub-title">累计收入</span>
        <br />
        <span class="sub-value">{{ totalCommisionWithFeture.toFixed(2) }}</span>
      </div>
      <div>
        <span class="sub-title">待提现</span>
        <van-icon name="question-o" @click="showHint" />
        <br />
        <span class="sub-value">{{ canWithdrawInFeture.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  props: {
    balance: { type: Number, default: 0 },
    totalCommisionWithFeture: { type: Number, default: 0 },
    canWithdrawInFeture: { type: Number, default: 0 }
  },
  methods: {
    linkToWithdrawList: function () {
      this.$router.push('/user-center/my-promotion/withdraw-list')
    },
    showHint: function () {
      console.log('showHint')
      this.$dialog.alert({
        title: '待提现状态说明',
        message: '该收入将在订单已消费后可提现，具体情况请查看收入明细。',
        confirmButtonText: '我知道了',
        messageAlign: 'left'
      })
    }
  },
  components: {
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .my-promotion-header {
    height: 200px;
    text-align: center;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f79621+2,f9c667+99 */
    background: #f79621; /* Old browsers */
    background: -moz-linear-gradient(top,  #f79621 2%, #f9c667 99%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #f79621 2%,#f9c667 99%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #f79621 2%,#f9c667 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79621', endColorstr='#f9c667',GradientType=0 ); /* IE6-9 */
    color: #fff;
    font-size: 12px;
  }
  .item {
    box-sizing: border-box;
    padding-top: 15px;
  }
  .main {
    position: relative;
  }
  .main-title {
    display: inline-block;
    margin-top: 10px;
    font-size: 15px;
  }
  .main-value {
    display: inline-block;
    margin-top: 10px;
    font-size: 30px;
  }
  .more {
    display: inline-block;
    position: absolute;
    right: 5px;
    top: 28px;
  }
  .sub {
    margin-top: 30px;
   }
  .sub div {
    display: inline-block;
  }
  .sub div:nth-child(1) {
    float: left;
    margin-left: 5%;
  }
  .sub div:nth-child(2) {
    float: right;
    margin-right: 5%;
  }
  .sub span {
    display: inline-block;
    margin-top: 8px;
  }
</style>
