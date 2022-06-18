<template>
	<view class="discount-detail">
		<view v-if="cardList.length == 0" class="u-flex-col u-col-center u-row-center" @click="selectCard()" style="height: 280rpx; background-size: 100% 100%;
		 background-image: url('/static/image/oil-card-bg.png'); margin: 0 6rpx;">
			<view class="u-flex u-row-center u-col-center" style="height: 100%;"
				@click="handleNav({url:'/pages/oilCardCreate/oilCardCreate'})">
				<view class="u-flex u-row-center u-col-center" style="border-radius: 36rpx; height: 72rpx; width: 72rpx;
					border: 5rpx #fff solid;">
					<u-icon name="plus" color="#fff" size="50"></u-icon>
				</view>
				<text style="color: #fff; margin: 0 16rpx; font-size: 36rpx;">添加油卡</text>
			</view>
		</view>
		<swiper v-else class="oil-card" @change="changeCard">
			<swiper-item class="oil-card-wrap" v-for="(item, index) in cardList" :key="index">
				<view style="height: 276rpx; background-image: url('/static/image/home-bg2.png');
				background-size: 100% 100%; padding: 24rpx 32rpx;">
					<view class="u-flex ">
						<view class="u-flex-col u-row-center u-col-center">
							<u-image height="58rpx" width='58rpx'
								:src="item.type == 1 ? '/static/image/oil-icon.png' : '/static/image/oil-icon1.png'" />
							<!-- <view style="font-size: 10rpx; font-weight: bold; color: #000; margin-top: 4rpx;">{{item.type == 1 ? "中国石油" : "中国石化"}}	</view> -->
						</view>
						<text
							style="font-weight: 600;font-size: 40rpx; color: #C57538; padding: 0 20rpx;">{{item.name}}</text>
					</view>
					<view class="u-line-1 u-text-center" style="margin-top: 60rpx; font-size: 48rpx;font-weight: bold; color: #FEE0BF; 
					text-shadow: 0rpx 4rpx 0rpx #B9570B, 0px 2rpx 0rpx #FAEAD9; letter-spacing: 3rpx;">
						<text v-for="(val, idx) in item.account" :key='idx' space="nbsp">
							{{idx % 4 != 0 || idx == 0 ? val : '  ' + val }}
						</text>
						<!-- {{item.account}}</view> -->
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="oil-amount">
			<view class="oil-amount-content u-flex u-col-center u-row-between">
				<view style="font-size: 28rpx; width: 210rpx; font-weight: bold;
					 border-right: 2rpx solid #E3DEDE; margin-right: 68rpx;">
					每月加油金额</view>
				<view class="u-flex u-flex-1 u-col-center" style="width: 150rpx;">
					<view v-if="projectData.lable != 4" style="margin: 0 10rpx"
						@touchstart.stop.prevent="btnTouchStart('plus')" @touchend.stop.prevent="clearTimer">
						<u-image height="52rpx" width='52rpx' src="/static/image/add-icon.png"
							:style="{filter: max && amount >= max ? 'grayscale(100%)':''}" />
					</view>
					<view class="u-flex-1 u-text-center" style="font-size: 32rpx;">{{amount}}</view>
					<view v-if="projectData.lable != 4" style="margin: 0 10rpx"
						@touchstart.stop.prevent="btnTouchStart('minus')" @touchend.stop.prevent="clearTimer">
						<u-image height="52rpx" width='52rpx' src="/static/image/rdc-icon.png"
							:style="{filter: amount<= min ? 'grayscale(100%)':''}" />
					</view>
				</view>
			</view>
		</view>
		<view class="oil-list">
			<view class="oil-list-title">加油套餐
			</view>
			<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
				<view class="u-rela oil-item oil-item-active u-flex ">
					<view class="oil-item-name">{{projectData.name}}</view>
					<view class="oil-item-month">{{projectData.month}}个月套餐</view>
				</view>
			</view>
			<!-- 		<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
				<view
					:class="['u-rela u-flex-col u-row-center u-col-center oil-item', projectData.id == item.id ? 'oil-item-active' : 'oil-item-inactive']"
					v-for="(item,index) in projectList" :key="index" @click="changeProject(item, index)">
					<view class="oil-item-name">{{item.name}}</view>
					<view class="oil-item-month">{{item.month}}个月套餐</view>
					<view class="u-absolute oil-item-flag">活动</view>
				</view>
			</view> -->
			<view class="oil-list-tips u-text-center" v-if="projectData.id">充值
				<text>{{projectData.month}}</text>个月 原价
				<text style="color: #FF5151; text-decoration: line-through;">{{amount*projectData.month}}</text>元，折扣价
				<text style="color: #FF5151;">
					{{Math.round(amount * projectData.month * projectData.discount)}}
				</text>元，立省
				<text style="color: #FF5151">
					{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}
				</text>
				元
			</view>
		</view>
		<u-cell-group class="oil-cell-group" :border="false">
			<u-cell-item class="oil-cell-item" title="充值计划" value="查看计划" hover-class="none" bg-color="#fff"
				:border-bottom="false" :value-style="{'color': '#333', 'fontSize': '24rpx'}"
				:title-style="{'color': '#333', 'fontSize': '26rpx'}" @click="openPlan()"></u-cell-item>
			<u-cell-item class="oil-cell-item" @click="selectCoupon" title="优惠券" hover-class="none" bg-color="#fff"
				:border-bottom="false" :value-style="{'color': '#333', 'fontSize': '24rpx'}"
				:title-style="{'color': '#333', 'fontSize': '26rpx'}"
				:value="couponData.id ? `-${couponData.discount}元` : `${couponTotal}张优惠券可用`">
			</u-cell-item>
			<u-cell-item v-if="projectData.id" class="oil-cell-item" title="充值明细" hover-class="none" bg-color="#fff"
				:value-style="{'color': '#333', 'fontSize': '24rpx'}" :border-bottom="false" :arrow="false"
				:title-style="{'color': '#333', 'fontSize': '26rpx'}">
				<view>
					总计：
					<text>{{amount}}*{{projectData.month}}*{{projectData.discount}}
						<text v-if="couponData.id">-{{couponData.discount}}</text> =</text>
					<text>{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}</text>
					元
				</view>
			</u-cell-item>
		</u-cell-group>
		<view v-if="projectData.id" class="oil-bottom u-flex u-col-center u-row-between">
			<view class="oil-bottom-left u-line-1">
				共计
				<text class="price">
					￥{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}
				</text>
				<text style="color: #FF5151; font-size: 22rpx;">
					(省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元)
				</text>
			</view>
			<u-button :loading="isLoading" :ripple="true" :custom-style="{'background': '#F66866',
			'color': '#fff', 'fontSize': '32rpx', 'width': '278rpx', 'height': '120rpx',
			 'margin': '0', 'border': 'none', 'borderRadius': '0'}" @click="submit">
				确认支付
			</u-button>
		</view>
		<u-popup v-model="show" mode="center" width="630rpx" height="800rpx" border-radius="12" :closeable="true"
			close-icon-color="#ccc" close-icon-size="20">
			<plan-list :height='800' :list='planList' @close="show = false" />
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				min: 100,
				max: undefined,
				amount: 500,
				projectData: {},
				couponTotal: 0,
				cardList: [],
				cardData: {},
				couponData: {},
				show: false,
				planList: [],
				isLoading: false,
			};
		},
		watch: {
			amount(val, oldVal) {
				// console.log(val, oldVal);
				this.getCoupon()
			}
		},
		onLoad(options) {
			this.projectData = options
			this.amount = Number(options.defaultAmount)
			this.getCardList()
			this.getCoupon()
		},
		methods: {
			getCardList() {
				this.$u.api.getOilCardList().then(res => {
					this.cardList = res.records || []
					if (this.cardList.length > 0) {
						this.cardData = this.cardList[0]
					}
				})
			},
			getCoupon() {
				this.couponData = {}
				const formData = {
					status: 0,
					amount: this.amount,
					projectId: this.projectData.id,
					type: 1
				};
				this.$u.api.getCouponList(formData).then(res => {
					this.couponTotal = res.total || 0
				}).catch(err => {
					console.log('err', err)
				})
			},
			changeCard(e) {
				// console.log(e.detail.current)
				const current = e.detail.current
				this.cardData = this.cardList[current]
			},
			changeAmount(type = 1) {
				if (type == 1) {
					if (this.amount > this.min) {
						this.amount = Number(this.amount) - 100
					}
				} else {
					if (!this.max || this.amount < this.max) {
						this.amount = Number(this.amount) + 100
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
			selectCard() {
				this.$u.route({
					url: 'pages/oilCardSelect/oilCardSelect',
					params: this.cardData
				})
			},
			selectCoupon() {
				const params = this.couponData || {}
				if (this.projectData && this.projectData.id) {
					params.projectId = this.projectData.id
				}
				if (this.amount) {
					params.amount = this.amount
				}
				params.type = 1
				this.$u.route({
					url: 'pages/couponSelect/couponSelect',
					params,
				})
			},
			openPlan() {
				const formData = {
					amount: this.amount,
					projectId: this.projectData.id,
				}
				this.$u.api.getPlanList(formData).then(res => {
					this.show = true
					this.planList = res
				})
			},
			submit: function() {
				const {
					cardData,
					amount,
					projectData,
					couponData
				} = this
				const formData = {
					amount,
					couponId: couponData.id,
					cardId: cardData.id,
					projectId: projectData.id
				}
				console.log(formData)
				if (!cardData.id) {
					this.$u.toast('请选择要充值的油卡', 2000);
					return
				} else if (!projectData.id) {
					this.$u.toast('请选择要充值的套餐', 2000);
					return
				} else {
					const formData = {
						amount,
						couponId: couponData.id,
						cardId: cardData.id,
						projectId: projectData.id
					}
					console.log(formData)
					this.isLoading = true
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
		},
	}
</script>

<style lang="scss">
	.discount-detail {
		padding: 6rpx 0 100rpx;

		.oil-card {
			border-radius: 12rpx;
			padding: 18rpx 24rpx 0;
			// height: 220rpx;

			.oil-card-wrap {
				font-size: 36rpx;
				color: #fff;

				.card1 {
					width: 100%;
					height: 220rpx;
					padding: 26rpx 40rpx 38rpx;
					border-radius: 10rpx;
					// background: linear-gradient(225deg, #D4D6E5 0%, #172B46 100%);
					position: relative;
					overflow: hidden;
				}

				.card2 {
					width: 100%;
					height: 220rpx;
					padding: 26rpx 40rpx 38rpx;
					border-radius: 10rpx;
					// background: linear-gradient(225deg, #F8DEB1 0%, #5E4A11 100%);
					position: relative;
					overflow: hidden;
				}

				.card-bg {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					z-index: 1
				}
			}

			.oil-card-empty {
				height: 100%;
			}
		}

		.oil-amount {
			// margin: 40rpx 0 70rpx;
			margin: 0 0 20rpx;
			padding: 24rpx 24rpx;
			background-color: #fff;
			border-radius: 12rpx;

			.oil-amount-title {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
			}

			.oil-amount-content {
				background-color: #FFF2F2;
				border-radius: 12rpx;
				padding: 24rpx 58rpx 22rpx 30rpx;
				border-radius: 8rpx;
				color: #3A3A3A;
			}
		}

		.oil-list {
			margin: 20rpx 0 17rpx;
			padding: 24rpx;
			background-color: #fff;

			.oil-list-title {
				font-size: 36rpx;
				color: #333;
			}

			.oil-list-wrap {
				padding: 10rpx 0 1rpx;

				.oil-item {
					overflow: hidden;
					width: 100%;
					text-align: center;
					border-radius: 10rpx;
					margin: 10rpx 0;

					.oil-item-name {
						font-size: 28rpx;
						font-weight: bold;
						flex: 2;
						padding: 26rpx 0;
					}

					.oil-item-month {
						font-size: 28rpx;
						flex: 1;
						padding: 26rpx 0;
					}

					.oil-item-flag {
						transform: rotate(45deg);
						right: -40rpx;
						top: 8rpx;
						padding: 0 40rpx;
						font-size: 20rpx;
					}
				}

				.oil-item-active {
					border-radius: 10rpx;

					.oil-item-name {
						color: #fff;
						background: #FE4848;
					}

					.oil-item-month {
						color: #fff;
						background-color: #F4A641;
					}

					.oil-item-flag {
						background-color: #FDDCDC;
						color: #F5504E;
					}
				}

				.oil-item-inactive {
					box-shadow: 0px 4rpx 10rpx 0rpx rgba(206, 201, 201, 0.5);

					.oil-item-name {
						color: #3A3A3A;
					}

					.oil-item-month {
						color: #6F6E6E;
					}

					.oil-item-flag {
						background-color: #FE4848;
						color: #fff;
					}
				}
			}

			.oil-list-tips {
				background-color: #fff;
				font-size: 20rpx;
				color: #3A3A3A;
				border-radius: 25rpx;
				padding: 8rpx 30rpx 7rpx;
			}
		}

		.oil-cell-group {
			// border-radius: 8rpx;
			// padding: 6rpx 0 6rpx 24rpx;
			// background-color: #fff;

			.oil-cell-item {
				margin: 2rpx 0;
				padding: 25rpx 30rpx;
				border-radius: 8rpx;
			}
		}

		.oil-bottom {
			background-color: #fff;
			border-radius: 8rpx;
			margin: 40rpx 0 0;

			.oil-bottom-left {
				padding: 0 30rpx;
				font-size: 26rpx;
				color: #333;

				.price {
					color: #FF5151;
					font-weight: bold;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
