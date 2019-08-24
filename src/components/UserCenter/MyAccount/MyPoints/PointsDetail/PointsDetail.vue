<template>
  <van-list
    class="list"
    v-model="loading"
    :finished="finished"
    :offset="offset"
    :immediate-check="immediateCheck"
    :error.sync="error"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      center
      v-for="(item, index) in list"
      :key="index"
      :title="item.mark"
      :label="item.add_time"
      :value="(item.pm === 0 ? '-' : '+') + item.number"
      value-class="price-color"
    />
  </van-list>
</template>

<script>
import { List, Cell } from 'vant'
import axios from 'axios'
export default {
  data: function () {
    return {
      error: false,
      loading: false,
      immediateCheck: true,
      offset: -5,
      list: [],
      finished: false,
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    onLoad () {
      this.getData()
    },
    getData () {
      let vm = this
      axios
        .get('/ebapi/user_api/user_integral_list.html', { params: this.params })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            vm.list = vm.list.concat(res.data.data)
            vm.params.page += 1
          }
          vm.loading = false
          if (res.data.data.length < 10) {
            vm.finished = true
          }
        })
        .catch(error => {
          console.log(error)
          vm.error = true
        })
    }
  },
  mounted: function () {
    // https://shop.power-travel.com.cn/ebapi/user_api/user_integral_list.html?page=1&limit=10
  },
  components: {
    'van-list': List,
    'van-cell': Cell
  }
}
</script>

<style scoped>
</style>
