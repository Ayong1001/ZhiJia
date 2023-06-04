<script setup>
import { onMounted, ref } from 'vue'
import { add } from '@/api/baseRequest'
import countryData from '@/utils/country.js'
import workTypeList from '@/utils/workTypeList.js'
import AddressPicker from '@/components/lingdang-AddressPicker/AddressPicker.vue'

let addState = ref(true)
const formRef = ref(null)
const popupRef = ref(null)
let baseAddressCode = ''
const baseFormData = {
  w_name: '', //姓名
  w_domicileAddress: '', //户籍详细地址
  w_phone: '', //联系电话
  w_idType: '', //证件类型
  w_idNumber: '', // 证件号码
  w_typeWork: workTypeList[0].text, //工种
  w_birthday: '', //生日
  w_sex: null, // 性别
  w_nationality: '中国', //国籍
  w_domicileAddressCity: '', //户籍所在地
  w_habitualResidenceCity: '', //经常居住地
  w_habitualResidence: '', //经常详细地址
  w_emergencyContact: '', //紧急联系人
  w_addressCity: '', //现在所在地
  w_address: '', //现在详细地址
  w_nation: '', //民族
  w_wechatNumber: '', //微信号
  w_email: '', //邮箱
  w_emergencyPhone: '' //紧急联系电话
}
//form表单数据
const formData = ref(JSON.parse(JSON.stringify(baseFormData)))

const popupList = {
  msgType: '',
  messageText: ''
}
//性别选择
const sexs = [
  {
    text: '男',
    value: 1
  },
  {
    text: '女',
    value: 0
  }
]
//身份类型选择
const IdentityTypeList = [
  {
    value: 0,
    text: '居民身份证'
  },
  {
    value: 1,
    text: '护照'
  },
  {
    value: 2,
    text: '台胞证'
  },
  {
    value: 3,
    text: '港澳通行证'
  },
  {
    value: 4,
    text: '其它证件'
  }
]
//工种选择
const workTypeIndex = ref(0)
const workTypeChange = e => {
  workTypeIndex.value = e.detail.value
  formData.value.w_typeWork = workTypeList[e.detail.value].text
}
//出生日期选择
const birthdayChange = function (e) {
  formData.value.w_birthday = e
}
//国籍选择
const countryChange = e => {
  formData.value.w_nationality = countryData[e.detail.value].country_name_cn
}
//户籍所在地
const permanentAddressChange = result => {
  formData.value.w_domicileAddressCity = ''
  result.forEach((item, index) => {
    if (index === 0) {
      formData.value.w_domicileAddressCity += item.name
    } else {
      formData.value.w_domicileAddressCity += '-' + item.name
    }
  })
}
//常住地址
const addressChange = result => {
  formData.value.w_habitualResidenceCity = ''
  result.forEach((item, index) => {
    if (index === 0) {
      formData.value.w_habitualResidenceCity += item.name
    } else {
      formData.value.w_habitualResidenceCity += '-' + item.name
    }
  })
}
//
const formRules = {
  // 对name字段进行必填验证
  w_name: {
    rules: [
      {
        required: true,
        errorMessage: '请输入姓名'
      },
      {
        minLength: 2,
        maxLength: 8,
        errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
      }
    ]
  },
  // 对性别进行验证
  w_sex: {
    rules: [
      {
        required: true,
        errorMessage: '请选择性别'
      }
    ]
  },
  // 对手机号码进行验证
  w_phone: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号码'
      },
      {
        pattern: '^1[3-9]\\d{9}$',
        errorMessage: '请输入正确的手机号码'
      }
    ]
  },
  // 对常住地进行验证
  w_habitualResidenceCity: {
    rules: [
      {
        required: true,
        errorMessage: '请填写常住地'
      }
    ]
  }
}
//消息提示
const messageToggle = (type, text) => {
  popupList.msgType = type
  popupList.messageText = text
  popupRef.value.open()
}
// 添加页面切换
const changeAddState = () => {
  formData.value = JSON.parse(JSON.stringify(baseFormData))
  addState.value = !addState.value
}
// 表单提交/校验
const formSubmit = () => {
  formRef.value
    .validate()
    .then(res => {
      add({
        data: formData.value
      }).then(res => {
        if (res.statusCode == 200) {
          messageToggle('success', '提交成功!')
          setTimeout(() => {
            changeAddState()
          }, 1000)
        } else {
          messageToggle('error', '提交失败!')
        }
      })
    })
    .catch(err => {
      messageToggle('error', err[0].errorMessage)
    })
}
onMounted(() => {})
</script>

