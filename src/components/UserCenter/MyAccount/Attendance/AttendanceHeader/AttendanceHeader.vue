<template>
  <div class="attendance-header clear">
    <div class="avatar">
      <img :src="src" alt="avatar">
    </div>
    <div class="info">
      <span class="name"> {{ name }} </span>
      <br />
      <span class="points"> 积分 {{ points }} </span>
    </div>
    <div class="detail" @click="linkToDetail">
      <span class="more">
        <van-icon name="bars" style="vertical-align: middle"></van-icon>
        <span>明细</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    src: { type: String, default: '' },
    points: { type: Number, default: 0 }
  },
  methods: {
    linkToDetail: function () {
      this.$router.push('/user-center/my-account/attendance/attendance-list')
    }
  }
}
</script>

<style scoped>
  .attendance-header {
    padding: 20px 16px 10px;
    height: 100px;
    background: #ffd31c;
  }
  .avatar {
    width: 60px;
    float: left;
    display: inline-block;
  }
  .avatar img {
    display: inline-block;
    width: 60px;
    border-radius: 60px;
    border: 2px solid beige;
  }
  .info {
    margin-top: 15px;
    margin-left: 10px;
    display: inline-block;
    color: #fff;
    float: left
  }
  .points {
    margin-top: 5px;
    font-size: 12px;
    display: inline-block;
    padding: 2px 8px;
    background: #FF9800;
  }
  .detail {
    font-size: 14px;
    display: inline-block;
    float: right;
  }
  .more {
    color: #FF9800;
    display: inline-block;
    padding: 5px 10px;
    margin-top: 18px;
    margin-right: -16px;
    background: #fff;
    border-radius: 15px 0 0 15px;
  }
</style>
