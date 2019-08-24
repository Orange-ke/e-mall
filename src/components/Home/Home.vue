<template>
  <div class="container">
    <!--搜索 -------------------------------------------------------------------------------------------------------------------------------------------------->
    <div style="background: #ffd31c; display: flex; align-items: center; padding: 0 10px;">
      <div style="display: inline-block;">
        <img src="../../assets/slogan.png" alt="logo" width="60">
      </div>
      <van-search
        style="flex: 2; padding: 5px 10px;"
        background="transparent"
        shape="round"
        placeholder="请输入搜索关键词"
        v-model="searchValue"
        @focus="linkToSearch"
      >
      </van-search>
      <div>
        <van-icon name="idcard" size="24" @click="showLicense" />
      </div>
    </div>
    <!--轮播图------------------------------------------------------------------------------------------------------------------------------------------------->
    <van-swipe :autoplay="3000" :height="160" indicator-color="#ffd31c" >
      <van-swipe-item v-for="(image, index) in banner" :key="index" @click="linkToDetail(getSidFromUrl('id', image.url))">
        <img v-lazy="image.pic" width="100%" height="100%" />
      </van-swipe-item>
    </van-swipe>
    <!--商品分类----------------------------------------------------------------------------------------------------------------------------------------------->
    <van-grid
      style="background: #fff; border-radius: 40px; box-shadow: 1px 1px 4px #ddd; margin: 10px 2.5% 10px; z-index: 2; width: 95%;"
      :column-num="4"
      :border="false"
    >
      <van-grid-item
        v-for="(menu, index) in menus"
        :key="index"
        :icon="menu.pic"
        :text="menu.name"
        @click="linkToCategory(menu)"
      />
    </van-grid>
    <!--商品分类tab页------------------------------------------------------------------------------------------------------------------------------------------>
    <van-tabs v-model="tabActive" sticky animated @click="onTabClick(tabActive)" style="background: #f5f5f5;" color="#ffd31c">
      <van-tab v-for="(prodType, index) in products" :title="prodType.title" :key="index">
        <div v-if="products[index].isEmpty" class="empty">
          <div class="img">
          </div>
        </div>
        <!-- 商品列表不为空 -->
        <van-list
          v-else
          v-model="prodType.pullUpLoading"
          :finished="prodType.finished"
          :immediate-check="prodType.immediateCheck"
          :error.sync="error"
          :offset="offset"
          error-text="请求失败，点击重新加载"
          finished-text="-没有更多内容了-"
          @load="onload"
          style="min-height: 100vh; box-sizing: border-box;"
        >
          <van-card
            v-for="product in prodType.data"
            :desc="product.store_name"
            :title="product.title"
            :thumb="product.image"
            :key="product.id + product.cate_id"
            @click="linkToDetail(product.id)"
          >
            <div slot="num">
              <i style="font-size: 17px; color: #F44336">￥{{ product.price }}</i>
            </div>
            <br />
            <div slot="tags">
              <van-tag v-if="product.is_limitbuy" mark type="danger" color="#ffd31c" style="color: #212121"> <van-icon name="clock-o" /> 限时抢购 </van-tag>
            </div>
            <div slot="bottom" style="color: #9E9E9E; font-size: 12px; margin-top: 10px;">
              <span style="text-decoration: line-through;">原价￥{{ product.ot_price }}</span>
              <span>已销{{ product.sales }}</span>
              <van-tag round type="danger" class="float-right orange" v-if="showSave">省: ￥{{ product.brokerage }}</van-tag>
            </div>
          </van-card>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Search, Swipe, SwipeItem, Grid, GridItem, Tab, Tabs, Tabbar, TabbarItem, Card, Tag, List, Icon, Dialog } from 'vant'
import axios from 'axios'
import { getSidFromUrl } from '../../utilities/utilities'
import { store } from '../../store/store'

