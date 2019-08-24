import Vue from 'vue'
import Router from 'vue-router'
import NavBars from '../components/NavBars/Navbars'
import Home from '../components/Home/Home'
import Search from '../components/Search/Search'
import HotProducts from '../components/HotProducts/HotProducts'
import Category from '../components/Category/Category'
import Recommend from '../components/Recommend/Recommend'
import UserCenter from '../components/UserCenter/UserCenter'
import ProductDetail from '../components/ProductDetail/ProductDetail'
import SetUserInfo from '../components/UserCenter/SetUserInfo/SetUserInfo'
import MyAccount from '../components/UserCenter/MyAccount/MyAccount'
import BillDetail from '../components/UserCenter/MyAccount/BillDetail/BillDetail'
import MyPoints from '../components/UserCenter/MyAccount/MyPoints/MyPoints'
import MyOrder from '../components/UserCenter/MyOrder/MyOrder'
import SubmitOrder from '../components/SubmitOrder/SubmitOrder'
import Attendance from '../components/UserCenter/MyAccount/Attendance/Attendance'
import AttendanceList from '../components/UserCenter/MyAccount/Attendance/AttendanceList/AttendanceList'
import GetCoupon from '../components/UserCenter/MyAccount/GetCoupon/GetCoupon'
import MyPromotion from '../components/UserCenter/MyPromotion/MyPromotion'
import Withdraw from '../components/UserCenter/MyPromotion/WithdrawList/WithdrawList'
import Poster from '../components/UserCenter/MyPromotion/Poster/Poster'
import CommissionRecord from '../components/UserCenter/MyPromotion/CommissionRecord/CommissionRecord'
import PromoterOrders from '../components/UserCenter/MyPromotion/PromoterOrders/PromoterOrders'
import PromoterList from '../components/UserCenter/MyPromotion/PromoterList/PromoterList'
import ToWithdraw from '../components/UserCenter/MyPromotion/ToWithdraw/ToWithdraw'
import MemberCenter from '../components/UserCenter/MemberCenter/MemberCenter'
import AddressList from '../components/UserCenter/AddressManage/AddressList'
import AddressEdit from '../components/UserCenter/AddressManage/AddressEdit'
import CollectList from '../components/UserCenter/CollectList/CollectList'
import Auth from '../components/Authorization/Authorization'
import PayResult from '../components/SubmitOrder/PayResult/PayResult'
import OrderStep from '../components/SubmitOrder/OrderStep/OrderStep'
import Remark from '../components/UserCenter/MyOrder/Remark/Remark'
import Refund from '../components/UserCenter/MyOrder/Refund/Refund'
import FAQ from '../components/UserCenter/FAQ/FAQ'
import RankList from '../components/UserCenter/RankList/RankList'
import Contact from '../components/UserCenter/Contact/Contact'

Vue.use(Router)

