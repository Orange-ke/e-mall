<template>
  <div class="product-info">
    <div class="product-body">
      <div class="info" style="text-align: justify; font-size: 15px; font-weight: 600"> {{ info }} </div>
    </div>
    <div class="product-header">
      <div style="display: flex; align-items: center;">
        <i style="font-size: 20px; color: #F44336; font-weight: 600;">￥{{ price }}</i>
        <van-tag v-if="isLimited" mark type="danger" color="#ffd31c" style="color: #212121;margin-left: 10px;"> <van-icon name="clock-o" /> 限时抢购 </van-tag>
      </div>
      <span class="thumb-up" @click="change">
        <svg t="1563788835578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3124" width="22" height="22"><path d="M884.875894 423.143253 646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.182476-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l0 472.171899c0 46.607504 63.516616 63.393819 88.433098 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.434122-300.70569 88.434122-390.177444 88.434122-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253" p-id="3125" :fill="isLiked ? '#ffd31c' : '#707070'"></path><path d="M251.671415 423.299819 109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.309306 30.361495 30.309306 30.361495 30.309306L262.420223 958.707948c25.686009 0 25.458835-20.049638 25.458835-20.049638L287.879058 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819" p-id="3126" :fill="isLiked ? '#ffd31c' : '#707070'"></path></svg>
      </span>
    </div>
    <div class="product-footer clear">
      <div class="location">
        <span><van-icon name="location-o"></van-icon>地址: </span>
        <span>{{ location }}</span>
      </div>
      <div class="origin item">
        <span>原价 : </span>
        <span> ￥ {{ originPrice }} </span>
      </div>
      <div class="inventory item" style="text-align: center">
        <span>库存 : </span>
        <span>{{ inventory }} {{ unit }} </span>
      </div>
      <div class="sales item" style="text-align: right">
        <span>销量 : </span>
        <span>{{ sales }} {{ unit }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Tag } from 'vant'
import axios from 'axios'
export default {
  props: {
    isLiked: {type: Boolean, default: false},
    price: {type: Number, default: 0},
    originPrice: {type: Number, default: 0},
    info: {type: String, default: ''},
    location: {type: String, default: ''},
    inventory: {type: Number, default: 0},
    sales: {type: Number, default: 0},
    unit: {type: String, default: ''},
    name: {type: String, default: 'thumb-circle-o'},
    isLimited: {type: Boolean, default: false}
  },
  methods: {
    change: function () {
      let pid = this.$route.query.pid
      let url = ''
      if (this.isLiked === false) {
        url = '/ebapi/store_api/like_product.html'
      } else {
        url = '/ebapi/store_api/unlike_product.html'
      }
      axios
        .get(url, {params: { productId: pid }})
        .then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.$parent.changeLike()
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => { console.log('finally') })
    }
  },
  components: {
    'van-icon': Icon,
    'van-tag': Tag
  }
}
</script>

<style scoped>
  .product-info {
    box-sizing: border-box;
    width: 95%;
    margin: 15px auto;
    border-radius: 15px;
    padding: 10px 16px;
    background: #fff;
    box-shadow: 1px 1px 5px #ddd;
  }
  .product-header {
    padding: 8px 0;
    border-bottom: 1px dotted #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-footer {
    margin-top: 10px;
  }
  .price {
    color: #D32F2F;
    font-size: 1.2em;
    font-weight: 900;
  }
  .thumb-up {
    display: inline-block;
    width: 27px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    float: right;
    font-size: 27px;
  }
  .location {
    font-size: 14px;
  }
  .item {
    margin-top: 10px;
    display: inline-block;
    font-size: 14px;
    color: #212121;
    width: 33.3%;
    float: left;
  }
</style>
