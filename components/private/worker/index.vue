<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { worker } from '@/api/baseRequest'
import workTypeList from '@/utils/workTypeList.js'
import { Tab, Tabs, Field, CellGroup, Cell, showImagePreview } from 'vant'
import 'vant/lib/index.css'

const workerData = ref({})
const pageState = ref(true)
//获取当前路由参数
onLoad(option => {
  worker({
    data: {
      w_id: JSON.parse(decodeURIComponent(option.w_id))
    }
  }).then(res => {
    console.log('res', res)
    if (res.statusCode != 200) {
      return
    } else {
      workerData.value = res.data.data
      if (res.data.data.w_garde == 1) {
        workerData.value.w_garde = '金牌师傅'
      } else if (res.data.data.w_garde == 2) {
        workerData.value.w_garde = '银牌师傅'
      } else {
        workerData.value.w_garde = '铜牌师傅'
      }
      pageState.value = true
    }
  })
})
//返回页面
const backPage = () => {
  uni.navigateBack()
}
//图片预览
const imgClick = item => {
  showImagePreview([item])
}
//
const dataList = [
  {
    id: 'w_habitualResidenceCity',
    name: '地区'
  },
  {
    id: 'w_birthday',
    name: '出生日期'
  },
  {
    id: 'w_completedQuantity',
    name: '完工件数'
  },
  {
    id: 'w_typeWork',
    name: '工种类别'
  },
  {
    id: 'w_seniority',
    name: '工龄'
  },
  {
    id: 'w_garde',
    name: '等级'
  }
]
const historyList = [
  ['w_1', 'w_2', 'w_3', 'w_4', 'w_5'],
  ['w_1', 'w_2', 'w_3', 'w_4', 'w_5'],
  ['w_1', 'w_2', 'w_3', 'w_4', 'w_5']
]
const priceList = [
  {
    id: 'w_historyPrice',
    name: '历史最低单价'
  },
  {
    id: 'w_price',
    name: '目前施工单价'
  }
]
const contactList = [
  {
    id: '9',
    name: '地点'
  },
  {
    id: '10',
    name: '客户姓名'
  },
  {
    id: '11',
    name: '联系方式'
  }
]
const imgList = [
  '/static/image/home/mmexport1617207387677.jpg',
  '/static/image/home/asd.jpg',
  '/static/image/home/1616860018685.webp',
  '/static/image/home/2021-05-14-00-00-53-677.jpg'
]

//联系师傅
const inputDialog = ref(null)
const dialogToggle = type => {
  inputDialog.value.open()
}

//编辑信息
const editClick = type => {
  const pickerList = workTypeList.map(item => {
    return item.text
  })
  // 传入表单数据
  const formConfig1 = {
    type: 'default',
    text: '基本信息',
    dataList: [
      {
        type: 'input',
        text: '工人姓名',
        code: 'w_name',
        data: workerData.value.w_name
      },
      {
        type: 'picker',
        text: '工种',
        code: 'w_typeWork',
        data: workerData.value.w_typeWork,
        dataConfig: {
          dataList: pickerList
        }
      },
      {
        type: 'datePicker',
        text: '出生日期',
        code: 'w_birthday',
        data: workerData.value.w_birthday
      },
      {
        type: 'input',
        text: '工龄',
        code: 'w_seniority',
        data: workerData.value.w_seniority,
        disabled: true
      },
      {
        type: 'picker',
        text: '师傅等级',
        code: 'w_garde',
        data: workerData.value.w_garde,
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
        data: workerData.value.w_completedQuantity
      },
      {
        type: 'input',
        text: '施工单价',
        code: 'w_price',
        data: workerData.value.w_price
      },
      {
        type: 'addressPicker',
        text: '所在地区',
        code: 'w_habitualResidenceCity',
        data: workerData.value.w_habitualResidenceCity
      }
    ],
    formRules: {
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
    },
    request: {
      url: '/worker/update',
      methods: 'PUT'
    }
  }
  const formConfig2 = {
    type: 'collapse',
    text: '装修历史',
    code: 'w_decorationHistory',
    dataList: [
      [
        {
          type: 'input',
          text: '施工项目',
          code: 'address',
          data: '金华小区18-1-1901'
        },
        {
          type: 'input',
          text: '施工年份',
          code: 'date',
          data: '2021'
        },
        {
          type: 'input',
          text: '施工所在地区',
          code: 'city',
          data: '成都市'
        },
        {
          type: 'input',
          text: '师傅等级',
          code: 'garde',
          data: 1
        },
        {
          type: 'input',
          text: '施工价格',
          code: 'price',
          data: 85
        }
      ]
    ],
    request: {
      url: '/worker/update',
      methods: 'PUT'
    }
  }
  const formConfig3 = {
    type: 'default',
    text: '参考价格',
    dataList: [
      {
        type: 'input',
        text: '历史最低单价',
        code: 'w_11',
        data: workerData.value.w_11
      },
      {
        type: 'input',
        text: '目前施工单价',
        code: 'w_12',
        data: workerData.value.w_12
      }
    ],
    request: {
      url: '/worker/update',
      methods: 'PUT'
    }
  }
  let formConfig = {}
  if (type === 1) {
    formConfig = formConfig1
  } else if (type === 2) {
    formConfig = formConfig2
  } else if (type === 3) {
    formConfig = formConfig3
  }
  //带数据跳转信息编辑页
  uni.navigateTo({
    url: `/components/private/workerEdit/index?formConfig=${JSON.stringify(formConfig)}`
  })
}
</script>

