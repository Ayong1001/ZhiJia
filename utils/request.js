import BASE_URL from '@/common/operate.js'

console.log('BASE_URL', BASE_URL.prod)
const request = obj => {
	obj.url = obj.url || '' // 请求路径
	obj.method = obj.method || 'GET' //请求方式
	obj.data = obj.data || {} //请求携带的数据
	obj.header = obj.header || 'application/json' //请求头信息 content-type
	obj.loading = obj.loading === false ? false : false //是否显示请求加载中
	obj.requestTime = obj.requestTime || 500 //多久时间内完成网络请求，则不显示提示框

	let loadingStatus = true

	//定义网络请求如果在一定时间内没有完成，则显示加载中提示框，默认时间为：500毫秒
	setTimeout(() => {
		if (loadingStatus && obj.loading) {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
		}
	}, obj.requestTime)
	//返回Promise对象
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL.url + obj.url,
			method: obj.method,
			data: obj.data.data,
			header: {
				'Content-Type': obj.header,
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {
				if (loadingStatus && obj.loading) {
					uni.hideLoading()
				}
				loadingStatus = false
			}
		})
	})
}
export default request