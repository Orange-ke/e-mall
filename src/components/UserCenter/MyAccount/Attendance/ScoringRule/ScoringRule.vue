<template>
  <div class="scoring-rule">
    <van-grid
      :column-num="rule.length"
      :border="false"
    >
      <van-grid-item
        v-for="(item,index) in rule"
        :key="index"
      >
      <div slot="default" class="item">
        <span :style="index === 6 ? 'background: #FFC107; padding: 2px 5px': ''">{{ item.day }}</span>
        <img src="../../../../../assets/stars1.png" width="80%" alt="img" v-if="index !== 6 && index < sign_num">
        <img src="../../../../../assets/stars2.png" width="80%" alt="img" v-else-if="index !== 6 && index >= sign_num">
        <img src="../../../../../assets/stars3.png" width="100%" alt="img" v-else-if="index === 6 && sign_num < 6">
        <img src="../../../../../assets/stars3.png" width="100%" alt="img" v-else-if="index === 6 && sign_num >= 6">
        <span class="point"> {{ '+' + item.sign_num }}</span>
      </div>
      </van-grid-item>
    </van-grid>
    <div style="text-align: center; margin-top: 16px;">
      <van-button style="padding-left: 50px; padding-right: 50px;" size="small" type="danger" round>签到</van-button>
    </div>
    <van-popup v-model="show" style="background: transparent;">
      <div class="outer">
        <div class="light">
        </div>
        <div class="background">
          <div>签到成功</div>
          <div>
            <van-button size="small" round style="background: #FF9800; color: #fff">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Grid, GridItem, Button, Popup } from 'vant'
export default {
  props: {
    show: { type: Boolean, default: false },
    rule: { type: Array, default: function () { return [] } },
    sign_num: { type: Number, default: 0 }
  },
  methods: {
  },
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-button': Button,
    'van-popup': Popup
  }
}
</script>

<style scoped>
  .scoring-rule {
    background: #fff;
    padding: 10px 0;
    margin:  -30px 10px 0;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 150px;
  }
  .item {
    text-align: center;
    font-size: 12px;
    color: #9E9E9E;
  }
  .item span {
    font-size: 10px;
    transform: scale(0.8);
    display: inline-block;
    border-radius: 10px;
    padding: 2px 0;
  }
  .item .point {
    font-size: 14px;
  }
  .outer {
    text-align: center;
    position: relative;
    width: 280px;
    height: 280px;
  }
  .light {
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 280px;
    background-image: url("../../../../../assets/light.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    animation: roll 20s linear .6s infinite normal backwards;
    -webkit-animation: roll 5s linear .6s infinite normal backwards;
  }
  @keyframes roll
  {
    from {transform: rotateZ(0deg)}
    to {transform: rotateZ(360deg)}
  }

  @-webkit-keyframes roll /*Safari and Chrome*/
  {
    from {transform: rotateZ(0deg)}
    to {transform: rotateZ(360deg)}
  }
  .background {
    position: absolute;
    top: 35px;
    left: 55px;
    background-image: url("../../../../../assets/register.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 170px;
    height: 190px;
  }
  .background div:nth-child(1) {
    color: #fff;
    margin-top: 80px;
  }
  .background div:nth-child(2) {
    margin-top: 30px;
  }
  .outer {
    overflow: hidden;
  }
</style>
