<template>
	<view class="mall-order-list">
		<view style="color: #333; padding: 20rpx 0;">
			<view v-for="(item,index) in list" :key="index" @click="toDetail(item)"
				style="background-color: #fff; margin: 0 32rpx 20rpx; padding: 35rpx; border-radius: 14rpx;">
				<view class="u-flex">
					<u-image :src="item.goodsPicUrl" height="160rpx" width="160rpx" />
					<view class="u-flex-1 u-line-1 u-flex u-flex-wrap"
						style="margin-left: 37rpx; align-content: space-between; height: 160rpx;">
						<view class="u-flex u-col-top" style="width: 100%;">
							<view class="u-flex-1" style="overflow: hidden;">
								<view class="u-line-2" style="font-size: 30rpx; white-space: pre-wrap;">
									{{item.goodsName}}
								</view>
							</view>
							<view class="u-text-right" style="margin-left: 40rpx;">
								<view style="font-size: 28rpx;">￥{{item.amount}}</view>
								<view style="font-size: 24rpx; color: #aaa;">x{{item.num}}</view>
							</view>
						</view>
						<view class="u-flex u-row-right" style="width: 100%">
							<view style="font-size: 24rpx;">
								实付款<text
									style="font-size: 32rpx; font-weight: 500;">￥{{(item.amount * item.num)}}</text>
							</view>
						</view>
						<!-- <view class="u-line-1" style="font-size: 24rpx; color: #333; margin: 10rpx 0;">
							{{item.goodsName}}
						</view>
						<view class="u-line-1" style="font-size: 24rpx; color: #aaa; margin-top: 20rpx">￥{{item.amount}}
						</view>
						<view class="u-line-1" style="font-size: 24rpx; color: #aaa; margin: 6rpx 0;">
							{{item.createTime}}
						</view> -->
					</view>
				</view>
				<view class="u-flex u-col-center u-row-right" style="margin-top: 35rpx;">
					<u-button v-if="item.payStatus == 1" @click="goToPay(item)" :ripple="true" size="mini"
						:custom-style="{ 'height': '60rpx', 'color': '#FF6200', 'border': 'solid 1rpx #FF6200',
						 'background': '#fff', 'fontSize': '28rpx', 'borderRadius': '30rpx', 'margin': '0', 'padding': '0 32rpx'}">
						继续支付</u-button>
					<u-button v-if="item.payStatus == 2" :disabled="true" :ripple="true" size="mini" :custom-style="{
						'height': '60rpx', 'color': '#EEE', 'border': 'solid 1rpx #EEE', 'padding': '0 32rpx',
						'background': '#fff','fontSize': '28rpx', 'borderRadius': '30rpx', 'margin': '0'
						}">支付完成</u-button>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="state" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多', loading: '努力加载中', nomore: '没有更多了'}" />
		<u-empty v-if="state === 'nomore' && list.length <= 0" text="暂无订单" mode="order" icon-size='220'
			style="padding-top: 200rpx;"></u-empty>
	</view>
</template>

<script>
	export default {
		name: "mall-order-list",
		data() {
			return {
				list: [],
				state: 'loadmore',
			};
		},
		props: {
			status: {
				type: [String, Number],
				default: 0
			},
			formData: {
				type: Object,
				default () {
					return {
						pageNum: 1,
						pageSize: 10
					}
				}
			}
		},
		created() {
			this.getOrder()
		},
		methods: {
			getOrder: function() {
				const formData = this.formData
				formData.payStatus = this.status
				this.$u.api.getGoodsOrder(formData)
					.then(res => {
						uni.stopPullDownRefresh()
						if (res && res.records) {
							if (res.records.length < formData.pageSize) {
								this.state = 'nomore'
							} else {
								this.state = 'loadmore'
							}
							this.list = this.list.concat(res.records || [])
						}
					}).catch(err => {
						this.state = 'nomore'
						uni.stopPullDownRefresh()
					})
			},
			getMore: function() {
				console.log('getMore')
				if (this.state === 'loadmore') {
					this.state = 'loading'
					this.formData.pageNum++
					this.getOrder()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.state !== 'loading') {
					this.state = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getOrder()
				}
			},
			toDetail(item) {
				console.log(item)
				if (item.orderSn) {
					this.$u.route({
						url: 'pages/goodsOrderDetail/goodsOrderDetail',
						params: {
							orderSn: item.orderSn
						}
					})
				}
			},
			goToPay(item) {
				// console.log(item)
				if (item.orderSn) {
					this.$u.route({
						url: "pages/payOrder/payOrder",
						params: {
							orderSn: item.orderSn,
							type: 2
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.mall-order-list {}
</style>
