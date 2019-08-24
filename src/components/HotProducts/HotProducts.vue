<template>
  <div class="container">
    <!--  header  ------------------------------------------------------------------------------->
    <div class="header">
      <van-row type="flex" style="box-sizing: border-box; background: #ffd31c">
        <van-col span="20">
          <van-search placeholder="搜索商品名称" v-model="searchValue" shape="round" @search="onSearch" background="transparent"></van-search>
        </van-col>
        <van-col span="4" style="box-sizing: border-box; text-align: center; background: transparent">
          <van-icon :name="isColumnStyle ? 'qr' : 'apps-o'" size="24" style="line-height: 54px;" @click="changeStyle" />
        </van-col>
      </van-row>
      <van-tabs v-model="tabActive" sticky @click="onTabClick(tabActive)" color="#ffd31c">
        <van-tab
          v-for="(item,index) in tabConfig"
          :key="index"
        >
          <div slot="title" style="font-size: 12px;" class="sort-item">
            <div>{{ item.title }}</div>
            <div v-if="index !== 3 && index !== 0" :class="['icon', item.class]"></div>
          </div>
        </van-tab>
        <van-popup position="bottom" v-model="showArea">
          <van-area :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancel" :value="areaDefault" />
        </van-popup>
        <div v-if="isEmpty" class="empty">
          <div class="img">
          </div>
        </div>
        <van-list
          v-else
          v-model="products.pullUpLoading"
          :finished="products.finished"
          :immediate-check="products.immediateCheck"
          :error.sync="products.error"
          :offset="offset"
          error-text="请求失败，点击重新加载"
          finished-text="- 没有更多内容了 -"
          @load="onload"
          :class="{columnStyle: isColumnStyle}"
        >
          <van-card
            v-for="product in products.data"
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
              <span style="text-decoration: line-through">原价￥{{ product.price }}</span>
              <span>已销{{ product.sales }}</span>
              <van-tag round type="danger" class="float-right orange" v-if="showSave">省:￥{{ product.brokerage }}</van-tag>
            </div>
          </van-card>
        </van-list>
        <recommend v-if="products.finished"></recommend>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Search, Tabs, Tab, Card, Tag, List, Popup, Area } from 'vant'
