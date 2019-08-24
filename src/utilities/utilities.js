import axios from 'axios'
import { Toast } from 'vant'

const getQueryString = (key) => {
  function getHashParameters () {
    if ((window.location.hash || '').split('?')[1]) {
      let arr = (window.location.hash || '').split('?')[1].split('&')
      let params = {}
      for (let i = 0; i < arr.length; i++) {
        let data = arr[i].split('=')
        if (data.length === 2) {
          params[data[0]] = data[1]
        }
      }
      return params
    } else {
      return null
    }
  }
  let params = getHashParameters()
  if (params) {
    return params[key]
  } else {
    return ''
  }
}

// pages/goods_list/goods_list?sid=52&title=亲子活动

const getSidFromUrl = (name, url) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let sid = url.substr(url.indexOf('?') + 1).match(reg)
  if (sid != null) {
    return unescape(sid[2])
  }
  return null
}

const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

// wx bridgeReady
const onBridgeReady = (response) => {
  let outTradeNo = response.data.outTradeNo
  WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    response.data,
    function (res) {
      try {
        WeixinJSBridge.log(res.err_msg)
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 跳转到支付结果页面
          // router.push('submit-order/pay-result?outTradeNo=' + outTradeNo) // 通过 vue router跳转
          window.location.href = 'https://shop.power-travel.com.cn/dist/index.html#/submit-order/pay-result?outTradeNo=' + outTradeNo // 通过 window location跳转
          // 以上两种方式在支付回调回来都不执行
        } else {
          if (res.err_msg === 'get_brand_wcpay_request:fail') {
            Toast.fail('支付失败， 请尝试重新支付')
          }
          if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            Toast.fail('取消支付')
          }
        }
      } catch (e) {
        console.log(JSON.stringify(e.message))
      }
    }
  )
}

// 若是微信端打开， 执行以下代码进行支付
// TODO 获取openid
const wxPay = (params, onBridgeReady) => {
  axios
    .post('/api/Order/pay', params)
    .then(res => {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        onBridgeReady(res.data)
      }
    })
    .catch(error => {
      console.log(JSON.stringify(error))
    })
}

// 微信外环境中， 进行h5支付调用
const h5Pay = (params, callback, redirectUrl) => {
  console.log('H5')
  axios
    .post('/api/Order/pay', params)
    .then(res => {
      let outTradeNo = res.data.data.outTradeNo
      console.log(outTradeNo)
      console.log(JSON.stringify(res.data))
      let redirectUrl = '/submit-order/pay-result'
      let mwebUrl = res.data.data.mweb_url + '&redirect_url=' + encodeURIComponent(redirectUrl + '?outTradeNo=' + outTradeNo)
      let form = document.createElement('FORM')
      document.body.appendChild(form)
      form.setAttribute('method', 'POST')
      form.setAttribute('action', mwebUrl)
      form.submit()
    })
    .catch(error => {
      console.log(JSON.stringify(error))
    })
}

export {
  getQueryString,
  getSidFromUrl,
  isWeiXin,
  onBridgeReady,
  wxPay,
  h5Pay
}
