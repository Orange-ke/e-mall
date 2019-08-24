<template>
  <div class="bill-detail">
    <van-tabs v-model="active" sticky animated swipeable @click="onTabClick">
      <van-tab
        v-for="(item,index) in billType"
        :key="index"
        :title="item.title"
      >
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          :immediate-check="item.immediateCheck"
          :offset="offset"
          :error.sync="item.error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="onload"
        >
          <van-cell-group
            :title="group.money"
            v-for="(group,groupKey) in item.list"
            :key="groupKey"
          >
            <van-cell
              v-for="(detail,key) in group.list"
              :key="key"
              :title="'推荐的用户购买返佣-来自' + detail.nickname"
              title-style="flex: 2"
              :value="'+' + detail.number"
              :label="detail.add_time"
            />
          </van-cell-group>

        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List, Cell, CellGroup } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      active: 0,
      offset: -50,
      billType: [
        {
          title: '全部',
          list: [],
          loaded: false,
          immediateCheck: true,
          loading: false,
          finished: false,
          error: false,
          params: {
            type: 0,
            page: 1,
            limit: 10
          }
        },
        {
          title: '消费',
          list: [],
          loaded: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          error: false,
          params: {
            type: 1,
            page: 1,
            limit: 10
          }
        },
        {
          title: '充值',
          list: [],
          loaded: false,
          immediateCheck: false,
          loading: false,
          finished: false,
          error: false,
          params: {
            type: 2,
            page: 1,
            limit: 10
          }
        }
      ]
    }
  },
  mounted: function () {
  },
  methods: {
    onTabClick (info) {
      if (this.billType[info].loaded) {
        return false
      }
      this.getData(info)
    },
    // 根据tab loaded 状态判断是否要获取对应的产品清单
    getData: function (info) {
      let vm = this
      axios
        .get('/ebapi/user_api/get_user_bill_list.html', {params: this.billType[info].params})
        .then(response => {
          let config = response.data
          console.log(config)
          vm.billType[info].list = vm.billType[info].list.concat(config.data)
          console.log(vm.billType[info].list)
          vm.billType[info].loaded = true
          vm.billType[info].params.page += 1
          vm.billType[info].pullUpLoading = false
          if (config.data < 10) {
            vm.billType[info].finished = true
          }
        })
        .catch(error => {
          console.log(error)
          vm.billType[info].error = true
        })
        .finally(() => { vm.billType[info].loading = false })
    },
    onload: function () {
      let vm = this
      console.log('load')
      vm.getData(vm.active)
    }
  },
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-list': List,
    'van-cell': Cell,
    'van-cell-group': CellGroup
  }
}
</script>

<style scoped>
</style>
