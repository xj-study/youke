<template>
	<scroll-view class="phone-recharge-m swiper-item" scroll-y>
		<view class="swiper-item-wrap">
			<view class="oil-card u-flex u-col-center" @click="selectCard()">
				<u-image src='/static/image/phone-icon.png' height="36rpx" width="34rpx" />
				<u-input class="phone-input" v-model="phone" type="number" maxlength='11' placeholder="请输入手机号码" />
			</view>
			<view class="oil-amount">
				<!-- <view class="oil-amount-title">每月充值金额</view> -->
				<view class="oil-amount-content u-flex u-col-center u-row-between">
						<view style="font-size: 28rpx; width: 210rpx; font-weight: bold;
							 border-right: 2rpx solid #E3DEDE; margin-right: 68rpx;">
							每月消费金额</view>
						<view class="u-flex u-flex-1 u-col-center" style="width: 150rpx;">
							<view v-if="projectData.flag != 0" style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('plus')"
								@touchend.stop.prevent="clearTimer">
								<u-image height="52rpx" width='52rpx' src="/static/image/add-icon.png"
									:style="{filter: max && amount >= max ? 'grayscale(100%)':''}" />
							</view>
							<view class="u-flex-1 u-text-center" style="font-size: 32rpx;">{{amount}}</view>
							<view v-if="projectData.flag != 0" style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('minus')"
								@touchend.stop.prevent="clearTimer">
								<u-image height="52rpx" width='52rpx' src="/static/image/rdc-icon.png"
									:style="{filter: amount<= min ? 'grayscale(100%)':''}" />
							</view>
						</view>
					</view>
				
				<!-- <view class="u-flex u-col-center u-row-between" style="padding: 24rpx 8rpx 22rpx 30rpx; 
				border-radius: 8rpx; background-color: #fff; margin-top: 20rpx;">
					<view style="font-size: 26rpx; width: 150rpx;">充值金额</view>
					<view style="font-size: 40rpx; color: #FF6800; font-weight: bold;">{{amount}} </view>
					<view class="u-flex u-col-center u-row-right" style="width: 150rpx;">
						<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('minus')"
							@touchend.stop.prevent="clearTimer">
							<u-image height="40rpx" width='40rpx' src="/static/image/rdc-icon.png"
								:style="{filter: amount<= min ? 'grayscale(100%)':''}" />
						</view>
						<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('plus')"
							@touchend.stop.prevent="clearTimer">
							<u-image height="40rpx" width='40rpx' src="/static/image/add-icon.png"
								:style="{filter: max && amount >= max ? 'grayscale(100%)':''}" />
						</view>
					</view>
				</view> -->
			</view>
			<view class="oil-list">
				<view class="oil-list-title">选择充值套餐</view>
				<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
					<view
						:class="['u-rela u-flex-col u-row-center u-col-center oil-item', projectData.id == item.id ? 'oil-item-active' : 'oil-item-inactive']"
						v-for="(item,index) in projectList" :key="index" @click="changeProject(item, index)">
						<view class="oil-item-name">{{item.name}}</view>
						<view class="oil-item-month">{{item.month}}个月套餐</view>
						<view class="u-absolute oil-item-flag">活动</view>
					</view>
				</view>
				<view class="oil-list-tips u-text-center" v-if="projectData.id">充值
					<text>{{projectData.month}}</text>个月 原价
					<text
						style="color: #F66866; text-decoration: line-through;">{{amount*projectData.month}}</text>元，折扣价
					<text style="color: #F66866;">
						{{Math.round(amount * projectData.month * projectData.discount)}}
					</text>元
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
					<text style="color: #F66866; font-size: 22rpx;">
						(省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元)
					</text>
				</view>
				<u-button :loading="isLoading" :ripple="true" :custom-style="{'background': '#F66866','color': '#fff', 'fontSize': '32rpx',
					'width': '278rpx', 'height': '120rpx', 'margin': '0', 'border': 'none', 'borderRadius': '0'}" @click="submit">确认支付</u-button>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="630rpx" height="800rpx" border-radius="12" :closeable="true"
			close-icon-color="#ccc" close-icon-size="20">
			<plan-list :height='800' title="充值计划" :list='planList' @close="show = false" />
		</u-popup>
	</scroll-view>
