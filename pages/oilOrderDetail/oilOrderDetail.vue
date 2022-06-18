<template>
	<view class="oil-order-detail">
		<view class="title u-flex u-col-center">
			<view v-if="orderDetail.projectMode == 1" class="">{{orderDetail.projectMonth}}个月套餐</view>
			<view v-if="orderDetail.projectMode == 2" class="">直充</view>
			<view class="status" :style="{background: orderDetail.status == 1 ? '#FF6800' : '#aaa'}">
				{{orderDetail.status == 1 ? '进行中' : orderDetail.status == 2 ? '已完成' : '待处理'}}
			</view>
		</view>
		<view class="cell-list" style="background-color: #fff; border-radius: 12rpx; margin: 30rpx 24rpx;">
			<u-cell-group :border="false">
				<u-cell-item class="cell-item" :arrow="false" title="油卡类型" hover-class="none"
					:value="orderDetail.cardType == 1 ? '中石油油卡' : '中石化油卡'" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item class="cell-item" :arrow="false" title="油卡卡号" hover-class="none"
					:value="orderDetail.cardAccount" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item class="cell-item" :arrow="false" title="月充值额" hover-class="none"
					:value="orderDetail.monthAmount" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item class="cell-item" :arrow="false" title="订单内容" hover-class="none"
					:value="orderDetail.projectName" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item class="cell-item" :arrow="false" title="支付金额" hover-class="none"
					:value="'￥' + orderDetail.amount" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#FF6800', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item v-if="orderDetail.projectMode == 1" class="cell-item" :arrow="false" title="充值计划" hover-class="none"
					:value="orderDetail.period + '/' + orderDetail.projectMonth" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<u-cell-item class="cell-item" :arrow="false" title="订单编号" hover-class="none"
					:value="orderDetail.orderSn" :border-bottom="false"
					:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
					:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				<block v-if="orderDetail.payStatus == 2">
					<u-cell-item class="cell-item" :arrow="false" title="支付方式" hover-class="none"
						:value="orderDetail.payType == 1 ? '支付宝' : orderDetail.payType == 2 ? '微信' : '未知'"
						:border-bottom="false" :value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
						:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
					<u-cell-item class="cell-item" :arrow="false" title="支付时间" hover-class="none"
						:value="orderDetail.payTime" :border-bottom="false"
						:value-style="{'fontSize': '28rpx', 'color': '#333', 'fontSize': '500'}"
						:title-style="{'fontSize': '28rpx', 'color': '#999'}" />
				</block>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				orderDetail: {},
			};
		},
		onLoad(options) {
			// console.log(options)
			this.orderSn = options.orderSn
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				this.$u.api.getOilOrderDetail(this.orderSn).then(res => {
					this.orderDetail = res
				})
			},
		}
	}
</script>

<style lang="scss">
	.oil-order-detail {
		.title {
			padding: 20rpx 30rpx 0;
			font-weight: 500;
			font-size: 36rpx;

			.status {
				font-weight: 400;
				font-size: 22rpx;
				color: #fff;
				background-color: #FF6800;
				margin: 0 10rpx;
				border-radius: 30rpx;
				padding: 2rpx 10rpx;
			}
		}

		.cell-list {
			padding: 14rpx 30rpx;

			.cell-item {
				padding: 0;
				line-height: 60rpx;
			}
		}
	}
</style>
