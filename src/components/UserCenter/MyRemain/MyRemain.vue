<template>
  <div class="my-remain">
    <div class="info clear">
      <div style="display: inline-block; position: relative;">
        <span :class="'level level' + level">Lv{{ level }}</span>
        <img class="infoImg" v-lazy="src">
      </div>
      <div class="infoName">
        <span class="bold"> {{ name }}</span>
        <br />
        <span class="infoSet">
          <span style="font-size: 13px; vertical-align: middle;">ID: {{ id }} </span>
<!--          <van-icon-->
<!--            name="edit"-->
<!--            style="font-size: 15px; vertical-align: middle;"-->
<!--            @click="linkToSetUserInfo"-->
<!--          >-->
<!--          </van-icon>-->
        </span>
      </div>
      <van-button size="small" type="default" round class="float-btn-right" @click="linkToWithdraw" v-if="showSave">
        <div class="flex-two">
          <svg t="1566267048934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2133" width="16" height="16"><path d="M908.4 608.2c-31-111.5-97.3-197.6-200.9-256.2-11.9-6.7-24.5-12.3-36.8-18.5 0.1-0.2 0.1-0.5 0.4-0.7l6.3-5.7c21.3-19.7 40.5-42.4 50.5-69.3 4.9-13 6.1-18.7 9.4-30.8 6.3-38.2-0.9-61.4-24.4-80.6-31.8-26.1-67.8-29.1-105.8-13.9-2.6 1.1-4.4 1.8-7-0.6-49-44.7-127.6-45.1-177-1-2.3 2.1-4 2.6-7 1.3-20-8.9-40.9-10.8-62.4-6.5-40.7 8.1-74.4 41.5-68.4 87.2 5.2 39.6 21.1 73.8 48.5 103.4 5.6 6.1 11.6 11.8 17.7 18l-4.5 2.1c-140 61.8-234.6 196.1-245.7 348.8-3.1 42.2-0.5 84 10.5 125.5 17.3 65.2 76.8 114.1 148.1 113.9 168.2-0.4 336.4 0 504.7-0.2 54-0.1 95.6-23.5 125.8-66.1 15.3-21.7 22.5-46.3 26.7-72.1 9.6-59.9 7.6-119.4-8.7-178z m-292.5-96.7l-80.8 80.8h60.1c9.2 0 16.7 7.5 16.7 16.7s-7.5 16.7-16.7 16.7h-65.7l-1.3 1.3v32.2h67c9.2 0 16.7 7.5 16.7 16.7s-7.5 16.7-16.7 16.7h-67v50.3c0 9.2-7.5 16.7-16.7 16.7s-16.7-7.5-16.7-16.7v-50.3h-67c-9.2 0-16.7-7.5-16.7-16.7s7.4-16.7 16.7-16.7h67V627l-1.3-1.3h-65.7c-9.2 0-16.7-7.5-16.7-16.7s7.4-16.7 16.7-16.7h59.9L407 511.7l0.3-0.3c-3.4-3.1-5.5-7.5-5.5-12.2 0-5.9 3.2-11.4 8.3-14.3 5.1-3 11.4-3 16.5 0 1.5 0.9 2.8 2 3.9 3.3l0.2-0.2 80.8 80.7 80.9-80.9 0.3 0.3c1-1 2.2-2 3.5-2.7 5.1-2.9 11.4-2.9 16.5 0 5.1 3 8.3 8.4 8.3 14.3-0.1 4.6-2 8.8-5.1 11.8z" fill="#333333" p-id="2134"></path></svg>
          <span class="margin-left">立即提现</span>
        </div>
      </van-button>
