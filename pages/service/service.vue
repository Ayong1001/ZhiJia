<template>
	<view class="serviceContainer">
		<view class="serviceHeader">
			<view class="row">
				<view class="rowText1Box">
					<text :class="['rowText1', provinceIndex == index? `rowText1Active` : '']"
						v-for="(item,index) in defaultAddress.slice(0,4)" @click="addressSelect(item,index)">{{item.name}}</text>
					<text :class="['rowText1', colorState? `rowText1Active` : '']">{{defaultAddress.at(-1).name}}</text>
				</view>
				<view class="moreBox">
					<picker @change="provinceArrChange" :range="provinceArr" range-key="name">
						<!-- <view class="uni-input">{{array[index]}}</view> -->
						<image class="ListIcon" src="@/static/alicon/list.svg" mode=""></image>
					</picker>
				</view>
			</view>
			<view class="row">
				<view class="addressText">
					<view class="addressPicker">
						<AddressPicker ref="AddressPickerRef" :baseCode="defaultAddress[0].id" @change="permanentAddressChange">
							{{addressText || '请选择地址'}}
						</AddressPicker>
					</view>
					<uni-icons class="addressPickerIcon" type="bottom" size="10"></uni-icons>
				</view>
				<uni-data-checkbox class="workTypeCheckbox" v-model="defWorkTypeIndex" mode="tag" :localdata="workTypeList"
					@change="workTypeChange" selectedColor="#2979ff"></uni-data-checkbox>
			</view>
		</view>
		<view class="engineerTable">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr class="trStyle" height="60">
					<uni-th width="30" align="center">排名</uni-th>
					<uni-th width="40" align="center">等级</uni-th>
					<uni-th width="50" align="center">姓名</uni-th>
					<uni-th width="30" align="center">年龄</uni-th>
					<uni-th width="50" align="center">完工件数</uni-th>
					<uni-th width="50" align="center">目前状态</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr :style="{backgroundColor:`${trBGColor(item)}`}" v-for="(item,index) in engineerList">
					<uni-td align="center">{{index + 1}}</uni-td>
					<uni-td class="imgTd" align="center">
						<image v-if="item.grade === 1" src="@/static/alicon/gold.svg" mode=""></image>
						<image v-else-if="item.grade === 2" src="@/static/alicon/silver.svg" mode=""></image>
						<image v-else src="@/static/alicon/bronze.svg" mode=""></image>
					</uni-td>
					<uni-td align="center">{{item.name}}</uni-td>
					<uni-td align="center">{{item.age}}</uni-td>
					<uni-td align="center">{{item.num}}</uni-td>
					<uni-td align="center">
						<text v-if="item.state === 1">正在施工</text>
						<text v-else-if="item.state === 2">已完工</text>
						<text v-else>空闲</text>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import workTypeList from '@/utils/workTypeList.js'
	import AllAddress from '@/utils/AddressData.js'
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"

	const provinceIndex = ref(0) //省份下标
	// 查询表单
	const form = reactive({
		address:'四川省',
		workType:''
	})
	const engineerList = [{
			rank: 1,
			grade: 1,
			name: '张师傅大',
			age: 30,
			num: 30,
			state: 1,
		},
		{
			rank: 2,
			grade: 1,
			name: '李四',
			age: 28,
			num: 19,
			state: 2,
		},
		{
			rank: 3,
			grade: 2,
			name: '陈沙发',
			age: 32,
			num: 35,
			state: 1,
		},
		{
			rank: 3,
			grade: 2,
			name: '空间代理费',
			age: 31,
			num: 28,
			state: 2,
		},
		{
			rank: 4,
			grade: 3,
			name: '科技否定',
			age: 29,
			num: 21,
			state: 2,
		},
		{
			rank: 4,
			grade: 3,
			name: '科技否定',
			age: 26,
			num: 23,
			state: 3,
		},
		{
			rank: 4,
			grade: 3,
			name: '科技否定',
			age: 25,
			num: 27,
			state: 3,
		},
	]
	// 工种选择
	let defWorkTypeIndex = 0
	const workTypeChange = (e) => {
		form.workType = workTypeList[e.detail.value].text
		console.log('form',form)
	}
	//默认地址数组
	const defaultAddress = reactive([{
		"id": "510000",
		"name": "四川省"
	}, {
		"id": "500000",
		"name": "重庆市"
	}, {
		"id": "110000",
		"name": "北京市"
	}, {
		"id": "310000",
		"name": "上海市"
	}, {
		"id": "",
		"name": "更多..."
	}])
	const colorState = ref(false)
	const AddressPickerRef = ref(null)
	const	addressText = ref('')
	
	// 省份选择
	const provinceArr = AllAddress.map(item=>{
		return {id:item.id,name:item.name}
	})
	const addressSelect = (item, index) => {
		addressText.value = ''
		defaultAddress.at(-1).name = '更多...'
		AddressPickerRef.value.baseAddressChange(item.id)
		colorState.value = false
		provinceIndex.value = index
		form.address = item.name
	}
	const provinceArrChange = e =>{
		addressText.value = ''
		defaultAddress.at(-1).name = provinceArr[e.detail.value].name
		AddressPickerRef.value.baseAddressChange(provinceArr[e.detail.value].id)
		form.address = provinceArr[e.detail.value].name
		provinceIndex.value = null
		colorState.value = true
	}
	
	// 颜色控制
	const trBGColor = (item) => {
		if (item.state == 1) return '#fad8d6'
		else if (item.state == 2) return '#fdedd9'
		else return '#d1f2d7'
	}
	// 详细地址选择器
	const permanentAddressChange = (result) => {
		addressText.value = ''
		result.splice(0, 1)
		result.forEach((item, index) => {
			if (index === 0) {
				addressText.value += item.name
				form.address += ('-' + item.name)
			} else {
				form.address += ('-' + item.name)
				addressText.value += item.name
			}
		})
	}
