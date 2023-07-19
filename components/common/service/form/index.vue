<script setup>
import { onMounted, ref, reactive } from 'vue'
import AddressPicker from '@/components/lingdang-AddressPicker/AddressPicker.vue'

const props = defineProps({
  list: Array,
  formRules: Object
})
const list = ref(props.list)
console.log('list', list.value)
const formRules = ref(props.formRules)
// 初始化表单
const form = reactive({})
const initializationFrom = () => {
  list.value.forEach(item => {
    form[item.code] = item.data || null
  })
}
const formItem = ref({}) // 当前表单item
const formRef = ref(null)
const popupRef = ref(null)
let baseAddressCode = ''
const popupList = {
  msgType: '',
  messageText: ''
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
  console.log('item', item)
  return item.dataConfig.dataListText && item.dataConfig.dataList[Number(form[item.code])]
    ? item.dataConfig.dataList[Number(form[item.code])][item.dataConfig.dataListText]
    : form[item.code]
}
//日期选择
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
// 返回数据
const formSubmit = () => {
  return form
}

defineExpose({
  formSubmit,
  formRef
})

onMounted(() => {
  initializationFrom()
})

// //身份类型选择
// const IdentityTypeList = [
//     {
//       value: 0,
//       text: '居民身份证'
//     },
//     {
//       value: 1,
//       text: '护照'
//     },
//     {
//       value: 2,
//       text: '台胞证'
//     },
//     {
//       value: 3,
//       text: '港澳通行证'
//     },
//     {
//       value: 4,
//       text: '其它证件'
//     }
//   ]
// {
//   type: 'picker',
//   text: '国籍选择',
//   code: 'w_nationality',
//   data: '中国',
//   dataConfig: {
//     dataList: countryData,
//     dataListText: 'country_name_cn',
//     dataType: 'country_name_cn' //form的数据类型
//   }
// },
// {
//       type: 'checkbox',
//       text: '性别',
//       code: 'w_sex',
//       data: null,
//       dataConfig: {
//         dataList: [
//           {
//             text: '男',
//             value: 1
//           },
//           {
//             text: '女',
//             value: 0
//           }
//         ]
//       }
//     }
</script>

<template>
  <view class="addContainer">
    <view class="addBox">
      <view class="addFormBox" v-if="list.length">
        <uni-forms ref="formRef" :modelValue="form" :rules="formRules || {}">
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
}
</style>
