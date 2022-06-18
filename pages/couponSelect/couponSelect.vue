<template>
	<view>
		<coupon-list ref="uSwiper" :isSelect="true" :status='0' :type="type" :amount="amount" :projectId="projectId"
			@selectFun="couponSelect"></coupon-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				amount: undefined,
				projectId: undefined
			};
		},
		onLoad(options) {
			if (options.type) {
				this.type = options.type
			}
			if (options.amount) {
				this.amount = options.amount
			}
			if (options.amount) {
				this.projectId = options.projectId
			}
		},
		onReady() {

		},
		methods: {
			couponSelect(e) {
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];
				prevPage.$vm.couponData = e
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
