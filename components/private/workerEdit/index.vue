<script setup>
import http from '@/utils/request.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Form from '@/components/common/service/form'

const formRef = ref(null)
const formConfig = ref({}) //表单配置
onLoad(option => {
  formConfig.value = JSON.parse(decodeURIComponent(option.formConfig))
})
//消息提示
const popupRef = ref(null)
const popupList = {
  msgType: '',
  messageText: ''
}
const messageToggle = (type, text) => {
  popupList.msgType = type
  popupList.messageText = text
  popupRef.value.open()
}
//若为折叠面板时
const collapseValue = ['0']
const operate = (type, index) => {
  if (type === 'add') {
    if (formConfig.value.dataList.length > 2) {
      messageToggle('error', '目前最多填加三条装修历史！')
      return
    }
    formConfig.value.dataList.push([
      {
        type: 'input',
        text: '施工项目',
        code: 'address',
        data: null
      },
      {
        type: 'input',
        text: '施工年份',
        code: 'date',
        data: null
      },
      {
        type: 'input',
        text: '施工所在地区',
        code: 'city',
        data: null
      },
      {
        type: 'input',
        text: '师傅等级',
        code: 'garde',
        data: null
      },
      {
        type: 'input',
        text: '施工价格',
        code: 'price',
        data: null
      }
    ])
  } else if (type === 'del') {
    formConfig.value.dataList.splice(index, 1)
    console.log('formConfig.value.dataList', formConfig.value.dataList)
  }
}
const formSubmit = () => {
  let formData = null
  if (formConfig.value.type === 'default') {
    formData = formRef.value.formSubmit()
  } else if (formConfig.value.type === 'collapse') {
    formData = formRef.value.map(item => {
      return item.formSubmit()
    })
  }
  console.log('formData', formData)
  return
  http({
    url: formConfig.request.url,
    method: formConfig.request.methods,
    data: formData
  }).then(res => {
    if (res.statusCode == 200) {
      messageToggle('success', '提交成功!')
      setTimeout(() => {}, 1000)
    } else {
      messageToggle('error', '提交失败!')
    }
  })
}
//返回页面
const backPage = () => {
  uni.navigateBack()
}
</script>

<template>
  <view class="main">
    <view class="addTitle">
      <view class="addTitleLeft">
        <image src="/static/alicon/right.svg" @click="backPage" mode="aspectFit"></image>
      </view>
      <view class="addTitleCenter">
        <text>编辑信息</text>
      </view>
    </view>
    <uni-section v-if="formConfig.type === 'default'" :title="formConfig.text" type="line">
      <Form ref="formRef" :list="formConfig.dataList" :formRules="formConfig.formRules"></Form>
    </uni-section>
    <uni-section v-if="formConfig.type === 'collapse'" :title="formConfig.text" type="line">
      <uni-collapse ref="collapse" accordion v-model="collapseValue" @change="collapseChange">
        <uni-collapse-item
          v-for="(collapseItem, collapseIndex) in formConfig.dataList"
          :key="collapseIndex"
        >
          <template v-slot:title>
            <uni-list>
              <uni-list-item :title="'装修历史-' + (collapseIndex + 1)">
                <template v-slot:footer>
                  <text class="delBtn" @click.stop="operate('del', collapseIndex)">删除</text>
                </template>
              </uni-list-item>
            </uni-list>
          </template>
          <Form
            ref="formRef"
            :list="collapseItem"
            :formRules="formConfig.formRules"
            :key="collapseItem"
          ></Form>
        </uni-collapse-item>
      </uni-collapse>
      <button size="mini" type="primary" class="addBtn" @click.stop="operate('add')">
        新增装修历史
      </button>
    </uni-section>
    <button @click="formSubmit" class="formSubmit">提交</button>
    <!-- 提示信息弹窗 -->
    <uni-popup ref="popupRef" type="message">
      <uni-popup-message
        :type="popupList.msgType"
        :message="popupList.messageText"
        :duration="2000"
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  .backImgBox {
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #fff;
    .backImg {
      width: 50rpx;
      height: 50rpx;
      object-fit: cover;
      opacity: 1;
      transform: rotate(180deg);
    }
  }
  .addTitle {
    height: 120rpx;
    padding: 0 20rpx;
    position: relative;
    font-size: 36rpx;
    background-color: #fff;
    // border-bottom: 2rpx #dadada solid;
    display: flex;
    align-items: center;

    .addTitleLeft {
      display: flex;
      align-items: center;

      image {
        width: 60rpx;
        height: 60rpx;
        object-fit: cover;
        transform: rotate(180deg);
      }
    }

    .addTitleCenter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .formSubmit {
    width: 100%;
    height: 100rpx;
    margin: 40rpx auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delBtn {
    color: #e43d33;
  }
  .addBtn {
    margin: auto;
    margin: 20rpx 0;
  }
  ::v-deep .uni-section-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
