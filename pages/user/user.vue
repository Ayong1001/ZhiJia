<script setup>
import { ref, onMounted } from 'vue'
import loginView from './login'

const loginState = ref(false)

const getLoginState = () => {
  loginState.value = uni.getStorageSync('token') ? true : false
  console.log('loginState', loginState.value)
}

const orderUserList = [
  {
    text: '导出账单',
    imgUrl: '/static/alicon/wallet.svg'
  },
  {
    text: '输入邀请码',
    imgUrl: '/static/alicon/property.svg'
  },
  {
    text: '关于我们',
    imgUrl: '/static/alicon/file-text.svg'
  },
  {
    text: '注销账号',
    imgUrl: '/static/alicon/file.svg'
  }
]
const toolUserList = [
  {
    text: '我的客户',
    imgUrl: '/static/alicon/custom.svg'
  },
  {
    text: '我的团队',
    imgUrl: '/static/alicon/team.svg'
  },
  {
    text: '我的增员',
    imgUrl: '/static/alicon/addUser.svg'
  },
  {
    text: '待处理',
    imgUrl: '/static/alicon/file-text.svg'
  },
  {
    text: '全部订单',
    imgUrl: '/static/alicon/file.svg'
  }
]

//消息提示
const popupRef = ref(null)
const popupData = {
  title: '',
  content: ''
}
const messageToggle = (title, content) => {
  popupData.title = title
  popupData.content = content
  popupRef.value.open()
}

// 退出登录
const outLogin = () => {
  messageToggle('警告！', '是否确定退出登录？')
}
const dialogConfirm = () => {
  uni.removeStorageSync('token')
  getLoginState()
}

onMounted(() => {
  getLoginState()
})
</script>

<template>
  <view class="main">
    <view v-if="loginState" class="userContainer">
      <!-- <text class="title">我的</text> -->
      <view class="top">
        <image src="@/static/alicon/user1.svg" mode=""></image>
        <view class="userText">
          <text class="userDes">会员用户,到期时间2023.10.5</text>
          <text class="userName">高**\n</text>
        </view>
      </view>
      <image class="vip1" src="@/static/image/user/vip1.png" mode=""></image>
      <view class="apps">
        <view class="appsItem" v-for="item in toolUserList" :key="item">
          <image :src="item.imgUrl" mode=""></image>
          <text>{{ item.text }}</text>
        </view>
      </view>
      <view class="tools">
        <uni-list class="toolsList">
          <uni-list-item
            class="listItem"
            v-for="item in orderUserList"
            showArrow
            :title="item.text"
            :key="item"
          />
        </uni-list>
      </view>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="popupRef" type="dialog">
        <uni-popup-dialog
          type="msgType"
          cancelText="取消"
          confirmText="确定"
          :title="popupData.title"
          :content="popupData.content"
          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
      <button class="bottomBtn" type="primary" @click="outLogin">
        退出登录
      </button>
    </view>
    <view v-else class="userContainer">
      <login-view @getLoginState="getLoginState"></login-view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .userContainer {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;

    .title {
      font-size: 60rpx;
      margin: 20rpx 0;
    }

    .top {
      box-sizing: border-box;
      width: 100%;
      padding: 100rpx 80rpx 0 40rpx;
      display: flex;

      image {
        width: 100rpx;
        height: 100rpx;
      }

      .userText {
        margin-left: 40rpx;
        display: flex;
        flex-direction: column-reverse;

        .userName {
          font-size: 38rpx;
        }

        .userDes {
          font-size: 28rpx;
          color: #c7c9ce;
        }
      }
    }

    .vip1 {
      width: 100%;
      height: 160rpx;
      margin: 40rpx 0;
    }

    .apps {
      width: 620rpx;
      display: flex;
      justify-content: space-between;

      .appsItem {
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60rpx;
          height: 60rpx;
          margin-bottom: 10rpx;
        }

        text {
          font-size: 28rpx;
        }
      }
    }

    .tools {
      width: 100%;
      margin-top: 60rpx;
      border-top: 20rpx #e9e9eb solid;
      display: flex;
      flex-direction: column;
      align-items: center;

      .toolsList {
        width: 100%;

        .listItem {
          width: 100%;
          height: 100rpx;
          /deep/ .uni-list-item__content-title {
            font-size: 32rpx;
          }
        }
      }
    }
    .bottomBtn {
      width: 500rpx;
      min-height: 100rpx;
      position: absolute;
      z-index: 50;
      bottom: 50rpx;
      left: 50%;
      transform: translate(-50%, 0);
      border-radius: 40rpx;
      background-color: #2cbde1cf;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
