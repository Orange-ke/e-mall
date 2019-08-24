<template>
  <div class="product-detail container">
    <!--  轮播图  ---------------------------------------------------------------------------------->
    <van-swipe :autoplay="3000" :height="230" :show-indicators="showIndicator" @change="indexUpdate">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <div
          class="background-img"
          :style="'width: 100%; height: 100%; background-image: url(' + image + ')'"
        >
        </div>
        <!--  <img v-lazy="image" width="100%" alt="图片" /> 由于后台上传图片尺寸太大，因此使用background来显示图片，不能使用懒加载 -->
      </van-swipe-item>
    </van-swipe>
    <!--  倒数  ------------------------------------------------------------------------------------>
    <div class="countdown clear" v-if="isLimited">
      <countdown :time="time" :transform="transform" @end="handleCountdownEnd" >
        <div slot-scope="props" style="display: flex; justify-content: left; align-items: center;">
          <van-icon name="clock-o"></van-icon>
          <span class="margin-left" style="color: #fff; line-height: 22px;" v-if="isFinished">活动已结束</span>
          <template v-else>
            <span class="margin-left" style="color: #fff;">{{isAdvanceSell ? '即将开抢' : '剩余'}}</span>
            <span class="time margin-left">{{ props.days }}</span> 天
            <span class="time margin-left">{{ props.hours }}</span> 时
            <span class="time margin-left">{{ props.minutes }}</span> 分
            <span class="time margin-left">{{ props.seconds }}</span> 秒
          </template>
        </div>
      </countdown>
    </div>
    <div class="indicator">
      <span>{{ index }} / {{ images.length }}</span>
    </div>
    <!--  产品参数  -------------------------------------------------------------------------------->
    <product-info
      class="card-style"
      :price="infoHeader.price"
      :info="infoHeader.info"
      :location="infoHeader.location"
      :originPrice="infoHeader.originPrice"
      :inventory="infoHeader.inventory"
      :sales="infoHeader.sales"
      :isLimited="infoHeader.isLimited"
      :isLiked="userLike"
      :unit="unit"
    >
    </product-info>
    <!--  产品底部参数  ---------------------------------------------------------------------------->
    <product-config
      class="card-style"
      v-if="productAttr.length === 0"
      :reFund="infoFooter.reFund"
      :returnCash="infoFooter.returnCash"
      :rebate="infoFooter.rebate"
      :showSave="showSave"
    >
    </product-config>
    <!--  优惠券  ---------------------------------------------------------------------------------->
    <van-coupon-cell
      class="card-style"
      :border="1===2"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <van-popup v-model="showList" position="bottom" style="height: 100vh; overflow: hidden">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <div class="card-style" v-if="productAttrShow.length > 0">
      <!--  产品型号选择  ---------------------------------------------------------------------------->
      <van-cell-group :title="attrTitle">
        <van-cell
          title-style="flex: 2"
          v-for="(item, index) in productAttrShow"
          :key="index"
          center
          :title="productValue[item].suk"
        >
          <div slot="label" style="flex: 2">
            <span class="price-color">{{ '￥' + productValue[item].price }}</span>
            <span>已售{{ parseInt(Number(infoHeader.sales * (index + 1) / (productAttrShow.length + productAttrMore.length +  1))) }}</span>
            <br />
            <span class="red-span" v-if="showSave"> 购买返现:{{ productValue[item].fy }} 元 </span>
            <span class="blue-span" v-if="showSave"> 推荐返佣:{{ productValue[item].fy }} 元 </span>
          </div>
          <div slot="default">
            <van-button class="orangeBigger orange" type="danger" size="mini" round @click="attrLinkToProd(productValue[item], index)" :disabled="isAdvanceSell || isFinished">{{ isFinished ? '结束' : isAdvanceSell ? '即将开抢' : '抢购' }}</van-button>
          </div>
        </van-cell>
      </van-cell-group>
      <!--  展开更多  -->
      <van-cell-group v-if="productAttrMore.length > 0">
        <div v-if="showMore">
          <van-cell
            title-style="flex: 2"
            v-for="(item, index) in productAttrMore"
            :key="index"
            center
            :title="'【'+ productValue[item].suk + '】'"
          >
            <div slot="label">
              <span class="price-color">{{ '￥' + productValue[item].price }}</span>
              <span>已售{{ parseInt(Number(infoHeader.sales * (productAttrShow.length + index + 1) / (productAttrShow.length + productAttrMore.length +  1))) }}</span>
              <br />
              <span class="red-span" v-if="showSave"> 购买返现:{{ productValue[item].fy }} 元 </span>
              <span class="blue-span" v-if="showSave"> 推荐返佣:{{ productValue[item].fy }} 元 </span>
            </div>
            <div slot="default">
              <van-button class="orangeBigger orange" type="danger" size="mini" round @click="attrLinkToProd(productValue[item], 5 + index)" :disabled="isAdvanceSell || isFinished">{{ isFinished ? '结束' : isAdvanceSell ? '即将开抢' : '抢购' }}</van-button>
            </div>
          </van-cell>
        </div>
        <van-cell
          :title="showMore ? '收起更多' : '展开更多'"
          title-style="flex: 2; text-align: center"
          clickable
          @click="showMore = !showMore"
        >
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 数量选择弹出 popup sku  -------------------------------------------------->
    <van-popup
      v-model="showSku"
      position="bottom"
      :class="{short: this.productAttr.length === 0, normal: this.productAttr.length !== 0}"
      style="border-top-left-radius: 20px; border-top-right-radius: 20px; "
      @opened="scrollToTarget"
    >
      <van-card
        style="position: fixed; z-index: 1; width: 100%; border-radius: 20px 20px 0 0; box-shadow: 1px 0 10px #212121;"
        :num="amount"
        :price="price"
        :title="title"
        :thumb="src"
      >
        <van-stepper slot="num"  v-model="amount" @overlimit="showIsLimited" :max="limitedNum === 0 ? infoHeader.inventory : limitedNum"></van-stepper>
      </van-card>
      <van-radio-group
        style="margin-top: 110px;"
        v-model="radio"
      >
        <van-cell-group>
          <van-cell
            style="border-radius: 15px; width: 95%; margin: 0 auto"
            title-style="flex: 2"
            v-for="(item, index) in productAttr"
            :key="index"
            center
            :title="productValue[item].suk"
            clickable
            :class="{ 'selected': radio === productValue[item].unique }"
            @click="changeRadio(index)"
          >
            <van-radio checked-color="#ffd31c" slot="right-icon" :name="productValue[item].unique" />
            <div slot="label">
              <span v-if="showSave"> 购买返现:{{ productValue[item].fy }} 元 </span>
              <span v-if="showSave"> 推荐返佣:{{ productValue[item].fy }} 元 </span>
            </div>
            <div slot="default">
              <span style="color: #D32F2F">{{ '￥' + productValue[item].price }}</span>
              <br />
              <span>已售{{ parseInt(Number(infoHeader.sales * (index + 1) / (productAttrShow.length + productAttrMore.length +  1))) }}</span>
            </div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="sku-footer">
        <van-button class="orange-btn" :loading="inSkuBuyBtnLoading" loading-text="加载中..." type="danger" size="large" @click="inSkuBuy">买买买</van-button>
      </div>
    </van-popup>
    <!--  产品详细参数  ---------------------------------------------------------------------------->
    <product-tricks :html="allHtml"></product-tricks>
    <!--  商品底部二维码  -->
    <div class="qrCode" style="margin: 10px 0; background: #fff;" v-if="!$store.getters.userData.isMiniprogram">
      <van-cell center>
        <div slot="title" style="flex: 2">
          <div style="font-weight: 700; padding: 5px 0; font-size: 15px;">
            长按识别公众号二维码
          </div>
          <div style="font-size: 13px;">
            关注公众号可以查看购买的产品订单，获取更多优惠信息
          </div>
          <div style="margin-top: 5px;">
            <van-button size="mini" plain type="primary"  @click="linkToOrder" style="padding-right: 10px; padding-left: 10px;">查看订单</van-button>
            <van-button size="mini" plain type="danger"  @click="linkToHome" style="padding-right: 10px; padding-left: 10px; margin-left: 10px;">返回首页</van-button>
          </div>
        </div>
        <div slot="default">
          <img src="https://shop.power-travel.com.cn/dist/qrCode.jpg" alt="二维码" width="100">
        </div>
      </van-cell>
    </div>
    <!--  产品操作导航  ---------------------------------------------------------------------------->
    <van-goods-action>
      <van-goods-action-icon
        icon="home-o"
        text="主页"
        @click="linkToHome"
      />
      <van-goods-action-icon
        icon="service"
        text="客服"
        @click="navigateToService"
      />
      <van-goods-action-icon
        :icon-class="userCollect ? 'red' : ''"
        :icon="userCollect ? 'like' : 'like-o'"
        text="收藏"
        @click="collectProd"
      />
      <van-goods-action-button
        class="orange-btn"
        text="推广"
        @click="popularize"
      />
      <!-- 客服电话弹窗 -->
      <van-popup v-model="customerServiceShow" style="border-radius: 15px; width: 80%; padding: 10px 16px;box-sizing: border-box; font-size: 14px;">
        <div>
          <div style="text-align: center; display: flex; align-items: center; justify-content: center">
            <svg t="1562996976481" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9770"></path></svg>
            <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9301"></path></svg>
            <span style="color: #212121; font-size: 1.2em">客户服务</span>
            <svg t="1562996897982"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9300" width="32" height="32"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9301"></path></svg>
            <svg t="1562996976481"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9769" width="16" height="16"><path d="M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z" fill="#D7CCC8" p-id="9770"></path></svg>
          </div>
          <div>
            <van-cell
              title="商家电话:"
            >
              <div slot="label" style="font-size: 15px; font-weight: 600; color: #212121;">
                <span>18902531190</span>
              </div>
              <div slot="right-icon">
                <a href="tel: 18902531190" class="blink">
                  <svg t="1564207364003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2988" width="40" height="40"><path d="M532.7 100.4l22 78.9c85.2-28 182.7-8.1 250.5 59.7 62.8 62.8 79.5 161.7 60.1 242.1 20.1 7.9 52.2 17.7 77.1 27.9 28.3-111.1 8.8-241.7-78.3-328.9-89.8-89.6-218.3-115.2-331.4-79.7z" fill="#4CAF50" p-id="2989"></path><path d="M516.178373 168.417637a40.9 40.9 0 1 0 57.840325-57.842345 40.9 40.9 0 1 0-57.840325 57.842345Z" fill="#4CAF50" p-id="2990"></path><path d="M728.960896 471.541445a40.9 40.9 0 1 0 57.840325-57.842344 40.9 40.9 0 1 0-57.840325 57.842344Z" fill="#4CAF50" p-id="2991"></path><path d="M576.789113 319.277565a40.9 40.9 0 1 0 57.840325-57.842345 40.9 40.9 0 1 0-57.840325 57.842345Z" fill="#4CAF50" p-id="2992"></path><path d="M873.974908 526.213272a40.9 40.9 0 1 0 57.840325-57.842344 40.9 40.9 0 1 0-57.840325 57.842344Z" fill="#4CAF50" p-id="2993"></path><path d="M597.5 250.1l13.8 80.7c28-3.7 57.4 5.3 78.9 26.8 21.1 21.1 30.1 49.8 27 77.4l64 17.3c0.4-0.5 0.9-1.1 1.4-1.6 4.5-4.5 10.8-6.1 16.1-4.6 6.5-52.2-10.3-106.7-50.3-146.7-40.6-40.5-98.1-56.5-150.9-49.3z" fill="#4CAF50" p-id="2994"></path><path d="M938.2 840.4c1.8-3.2 3.2-6.7 4.1-10.4 4.8-17 7.4-34.9 7.4-53.5 0-108.8-88.2-197-197-197-92.3 0-169.8 63.6-191.2 149.3-121.8-54.4-216.3-159.6-255.9-289.2 84.6-22.1 147.1-99 147.1-190.6v-0.9-0.9c0-108.1-87.7-195.8-195.8-195.8-27.3 0-53.3 5.6-76.9 15.7-71.2 29.8-121.3 100-121.3 182 0 2.8 0.1 5.6 0.2 8.4-0.1 4.8-0.2 9.6-0.2 14.4 0 387.5 314.2 700.6 701.7 700.6 2.9 0 5.8-0.2 8.6-0.2 3.4-0.1 6.8-0.7 9.9-1.7 74.4-9.8 135.5-61.3 159.3-130.2z" fill="#4CAF50" p-id="2995"></path></svg>
                </a>
              </div>
            </van-cell>
          </div>
        </div>
      </van-popup>
      <van-goods-action-button
        type="danger"
        :text="isFinished ? '活动结束' : isAdvanceSell ? '即将开抢' : '立即购买'"
        @click="onBuyClicked"
        :disabled="isAdvanceSell || isFinished"
      />
    </van-goods-action>
    <!--  产品推广导航  ---------------------------------------------------------------------------->
    <van-popup
      v-model="popularizeShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <div style="padding: 10px 16px">
        <van-grid :column-num="3" :border="false">
          <van-grid-item
            @click="shareToFriend"
            text="发送给朋友"
          >
            <div slot="icon">
              <svg t="1564379425989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2074" width="48" height="48"><path d="M571.648 511.94c-10.257 0-20.517 9.525-20.517 21.25 0 9.527 10.255 19.053 20.517 19.053 15.393 0 26.385-9.527 26.385-19.053 0-11.724-10.99-21.25-26.385-21.25zM504.225 413c16.123 0 26.385-10.257 26.385-25.651 0-16.123-10.261-25.649-26.385-25.649-15.39 0-30.048 9.527-30.048 25.649-0.001 15.396 14.659 25.651 30.048 25.651z m8.062-350.508c-248.427 0-449.813 201.386-449.813 449.813 0 248.425 201.386 449.812 449.813 449.812 248.425 0 449.812-201.386 449.812-449.812 0.001-248.427-201.385-449.813-449.812-449.813z m-85.012 563.773c-27.119 0-46.906-4.394-72.556-11.725L280.7 651.92l21.257-63.031c-52.035-36.64-82.818-82.811-82.818-139.243 0-99.67 93.808-175.889 208.137-175.889 101.135 0 191.279 60.097 208.867 145.113-7.328-1.469-13.926-2.199-19.788-2.199-99.67 0-176.619 74.75-176.619 164.894 0 15.388 2.199 29.313 5.863 43.972-5.863 0.728-12.461 0.728-18.324 0.728z m305.607 71.82l14.655 52.77-55.697-31.512c-21.252 4.394-41.773 10.99-63.025 10.99-98.206 0-175.889-67.422-175.889-150.968 0-83.547 77.685-150.97 175.889-150.97 93.072 0 176.619 67.423 176.619 150.97 0 46.9-31.512 88.673-72.552 118.721zM359.117 361.7c-15.39 0-31.512 9.527-31.512 25.649 0 15.395 16.122 25.656 31.512 25.656 14.66 0 26.385-10.261 26.385-25.656 0-16.122-11.725-25.649-26.385-25.649z m327.595 150.24c-10.995 0-20.522 9.525-20.522 21.25 0 9.527 9.527 19.053 20.522 19.053 14.655 0 25.649-9.527 25.649-19.053 0-11.724-10.994-21.25-25.649-21.25z m0 0z" fill="#4CAF50" p-id="2075"></path></svg>
            </div>
          </van-grid-item>
          <van-grid-item
            text="生成海报"
            @click="generatePoster"
          >
            <div slot="icon">
              <svg t="1564379483824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2552" width="44" height="44"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512zM403.2 704L256 851.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8l147.2-147.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8z m460.8-44.8h-192c-12.8 19.2-76.8 102.4-115.2 153.6-19.2 25.6-51.2 25.6-70.4-12.8-25.6-70.4-64-172.8-64-172.8S307.2 576 236.8 544c-25.6-12.8-32-44.8 0-64C294.4 435.2 384 364.8 384 364.8s6.4-128 6.4-204.8c0-44.8 12.8-51.2 19.2-51.2 6.4 0 19.2 0 44.8 19.2 64 44.8 166.4 115.2 166.4 115.2s108.8-32 172.8-51.2c32-12.8 57.6 12.8 51.2 38.4l-51.2 204.8s64 89.6 102.4 153.6c19.2 38.4 6.4 70.4-32 70.4z" fill="#4CAF50" p-id="2553"></path></svg>
            </div>
          </van-grid-item>
          <van-grid-item
            text="复制文案"
            @click="copyText"
          >
            <div slot="icon">
              <svg t="1564379666603" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8117" width="45" height="45"><path d="M695.402004 588.550273l-272.676711 0c-5.900235 0-10.683718 4.783483-10.683718 10.687356l0 8.319259c0 5.896598 4.779845 10.683718 10.683718 10.683718l272.676711 0c5.900235 0 10.687356-4.783483 10.687356-10.683718l0-8.319259C706.089359 593.337394 701.302239 588.550273 695.402004 588.550273z" p-id="8118" fill="#4CAF50"></path><path d="M422.572512 544.02205l272.673073 0c5.900235 0 10.687356-4.783483 10.687356-10.683718l0-8.319259c0-5.896598-4.783483-10.687356-10.687356-10.687356l-272.673073 0c-5.903873 0-10.687356 4.78712-10.687356 10.687356l0 8.319259C411.885156 539.238567 416.668639 544.02205 422.572512 544.02205z" p-id="8119" fill="#4CAF50"></path><path d="M695.402004 440.356883l-272.676711 0c-5.900235 0-10.683718 4.783483-10.683718 10.687356l0 8.315621c0 5.903873 4.779845 10.683718 10.683718 10.683718l272.676711 0c5.900235 0 10.687356-4.779845 10.687356-10.683718l0-8.315621C706.089359 445.140366 701.302239 440.356883 695.402004 440.356883z" p-id="8120" fill="#4CAF50"></path><path d="M511.999997 0C229.232501 0 0 229.232501 0 511.999997c0 282.771133 229.232501 511.999997 511.999997 511.999997 282.771133 0 512.003635-229.228864 512.003635-511.999997C1024.003631 229.232501 794.77113 0 511.999997 0zM345.483867 727.707792l-46.925421 0c-5.6165 0-10.167175-4.550675-10.167175-10.159899L288.391271 269.533799c0-5.609225 4.550675-10.159899 10.167175-10.159899l352.271683 0c5.612862 0 10.163537 4.550675 10.163537 10.159899l0 48.274982L345.483867 317.808781 345.483867 727.707792zM735.612361 655.49357c0 2.197128-2.062536 6.38404-6.18397 12.560735s-9.308694 13.317362-15.547229 21.414725c-6.24581 8.101001-13.19732 16.609417-20.847255 25.539797-7.660848 8.919468-14.965208 17.020469-21.91308 24.295728-6.95151 7.278897-13.077278 13.317362-18.377304 18.119033-5.300026 4.808946-8.890367 7.206144-10.778296 7.206144l-238.904958 0c-5.656514 0-10.54185-2.400836-14.666922-7.206144-4.121434-4.801671-6.18397-10.498199-6.18397-17.085946l0-363.246412c0-6.864207 2.062536-12.626212 6.18397-17.296929 4.125072-4.667079 9.014046-7.002437 14.666922-7.002437l311.704839 0c5.652876 0 10.538213 2.335358 14.663285 7.002437 4.125072 4.670716 6.18397 10.432722 6.18397 17.296929L735.612361 655.49357z" p-id="8121" fill="#4CAF50"></path></svg>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
    <van-popup v-model="footerUtilShow" :class="{ transparent: contentType === 1, 'notGenerated': notGenerated}" style="border-radius: 15px;">
      <!-- 指向分享按钮的图 -->
      <div v-show="contentType === 1" @click="hide" style="width: 90vw">
        <img src="../../assets/shareHint.png" alt="shareHint" width="100%" />
      </div>
      <!-- 分享图片 -->
      <div v-show="contentType === 2">
        <div>
          <van-icon name="cross" class="close" size="25px" @click="footerUtilShow = false" ></van-icon>
          <div style="width: 100%; margin: 0 auto;">
            <img ref="poster" width="300" height="auto" src="" />
          </div>
          <van-button type="danger" size="large" @click="saveToPhone" class="orange-btn">长按图片分享给朋友</van-button>
        </div>
      </div>
      <!-- 复制文案 -->
      <div v-show="contentType === 3" style="border-radius: 10px; padding: 10px; text-align: center; font-size: 14px; width: 260px;">
        <div style="border-radius: 5px; padding: 10px; text-align: center; font-weight: 600">
          <svg t="1564137469155" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3065" width="35" height="35"><path d="M640 960 192 960C160 960 128 934.4 128 896L128 320C128 281.6 160 256 192 256L192 192C121.6 192 64 249.6 64 320L64 896C64 966.4 121.6 1024 192 1024L640 1024C710.4 1024 768 966.4 768 896L704 896C704 928 672 960 640 960ZM704 0 384 0C313.6 0 256 57.6 256 128L256 704C256 774.4 313.6 832 384 832L832 832C902.4 832 960 774.4 960 704L960 256 704 0ZM608 768 352 768C332.8 768 320 755.2 320 736 320 716.8 332.8 704 352 704L608 704C627.2 704 640 716.8 640 736 640 755.2 627.2 768 608 768ZM800 640 352 640C332.8 640 320 627.2 320 608 320 588.8 332.8 576 352 576L800 576C819.2 576 832 588.8 832 608 832 627.2 819.2 640 800 640ZM800 512 352 512C332.8 512 320 499.2 320 480 320 460.8 332.8 448 352 448L800 448C819.2 448 832 460.8 832 480 832 499.2 819.2 512 800 512ZM704 256 704 96 864 256 704 256Z" p-id="3066" fill="#1296db"></path></svg>
          <br />
          <span>复制文案</span>
        </div>
        <div class="body" style="background: #f5f5f5; color: #212121; padding: 10px 15px; text-align: left">
          <p>
            {{ text }}
          </p>
        </div>
        <div style="border-radius: 5px; padding: 10px; text-align: center;">
          <van-button type="info" size="small" round @click="copyText" v-clipboard:copy="text" v-clipboard:success="onCopy" v-clipboard:error="onError" class="orange-btn">复制文案</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, CouponCell, CouponList, Popup, Cell, CellGroup, Sku, Grid, GridItem, Button, RadioGroup, Radio, Card, Stepper, Icon, Loading } from 'vant'
