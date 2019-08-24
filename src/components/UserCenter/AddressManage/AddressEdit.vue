<template>
  <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
  />
</template>

<script>
import provinceList from '../../../area/area'
import { AddressEdit, Toast } from 'vant'
export default {
  data () {
    return {
      areaList: provinceList,
      searchResult: []
    }
  },
  methods: {
    onSave () {
      Toast('save')
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  },
  components: {
    'van-address-edit': AddressEdit
  }
}
</script>

<style scoped>
</style>
