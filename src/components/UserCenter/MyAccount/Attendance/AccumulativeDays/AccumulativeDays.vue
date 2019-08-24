<template>
  <div class="accumulative-days">
    <div class="conjunction"></div>
    <span class="title">已累计签到</span>
    <div class="list">
      <div
        class="item"
        v-for="(item,index) in sum_sign_day"
        :key="index">
        {{ item }}
      </div>
      <div>天</div>
    </div>
    <span class="hint">据说累计签到第七天可获得超额积分，一定要坚持签到哦~~~</span>
    <van-cell-group style="border-top: 1px dotted #ddd; margin-top: 16px;" :border="false">
      <van-cell
        style="text-align: left"
        center
        v-for="(item,index) in sign_detail"
        :key="index"
        :title="item.title"
        :value="'+' + item.number"
        value-class="price-color"
        :label="item.add_time" />
    </van-cell-group>
    <div class="more" @click="linkToDetail">
      <span style="font-size: 14px; vertical-align: middle;">
        点击加载更多
      </span>
      <van-icon name="arrow"></van-icon>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant'
export default {
  props: {
    sum_sign_day: {type: Array, default: function () { return [] }},
    sign_detail: {type: Array, default: function () { return [] }}
  },
  methods: {
    linkToDetail: function () {
      this.$router.push('/user-center/my-account/attendance/attendance-list')
    }
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .conjunction {
    z-index: 2;
    margin: -30px 16px 0;
    height: 30px;
    background-image: url("../../../../../assets/lock2.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .accumulative-days {
    z-index: 1;
    margin: 10px;
    border-radius: 10px;
    background: #fff;
    padding: 10px 15px;
    text-align: center;
  }
  .title, .hint {
    display: block;
    margin-top: 16px;
    font-size: 14px;
  }
  .list {
    display:flex;
    flex-wrap:wrap;
    align-items:flex-end;
    justify-content:center;
    box-sizing:border-box;
    margin:30px 0 35px 0;
  }
  .list .item {
    box-sizing:border-box;
    width:40px;
    height:50px;
    background-repeat:no-repeat;
    background-size:100% 100%;
    color:#fff;
    font-size: 25px;
    text-align:center;
    line-height:50px;
    margin-right:10px;
    background-image:url('../../../../../assets/redBg.png')
  }
  .more {
    padding: 10px 16px;
    border-top: 1px solid #ddd;
  }
</style>
