<template>
	<view class="order-list">
		<view style="color: #333; font-size: 28rpx; padding: 10rpx 0; ">
			<view v-for="(item,index) in list" :key="index"  @click="handleClick(item)"
				style="background-color: #fff; margin: 10rpx 32rpx 20rpx; padding: 32rpx 30rpx 20rpx; border-radius: 14rpx;">
				<view class="u-flex u-col-center u-row-between">
					<view>
						{{item.projectMode == 1 ? '套餐充值' : item.projectMode == 2 ? '直接充值' : '其他'}}
						{{item.projectName}}
						<text v-if="item.projectMode == 1">（{{item.projectMonth}}个月套餐）</text>
					</view>
					<view>
						{{item.status == 1 ? '进行中' : item.status == 2 ? '已支付' : '待处理'}}
					</view>
				</view>
				<view class="u-flex u-col-center" style="margin: 10rpx 0;">
					<view>剩余金额：</view>
					<view style="font-weight: 500;">￥{{item.planRemainAmount}}元</view>
				</view>
				<view class="u-flex u-col-bottom" style="font-size: 24rpx">
					<view class="u-flex-1" style="color: #aaa">
						<text>
							{{item.projectType == 1 ? '油卡卡号' : item.projectType == 2 ? '手机号' : '账号' }}：
						</text>
						<text>
							{{item.projectType == 1 ? item.cardAccount : item.projectType == 2 ? item.phone : '账号' }}
						</text>
					</view>
					<view class="u-flex u-col-center u-row-right">
						<u-button v-if="item.payStatus == 1" @click.stop="goToPay(item)" :ripple="true" size="mini"
							:custom-style="{'width': '160rpx', 'height': '60rpx' ,'color': '#fff', 'background': 'linear-gradient(180deg, #FFA200 0%, #FF6200 100%)', 'fontSize': '24rpx', 'borderRadius': '30rpx', 'margin': '0'}">
							继续支付</u-button>
						<u-button v-if="item.payStatus == 2" :disabled="true" :ripple="true" size="mini"
							:custom-style="{'width': '160rpx', 'height': '60rpx' ,'color': '#fff','background': '#D4D4D4', 'fontSize': '24rpx', 'borderRadius': '30rpx', 'margin': '0'}">
							支付完成</u-button>
					</view>
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
		name: "order-list",
		data() {
			return {
				list: [],
				state: 'loadmore',
			};
		},
		props: {
			status: {
				type: [String, Number],
				default: undefined
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
				formData.status = this.status
				this.$u.api.getOilOrder(formData)
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
			handleClick(item) {
				// console.log(item)
				this.$u.route({
					url: "pages/oilOrderDetail/oilOrderDetail",
					params: {
						orderSn: item.orderSn,
					}
				})
			},
			goToPay(item) {
				if (item.orderSn) {
					this.$u.route({
						url: "pages/payOrder/payOrder",
						params: {
							orderSn: item.orderSn,
							type: 1
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.order-list {}
</style>
