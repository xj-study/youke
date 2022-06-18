<template>
	<!-- #ifndef H5 -->
	<web-view :src="src" @message="handleMessage" @onPostMessage="onPostMessage" :webview-styles="webviewStyles">
	</web-view>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<web-view :src="src" :webview-styles="webviewStyles"></web-view>
	<!-- #endif -->
</template>

<script>
	import {
		Channel
	} from "@/common/config"
	import {
		UniShare
	} from "@/common/appAndH5"
	export default {
		data() {
			return {
				isSplash: false,
				src: '',
				webviewStyles: {
					progress: {
						color: '#FF6200'
					}
				}
			};
		},
		onBackPress(options) {
			console.log(options, this.isSplash)
			if (this.isSplash) {
				this.$u.route({
					type: "reLaunch",
					url: 'pages/homeScreen/homeScreen',
				})
				return true
			} else {
				return false;
			}
		},
		onLoad(options) {
			if (options.src) {
				const sign = options.src.indexOf('?') == -1 ? '?' : '&'
				let src = options.src + `${sign}channel=${Channel}`
				if (this.vuex_token) {
					src = `${src}&token=${this.vuex_token}`
				}
				this.src = src
			}
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
			this.isSplash = options.splash ? true : false
		},
		methods: {
			handleMessage(e) {
				const data = e.detail.data[0]
				const params = data.params || {}
				// console.log('message', data)
				switch (data.action) {
					case 'uniShare':
						uni.showLoading({
							title: '加载中...',
							// #ifndef MP-TOUTIAO || MP-ALIPAY
							mask: true
							// #endif
						})
						UniShare(params).catch(err => {
								// console.log('err111',JSON.stringify(err))
								this.$u.toast('分享失败！')
							}).then(() => uni.hideLoading())
							.catch(() => uni.hideLoading())
						setTimeout(() => {
							uni.hideLoading()
						}, 5000)
						break;
					default:
						// this.$u.toast(data.errMsg)
						// console.log('msg', JSON.stringify(err))
						break;
				}
			},
			onPostMessage(e) {
				console.log('onPostMessage', e)
			}
		}
	}
</script>

<style lang="scss">

</style>
