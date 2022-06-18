<template>
	<view class="oil-card-receive">
		<!-- <view style="font-size: 36rpx; font-weight: 500">油卡领取</view> -->
		<view class="address" @click="selectAddress">
			<view v-if='addressData && addressData.id' class="u-flex u-row-between u-col-center">
				<view style="padding: 12rpx 0;">
					<view class="top">
						<view class="name">{{addressData.name}}</view>
						<view class="phone">{{addressData.mobile}}</view>
					</view>
					<view class="bottom">
						{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.detailed}}
					</view>
				</view>
				<u-icon name="arrow-right" :size="36" color="#CECDCD" style="margin-left: 16rpx;" />
			</view>
			<view v-else class="u-flex-col u-col-center">
				<u-image height="80rpx" width='80rpx' src="/static/image/add-a-icon.png" />
				<view style="font-size: 30rpx; margin-top: 18rpx;">添加收货地址</view>
			</view>
		</view>
		<view class="project u-flex u-row-between u-col-center" @click="selectProject()">
			<view>买套餐送油卡</view>
			<view class="u-flex u-col-center">
				<text v-if='projectData && projectData.id' style="color: #F66866;">
					<text v-if="projectData.mode == 1">
						￥{{amount}}/月 {{projectData.month}}个月
					</text>
					<text v-if="projectData.mode == 2">￥{{amount}}直充</text>
				</text>
				<text v-else style="color: #D4D2D2;">请选择套餐</text>
				<u-icon name="arrow-right" :size="36" color="#CECDCD" style="margin-left: 16rpx;" />
			</view>
		</view>
		<view class="card-type">
			<view class="u-font-32" style="font-weight: bold; padding: 20rpx 32rpx 22rpx;">选择卡片类型</view>
			<view class="radio-box u-flex u-row-between" @click="cardType=1" style="">
				<view class="u-flex u-row-center">
					<u-image src="/static/image/oil-icon.png" width="66rpx" height="66rpx" />
					<view class="u-flex u-m-l-24 u-font-28">中石油</view>
				</view>
				<u-image :src="cardType == 1 ? '/static/image/radio-icon.png'
		: '/static/image/radio-icon_1.png'" width="42rpx" height="42rpx" />
			</view>
			<view style="height: 2rpx; width: 100%;"></view>
			<view class="radio-box u-flex u-row-between" @click="cardType=2">
				<view class="u-flex u-row-center">
					<u-image src="/static/image/oil-icon1.png" width="66rpx" height="66rpx" />
					<view class="u-flex u-m-l-24 u-font-28">中石化</view>
				</view>
				<u-image :src="cardType == 2 ? '/static/image/radio-icon.png'
					: '/static/image/radio-icon_1.png'" width="42rpx" height="42rpx" />
			</view>
		</view>

		<view class="cell-list">
			<u-cell-group :border="false" style="background-color: #fff;">
				<u-cell-item v-if="projectData && projectData.id" class="cell-item" :arrow="false" title="套餐金额"
					hover-class="none" :title-style="{'fontSize': '28rpx', 'color': '#3A3A3A'}">
					<view v-if="projectData.mode == 1" style="color: #F66866; font-size: 28rpx;">
						¥{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}
						<text style="color: #F66866;">
							(省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元)
						</text>
					</view>
					<view v-if="projectData.mode == 2" style="color: #F66866; font-size: 28rpx;">
						¥{{amount * projectData.discount}}
						<text style="color: #3A3A3A;">
							(省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元)
						</text>
					</view>
				</u-cell-item>
				<u-cell-item class="cell-item" :arrow="false" title="卡片" hover-class="none" value="1"
					:title-style="{'fontSize': '28rpx', 'color': '#3A3A3A'}"
					:value-style="{'fontSize': '28rpx', 'color': '#D4D2D2'}" />
				<u-cell-item class="cell-item" :arrow="false" title="优惠券" hover-class="none"
					:value="'-￥' + (couponData.id ? couponData.discount : '0.00')"
					:title-style="{'fontSize': '28rpx', 'color': '#3A3A3A'}"
					:value-style="{'fontSize': '28rpx', 'color': '#D4D2D2'}" />
				<u-cell-item class="cell-item" :arrow="false" title="运费" hover-class="none" :border-bottom="false"
					value="¥0.00" :title-style="{'fontSize': '28rpx', 'color': '#3A3A3A'}"
					:value-style="{'fontSize': '28rpx', 'color': '#D4D2D2'}">
				</u-cell-item>
			</u-cell-group>
		</view>
		<view v-if="projectData && projectData.id" class="oil-bottom u-flex u-col-center u-row-between">
			<view class="oil-bottom-left u-line-1" v-if="projectData.mode==1">
				共计：
				<text class="price">
					￥{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}
				</text>
				<text style="color: #F66866; font-size: 24rpx;">
					（省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元）
				</text>
			</view>
			<view class="oil-bottom-left u-line-1" v-if="projectData.mode==2">
				共计：
				<text class="price">
					￥{{Math.round(amount * projectData.discount - (couponData.discount || 0))}}
				</text>
				<text style="color: #F66866; font-size: 24rpx;">
					（省{{Math.round(projectData.save - (couponData.discount || 0))}}元）
				</text>
			</view>
			<u-button :loading="isLoading" :ripple="true" :custom-style="{'background': '#F66866', 
			'color': '#fff', 'fontSize': '34rpx','width': '278rpx', 'height': '120rpx',
			 'margin': '0', 'border': 'none', 'borderRadius': '0'}" @click="submit">确认支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: 0,
				cardType: 1,
				addressData: {},
				projectData: {},
				couponData: {},
				isLoading: false,
			};
		},
		onLoad(options) {
			// console.log(options)
			if (options.projectData) {
				this.projectData = JSON.parse(options.projectData)
			}
			if (options.couponData) {
				this.couponData = JSON.parse(options.couponData)
			}
			if (options.amount) {
				this.amount = Number(options.amount)
			}
			this.addressDefault()
		},

		methods: {
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
			selectProject() {
				this.$u.route({
					url: 'pages/discountSelect/discountSelect',
					params: {
						projectData: JSON.stringify(this.projectData),
						couponData: JSON.stringify(this.couponData),
						amount: this.amount
					}
				})
			},
			submit: function() {
				const {
					amount,
					cardType,
					addressData,
					projectData,
					couponData,
				} = this
				if (!addressData.id) {
					this.$u.toast('请选择您的收货地址', 2000);
					return
				} else if (!projectData.id) {
					this.$u.toast('请选择要充值的套餐', 2000);
					return
				} else {
					this.isLoading = true
					const formData = {
						amount,
						cardType,
						addressId: addressData.id,
						couponId: couponData.id,
						projectId: projectData.id
					}
					this.$u.api.getOilOrderPlace(formData).then(orderSn => {
						this.isLoading = false
						this.$u.route({
							url: 'pages/payOrder/payOrder',
							type: 'redirect',
							params: {
								type: 1,
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
	.oil-card-receive {
		padding: 0 0 120rpx;
		color: #3A3A3A;

		.address {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 26rpx 32rpx;
			// margin: 30rpx 0;

			.top {
				display: flex;
				font-size: 32rpx;

				.phone {
					margin-left: 30rpx;
				}
			}

			.bottom {
				margin-top: 8rpx;
				font-size: 28rpx;
				color: #979797;
			}
		}

		.project {
			margin: 2rpx 0;
			background-color: #fff;
			border-radius: 8rpx;
			padding: 34rpx 32rpx;
			font-size: 28rpx;
		}

		.card-type {
			// margin: 30rpx 0;
			// padding: 0 32rpx;

			.radio-box {
				background-color: #fff;
				padding: 26rpx 32rpx;

				.radio {
					position: absolute;
					z-index: 11;
					top: 16rpx;
					right: 20rpx;
					line-height: 0;
				}
			}
		}

		.cell-list {
			margin: 20rpx 0;

			.cell-item {
				padding: 40rpx 32rpx;
				background-color: #fff;
			}
		}

		.oil-bottom {
			background-color: #fff;
			position: fixed;
			bottom: 0rpx;
			left: 0;
			right: 0;
			z-index: 11;

			.oil-bottom-left {
				padding: 0 24rpx;
				font-size: 28rpx;
				color: #3A3A3A;

				.price {
					font-size: 24rpx;
					color: #F66866;
					// margin-left: 30rpx;
				}
			}
		}
	}
</style>
