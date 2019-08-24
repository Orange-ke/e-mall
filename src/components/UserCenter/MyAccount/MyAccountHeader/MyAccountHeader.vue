<template>
  <div class="my-account-header">
    <div class="total">
      <span class="title">总资产(元)</span>
      <br />
      <span class="value"> {{ total.toFixed(2) }} </span>
    </div>
    <div class="accumulate">
      <div>
        <span  class="title">累计充值(元)</span>
        <br />
        <span  class="value"> {{ recharge }} </span>
      </div>
      <div>
        <span  class="title">累计消费(元)</span>
        <br />
        <span  class="value"> {{ consume }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {type: Number, default: 0},
    recharge: {type: Number, default: 0},
    consume: {type: Number, default: 0}
  }
}
</script>

<style scoped>
  .my-account-header {
    box-sizing: border-box;
    padding: 16px 20px;
    height: 200px;
    background-image: url("../../../../assets/数据.jpg");
    background-repeat:no-repeat;
    background-size: cover;
    width:100%;
    color: #fff;
    border-radius: 10px;
  }
  .title {
    font-size: .8em;
    color: #ddd;
  }
  .total, .accumulate {
    padding: 15px 0;
  }
  .total .value {
    display: inline-block;
    margin-top: 8px;
    font-size: 35px;
  }
  .accumulate div {
    display: inline-block;
    width: 50%;
    float: right;
  }
  .accumulate .value {
    display: inline-block;
    margin-top: 5px;
  }
</style>
