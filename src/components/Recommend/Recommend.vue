<template>
  <div class="container">
    <van-tabs v-model="tabActive" sticky animated swipeable @click="onTabClick" color="#ffd31c">
      <van-tab :title="type.title" v-for="(type,index) in types" :key="index">
        <van-list
          v-model="type.pullUpLoading"
          :finished="type.finished"
          :immediate-check="type.immediateCheck"
          :error.sync="type.error"
          :offset="offset"
          error-text="请求失败，点击重新加载"
          :finished-text="'- 没有更多内容了 -'"
          @load="onload">
          <div v-for="(item, index) in type.items" :key="item.product.id" style="margin-top: 10px;">
            <comment :src="item.avatar" :name="item.nickname" :time="item.time" :comment="item.comment ? item.comment : ''"></comment>
            <van-card
              style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0; "
              :title="item.product.store_name"
              :thumb="item.product.image"
              :key="index"
              @click="linkToDetail(item.product_id)"
            >
              <div slot="num">
                <i style="font-size: 17px; color: #F44336"></i>
              </div>
              <br />
              <div slot="bottom" style="color: #9E9E9E; font-size: 12px; margin-top: 20px;">
                <span style="text-decoration: line-through;">原价￥{{ item.product.ot_price }}</span>
                <span>已销{{ item.product.sales }}</span>
                <i style="font-size: 17px; color: #F44336; float: right">￥{{ item.product.price }}</i>
              </div>
            </van-card>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Card, Tag, List } from 'vant'
import Comment from './Comment/Comment'
import axios from 'axios'
export default {
  data () {
    return {
      // 初始状态
      // load more config
      offset: -50,
      // load more config
      pullDownLoading: false, // 下拉刷新 loading状态
      tabActive: 0, // 子类tab
      apiAddress: [
        '/ebapi/Store_api/get_reply_list.html',
        '/ebapi/Store_api/get_relation_list.html'
      ],
      types: [// tab类
        { title: '推荐分享',
          items: [],
          loaded: false,
          error: null, // 错误信息
          pullUpLoading: false,
          finished: false,
          immediateCheck: true,
          params: {
            limit: 8,
            page: 0
          }
        },
        { title: '最新点赞',
          items: [],
          loaded: false,
          error: null, // 错误信息
          pullUpLoading: false,
          finished: false,
          immediateCheck: false,
          params: {
            limit: 8,
            page: 0
          }
        }
      ]
    }
  },
  mounted: function () {
  },
  methods: {
    linkToDetail: function (pid) {
      this.$router.push('/product-detail?pid=' + pid)
    },
    // 根据tab loaded 状态判断是否要获取对应的产品清单
    getData: function (info, url) {
      let vm = this
      axios
        .get(url, {params: this.types[info].params})
        .then(response => {
          let config = response.data
          console.log(config)
          vm.types[info].items = this.types[info].items.concat(config.data)
          vm.types[info].params.page += 1
          vm.types[info].loaded = true
          vm.types[info].pullUpLoading = false
          if (config.data.length < 8) {
            vm.types[info].finished = true
          }
          console.log(vm.types[info].finished)
        })
        .catch(error => {
          console.log(error)
          vm.types[info].error = true
        })
        .finally(() => { vm.types[info].pullUpLoading = false })
    },
    onload: function () {
      this.getData(this.tabActive, this.apiAddress[this.tabActive])
    },
    onTabClick: function () {
      if (this.types[this.tabActive].loaded) {
        return false
      } else {
        this.getData(this.tabActive, this.apiAddress[this.tabActive])
      }
    },
    // 下拉刷新
    onRefresh: function () {
      let vm = this
      vm.pullDownLoading = true
      setTimeout(() => {
        console.log('finish')
        vm.pullDownLoading = false
      }, 500)
    }
  },
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-card': Card,
    'van-tag': Tag,
    'van-list': List,
    'comment': Comment
  }
}
</script>

<style scoped>
</style>
