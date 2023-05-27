<script>
	import {
		onMounted
	} from 'vue'
	import request from '@/utils/requset.js'
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			request({
				url: '/user/login',
				method: "POST",
				data: {
					u_username: 'admin',
					u_password: '123456'
				}
			}).then(res => {
				console.log('res', res.header)
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		height: 100%;
		background-color: #f5f5f5;
		overflow: auto;
	}

	/* #endif */
	.example-info {
		font-size: 28rpx;
		color: #333;
		padding: 20rpx;
	}
</style>