<template>
  <div class="attendance-list">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :immediate-check="immediateCheck"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group
        v-for="(monthList,index) in list"
        :key="index"
        :title="monthList.month">
        <van-cell
          center
          v-for="(item,_index) in monthList.list"
          :key="_index"
          :title="item.title"
          :label="item.add_time"
          :value="'+' + item.number"
          value-class="price-color"
        />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { Cell, CellGroup, List } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      immediateCheck: true,
      params: {
        page: 1,
        limit: 8
      }
    }
  },
  mounted: function () {
  },
  methods: {
    onLoad: function () {
      this.geData()
    },
    geData: function () {
      axios
        .get('/ebapi/user_api/get_sign_month_list.html', {params: this.params})
        .then(response => {
          let config = response.data
          console.log(config)
          this.list = this.list.concat(config.data.data)
          this.loading = false
          this.params.page += 1
          if (config.data.data.length < 10) {
            this.finished = true
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
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-list': List
  }
}
</script>

<style scoped>
</style>
