<template>
  <div  class="product-tricks" >
    <div class="header">
      商品详情
    </div>
    <div v-html="html" class="body">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    html: {type: String, default: ''}
  }
}
</script>

<style scoped>
  .product-tricks {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    padding: 10px 16px;
    overflow-x: hidden;
  }
  .header {
    padding: 10px 0;
    border-bottom: 1px solid #ffd31c;
    font-size: 14px;
  }
</style>
