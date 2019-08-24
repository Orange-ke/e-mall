<template>
  <div class="set-user-info">
    <van-cell-group>
      <van-cell title="头像" title-style="line-height: 60px">
        <template slot="default">
            <img :src="src" alt="头像" class="avatar" />
        </template>
      </van-cell>
      <van-cell title="名字" :value="name" />
      <van-cell title="手机号码">
        <template slot="default">
          <van-button round type="danger" size="mini" style="padding: 0 15px;" class="orange-btn" @click="fetch"> 点击获取 </van-button>
        </template>
      </van-cell>
      <van-cell title="ID号">
        <template slot="default">
          <span>
            {{ userId }}
            <van-icon name="lock" style="vertical-align: middle" />
          </span>
        </template>
      </van-cell>
    </van-cell-group>
    <div style="text-align: center">
      <van-button
        class="orange-btn"
        @click="updateSet"
        size="large"
        type="danger"
        round
        style="width: 90%;height: 40px; line-height:40px; margin-top: 16px;"
      >
        保存修改
      </van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Icon } from 'vant'
import { store } from '../../../store/store'
export default {
  name: 'Lists',
  data () {
    return {
      name: '',
      src: '',
      userId: 0
    }
  },
  mounted: function () {
    let userData = store.getters.userData
    this.name = userData.nickname
    this.src = userData.avatar
    this.userId = userData.uid
  },
  methods: {
    fetch: function () {
      console.log('获取电话号码')
    },
    updateSet: function () {
      console.log('保存修改')
    }
  },
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-button': Button,
    'van-icon': Icon
  }
}
</script>

<style scoped>
  .set-user-info {
    margin-top: 16px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: inline-block;
    border-radius: 60px;
  }
</style>
