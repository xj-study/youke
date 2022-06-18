<template>
	<view class="pay-back u-flex-col u-col-center" v-if="orderDetail.orderSn">
		<u-icon v-if="orderDetail.payStatus == 2" name="checkmark-circle-fill" color="#16BB40" size="127rpx"></u-icon>
		<u-icon v-else name="close-circle-fill" color="#fa3534" size="127rpx"></u-icon>
		<view style="font-size: 30rpx; font-weight: 500; color: #333; margin: 57rpx 0;">
			{{orderDetail.payStatus == 2 ? '支付成功' : '支付失败'}}
		</view>
		<block v-if="orderDetail.payStatus == 2">
			<view class="u-text-center" style="font-size: 30rpx; font-weight: 500; color: #333;">
				<view class="">您已支付完成</view>
				<view class="">谢谢您对加油省车主的支持</view>
			</view>
			<view class="btn u-text-center" @click="handle">知道了</view>
		</block>
		<view v-else class="btn-err u-text-center" @click="handle">返回</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				type: '',
				orderDetail: {},
			};
		},
		onLoad(options) {
			// console.log(options)
			this.orderSn = options.orderSn
			this.type = options.type
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				const Api = this.type == 1 ? this.$u.api.getOilOrderDetail : this.$u.api.getGoodsOrderDetail
				Api(this.orderSn).then(res => {
					this.orderDetail = res
					if (res.payStatus != 2) {
						uni.setNavigationBarTitle({
							title: '支付失败'
						})
					}
				})
			},
			handle() {
				this.$u.route({
					type: 'back',
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.pay-back {
		padding: 120rpx 0;

		.btn {
			margin-top: 126rpx;
			width: 380rpx;
			height: 88rpx;
			background: #FFFFFF;
			border: 1rpx solid #16BB40;
			border-radius: 44rpx;
			color: #16BB40;
			line-height: 88rpx;
			font-size: 30rpx;
			font-weight: 500;
		}
		.btn-err {
			margin-top: 70rpx;
			width: 380rpx;
			height: 88rpx;
			background: #FFFFFF;
			border: 1rpx solid #909399;
			border-radius: 44rpx;
			color: #909399;
			line-height: 88rpx;
			font-size: 30rpx;
			font-weight: 500;
		}
	}
</style>
