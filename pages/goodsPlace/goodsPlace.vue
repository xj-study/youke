<template>
	<view class="goods-place">
		<view class="address u-flex u-row-between u-col-center" @click="selectAddress">
			<view v-if='addressData && addressData.id'>
				<view class="top">
					<view class="name">{{addressData.name}}</view>
					<view class="phone">{{addressData.mobile}}</view>
				</view>
				<view class="bottom">
					{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.detailed}}
				</view>
			</view>
			<view v-else>请选择您的收货地址</view>
			<u-icon name="map" :size="36" color="#999" style="margin-left: 30rpx;" />
		</view>
		<view class="goods-info">
			<view style="font-size: 26rpx;">实物商品</view>
			<view class="u-flex u-col-top" style="margin: 20rpx 0 30rpx;">
				<u-image :src="info.picUrl" height="154" width="154" border-radius="8" />
				<view class="txt u-flex-1" style="overflow: hidden; font-size: 24rpx;">
					<view class="u-line-1" style="margin: 17rpx 0">{{info.name}}</view>
					<view class="u-line-1" style="margin: 18rpx 0; color: #aaa;">¥{{info.price}}元</view>
				</view>
			</view>
			<view class="u-text-right" style="font-size: 24rpx;">普通快递 包邮</view>
		</view>
		<view class="goods-bottom u-flex u-col-center u-row-between">
			<view class="goods-bottom-left u-line-1">
				合计<text class="price">￥{{info.price}}</text>
			</view>
			<u-button :loading="isLoading" :ripple="true" :custom-style="{'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)',
			 'color': '#fff', 'fontSize': '26rpx', 'width': '188rpx', 'height': '110rpx', 'margin': '0', 
			 'border': 'none', 'borderRadius': '0 8rpx 8rpx 0'}" @click="submit">点击购买</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				num: '',
				info: {},
				addressData: {},
				isLoading: false
			};
		},
		onLoad(options) {
			// console.log(options)
			if (options.goodsId) {
				this.goodsId = options.goodsId
			}
			if (options.num) {
				this.num = options.num
			}
			this.addressDefault()
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.$u.api.getGoodsDetail(this.goodsId).then(res => {
					this.info = res
				})
			},
			addressDefault() {
				this.$u.api.addressDefault().then(res => {
					this.addressData = res || {}
				})
			},
			selectAddress() {
				this.$u.route({
					url: 'pages/addressSelect/addressSelect',
					params: this.addressData
				})
			},
			submit() {
				const {
					goodsId,
					num,
					addressData
				} = this
				if (!addressData || !addressData.id) {
					this.$u.toast('请选择您的收货地址', 2000);
				} else {
					this.isLoading = true
					this.$u.api.getGoodsPlace({
						goodsId,
						num,
						addressId: addressData.id
					}).then(orderSn => {
						this.isLoading = false
						this.$u.route({
							url: 'pages/payOrder/payOrder',
							type: 'redirect',
							params: {
								type: 2,
								orderSn
							}
						})
					}).catch(() => {
						this.isLoading = false
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-place {
		padding: 24rpx 0;
		color: #333;

		.address {
			margin: 0 24rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 28rpx 32rpx;

			.top {
				display: flex;
				font-size: 28rpx;
				color: #333;

				.phone {
					margin-left: 60rpx;
				}
			}

			.bottom {
				display: flex;
				margin-top: 4rpx;
				font-size: 24rpx;
				justify-content: space-between;
				color: #aaa;
			}
		}

		.goods-info {
			margin: 20rpx 24rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 23rpx 18rpx 40rpx 32rpx;

			.txt {
				overflow: hidden;
				margin-left: 40rpx;
			}
		}

		.goods-bottom {
			background-color: #fff;
			border-radius: 8rpx;
			position: fixed;
			bottom: 24rpx;
			left: 24rpx;
			right: 24rpx;

			.goods-bottom-left {
				padding: 0 24rpx;
				font-size: 26rpx;
				color: #333;

				.price {
					font-size: 36rpx;
					color: #FF6800;
					margin-left: 6rpx;
				}
			}
		}
	}
</style>
