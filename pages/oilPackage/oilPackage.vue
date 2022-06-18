<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onShow() {
			this.$u.route({
				type: 'redirectTo',
				url: 'pages/oilRecharge/oilRecharge',
				params: {
					mode: 1
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