<template>
  <view class="userContainer" v-if="pageState">
    <view class="top">
      <view class="backImgBox">
        <image class="backImg" src="@/static/alicon/right.svg" @click="backPage" mode=""></image>
      </view>
      <view class="userBox">
        <view class="userNameBox">
          <view>
            <text class="userName">{{ workerData.w_name }}</text>
            <uni-tag
              style="color: #0000008a; background-color: #c7c7c84a"
              :text="workerData.w_typeWork"
              type="default"
              size="small"
              circle
              inverted
            />
          </view>
          <button class="editBtn" type="default" plain="true" size="mini" @click="editClick(1)">
            编辑
          </button>
        </view>
        <view class="avatarBox">
          <view class="avatarBoxLeft">
            <text class="des"
              >{{ workerData.w_habitualResidenceCity?.split('-')[0] }}/{{
                workerData.w_typeWork
              }}/{{ workerData.w_age }}岁/{{ workerData.w_seniority }}年/{{
                workerData.w_garde
              }}</text
            >
            <view class="dataBox">
              <view class="dataBoxItem">
                <view
                  ><text class="dataNum">{{ workerData.w_completedQuantity }}</text
                  ><text>件</text>
                </view>
                <text>完工件数</text>
              </view>
              <view class="dataBoxItem">
                <view>
                  <text class="dataNum">{{ workerData.w_price }}</text
                  ><text>元/小时</text>
                </view>
                <text>施工单价</text>
              </view>
            </view>
          </view>
          <view class="avatarBoxRight">
            <image src="@/static/image/components/private/worker/Screenshot1.png" mode=""></image>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="tabBox">
        <tabs class="tabs" v-model:active="active" scrollspy sticky offset-top="14.35rem">
          <tab title="资料" class="tab tab1">
            <CellGroup>
              <Field
                v-for="(item, index) in dataList"
                v-model="workerData[item.id]"
                :label="item.name"
                center
                readonly
                colon
                clickable
                :key="index"
              >
              </Field>
            </CellGroup>
          </tab>
          <tab title="装修历史" class="tab tab2">
            <CellGroup>
              <Cell class="title1" title="装修历史" center>
                <template v-slot:value>
                  <text class="editBtn2" @click.stop="editClick(2)">编辑</text>
                </template>
              </Cell>
              <Cell v-for="(item, index) in historyList">
                <view class="address">
                  <image :src="`/static/c${index + 1}.png`" mode="scaleToFill" />
                  <text>金华小区18-1-1901</text>
                </view>
                <view class="message">
                  <text>2021</text>
                  <text>成都市</text>
                  <text>金牌</text>
                  <text>85元/小时</text>
                </view>
              </Cell>
            </CellGroup>
          </tab>
          <tab title="参考价格" class="tab tab1">
            <CellGroup>
              <Cell class="title1" title="参考价格" center>
                <template v-slot:value>
                  <text class="editBtn2" @click.stop="editClick(3)">编辑</text>
                </template>
              </Cell>
              <Field
                v-for="(item, index) in priceList"
                v-model="workerData[item.id]"
                :label="item.name"
                center
                readonly
                colon
                clickable
                :key="index"
              >
              </Field>
            </CellGroup>
          </tab>
          <tab title="完工照片" class="tab">
            <CellGroup>
              <Cell class="title1" title="完工照片" center></Cell>
              <Cell>
                <view class="imgBox">
                  <!-- <image
                    v-for="item in imgList"
                    @click="imgClick(item)"
                    :src="item"
                    mode="heightFix"
                  /> -->
                </view>
              </Cell>
            </CellGroup>
          </tab>
          <!-- <tab title="联系" class="tab tab1">
            <CellGroup>
              <Cell class="title1" title="联系师傅" center></Cell>
              <Field
                v-for="(item, index) in contactList"
                v-model="workerData[item.id]"
                :label="item.name"
                center
                readonly
                colon
                clickable
                :key="index"
              >
              </Field>
            </CellGroup>
          </tab> -->
          <button class="btn" @click="dialogToggle('success')">联系师傅</button>
          <uni-popup ref="inputDialog" type="dialog">
            <uni-popup-dialog
              ref="inputClose"
              mode="input"
              title="联系师傅"
              placeholder="请输入内容"
              @confirm="dialogInputConfirm"
            >
              <CellGroup>
                <Field
                  v-for="(item, index) in contactList"
                  v-model="workerData[item.id]"
                  :label="item.name"
                  center
                  readonly
                  colon
                  clickable
                  :key="index"
                >
                </Field>
              </CellGroup>
            </uni-popup-dialog>
          </uni-popup>
          <view style="height: 1rpx"></view>
        </tabs>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
.userContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    width: 100%;
    height: 400rpx;
    background-color: #00abff99;
    display: flex;
    flex-direction: column;

    .backImgBox {
      box-sizing: border-box;
      padding: 20rpx;

      .backImg {
        width: 50rpx;
        height: 50rpx;
        object-fit: cover;
        transform: rotate(180deg);
      }
    }

    .userBox {
      flex: 1;
      display: flex;
      flex-direction: column;

      text {
        color: #fff;
        letter-spacing: 5rpx;
      }

      .userNameBox {
        padding: 0 50rpx 0 100rpx;
        display: flex;
        align-items: end;
        justify-content: space-between;

        .userName {
          font-size: 40rpx;
          font-weight: bold;
          margin-right: 50rpx;
        }
        .editBtn {
          margin: 0;
          padding: 0;
          width: 80rpx;
          height: 40rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .avatarBox {
        flex: 1;
        box-sizing: border-box;
        display: flex;
        padding: 20rpx 50rpx;

        text {
          font-size: 28rpx;
        }

        .avatarBoxLeft {
          flex: 1;

          .des {
            display: block;
            margin: 20rpx 0;
          }

          .dataBox {
            display: flex;

            .dataBoxItem {
              padding-top: 10rpx;
              width: 50%;

              text {
                font-size: 24rpx;
                letter-spacing: 3rpx;
              }

              .dataNum {
                font-size: 40rpx;
                font-weight: bold;
                margin-right: 5rpx;
              }
            }
          }
        }

        .avatarBoxRight {
          margin-left: 10rpx;

          image {
            width: 180rpx;
            height: 200rpx;
            object-fit: cover;
          }
        }
      }
    }
  }

  .bottom {
    flex: 1;
    overflow: auto;

    .tabBox {
      width: 100%;
      height: 100%;

      .tabs {
        box-sizing: border-box;
        .title1 {
          font-size: 34rpx;
          font-weight: bold;
          height: 100rpx;
          .editBtn2 {
            font-size: 30rpx;
            letter-spacing: 3rpx;
          }
        }

        .tab {
          border-bottom: 30rpx #f5f5f5 solid;

          .imgBox {
            width: 100%;
            overflow-x: scroll;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            image {
              flex-shrink: 0;
              margin: 0 20rpx;
              max-height: 300rpx;
            }
          }
        }

        .tab1 {
          /deep/ .van-field__label {
            font-size: 32rpx;
            color: #999a9c;
          }

          /deep/ .van-field__control {
            font-size: 30rpx;
          }
        }

        .tab2 {
          .address {
            display: flex;
            align-items: center;

            image {
              width: 35rpx;
              height: 35rpx;
              object-fit: cover;
              margin-right: 10rpx;
            }

            text {
              font-size: 32rpx;
              color: #323233;
            }
          }

          .message {
            box-sizing: border-box;
            width: 100%;
            padding: 0 50rpx;
            display: flex;
            justify-content: space-between;

            text {
              font-size: 28rpx;
            }
          }
        }
        .btn {
          width: 100%;
          height: 100rpx;
          margin: 40rpx auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  /deep/ .van-field__label {
    width: auto;
    min-width: var(--van-field-label-width);
    max-width: 50%;
  }
}
</style>
