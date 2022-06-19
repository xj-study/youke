'use strict';
exports.main = async (event, context) => {
	const data = await uniCloud.getPhoneNumber({
		appid: '__UNI__FB3E0A1', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
		provider: 'univerify',
		apiKey: 'fe877baff53670842a7bff7000dc5930', // 在开发者中心开通服务并获取apiKey
		apiSecret: '5f42d70bdcae869d06f576aec3eb2014', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})
	data.access_token = event.access_token
	data.openid = event.openid
	data.channel = event.channel
	data.devId = event.devId
	const res = await uniCloud.callFunction({
		name: "httpClient",
		data: {
			url: '/auth/loginQuick',
			data
		}
	})
	if (res.success) {
		// console.log('success', res.result.data)
		return res.result.data
	} else {
		
		// console.log('err', res)
		return res
	}
};
