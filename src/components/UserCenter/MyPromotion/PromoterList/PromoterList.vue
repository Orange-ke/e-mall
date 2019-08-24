<template>
  <div class="promoter-list">
    <withdraw-header
      title="好友列表"
      :amount="amount"
      unit="人"
      :isCurrency="false"
      svg="M512.00768 960c-254.784 0-384-59.904-384-178.112 0-84.416 133.12-139.648 265.856-158.336v-17.536c-79.68-58.24-118.464-159.936-118.464-309.952C275.39968 150.784 362.37568 64 508.10368 64h7.808c145.792 0 232.768 86.784 232.768 232.064 0 56.448 0 223.808-117.568 310.144l-0.384 17.408C763.20768 642.432 896.00768 697.6 896.00768 781.888 896.00768 900.096 766.79168 960 512.00768 960zM508.03968 120c-80.256 0-175.872 29.952-175.872 172.8 0 137.344 34.56 225.92 105.536 270.72 8.96 5.696 14.464 15.872 14.464 26.88v62.72a30.848 30.848 0 0 1-26.944 31.232c-145.728 15.232-242.368 71.232-242.368 101.568 0 97.6 179.008 118.08 329.152 118.08 150.208 0 329.152-20.48 329.152-118.08 0-30.336-96.64-86.4-242.368-101.568a30.912 30.912 0 0 1-26.88-31.936l1.28-62.72a31.744 31.744 0 0 1 14.4-26.176c71.168-44.928 104.32-130.944 104.32-270.72 0-142.848-95.68-172.8-175.936-172.8h-7.936zM997.76768 704a26.88 26.88 0 0 1-26.112-27.584c0-21.12-74.56-72.384-160.96-82.048a27.072 27.072 0 0 1-23.424-27.456v-57.408c0-9.408 4.608-18.176 12.16-23.232 67.584-45.44 74.88-146.496 74.88-187.776 0-95.296-60.992-115.328-112.192-115.328a26.88 26.88 0 0 1-26.176-27.52 26.88 26.88 0 0 1 26.176-27.648c101.44 0 164.48 65.28 164.48 170.496 0 48.064-8.768 162.752-87.04 225.472v19.136C923.20768 559.168 1024.00768 612.096 1024.00768 676.416a26.88 26.88 0 0 1-26.176 27.584zM26.24768 704a26.88 26.88 0 0 0 26.112-27.584c0-21.12 74.56-72.384 160.96-82.048a27.072 27.072 0 0 0 23.424-27.456v-57.408a28.032 28.032 0 0 0-12.16-23.232c-67.584-45.44-74.88-146.496-74.88-187.776 0-95.296 60.992-115.328 112.192-115.328a26.88 26.88 0 0 0 26.176-27.52A26.88 26.88 0 0 0 261.83168 128c-101.44 0-164.48 65.28-164.48 170.496 0 48.064 8.768 162.752 87.04 225.472v19.136C100.80768 559.168 0.00768 612.096 0.00768 676.416A26.88 26.88 0 0 0 26.18368 704z"
    >
    </withdraw-header>
    <van-tabs v-model="active" animated @click="changeUrlParams" color="#ffd31c" sticky>
      <!--   一级   -->
      <van-tab
        :title="item.title + '(' + item.amount + ')'"
        :key="type"
        v-for="(item, type) in listConfig"
      >
        <van-grid :column-num="3" style="background: #fff; border-bottom: 1px solid #ddd;">
          <van-grid-item
            @click="sortFetchConfig(item.sortConfig[index])"
            v-for="(sortType,index) in item.sortConfig"
            :key="index"
          >
            <div slot="text" style="font-size: 12px;" class="sort-item">
              <div>{{ sortType.title }}</div>
              <div :class="['icon', sortType.class]"></div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          :error="item.error"
          :immediate-check="item.immediateCheck"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            class="card-style"
            center
            title-style="flex: 2; white-space:nowrap; text-overflow: ellipsis; overflow: hidden;"
            v-for="(listItem,index) in item.list"
            :key="index"
            :title="listItem.nickname"
            :label="'加入时间：' + listItem.updated_at"
          >
            <div slot="icon" class="avatar">
              <img v-lazy="listItem.avatar" alt="avatar" width="50" height="50">
            </div>
            <div slot="default" class="right-value">
              <div v-if="!listItem.deleted_at">
                <span>推荐 <span style="color: #F57C00;">{{ listItem.sonCount }} </span> 人</span><br />
                <span>自购 <span style="color: #F57C00;">{{ listItem.orderCount }} </span> 单</span><br />
                <span>支付 <span style="color: #F57C00;">{{ listItem.orderPriceSum }}</span> 元</span>
              </div>
              <svg
                v-else
                t="1564646082123"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1538" width="48" height="48">
                <path d="M769.6 467.2c-3.2-12.8-6.4-25.6-9.6-38.4l-19.2 4.8c3.2 11.2 6.4 24 9.6 38.4L769.6 467.2z" p-id="1539" fill="#D32F2F"></path>
                <path d="M684.516 455.252l125.18064 33.54048-4.55488 16.99984-125.18064-33.54048 4.55488-16.99984Z" p-id="1540" fill="#D32F2F"></path>
                <path d="M790.4 556.8c-9.6-20.8-17.6-36.8-25.6-51.2l-16 8c9.6 19.2 17.6 36.8 24 52.8L790.4 556.8z" p-id="1541" fill="#D32F2F"></path>
                <path d="M841.6 648c24-24 44.8-59.2 62.4-107.2l17.6 4.8 4.8-17.6-80-20.8c9.6-12.8 17.6-27.2 25.6-43.2l-19.2-8c-16 35.2-38.4 65.6-65.6 88 3.2 6.4 6.4 12.8 8 19.2 6.4-4.8 12.8-11.2 17.6-16-4.8 33.6-3.2 65.6 3.2 96-20.8 16-44.8 28.8-73.6 38.4 4.8 8 8 14.4 9.6 19.2 27.2-9.6 51.2-20.8 70.4-36.8 8 22.4 22.4 44.8 40 64 4.8-4.8 11.2-11.2 19.2-16C864 691.2 851.2 670.4 841.6 648zM836.8 521.6l48 12.8c-12.8 36.8-28.8 67.2-49.6 89.6C828.8 593.6 828.8 560 836.8 521.6z" p-id="1542" fill="#D32F2F"></path>
                <path d="M726.4 507.2l-14.4-14.4c-20.8 19.2-40 33.6-56 44.8 4.8 6.4 8 11.2 11.2 16C689.6 537.6 708.8 523.2 726.4 507.2z" p-id="1543" fill="#D32F2F"></path>
                <path d="M731.2 609.6c12.8-11.2 24-24 35.2-38.4l-16-14.4c-9.6 12.8-19.2 24-30.4 35.2-8-14.4-16-27.2-24-41.6l-16 8c8 14.4 16 30.4 25.6 46.4-22.4 19.2-48 32-76.8 40 3.2 8 6.4 14.4 8 19.2 14.4-6.4 32-17.6 48-32-1.6 4.8-4.8 9.6-8 16 12.8-6.4 25.6-16 38.4-25.6 6.4 12.8 14.4 27.2 20.8 43.2l20.8-9.6C748.8 640 739.2 624 731.2 609.6z" p-id="1544" fill="#D32F2F"></path>
                <path d="M444.8 420.8l33.6 9.6c8-3.2 16-8 22.4-14.4l-41.6-11.2c8-9.6 14.4-19.2 22.4-30.4l-17.6-11.2c-17.6 30.4-40 54.4-67.2 75.2 4.8 6.4 9.6 11.2 12.8 16C420.8 443.2 433.6 432 444.8 420.8z" p-id="1545" fill="#D32F2F"></path>
                <path d="M512 515.2l107.2 28.8 4.8-19.2-108.8-28.8c4.8-12.8 9.6-30.4 16-51.2l94.4 25.6 4.8-19.2-92.8-25.6c4.8-14.4 9.6-32 14.4-49.6l-20.8-6.4c-4.8 17.6-9.6 35.2-14.4 49.6l-6.4-1.6c-3.2 6.4-6.4 11.2-11.2 17.6l11.2 3.2c-6.4 22.4-11.2 40-16 51.2L384 459.2l-4.8 19.2 107.2 28.8c-22.4 36.8-67.2 57.6-136 62.4 4.8 9.6 8 17.6 9.6 24 67.2-9.6 112-32 136-67.2 4.8 46.4 32 86.4 83.2 121.6 6.4-4.8 12.8-11.2 20.8-16C545.6 600 516.8 561.6 512 515.2z" p-id="1546" fill="#D32F2F"></path>
                <path d="M265.6 640 38.4 579.2c-11.2-3.2-19.2-16-16-27.2l12.8-46.4c-8 1.6-16 1.6-24 1.6l-9.6 38.4c-6.4 24 8 48 30.4 54.4l188.8 51.2C233.6 649.6 252.8 646.4 265.6 640z" p-id="1547" fill="#D32F2F"></path><path d="M324.8 656c-9.6 3.2-19.2 6.4-27.2 4.8-6.4-1.6-11.2-8-12.8-16l-16-4.8c-4.8 6.4-9.6 12.8-14.4 19.2l227.2 60.8c8-4.8 17.6-11.2 27.2-16L324.8 656z" p-id="1548" fill="#D32F2F"></path><path d="M38.4 496l70.4-262.4c3.2-11.2 16-19.2 27.2-16l723.2 193.6c-4.8-8-4.8-19.2-4.8-24L169.6 203.2c4.8 6.4 11.2 12.8 17.6 17.6-12.8-3.2-35.2-12.8-49.6-25.6-22.4-3.2-44.8 9.6-49.6 32L17.6 488C24 491.2 30.4 492.8 38.4 496z" p-id="1549" fill="#D32F2F"></path>
                <path d="M907.2 803.2c-4.8 3.2-11.2 4.8-17.6 3.2l-275.2-73.6c-25.6-4.8-65.6-9.6-107.2-6.4l377.6 100.8c3.2 1.6 8 1.6 11.2 1.6C897.6 822.4 902.4 814.4 907.2 803.2z" p-id="1550" fill="#D32F2F"></path><path d="M961.6 632c0 0 6.4 4.8 16 9.6l43.2-164.8c6.4-24-8-48-30.4-54.4l-129.6-35.2c14.4 8 43.2 22.4 75.2 25.6-8 3.2-22.4 6.4-35.2 8l83.2 22.4c11.2 3.2 19.2 16 16 27.2l-81.6 305.6c3.2 12.8 4.8 28.8 1.6 43.2 6.4-6.4 12.8-14.4 16-24l35.2-131.2C960 657.6 961.6 632 961.6 632z" p-id="1551" fill="#D32F2F"></path>
                <path d="M313.6 483.2c-6.4 17.6-12.8 30.4-17.6 40-6.4 9.6-16 12.8-30.4 8l-123.2-33.6c-14.4-3.2-19.2-12.8-16-27.2C118.4 465.6 112 457.6 112 457.6s8-1.6 19.2-4.8l16-57.6 148.8 40-4.8 16 20.8 6.4 32-118.4L142.4 283.2l-4.8 19.2 179.2 48L300.8 416l-148.8-40 9.6-35.2L139.2 336l-35.2 131.2c-6.4 27.2 1.6 43.2 27.2 49.6l132.8 35.2c22.4 6.4 40 0 49.6-17.6 4.8-9.6 11.2-22.4 19.2-40C324.8 491.2 318.4 486.4 313.6 483.2z" p-id="1552" fill="#D32F2F"></path>
              </svg>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { List, Cell, CellGroup, Tab, Tabs, Grid, GridItem, Search } from 'vant'
