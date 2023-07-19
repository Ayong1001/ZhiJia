<script setup>
import { ref, onMounted } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { construction } from '@/api/baseRequest'

let current = ref(0)
let swiperDotIndex = ref(0)

//请求数据
const constructionData = ref([])
const getConstruction = () => {
  construction().then(res => {
    if (res.statusCode === 200) {
      constructionData.value = res.data.data || []
    }
  })
}

// const info = [
//   {
//     colorClass: 'uni-bg-red',
//     url: '/static/image/home/mmexport1617207387677.jpg',
//     content: '内容 A'
//   },
//   {
//     colorClass: 'uni-bg-green',
//     url: '/static/image/home/2021-05-14-00-00-53-677.jpg',
//     content: '内容 B'
//   },
//   {
//     colorClass: 'uni-bg-blue',
//     url: '/static/image/home/2021-05-14-00-00-58-305.jpg',
//     content: '内容 C'
//   }
// ]
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
//跳转页面
const formConfig = () => {
  return {
    type: 'collapse',
    text: '施工动态',
    code: 'data',
    readOnly: true,
    dataList: constructionData.value.map(item => {
      return [
        {
          type: 'input',
          text: '姓名',
          code: 'w_name',
          data: item.w_name || null
        },
        {
          type: 'input',
          text: '施工地点',
          code: 'o_address',
          data: item.o_address || null
        },
        {
          type: 'input',
          text: '种类',
          code: 'o_type',
          data: item.o_type || null
        },
        {
          type: 'datePicker',
          text: '开工日期',
          code: 'o_firstDate',
          data: item.o_firstDate || null
        },
        {
          type: 'datePicker',
          text: '预计完成日期',
          code: 'o_lastDate',
          data: item.o_lastDate || null
        },
        {
          type: 'input',
          text: '进度',
          code: 'o_schedule',
          data: item.o_schedule || null
        },
        {
          type: 'otherData',
          text: '项目id',
          code: 'o_id',
          data: item.o_id || null
        },
        {
          type: 'otherData',
          text: '工人id',
          code: 'w_id',
          data: item.w_id || null
        }
      ]
    }),
    request: {
      url: '/order/update',
      methods: 'PUT'
    }
  }
}
//工人项目编辑页跳转
const manageClick = () => {
  //带数据跳转信息编辑页
  uni.navigateTo({
    url: `/components/private/workerEdit/index?formConfig=${JSON.stringify(formConfig())}`
  })
}
// 主页按钮功能跳转
const BoxItemBtn = item => {
  console.log(item.route)
  uni.switchTab({
    url: item.route
  })
}

onLoad(option => {
  uni.$on('refresh', function (data) {
    getConstruction()
  })
})

onUnload(option => {
  uni.$off('refresh')
})

onMounted(() => {
  getConstruction()
})
</script>

<template>
  <view class="homeContainer">
    <view class="swiper-box">
      <!-- <swiper class="swiper" circular autoplay :current="swiperDotIndex">
        <swiper-item
          class="swiper-item"
          :style="{ backgroundImage: `url(${item.url})` }"
          v-for="(item, index) in info"
          :key="index"
        >
          <text style="color: #000000; font-size: 64rpx">{{ item.content }}</text>
        </swiper-item>
      </swiper> -->
      <view class="imgBox">
        <image src="../../static/image/home/topImg.jpg" mode=""></image>
        <view class="homeTop">
          <text>智佳家装</text>
        </view>
      </view>
      <view class="swiperOtherBox1">
        <view class="OtherBoxItem" v-for="item in otherBoxList" @click="BoxItemBtn(item)">
          <image :src="item.imgUrl" mode=""></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
      <view class="swiperOtherBox2">
        <image src="../../static/image/home/adv1.png" mode=""></image>
      </view>
    </view>
    <view class="main">
      <view class="active">
        <view class="activeTitle">
          <view class="titleLeft">
            <image src="@/static/alicon/manage.svg"></image>
            <text>施工动态</text>
          </view>
          <view class="titleRight" @click="manageClick">
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
              <uni-th width="100" align="center">开工日期</uni-th>
              <uni-th width="100" align="center">预计完成日期</uni-th>
              <uni-th width="50" align="center">进度</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr v-for="(item, index) in constructionData.slice(0, 11)" :key="index">
              <uni-td align="center">{{ item.w_name }}</uni-td>
              <uni-td align="center">{{ item.o_address }}</uni-td>
              <uni-td align="center">{{ item.o_type }}</uni-td>
              <uni-td align="center">{{ item.o_firstDate }}</uni-td>
              <uni-td align="center">{{ item.o_lastDate }}</uni-td>
              <uni-td align="center">{{ item.o_schedule }}%</uni-td>
            </uni-tr>
          </uni-table>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.homeContainer {
  width: 100%;
  height: 100%;
  font-size: 28rpx;
  line-height: 48rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  // background-image: url('@/static/image/home/BG1.png');
  background-size: 100% 100%;

  .temp {
    flex: 1;
  }

  .homeTop {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120rpx;

    text {
      margin-left: 10rpx;
      font-family: cursive;
      font-size: 56rpx;
    }
  }

  .swiper-box {
    position: relative;

    .imgBox {
      width: 100%;
      height: 400rpx;
      position: relative;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    // .swiper {
    //   height: 400rpx;

    //   .swiper-item {
    //     height: 600rpx;
    //     background-repeat: no-repeat;
    //   }

    //   ::v-deep .uni-swiper__dots-box {
    //     height: 16rpx;
    //     left: -70%;
    //     top: 35%;
    //     transform: translate(0, -50%);
    //   }
    // }

    .swiperOtherBox1 {
      width: 100%;
      height: 150rpx;
      padding: 0 20rpx;
      border-radius: 10rpx;
      box-sizing: border-box;
      box-shadow: 10rpx 10rpx 10rpx #82828257;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      .OtherBoxItem {
        width: 160rpx;
        height: 130rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        image {
          width: 65rpx;
          height: 65rpx;
          object-fit: cover;
          margin-bottom: 10rpx;
        }

        text {
          font-size: 28rpx;
          font-weight: bold;
        }
      }
    }
    .swiperOtherBox2 {
      width: 100%;
      height: 200rpx;
      border-radius: 10rpx;
      box-shadow: 10rpx 10rpx 10rpx #82828257;
      bottom: -260rpx;
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.main {
  flex: 1;
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
      text {
        font-size: 32rpx;
      }

      .titleLeft {
        display: flex;
        align-items: center;
        font-weight: 600;

        image {
          width: 55rpx;
          height: 55rpx;
          margin-right: 20rpx;
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
