<template>
	<view class="oil-order-screen">
		<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
			swiperWidth="750" height="80" font-size="28" active-color="#FF6800" inactive-color="#333"
			:active-item-style="{'fontSize': '32rpx', 'fontWeight': 'bold'}" bar-width="32" bar-height="5"
			:bar-style="{'background': '#FF6800', 'borderRadius': '3rpx', 'bottom': '0'}"
			style="background-color: #fff;">
		</u-tabs-swiper>
		<swiper class="list-wrap" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 100%;" @scrolltolower="onreachBottom">
					<order-list :ref="'uSwiper'+index" :status="item.status"></order-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: "全部订单",
					status: undefined
				}, {
					name: "进行中",
					status: 1
				}, {
					name: "已完成",
					status: 2
				}],
				current: 0,
				swiperCurrent: 0
			};
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
			// scroll-view到底部加载更多
			onreachBottom() {
				const currentRef = this.$refs['uSwiper' + this.swiperCurrent][0];
				currentRef && currentRef.getMore && currentRef.getMore()
			},
		},
		onPullDownRefresh() {
			const currentRef = this.$refs['uSwiper' + this.swiperCurrent][0];
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.oil-order-screen {
		height: 100%;
		padding-bottom: 80rpx;

		.list-wrap {
			// padding: 0 13rpx;
			height: 100%;
		}
	}
</style>
