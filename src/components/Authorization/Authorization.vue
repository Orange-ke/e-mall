<template>
  <div class="authorization">
  </div>
</template>

<script>
import { Dialog } from 'vant'
// import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  mounted: function () {
    Dialog.confirm({
      title: '微信登陆',
      message: '大象亲子请求获取微信登陆权限',
      confirmButtonText: '授权'
    }).then(() => {
      // on confirm
      window.location.href = 'https://shop.power-travel.com.cn/api/Login/index'
    }).catch(() => {
      // on cancel
      console.log('cancel')
    })
  },
  methods: {
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
}
</script>
<style scoped>
  .authorization {
    padding: 10px 16px;
  }
</style>
