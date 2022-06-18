'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const base_url = "https://api.xingchukeji.com/api"
	const res = await uniCloud.httpclient.request(
		`${base_url}${event.url}`, {
			method: 'POST',
			data: event.data,
			contentType: 'json', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		})
	console.log('httpClient', res)
	if (res.status === 200) {
		return res.data
	} else {
		return res
	}
};