<template>
  <view class="addContainer">
    <view class="addIcon" @click="changeAddState" v-show="addState">
      <image src="@/static/alicon/addUser.svg" mode=""></image>
      <text>点击添加新工人</text>
    </view>
    <view class="addBox" v-show="!addState">
      <view class="addTitle">
        <view class="addTitleLeft" @click="changeAddState">
          <image src="@/static/alicon/right.svg" mode=""></image>
          <text>返回</text>
        </view>
        <view class="addTitleCenter">
          <text>工人信息</text>
        </view>
      </view>
      <view class="addFormBox">
        <uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
          <view class="formItem">
            <view class="formItemTitle">
              <image src="@/static/alicon/edit-square.svg" mode=""></image>
              <text>用户基础信息</text>
            </view>
            <uni-forms-item label="姓名" name="w_name" required>
              <input type="text" v-model="formData.w_name" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item label="性别" name="w_sex" required>
              <uni-data-checkbox v-model="formData.w_sex" :localdata="sexs" />
            </uni-forms-item>
            <uni-forms-item label="联系电话" name="w_phone" required>
              <input type="text" v-model="formData.w_phone" placeholder="请输入联系电话" />
            </uni-forms-item>
            <uni-forms-item label="证件类型" name="w_idType">
              <uni-data-select
                v-model="formData.w_idType"
                :localdata="IdentityTypeList"
              ></uni-data-select>
            </uni-forms-item>
            <uni-forms-item label="证件号码" name="w_idNumber">
              <input type="text" v-model="formData.w_idNumber" placeholder="请输入证件号码" />
            </uni-forms-item>
            <uni-forms-item label="工种" name="w_typeWork" required>
              <picker
                class="pickerStyle"
                @change="workTypeChange"
                :value="workTypeIndex"
                :range="workTypeList"
                range-key="text"
              >
                <view>{{ formData.w_typeWork }}</view>
              </picker>
            </uni-forms-item>
            <uni-forms-item label="出生日期" name="w_birthday">
              <uni-datetime-picker
                type="date"
                v-model="formData.w_birthday"
                @change="birthdayChange"
              />
            </uni-forms-item>
            <uni-forms-item label="国籍" name="w_nationality">
              <picker
                class="pickerStyle"
                @change="countryChange"
                :value="formData.w_nationality"
                :range="countryData"
                range-key="country_name_cn"
              >
                <view>{{ formData.w_nationality }}</view>
              </picker>
            </uni-forms-item>
          </view>
          <view class="formItem">
            <view class="formItemTitle">
              <image src="@/static/alicon/edit-square.svg" mode=""></image>
              <text>户籍所在地</text>
            </view>
            <uni-forms-item label="所在地区" name="w_domicileAddressCity">
              <AddressPicker :baseCode="baseAddressCode" @change="permanentAddressChange">
                {{ formData.w_domicileAddressCity || '请选择地址' }}
              </AddressPicker>
            </uni-forms-item>
            <uni-forms-item label="详细地址" name="w_domicileAddress">
              <input
                type="text"
                v-model="formData.w_domicileAddress"
                placeholder="请输入详细地址"
              />
            </uni-forms-item>
          </view>
          <view class="formItem">
            <view class="formItemTitle">
              <image src="@/static/alicon/edit-square.svg" mode=""></image>
              <text>经常居住地</text>
            </view>
            <uni-forms-item label="所在地区" name="w_habitualResidenceCity" required>
              <AddressPicker :baseCode="baseAddressCode" @change="addressChange">
                {{ formData.w_habitualResidenceCity || '请选择地址' }}
              </AddressPicker>
            </uni-forms-item>
            <uni-forms-item label="详细地址" name="w_habitualResidence">
              <input
                type="text"
                v-model="formData.w_habitualResidence"
                placeholder="请输入详细地址"
              />
            </uni-forms-item>
          </view>
          <view class="formItem">
            <view class="formItemTitle">
              <image src="@/static/alicon/edit-square.svg" mode=""></image>
              <text>其它</text>
            </view>
            <uni-forms-item label="微信号" name="w_wechatNumber">
              <input type="text" v-model="formData.w_wechatNumber" placeholder="请输入微信号" />
            </uni-forms-item>
            <uni-forms-item label="邮箱" name="name">
              <input type="text" v-model="formData.w_email" placeholder="请输入邮箱" />
            </uni-forms-item>
            <uni-forms-item label="紧急联系电话" name="name">
              <input
                type="text"
                v-model="formData.w_emergencyPhone"
                placeholder="请输入紧急联系电话"
              />
            </uni-forms-item>
          </view>
        </uni-forms>
        <button @click="formSubmit" class="formSubmit">提交</button>
        <view style="height: 1rpx"></view>
        <!-- 提示信息弹窗 -->
        <uni-popup ref="popupRef" type="message">
          <uni-popup-message
            :type="popupList.msgType"
            :message="popupList.messageText"
            :duration="2000"
          ></uni-popup-message>
        </uni-popup>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.addContainer {
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 50rpx;
  // background-image: url('@/static/image/home/BG1.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .addBox {
    .addTitle {
      height: 120rpx;
      padding: 0 20rpx;
      position: relative;
      font-size: 36rpx;
      background-color: #fff;
      border-bottom: 2rpx #dadada solid;
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

    .addFormBox {
      .formItem {
        padding: 0 40rpx;
        margin: 30rpx 0;
        background-color: #fff;

        .formItemTitle {
          height: 80rpx;
          margin-bottom: 20rpx;
          border-bottom: 2rpx #dadada solid;
          display: flex;
          align-items: center;
          font-size: 36rpx;
          font-weight: 600;

          image {
            width: 60rpx;
            height: 60rpx;
            margin-right: 20rpx;
            object-fit: cover;
          }
        }
      }

      .radioStyle {
        display: flex;

        ::v-deep .uni-label-pointer {
          display: flex;
          align-items: center;
          margin-right: 40rpx;
        }
      }

      ::v-deep .uni-select {
        border: 0;

        .uni-select__input-text {
          font-size: 32rpx;
          color: rgb(0 0 0 / 54%);
        }
      }

      ::v-deep .uni-date-x--border {
        border: 0;

        .uni-date-x {
          padding: 0;
        }

        .uni-date__x-input {
          padding: 0;
          font-size: 32rpx;
        }

        .uniui-calendar::before {
          content: '';
        }
      }

      ::v-deep .uni-forms-item {
        padding-bottom: 10rpx;
        margin-bottom: 10rpx;
        border-bottom: 2rpx #dadada solid;

        .uni-forms-item__content {
          display: flex;
          align-items: center;
        }

        .uni-forms-item__label {
          width: 220rpx !important;
        }
      }
    }
  }

  .addIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 160rpx;
      height: 160rpx;
      object-fit: cover;
    }

    text {
      font-size: 32rpx;
    }
  }

  .pickerStyle {
    width: 100%;
    font-size: 32rpx;
  }
  box-sizing: border-box;

  .formSubmit {
    width: 100%;
    height: 100rpx;
    margin: 40rpx auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
