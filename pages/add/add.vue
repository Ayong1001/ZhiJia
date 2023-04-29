<template>
	<view class="container">
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
					<text>个人信息</text>
				</view>
			</view>
			<view class="addFormBox">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<view class="formItem">
						<view class="formItemTitle">
							<image src="@/static/alicon/edit-square.svg" mode=""></image>
							<text>用户基础信息</text>
						</view>
						<uni-forms-item label="姓名" name="name" required>
							<input type="text" v-model="formData.u_name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="性别" name="sex" required>
							<radio-group class="radioStyle">
								<label>
									<view>
										<radio checked value=1 />
									</view>
									<view>男</view>
								</label>
								<label>
									<view>
										<radio value=0 />
									</view>
									<view>女</view>
								</label>
							</radio-group>
						</uni-forms-item>
						<uni-forms-item label="联系电话" name="phone" required>
							<input type="text" v-model="formData.name" placeholder="请输入联系电话" />
						</uni-forms-item>
						<uni-forms-item label="证件类型" name="paperworkType" required>
							<uni-data-select v-model="formData.name" :localdata="range1"></uni-data-select>
						</uni-forms-item>
						<uni-forms-item label="证件号码" name="paperwork" required>
							<input type="text" v-model="formData.name" placeholder="请输入证件号码" />
						</uni-forms-item>
						<uni-forms-item label="工种" name="workType" required>
							<picker class="pickerStyle" @change="workTypeChange" :value="workTypeIndex" :range="range2">
								<view>{{range2[workTypeIndex]}}</view>
							</picker>
						</uni-forms-item>
						<uni-forms-item label="出生日期" name="birthday" required>
							<uni-datetime-picker type="date" v-model="birthdayDate" @change="birthdayChange" />
						</uni-forms-item>
						<uni-forms-item label="国籍" name="nationality" required>
							<picker class="pickerStyle" @change="countryChange" :value="countryIndex" :range="countryData"
								range-key="country_name_cn">
								<view>{{countryData[countryIndex].country_name_cn}}</view>
							</picker>
						</uni-forms-item>
					</view>
					<view class="formItem">
						<view class="formItemTitle">
							<image src="@/static/alicon/edit-square.svg" mode=""></image>
							<text>户籍所在地</text>
						</view>
						<uni-forms-item label="所在地区" name="nationality" required>
							<AddressPicker @change="addressChange">{{planLocate}} </AddressPicker>
						</uni-forms-item>
						<uni-forms-item label="详细地址" name="name" required>
							<input type="text" v-model="formData.u_name" placeholder="请输入详细地址" />
						</uni-forms-item>
					</view>
					<view class="formItem">
						<view class="formItemTitle">
							<image src="@/static/alicon/edit-square.svg" mode=""></image>
							<text>经常居住地</text>
						</view>
						<uni-forms-item label="所在地区" name="nationality" required>
							<AddressPicker @change="addressChange">{{planLocate}} </AddressPicker>
						</uni-forms-item>
						<uni-forms-item label="详细地址" name="name" required>
							<input type="text" v-model="formData.u_name" placeholder="请输入详细地址" />
						</uni-forms-item>
					</view>
					<view class="formItem">
						<view class="formItemTitle">
							<image src="@/static/alicon/edit-square.svg" mode=""></image>
							<text>其它</text>
						</view>
						<uni-forms-item label="微信号" name="name">
							<input type="text" v-model="formData.u_name" placeholder="请输入详细地址" />
						</uni-forms-item>
						<uni-forms-item label="邮箱" name="name">
							<input type="text" v-model="formData.u_name" placeholder="请输入详细地址" />
						</uni-forms-item>
						<uni-forms-item label="紧急联系电话" name="name">
							<input type="text" v-model="formData.u_name" placeholder="请输入详细地址" />
						</uni-forms-item>
					</view>
				</uni-forms>
				<button @click="formSubmit">提交</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive,
		ref
	} from "vue";
	import countryData from '@/utils/country.js'
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"

	let addState = ref(false)
	const changeAddState = () => {
		addState.value = !addState.value
	}
	const formSubmit = () => {
		console.log(123)
	}
	//form表单数据
	const formData = {
		name: '',
		email: ''
	}
	//身份类型选择
	const range1 = [{
			value: 0,
			text: "居民身份证"
		},
		{
			value: 1,
			text: "护照"
		},
		{
			value: 2,
			text: "台胞证"
		},
		{
			value: 3,
			text: "港澳通行证"
		},
		{
			value: 4,
			text: "其它证件"
		},
	]
	//工种选择
	let workType = '小工'
	let workTypeIndex = 0
	const range2 = ['小工', '水工', '电工', '木工', '泥工', '瓦工', '焊工', '水暖工', '防水工', '油漆工', '涂料工', '厨房工', '装饰工', '保洁工', '维修工',
		'设计师', '杂工'
	]
	const workTypeChange = (e) => {
		workTypeIndex = e.detail.value
		workType = range2[e.detail.value]
	}
	//出生日期选择
	let birthdayDate = ''
	const birthdayChange = function(e) {
		birthdayDate = e
	}
	//国籍选择
	let country = '中国'
	let countryIndex = 36
	const countryChange = (e) => {
		countryIndex = e.detail.value
		country = countryData[e.detail.value].country_name_cn
	}
	//户籍所在地
	let planLocate = '请选择地址'
	const addressChange = (result) => {
		console.log(result)
		console.log(JSON.stringify(result.data));
		// planLocate = '';
		// result.data.forEach((item, index) => {
		// 	if (index === 0) {
		// 		planLocate += item.name
		// 	} else {
		// 		planLocate += '-' + item.name
		// 	}
		// });
		// let arr = planLocate.split('-');
	}
	//
	const rules = {
		// 对name字段进行必填验证
		name: {
			rules: [{
					required: true,
					errorMessage: '请输入姓名',
				},
				{
					minLength: 3,
					maxLength: 5,
					errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
		// 对email字段进行必填验证
		email: {
			rules: [{
				format: 'email',
				errorMessage: '请输入正确的邮箱地址',
			}]
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100%;
		position: relative;

		.addBox {
			.addTitle {
				height: 60px;
				padding: 0 10px;
				position: relative;
				font-size: 18px;
				background-color: #fff;
				border-bottom: 1px #dadada solid;
				display: flex;
				align-items: center;

				.addTitleLeft {
					display: flex;
					align-items: center;

					image {
						width: 30px;
						height: 30px;
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
					padding: 0 20px;
					margin: 15px 0;
					background-color: #fff;

					.formItemTitle {
						height: 40px;
						margin-bottom: 10px;
						border-bottom: 1px #dadada solid;
						display: flex;
						align-items: center;
						font-size: 18px;
						font-weight: 600;

						image {
							width: 30px;
							height: 30px;
							margin-right: 10px;
							object-fit: cover;
						}
					}
				}

				.radioStyle {
					display: flex;

					::v-deep .uni-label-pointer {
						display: flex;
						align-items: center;
						margin-right: 20px;
					}
				}

				::v-deep .uni-select {
					border: 0;

					.uni-select__input-text {
						font-size: 16px;
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
						font-size: 16px;
					}

					.uniui-calendar::before {
						content: '';
					}
				}

				::v-deep .uni-forms-item {
					padding-bottom: 5px;
					margin-bottom: 5px;
					border-bottom: 1px #dadada solid;

					.uni-forms-item__content {
						display: flex;
						align-items: center;
					}

					.uni-forms-item__label {
						width: 110px !important;
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
				width: 80px;
				height: 80px;
				object-fit: cover;
			}

			text {
				font-size: 16px;
			}
		}

		.pickerStyle {
			width: 100%;
			font-size: 16px;
		}
	}
</style>