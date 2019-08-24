<template>
  <div id="app">
    <!--  Router container  -->
    <router-view class="view"></router-view>
    <router-view name="nav"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
<!-- 需要调整的样式  -->
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fafafa;
  min-height: 100vh;
}
.container {
  padding-bottom: 51px;
}
.float-right {
  float: right;
}
.van-tabs__content {
  min-height: 100vh;
}
.van-grid-item__content {
  background: transparent;
  padding: 15px 5px;
}
.my-promotion .van-grid-item__content {
  background: #fff;
  border-radius: 10px;
}
.attendance .van-grid-item__content {
  padding: 5px 3px;
}
.promoter-list .van-tabs__content, .to-withdraw .van-tabs__content, .my-order .van-tabs__content {
  min-height: 0;
}
.to-withdraw .van-tabs__wrap {
  height: 110px;
}
.to-withdraw .van-tabs--line {
  padding-top: 110px;
}
.to-withdraw .van-tab {
  line-height: initial;
  padding-top: 16px;
}
.van-card__price {
  font-weight: 900;
}
.clear:after {
  content: ' ';
  display: block;
  clear: both;
}
.van-card {
  background: #FFF;
  width: 96%;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 1px 1px 3px #ddd;
}
.product-detail p img {
  width: 100% !important;
  height: auto !important;
}
.van-cell__value {
  color: #323233;
}
.van-checkbox__label {
  margin-left: auto;
}
.van-card__content {
  justify-content: center;
}
input {
  cursor:auto;
  height:1.4rem;
  text-overflow:clip;
  overflow:hidden;
  white-space:nowrap;
  min-height:1.4rem;
}
.orange {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f79621+2,f9c667+99 */
  background: #f79621; /* Old browsers */
  background: -moz-linear-gradient(top,  #f79621 2%, #f9c667 99%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  #f79621 2%,#f9c667 99%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  #f79621 2%,#f9c667 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79621', endColorstr='#f9c667',GradientType=0 ); /* IE6-9 */
}
.van-card__desc {
  color: #212121;
  font-weight: 600;
}
.price-color {
  font-size: 15px;
  color: #FF5722;
  font-weight: 600;
}
.orange-btn {
  background: #ffd31c;
  color: #212121;
  border: 1px solid #ffd31c;
}
.red-span {
  background: rgba(255,87,34,0.1);
  margin-top: 5px;
  font-size: 12px;
  display: inline-block;
  padding: 2px 2px;
  border-radius: 5px;
  border: 1px solid #FF5722;
  color: #FF5722;
}
.blue-span {
  background: rgba(68,138,255,0.1);
  margin-top: 5px;
  font-size: 12px;
  display: inline-block;
  padding: 2px 2px;
  border-radius: 5px;
  border: 1px solid #448AFF;
  color: #448AFF;
}
.van-image img {
  display: inline-block;
  border-radius: 10px;
}
.van-swipe__indicators {
  bottom: 10px;
}
.orange-shadow {
  box-shadow: 1px 0 4px #FF9800
}
.van-card__num {
  float: none;
  text-align: right;
}
.columnStyle {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.columnStyle .van-card {
  margin: 10px 2.4% 0;
  width: 45%;
  box-sizing: border-box;
  padding: 0 0;
}
.columnStyle .van-card__header {
  display: inline-block;
  width: 100%;
}
.columnStyle .van-card__header .isLimited {
  position: absolute;
  top: -23px;
  opacity: .8;
  left: 0;
}
.columnStyle .van-card__header .van-card__content {
  padding: 0 5px;
}
.columnStyle .van-card__header .van-card__content .bottom span {
  display: block;
}
.columnStyle .van-card__header .van-card__content .bottom span:nth-child(3) {
  position: absolute;
  top: 75%;
  right: 5px;
}
.van-list {
  padding-top: 10px;
}
.van-list__loading {
  display: block;
  text-align: center;
  width: 100%;
}
.van-list__finished-text {
  display: block;
  width: 100%;
}
.van-step--horizontal .van-step__icon {
  font-size: 20px;
}
.card-style {
  font-size: 14px;
  width: 96%;
  margin: 0 auto 16px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #ddd;
  background: #fff;
  overflow: hidden;
}
.van-grid-item__icon {
  font-size: 36px;
}
.van-toast.van-toast--middle {
  z-index: 100000;
}
.leaveSpaceForHint .van-tabs__wrap {
  width: 70%;
}
</style>
