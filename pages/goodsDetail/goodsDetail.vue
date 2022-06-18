<template>
	<view class="goods-detail-screen">
		<u-swiper :list='galleryUrl' name='picUrl' :height="750" mode='none' interval='5000' bg-color='#F8F8F8' />
		<view class="info">
			<view class="u-line-1" style="color: #2F2F2F;">{{info.name}}</view>
			<view class="u-flex u-col-bottom">
				<view class="u-line-1 u-flex-1" style="color: #FF6800; font-size: 36rpx; margin-top: 24rpx;">
					￥{{info.price}}
					<text style="color: #A8A8A8; font-size: 24rpx; text-decoration: line-through; 
					margin-left: 12rpx;">￥{{info.oldPrice}}</text>
				</view>
				<view style="font-size: 24rpx; color: #333; margin-bottom: 4rpx;">月销{{info.sales}}</view>
			</view>
		</view>
		<view class="detail">
			<!-- <view class="detail-title">商品介绍</view> -->
			<u-divider height="110" fontSize="38" color="#2E2E2E" border-color="#FF6800" half-width="24">商品详情
			</u-divider>
			<view v-for="(item,index) in detailsUrl" :key="index" style="margin-top: 20rpx;">
				<u-image :src="item" width="100%" mode="widthFix" />
			</view>
		</view>
		<view class="goods-bottom u-flex u-col-center u-row-between">
			<view class="goods-bottom-left u-line-1">
				合计<text class="price">￥{{info.price}}</text>
			</view>
			<u-button :ripple="true" :custom-style="{'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 
			'color': '#fff', 'fontSize': '26rpx', 'width': '188rpx', 'height': '110rpx', 'margin': '0', 
			'border': 'none', 'borderRadius': '0'}" @click="show = true">点击购买</u-button>
		</view>
		<u-popup v-model="show" mode="bottom" :closeable="true" close-icon-color="#999" close-icon-size="32">
			<view style="padding: 150rpx 60rpx 40rpx;">
				<view class="u-flex u-row-between u-col-center">
					<view style="font-size: 32rpx;">数量</view>
					<view class="u-flex u-col-center">
						<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('minus')"
							@touchend.stop.prevent="clearTimer">
							<u-image height="40rpx" width='40rpx' src="/static/image/rdc-icon.png"
								:style="{filter: num <= min ? 'grayscale(100%)':''}" />
						</view>
						<view class="u-text-center u-line-1"
							style="font-size: 40rpx; color: #FF6800; font-weight: bold; width: 104rpx;">{{num}} </view>
						<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('plus')"
							@touchend.stop.prevent="clearTimer">
							<u-image height="40rpx" width='40rpx' src="/static/image/add-icon.png"
								:style="{filter: num >= max ? 'grayscale(100%)':''}" />
						</view>
					</view>
				</view>
				<u-button :ripple="true" :custom-style="{'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 
				'color': '#fff', 'fontSize': '32rpx','height': '88rpx', 'margin': '64rpx 40rpx 0',
				 'border': 'none', 'borderRadius': '10rpx'}" @click="submit">确认
				</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				galleryUrl: [],
				detailsUrl: [],
				info: {},
				show: false,
				num: 1,
				min: 1,
				max: 999
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.getDetail()
			}
		},
		methods: {
			getDetail() {
				this.$u.api.getGoodsDetail(this.id).then(res => {
					this.galleryUrl = JSON.parse(res.galleryUrl) || []
					this.detailsUrl = JSON.parse(res.detailsUrl) || []
					this.info = res
				})
			},
			changeAmount(type = 1) {
				if (type == 1) {
					if (this.num > this.min) {
						this.num = Number(this.num) - 1
					}
				} else {
					if (this.num < this.max) {
						this.num = Number(this.num) + 1
					}
				}
			},
			minus() {
				this.changeAmount(1);
			},
			plus() {
				this.changeAmount(2);
			},
			// 点击退格键
			btnTouchStart(callback) {
				// 先执行一遍方法，否则会造成松开手时，就执行了clearTimer，导致无法实现功能
				this[callback] && this[callback]();
				// 如果没开启长按功能，直接返回
				clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
				this.timer = null;
				this.timer = setInterval(() => {
					// 执行加或减函数
					this[callback]();
				}, 250);
			},
			clearTimer() {
				this.$nextTick(() => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			submit() {
				this.show = false
				this.$u.route({
					url: 'pages/goodsPlace/goodsPlace',
					params: {
						num: this.num,
						goodsId: this.id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-screen {
		font-size: 26rpx;
		color: #333;

		.info {
			padding: 17rpx 32rpx 20rpx;
			font-size: 24rpx;
		}

		.detail {
			padding: 0 20rpx;
			background-color: #fff;
			margin: 24rpx 0;
			padding-bottom: 152rpx;

			.detail-title {
				padding: 20rpx 0 18rpx;
			}
		}

		.goods-bottom {
			border-radius: 8rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #F9F9F9;

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
