<template>
	<view class="oil-card-screen">
		<u-navbar back-icon-size="40" back-icon-color="#333" title="油卡管理" title-color="#333" title-size='30'
			:title-bold="true">
			<view slot='right' @click="handleRight"
				style="margin: 0 24rpx; font-size: 24rpx; color: #333; font-weight: 500;">领取油卡</view>
		</u-navbar>
		<oil-card-list ref="uSwiper"></oil-card-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		onShow() {
			const currentRef = this.$refs.uSwiper;
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
		},
		onReachBottom() {
			const currentRef = this.$refs.uSwiper;
			currentRef && currentRef.getMore && currentRef.getMore()
		},
		onPullDownRefresh() {
			const currentRef = this.$refs.uSwiper;
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
		},
		methods: {
			handleRight: function() {
				this.$u.route({
					url: 'pages/oilCardReceive/oilCardReceive'
				})
			},
		}
	}
</script>

<style lang="scss">
	.oil-card-screen {
		background-color: #fff;
	}
</style>
