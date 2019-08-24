<template>
  <div class="comment">
    <div class="clear">
      <img :src="src" />
      <span> {{ name }} </span>
      <span> {{ time }} </span>
    </div>
    <div>
      <p v-if="comment"> {{ comment }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: '' },
    name: { type: String, default: '' },
    time: { type: String, default: '' },
    comment: { type: String, default: '' }
  }
}
</script>

<style scoped>
  .comment {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 5px 15px;
    width: 96%;
    box-sizing: border-box;
    margin: 0 auto;
    font-size: 14px;
    background: #fff;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 1px 1px 3px #ddd;
  }
  img {
    display: inline-block;
    float: left;
    width: 50px;
    border-radius: 50px;
  }
  span {
    display: inline-block;
    line-height: 50px;
  }
  span:nth-child(2) {
    float: left;
    margin-left: 5px;
  }
  span:nth-child(3) {
    float: right;
  }
</style>
