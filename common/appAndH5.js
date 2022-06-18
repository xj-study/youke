
export const UniShare = (params = {}) => {
	return new Promise((resolve, reject) => {
		uni.share({
			...params,
			success: function(res) {
				resolve(true)
				// console.log("分享成功:" + JSON.stringify(res));
			},
			fail: function(err) {
				reject(err)
				// console.log("分享失败:" + JSON.stringify(err));
			}
		});
	})
}
