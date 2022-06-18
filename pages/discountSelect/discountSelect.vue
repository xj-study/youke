<template>
	<view class="discount-select">
		<view class="oil-amount">
			<!-- <view class="oil-amount-title">每月充值金额套餐</view> -->
			<view class="oil-amount-content u-flex u-col-center u-row-between">
				<view style="font-size: 28rpx; width: 210rpx; font-weight: bold;
					 border-right: 2rpx solid #E3DEDE; margin-right: 68rpx;">
					每月加油金额</view>
				<view class="u-flex u-flex-1 u-col-center" style="width: 150rpx;">
					<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('plus')"
						@touchend.stop.prevent="clearTimer">
						<u-image height="52rpx" width='52rpx' src="/static/image/add-icon.png"
							:style="{filter: max && amount >= max ? 'grayscale(100%)':''}" />
					</view>
					<view class="u-flex-1 u-text-center" style="font-size: 32rpx;">{{amount}}</view>
					<view style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('minus')"
						@touchend.stop.prevent="clearTimer">
						<u-image height="52rpx" width='52rpx' src="/static/image/rdc-icon.png"
							:style="{filter: amount<= min ? 'grayscale(100%)':''}" />
					</view>
				</view>
			</view>
		</view>
		<view class="oil-list">
			<view class="oil-list-title">选择优惠套餐
				<!-- <text style="font-size: 24rpx;">（金额不清零 中石化中石油全国通用）</text> -->
			</view>
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
		<!-- 	<view class="oil-list">
			<view class="oil-list-title">选择套餐</view>
			<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
				<view :class="['oil-item', projectData.id == item.id ? 'oil-item-active' : 'oil-item-inactive']"
					v-for="(item,index) in projectList" :key="index" @click="changeProject(item, index)">
					<view class="oil-item-name">{{item.name}}</view>
					<view class="oil-item-month">{{item.month}}个月套餐</view>
				</view>
			</view>
			<view class="oil-list-tips u-text-center" v-if="projectData.id">充值
				<text>{{projectData.month}}</text>个月 原价
				<text style="color: #FF6800; text-decoration: line-through;">{{amount*projectData.month}}</text>元，折扣价
				<text style="color: #FF6800;">
					{{Math.round(amount * projectData.month * projectData.discount)}}
				</text>元
			</view>
		</view> -->
		<u-cell-group class="oil-cell-group" :border="false">
			<u-cell-item class="oil-cell-item" title="充值计划" value="查看计划" hover-class="none" bg-color="#fff"
				:border-bottom="false" :value-style="{'color': '#333', 'fontSize': '24rpx'}"
				:title-style="{'color': '#333', 'fontSize': '26rpx'}" @click="openPlan()">
			</u-cell-item>
			<u-cell-item class="oil-cell-item" title="优惠券" hover-class="none" bg-color="#fff" :border-bottom="false"
				:value-style="{'color': '#333', 'fontSize': '24rpx'}"
				:title-style="{'color': '#333', 'fontSize': '26rpx'}"
				:value="couponData.id ? `-${couponData.discount}元` : `${couponTotal}张优惠券可用`" @click="selectCoupon">
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
			<u-button :loading="isLoading" :ripple="true" @click="submit" :custom-style="{'background': '#F66866',
			'color': '#fff', 'fontSize': '32rpx', 'width': '278rpx', 'height': '120rpx',
			 'margin': '0', 'border': 'none', 'borderRadius': '0'}">
				确认套餐
			</u-button>
		</view>
		<u-popup v-model="show" mode="center" width="600rpx" height="800rpx" border-radius="12" :closeable="true"
			close-icon-color="#343434" close-icon-size="28">
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
				projectList: [],
				couponTotal: 0,
				couponData: {},
				show: false,
				planList: [],
				isLoading: false
			};
		},

		onLoad(options) {
			if (options.projectData) {
				this.projectData = JSON.parse(options.projectData)
			}
			if (options.couponData) {
				this.couponData = JSON.parse(options.couponData)
			}
			if (options.amount) {
				this.amount = Number(options.amount)
			}
			this.getProject()
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
				this.getCoupon()
			}
		},
		methods: {
			getProject() {
				this.$u.api.getProjectList({
					type: 1,
					mode: 1
				}).then(res => {
					this.projectList = res.records || []
					if (!this.projectData.id && res.records[0]) {
						this.projectData = res.records[0]
						this.amount = res.records[0].defaultAmount
					}
				}).catch(err => {
					console.log('err', err)
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
				this.projectData = item
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
			submit() {
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];
				prevPage.$vm.couponData = this.couponData
				prevPage.$vm.projectData = this.projectData
				prevPage.$vm.amount = this.amount
				this.$u.route({ //返回
					type: 'back',
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.discount-select {
		padding: 0 0 100rpx;

		.oil-amount {
			margin: 0 0 20rpx;
			padding: 24rpx 24rpx;
			background-color: #fff;

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
					color: #FF5151;
					font-weight: bold;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
