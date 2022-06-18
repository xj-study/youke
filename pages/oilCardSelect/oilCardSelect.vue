<template>
	<view>
		<oil-card-list ref="uSwiper" @selectFun="selectCard"></oil-card-list>
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
		methods: {
			selectCard(e) {
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];
				prevPage.$vm.cardData = e
				this.$u.route({ //返回
					type: 'back',
					delta: 1
				})
			}
		},
		onReachBottom() {
			const currentRef = this.$refs.uSwiper;
			currentRef && currentRef.getMore && currentRef.getMore()
		},
		onPullDownRefresh() {
			const currentRef = this.$refs.uSwiper
			currentRef && currentRef.onRefresh && currentRef.onRefresh()
		},
	}
</script>

<style lang="scss">

</style>
