<template>
  <div style="padding: 10px 16px;" class="box">
    <div class="card">
      <div class="background"></div>
      <div class="content">
        <ul>
          <li>
            <van-icon name="manager-o" class="icon"></van-icon>
            <span>联系人：张小姐</span>
          </li>
          <li>
            <van-icon name="phone-o" class="icon"></van-icon>
            <span>联系电话：15819479501(微信同号)</span>
          </li>
          <li>
            <van-icon name="envelop-o" class="icon"></van-icon>
            <span>邮箱：123736863@qq.com</span>
          </li>
        </ul>
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
  .box {
    background-color: #fff;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .card {
    position: relative;
  }
  .background {
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px #9e9e9e;
    border-radius: 30px;
    background-image: url("../../../assets/business-card.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  @media only screen and (min-width: 361px) and (max-width: 480px) {
    .content {
      left: 30%;
      width: 70%;
    }
    .card {
      height: 200px;
    }
  }
  @media only screen and (max-width: 361px) {
    .content {
      left: 35%;
      width: 65%;
    }
    .card {
      height: 160px;
    }
  }
  .content {
    z-index: 2;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    padding: 25px 5px;
    font-size: 14px;
    color: #212121;
    text-shadow: 1px 1px -1px #0e0e0e;
  }
  li {
    padding: 5px 0;
  }
  li .icon {
    margin-right: 5px;
  }
  span {
    word-break: keep-all;
  }
</style>
