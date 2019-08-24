<template>
  <div class="attendance">
    <attendance-header
      :name="name"
      :src="src"
      :points="points"
    ></attendance-header>
    <scoring-rule
      :rule="rule"
      :sign_num="sign_num"
    >
    </scoring-rule>
    <accumulative-days
      :sum_sign_day="sum_sign_day"
      :sign_detail="sign_detail"
    >
    </accumulative-days>
  </div>
</template>

<script>
import { Cell, Icon, Button } from 'vant'
import AttendanceHeader from './AttendanceHeader/AttendanceHeader'
import ScoringRule from './ScoringRule/ScoringRule'
import AccumulativeDays from './AccumulativeDays/AccumulativeDays'
import axios from 'axios'
export default {
  data () {
    return {
      loading: true,
      name: '',
      src: '',
      points: 0,
      rule: [],
      sign_num: 0,
      sum_sign_day: [],
      sign_detail: []
    }
  },
  mounted: function () {
    axios
      .get('/ebapi/user_api/get_my_user_info.html?isSgin=1')
      .then(response => {
        if (response.data.code === 200) {
          let config = response.data
          console.log(config)
          this.name = config.data.nickname
          this.src = config.data.avatar
          this.points = config.data.integral
          this.sign_num = config.data.sign_num
          let sumSignDay = String(config.data.sum_sgin_day).split('')
          let n = sumSignDay.length
          for (let i = 0; i < (4 - n); i++) {
            sumSignDay.unshift('0')
          }
          this.sum_sign_day = sumSignDay
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
    axios
      .get('/ebapi/public_api/get_system_group_data_value.html?name=sign_day_num')
      .then(response => {
        let config = response.data
        console.log(config)
        this.rule = config.data.sign_day_num
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
    axios
      .get('/ebapi/user_api/get_sign_list.html?page=1&limit=3')
      .then(response => {
        let config = response.data
        console.log(config)
        this.sign_detail = config.data
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
  },
  components: {
    'van-cell': Cell,
    'van-icon': Icon,
    'van-button': Button,
    'attendance-header': AttendanceHeader,
    'scoring-rule': ScoringRule,
    'accumulative-days': AccumulativeDays
  }
}
</script>

<style scoped>
</style>
