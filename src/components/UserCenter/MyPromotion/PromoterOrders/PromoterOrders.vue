<template>
  <div class="promoter-orders clear">
    <van-tabs v-model="active" animated color="#ffd31c" sticky class="leaveSpaceForHint">
      <van-tab
        v-for="(item, index) in tabConfig"
        :key="index"
        :title="item.title + ' (' + item.list.length + ')'"
      >
        <div v-if="item.isEmpty">
          <div class="empty">
            <img src="../../../../assets/noOrder.png" alt="empty">
          </div>
        </div>
        <van-list
          v-else
          v-model="item.loading"
          :finished="item.finished"
          :error="item.error"
          :immediate-check="item.immediateCheck"
          finished-text="没有更多了"
        >
          <van-cell
            class="card-style"
            center
            title-style="flex: 2; white-space:nowrap; text-overflow: ellipsis; overflow: hidden;"
            v-for="(listItem,index) in item.list"
            :key="index"
            :title="listItem.nickname"
            :label="'加入时间：' + listItem.created_at"
          >
            <div slot="icon" class="avatar" style="margin-right: 10px;">
              <img v-lazy="listItem.avatar" alt="avatar" width="50" height="50" style="border-radius: 50px; box-shadow: 1px 1px 3px #ddd;">
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="customerInfo" @click="showHint">
      <span>客户说明</span>
      <van-icon name="arrow"/>
    </div>
    <van-popup
      v-model="hint"
      position="bottom"
      :style="{ height: '60%', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}"
    >
      <div class="body">
        <div class="title">客户说明</div>
        <div class="item">
          <div class="subtitle">
            访客
          </div>
          <div class="content">
            微信好友打开您推广的商品链接/海报，即绑定为您的访客；自绑定时间开始10天内，访客通过微信商城下单，您可获得推广奖励。
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            客户
          </div>
          <div class="content">
            微信好友打开您推广的商品链接/海报，并下单购买了产品，即绑定为您的客户；客户通过微信商城下单，您可长期获得推广奖励。
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { List, Cell, CellGroup, Tab, Tabs, Icon, Popup } from 'vant'
import PromoterOrdersHeader from '../SharedHeader/SharedHeader'
import axios from 'axios'
export default {
  data () {
    return {
      active: 0,
      customerNum: 0,
      visitorsNum: 0,
      tabConfig: [
        {
          title: '客户',
          url: '/api/Customer/all',
          list: [],
          isEmpty: false,
          immediateCheck: false,
          error: false,
          loading: false,
          finished: false,
          loaded: false
        },
        {
          title: '访客',
          url: '/api/Visitor/all',
          list: [],
          isEmpty: false,
          immediateCheck: false,
          error: false,
          loading: false,
          finished: false,
          loaded: false
        }
      ],
      // 显示客户解释信息
      hint: false
    }
  },
  created: function () {
    this.onLoad()
  },
  methods: {
    onLoad: function () {
      axios
        .get(this.tabConfig[0].url)
        .then(response => {
          let config = response.data
          console.log(config)
          this.tabConfig[0].list = config.data.customerList
          this.customerNum = this.tabConfig[0].list.length
          this.tabConfig[0].finished = true
          this.tabConfig[0].loaded = true
          if (this.tabConfig[0].list.length === 0) {
            this.tabConfig[0].isEmpty = true
          }
        })
        .catch(error => {
          console.log(error)
          this.tabConfig[0].error = true
        })
        // .finally(() => { this.tabConfig[0].loading = false }) 低版本浏览器不支持
      axios
        .get(this.tabConfig[1].url)
        .then(response => {
          let config = response.data
          console.log(config)
          this.tabConfig[1].list = config.data.visitorList
          this.visitorsNum = this.tabConfig[1].list.length
          this.tabConfig[1].finished = true
          this.tabConfig[1].loaded = true
          if (this.tabConfig[1].list.length === 0) {
            this.tabConfig[1].isEmpty = true
          }
        })
        .catch(error => {
          console.log(error)
          this.tabConfig[1].error = true
        })
        // .finally(() => { this.tabConfig[1].loading = false }) 低版本浏览器不支持
    },
    showHint: function () {
      console.log('showHint')
      this.hint = true
    }
  },
  components: {
    'promoter-orders-header': PromoterOrdersHeader,
    'van-list': List,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-icon': Icon,
    'van-popup': Popup
  }
}
</script>

<style scoped>
  .empty {
    text-align: center;
  }
  .empty img {
    width: 60%;
  }
  .customerInfo {
    top: 0;
    right: 0;
    z-index: 2;
    color: #ffd31c;
    text-align: right;
    font-size: 12px;
    line-height: 44px;
    width: 30%;
    position: absolute;
    height: 44px;
    box-sizing: border-box;
    padding: 0 10px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px 0;
  }
  .body {
    padding: 10px 16px;
  }
  .title {
    padding: 10px 16px;
    text-align: center;
    font-weight: 600;
  }
  .item {
    margin-top: 25px;
  }
  .subtitle {
    border-left: 3px solid #ffd31c;
    padding-left: 15px;
    font-size: 14px;
    font-weight: 600;
  }
  .content {
    border-radius: 10px;
    font-size: 13px;
    background: #eeeeee;
    padding: 10px 16px;
    margin-top: 10px;
    text-align: justify;
  }
  .customerInfo::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-bottom: 1px solid #ebedf0;
    border-top: 1px solid #ebedf0;
    -webkit-transform: scale(.5);
    transform: scale(.5);
  }
</style>
