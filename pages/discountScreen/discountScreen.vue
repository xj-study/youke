<template>
	<view class="u-relative">
		<u-image src="/static/image/bg.png" height="2576rpx" width="750rpx" />
		<view class="u-flex u-row-center u-absolute" style="bottom: 122rpx; left: 0; right: 0;">
			<u-image @click="handleBtn" src="/static/image/btn.png" height="80rpx" width="464rpx" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handleBtn() {
				this.$u.route({
					url: 'pages/oilCardReceive/oilCardReceive',
					params: {
						mode: 1
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
