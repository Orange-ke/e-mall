<template>
  <div class="get-coupon">
    <van-list
      v-model="loading"
      :finished="finished"
      :error="error"
      :immediate-check="immediateCheck"
      :finished-text="isEmpty ? '' : '没有更多了'"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
      />
    </van-list>
    <div v-if="isEmpty" style="width: 60%; margin: 15px auto">
      <img src="../../../../assets/noCoupon.png" alt="empty" width="100%">
    </div>
  </div>
</template>

<script>
import { List, Cell } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      isEmpty: false,
      immediateCheck: true,
      params: {
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
    onLoad: function () {
      axios
        .get('/ebapi/coupons_api/get_issue_coupon_list.html', {params: this.params})
        .then(response => {
          if (response.data.code === 200) {
            let config = response.data
            console.log(config)
            this.loading = false
            if (config.data.length < 20) {
              this.finished = true
            }
            if (config.data.length === 0) {
              this.isEmpty = true
            }
          }
        })
        .catch(error => {
          console.log(error)
          this.error = true
        })
        .finally(() => { this.loading = false })
    }
  },
  components: {
    'van-list': List,
    'van-cell': Cell
  }
}
</script>

<style scoped>
</style>