export default {
  data: function () {
    return {
      // 初始状态
      showSave: store.getters.userData.showSave,
      // load more config
      offset: -50,
      searchValue: '', // 搜索值
      tabActive: 0, // 子类tab
      error: false, // 错误信息
      banner: null, // 轮播图片
      menus: null, // 子分类
      products: [ // 产品清单
        { // 销量最高
          data: [],
          title: '销量最高',
          loaded: false,
          pullUpLoading: false,
          immediateCheck: true,
          finished: false,
          isEmpty: false,
          getProductParams: {
            sid: 0,
            keyword: '',
            priceOrder: '',
            salesOrder: 'desc',
            news: 0,
            page: 1,
            limit: 10,
            is_limitbuy: 0,
            cid: 0
          }
        },
        { // 最新上架
          data: [],
          title: '最新上架',
          loaded: false,
          pullUpLoading: false,
          immediateCheck: false,
          finished: false,
          isEmpty: false,
          getProductParams: {
            sid: 0,
            keyword: '',
            priceOrder: '',
            salesOrder: '',
            news: 1,
            page: 1,
            limit: 10,
            is_limitbuy: 0,
            cid: 0
          }
        },
        { // 即将开抢
          data: [],
          title: '即将开抢',
          loaded: false,
          pullUpLoading: false,
          immediateCheck: false,
          finished: false,
          isEmpty: false,
          getProductParams: {
            sid: 0,
            keyword: '',
            priceOrder: '',
            salesOrder: 'desc',
            news: 0,
            limitBuyButCouldNotBuy: 1,
            page: 1,
            limit: 10,
            is_limitbuy: 0,
            cid: 0
          }
        },
        { // 点赞最多
          data: [],
          title: '点赞最多',
          loaded: false,
          pullUpLoading: false,
          immediateCheck: false,
          finished: false,
          isEmpty: false,
          getProductParams: {
            sid: 0,
            keyword: '',
            priceOrder: '',
            salesOrder: 'desc',
            news: 0,
            page: 1,
            limit: 10,
            is_limitbuy: 0,
            cid: 0,
            flag: 1
          }
        }
      ],
      busy: false // 有时list组件会onload多次使用该字段来组织调用多次onload事件，造成数据重复
    }
  },
  mounted: function () {
    // 获取banner，menu
    axios
      .get('/api/RoutineCommon/index')
      .then(response => {
        let config = response.data.data
        this.banner = config.banner
        this.menus = config.menus
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getSidFromUrl: getSidFromUrl,
    linkToCategory: function (menu) {
      this.$router.push({path: '/category', query: {sid: getSidFromUrl('sid', menu.url), title: getSidFromUrl('title', menu.url)}})
    },
    linkToDetail: function (pid) {
      // history.pushState('', '', '/product-detail?pid=' + pid)
      this.$router.push('/product-detail?pid=' + pid)
    },
    linkToSearch: function () {
      // history.pushState('', '', '/search')
      this.$router.push('/search')
      // window.history.pushState('/search')
    },
    onTabClick (info) {
      this.products[0].pullUpLoading = false
      this.products[1].pullUpLoading = false
      this.products[2].pullUpLoading = false
      this.products[3].pullUpLoading = false
      this.tabActive = info
      if (this.products[info].loaded || this.products[info].isEmpty) {
        this.products[info].immediateCheck = false
        return false
      } else {
        this.products[info].immediateCheck = true
      }
    },
    // 根据tab loaded 状态判断是否要获取对应的产品清单
    getData: function (info) {
      let vm = this
      vm.busy = true
      axios
        .get('/ebapi/store_api/get_product_list.html', {params: this.products[info].getProductParams})
        .then(response => {
          let config = response.data
          vm.products[info].data.push(...config.data)
          vm.products[info].loaded = true
          ++vm.products[info].getProductParams.page
          vm.products[info].pullUpLoading = false
          if (vm.products[info].data.length === 0) {
            vm.products[info].isEmpty = true
          }
          if (config.data.length < 10) {
            vm.products[info].finished = true
          }
          vm.busy = false
        })
        .catch(error => {
          console.log(error)
          vm.busy = false
          vm.error = true
        })
    },
    onload: function () {
      console.log('load')
      let vm = this
      this.products[vm.tabActive].pullUpLoading = true
      if (!this.busy) {
        vm.getData(vm.tabActive)
      }
    },
    showLicense: function () {
      this.$dialog.alert({
        title: '营业执照',
        message: '<div><img src="https://shop.power-travel.com.cn/dist/license.jpg?t=20190823" alt="license" width="100%"></div>',
        confirmButtonText: '已查看'
      })
    }
  },
  // 所使用的组件
  components: {
    'van-search': Search,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
    'van-card': Card,
    'van-tag': Tag,
    'van-list': List,
    'van-icon': Icon,
    'van-dialog': Dialog
  }
}
</script>

<style scoped>
  .empty {
    height: 200px;
    padding: 10px 16px;
    width: 60%;
    margin: 0 auto;
  }

  .empty .img {
    height: 200px;
    background-image: url("../../assets/noSearch.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
