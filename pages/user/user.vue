<script setup>
	import {
		ref,
		reactive
	} from 'vue'

	let RealNameState = ref(false)
	const walletUserList = reactive([{
		num: 68.49,
		des: '余额',
		badgeText: '',
	}, {
		num: 63.79,
		des: '收入',
		badgeText: '近30天',
	}, {
		num: 260,
		des: '宝币',
		badgeText: '',
	}, {
		num: 7,
		des: '卡券',
		badgeText: '新卡券',
	}, ])

	const orderUserList = [{
		text: '导出账单',
		imgUrl: '/static/alicon/wallet.svg'
	}, {
		text: '输入邀请码',
		imgUrl: '/static/alicon/property.svg'
	}, {
		text: '关于我们',
		imgUrl: '/static/alicon/file-text.svg'
	}, {
		text: '注销账号',
		imgUrl: '/static/alicon/file.svg'
	}]
	const toolUserList = [{
		text: '我的客户',
		imgUrl: '/static/alicon/custom.svg'
	}, {
		text: '我的团队',
		imgUrl: '/static/alicon/team.svg'
	}, {
		text: '我的增员',
		imgUrl: '/static/alicon/addUser.svg'
	}, {
		text: '待处理',
		imgUrl: '/static/alicon/file-text.svg'
	}, {
		text: '全部订单',
		imgUrl: '/static/alicon/file.svg'
	}]
</script>

<template>
	<view class="userContainer">
		<text class="title">我的</text>
		<view class="top">
			<image src="@/static/alicon/user1.svg" mode=""></image>
			<view class="userText">
				<text class="userDes">会员用户,到期时间2023.10.5</text>
				<text class="userName">高**\n</text>
			</view>
		</view>
		<image class="vip1" src="@/static/image/user/vip1.png" mode=""></image>
		<view class="apps">
			<view class="appsItem" v-for="item in toolUserList" :key="item">
				<image :src="item.imgUrl" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		<view class="tools">
			<uni-list class="toolsList">
				<uni-list-item class="listItem" v-for="item in orderUserList" showArrow :title="item.text" :key="item"/>
			</uni-list>
		</view>
		<button class="bottomBtn" type="primary">退出登录</button>
	</view>
</template>

<style lang="scss" scoped>
	.userContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;

		.title {
			font-size: 60rpx;
			margin: 20rpx 0;
		}

		.top {
			box-sizing: border-box;
			width: 100%;
			padding: 0 80rpx;
			display: flex;

			image {
				width: 140rpx;
				height: 140rpx;
			}

			.userText {
				margin-left: 40rpx;
				display: flex;
				flex-direction: column-reverse;

				.userName {
					font-size: 52rpx;
				}

				.userDes {
					font-size: 28rpx;
					color: #c7c9ce;
				}
			}
		}

		.vip1 {
			width: 600rpx;
			height: 160rpx;
			margin: 40rpx 0;
		}

		.apps {
			width: 620rpx;
			display: flex;
			justify-content: space-between;

			.appsItem {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 28rpx;
				}
			}
		}

		.tools {
			width: 100%;
			margin-top: 60rpx;
			border-top: 20rpx #e9e9eb solid;
			display: flex;
			flex-direction: column;
			align-items: center;

			.toolsList {
				width: 620rpx;

				.listItem {
					width: 100%;
					height: 100rpx;
				}
			}
		}
		.bottomBtn{
			width: 500rpx;
			margin: 20rpx 0;
			border-radius: 40rpx;
			background-color: #2cbde1cf;
		}
	}
</style>