import WithdrawHeader from '../SharedHeader/SharedHeader'
import axios from 'axios'
export default {
  data () {
    return {
      active: 0,
      amount: 0,
      url: '/api/Promoter/allChild',
      list: [],
      originFirstChild: [],
      originSecondChild: [],
      firstChild: [],
      secondChild: [],
      sort: '',
      listConfig: [
        {
          title: '好友列表', // 一级
          amount: 0,
          list: [],
          immediateCheck: false,
          error: false,
          loading: false,
          finished: false,
          loaded: false,
          params: {
            page: 0,
            limit: 20,
            keyword: '',
            grade: 0,
            sort: ''
          },
          sortConfig: [
            { index: 0, title: '团队排序', keyWord: 'sonCount', class: 'type1', sortType: 0, param: ['', 'childCount DESC', 'childCount ASC'] },
            { index: 1, title: '金额排序', keyWord: 'orderPriceSum', class: 'type1', sortType: 0, param: ['', 'numberCount DESC', 'numberCount ASC'] },
            { index: 2, title: '订单排序', keyWord: 'orderCount', class: 'type1', sortType: 0, param: ['', 'orderCount DESC', 'orderCount ASC'] }
          ]
        } // ,
        // {
        //   title: '二级',
        //   amount: 0,
        //   list: [],
        //   immediateCheck: false,
        //   error: false,
        //   loading: false,
        //   finished: false,
        //   loaded: false,
        //   params: {
        //     page: 0,
        //     limit: 20,
        //     keyword: '',
        //     grade: 0,
        //     sort: ''
        //   },
        //   sortConfig: [
        //     { index: 0, title: '团队排序', keyWord: 'sonCount', class: 'type1', sortType: 0, param: ['', 'childCount DESC', 'childCount ASC'] },
        //     { index: 1, title: '金额排序', keyWord: 'orderPriceSum', class: 'type1', sortType: 0, param: ['', 'numberCount DESC', 'numberCount ASC'] },
        //     { index: 2, title: '订单排序', keyWord: 'orderCount', class: 'type1', sortType: 0, param: ['', 'orderCount DESC', 'orderCount ASC'] }
        //   ]
        // }
      ]
    }
  },
  methods: {
    refresh: function () {
      this.url = '/api/Promoter/allChild'
      this.listConfig[this.active].list = []
      this.listConfig[this.active].immediateCheck = false
      this.listConfig[this.active].error = false
      this.listConfig[this.active].loading = false
      this.listConfig[this.active].finished = false
      this.listConfig[this.active].loaded = false
      this.listConfig[this.active].params = {
        page: 0,
        limit: 20,
        keyword: '',
        grade: 0,
        sort: ''
      }
      this.listConfig[this.active].sortConfig = [
        { index: 0, title: '团队排序', keyWord: 'sonCount', class: 'type1', sortType: 0, param: ['', 'childCount DESC', 'childCount ASC'] },
        { index: 1, title: '金额排序', keyWord: 'orderPriceSum', class: 'type1', sortType: 0, param: ['', 'numberCount DESC', 'numberCount ASC'] },
        { index: 2, title: '订单排序', keyWord: 'orderCount', class: 'type1', sortType: 0, param: ['', 'orderCount DESC', 'orderCount ASC'] }
      ]
    },
    changeUrlParams: function () {
      console.log(this.active)
      this.refresh()
      this.onLoad()
    },
    sortFetchConfig: function (target) {
      this.refresh()
      console.log(target)
      if (target.sortType === 0) {
        this.listConfig[this.active].sortConfig[target.index].class = 'type2'
        this.listConfig[this.active].sortConfig[target.index].sortType = 1
        console.log(target.keyWord)
        if (this.active === 0) {
          this.firstChild = this.firstChild.sort(function (a, b) {
            return b[target.keyWord] - a[target.keyWord]
          })
        } else if (this.active === 1) {
          this.secondChild = this.secondChild.sort(function (a, b) {
            return b[target.keyWord] - a[target.keyWord]
          })
        }
      } else if (target.sortType === 1) {
        this.listConfig[this.active].sortConfig[target.index].class = 'type3'
        this.listConfig[this.active].sortConfig[target.index].sortType = 2
        if (this.active === 0) {
          this.firstChild = this.firstChild.sort(function (a, b) {
            return a[target.keyWord] - b[target.keyWord]
          })
        } else if (this.active === 1) {
          this.secondChild = this.secondChild.sort(function (a, b) {
            return a[target.keyWord] - b[target.keyWord]
          })
        }
      } else if (target.sortType === 2) {
        this.listConfig[this.active].sortConfig[target.index].class = 'type1'
        this.listConfig[this.active].sortConfig[target.index].sortType = 0
        if (this.active === 0) {
          this.firstChild = this.originFirstChild
          console.log(this.firstChild)
        } else if (this.active === 1) {
          this.secondChild = this.originSecondChild
        }
      }
      this.onLoad()
    },
    onLoad: function () {
      let vm = this
      let pageList = []
      setTimeout(function () {
        if (vm.active === 0) {
          pageList = vm.firstChild.slice(vm.listConfig[vm.active].params.page * vm.listConfig[vm.active].params.limit, vm.listConfig[vm.active].params.page * vm.listConfig[vm.active].params.limit + vm.listConfig[vm.active].params.limit)
        } else if (vm.active === 1) {
          pageList = vm.secondChild.slice(vm.listConfig[vm.active].params.page * vm.listConfig[vm.active].params.limit, vm.listConfig[vm.active].params.page * vm.listConfig[vm.active].params.limit + vm.listConfig[vm.active].params.limit)
        }
        if (pageList.length < vm.listConfig[vm.active].params.limit) {
          vm.listConfig[vm.active].finished = true
        }
        vm.listConfig[vm.active].list = vm.listConfig[vm.active].list.concat(pageList)
        console.log(vm.list)
        vm.listConfig[vm.active].params.page += 1
        vm.listConfig[vm.active].loading = false
        vm.listConfig[vm.active].loaded = true
      }, 300)
    }
  },
  created: function () {
    let vm = this
    axios
      .get(this.url)
      .then(response => {
        console.log(response.data)
        let config = response.data
        vm.loading = false
        vm.originFirstChild = config.data.firstChild
        vm.originSecondChild = config.data.secondChild
        vm.firstChild = [...vm.originFirstChild]
        vm.secondChild = [...config.data.secondChild]
        vm.amount = vm.firstChild.length // + vm.secondChild.length
        vm.listConfig[0].amount = vm.firstChild.length
        // vm.listConfig[1].amount = vm.secondChild.length
        vm.listConfig[0].list = vm.firstChild.slice(0, vm.listConfig[0].params.limit)
        vm.listConfig[0].params.page += 1
        if (vm.listConfig[0].list.length < vm.listConfig[0].params.limit) {
          vm.listConfig[0].finished = true
        }
        vm.listConfig[0].loading = false
        vm.listConfig[0].loaded = true
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
      // .finally(() => {
      //   this.loading = false
      // })
  },
  components: {
    'withdraw-header': WithdrawHeader,
    'van-list': List,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-search': Search
  }
}
</script>

<style scoped>
  .right-value {
    font-size: 9px;
    transform: scale(0.9);
    line-height: 15px;
  }
  .avatar img {
    width: 50px;
    margin-right: 10px;
    border-radius: 50px;
    box-shadow: 1px 1px 3px #323233;
  }
  .sort-item div {
    line-height: 18px;
    display: inline-block;
  }
  .sort-item div img {
    width: 60%;
  }
  .icon {
    float: right;
    width: 12px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .icon.type1 {
    background-image: url("../../../../assets/sort2.png");
  }
  .icon.type2 {
    background-image: url("../../../../assets/sort1.png");
  }
  .icon.type3 {
    background-image: url("../../../../assets/sort3.png");
  }
</style>