</template>

<script>
	export default {
		name: "phone-recharge-m",
		data() {
			return {
				phone: '',
				min: 100,
				max: undefined,
				amount: 500,
				projectList: [],
				couponTotal: 0,
				couponData: {},
				show: false,
				planList: [],
				isLoading: false
			};
		},
		props: {
			projectData: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		watch: {
			projectData: { //深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					// console.log(val, oldVal);
					this.getCoupon()
				},
				deep: true //true 深度监听
			},
			amount(val, oldVal) {
				// console.log(val, oldVal);
				this.getCoupon()
			}
		},
		created() {
			this.getProject()
			this.getCoupon()
		},
		methods: {
			getProject() {
				this.$u.api.getProjectList({
					mode: 1,
					type: 2
				}).then(res => {
					// console.log('getProjectList', res)
					this.projectList = res.records || []
					if (!this.projectData.id && res.records[0]) {
						this.changeProject(res.records[0], 0)
						this.initAmount(res.records[0].defaultAmount)
					}
				}).catch(err => {
					console.log('err', err)
				})
			},
			getCoupon() {
				const formData = {
					status: 0,
					amount: this.amount,
					projectId: this.projectData.id,
					type: 2
				};
				this.couponData = {}
				this.$emit('resetCoupon', this.couponData)
				this.$u.api.getCouponList(formData).then(res => {
					this.couponTotal = res.total || 0
				}).catch(err => {
					console.log('err', err)
				})
			},
			initAmount(amount) {
				setTimeout(() => {
					this.amount = Number(amount)
				}, 200)
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
			changeProject(item, index) {
				// this.projectData = item
				this.$emit('changeProject', item)
			},
			selectCoupon() {
				const params = this.couponData || {}
				if (this.projectData && this.projectData.id) {
					params.projectId = this.projectData.id
				}
				if (this.amount) {
					params.amount = this.amount
				}
				params.type = 2
				this.$u.route({
					url: 'pages/couponSelect/couponSelect',
					params,
				})
			},
			setCouponData(data = {}) {
				this.couponData = data
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
			submit() {
				const {
					phone,
					amount,
					projectData,
					couponData
				} = this
				const formData = {
					phone,
					amount,
					couponId: couponData.id,
					projectId: projectData.id
				}
				console.log(formData)
				if (!phone) {
					this.$u.toast('请输入要充值的手机号', 2000);
					return
				} else if (!this.$u.test.mobile(phone)) {
					this.$u.toast('请输入正确的充值手机号', 1000);
					return
				} else if (!projectData.id) {
					this.$u.toast('请选择要充值的套餐', 2000);
					return
				} else {
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
	.swiper-item {
		height: 100%;

		.swiper-item-wrap {
			padding: 0 0 100rpx;

			.oil-card {
				height: 102rpx;
				padding: 24rpx;
				background-color: #fff;

				.phone-input {
					margin: 0 26rpx;
				}
			}

			.oil-amount {
				margin: 0 0 20rpx;
				padding: 20rpx 24rpx 24rpx;
				background-color: #fff;
				border-radius: 12rpx;

				.oil-amount-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
				}

				.oil-amount-content {
					background-color: #FFF2F2;
					border-radius: 12rpx;
					padding: 24rpx 58rpx 22rpx 30rpx;
					border-radius: 8rpx;
					// margin-top: 20rpx;
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
						// width: 220rpx;
						// height: 164rpx;
						overflow: hidden;
						width: 220rpx;
						height: 152rpx;
						text-align: center;
						border-radius: 10rpx;
						margin: 10rpx 0;

						.oil-item-name {
							font-size: 40rpx;
							font-weight: bold;
						}

						.oil-item-month {
							font-size: 28rpx;
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
						background: #FE4848;
						border-radius: 10rpx;

						.oil-item-name {
							color: #fff;
						}

						.oil-item-month {
							color: #fff;
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
						color: #F66866;
						font-weight: bold;
						font-size: 36rpx;
					}
				}
			}
		}
	}
</style>
