<script setup>
	import {
		ref
	} from 'vue'

	let current = ref(0)
	let swiperDotIndex = ref(0)
	const info = [{
			colorClass: 'uni-bg-red',
			url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
			content: '内容 A'
		},
		{
			colorClass: 'uni-bg-green',
			url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
			content: '内容 B'
		},
		{
			colorClass: 'uni-bg-blue',
			url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
			content: '内容 C'
		}
	]
	const dotStyle = {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		color: '#fff',
		selectedBackgroundColor: 'rgba(255, 255, 255, 1)',
		selectedBorder: '1px rgba(202, 202, 202, 0.9) solid',
		border: '1px rgba(83, 200, 249,0.3) solid',
	}
	const otherBoxList = [{
		name: '信息录入',
		imgUrl: '/static/alicon/edit-fill.svg'
	}, {
		name: '服务查询',
		imgUrl: '/static/alicon/security scan-fill.svg'
	}, {
		name: '我要定位',
		imgUrl: '/static/alicon/location-fill.svg'
	}]
	const change = (e) => {
		current.value = e.detail.current
	}
	const clickItem = (e) => {
		swiperDotIndex.value = e
	}
</script>

<template>
	<view class="container">
		<view class="homeTop">
			<text>智佳家装系统</text>
		</view>
		<uni-swiper-dot class="uni-swiper-dot-box" :dotsStyles="dotStyle" :info="info" @clickItem=clickItem
			:current="current" mode="round" field="content">
			<swiper class="swiper-box" autoplay=true circular=true @change="change" :current="swiperDotIndex">
				<swiper-item class="swiper-item" :style="{backgroundImage:`url(${item.url})`}" v-for="(item, index) in info"
					:key="index">
					<text style="color: #000000; font-size: 32px;">{{item.content}}</text>
				</swiper-item>
			</swiper>
			<view class="swiperOtherBox">
				<view class="OtherBoxItem" v-for="item in otherBoxList">
					<image :src="(item.imgUrl)" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</uni-swiper-dot>
		<view class="main">
			<view class="active">
				<view class="activeTitle">
					<view class="titleLeft">
						<image src="@/static/alicon/manage.svg"></image>
						<text>施工动态</text>
					</view>
					<view class="titleRight">
						<text>管理</text>
						<image src="@/static/alicon/right.svg"></image>
					</view>
				</view>
				<view class="activeContent">
					<uni-table stripe emptyText="暂无更多数据">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th width="70" align="center">姓名</uni-th>
							<uni-th width="200" align="center">施工地点</uni-th>
							<uni-th width="70" align="center">种类</uni-th>
							<uni-th width="60" align="center">开工日期</uni-th>
							<uni-th width="100" align="center">预计完成日期</uni-th>
							<uni-th width="40" align="center">进度</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="item in 5">
							<uni-td align="center">给对大萨</uni-td>
							<uni-td align="center">成都市新都区新都小区12栋1单元1201</uni-td>
							<uni-td align="center">水木施工</uni-td>
							<uni-td align="center">2023.3.3</uni-td>
							<uni-td align="center">2023.4.4</uni-td>
							<uni-td align="center">80%</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		overflow: auto;
		font-size: 14px;
		line-height: 24px;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: antiquewhite;

		.homeTop {
			background-color: #e8e8e8;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60px;

			text {
				font-size: 28px;
			}
		}

		.uni-swiper-dot-box {
			.swiper-box {
				height: 200px;
				position: relative;

				.swiper-item {
					background-size: cover;
					background-repeat: no-repeat;
				}
			}

			.swiperOtherBox {
				width: 280px;
				height: 100px;
				padding: 0 20px;
				border-radius: 5px;
				box-shadow: 5px 5px 5px #82828257;
				position: absolute;
				z-index: 999;
				left: 50%;
				bottom: 10px;
				transform: translate(-50%, 0);
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;

				.OtherBoxItem {
					width: 80px;
					height: 90px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					cursor: pointer;

					image {
						width: 50px;
						height: 50px;
					}

					text {
						font-size: 18px;
						font-weight: 600;
					}
				}
			}

			::v-deep .uni-swiper__dots-box {
				height: 8px;
				left: -70%;
				top: 35%;
				transform: translate(0, -50%);
			}
		}

	}

	.main {
		margin-top: 20px;

		.active {
			min-height: 200px;
			padding: 20px;
			border-top: 10px #eaeaea solid;
			background-color: #aaffff;

			.activeTitle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 20px;
				padding-bottom: 6px;
				border-bottom: 1px #00000014 solid;

				.titleLeft {
					display: flex;
					align-items: center;
					font-weight: 600;

					image {
						width: 40px;
						height: 40px;
						margin-right: 20px;
					}
				}

				.titleRight {
					display: flex;
					align-items: center;
					color: #46474cb0;

					image {
						width: 30px;
						height: 30px;
						margin-left: 20px;
					}
				}
			}

			.activeContent {
				::v-deep .uni-table-th {
					padding: 12px 6px
				}

				::v-deep .uni-table-td {
					padding: 8px 6px
				}
			}
		}
	}
</style>