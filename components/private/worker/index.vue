<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { worker } from '@/api/baseRequest'
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
    id: 'w_address',
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
</script>

<template>
  <view class="userContainer" v-if="pageState">
    <view class="top">
      <view class="backImgBox">
        <image class="backImg" src="@/static/alicon/right.svg" @click="backPage" mode=""></image>
      </view>
      <view class="userBox">
        <view class="userNameBox">
          <text class="userName">蔡师傅</text>
          <uni-tag
            style="color: #0000008a; background-color: #c7c7c84a"
            text="木工"
            type="default"
            size="small"
            circle
            inverted
          />
        </view>
        <view class="avatarBox">
          <view class="avatarBoxLeft">
            <text class="des"
              >{{ workerData.w_addressCity }}/{{ workerData.w_typeWork }}/{{
                workerData.w_age
              }}岁/{{ workerData.w_seniority }}年/{{
                workerData.w_garde == 1
                  ? '金牌师傅'
                  : workerData.w_garde == 2
                  ? '银牌师傅'
                  : '铜牌师傅'
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
        <tabs class="tabs" v-model:active="active" scrollspy sticky offset-top="12.5rem">
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
              <Cell class="title1" title="装修历史" center></Cell>
              <Cell>
                <view class="address">
                  <image src="@/static/c1.png" mode="scaleToFill" />
                  <text>金华小区18-1-1901</text>
                </view>
                <view class="message">
                  <text>2021</text>
                  <text>成都市</text>
                  <text>金牌</text>
                  <text>85元/小时</text>
                </view>
              </Cell>
              <Cell>
                <view class="address">
                  <image src="@/static/c2.png" mode="scaleToFill" />
                  <text>金华小区18-1-1901</text>
                </view>
                <view class="message">
                  <text>2021</text>
                  <text>成都市</text>
                  <text>金牌</text>
                  <text>85元/小时</text>
                </view>
              </Cell>
              <Cell>
                <view class="address">
                  <image src="@/static/c3.png" mode="scaleToFill" />
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
              <Cell class="title1" title="参考价格" center></Cell>
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
                  <image
                    v-for="item in imgList"
                    @click="imgClick(item)"
                    :src="item"
                    mode="heightFix"
                  />
                </view>
              </Cell>
            </CellGroup>
          </tab>
          <tab title="联系" class="tab tab1">
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
          </tab>
        </tabs>
      </view>
    </view>
  </view>
</template>
<style lang="less">
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
        display: flex;
        align-items: end;

        .userName {
          font-size: 40rpx;
          font-weight: bold;
          margin: 0 50rpx 0 100rpx;
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
                font-size: 50rpx;
                font-weight: bold;
                margin-right: 5rpx;
              }
            }
          }
        }

        .avatarBoxRight {
          margin-left: 10rpx;

          image {
            width: 150rpx;
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
        .title1 {
          font-size: 34rpx;
          font-weight: bold;
          height: 100rpx;
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
              width: 50rpx;
              height: 50rpx;
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
            padding: 15rpx 50rpx 0 50rpx;
            display: flex;
            justify-content: space-between;

            text {
              font-size: 28rpx;
            }
          }
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
