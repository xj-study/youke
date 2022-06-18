<template>
	<view class="ad-screen u-rela">
		<u-swiper :list="list" name='picUrl' height="100%" width="100%" mode='none' interval='5000' bg-color='#F8F8F8'
			border-radius='8' @click="handlePopup" />
		<view class="count-down u-absolute u-flex u-row-center"
			:style="{top: `${(vue_systemInfo.statusBarHeight || 0) + 12}px`}" @click="toHome">
			<u-count-down ref="countDown" :timestamp="countdowm" :show-days="false" :show-hours="false"
				:show-minutes="false" bg-color="transparent" color="#fff" font-size="26" @end="toHome"
				@change="change" />
			<text>秒跳过</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				countdowm: 0,
				time: 3,
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			if (plus.os.name == 'iOS') {
				let agree = plus.runtime.isAgreePrivacy();
				if (!agree) {
					this.$u.route({
						type: 'redirectTo',
						url: 'pages/licenceScreen/licenceScreen'
					})
				} else {
					this.getInfo();
				}
			} else {
				this.getInfo();
			}
			// #endif
			// #ifndef APP-PLUS
			this.getInfo();
			// #endif
		},
		onShow() {
			// console.log(this.time);
			this.countdowm = this.time;
			this.$refs.countDown && this.$refs.countDown.start();
		},
		onHide() {
			this.$refs.countDown.clearTimer();
		},
		onUnload() {
			this.$refs.countDown.clearTimer();
		},
		methods: {
			getInfo() {
				this.$u.api.getAdList({
					position: "START_AD"
				}).then(res => {
					if (res.total > 0) {
						this.countdowm = this.time;
						this.list = res.records;
					} else {
						this.toHome();
					}
				}).catch(err => {
					this.toHome();
				})
			},
			change(e) {
				this.time = e;
			},
			toHome() {
				this.$u.route({
					type: "reLaunch",
					url: 'pages/homeScreen/homeScreen',
				})
			},
			handlePopup(index) {
				// this.$u.route({
				// 	// type: 'redirectTo',
				// 	url: 'pages/webView/webView',
				// 	params: {
				// 		src: "https://h5.xingchukeji.com/act/activity.html#/actMarchNewer?aaa=11",
				// 		splash: true
				// 	}
				// })
				const item = this.list[index]
				if (item && item.link) {
					this.$u.route({
						// type: 'redirectTo',
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.name,
							splash: true
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.ad-screen {
		.count-down {
			right: 24rpx;
			font-size: 20rpx;
			color: #fff;
			background-color: rgba($color: #000000, $alpha: 0.3);
			padding: 10rpx 14rpx;
			border-radius: 30rpx;
		}
	}
</style>