</script>

<style lang="scss" scoped>
	.serviceContainer {
		.rowText1Active {
			color: #2979ff;
		}
		.serviceHeader {
			.row {
				padding: 0 20rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx #e9e9eb solid;

				.rowText1Box {
					flex: 1;
					display: flex;
					margin-right: 20rpx;
					align-items: center;
					justify-content: space-between;

					.rowText1 {
						max-width: 120rpx;
						text-align: center;
						font-weight: bold;
					}
					
				}

				.moreBox {
					image {
						width: 50rpx;
						height: 50rpx;
						object-fit: cover;
					}
				}

				.addressText {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.addressPicker {
						max-width: 200rpx;
						overflow: hidden;
						font-size: 28rpx;
						white-space: nowrap;
						font-weight: bold;
					}
					.addressPickerIcon{
						margin-left: 20rpx;
					}
				}

				.ListIcon {
					width: 60rpx;
					height: 60rpx;
					object-fit: cover;
				}

				.workTypeCheckbox {
					flex: 1;
					margin-left: 20rpx;

					::v-deep .checklist-group {
						width: 520rpx;
						flex-wrap: nowrap;
						align-items: center;
						overflow: scroll;

						.checklist-box {
							display: inline-table;
							min-width: 60rpx;
						}
						.checklist-text{
							white-space: nowrap;
						}
					}
				}

				::v-deep .uni-mt-10 {
					width: 400rpx;
					margin-top: 0;
					align-items: center;
				}
			}
		}

		.engineerTable {
			overflow: auto;
			border-radius: 10rpx;

			.trStyle {
				background-color: #00000012;
			}

			.imgTd {
				display: flex;
				align-items: center;
				justify-content: center;
				// border-bottom: 0;

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			::v-deep .uni-table-th {
				padding: 24rpx 12rpx;
			}

			::v-deep .uni-table-td {
				padding: 8rpx 0;
			}
		}
	}
</style>