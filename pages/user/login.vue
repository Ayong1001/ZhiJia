<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/baseRequest'

const formRef = ref(null)
const popupRef = ref(null)
const emit = defineEmits(['getLoginState'])

//表单
const formData = reactive({
  u_username: '',
  u_password: ''
})
//表单校验
const formRules = {
  u_username: {
    rules: [
      {
        required: true,
        errorMessage: '请输入用户名'
      }
    ]
  },
  u_password: {
    rules: [
      {
        required: true,
        errorMessage: '请输入密码'
      }
    ]
  }
}
//消息提示
const popupList = {
  msgType: '',
  messageText: ''
}
const messageToggle = (type, text) => {
  popupList.msgType = type
  popupList.messageText = text
  popupRef.value.open()
}

// 表单提交/校验
const loginBtn = () => {
  formRef.value
    .validate()
    .then(res => {
      login({
        data: formData
      }).then(res => {
        if (res.statusCode == 200) {
          messageToggle('success', '登录成功!')
          uni.setStorageSync('token', res.data.token)
          emit('getLoginState')
        } else {
          messageToggle('error', `登录失败!(${res.message})`)
        }
      })
    })
    .catch(err => {
      messageToggle('error', err[0].errorMessage)
    })
}
</script>

<template>
  <view class="main">
    <view class="formBox">
      <uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
        <uni-forms-item label="账号" name="u_username" required>
          <input
            type="text"
            v-model="formData.u_username"
            placeholder="请输入账号"
        /></uni-forms-item>
        <uni-forms-item label="密码" name="u_password" required>
          <input
            type="text"
            v-model="formData.u_password"
            placeholder="请输入密码"
          />
        </uni-forms-item>
      </uni-forms>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="popupRef" type="message">
        <uni-popup-message
          :type="popupList.msgType"
          :message="popupList.messageText"
          :duration="2000"
        ></uni-popup-message>
      </uni-popup>
    </view>
    <button class="bottomBtn" type="primary" @click="loginBtn">登录</button>
  </view>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
