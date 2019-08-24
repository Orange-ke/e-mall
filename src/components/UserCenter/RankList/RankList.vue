<template>
  <div class="box">
    <div class="header">
      <div class="ranking">
        <span>名次</span><br />
        <strong>{{ 198 }}</strong>
      </div>
      <div class="avatar">
        <img :src="src" alt="avatar" width="100%"><br />
        <span class="hint" @click="showHint">
          <span>规则说明</span>
          <van-icon name="arrow"/>
        </span>
      </div>
      <div class="earning">
        <span>收入</span><br />
        <strong>￥{{ 0 }}</strong>
      </div>
    </div>
    <div class="list">
      <van-list>
        <van-cell
          center
          v-for="(item, index) in rankData"
          :key="index"
        >
          <div slot="icon" class="left-icon">
            <svg v-if="index === 0" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M240 172l-73 49-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h98c12 0 24 7 29 18zm0 0" fill="#fa3f58"/><path d="M167 221l-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h26zm0 0" fill="#38506e"/><path d="M272 172l73 49 55 37L508 48c6-10 5-22-1-32S491 0 479 0h-98c-12 0-24 7-29 18zm0 0" fill="#ec2443"/><path d="M345 221l55 37L508 48c6-10 5-22-1-32S491 0 479 0h-26zm0 0" fill="#172c42"/><path d="M438 330a182 182 0 1 1-364 0 182 182 0 0 1 364 0zm0 0" fill="#ffde00"/><path d="M438 330c0 100-82 182-182 182V148c100 0 182 82 182 182zm0 0" fill="#ffbc17"/><path d="M381 330c0 69-56 125-125 126a126 126 0 0 1 0-252c69 1 125 57 125 126zm0 0" fill="#ffb729"/><path d="M381 330c0 69-56 125-125 126V204c69 1 125 57 125 126zm0 0" fill="#ff9729"/><path d="M271 300v60a15 15 0 1 1-30 0v-60a15 15 0 1 1 30 0zm0 0" fill="#fff"/><path d="M271 300v60c0 8-7 15-15 15v-90c8 0 15 7 15 15zm0 0" fill="#e3eeff"/></svg>
            <svg v-else-if="index === 1" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M240 172l-73 49-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h98c12 0 24 7 29 18zm0 0" fill="#fa3f58"/><path d="M167 221l-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h26zm0 0" fill="#38506e"/><path d="M272 172l73 49 55 37L508 48c6-10 5-22-1-32S491 0 479 0h-98c-12 0-24 7-29 18zm0 0" fill="#ec2443"/><path d="M345 221l55 37L508 48c6-10 5-22-1-32S491 0 479 0h-26zm0 0" fill="#172c42"/><path d="M438 330a182 182 0 1 1-364 0 182 182 0 0 1 364 0zm0 0" fill="#e3eeff"/><path d="M438 330c0 100-82 182-182 182V148c100 0 182 82 182 182zm0 0" fill="#d7e2f2"/><path d="M381 330c0 69-56 125-125 126a126 126 0 0 1 0-252c69 1 125 57 125 126zm0 0" fill="#aab5c6"/><path d="M381 330c0 69-56 125-125 126V204c69 1 125 57 125 126zm0 0" fill="#909fb4"/><path d="M246 300v60a15 15 0 1 1-30 0v-60a15 15 0 1 1 30 0zm0 0" fill="#fff"/><path d="M296 300v60a15 15 0 1 1-30 0v-60a15 15 0 1 1 30 0zm0 0" fill="#e3eeff"/></svg>
            <svg v-else-if="index === 2" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M240 172l-73 49-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h98c12 0 24 7 29 18zm0 0" fill="#fa3f58"/><path d="M167 221l-55 37L4 48c-6-10-5-22 1-32S21 0 33 0h26zm0 0" fill="#38506e"/><path d="M272 172l73 49 55 37L508 48c6-10 5-22-1-32S491 0 479 0h-98c-12 0-24 7-29 18zm0 0" fill="#ec2443"/><path d="M345 221l55 37L508 48c6-10 5-22-1-32S491 0 479 0h-26zm0 0" fill="#172c42"/><path d="M438 330a182 182 0 1 1-364 0 182 182 0 0 1 364 0zm0 0" fill="#ffb729"/><path d="M438 330c0 100-82 182-182 182V148c100 0 182 82 182 182zm0 0" fill="#ff9729"/><path d="M381 330c0 69-56 125-125 126a126 126 0 0 1 0-252c69 1 125 57 125 126zm0 0" fill="#ff9729"/><path d="M381 330c0 69-56 125-125 126V204c69 1 125 57 125 126zm0 0" fill="#ff722c"/><path d="M271 300v60c0 8-7 15-15 15s-15-7-15-15v-60c0-8 7-15 15-15s15 7 15 15zm0 0M221 300v60a15 15 0 1 1-30 0v-60a15 15 0 1 1 30 0zm0 0" fill="#fff"/><g fill="#e3eeff"><path d="M321 300v60a15 15 0 1 1-30 0v-60a15 15 0 1 1 30 0zm0 0M271 300v60c0 8-7 15-15 15v-90c8 0 15 7 15 15zm0 0"/></g></svg>
            <strong class="strong" v-else>{{ index + 1 }}</strong>
          </div>
          <div slot="title" class="title">
            ID: 7898798***7878
          </div>
          <div slot="default" class="value">
            445%
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { List, Cell, Icon } from 'vant'
import { store } from '../../../store/store'
export default {
  data () {
    return {
      src: store.getters.userData.avatar,
      rankData: [
        '',
        '',
        '',
        ''
      ]
    }
  },
  methods: {
    showHint: function () {
      this.$dialog.alert({
        title: '规则说明',
        message: '收入榜统计用户在大象亲子微信小程序推广产品产生的收入月榜，统计前30天的收入/好友数据（每日凌晨03:00更新一次数据）',
        confirmButtonText: '我知道了',
        messageAlign: 'left'
      })
    }
  },
  components: {
    'van-list': List,
    'van-cell': Cell,
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .box {
    min-height: 100vh;
    background: #fff;
  }
  .header {
    padding: 30px 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-image: url("../../../assets/rank-background.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 10px #9e9e9e;
  }
  .list {
    margin-top: 10px;
  }
  .avatar {
    text-align: center;
  }
  .avatar img {
    width: 60px;
    border-radius: 60px;
    border: 5px solid #ffd31c;
  }
  .ranking, .earning {
    font-size: 14px;
  }
  .hint {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .strong {
    text-align: center;
    line-height: 40px;
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .title {
    margin-left: 20px;
    font-size: 12px;
  }
  .value {
    font-weight: 600;
    color: #c8a86b;
  }
</style>
