<template>
	<view class="coupon-list">
		<!-- :style="{filter: item.status == 0 ? 'grayscale(60%)':''}" -->
		<view class="coupon-item" v-for="(item,index) in list" :key="index"
			:style="{opacity : item.status == 0 ? 1 : 0.6}">
			<u-image class="bg-img" src='/static/image/coupon-bg1.png' height="100%" width="100%" />
			<view class="coupon-wrap">
				<view class="ticket">
					<view class="top">
						<view class="u-flex" style="width: 100%;">
							<view class="u-flex-1 u-line-1" style="font-size: 36rpx; color: #333; font-weight: bold;">
								{{item.name}}
							</view>
							<view class="right u-line-1 u-text-center"
								style="font-size: 52rpx; color: #835429; font-weight: bold;">
								<text style="font-size: 41rpx;">￥</text>{{item.discount}}
							</view>
						</view>
						<view class="u-flex" style="width: 100%; margin-top: 6rpx;">
							<view class="u-flex-1 u-line-1" style="font-size: 22rpx; color: #B4876E;">
								有效期{{item.validity}}天
							</view>
							<view class="right u-line-1 u-text-center" style="font-size: 28rpx; color: #835429;">
								满{{item.minAmount}}元可用
							</view>
						</view>
					</view>
					<view class="bottom u-flex">
						<view class="u-flex" style="width: 100%;">
							<view class="u-flex-1 u-line-1" style="font-size: 22rpx; color: #B4876E;">
								{{item.remarks}}
							</view>
							<view class="right u-flex u-row-right" @click="handleUse(item)">
								<view class="btn u-flex u-col-center u-row-center">
									{{statusMap[item.status] || '立即使用'}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="state" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多',loading: '努力加载中',nomore: '没有更多了'}" />
		<u-empty v-if="state=== 'nomore' && list.length <= 0" text="暂无优惠券" mode="coupon" icon-size='220'
			style="padding-top: 200rpx;"></u-empty>
	</view>
</template>

<script>
	export default {
		name: "coupon-list",
		data() {
			return {
				statusMap: {
					0: '立即使用',
					1: '已使用',
					2: '已过期',
				},
				list: [],
				state: 'loadmore',
			};
		},
		props: {
			isSelect: {
				type: Boolean,
				default: false
			},
			type: {
				type: [String, Number],
				default: 1
			},
			amount: {
				type: [String, Number],
				default: undefined
			},
			projectId: {
				type: [String, Number],
				default: undefined
			},
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
			this.getCoupon()
		},
		methods: {
			getCoupon: function() {
				const formData = this.formData
				formData.status = this.status
				formData.type = this.type
				if (this.amount) {
					formData.amount = this.amount
				}
				if (this.projectId) {
					formData.projectId = this.projectId
				}
				this.$u.api.getCouponList(formData)
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
					this.getCoupon()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.state !== 'loading') {
					this.state = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getCoupon()
				}
			},
			handleUse(item) {
				if (this.isSelect) {
					this.$emit('selectFun', item)
				} else {
					if (item.status == 0) {
						this.$u.route({
							url: 'pages/oilRecharge/oilRecharge',
							params: {
								mode: 1
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.coupon-list {
		padding: 0 24rpx;

		.coupon-item {
			height: 260rpx;
			margin: 20rpx 0;
			position: relative;

			.coupon-wrap {
				// display: flex;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 11;

				.ticket {
					height: 100%;
					width: 100%;
					padding: 0 30rpx;

					.top {
						height: 165rpx;
						padding: 20rpx 0 26rpx;
					}

					.bottom {
						height: 95rpx;
						padding: 18rpx 0;
					}

					.right {
						width: 180rpx;
						margin-left: 20rpx;
					}

					.btn {
						width: 138rpx;
						height: 58rpx;
						background: linear-gradient(90deg, #DBAB6E 0%, #B07739 100%);
						border-radius: 29px;
						color: #fff;
						font-size: 22rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
