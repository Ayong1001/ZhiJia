<script setup>
	import {
		ref,
		reactive
	} from 'vue'

	let RealNameState = ref(false)
	const walletUserList = reactive([{
		num: 68.49,
		des: '余额'
	}, {
		num: 63.79,
		des: '收入'
	}, {
		num: 260,
		des: '宝币'
	}, {
		num: 7,
		des: '卡券'
	}, ])

	const orderUserList = [{
		text: '待付款',
		imgUrl: '/static/alicon/wallet.svg'
	}, {
		text: '已付款',
		imgUrl: '/static/alicon/property.svg'
	}, {
		text: '待处理',
		imgUrl: '/static/alicon/file-text.svg'
	}, {
		text: '全部订单',
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
		text: '待付款',
		imgUrl: '/static/alicon/wallet.svg'
	}, {
		text: '已付款',
		imgUrl: '/static/alicon/property.svg'
	}, {
		text: '待处理',
		imgUrl: '/static/alicon/file-text.svg'
	}, {
		text: '全部订单',
		imgUrl: '/static/alicon/file.svg'
	}]
</script>

<template>
	<view class="container">
		<view class="userTop">
			<view>
				<image class="imageType1" src="@/static/alicon/eye.svg" mode=""></image>
				<image class="imageType1" src="@/static/alicon/shop.svg" mode=""></image>
				<image class="imageType1" src="@/static/alicon/setting.svg" mode=""></image>
			</view>
		</view>
		<view class="headerUser">
			<view class="headerUserBox">
				<image class="imageType2" src="@/static/alicon/user1.svg" mode=""></image>
				<image v-if="!RealNameState" class="imageType3" src="@/static/alicon/RealName.svg" mode=""></image>
				<image v-else class="imageType3" src="@/static/alicon/RealNameBinding.svg" mode=""></image>
			</view>
			<text class="headerUserName">高**</text>
		</view>
		<view class="walletUser">
			<view class="walletUserItem" v-for="item in walletUserList">
				<text class="walletUserItemText1">{{item.num}}</text>
				<text class="walletUserItemText2">{{item.des}}</text>
			</view>
		</view>
		<view class="orderUser">
			<view class="orderUserBox">
				<text class="orderUserTitle">我的订单</text>
				<view class="orderUserItemBox">
					<view class="orderUserItem " v-for="item in orderUserList">
						<image :src="(item.imgUrl)" class="imageType4" mode=""></image>
						<text class="orderUserItemText">{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="orderUser toolUser">
			<view class="orderUserBox">
				<text class="orderUserTitle">工具箱</text>
				<view class="orderUserItemBox">
					<view class="orderUserItem" v-for="item in toolUserList">
						<image :src="(item.imgUrl)" class="imageType4" mode=""></image>
						<text class="orderUserItemText">{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url('@/static/image/goods1.png');
		background-size: cover;
		background-repeat: no-repeat;

		.userTop {
			height: 60px;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;

			.imageType1 {
				width: 35px;
				height: 35px;
				object-fit: cover;
				margin-right: 15px;
			}
		}

		.headerUser {
			display: flex;
			padding: 10px 20px;

			.headerUserBox {
				width: 80px;
				height: 80px;
				position: relative;

				.imageType2 {
					width: 100%;
					height: 100%;
				}

				.imageType3 {
					position: absolute;
					width: 30px;
					height: 30px;
					left: 50%;
					bottom: 5px;
					transform: translate(-50%, 0);
				}
			}

			.headerUserName {
				font-size: 22px;
				margin: 10px 0 0 10px;
			}
		}

		.walletUser {
			padding: 0 30px;
			margin-bottom: 10px;
			display: flex;
			justify-content: space-between;

			.walletUserItem {
				display: flex;
				flex-direction: column;
				align-items: center;

				.walletUserItemText1 {
					font-size: 24px;
					font-weight: 600;
					margin-bottom: 4px;
				}

				.walletUserItemText2 {
					font-size: 16px;
					font-weight: 600;
				}
			}
		}

		.orderUser {
			.orderUserBox {
				margin: 10px auto;
				padding: 10px 20px;
				width: 300px;
				height: 120px;
				border-radius: 10px;
				background-color: #fff;

				.orderUserTitle {
					display: inline-block;
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 15px;
				}

				.orderUserItemBox {
					display: grid;
					grid-template-areas: "a a a a";
					justify-content: space-between;
					grid-gap: 10px 0;

					.orderUserItem {
						display: flex;
						flex-direction: column;
						align-items: center;

						.imageType4 {
							width: 40px;
							height: 40px;
							margin-bottom: 5px;
						}

						.orderUserItemText {
							font-size: 16px;
							font-weight: 600;
						}
					}
				}
			}
		}

		.toolUser {
			.orderUserBox {
				height: 190px;
			}
		}
	}
</style>