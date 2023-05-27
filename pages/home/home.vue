<script setup>
import requset from '@/utils/requset.js'
import { ref, onMounted } from 'vue'

let current = ref(0)
let swiperDotIndex = ref(0)

//请求数据
const dataList = ref([])

const getList = () => {
  requset({
    url: '/worker',
    method: 'GET',
    data: JSON.stringify({
      pageNum: 0,
      pageSize: 10
    })
  }).then((res) => {
    if (!res.data) return
    dataList.value = res.data
    console.log('res', res)
  })
}
onMounted(() => {
  getList()
})

const info = [
  {
    colorClass: 'uni-bg-red',
    url: '/static/image/home/mmexport1617207387677.jpg',
    content: '内容 A'
  },
  {
    colorClass: 'uni-bg-green',
    url: '/static/image/home/2021-05-14-00-00-53-677.jpg',
    content: '内容 B'
  },
  {
    colorClass: 'uni-bg-blue',
    url: '/static/image/home/2021-05-14-00-00-58-305.jpg',
    content: '内容 C'
  }
]
const otherBoxList = [
  {
    name: '信息录入',
    route: '/pages/add/add',
    imgUrl: '/static/image/home/edit-fill.png'
  },
  {
    name: '服务查询',
    route: '/pages/service/service',
    imgUrl: '/static/image/home/security-scan-fill.png'
  },
  {
    name: '装修预算',
    route: '/pages/service/service',
    imgUrl: '/static/image/home/budget.png'
  },
  {
    name: '我要定位',
    route: '/pages/user/user',
    imgUrl: '/static/image/home/location-fill.png'
  }
]
const clickItem = (e) => {}
//跳转页面
const BoxItemBtn = (item) => {
  console.log(item.route)
  uni.switchTab({
    url: item.route
  })
}
</script>

<template>
  <view class="homeContainer">
    <view class="homeTop">
      <text>智佳家装</text>
    </view>
    <view class="swiper-box">
      <swiper class="swiper" circular autoplay :current="swiperDotIndex">
        <swiper-item
          class="swiper-item"
          :style="{ backgroundImage: `url(${item.url})` }"
          v-for="(item, index) in info"
          :key="index"
        >
          <text style="color: #000000; font-size: 64rpx">{{ item.content }}</text>
        </swiper-item>
      </swiper>
      <view class="swiperOtherBox">
        <view class="OtherBoxItem" v-for="item in otherBoxList" @click="BoxItemBtn(item)">
          <image :src="item.imgUrl" mode=""></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
    <view class="main">
      <view class="active">
        <view class="activeTitle">
          <view class="titleLeft">
            <image src="@/static/alicon/manage.svg"></image>
            <text>施工动态</text>
          </view>
          <view class="titleRight">
            <text>管理</text>
            <image src="@/static/alicon/right.svg"></image>
          </view>
        </view>
        <view class="activeContent">
          <uni-table stripe emptyText="暂无更多数据">
            <!-- 表头行 -->
            <uni-tr>
              <uni-th width="70" align="center">姓名</uni-th>
              <uni-th width="200" align="center">施工地点</uni-th>
              <uni-th width="70" align="center">种类</uni-th>
              <uni-th width="70" align="center">开工日期</uni-th>
              <uni-th width="100" align="center">预计完成日期</uni-th>
              <uni-th width="40" align="center">进度</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr v-for="item in 5" :key="item">
              <uni-td align="center">给对大萨</uni-td>
              <uni-td align="center">成都市新都区新都小区12栋1单元1201</uni-td>
              <uni-td align="center">水木施工</uni-td>
              <uni-td align="center">2023.3.3</uni-td>
              <uni-td align="center">2023.4.4</uni-td>
              <uni-td align="center">80%</uni-td>
            </uni-tr>
          </uni-table>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.homeContainer {
  height: 100%;
  font-size: 28rpx;
  line-height: 48rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .temp {
    flex: 1;
  }

  .homeTop {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120rpx;

    text {
      font-size: 56rpx;
    }
  }

  .swiper-box {
    position: relative;

    .swiper {
      height: 400rpx;

      .swiper-item {
        height: 600rpx;
        background-repeat: no-repeat;
      }

      ::v-deep .uni-swiper__dots-box {
        height: 16rpx;
        left: -70%;
        top: 35%;
        transform: translate(0, -50%);
      }
    }

    .swiperOtherBox {
      width: 560rpx;
      height: 200rpx;
      padding: 0 20rpx;
      border-radius: 10rpx;
      box-shadow: 10rpx 10rpx 10rpx #82828257;
      position: absolute;
      z-index: 999;
      left: 50%;
      bottom: -40rpx;
      transform: translate(-50%, 0);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      .OtherBoxItem {
        width: 160rpx;
        height: 180rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        image {
          width: 80rpx;
          height: 80rpx;
          object-fit: cover;
          margin-bottom: 10rpx;
        }

        text {
          font-size: 32rpx;
          font-weight: bold;
        }
      }
    }
  }
}

.main {
  flex: 1;
  margin-top: 80rpx;

  .active {
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx 40rpx;
    border-top: 20rpx #eaeaea solid;

    display: flex;
    flex-direction: column;

    .activeTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 40rpx;
      padding-bottom: 12rpx;
      border-bottom: 2rpx #00000014 solid;

      .titleLeft {
        display: flex;
        align-items: center;
        font-weight: 600;

        image {
          width: 80rpx;
          height: 80rpx;
          margin-right: 40rpx;
        }
      }

      .titleRight {
        display: flex;
        align-items: center;
        color: #46474cb0;

        image {
          width: 60rpx;
          height: 60rpx;
          margin-left: 40rpx;
        }
      }
    }

    .activeContent {
      flex: 1;
      overflow: auto;
      border-radius: 10rpx;

      ::v-deep .uni-table-th {
        padding: 24rpx 12rpx;
      }

      ::v-deep .uni-table-td {
        padding: 8rpx 12rpx;
      }
    }
  }
}
</style>
