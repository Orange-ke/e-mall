<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="offset"
      :error="error"
      finished-text="哎呦，不小心暴露底线了"
      @load="onLoad"
    >
      <van-card
        v-for="item in list"
        :title="item.store_name"
        :thumb="item.image"
        :key="item.pid"
      >
        <div slot="num">
          <i style="font-size: 17px; color: #F44336"></i>
        </div>
        <br />
        <div slot="bottom" style="color: #ddd; font-size: 12px; margin-top: 20px;">
          <span style="text-decoration: line-through;">原价￥{{ item.ot_price }}</span>
          <span>已销{{ item.sales }}</span>
          <i style="font-size: 17px; color: #F44336; float: right">￥{{ item.price }}</i>
        </div>
        <div slot="footer">
          <van-button size="mini" round @click.stop="onDelete(item.pid)"> 删除 </van-button>
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { List, Card, Button } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      offset: -50,
      loading: false,
      finished: false,
      error: false,
      params: {
        page: 1,
        limit: 8
      }
    }
  },
  methods: {
    linkToDetail: function (pid) {
      this.$router.push('/product-detail?pid=' + pid)
    },
    onLoad: function () {
      axios
        .get('/ebapi/store_api/get_user_collect_product.html', {params: {params: this.params}})
        .then(response => {
          let config = response.data
          console.log(config)
          this.list = config.data
          this.loading = false
          this.params += 1
          if (config.data.length < 8) {
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
    'van-list': List,
    'van-card': Card,
    'van-button': Button
  }
}
</script>

<style scoped>
</style>