const routes = [
  {
    path: '/',
    components: {default: Home, nav: NavBars},
    meta: { title: '大象亲子' }
  },
  {
    path: '/search',
    component: Search,
    meta: { title: '搜索产品' }
  },
  { path: '/hot-product',
    components: {default: HotProducts, nav: NavBars},
    meta: { title: '爆款抢购' }
  },
  {
    path: '/category',
    components: {default: Category},
    props: (route) => ({ query: route.query.sid })
  },
  {
    path: '/recommend',
    components: {default: Recommend, nav: NavBars},
    meta: { title: '最新推荐' }
  },
  {
    path: '/user-center',
    components: {default: UserCenter, nav: NavBars},
    meta: { title: '个人中心' }
  },
  {
    path: '/user-center/rank-list',
    components: {default: RankList},
    meta: { title: '收入排行榜' }
  },
  // --------------------------------------user center： panel_1 子页面
  {
    path: '/user-center/set-user-info',
    component: SetUserInfo,
    meta: { title: '设置个人信息' }
  },
  {
    path: '/user-center/my-account',
    component: MyAccount,
    meta: { title: '我的账户' }
  },
  // --------------------------------------my account： 子页面
  {
    path: '/user-center/my-account/bill-record',
    component: BillDetail,
    props: (route) => ({ query: route.query.type }),
    meta: { title: '账单记录' }
  },
  {
    path: '/user-center/my-account/my-points',
    component: MyPoints,
    meta: { title: '我的积分' }
  },
  {
    path: '/user-center/my-account/attendance',
    component: Attendance,
    meta: { title: '积分签到' }
  },
  {
    path: '/user-center/my-account/attendance/attendance-list',
    component: AttendanceList,
    meta: { title: '签到历史' }
  },
  // --------------------------------------my account： 子页面
  {
    path: '/user-center/my-promotion',
    component: MyPromotion,
    meta: { title: '我的推广' }
  },
  // --------------------------------------my promotion： 子页面
  {
    path: '/user-center/my-promotion/poster',
    component: Poster,
    meta: { title: '分销海报' }
  },
  {
    path: '/user-center/my-promotion/promoter-list',
    component: PromoterList,
    meta: { title: '推广人列表' }
  },
  {
    path: '/user-center/my-promotion/commission-record',
    component: CommissionRecord,
    meta: { title: '佣金记录' }
  },
  {
    path: '/user-center/my-promotion/promoter-orders',
    component: PromoterOrders,
    meta: { title: '推广人订单' }
  },
  {
    path: '/user-center/my-promotion/to-withdraw',
    component: ToWithdraw,
    meta: { title: '提现' }
  },
  {
    path: '/user-center/my-promotion/withdraw-list',
    component: Withdraw,
    meta: { title: '提现记录' }
  },
  // --------------------------------------user center: my-order 子页面
  {
    path: '/user-center/my-order',
    component: MyOrder,
    props: (route) => ({ query: route.query.orderType }),
    meta: { title: '我的订单' }
  },
  {
    path: '/user-center/my-order/refund',
    component: Refund,
    props: (route) => ({ query: route.query.orderId }),
    meta: { title: '售后退款' }
  },
  {
    path: '/user-center/my-order/remark',
    component: Remark,
    props: (route) => ({ query: route.query.orderId }),
    meta: { title: '产品评价' }
  },
  // --------------------------------------user center: my-service 子页面
  {
    path: '/user-center/member-center',
    component: MemberCenter,
    meta: { title: '会员中心' }
  },
  {
    path: '/user-center/address-list',
    component: AddressList,
    meta: { title: '地址管理' }
  },
  {
    path: '/user-center/address-edit',
    component: AddressEdit,
    meta: { title: '编辑地址' }
  },
  {
    path: '/user-center/collect-list',
    component: CollectList,
    meta: { title: '我的收藏' }
  },
  {
    path: '/user-center/get-coupon',
    component: GetCoupon,
    meta: { title: '我的优惠券' }
  },
  {
    path: '/user-center/FAQ',
    component: FAQ,
    meta: { title: '常见问题' }
  },
  {
    path: '/user-center/contact',
    component: Contact,
    meta: { title: '联系商家' }
  },
  // --------------------------------------product-detail
  {
    path: '/product-detail',
    component: ProductDetail,
    props: (route) => ({ query: route.query.pid }),
    meta: { title: '商品详情' }
  },
  {
    path: '/submit-order',
    component: SubmitOrder,
    meta: { title: '提交订单' }
  },
  {
    path: '/submit-order/pay-result',
    component: PayResult,
    props: (route) => ({ query: route.query.outTradeNo }),
    meta: { title: '支付结果' }
  },
  {
    path: '/submit-order/order-step',
    component: OrderStep,
    props: (route) => ({ query: route.query.outTradeNo }),
    meta: { title: '订单详情' }
  },
  {
    path: '/auth',
    component: Auth,
    meta: { title: '登陆' }
  }
]

export default new Router({
  routes: routes
})
