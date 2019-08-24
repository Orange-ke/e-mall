<template>
  <div>
    <!-- swiper -->
    <swiper
      style="min-height: 500px;"
      :options="swiperOption"
      :activeIndex="activeIndex"
      ref="mySwiper"
      @slideChange="alert(activeIndex)"
    >
      <swiper-slide
        v-for="(item,index) in posterList"
        :key="index"
        class="slide-1 slider"
      >
        <img v-lazy="item" alt="poster" width="100%">
      </swiper-slide>
    </swiper>
    <div style="text-align: center;">
      <van-button
        @click="downloadIamge('canvas', '图片名称')"
        class="orange-btn"
        style="margin: 16px auto 0;width: 90%;"
        size="large"
        type="danger"
        round>
        长按图片分享给朋友
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      activeIndex: 0,
      posterList: [],
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      }
    }
  },
  mounted: function () {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    axios
      .get('/api/WeChat/getPromoterPoster2')
      .then(response => {
        let config = response.data
        Toast.clear()
        this.posterList = config.data
        console.log(this.posterList)
      })
      .catch(error => {
        console.log(error)
      })
      // .finally(() => { this.loading = false })
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    alert: function (index) {
      console.log(this.activeIndex, index)
    },
    downloadIamge: function (selector, name) {
      this.$toast('长按图片分享给朋友')
    }
  },
  components: {
    'van-button': Button
  }
}
</script>

<style scoped>
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    margin-top: 50px;
    width: 300px;
    height: 500px;
  }
  .slider {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
