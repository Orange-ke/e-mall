<template>
  <div>
    <div style="background: #ffd31c; padding-left: 10px;">
      <van-search
        background="transparent"
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
      >
      </van-search>
    </div>
    <div class="hot-search">
      <div class="hot-search-title">
        <svg t="1563012061234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13459" width="32" height="32"><path d="M421.4 960S34.1 872.6 207.2 438.8c0 0 39.3 48.2 33.9 71.4 0 0 30.8-109.5 97.3-174.9C395.5 279.1 453.5 121.1 400 64c0 0 265 57.1 294.5 342.7 0 0 33.9-91 103.5-100 0 0-21.4 50 0 125 0 0 219.5 385.5-158.8 515.8 0 0 113.4-132.1-127.1-358.8 0 0-56.7 121.4-90.6 164.2-0.1 0.1-94.7 108.9-0.1 207.1z" fill="#d81e06" p-id="13460"></path></svg>
        热门搜索
      </div>
      <div class="hot-search-tags">
        <van-tag
          color="#f2826a"
          v-for="(item,index) in hotList"
          :key="index"
          @click="hotSearch"
        >
          {{ item.title }}
        </van-tag>
      </div>
    </div>
    <div v-if="searchList.length === 0 || isEmpty">
      <div class="empty">
        <img src="../../assets/noSearch.png" alt="empty">
      </div>
    </div>
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="- 没有更多内容了 -"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-card
        style="box-shadow: 1px 1px 5px #fcfff4;"
        v-for="product in searchList"
        :desc="product.store_name"
        :title="product.title"
        :thumb="product.image"
        :key="product.id"
        @click="linkToDetail(product.id)"
      >
        <div slot="num">
          <i style="font-size: 17px; color: #F44336">￥{{ product.price }}</i>
        </div>
        <br />
        <div slot="tags" v-if="product.is_limitbuy" class="isLimited">
          <van-tag mark type="danger" color="#ffd31c" style="color: #212121"> <van-icon name="clock-o" /> 限时抢购 </van-tag>
        </div>
        <div slot="bottom" style="color: #9E9E9E; font-size: 12px; margin-top: 10px;" class="bottom">
          <span style="text-decoration: line-through">原价￥{{ product.ot_price }}</span>
          <span>已销{{ product.sales }}</span>
          <van-tag round type="danger" class="float-right orange" v-if="showSave">省:￥{{ product.brokerage }}</van-tag>
        </div>
      </van-card>
    </van-list>
    <recommend></recommend>
  </div>
</template>

<script>
import { Search, Tag, List, Card } from 'vant'
import Recommend from '../Shared/Recommend/Recommend'
import { store } from '../../store/store'
import axios from 'axios'
export default {
  data () {
    return {
      showSave: store.getters.userData.showSave,
      value: '',
      hotList: [],
      searchList: [],
      isEmpty: false,
      loading: false,
      finished: false
    }
  },
  mounted: function () {
    axios
      .get('/ebapi/store_api/get_routine_hot_search.html')
      .then(response => {
        let config = response.data
        console.log(config)
        this.hotList = config.data
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
    linkToDetail: function (pid) {
      this.$router.push('/product-detail?pid=' + pid)
    },
    hotSearch: function (target) {
      console.log(target.toElement.innerText)
      this.value = target.toElement.innerText
      this.onSearch()
    },
    onSearch: function () {
      let params = {
        keyword: this.value
      }
      axios
        .get('/ebapi/store_api/goods_search.html', {params: params})
        .then(response => {
          let config = response.data
          console.log(config)
          this.searchList = config.data
          this.loading = false
          this.finished = true
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => { this.loading = false })
    },
    onLoad: function () {
      console.log('loading')
    }
  },
  components: {
    'van-search': Search,
    'van-tag': Tag,
    'van-list': List,
    'van-card': Card,
    'recommend': Recommend
  }
}
</script>

<style scoped>
  .hot-search {
    font-size: 14px;
    background: #fff;
    padding: 10px 16px;
  }
  .hot-search-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
  .hot-search-tags {
    margin: 16px 0;
  }
  .hot-search-tags {
    display: flex;
    justify-content: space-evenly;
  }
  .empty {
    text-align: center;
  }
  .empty img {
    width: 60%;
  }
</style>
