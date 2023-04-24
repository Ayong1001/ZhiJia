<template>
	<view class="container">
		<text v-for="item in 100">{{item}}</text>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
	.container {
		min-height: calc(100vh - 44px);
		overflow: auto;
		font-size: 14px;
		line-height: 24px;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: antiquewhite;


		.tabButtom {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			.content-wrap{
				// position: absolute;
				// top: 0;
				// left: 0;
			}
		}
	}
</style>