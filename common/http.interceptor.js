// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import { Version, Channel }  from "@/common/config.js"
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.xingchukeji.com/api',
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true,
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.Token = 'xxxxxx';

		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.Token = vm.vuex_token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		config.header.Token = vm.$store.state.vuex_token;
		config.header.Version = Version;
		config.header.Channel = Channel;
		// console.log(config)
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.Token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.Token = token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGNoZWFwIHRva2VuIiwiYXVkIjoiR0FOSklBWElOIiwiaXNzIjoiY2hlYXAiLCJleHAiOjE2MzU1OTMxNTAsInVzZXJJZCI6MSwiaWF0IjoxNjA0MDU3MTUwfQ.jZbP8p3A7frqemHcjJl2qlfdU2fmbgEsvDCPCMgTEYA';
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		// console.log(res)
		if (res.code === 200) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res.data
		} else if (res.code === 5107) {
			vm.$u.toast(res.message, 2000);
			setTimeout(() => {
				vm.$u.route({
					type: 'reLaunch',
					url: '/pages/loginScreen/loginScreen'
				})
			}, 2000)
			return false;
		} else {
			vm.$u.toast(res.message, 2000);
			return false;
		}
	}
}

export default {
	install
}
