<template>
  <div class="my-panel">
    <van-panel :border="border">
      <div>
        <van-grid :column-num="column" :border="false">
          <van-grid-item
            style="color: #E64A19"
            v-for="(item, index) in items"
            :key="index"
            :text="item.text"
            :to="item.to"
          >
            <div slot="icon" style="text-align: center">
              <img :src="require(`../../../assets/${item.icon}.png`)" alt="icon" width="60%">
              <span v-if="item.amount !== 0" style="position: absolute; right: 15px; display: inline-block; min-width: 15px; height: 15px; border-radius: 15px; background: red; color: #fff; font-size: 10px; line-height: 15px;">{{ item.amount }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div slot="header" style="border-bottom: 1px solid #eee;">
        <van-cell :title="title" :is-link="isLink" :to="to" :value="value" />
      </div>
    </van-panel>
  </div>
</template>

<script>
import { Panel, Grid, GridItem, Icon, CellGroup, Cell } from 'vant'
export default {
  props: {
    column: {type: Number, default: 4},
    border: {type: Boolean, default: false},
    title: {type: String, default: ''},
    isLink: {type: Boolean, default: false},
    value: {type: String, default: ''},
    to: {type: Object, default: () => {}},
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
  },
  components: {
    'van-panel': Panel,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell
  }
}
</script>

<style scoped>
  .my-panel {
    margin: 10px 16px;
  }
  .van-cell__value {
    text-align: right;
  }
</style>
