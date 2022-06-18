<template>
	<view class="goods-list">
		<view class="u-flex-col u-col-center u-row-center" style="height: 280rpx; width: 730rpx;background-size: 100% 100%; 
		 background-image: url('/static/image/oil-card-bg.png');" @click="handleCreate()">
			<view class="u-flex u-row-center u-col-center" style="height: 100%;"
				@click="handleNav({url:'/pages/oilCardCreate/oilCardCreate'})">
				<view class="u-flex u-row-center u-col-center" style="border-radius: 36rpx; height: 72rpx; width: 72rpx;
				border: 5rpx #fff solid;">
					<u-icon name="plus" color="#fff" size="50"></u-icon>
				</view>
				<text style="color: #fff; margin: 0 16rpx; font-size: 36rpx;">添加油卡</text>
			</view>
		</view>
		<u-swipe-action v-for="(item,index) in list" :key="index" :index="index" style="width: 100%;" @click="click"
			:options="options" @open="open" :show="item.show || false">
			<view class="u-flex-col" style="height: 280rpx; width: 730rpx; background-size: 100% 100%; 
		 background-image: url('/static/image/oil-card-bg.png'); padding: 54rpx 58rpx;" @click="handleClick(item)">
				<view class="u-flex u-col-top">
					<view class="u-flex-col u-row-center u-col-center">
						<u-image height="96rpx" width='96rpx'
							:src="item.type == 1 ? '/static/image/oil-icon.png' : '/static/image/oil-icon1.png'" />
					</view>
					<text style="font-weight: 600;font-size: 32rpx; color: #fff; padding: 10rpx 20rpx;">{{item.name}}</text>
				</view>
				<view class="u-line-1 u-text-right" style="margin-top: 30rpx; font-size: 32rpx;
				font-weight: bold; color: #fff; letter-spacing: 3rpx;">
					<text v-for="(val, idx) in item.account" :key='idx' space="nbsp">
						{{idx % 4 != 0 || idx == 0 ? val : '  ' + val }}
					</text>
				</view>
			</view>
		</u-swipe-action>
		<u-loadmore v-if="list.length > 0" :status="status" style="padding: 20rpx 0;"
			:load-text="{	loadmore: '上拉加载更多',loading: '努力加载中',nomore: '没有更多了'}" />
		<u-empty v-if="status=== 'nomore' && list.length <= 0" text="暂无油卡" mode="data" icon-size='220'
			style="padding-top: 200rpx;" />
	</view>
</template>

<script>
	export default {
		name: "goods-list",
		data() {
			return {
				list: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
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
			current: {
				type: [String, Number],
				default: 0
			},
			disabled: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.getOilCard()
		},
		methods: {
			getOilCard: function() {
				this.$u.api.getOilCardList().then(res => {
					uni.stopPullDownRefresh()
					if (res && res.records) {
						if (res.records.length < this.formData.pageSize) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						const list = this.list.concat(res.records || [])
						list.map((val, idx) => {
							list[idx].show = false;
						})
						this.list = list
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
					this.getOilCard()
				}
			},
			onRefresh: function() {
				console.log('refresh')
				if (this.status !== 'loading') {
					this.status = 'loading'
					this.formData.pageNum = 1
					this.list = []
					this.getOilCard()
				}
			},
			handleCreate: function() {
				this.$emit('closeFun')
				this.$u.route({
					url: 'pages/oilCardCreate/oilCardCreate'
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				if (index != -1) this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			click(index, index1) {
				const that = this
				const id = that.list[index].id
				if (id) {
					uni.showModal({
						title: '提示',
						content: "确定删除油卡？",
						success(res) {
							if (res.confirm) {
								that.$u.api.oilCardDelete(id).then(res => {
									that.$u.toast('删除成功！')
									that.open(-1)
									that.list.splice(index, 1);
								})
							}
						}
					})
				}
			},
			handleClick: function(item) {
				this.$emit('selectFun', item)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding: 20rpx 10rpx 80rpx;
		font-size: 36rpx;
		color: #fff;
		font-weight: bold;

		.card-bg {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			z-index: 1
		}

		.btn {
			background-color: #fff;
			border-radius: 10rpx;
			margin: 10rpx 20rpx;
		}
	}
</style>
