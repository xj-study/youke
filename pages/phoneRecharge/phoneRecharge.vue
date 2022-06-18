<template>
	<view class="phone-recharge-screen ">
		<view class="phone-recharge-wrap" :style="{paddingTop: (vue_systemInfo.statusBarHeight || 0) + 'px'}">
			<view class="tab-wrap u-flex u-row-center u-col-center">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="375" height="88" font-size="30" active-color="#333" inactive-color="#707070"
					bar-width="32" bar-height="6" :bar-style="{'background': '#FF6800', 'bottom': '8rpx'}"
					style="width: 50%" />
				<u-icon @click="goBack()" class="left" name="arrow-left" size="34" color="#333"></u-icon>
			</view>
			<swiper class="swiper-wrap" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item>
					<phone-recharge-m ref="uSwiper0" :projectData='projectData' @changeProject="changeProject"
						@resetCoupon="resetCoupon" />
				</swiper-item>
				<swiper-item>
					<phone-recharge-d ref="uSwiper1" :projectData='projectData1' @changeProject="changeProject1"
						@resetCoupon="resetCoupon" />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: '话费套餐'
				}, {
					name: '话费直充'
				}],
				current: 0,
				swiperCurrent: 0,
				projectData: {},
				projectData1: {}
			};
		},
		onLoad(options) {
			// console.log(options)
			this.current = options.mode == 1 ? 0 : 1
			this.swiperCurrent = options.mode == 1 ? 0 : 1
			if (options.mode == 1) {
				this.projectData = options
			} else {
				this.projectData1 = options
			}
		},
		onShow() {
			const {
				couponData
			} = this
			// console.log(couponData)
			setTimeout(() => {
				let currentRef
				if (this.current == 0) {
					currentRef = this.$refs.uSwiper0
				} else if (this.current == 1) {
					currentRef = this.$refs.uSwiper1
				}
				if (couponData) {
					currentRef && currentRef.setCouponData && currentRef.setCouponData(couponData)
					this.couponData = {}
				}
			}, 200)
		},
		onReady() {
			if (this.projectData.id) {
				const currentRef = this.$refs.uSwiper0
				if (currentRef && currentRef.initAmount) {
					currentRef.initAmount(this.projectData.defaultAmount)
				}
			}
		},
		methods: {
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
			changeProject: function(e) {
				this.projectData = e
			},
			changeProject1: function(e) {
				this.projectData1 = e
			},
			resetCoupon() {
				this.couponData = {}
			},
			goBack: function() {
				const pages = getCurrentPages();
				if (pages.length > 1) {
					const prevPage = pages[pages.length - 2];
					this.$u.route({
						type: 'tab',
						url: prevPage.route,
					});
				} else {
					this.$u.route({
						type: 'tab',
						url: 'pages/homeScreen/homeScreen'
					})
				}
			},
			navigateTo(url, params = {}, type = "navigateTo", ) {
				this.$u.route({
					url,
					params,
					type
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.phone-recharge-screen {
		height: 100%;
		padding-bottom: 88rpx;

		.phone-recharge-wrap {
			background-color: #fff;
			height: 100%;

			.tab-wrap {
				background-color: #fff;
				position: relative;

				.left {
					color: #16BB40;
					font-weight: 500;
					font-size: 24rpx;
					position: absolute;
					left: 16rpx;
				}

				.right {
					color: #16BB40;
					font-weight: 500;
					font-size: 24rpx;
					position: absolute;
					right: 24rpx;
				}
			}

			.swiper-wrap {
				height: 100%;
				background-color: #f8f8f8;
			}
		}
	}
</style>