<!--      <van-button size="small" type="default" round class="float-btn-left" @click="linkToRankList" v-if="showSave">-->
<!--        <div class="flex-two">-->
<!--          <svg t="1566351671457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1937" width="14" height="14"><path d="M921.6 119.466667h-34.133333V85.333333a68.266667 68.266667 0 0 0-68.266667-68.266666H204.8a68.266667 68.266667 0 0 0-68.266667 68.266666v34.133334H102.4c-56.4736 0-102.4 45.9264-102.4 102.4v68.266666c0 56.4736 45.9264 102.4 102.4 102.4h34.133333c0 195.003733 150.6816 356.437333 341.333334 373.828267V870.4h-95.812267a34.133333 34.133333 0 0 0-31.965867 22.152533l-25.6 68.266667A34.133333 34.133333 0 0 0 356.4544 1006.933333h311.0912a34.133333 34.133333 0 0 0 31.965867-46.114133l-25.6-68.266667A34.133333 34.133333 0 0 0 641.9456 870.4H546.133333v-104.0384C736.785067 748.970667 887.466667 587.537067 887.466667 392.533333h34.133333c56.4736 0 102.4-45.9264 102.4-102.4v-68.266666c0-56.456533-45.9264-102.4-102.4-102.4zM102.4 324.266667c-18.824533 0-34.133333-15.3088-34.133333-34.133334v-68.266666c0-18.824533 15.3088-34.133333 34.133333-34.133334h34.133333v136.533334H102.4z m541.713067-1.706667l-55.0912 56.32 12.424533 77.346133a15.530667 15.530667 0 0 1-14.728533 20.4288h-0.2048a16.213333 16.213333 0 0 1-7.2192-1.7408l-67.4304-37.512533-67.396267 37.0688a15.530667 15.530667 0 1 1-22.801067-16.128l13.141334-79.752533-54.954667-56.541867a15.394133 15.394133 0 0 1-3.584-15.752533 15.36 15.36 0 0 1 12.373333-10.410667l75.502934-11.3664 33.9968-72.0384a15.547733 15.547733 0 0 1 28.142933 0.068267l33.723733 72.2432 75.383467 11.605333c5.751467 0.853333 10.478933 4.864 12.3392 10.4448a15.428267 15.428267 0 0 1-3.618133 15.7184zM955.733333 290.133333c0 18.824533-15.3088 34.133333-34.133333 34.133334h-34.133333v-136.533334h34.133333c18.824533 0 34.133333 15.3088 34.133333 34.133334v68.266666z" fill="#040000" p-id="1938"></path></svg>-->
<!--          <span class="margin-left">收入排名</span>-->
<!--        </div>-->
<!--      </van-button>-->
    </div>
    <van-row style="padding: 10px 0; position: relative;" v-if="showSave">
      <van-col
        span="8"
        v-for="(item,index) in colConfig"
        :key="index"
        :style="item.style"
      >
        <div @click="linkToPage(item.to)" style="position: relative">
          <div v-if="index === 1" style="border-left: 1px solid #9e9e9e; position: absolute; top: 30%; left: 0; height: 25px;"></div>
          <span class="title"> {{ item.title }} </span>
          <br />
          <span> {{ item.value }} </span>
          <div v-if="index === 1" style="border-right: 1px solid #9e9e9e; position: absolute; top: 30%; right: 0; height: 25px;"></div>
        </div>
      </van-col>
      <van-icon name="question-o" @click="showHint" class="setPosition" />
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Icon, Button } from 'vant'
export default {
  props: {
    level: { type: Number, default: 0 },
    src: { type: String, default: '' },
    name: { type: String, default: '' },
    id: { type: Number, default: null },
    showSave: {type: Boolean, default: false},
    colConfig: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    linkToSetUserInfo: function () {
      this.$router.push('/user-center/set-user-info')
    },
    linkToPage: function (path) {
      this.$router.push(path)
    },
    linkToWithdraw: function () {
      this.$router.push('/user-center/my-promotion/to-withdraw')
    },
    linkToRankList: function () {
      this.$router.push('/user-center/rank-list')
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
    'van-row': Row,
    'van-col': Col,
    'van-icon': Icon,
    'van-button': Button
  }
}
</script>

<style scoped>
  .my-remain {
    margin: -40px 16px 10px 16px;
    background: #fff;
    border-radius: 30px;
    box-shadow: 1px 1px 5px #eee;
    text-align: center;
  }
  span {
    line-height: 30px;
  }
  .title {
    font-size: 13px;
    color: #9E9E9E;
  }
  .info {
    padding: 10px 16px;
    color: #212121;
    position: relative;
  }
  .infoImg {
    margin-top: -40px;
    width: 60px;
    border-radius: 50px;
  }
  .infoName {
    margin-left: 10px;
  }
  .infoName span {
    line-height: 28px;
  }
  .bold {
    font-size: 1.2em;
  }
  .infoSet {
    margin-left: 5px;
    font-size: 0.9em;
    color: #aaa;
  }
  .level {
    top: -70%;
    left: 90%;
    background: #9E9E9E;
    border-radius: 20px;
    line-height: 12px;
    display: inline-block;
    padding: 2px;
    color: #fff;
    position: absolute;
    font-size: 12px;
  }
  .level1 {
    background: #ffd31c;
  }
  .flex-two {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .float-btn-right {
    background: #ffd31c;
    position: absolute;
    top: 55px;
    right: 20px;
  }
  .float-btn-left {
    background: #ffd31c;
    position: absolute;
    top: 55px;
    left: 20px;
  }
  .setPosition {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    right: 15px;
  }
  .margin-left {
    margin-left: 2px;
  }
</style>
