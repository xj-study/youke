<template>
	<view class="account-list">
		<view v-for="(item,index) in list" :key="index" style="padding: 0 32rpx;">
			<view style="padding: 16rpx 0;" class="u-flex u-row-between u-col-center">
				<view>
					<view style="font-size: 28rpx;">{{item.remark}}</view>
					<view style="font-size: 24rpx; color: #ccc;">{{item.createTime}}</view>
				</view>
				<view :style="[{'fontSize': '28rpx', }, 
				{'color': item.plusMinus == 1 ? '#19BC43' : item.plusMinus == 2 ? '#F26633' : ''}]">
					{{item.plusMinus == 1 ? '+' : plusMinus == 2 ? '-' : ''}}{{item.tradeMoney}}积分
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="state" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多',loading: '努力加载中',nomore: '没有更多了'}" />
		<u-empty v-if="state=== 'nomore' && list.length <= 0" text="暂无记录" mode="history" icon-size='220'
			style="padding-top: 200rpx;"></u-empty>
	</view>
</template>

<script>
	export default {
		name: "account-list",
		data() {
			return {
				list: [],
				state: 'loadmore',
			};
		},
		props: {
			plusMinus: {
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
			this.getAccount()
		},
		methods: {
			getAccount: function() {
				const formData = this.formData
				formData.plusMinus = this.plusMinus
				this.$u.api.getAccountList(formData)
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
					this.getAccount()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.state !== 'loading') {
					this.state = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getAccount()
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
