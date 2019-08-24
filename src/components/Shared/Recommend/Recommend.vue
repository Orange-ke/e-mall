<template>
  <div class="recommend">
    <div class="recommend-header">
      <svg t="1562996976481" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#FF5722" p-id="9770"></path></svg>
      <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#FF5722" p-id="9301"></path></svg>
      <span style="color: #FF5722; font-size: 1.2em">为你推荐</span>
      <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#FF5722" p-id="9301"></path></svg>
      <svg t="1562996976481"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#FF5722" p-id="9770"></path></svg>
    </div>
    <van-row>
      <recommend-item v-for="(item,index) in items"
        :key="index"
        :src="item.image"
        :info="item.store_name"
        :price="Number(item.price)"
        :style="((index + 1)%2) === 1 ? 'float: left' : 'float: right'"
        :to="'/product-detail?pid=' + item.id"
      >
      </recommend-item>
    </van-row>
  </div>
</template>

<script>
import { Row } from 'vant'
import RecommendItem from './RecommendItem/Recommend'
import axios from 'axios'
export default {
  data () {
    return {
      items: []
    }
  },
  mounted: function () {
    axios
      .get('/ebapi/public_api/get_hot_product.html', {params: { offset: 1, limit: 4 }})
      .then(response => {
        let config = response.data
        console.log(config)
        this.items = config.data
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
  },
  components: {
    'van-row': Row,
    'recommend-item': RecommendItem
  }
}
</script>

<style scoped>
  .recommend {
    background: #fff;
    margin-top: 16px;
    padding: 10px 16px;
  }
  .recommend-header {
    text-align: center;
    padding: 10px 16px;
    font-size: 15px;
    border-bottom: 1px solid beige;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
