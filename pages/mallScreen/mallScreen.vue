<template>
	<view class="mall-screen">
		<u-swiper v-if="banner.length > 0" :list='banner' name='picUrl' :height="240" mode='none' interval='5000'
			:effect3d='true' effect3d-previous-margin='24' bg-color='unset' border-radius='16' style="margin: 20rpx 0;"
			@click="handleBanner" />
		<scroll-view scroll-x="true" style="white-space: nowrap; padding: 15rpx 0;">
			<view style="width: 4rpx; height: 4rpx;display: inline-block;"></view>
			<view class="" :style="{color: item.id == id ? '#FF6800' : '#A8A8A8', fontWeight: item.id == id ? '500' : '',
				'display': 'inline-block', 'padding': '0 20rpx'}" v-for="(item,index) in tabs" :key="index"
				@click="changeTab(item)">
				{{item.name}}
			</view>
			<view style="width: 4rpx; height: 4rpx;display: inline-block;"></view>
		</scroll-view>
		<view class="list-wrap">
			<goods-list ref='uSwiper' :categoryId="id"></goods-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				id: undefined,
				tabs: [],
				current: 0,
				swiperCurrent: 0,
			};
		},
		onLoad() {
			this.getBanner()
			this.$u.api.getGoodsCategory().then(res => {
				const arr = [{
					id: undefined,
					name: '全部'
				}]
				this.tabs = arr.concat(res.records || [])
				if (res.records.length > 0) {
					// this.id = res.records[0].id
					setTimeout(() => {
						const currentRef = this.$refs.uSwiper
						currentRef && currentRef.onRefresh && currentRef.onRefresh()
					})
				}
			})
		},
		onPullDownRefresh() {
			// const currentRef = this.$refs['uSwiper' + this.swiperCurrent][0];
			const currentRef = this.$refs.uSwiper
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
			this.getBanner()
		},
		onReachBottom() {
			const currentRef = this.$refs.uSwiper
			currentRef && currentRef.getMore && currentRef.getMore()
		},
		methods: {
			getBanner() {
				this.$u.api.getAdList({
					position: 'SHOPPING_BANNER'
				}).then(res => {
					this.banner = res.records || []
				}).catch(err => {
					console.log('err', err)
				})
			},
			changeTab(item) {
				if (this.id != item.id) {
					this.id = item.id
					setTimeout(() => {
						const currentRef = this.$refs.uSwiper
						currentRef && currentRef.onRefresh && currentRef.onRefresh()
					})
				}
			},
			handleBanner(index) {
				const item = this.bannerList[index]
				// console.log(item)
				if (item && item.link) {
					this.$u.route({
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.name
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.mall-screen {
		.tab {
			position: fixed;
			left: 0;
			top: 0;
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			width: 100%;
			z-index: 11;
			background-color: #F8F8F8;

			.tab-item {
				position: relative;
				padding: 20rpx 0;

				.downline {
					position: absolute;
					left: 50%;
					bottom: 8rpx;
					transform: translateX(-16rpx);
					width: 32rpx;
					height: 6rpx;
					border-radius: 2rpx;
					background-color: #16BB40;
				}
			}
		}

		.list-wrap {
			// padding-top: 70rpx;
			padding: 0 19rpx;
		}
	}
</style>
