<template>
	<view class="oil-recharge-screen">
		<view class="oil-recharge-wrap">
			<view :style="{paddingTop: (vue_systemInfo.statusBarHeight || 0) + 'px'}" class="shadow-box">
				<view class="tab-wrap u-flex u-row-center u-col-center">
					<u-tabs-swiper 
					ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
						bg-color='rgba(0,0,0,0)'
						swiperWidth="375" height="88" font-size="30" active-color="#333" inactive-color="#707070"
						bar-width="32" bar-height="6" :bar-style="{'background': '#5874FE', 'bottom': '8rpx'}"
						style="width: 50%" />
					<u-icon @click="goBack()" class="left" name="arrow-left" size="40" color="#333"></u-icon>
					<!-- <view v-if="current==0" class="right" @click="receiveCard()">领取油卡</view> -->
				</view>
			</view>
			<swiper class="swiper-wrap" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item>
					<oil-recharge-m ref="uSwiper0" :projectData='projectData' @changeProject="changeProject"
						@resetCoupon="resetCoupon"  @add-click='receiveCard()'/>
				</swiper-item>
				<swiper-item>
					<oil-recharge-d ref="uSwiper1" :projectData='projectData1' @changeProject="changeProject1"
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
					name: '加油套餐'
				}, {
					name: '油卡直充'
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
				cardData,
				couponData
			} = this
			// console.log(cardData, couponData)
			setTimeout(() => {
				let currentRef
				if (this.current == 0) {
					currentRef = this.$refs.uSwiper0
				} else if (this.current == 1) {
					currentRef = this.$refs.uSwiper1
				}
				if (cardData) {
					currentRef && currentRef.setCardData && currentRef.setCardData(cardData)
					this.cardData = {}
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
		onBackPress(options) {
			console.log(options)
			if (options.from == "navigateBack") {
				return false;
			}
			this.goBack()
			return true;
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
				this.projectData1 = e;
			},
			goBack() {
				// setTimeout(() => {
				const list = [
					"pages/homeScreen/homeScreen",
					"pages/oilPackage/oilPackage",
					"pages/userScreen/userScreen",
					"pages/contact/contact"
				];
				const pages = getCurrentPages();
				if (pages.length > 1) {
					this.$u.route({
						type: 'back',
						delta: 1
					})
					// const prevPage = pages[pages.length - 2];
					// console.log(1111, prevPage.route);
					// const index = list.findIndex(item => prevPage.route == item);
					// if (index == -1) {
					// 	this.$u.route({
					// 		type: 'back',
					// 		delta: 1
					// 	})
					// } else {
					// 	this.$u.route({
					// 		type: 'tab',
					// 		url: prevPage.route,
					// 	});
					// }
				} else {
					this.$u.route({
						type: 'tab',
						url: 'pages/homeScreen/homeScreen'
					})
				}
				// },100)
			},
			navigateTo(url, params = {}, type = "navigateTo", ) {
				this.$u.route({
					url,
					params,
					type
				})
			},
			resetCoupon() {
				this.couponData = {}
			},
			receiveCard() {
				let amount, projectData, couponData, currentRef
				if (this.current == 0) {
					projectData = this.projectData
					currentRef = this.$refs.uSwiper0
					amount = currentRef && currentRef.amount
				} else if (this.current == 1) {
					projectData = this.projectData1
					amount = this.projectData1.defaultAmount
					currentRef = this.$refs.uSwiper1
				}
				couponData = currentRef && currentRef.couponData
				this.navigateTo('pages/oilCardReceive/oilCardReceive', {
					projectData: JSON.stringify(projectData),
					couponData: JSON.stringify(couponData),
					amount
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.oil-recharge-screen {
		height: 100%;
		padding-bottom: 88rpx;

		.oil-recharge-wrap {
			background-color: #fff;
			height: 100%;

			.tab-wrap {
				position: relative;

				.left {
					color: #16BB40;
					font-weight: 500;
					font-size: 24rpx;
					position: absolute;
					left: 16rpx;
				}

				.right {
					color: #FE4848;
					font-weight: 500;
					font-size: 28rpx;
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
	.shadow-box{
		width:100%;
		background: linear-gradient(180deg, #E0E5FF 0%, #FFFFFF 100%);
		opacity: 0.87;
	}
	
</style>