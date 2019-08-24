<template>
  <div class="my-order-header clear">
    <div class="detail">
      <h3 style="margin: 0 0 10px 0">订单信息</h3>
      <span>消费订单:</span><span>{{ orderAmount }}单 </span>
      <span>总消费:</span><span>{{ consumptionSum }}元 </span>
    </div>
    <div class="img">
      <img width="80%" src="../../../../assets/orderTime.png" alt="订单">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderAmount: { type: Number, default: 0 },
    consumptionSum: { type: Number, default: 0 }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      console.log(this.type)
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped>
  .my-order-header {
    font-size: 14px;
    padding: 10px 16px;
    height: 100px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f79621+2,f9c667+99 */
    background: #f79621; /* Old browsers */
    background: -moz-linear-gradient(top,  #f79621 2%, #f9c667 99%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #f79621 2%,#f9c667 99%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #f79621 2%,#f9c667 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79621', endColorstr='#f9c667',GradientType=0 ); /* IE6-9 */
    color: #fff;
  }
  .detail {
    width: 70%;
    display: inline-block;
    float: left;
  }
  .img {
    text-align: right;
    width: 30%;
    display: inline-block;
    float: right;
  }
</style>
