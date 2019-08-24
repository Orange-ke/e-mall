// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import {store} from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import App from './App'
import {Lazyload, Icon, PullRefresh, Row, Col, Toast} from 'vant'
import axios from 'axios'
import wx from 'weixin-jsapi'
import VueClipboard from 'vue-clipboard2'
import {isWeiXin, getQueryString, getSidFromUrl} from './utilities/utilities'

axios.defaults.baseURL = 'https://shop.power-travel.com.cn/'

const routerGuard = () => {
  // 路由保护
  router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/auth') {
      if (to.meta.title) { // 判断是否有标题
        document.title = to.meta.title
      }
      if (to.fullPath.indexOf('/category') !== -1) {
        document.title = getSidFromUrl('title', decodeURI(to.fullPath))
      }
      if (store.getters.token) {
        next()
      } else {
        if (pid !== '') {
          window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid + 'pid' + pid
        } else {
          window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid
        }
      }
    } else {
      next()
    }
  })
  router.afterEach((to) => {
    window.scrollTo(0, 0)
    if (isWeiXin()) {
      if (to.fullPath.indexOf('/product-detail') === -1) {
        // 设置除产品页外的分享展示配置
        wx.miniProgram.postMessage({
          'data': {
            metaTitle: to.meta.title,
            title: '大象亲子--带您和您的家人畅游大湾区',
            url: 'https://shop.power-travel.com.cn/dist/index.html#/',
            imageUrl: 'https://shop.power-travel.com.cn/public/uploads/attach/2019/06/29/5d1716b1b6029.jpg',
            currentUrl: window.location.href,
            shareUid: store.getters.userData.uid,
            fromUid: store.getters.userData.uid
          }
        })
      }
    }
  })
}

