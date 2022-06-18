<template>
	<view class="account-screen u-flex-col">
		<view class="top">
			<view class="top-wrap">
				<view style="font-size: 24rpx;">可用积分</view>
				<view class="u-flex u-row-left u-col-center">
					<view style="font-size: 64rpx;">{{account.total || 0}}</view>
					<view class="btn u-text-center">兑换</view>
				</view>
			</view>
<!-- 			<u-image class="top-bg" width="100%" height="100%" src="/static/image/account-bg.png"
				border-radius="8rpx" /> -->
		</view>
		<view class="bottom u-flex-1">
			<view class="u-flex u-row-center">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="375" height="80" font-size="28" active-color="#FF6800" inactive-color="#333"
					:active-item-style="{'fontSize': '32rpx', 'fontWeight': 'bold'}" bar-width="32" bar-height="5"
					:bar-style="{'background': '#FF6800', 'borderRadius': '3rpx', 'bottom': '0'}" bg-color="#F8F8F8"
					style="width: 50%;">
				</u-tabs-swiper>
			</view>
			<swiper class="list-wrap" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="onreachBottom">
						<account-list :ref="'uSwiper'+index" :plusMinus='item.status'></account-list>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				account: {},
				tabs: [{
					name: "收入",
					status: 1
				}, {
					name: "支出",
					status: 2
				}],
				current: 0,
				swiperCurrent: 0
			};
		},
		onLoad() {
			this.getAccount()
		},
		methods: {
			getAccount() {
				this.$u.api.getAccount().then(res => {
					this.account = res
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				const currentRef = this.$refs['uSwiper' + this.swiperCurrent][0];
				currentRef && currentRef.getMore && currentRef.getMore()
			},
		},
		onPullDownRefresh() {
			this.getAccount()
			const currentRef = this.$refs['uSwiper' + this.swiperCurrent][0];
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.account-screen {
		padding: 24rpx 0 0;
		height: 100%;

		.top {
			height: 200rpx;
			border-radius: 12rpx;
			padding: 45rpx 66rpx 32rpx 44rpx;
			margin: 0 32rpx;
			color: #fff;
			font-weight: 500;
			position: relative;
			background: linear-gradient(44deg, #FFA200 0%, #FF6200 100%);

			.top-wrap {
				position: relative;
				z-index: 2;

				.btn {
					border: 2rpx solid #FFFFFF;
					width: 88rpx;
					height: 40rpx;
					border-radius: 24rpx;
					margin: 0 9rpx;
					font-weight: 400;
				}
			}

			.top-bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
			}

		}

		.bottom {
			padding-bottom: 82rpx;

			.list-wrap {
				height: 100%;
			}
		}
	}
</style>