import Recommend from '../../components/Shared/Recommend/Recommend'
// import bayArea from '../../area/bayArea'
import { store } from '../../store/store'
import axios from 'axios'
export default {
  data: function () {
    return {
      // 初始状态
      showSave: store.getters.userData.showSave,
      // load more config
      offset: -50,
      // load more config
      pullDownLoading: false, // 下拉刷新 loading状态
      loading: true,
      searchValue: '', // 搜索值
      tabActive: 0, // 子类tab
      isEmpty: false,
      error: null, // 错误信息
      tabConfig: [
        { title: '地区',
          sortKey: ''
        },
        { title: '价格',
          class: 'type1',
          sortType: 0,
          sortKey: 'priceOrder',
          sortConfig: ['', 'asc', 'desc']
        },
        { title: '销量',
          class: 'type1',
          sortType: 0,
          sortKey: 'salesOrder',
          sortConfig: ['', 'asc', 'desc']
        },
        { title: '新品',
          class: 'type1',
          sortKey: 'news',
          sortConfig: 1
        }
      ],
      products: {
        data: [],
        loaded: false,
        pullUpLoading: false,
        finished: false,
        immediateCheck: true,
        params: {
          sid: this.$route.query.sid,
          keyword: '',
          priceOrder: '',
          salesOrder: '',
          news: 0,
          page: 1,
          limit: 10,
          limitbuy: 1,
          cid: 0,
          is: this.$route.query.sid,
          cCode: 0
        }
      },
      // 是否按照两列形式展示商品
      isColumnStyle: false,
      // 地区筛选
      showArea: false,
      areaDefault: '',
      areaList: {},
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: null
    }
  },
  mounted: function () {
    let vm = this
    axios
      .get('/api/Address/tp5ProductAddressList?cateId=0')
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          let area = res.data.data
          vm.areaList = area
          if (area.county_list) {
            for (let code in area.county_list) {
              vm.areaDefault = code
              console.log(code)
              break
            }
          } else if (area.city_list) {
            for (let code in area.city_list) {
              vm.areaDefault = code
              console.log(code)
              break
            }
          } else if (area.province_list) {
            for (let code in area.province_list) {
              vm.areaDefault = code
              console.log(code)
              break
            }
          }
        } else {
          vm.$toast.fail('获取地址失败')
        }
      })
      .catch(() => {
        vm.$toast.fail('获取地址失败')
      })
  },
  components: {
    'van-search': Search,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-card': Card,
    'van-tag': Tag,
    'van-list': List,
    'recommend': Recommend,
    'van-popup': Popup,
    'van-area': Area
  },
  methods: {
    changeStyle: function () {
      this.isColumnStyle = !this.isColumnStyle
    },
    linkToDetail: function (pid) {
      this.$router.push('/product-detail?pid=' + pid)
    },
    // 根据tab loaded 状态判断是否要获取对应的产品清单
    getData: function () {
      let vm = this
      this.products.pullUpLoading = true
      axios
        .get('/ebapi/store_api/get_product_list.html', {params: this.products.params})
        .then(response => {
          let config = response.data
          console.log(config)
          vm.products.params.page += 1
          vm.products.data = vm.products.data.concat(config.data)
          console.log(vm.products.data)
          vm.products.loaded = true
          vm.products.pullUpLoading = false
          if (config.data < 10) {
            vm.products.finished = true
          }
          if (vm.products.data.length === 0) {
            this.isEmpty = true
          }
        })
        .catch(error => {
          console.log(error)
          vm.error = true
        })
        .finally(() => { vm.products.pullUpLoading = false })
    },
    onload: function () {
      console.log('load')
      this.getData(this.tabActive)
    },
    onTabClick: function (index) {
      if (index !== 0) {
        this.showArea = false
        this.refreshFetchConfig()
        this.refreshSortConfig()
        this.sortFetchConfig(index)
        this.getData()
      } else {
        this.showArea = !this.showArea
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
    },
    sortFetchConfig: function (index) {
      let target = this.tabConfig[index]
      if (index === 1 || index === 2) {
        if (target.sortType === 0) {
          this.tabConfig[index].sortType = 1
          this.tabConfig[index].class = 'type2'
          this.products.params[target.sortKey] = target.sortConfig[1]
        } else if (target.sortType === 1) {
          this.tabConfig[index].sortType = 2
          this.tabConfig[index].class = 'type3'
          this.products.params[target.sortKey] = target.sortConfig[2]
        } else if (target.sortType === 2) {
          this.tabConfig[index].sortType = 0
          this.tabConfig[index].class = 'type1'
          this.products.params[target.sortKey] = target.sortConfig[0]
        }
      } else if (index === 3) {
        this.products.params[target.sortKey] = target.sortConfig
      }
      console.log(this.products.params)
    },
    refreshFetchConfig: function () {
      this.products.params = {
        sid: 0,
        keyword: '',
        priceOrder: '',
        salesOrder: '',
        news: 0,
        page: 1,
        limit: 10,
        limitbuy: 1,
        cid: 0,
        is: 0,
        cCode: 0
      }
      this.searchValue = ''
      this.mainActiveIndex = 0
      this.activeId = null
      this.products.data = []
      this.products.finished = false
      this.products.immediateCheck = false
      this.isEmpty = false
    },
    refreshSortConfig: function () {
      for (let i = 0; i < this.tabConfig.length; i++) {
        if (i !== this.tabActive && i !== 3 && i !== 0) {
          this.tabConfig[i].class = 'type1'
          this.tabConfig[i].sortType = 0
        }
      }
    },
    onSearch: function () {
      let searchValue = this.searchValue
      this.refreshFetchConfig()
      this.products.params.keyword = searchValue
      this.searchValue = searchValue
      this.getData()
    },
    areaCancel: function () {
      console.log('cancel')
      this.showArea = false
    },
    areaConfirm: function (code) {
      console.log(code)
      this.refreshFetchConfig()
      if (code.length > 0 && code[0]) {
        this.products.params.pCode = code[0].code
      }
      if (code.length > 1 && code[1]) {
        this.products.params.cCode = code[1].code
      }
      if (code.length > 2 && code[2]) {
        this.products.params.aCode = code[2].code
      }
      this.getData()
      this.showArea = false
    }
  }
}
</script>

<style scoped>
  .sort-item {
    position: relative;
  }
  .sort-item div {
    line-height: 18px;
    display: inline-block;
  }
  .sort-item div img {
    width: 60%;
  }
  .icon {
    position: absolute;
    margin-top: 12px;
    width: 12px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .icon.type1 {
    background-image: url("../../assets/sort2.png");
  }
  .icon.type2 {
    background-image: url("../../assets/sort1.png");
  }
  .icon.type3 {
    background-image: url("../../assets/sort3.png");
  }
  .empty {
    height: 200px;
    padding: 10px 16px;
  }
  .empty .img {
    height: 200px;
    background-image: url("../../assets/noSearch.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
