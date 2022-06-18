<template>
	<view style="height: 100%;">
		<web-view :webview-styles="webviewStyles" :src="src"></web-view>
	</view>
</template>

<script>
	import {
		KefuUrl,
	} from '@/common/config.js'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				src: '',
				webviewStyles: {
					progress: {
						color: '#FF6200'
					}
				}
			};
		},
		computed: {
			...mapState(['vuex_token'])
		},
		onShow() {
			this.getKefu()
		},
		onPullDownRefresh() {
			this.getKefu()
		},
		methods: {
			getKefu() {
				if (!this.vuex_token) {
					this.$u.toast("未登录，请先登录", 1500);
					setTimeout(() => {
						this.$u.route({
							type: 'redirectTo',
							url: 'pages/loginScreen/loginScreen',
						})
					}, 1500)
				} else {
					uni.stopPullDownRefresh()
					if (this.vuex_user) {
						const {
							mobile,
							nickName,
							token
						} = this.vuex_user
						this.src = `${KefuUrl}?mobile=${mobile}&nickName=${nickName}&token=${token}`
						// #ifdef H5
						// window.location.href = this.src
						// #endif
					} else {
						this.src = KefuUrl
						// #ifdef H5
						// window.location.href = this.src 
						// #endif
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
</style>
