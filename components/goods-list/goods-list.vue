<template>
	<view class="goods-list">
		<view class="u-flex u-flex-wrap">
			<view v-for="(item,index) in list" :key="index" style="width: 50%; padding: 5rpx;" @click="goDetail(item)">
				<view class="u-flex-col u-col-center" style="width: 100%; background-color: #fff;
				 border-radius: 12rpx; overflow: hidden; height: 514rpx;">
					<u-image :src="item.picUrl" height="346rpx" width='346rpx' />
					<view class="" style="width: 346rpx; padding: 20rpx 10rpx;">
						<view class="u-line-2" style="height: 78rpx; font-size: 26rpx; color: #2F2F2F;">{{item.name}}</view>
						<view class="u-line-1" style="color: #FF0C40; font-size: 30rpx; font-weight: bold;
						margin: 2rpx 0 0;">
							￥{{item.price}}
							<text style="color: #A8A8A8; text-decoration: line-through; font-size: 20rpx; 
								margin-left: 11rpx; font-weight: 400;">
								￥{{item.oldPrice}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="list.length > 0" :status="status" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多',loading: '努力加载中',nomore: '没有更多了'}" />
		<u-empty v-if="status=== 'nomore' && list.length <= 0" text="暂无商品" mode="list" icon-size='220'
			style="padding-top: 200rpx;"></u-empty>
	</view>
</template>

<script>
	export default {
		name: "goods-list",
		data() {
			return {
				list: [],
				status: 'loadmore',
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
			},
			categoryId: {
				type: [String, Number],
				default: undefined
			}
		},
		created() {
			// this.getGoods()
		},
		methods: {
			getGoods: function() {
				const formData = this.formData
				formData.categoryId = this.categoryId
				this.$u.api.getGoodsList(formData)
					.then(res => {
						uni.stopPullDownRefresh()
						if (res && res.records) {
							if (res.records.length < formData.pageSize) {
								this.status = 'nomore'
							} else {
								this.status = 'loadmore'
							}
							this.list = this.list.concat(res.records || [])
						}
					}).catch(err => {
						this.status = 'nomore'
						uni.stopPullDownRefresh()
					})
			},
			getMore: function() {
				console.log('getMore')
				if (this.status === 'loadmore') {
					this.status = 'loading'
					this.formData.pageNum++
					this.getGoods()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.status !== 'loading') {
					this.status = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getGoods()
				}
			},
			goDetail(item) {
				if (item.id) {
					this.$u.route({
						url: 'pages/goodsDetail/goodsDetail',
						params: {
							id: item.id
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding: 6rpx 0 20rpx;
	}
</style>
