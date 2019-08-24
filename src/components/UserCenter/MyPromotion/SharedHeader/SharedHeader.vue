<template>
  <div class="withdraw-header clear">
    <div class="detail">
      <span class="title">{{ title }}</span>
      <br />
      <span class="value">{{ isCurrency ? '￥' : '' }}{{ amount }}</span>
      <span>{{ unit }}</span>
    </div>
    <div class="icon">
      <svg t="1562829756864" class="icon" viewBox="0 0 1204 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21337" width="64" height="64"><path :d="svg" p-id="21338" fill="#ffffff"></path></svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    isCurrency: { type: Boolean, default: false },
    unit: { type: String, default: '' },
    svg: { type: String, default: '' }
  },
  methods: {
    onLoad: function () {
      // 异步更新数据
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
  },
  components: {
  }
}
</script>

<style scoped>
  .withdraw-header {
    background: #f79621; /* Old browsers */
    background: -moz-linear-gradient(top,  #f79621 2%, #f9c667 99%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #f79621 2%,#f9c667 99%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #f79621 2%,#f9c667 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79621', endColorstr='#f9c667',GradientType=0 ); /* IE6-9 */
    height: 120px;
    padding: 10px 16px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
  }
  .detail {
    margin-top: 20px;
    display: inline-block;
    float: left;
  }
  .value {
    display: inline-block;
    margin-top: 8px;
    font-size: 25px;
  }
  .icon {
    margin-top: 8px;
    display: inline-block;
    float: right;
  }
</style>
