<template>
	<view class="address-screem">
		<address-list ref="uSwiper"></address-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
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
		}
	}
</script>

<style lang="scss">
	.address-screem {}
</style>
