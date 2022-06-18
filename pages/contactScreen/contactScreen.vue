<template>
	<view class="contact-screen">
		<u-cell-group style="padding-left: 25rpx; background-color: #fff; border-radius: 12rpx;" :border="false">
			<u-cell-item title="客服热线" style="padding: 24rpx 0; padding-right: 29rpx;" :value="info.hotline" :arrow="false"
				hover-class="none" :title-style="{'fontSize': '24rpx', 'color': '#333'}" />
			<u-cell-item title="客服微信" style="padding: 24rpx 0; padding-right: 29rpx" :value="info.wechat" :arrow="false"
				hover-class="none" :title-style="{'fontSize': '24rpx', 'color': '#333'}" />
			<u-cell-item title="联系邮箱" style="padding: 24rpx 0; padding-right: 29rpx" :value="info.email"
				:arrow="false" hover-class="none" :title-style="{'fontSize': '24rpx' , 'color' : '#333'}" />
			<u-cell-item title="联系时间" style="padding: 24rpx 0; padding-right: 29rpx;" :value="info.contactTime"
				:arrow="false" hover-class="none" :title-style="{'fontSize': '24rpx', 'color': '#333'}"
				:border-bottom="false" />
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(options) {
			this.getInfo();
		},
		methods: {
			getInfo() {
				this.$u.api.getContact().then(res => {
					this.info = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact-screen {
		padding: 24rpx;
	}
</style>