const assureToken = (token, callback) => {
  axios.defaults.headers = {
    'content-type': 'application/json',
    'token': token
  }
  // 利用拿到的token 请求获取uid 以确保token 合法
  axios
    .get('/api/Withdraw/getCommisionInfo')
    .then(res => {
      console.log(res)
      if (res.data.code === 200) {
        if (res.data.data.userInfo) {
          console.log(res.data)
          // getQueryString('token')
          // 获取到对应的token 存入 store
          let userInfo = res.data.data.userInfo
          axios
            .get('/api/Promoter/info?userId=' + userInfo.uid)
            .then(response => {
              userInfo.showSave = response.data.data !== null
              userInfo.isMiniprogram = isMiniprogram
              userInfo.balance = res.data.data.balance
              window.sessionStorage.setItem('token', token)
              window.sessionStorage.setItem('userData', JSON.stringify(userInfo))
              store.commit('updateUserData', JSON.parse(window.sessionStorage.getItem('userData')))
              store.commit('updateToken', window.sessionStorage.getItem('token'))
              callback()
              if (isWeiXin()) {
                // 设置除产品页外的分享展示配置
                wx.miniProgram.postMessage({
                  'data': {
                    metaTitle: '大象亲子',
                    title: '大象亲子--带您和您的家人畅游大湾区',
                    url: 'https://shop.power-travel.com.cn/dist/index.html#/',
                    imageUrl: 'https://shop.power-travel.com.cn/public/uploads/attach/2019/06/29/5d1716b1b6029.jpg',
                    currentUrl: window.location.href,
                    shareUid: store.getters.userData.uid
                  }
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          Toast('身份未知, 请登陆')
          if (pid !== '') {
            window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid + 'pid' + pid
          } else {
            window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid
          }
        }
      } else {
        if (pid !== '') {
          window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid + 'pid' + pid
        } else {
          window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const vueInstance = () => {
  axios
    .get('/api/Visitor/add?shareUid=' + shareUid)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  axios
    .get('/api/Promoter/add?fromUid=' + fromUid)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  // 注册wx 到全局Vue 对象
  Vue.prototype.$wx = wx
  // vue实例化 整个项目
  Vue.use(Lazyload).use(Icon).use(PullRefresh).use(Row).use(Col).use(Toast).use(VueAwesomeSwiper).use(VueClipboard)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store: store,
    router,
    components: {App},
    template: '<App />'
  })
}

// wx.miniProgram.navigateTo({url: '/pages/index/index'})
// 若是微信则添加分享配置， 设置webview 中的动态url
const wxConfig = () => {
  if (isWeiXin()) {
    // config
    axios
      .get('/api/WeChat/jsApiSignatrue', {url: 'https://shop.power-travel.com.cn/dist/index.html#/'})
      .then(res => {
        let config = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名
          jsApiList: [
            'checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ] // 必填，需要使用的JS接口列表
        })
        wx.ready(function () {
          // 配置
          let title = '大象亲子--带您和您的家人畅游大湾区'
          let desc = ''
          let link = 'https://shop.power-travel.com.cn/dist/index.html#/?share_uid=' + (store.getters.userData.uid || '') // 分享链接，该链接必须在公众号JS安全域名之下，`http://abc.yeli.studio/another_page`也是可以的
          let imageUrl = 'https://shop.power-travel.com.cn/public/uploads/attach/2019/06/29/5d1716b1b6029.jpg'
          // 分享到消息
          wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imageUrl,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: ''// 如果type是music或video，则要提供数据链接，默认为空
          })
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imageUrl// 分享图标
          })
          // 分享到QQ
          wx.onMenuShareQQ({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imageUrl// 分享图标
          })
          // 分享到微博
          wx.onMenuShareWeibo({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imageUrl// 分享图标
          })
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

          console.log(JSON.stringify(res))
        })
      })
      .catch(error => {
        console.log.log(error + 'test')
      })
  }
}
wxConfig()

// 判断是否已登陆 window.sessionStorage.getItem('token')
let tokenFromQuery = getQueryString('token')
let shareUid = getQueryString('share_uid') || 0
let fromUid = getQueryString('from_uid') || 0
let pid = getQueryString('pid') || 0
let redirectUrl = getQueryString('redirectUrl')
let outTradeNo = getQueryString('outTradeNo')
let isMiniprogram = getQueryString('isMiniprogram')
isMiniprogram = isMiniprogram ? parseInt(isMiniprogram) : 0

// shareUid 分享人id
// fromUid 推广人id
// pid 产品id
// redirectUrl 支付后的返回页面

// 若有以上属性则保存在sessionStorage中
window.sessionStorage.setItem('shareUid', shareUid)
window.sessionStorage.setItem('fromUid', fromUid)
window.sessionStorage.setItem('pid', pid)

// 若保存有值则设置初始值
if (window.sessionStorage.getItem('shareUid') !== '') {
  shareUid = window.sessionStorage.getItem('shareUid') || 0
}
if (window.sessionStorage.getItem('fromUid') !== '') {
  fromUid = window.sessionStorage.getItem('fromUid') || 0
}
if (window.sessionStorage.getItem('pid') !== '') {
  pid = window.sessionStorage.getItem('pid') || 0
}

if (tokenFromQuery || (redirectUrl && outTradeNo)) {
  // 已登陆成功
  window.sessionStorage.setItem('token', tokenFromQuery)
  let href = window.location.href
  if (pid !== '') {
    if (href.indexOf('&token') !== -1) {
      href = href.slice(0, href.indexOf('&token'))
    }
  } else {
    if (href.indexOf('?token') !== -1) {
      href = href.slice(0, href.indexOf('?token'))
    }
  }
  window.location.replace(href)
  assureToken(tokenFromQuery, function () {
    vueInstance()
    routerGuard()
  })
} else {
  // session storage
  let token = window.sessionStorage.getItem('token')
  if (token) {
    assureToken(token, function () {
      vueInstance()
      routerGuard()
    })
  } else {
    if (shareUid !== '') {
      window.sessionStorage.setItem('shareUid', shareUid)
    }
    if (fromUid !== '') {
      window.sessionStorage.setItem('fromUid', fromUid)
    }
    if (pid !== '') {
      window.sessionStorage.setItem('pid', pid)
    }
    if (pid !== '') {
      window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid + 'pid' + pid
    } else {
      window.location.href = 'https://shop.power-travel.com.cn/api/Login/index?isMiniprogram=' + isMiniprogram + '&state=shareUid' + shareUid + 'fromUid' + fromUid
    }
  }
}
