<template>
	<view class="address-list">
		<view class="item u-flex u-col-center" @click="handleClick(item)" v-for="(item, index) in list" :key="item.id">
			<view class="u-flex-1">
				<view class="u-flex u-col-center" style="font-weight: 500;">
					<view>{{item.name}}</view>
					<view style="margin: 0 14rpx;">{{item.mobile}}</view>
					<view class="tag" v-if="item.isDefault">
						<text class="red">默认</text>
					</view>
				</view>
				<view class="u-flex u-col-center" style="margin-top: 4rpx;">
					<u-icon name="map" :size="28" color="#FF6800" />
					<view style="margin-left: 4rpx;">{{item.province}}{{item.city}}{{item.area}}{{item.detailed}}</view>
				</view>
			</view>
			<view @click.stop="toAddSite(item)" style="margin-left: 30rpx;">
				<u-icon name="arrow-right" :size="28" color="#aaa" />
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="state" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多',loading: '努力加载中',nomore: '没有更多了'}" />
		<u-empty v-if="state=== 'nomore' && list.length <= 0" text="暂无地址" mode="address" icon-size='220'
			style="padding-top: 200rpx;"></u-empty>

		<view class="addSite" @click="toAddSite()">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "address-list",
		data() {
			return {
				list: [],
				state: 'loadmore',
			};
		},
		props: {
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
			this.getAddress()
		},
		methods: {
			getAddress: function() {
				const formData = this.formData
				this.$u.api.getAddressList(formData)
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
					this.getAddress()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.state !== 'loading') {
					this.state = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getAddress()
				}
			},
			handleClick(item) {
				this.$emit('selectFun', item)
			},
			toAddSite(params = {}) {
				this.$u.route({
					url: 'pages/addressCreate/addressCreate',
					params
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-list {
		padding: 1rpx 0;

		.item {
			margin: 20rpx 32rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 23rpx 20rpx;
			font-size: 26rpx;

			.tag {
				display: flex;
				align-items: center;
				font-weight: 400;
				margin-left: 15rpx;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					background-color: #FF6800;
				}
			}
		}

		.addSite {
			display: flex;
			justify-content: space-around;
			line-height: 88rpx;
			position: fixed;
			bottom: 90rpx;
			left: 100rpx;
			right: 100rpx;
			background: linear-gradient(44deg, #FFA200 0%, #FF6200 100%);
			border-radius: 10rpx;
			font-size: 32rpx;

			.add {
				display: flex;
				align-items: center;
				color: #ffffff;

				.icon {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
