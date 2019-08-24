<template>
  <div class="user-center-header">
    <div class="info clear">
      <div class="permissionSet">
<!--        <van-icon name="setting-o"></van-icon>-->
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  components: {
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .user-center-header {
    height: 80px;
    background: #ffd31c;
  }
  .info {
    padding: 10px 16px;
    color: #fff;
  }
  .infoName span {
    line-height: 28px;
  }
  .permissionSet {
    display: inline-block;
    float: right;
    line-height: 60px;
  }
</style>
