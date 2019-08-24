<template>
  <div class="member-center">
    <div class="swiper-parent">
      <!-- swiper -->
      <swiper :options="swiperOption"
              :activeIndex="activeIndex"
              ref="swipe"
      >
        <swiper-slide
          v-for="(item,index) in levelList"
          :key="index"
          class="slider"
          :style="'background-image: url(' + item.image + ')'"
        >
          <div class="card-content">
            <p class="member-title">{{ memberTitle }}</p>
            <p class="member-discount">可享受商品折扣: {{ discount }}折</p>
            <p class="member-islocked">{{ grade > 1 ? '' : '该会员等级尚未解锁' }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="task">
      <div class="task-title">
        <svg t="1563000159256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12095" width="16" height="16"><path d="M816.49 909H211.21c-1.1 0-2-0.9-2-2v-68.18c0-1.1 0.9-2 2-2h605.28c1.1 0 2 0.9 2 2V907c0 1.1-0.9 2-2 2z" fill="#FFAA22" p-id="12096"></path><path d="M910.24 316.23c-27.11 0-49.1 22.52-49.1 50.31 0 7.28 1.58 14.16 4.3 20.4l-176.13 80.21-147.2-258.57c14.56-8.73 24.46-24.74 24.46-43.28 0-27.79-21.98-50.31-49.1-50.31s-49.1 22.52-49.1 50.31c0 17.99 9.29 33.66 23.15 42.55l-158.16 259.3-176.13-80.21c2.71-6.25 4.3-13.12 4.3-20.4 0-27.78-21.98-50.31-49.1-50.31s-49.1 22.52-49.1 50.31c0 27.78 21.98 50.31 49.1 50.31 3.99 0 7.82-0.62 11.53-1.54l86.65 366.28h601.43l86.65-366.28c3.71 0.92 7.54 1.54 11.53 1.54 27.12 0 49.1-22.52 49.1-50.31 0.01-27.78-21.97-50.31-49.08-50.31z" fill="#FFD68D" p-id="12097"></path></svg>
        <span>会员升级要求</span>
        <span class="right-scoring">
          <span class="scoring">{{ reach_count }}</span>
          /
          <span>{{ taskList.length }}</span>
        </span>
      </div>
      <div
        class="task-item"
        v-for="(item,index) in taskList"
        :key="index"
      >
        <div class="task-item-header">
          <span>{{ item.name }}</span>
          <span class="right-scoring">{{ item.finish ? 'yes' : '未满足条件' }}</span>
        </div>
        <div class="detail">
          <van-progress
            style="margin: 15px 0;"
            :pivot-text="(item.new_number/item.number)*100 + '%'"
            color="#8BC34A"
            :percentage="(item.new_number/item.number)*100"
          />
          <div class="task-item-footer">
            <span>{{ item.task_type_title }}</span>
            <span class="right-scoring">
              <span class="scoring">{{ item.new_number }}</span>
              /
              <span>{{ item.number }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <recommend></recommend>
  </div>
</template>

<script>
import { Progress } from 'vant'
import Recommend from '../../Shared/Recommend/Recommend'
import axios from 'axios'
export default {
  data () {
    return {
      activeIndex: 0,
      memberTitle: '',
      discount: 0,
      grade: 1,
      levelList: [],
      reach_count: 0,
      taskList: [],
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
    axios
      .get('/ebapi/public_api/get_level_list.html')
      .then(response => {
        let config = response.data
        console.log(config)
        this.memberTitle = config.data.list[0].explain
        this.discount = config.data.list[0].discount
        this.grade = config.data.list[0].grade
        this.levelList = config.data.list
        this.reach_count = config.data.task.reach_count
        this.taskList = config.data.task.task
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { this.loading = false })
  },
  methods: {
  },
  components: {
    'van-progress': Progress,
    'recommend': Recommend
  }
}
</script>

<style scoped>
  .member-center {
    background: #eee;
  }
  .swiper-inner {
    width: 100%;
    height: 200px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
    height: 150px;
  }
  .slider {
    margin: 0 auto;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .swiper-parent {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7d7e7d+0,0e0e0e+100;Black+3D */
    background: rgb(125,126,125); /* Old browsers */
    background: -moz-linear-gradient(top,  rgba(125,126,125,1) 0%, rgba(14,14,14,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7d7e7d', endColorstr='#0e0e0e',GradientType=0 ); /* IE6-9 */
    padding: 30px 0;
  }
  .card-content {
    color: #fff;
    padding: 25px 15px;
  }
  .card-content p {
    margin-top: 0;
  }
  .member-discount {
    font-size: 14px;
  }
  .card-content .member-islocked {
    font-size: 13px;
    margin-top: 25px;
  }
  .task {
    background: #fff;
    padding: 10px 16px;
  }
  .task-title {
    font-size: 14px;
    font-weight: 600;
  }
  .task-item {
    color: #fff;
    padding: 10px 0;
    border-radius: 5px;
    margin-top: 10px;
    background: #757575;
  }
  .detail {
    padding: 10px 16px;
  }
  .task-item-header {
    border-left: 3px solid #FF9800;
    padding: 0 16px 0 16px;
    font-size: 13px;
    font-weight: 600;
  }
  .task-item-footer {
    font-size: 12px;
  }
  .right-scoring {
    color: #9E9E9E;
    float: right;
    font-size: 90%;
  }
  .scoring {
    color: #FF9800;
    font-weight: 600;
  }
</style>
