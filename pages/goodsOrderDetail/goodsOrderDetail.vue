<template>
	<view class="goods-order-detail">
		<view class="address">
			<view class="" style="color: #333; font-size: 26rpx;">{{info.addressName}} {{info.addressMobile}}</view>
			<view class="" style="color: #aaa; font-size: 22rpx;">
				{{info.addressProvince}}{{info.addressCity}}{{info.addressArea}}{{info.addressDetailed}}
			</view>
		</view>
		<view style="background-color: #fff; margin: 20rpx 0; padding: 23rpx 24rpx 16rpx 32rpx; border-radius: 12rpx;">
			<view class="u-flex u-col-center u-row-between" style="font-size: 24rpx;">
				<view style="font-size: 26rpx;">实物商品</view>
				<view style="color: #ccc; font-size: 22rpx;">
					{{info.payStatus == 1 ? '待支付' : info.payStatus == 2 ? '已支付' : '待处理'}}
				</view>
			</view>
			<view class="u-flex" style="margin-top: 20rpx;">
				<u-image :src="info.goodsPicUrl" height="154rpx" width="154rpx" />
				<view class="u-flex-1 u-line-1" style="margin-left: 27rpx;">
					<view class="u-line-1" style="font-size: 24rpx; color: #333; margin: 10rpx 0;">
						{{info.goodsName}}
					</view>
					<view class="u-line-1" style="font-size: 24rpx; color: #aaa; margin-top: 20rpx">
						￥{{info.goodsPrice}}
					</view>
					<view class="u-line-1" style="font-size: 24rpx; color: #aaa; margin: 6rpx 0;">
						{{info.createTime}}
					</view>
				</view>
			</view>
			<view class="u-flex u-col-center u-row-right" style="margin: 18rpx 0;font-size: 24rpx;">
				<view>实付款：<text style="color: #F26937;">￥{{info.amount}}</text></view>
			</view>
		</view>
		<view style="font-size: 24rpx; color: #333; background-color: #fff; border-radius: 12rpx; 
		padding: 22rpx 17rpx 10rpx 32rpx;">
			<view style="font-size: 26rpx; font-weight: 500; margin-bottom: 38rpx;">订单信息</view>
			<view class="u-flex u-row-between u-col-center" style="margin: 20rpx 0;">
				<view class="">订单编号</view>
				<view style="color: #aaa;">{{info.orderSn}}</view>
			</view>
			<view class="u-flex u-row-between u-col-center" style="margin: 20rpx 0;">
				<view class="">下单时间</view>
				<view style="color: #aaa;">{{info.createTime}}</view>
			</view>
			<view v-if="info.payStatus == 2" class="u-flex u-row-between u-col-center" style="margin: 20rpx 0;">
				<view class="">付款方式</view>
				<view style="color: #aaa;">{{info.payType ==1 ? '支付宝' : info.payType ==2 ? '微信' : '其他'}}</view>
			</view>
			<view class="u-flex u-row-between u-col-center" style="margin: 20rpx 0;">
				<view class="">订单状态</view>
				<view style="color: #aaa;">{{info.payStatus == 2 ? '已完成' : '待支付'}}</view>
			</view>
			<view class="u-flex u-col-center u-row-right" style="margin: 36rpx 0 24rpx;">
				<u-button v-if="info.payStatus == 1" @click="goToPay(info)" :ripple="true" size="mini" :custom-style="{'width': '140rpx', 'height': '54rpx' ,'color': '#fff',
					 'background': '#16BB40', 'fontSize': '24rpx', 'borderRadius': '8rpx', 'margin': '0'}">
					继续支付</u-button>
				<u-button v-if="info.payStatus == 2" :disabled="true" :ripple="true" size="mini" :custom-style="{'width': '140rpx', 'height': '54rpx' ,'color': '#fff',
						 'background': '#EEE', 'fontSize': '24rpx', 'borderRadius': '8rpx', 'margin': '0'}">
					支付完成</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				info: {}
			};
		},
		onLoad(options) {
			if (options.orderSn) {
				this.orderSn = options.orderSn
				this.getInfo()
			}
		},
		methods: {
			getInfo() {
				this.$u.api.getGoodsOrderDetail(this.orderSn).then(res => {
					this.info = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-order-detail {
		padding: 24rpx;

		.address {
			background-color: #fff;
			padding: 28rpx 32rpx;
			border-radius: 12rpx;
		}
	}
</style>
