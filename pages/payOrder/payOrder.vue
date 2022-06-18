<template>
	<view class="pay-order-screen">
		<view style="padding: 42rpx 32rpx;">
			<view class="">支付金额</view>
			<view class="u-text-center" style="color: #999;font-size: 28rpx; margin: 13rpx 0;">
				订单支付剩余时间
				<u-count-down style="color: #999; font-size: 28rpx;" :show-hours="false" :timestamp="timestamp"
					@end="countEnd">
				</u-count-down>
			</view>
			<view class="u-text-center" style="color: #333; font-size: 80rpx;">
				<text style="font-size: 32rpx;">￥</text>{{orderDetail.amount || 0}}
			</view>

			<u-cell-group class="cell-group" :border="false">
				<view style="font-size: 28rpx; margin-bottom: 10rpx;">选择支付方式</view>
				<u-cell-item v-if="alipayStatus" class="cell-item" title="支付宝支付" :arrow="false" hover-class="none"
					:border-bottom="false" :title-style="{'color': '#2E2A27', 'fontSize': '32rpx', 'margin': '0 22rpx'}"
					@click="payType=1">
					<view slot="icon">
						<u-image src="/static/image/ali-icon.png" width="48rpx" height="48rpx" />
					</view>
					<view slot="right-icon">
						<u-image :src="payType == 1 ? '/static/image/radio-icon.png' : '/static/image/radio-icon_1.png'"
							width="40rpx" height="40rpx" />
					</view>
				</u-cell-item>
				<u-cell-item v-if="wechatStatus" class="cell-item" title="微信支付" :arrow="false" hover-class="none"
					:border-bottom="false" :title-style="{'color': '#2E2A27', 'fontSize': '32rpx', 'margin': '0 22rpx'}"
					@click="payType=2">
					<view slot="icon">
						<u-image src="/static/image/wx-icon.png" width="48rpx" height="48rpx" />
					</view>
					<view slot="right-icon">
						<u-image :src="payType == 2 ? '/static/image/radio-icon.png' : '/static/image/radio-icon_1.png'"
							width="40rpx" height="40rpx" />
					</view>
				</u-cell-item>
				</u-radio-group>
			</u-cell-group>
			<view style="position: fixed; bottom: 40rpx; left: 110rpx; right: 110rpx;">
				<u-button :loading="isloading" @click="payment()" :ripple="true" size="mini" :custom-style="{
					'width': '100%', 'height': '88rpx' ,'color': '#fff',
				 'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 
				 'fontSize': '32rpx', 'borderRadius': '10rpx', 'margin': '0'}">
					立即支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 2,
				orderSn: '',
				type: 1,
				orderDetail: {},
				isloading: false,
				timestamp: 60 * 30,
				alipayStatus: 0,
				wechatStatus: 0,
			};
		},
		onLoad(options) {
			// console.log(options)
			this.orderSn = options.orderSn
			this.type = options.type
			this.getOrderDetail()
			this.getPayType()
		},
		methods: {
			getOrderDetail() {
				const Api = this.type == 1 ? this.$u.api.getOilOrderDetail : this.$u.api.getGoodsOrderDetail
				Api(this.orderSn).then(res => {
					this.orderDetail = res
				})
			},
			getPayType() {
				this.$u.api.getPayType().then(res => {
					this.alipayStatus = res.alipayStatus || 0;
					this.wechatStatus = res.wechatStatus || 0;
					this.payType = (res.wechatStatus ? 2 : 0) || (res.alipayStatus ? 1 : 0);
				}).catch(() => {
					this.alipayStatus = 1;
					this.wechatStatus = 1;
				})
			},
			payment() {
				const _this = this
				this.isloading = true
				// console.log(this.orderSn)
				const Api = this.payType == 1 ? this.$u.api.payAlipay : this.$u.api.payWxpay
				Api({
					orderSn: this.orderSn,
					type: this.type
				}).then(res => {
					this.isloading = false
					const provider = this.payType == 1 ? 'alipay' : 'wxpay'
					const orderInfo = this.payType == 1 ? res : JSON.parse(res)
					this.payType == 2 && delete orderInfo.result
					// console.log(orderInfo)
					uni.requestPayment({
						provider,
						orderInfo,
						success: function(res) {
							// console.log('success:' + JSON.stringify(res));
							_this.$u.route({
								url: 'pages/payBack/payBack',
								type: 'redirect',
								params: {
									orderSn: _this.orderSn,
									type: _this.type
								}
							})
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
							// _this.$u.toast(JSON.stringify(err), 2000);
							_this.$u.toast('支付失败', 2000);
						}
					})
				}).catch(() => {
					_this.$u.toast('下单失败', 2000);
					this.isloading = false
				})
			},
			countEnd() {
				this.$u.route({
					type: 'back',
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pay-order-screen {
		.cell-group {
			// padding: 10rpx 0 10rpx 25rpx;
			// padding-left: 25rpx;
			margin-top: 60rpx;

			.cell-item {
				padding: 30rpx 0;
			}
		}
	}
</style>
