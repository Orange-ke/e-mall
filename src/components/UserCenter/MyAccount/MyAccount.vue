<template>
  <div class="my-account">
    <my-account-header
      :total="Number(userData.now_money)"
      :recharge="Number(userData.recharge)"
      :consume="Number(userData.pay_count)"
    >
    </my-account-header>
    <bill-record></bill-record>
    <receive></receive>
    <activity></activity>
    <recommend></recommend>
  </div>
</template>

<script>
import MyAccountHeader from './MyAccountHeader/MyAccountHeader'
import BillRecord from './BillRecord/BillRecord'
import Receive from './Receive/Receive'
import Activity from './Activity/Activity'
import Recommend from '../../Shared/Recommend/Recommend'
export default {
  data () {
    return {
      userData: {}
    }
  },
  mounted: function () {
    this.userData = this.$store.getters.userData
    console.log(this.userData)
    // /ebapi/user_api/get_activity.html 获取活动
  },
  methods: {
  },
  components: {
    'my-account-header': MyAccountHeader,
    'bill-record': BillRecord,
    'receive': Receive,
    'activity': Activity,
    'recommend': Recommend
  }
}
</script>

<style scoped>
  .my-account {
    padding: 10px 16px;
    background: #fff;
  }
</style>
