<script setup>
import { onMounted, ref, reactive } from 'vue'
import { add } from '@/api/baseRequest'
import countryData from '@/utils/country.js'
import AddressPicker from '@/components/lingdang-AddressPicker/AddressPicker.vue'

// 当前表单item
const formItem = ref({})

const pickerList = ['小工', '水工', '电工', '木工']
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
const list = reactive([
  {
    type: 'input',
    text: '工人姓名',
    code: 'w_name',
    data: '高先生'
  },
  {
    type: 'picker',
    text: '工种',
    code: 'w_typeWork',
    data: '小工',
    dataConfig: {
      dataList: pickerList
    }
  },
  {
    type: 'datePicker',
    text: '出生日期',
    code: 'w_birthday',
    data: null
  },
  {
    type: 'input',
    text: '工龄',
    code: 'w_seniority',
    data: null,
    disabled: true
  },
  {
    type: 'picker',
    text: '师傅等级',
    code: 'w_garde',
    data: 0,
    dataConfig: {
      dataList: [
        {
          value: 0,
          text: '铜牌师傅'
        },
        {
          value: 1,
          text: '金牌师傅'
        },
        {
          value: 2,
          text: '银牌师傅'
        }
      ],
      dataListText: 'text'
    }
  },
  {
    type: 'input',
    text: '完工件数',
    code: 'w_completedQuantity',
    data: null
  },
  {
    type: 'input',
    text: '施工单价',
    code: 'w_price',
    data: null
  },
  {
    type: 'addressPicker',
    text: '所在地区',
    code: 'w_habitualResidenceCity',
    data: null
  },
  {
    type: 'picker',
    text: '身份类型',
    code: 'w_idType',
    data: 0,
    dataConfig: {
      dataList: IdentityTypeList,
      dataListText: 'text'
    }
  },
  {
    type: 'picker',
    text: '国籍选择',
    code: 'w_nationality',
    data: '中国',
    dataConfig: {
      dataList: countryData,
      dataListText: 'country_name_cn',
      dataType: 'country_name_cn' //form的数据类型
    }
  },
  {
    type: 'checkbox',
    text: '性别',
    code: 'w_sex',
    data: null,
    dataConfig: {
      dataList: [
        {
          text: '男',
          value: 1
        },
        {
          text: '女',
          value: 0
        }
      ]
    }
  }
])
const form = reactive({})
// 初始化表单
const initializationFrom = () => {
  list.forEach(item => {
    form[item.code] = item.data
  })
}

const formRef = ref(null)
const popupRef = ref(null)
let baseAddressCode = ''
const popupList = {
  msgType: '',
  messageText: ''
}
// 校验规则
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

// 表单item点击事件
const formItemClick = value => {
  formItem.value = value
}
//单列选择
const pickerChange = e => {
  if (formItem.value.dataConfig.dataType) {
    form[formItem.value.code] =
      formItem.value.dataConfig.dataList[e.detail.value][formItem.value.dataConfig.dataType]
  } else if (formItem.value.dataConfig.dataListText) {
    form[formItem.value.code] = e.detail.value
  } else {
    form[formItem.value.code] = formItem.value.dataConfig.dataList[e.detail.value]
  }
}
const showChoose = item => {
  return item.dataConfig.dataListText && item.dataConfig.dataList[form[item.code]]
    ? item.dataConfig.dataList[Number(form[item.code])][item.dataConfig.dataListText]
    : form[item.code]
}
//出生日期选择
const dateChange = function (e) {
  form[formItem.value.code] = e
}
//地址选择
const addressChange = result => {
  form[formItem.value.code] = ''
  result.forEach((item, index) => {
    if (index === 0) {
      form[formItem.value.code] += item.name
    } else {
      form[formItem.value.code] += '-' + item.name
    }
  })
}

//消息提示
const messageToggle = (type, text) => {
  popupList.msgType = type
  popupList.messageText = text
  popupRef.value.open()
}
// 表单提交/校验
const formSubmit = () => {
  console.log(form)
  return
  formRef.value
    .validate()
    .then(res => {
      add({
        data: formData.value
      }).then(res => {
        if (res.statusCode == 200) {
          messageToggle('success', '提交成功!')
          setTimeout(() => {}, 1000)
        } else {
          messageToggle('error', '提交失败!')
        }
      })
    })
    .catch(err => {
      messageToggle('error', err[0].errorMessage)
    })
}
onMounted(() => {
  initializationFrom()
})
</script>

<template>
  <view class="addContainer">
    <view class="addBox">
      <view class="addTitle">
        <view class="addTitleCenter">
          <text>编辑信息</text>
        </view>
      </view>
      <view class="addFormBox">
        <uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
          <view class="formItem">
            <view v-for="(item, index) in list" :key="index">
              <uni-forms-item
                v-if="item.type === 'input'"
                :label="item.text"
                :name="item.code"
                :disabled="item.disabled"
              >
                <input type="text" v-model="form[item.code]" :placeholder="`请输入${item.text}`" />
              </uni-forms-item>
              <uni-forms-item v-if="item.type === 'checkbox'" :label="item.text" :name="item.code">
                <uni-data-checkbox
                  v-model="form[item.code]"
                  :localdata="item.dataConfig.dataList"
                />
              </uni-forms-item>
              <uni-forms-item v-if="item.type === 'select'" :label="item.text" :name="item.code">
                <uni-data-select
                  v-model="form[item.code]"
                  :localdata="item.dataList"
                ></uni-data-select>
              </uni-forms-item>
              <uni-forms-item
                v-if="item.type === 'datePicker'"
                :label="item.text"
                :name="item.code"
              >
                <uni-datetime-picker
                  type="date"
                  v-model="form[item.code]"
                  @change="dateChange"
                  @click="formItemClick(item)"
                />
              </uni-forms-item>
              <uni-forms-item v-if="item.type === 'picker'" :label="item.text" :name="item.code">
                <picker
                  class="pickerStyle"
                  @change="pickerChange"
                  @click="formItemClick(item)"
                  :range="item.dataConfig.dataList"
                  :range-key="item.dataConfig.dataListText"
                >
                  <view>{{ showChoose(item) }}</view>
                  <!-- <view>{{ form[item.code] }}</view> -->
                </picker>
              </uni-forms-item>
              <uni-forms-item
                v-if="item.type === 'addressPicker'"
                :label="item.text"
                :name="item.code"
              >
                <AddressPicker
                  :baseCode="baseAddressCode"
                  @change="addressChange"
                  @click="formItemClick(item)"
                >
                  {{ form[item.code] || '请选择地址' }}
                </AddressPicker>
              </uni-forms-item>
            </view>
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
