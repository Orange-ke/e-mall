<template>
  <div class="my-panel">
    <van-panel>
      <div>
        <van-grid :column-num="columnNum" :border="false">
          <van-grid-item
            style="color: #E64A19"
            v-for="(item, index) in items"
            :key="index"
            :text="item.text"
            :to="item.to"
            @click="item.popup ? popup(item.popup) : null"
          >
            <div slot="icon" style="text-align: center">
              <img :src="require(`../../../assets/${item.icon}.png`)" alt="icon" width="60%">
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div slot="header" style="border-bottom: 1px solid #eee;">
        <van-cell :title="title" :is-link="isLink" />
      </div>
    </van-panel>
    <van-popup v-model="customerServiceShow" style="border-radius: 15px; width: 80%; padding: 10px 16px;box-sizing: border-box; font-size: 14px;">
      <div>
        <div style="text-align: center; display: flex; align-items: center; justify-content: center">
          <svg t="1562996976481" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9770"></path></svg>
          <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9301"></path></svg>
          <span style="color: #212121; font-size: 1.2em">客户服务</span>
          <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9301"></path></svg>
          <svg t="1562996976481"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9770"></path></svg>
        </div>
        <div>
          <van-cell
            title="商家电话:"
          >
            <div slot="label" style="font-size: 15px; font-weight: 600; color: #212121;">
              <span>18902531190</span>
            </div>
            <div slot="right-icon">
              <a href="tel: 18902531190" class="blink">
                <svg t="1564207364003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2988" width="40" height="40"><path d="M532.7 100.4l22 78.9c85.2-28 182.7-8.1 250.5 59.7 62.8 62.8 79.5 161.7 60.1 242.1 20.1 7.9 52.2 17.7 77.1 27.9 28.3-111.1 8.8-241.7-78.3-328.9-89.8-89.6-218.3-115.2-331.4-79.7z" fill="#4CAF50" p-id="2989"></path><path d="M516.178373 168.417637a40.9 40.9 0 1 0 57.840325-57.842345 40.9 40.9 0 1 0-57.840325 57.842345Z" fill="#4CAF50" p-id="2990"></path><path d="M728.960896 471.541445a40.9 40.9 0 1 0 57.840325-57.842344 40.9 40.9 0 1 0-57.840325 57.842344Z" fill="#4CAF50" p-id="2991"></path><path d="M576.789113 319.277565a40.9 40.9 0 1 0 57.840325-57.842345 40.9 40.9 0 1 0-57.840325 57.842345Z" fill="#4CAF50" p-id="2992"></path><path d="M873.974908 526.213272a40.9 40.9 0 1 0 57.840325-57.842344 40.9 40.9 0 1 0-57.840325 57.842344Z" fill="#4CAF50" p-id="2993"></path><path d="M597.5 250.1l13.8 80.7c28-3.7 57.4 5.3 78.9 26.8 21.1 21.1 30.1 49.8 27 77.4l64 17.3c0.4-0.5 0.9-1.1 1.4-1.6 4.5-4.5 10.8-6.1 16.1-4.6 6.5-52.2-10.3-106.7-50.3-146.7-40.6-40.5-98.1-56.5-150.9-49.3z" fill="#4CAF50" p-id="2994"></path><path d="M938.2 840.4c1.8-3.2 3.2-6.7 4.1-10.4 4.8-17 7.4-34.9 7.4-53.5 0-108.8-88.2-197-197-197-92.3 0-169.8 63.6-191.2 149.3-121.8-54.4-216.3-159.6-255.9-289.2 84.6-22.1 147.1-99 147.1-190.6v-0.9-0.9c0-108.1-87.7-195.8-195.8-195.8-27.3 0-53.3 5.6-76.9 15.7-71.2 29.8-121.3 100-121.3 182 0 2.8 0.1 5.6 0.2 8.4-0.1 4.8-0.2 9.6-0.2 14.4 0 387.5 314.2 700.6 701.7 700.6 2.9 0 5.8-0.2 8.6-0.2 3.4-0.1 6.8-0.7 9.9-1.7 74.4-9.8 135.5-61.3 159.3-130.2z" fill="#4CAF50" p-id="2995"></path></svg>
              </a>
            </div>
          </van-cell>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Panel, Grid, GridItem, Icon, CellGroup, Cell, Popup } from 'vant'
import { store } from '../../../store/store'
export default {
  data: function () {
    return {
      columnNum: 4,
      title: '我的服务',
      isLink: false,
      text: '',
      to: '',
      items: store.getters.userData.showSave ? [
        // {icon: 'icon_6', text: '会员中心', to: '/user-center/member-center'},
        {icon: 'icon_6', text: '推广名片', to: '/user-center/my-promotion/poster'},
        // {icon: 'icon_8', text: '我的余额', to: '/user-center/my-account'},
        // {icon: 'icon_9', text: '地址信息', to: '/user-center/address-list'},
        {icon: 'icon_7', text: '我的收藏', to: '/user-center/collect-list'},
        // {icon: 'icon_11', text: '优惠券', to: '/user-center/get-coupon'},
        // {icon: 'icon_12', text: '砍价记录', to: ''},
        {icon: 'icon_8', text: '联系客服', to: '', popup: true},
        {icon: 'icon_9', text: '常见问题', to: '/user-center/FAQ'},
        {icon: 'icon_10', text: '我的好友', to: '/user-center/my-promotion/promoter-list'},
        {icon: 'icon_11', text: '我的客户', to: '/user-center/my-promotion/promoter-orders'},
        {icon: 'icon_12', text: '佣金明细', to: '/user-center/my-promotion/commission-record'},
        {icon: 'icon_13', text: '提现记录', to: '/user-center/my-promotion/withdraw-list'},
        {icon: 'icon_14', text: '联系商家', to: '/user-center/contact'}
      ] : [
        {icon: 'icon_7', text: '我的收藏', to: '/user-center/collect-list'},
        {icon: 'icon_8', text: '联系客服', to: '', popup: true},
        {icon: 'icon_9', text: '常见问题', to: '/user-center/FAQ'},
        {icon: 'icon_14', text: '联系商家', to: '/user-center/contact'}
      ],
      // 客服弹窗
      customerServiceShow: false
    }
  },
  methods: {
    popup: function (popup) {
      console.log(popup)
      if (popup) {
        this.customerServiceShow = true
      }
    }
  },
  components: {
    'van-panel': Panel,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-popup': Popup
  }
}
</script>

<style scoped>
  .my-panel {
    margin: 10px 16px;
  }
  .van-cell__value {
    text-align: right;
  }
  .blink {
    display: inline-block;
    animation: blink 1s infinite;
    -webkit-animation: blink 1s infinite;
  }
  @keyframes blink {
    from { transform: scale(0.8); }
    to { transform: scale(1); }
  }
  .background-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
