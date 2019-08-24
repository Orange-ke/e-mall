<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    >
      <div slot="default" style="width: 70%; margin: 0 auto">
        <img src="../../../assets/noAddress.png" alt="地址" width="100%">
      </div>
    </van-address-list>
  </div>
</template>

<script>
import { AddressList, Toast } from 'vant'
export default {
  data () {
    return {
      show: false,
      chosenAddressId: '1',
      list: [
        // {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        // },
        // {
        //   id: '2',
        //   name: '李四',
        //   tel: '1310000000',
        //   address: '浙江省杭州市拱墅区莫干山路 50 号'
        // }
      ]
    }
  },
  methods: {
    onAdd () {
      Toast('功能关闭')
      this.show = true
    },

    onEdit (item, index) {
      Toast('编辑地址:' + index)
    },
    onSave () {
      Toast('save')
    },
    onDelete () {
      Toast('delete')
    }
  },
  components: {
    'van-address-list': AddressList
  }
}
</script>

<style scoped>
</style>