import VueCountdown from '@chenfengyuan/vue-countdown'
import ProductInfo from './ProductInfo/ProductInfo'
import ProductTricks from './ProductTricks/ProductTricks'
import ProductConfig from './ProductConfig/ProductConfig'
import { store } from '../../store/store'
import { isWeiXin } from '../../utilities/utilities'
import axios from 'axios'

// 优惠券配置
// const coupon = {
//   available: 1,
//   condition: '无使用门槛\n最多优惠12元',
//   reason: '',
//   value: 150,
//   name: '优惠券名称',
//   startAt: 1489104000,
//   endAt: 1514592000,
//   valueDesc: '1.5',
//   unitDesc: '元'
// }

export default {
  data: function () {
    return {
      showSave: store.getters.userData.showSave,
      loading: true,
      // swipe
      showIndicator: false,
      images: [],
      index: 1,
      time: Number(new Date().getTime()),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      allHtml: '',
      // 用户喜欢
      userCollect: false,
      // 用户收藏
      userLike: false,
      // 产品属性
      isLimited: false,
      attrTitle: '',
      productAttr: [],
      productAttrShow: [],
      productAttrMore: [],
      showMore: false,
      productValue: {},
      unit: '',
      // popup config
      amount: 1,
      price: 0,
      title: '',
      src: '',
      infoHeader: {
        // 产品上部参数
        price: 0,
        info: '',
        originPrice: 0,
        location: '',
        inventory: 0,
        sales: 0,
        isLimited: false
      },
      infoFooter: {
        // 产品下部参数
        reFund: '',
        returnCash: 0,
        rebate: 0
      },
      // 优惠券
      showList: false, // 优惠券list
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      //  -----------------------------------------------------------------sku
      number: 0,
      showSku: false,
      inSkuBuyBtnLoading: false,
      // 推广
      popularizeShow: false,
      // 立即购买loading
      yPos: 0,
      radio: '',
      nowBuyLoading: false,
      params: {
        productId: this.$route.query.pid,
        cartNum: 0,
        uniqueId: ''
      },
      // 展示推广， 分享等内容
      footerUtilShow: false,
      contentType: 0,
      // 海报
      notGenerated: true,
      image1: '',
      image2: '',
      text: '',
      // copy Button
      copyBtn: null,
      // 展示客服电话弹出框
      customerServiceShow: false,
      // 限购数量 limitedNum
      limitedNum: 0,
      // 海报图
      posterSrc: '',
      // 活动起始时间
      now: 0,
      start: 0,
      end: 0,
      // 活动结束
      isFinished: false,
      // 预售状态
      isAdvanceSell: false
    }
  },
  mounted: function () {
    // 获取产品
    let pid = this.$route.query.pid
    this.getProductInfo(pid)
    this.getPoster(pid)
  },
  methods: {
    getProductInfo: function (pid) {
      let vm = this
      axios
        .get('/ebapi/store_api/details.html', {params: {id: pid}})
        .then(response => {
          if (response.data.code === 200) {
            let config = response.data
            let now = Number(new Date(response.headers.date).getTime())
            let start = Number(new Date(1000 * parseInt(config.data.storeInfo.start_time)).getTime())
            let end = Number(new Date(1000 * parseInt((config.data.storeInfo.stop_time))).getTime())
            this.productValue = config.data.productValue
            if (config.data.productAttr.length > 0) {
              this.attrTitle = config.data.productAttr[0].attr_name
              this.productAttr = config.data.productAttr[0].attr_values
              if (this.productAttr.length > 0) {
                this.productAttr = config.data.productAttr[0].attr_values
                this.productAttrShow = config.data.productAttr[0].attr_values.slice(0, 5)
                if (this.productAttr.length > 5) {
                  this.productAttrMore = config.data.productAttr[0].attr_values.slice(5)
                }
              } else {
                this.productAttr = []
              }
            }
            this.unit = config.data.storeInfo.unit_name
            this.userLike = config.data.storeInfo.userLike
            this.userCollect = config.data.storeInfo.userCollect
            this.productValue = config.data.productValue
            this.images = config.data.storeInfo.slider_image
            // 若开始时间大于现在时间则为即将上架时间，相反则为正在抢购的产品
            this.now = now
            this.start = start
            this.end = end
            if (now < start) {
              // 即将开枪
              this.time = start - now
              this.isAdvanceSell = true
            } else if (now > end) {
              // 抢购结束， 不可购买
              this.time = 0
              this.isFinished = true
              this.isAdvanceSell = false
            } else {
              // 抢购中
              this.time = end - now
              this.isAdvanceSell = false
            }
            this.infoHeader.price = Number(config.data.storeInfo.price)
            this.infoHeader.info = config.data.storeInfo.store_name
            this.infoHeader.location = config.data.storeInfo.addr_p + config.data.storeInfo.addr_c + config.data.storeInfo.area
            this.infoHeader.originPrice = Number(config.data.storeInfo.ot_price)
            this.infoHeader.inventory = Number(config.data.storeInfo.stock)
            this.infoHeader.sales = Number(config.data.storeInfo.fsales)
            this.infoHeader.isLimited = config.data.storeInfo.is_limitbuy === 1
            this.infoFooter.reFund = Number(config.data.storeInfo.refund_commission) === 0 ? '暂不支持退货' : '支持退款'
            this.infoFooter.returnCash = Number(config.data.storeInfo.brokerage)
            this.infoFooter.rebate = Number(config.data.storeInfo.brokerage)
            this.allHtml = config.data.storeInfo.description
            this.price = config.data.storeInfo.price
            this.title = config.data.storeInfo.store_name
            this.src = config.data.storeInfo.image
            this.text = config.data.storeInfo.store_name
            this.image1 = config.data.storeInfo.poster || config.data.storeInfo.image
            this.isLimited = config.data.storeInfo.is_limitbuy === 1
            this.limitedNum = config.data.storeInfo.limit_sum
            // 若是微信小程序环境则设置分享信息
            if (isWeiXin()) {
              this.$wx.miniProgram.postMessage({
                'data': {
                  metaTitle: '商品详情',
                  title: config.data.storeInfo.store_name,
                  url: 'https://shop.power-travel.com.cn/dist/index.html#/product-detail?pid=' + pid,
                  imageUrl: config.data.storeInfo.image,
                  currentUrl: window.location.href,
                  shareUid: store.getters.userData.uid
                }
              })
            }
          } else {
            this.$toast({
              mask: true,
              message: '商品已下架...'
            })
            setTimeout(function () {
              vm.$router.back()
              vm.$toast.clear()
            }, 1000)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPoster: function (pid) {
      // 获取二维码
      axios
        .get('/api/Product/getProductShareCode?productId=' + pid)
        .then(response => {
          this.image2 = response.data.data.url
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 处理倒计时结束
    handleCountdownEnd: function () {
      //  若是预热产品则为开始抢购
      //  若是正在抢购的产品则是产品下架
      if (this.isAdvanceSell) {
        this.time = this.end - this.start
        this.isAdvanceSell = false
      } else {
        this.isFinished = true
      }
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero （1 -》01）
        const digits = value < 10 ? `0${value}` : value
        props[key] = `${digits}`
      })
      return props
    },
    indexUpdate: function (index) {
      this.index = index + 1
    },
    onChange: function (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange: function (code) {
      // 暂无优惠码业务
      // if (code === '88888888888888888888888') {
      //   this.coupons.push(coupon)
      // } else {
      this.$toast('优惠码不存在')
      //   return false
      // }
    },
    onBuyClicked: function () {
      console.log(this.productAttr)
      console.log('buy')
      this.yPos = 0
      this.showSku = true
      if (this.productAttr.length > 0) {
        this.radio = this.productValue[this.productAttr[0]].unique
        this.price = this.productValue[this.productAttr[0]].price
        this.title = this.productValue[this.productAttr[0]].suk
        this.src = this.productValue[this.productAttr[0]].image
        this.params.uniqueId = this.productValue[this.productAttr[0]].unique
      } else {
        this.params.uniqueId = ''
      }
    },
    inSkuBuy: function () {
      let vm = this
      this.params.cartNum = this.amount
      this.inSkuBuyBtnLoading = true
      vm.inSkuBuyBtnLoading = true
      axios
        .get('/ebapi/auth_api/now_buy', {params: this.params})
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            vm.inSkuBuyBtnLoading = false
            let cartId = res.data.data.cartId
            if (cartId) {
              this.$router.push('/submit-order?cartId=' + cartId)
            }
          } else {
            this.$toast.fail(res.data.msg)
            vm.inSkuBuyBtnLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          vm.inSkuBuyBtnLoading = false
        })
    },
    popularize: function () {
      this.popularizeShow = true
    },
    attrLinkToProd: function (info, index) {
      this.radio = info.unique
      this.yPos = 68 * index
      this.price = info.price
      this.title = info.suk
      this.src = info.image
      this.params.uniqueId = info.unique
      this.showSku = true
    },
    changeLike: function () {
      this.userLike = !this.userLike
    },
    changeCollect: function () {
      this.userCollect = !this.userCollect
    },
    collectProd: function () {
      let pid = this.$route.query.pid
      let url = ''
      if (this.userCollect === false) {
        url = '/ebapi/store_api/collect_product.html'
      } else {
        url = '/ebapi/store_api/uncollect_product.html'
      }
      axios
        .get(url, {params: { productId: pid }})
        .then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.changeCollect()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    navigateToService: function () {
      this.customerServiceShow = true
    },
    linkToHome: function () {
      this.$router.push('/')
    },
    linkToOrder: function () {
      this.$router.push('/user-center')
    },
    changeRadio: function (index) {
      this.radio = this.productValue[this.productAttr[index]].unique
      this.price = this.productValue[this.productAttr[index]].price
      this.title = this.productValue[this.productAttr[index]].suk
      this.src = this.productValue[this.productAttr[index]].image
      this.params.uniqueId = this.productValue[this.productAttr[index]].unique
    },
    hide: function () {
      this.footerUtilShow = !this.footerUtilShow
    },
    shareToFriend: function () {
      this.notGenerated = false
      this.contentType = 1
      this.footerUtilShow = true
    },
    generatePoster: function () {
      this.notGenerated = true
      this.contentType = 2
      this.footerUtilShow = true
      this.$toast({
        mask: true,
        message: '生成中...',
        duration: 0
      })
      this.PosterCanvas()
    },
    copyText: function () {
      this.notGenerated = false
      this.contentType = 3
      this.footerUtilShow = true
    },
    onCopy: function () {
      this.$toast({
        message: '复制成功',
        type: 'success'
      })
    },
    onError: function () {
      this.$toast({
        message: '复制失败',
        type: 'error'
      })
    },
    PosterCanvas: function () {
      let vm = this
      axios
        .get('/api/Product/getProductSharePoster?productId=' + this.$route.query.pid)
        .then(res => {
          if (res.data.code === 200) {
            this.$nextTick(() => {
              let image = vm.$refs.poster
              image.onload = function () {
                vm.$toast.clear()
                vm.notGenerated = false
              }
              image.src = res.data.data.url
            })
            this.posterSrc = res.data.data.url
          }
        })
        .catch(error => {
          this.$toast.clear()
          this.footerUtilShow = false
          this.$toast.fail(error.response.data.msg)
        })
      // this.$nextTick(() => {
      //   let image = vm.$refs.myPoster
      //   let imgLength = []
      //   // image.onload = function () {
      //   //   vm.$toast.clear()
      //   // }
      //   // image.src = vm.poster
      //   let canvas = document.createElement('canvas')
      //   canvas.height = 900
      //   canvas.width = 600
      //   // 图片1
      //   let img = new Image()
      //   img.setAttribute('crossOrigin', 'anonymous')
      //   let ctx = canvas.getContext('2d')
      //   ctx.clearRect(0, 0, 0, 0)
      //   let callback = () => {
      //     if (imgLength.length === 3) {
      //       let text = store.getters.userData.nickname
      //       ctx.font = '25px Georgia'
      //       ctx.fillText(text, 125, 890, 250)
      //       image.src = canvas.toDataURL('image/jpeg')
      //       vm.notGenerated = false
      //     }
      //     vm.$toast.clear()
      //   }
      //   img.addEventListener('load', function () {
      //     imgLength.push('1')
      //     ctx.drawImage(img, 0, 0, 600, 900)
      //     callback()
      //   }, false)
      //   img.src = 'static/posterbackgd.png'
      //   let img2 = new Image()
      //   img2.setAttribute('crossOrigin', 'anonymous')
      //   img2.addEventListener('load', function () {
      //     imgLength.push('1')
      //     ctx.drawImage(img2, 0, 0, 600, 800)
      //     callback()
      //   }, false)
      //   img2.src = vm.image1
      //   let img3 = new Image()
      //   img3.setAttribute('crossOrigin', 'anonymous')
      //   img3.addEventListener('load', function () {
      //     imgLength.push('1')
      //     ctx.drawImage(img3, 15, 800, 100, 100)
      //     callback()
      //   }, false)
      //   img3.src = vm.image2
      // })
    },
    drawImg: function (canvas, img, x, y, width, height, callback) {
      // let ctx = canvas.getContext('2d')
      // ctx.clearRect(0, 0, 0, 0)
      // let image = new Image()
      // // 解决跨域 Canvas 污染问题
      // image.setAttribute('crossOrigin', 'anonymous')
      // console.log(img)
      // image.addEventListener('load', function () {
      //   console.log(image.height, image.width)
      //   ctx.drawImage(image, x, y, width, height)
      //   if (callback) {
      //     callback()
      //   }
      // }, false)
      // image.src = img
      // if (image.complete) {
      //   alert('complete')
      //   ctx.drawImage(image, x, y, width, height)
      //   if (callback) {
      //     callback()
      //   }
      // } else {
      //   alert('not complete')
      // }

      // let intervalHandler = setInterval(function () {
      //   console.log('try')
      //   if (image.complete) {
      //     image.onload()
      //     clearInterval(intervalHandler)
      //   }
      // }, 100)
    },
    saveToPhone: function () {
      this.$toast('长按图片分享给朋友')
      // if (!isWeiXin()) {
      //   let url = this.$refs.myPoster.src
      //   // 生成一个a元素
      //   let a = document.createElement('a')
      //   // 创建一个单击事件
      //   let event = new MouseEvent('click')
      //   // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      //   a.download = name || '下载图片名称'
      //   // 将生成的URL设置为a.href属性
      //   a.href = url
      //   // 触发a的单击事件
      //   a.dispatchEvent(event)
      // }
    },
    scrollToTarget: function (e) {
      console.log(e)
      e.scrollTo({
        top: this.yPos,
        behavior: 'smooth'
      })
    },
    showIsLimited: function () {
      console.log(this.amount)
      if (this.amount === this.limitedNum) {
        this.$toast.fail('本商品限购数量为' + this.limitedNum + '个')
      }
    }
  },
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-goods-action': GoodsAction,
    'van-goods-action-icon': GoodsActionIcon,
    'van-goods-action-button': GoodsActionButton,
    'countdown': VueCountdown,
    'product-info': ProductInfo,
    'product-tricks': ProductTricks,
    'product-config': ProductConfig,
    'van-coupon-cell': CouponCell,
    'van-coupon-list': CouponList,
    'van-popup': Popup,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-sku': Sku,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-button': Button,
    'van-radio': Radio,
    'van-radio-group': RadioGroup,
    'van-stepper': Stepper,
    'van-card': Card,
    'van-icon': Icon,
    'van-loading': Loading
  }
}
</script>

<style scoped>
  .countdown {
    margin-top: -25px;
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 10px;
    color: #FFFFFF;
    font-size: 12px;
  }
  .time {
    display: inline-block;
    padding: 0 5px;
    line-height: 20px;
    text-align: center;
    font-size: 80%;
    background: rgba(0,0,0,0.7);
    border-radius: 3px;
    color: #fff;
  }
  .indicator {
    background: rgba(0, 0, 0, .7);
    padding: 0 5px;
    position: absolute;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    right: 5px;
    top: 208px;
    line-height: 20px;
  }
  .red {
    color: red;
  }
  .sku-footer {
    display: block;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .selected {
    background: #ffd31c;
  }
  .short {
    height: 30%;
    padding-bottom: 50px;
  }
  .normal {
    height: 60%;
    padding-bottom: 50px;
  }
  .close {
    z-index: 999;
    background: #fff;
    height: 25px;
    width: 25px;
    display: inline-block;
    border-radius: 25px;
    position: absolute;
    right: 2px;
    top: 2px;
  }
  .transparent {
    background: transparent;
    top: 20%
  }
  .blink {
    display: inline-block;
    animation: blink 1s infinite;
    -webkit-animation: blink 1s infinite;
  }
  @keyframes blink {
    from { transform: scale(0.8); }
    to { transform: scale(1); }
  }
  .background-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .orangeBigger {
    border: 1px solid #ffd31c;
    height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 30px;
  }
  .notGenerated {
    opacity: 0;
    height: 0;
  }
  .margin-left {
    margin-left: 5px;
  }
</style>
