<template>
	<scroll-view class="oil-recharge-m swiper-item" scroll-y>
		<view class="swiper-item-wrap">
			<view v-if="cardList.length == 0" class="u-flex-col u-col-center u-row-center" style="height: 280rpx; width: 100%;background-size: 100% 100%;
				 background-image: url('/static/image/oil-card-bg.png');" @click="selectCard()">
				<view class="u-flex u-row-center u-col-center" style="height: 100%;"
					@click="handleNav({url:'/pages/oilCardCreate/oilCardCreate'})">
					<view class="u-flex u-row-center u-col-center" style="border-radius: 36rpx; height: 72rpx; width: 72rpx;
						border: 5rpx #fff solid;">
						<u-icon name="plus" color="#fff" size="50"></u-icon>
					</view>
					<text style="color: #fff; margin: 0 16rpx; font-size: 36rpx;">添加油卡</text>
				</view>
			</view>
			<view v-else style="position:relative;">
			<swiper  class="oil-card" @change="changeCard" style="height:140rpx;">
				<swiper-item class="oil-card-wrap" v-for="(item, index) in cardList" :key="index">
					<view style="margin-bottom:20rpx;padding-top:20rpx;">
						<view class="u-flex  u-col-center u-row-left" style="margin-bottom:20rpx;">
							<view class="u-flex-col u-row-center u-col-center" style="position:relative;top:-2px">
								<u-image height="34rpx" width='34rpx'
									:src="item.type == 1 ? '/static/image/oil-icon.png' : '/static/image/oil-icon1.png'" />
								<!-- <view style="font-size: 10rpx; font-weight: bold; color: #000; margin-top: 4rpx;">{{item.type == 1 ? "中国石油" : "中国石化"}}	</view> -->
							</view>
							<text
								style="font-weight: 600;font-size: 32rpx; color: #000000; padding: 0 16rpx;">{{item.name}}</text>
						</view>
						<view class="u-line-1 u-text-center" style=" font-size: 12px;font-weight: bold; color: #000000; letter-spacing: 3rpx;text-align:left;">
							<text style="margin-right:8rpx;">
								卡号：
							</text>
							<text v-for="(val, idx) in item.account" :key='idx' space="nbsp">
								{{idx % 4 != 0 || idx == 0 ? val : '  ' + val }}
							</text>
							<!-- {{item.account}}</view> -->
						</view>
					</view>
					
				</swiper-item>
				
			</swiper>
			<view class="add—card" @click="handleAddCard"></view>
			</view>
			<view class="oil-amount">
				<!-- <view class="oil-amount-title">每月充值金额套餐</view> -->
				<view class="oil-amount-content u-flex u-col-center u-row-between">
					<view style="font-size: 24rpx;  font-weight: 400;
						 margin-right:46rpx;color:#FFFFFF;">
						每月加油金额</view>
					<view class="u-flex u-col-center cacle-box" >
						
						<view v-if="projectData.flag != 0" style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('minus')"
							@touchend.stop.prevent="clearTimer" class="add-down"
							:style="{opacity: amount<= min ? '.5':'1'}"
							>
							<!-- <u-image height="52rpx" width='52rpx' src="/static/image/rdc-icon.png"
								:style="{filter: amount<= min ? 'grayscale(100%)':''}" /> -->
						</view>
						<view class=" u-text-center" style="font-size: 28rpx; padding:0 30rpx;color:#fff;">{{amount}}</view>
						<view v-if="projectData.flag != 0" style="margin: 0 10rpx" @touchstart.stop.prevent="btnTouchStart('plus')"
							class="add-plus"
							@touchend.stop.prevent="clearTimer" :style="{opacity: max && amount >= max ? '.5':'1'}">
							<!-- <u-image height="52rpx" width='52rpx' src="/static/image/add-icon.png"
								:style="{filter: max && amount >= max ? 'grayscale(100%)':''}" /> -->
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 0 30rpx;">	
			
			<view class="oil-list">
				<view class="oil-list-title">选择优惠套餐
					<view class="oil-list-tips u-text-center" v-if="projectData.id">充值
						<text>{{projectData.month}}</text>个月
				<!-- 		 原价
						<text
							style="color: #FF5151; text-decoration: line-through;">{{amount*projectData.month}}</text>元，折扣价 -->
						<!-- <text style="color: #FF5151;">
							{{Math.round(amount * projectData.month * projectData.discount)}}
						</text>元， -->
						立省
						<text style="color: #FF5151">
							{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}
						</text>
						元
					</view>
				</view>
				<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
					<view
						:class="['u-rela u-flex-col  u-col-center oil-item', projectData.id == item.id ? 'oil-item-active' : 'oil-item-inactive']"
						v-for="(item,index) in projectList" :key="index" @click="changeProject(item, index)">
						
						<view class="oil-item-month">{{item.month}}个月套餐</view>
						<view class="oil-item-name">{{item.discount*100/10}}<view class="oil-item-name-discount">
							折
						</view></view>
						<view class="oil-item-name-tips">折合￥{{showAmount(amount*item.discount)}}元/月</view>
						<view class="oil-item-name-bottom">最高可省{{item.save}}元</view>
						<view class="u-absolute oil-item-flag" v-if="item.lable">{{showLabel(item.lable)}}</view>
					</view>
				</view>
				</view>
			</view>
			<view style="padding: 0 30rpx;">
			<view class="item_box_wrap">
				<view class="item_box" @click="openPlan()">
					<view class="item_iamge plan"></view>
					<view class="item_text">充值计划</view>
				</view>
				<view class="item_box" @click="selectCoupon">
					<view class="item_iamge coupon">
						<view class="coupon_num" v-if="couponTotal">
						{{couponTotal}}张
						</view>
					</view>
					<view class="item_text">优惠券</view>
				</view>
				<view class="item_box" @click="showDetail=true">
					<view class="item_iamge detail"></view>
					<view class="item_text">充值明细</view>
				</view>
			</view>
			</view>
			<u-cell-group class="oil-cell-group" :border="false" v-if="false">
				<u-cell-item class="oil-cell-item" title="充值计划" value="查看计划" hover-class="none" bg-color="#fff"
					:border-bottom="false" :value-style="{'color': '#333', 'fontSize': '24rpx'}"
					:title-style="{'color': '#333', 'fontSize': '26rpx'}" @click="openPlan()">
				</u-cell-item>
				<u-cell-item class="oil-cell-item" @click="selectCoupon" title="优惠券" hover-class="none" bg-color="#fff"
					:border-bottom="false" :value-style="{'color': '#333', 'fontSize': '24rpx'}"
					:title-style="{'color': '#333', 'fontSize': '26rpx'}"
					:value="couponData.id ? `-${couponData.discount}元` : `${couponTotal}张`">
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
					总计：
					<text class="price">
						<text style="font-weight:500;font-size:12px;">￥</text>{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}
					</text>
					<text style="color: #A0A0A0; font-size: 28rpx;">
						（省{{Math.round(amount * projectData.month * (1 - projectData.discount) + (couponData.discount || 0))}}元）
					</text>
				</view>
				<u-button :loading="isLoading" :ripple="true" @click="submit" :custom-style="{'background': '#5874FE','color': '#fff', 'fontSize': '32rpx', 
					'width': '240rpx', 'height': '96rpx', 'margin': '0', 'border': 'none', 'borderRadius': '60rpx'}">
					立即充值
				</u-button>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="600rpx" height="800rpx" border-radius="12" :closeable="true"
			close-icon-color="#343434" close-icon-size="28">
			<plan-list :height='800' :list='planList' @close="show = false" />
		</u-popup>
		<u-popup v-model="showDetail" mode="center" width="600rpx" height="300rpx" border-radius="12" :closeable="true"
			close-icon-color="#343434" close-icon-size="28">
			<view class="showDetail" style="padding-top:40px;text-align: center;font-size:32rpx;margin-bottom:20px;">充值明细</view>
			<view class="content" style="font-size:28rpx;text-align: center;">
				总计：
				<text>{{amount}}*{{projectData.month}}*{{projectData.discount}}
					<text v-if="couponData.id">-{{couponData.discount}}</text> =</text>
				<text>{{Math.round(amount * projectData.month * projectData.discount - (couponData.discount || 0))}}</text>
				元
			</view>
		</u-popup>
	</scroll-view>
</template>

<script>
	export default {
		name: "oil-recharge-m",
		data() {
			return {
				min: 100,
				max: undefined,
				amount: 500,
				projectList: [],
				couponTotal: 0,
				cardList: [],
				cardData: {},
				couponData: {},
				show: false,
				planList: [],
				isLoading: false,
				showDetail:false,
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
					this.getCoupon()
				},
				deep: true //true 深度监听
			},
			amount(val, oldVal) {
				this.getCoupon()
			}
		},
		created() {
			this.getProject()
			this.getCoupon()
			this.getCardList()
		},
		methods: {
			showLabel(value){
				let obj ={
					1:'新人',
					 2:'秒杀',
					  3:'热销',
					   4:'限时'
				}
				return obj[value] || ""
			},
			handleAddCard(){
				this.$emit('add-click')
			},
			getCardList() {
				this.$u.api.getOilCardList().then(res => {
					this.cardList = res.records || []
					if (this.cardList.length > 0) {
						this.cardData = this.cardList[0]
					}
				})
			},
			getProject() {
				this.$u.api.getProjectList({
					type: 1,
					mode: 1
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
				this.couponData = {}
				this.$emit('resetCoupon', this.couponData)
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
			initAmount(amount) {
				setTimeout(() => {
					this.amount = Number(amount)
				}, 200)
			},
			showAmount(value){
				let result = value
				result = result.toFixed(0)
			  return result	
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
				this.caclePrice()
			},
			caclePrice(){
				this.projectList.forEach((x)=>{
					let result  = this.amount*x.month - (x.discount)*this.amount*x.month
					x.save = result.toFixed(0)
				})
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
			changeCard(e) {
				// console.log(e.detail.current)
				const current = e.detail.current
				this.cardData = this.cardList[current]
			},
			selectCard() {
				this.$u.route({
					url: 'pages/oilCardSelect/oilCardSelect',
					params: this.cardData
				})
			},
			setCardData(data = {}) {
				this.cardData = data
			},
			changeProject(item, index) {
				// this.projectData = item
				this.amount = item.defaultAmount;
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
				params.type = 1
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
	.add—card{
		position:absolute;
		right:0;
		width:110rpx;
		height:78rpx;
		background:url('@/static/image/package/get.png') center center no-repeat;
		background-size:100% 100%;
		top:50%;
		transform:translateY(-50%);
	}
	.swiper-item {
		height: 100%;

		.swiper-item-wrap {
			 padding: 0 0 100rpx;

			.oil-card {
				position:relative;
				height: 276rpx;
				padding: 24rpx 24rpx 0;
				background-color: #fff;
				
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
				margin: 0 0 20rpx;
				padding: 40rpx 24rpx 24rpx;
				background-color: #fff;
				border-radius: 12rpx;

				.oil-amount-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
				}

				.oil-amount-content {
					width:100%;
					height:144rpx;
					background:url('/static/image/package/banner.png') center center no-repeat;
					background-size:100% 100%;
					display:flex;
					justify-content:flex-end;
					align-items:center;
					padding-top:24rpx;
					margin-bottom:20rpx;
					// background-color: #FFF2F2;
					// border-radius: 12rpx;
					// padding: 24rpx 58rpx 22rpx 30rpx;
					// border-radius: 8rpx;
					// margin-top: 20rpx;
					color: #3A3A3A;
				}
			}

			.oil-list {
		
				
				

				.oil-list-title {
					font-size: 36rpx;
					color: #333;
					display:flex;
					justify-content:flex-start;
					align-items: center;
				}

				.oil-list-wrap {
					padding: 10rpx 0 1rpx;

					.oil-item {
						// width: 220rpx;
						// height: 164rpx;
						padding-top:24rpx;
						overflow: hidden;
						width: 216rpx;
						height: 230rpx;
						text-align: center;
						border-radius: 10rpx;
						margin: 10rpx 0;
						background:#fff;
						.oil-item-name-bottom{
							position: absolute;
							left:0;
							right:0;
							display:flex;
							justify-content:center;
							align-items:center;
							height: 42rpx;
							background: #ECD7B3;
							border-radius: 0px 0px 4px 4px;
							bottom:0;
							font-size: 10px;
							font-weight: 500;
							color: #704407;
						}
						.oil-item-name {
							font-weight: bold;
							display:flex;
							justify-content:center;
							align-items:center;
							font-size: 56rpx;
							font-weight: bold;
							color: #666666;
							height:64rpx;
							margin-bottom:4rpx;
							.oil-item-name-discount{
								position:relative;
								top:2px;
								font-size:28rpx;
								left:2px;
							}
						}

						.oil-item-month {
							
							font-size: 28rpx;
							font-weight: 500;
							color: #724107;
							line-height: 40rpx;
							margin-bottom:8rpx;
						}
						.oil-item-name-tips{
							font-size: 10px;
							font-weight: bold;
							color: #C1C1C1;
							line-height: 22rpx;
						}
						.oil-item-flag {
							width: 68rpx;
							height: 28rpx;
							background: linear-gradient(84deg, #FA6F32 0%, #FB5032 100%);
							border-radius: 4px 0px 4px 0px;
							font-size: 10px;
							font-weight: 400;
							color: #F8F8F8;
							display:flex;
							justify-content:center;
							align-items:center;
							left:0;
							top:0;
						}
					}

					.oil-item-active {
						background:url('/static/image/package/taocanbanner.png') center center no-repeat;
						background-size:100% 100%;
						border-radius: 10rpx;
	
						.oil-item-name {
							color: #744502;
						}

						.oil-item-month {
							color: #724107;
						}
						.oil-item-name-tips{
							color:#C2A279;
						}
						.oil-list-wrap{
							.oil-item{
								.oil-item-name-bottom{
									background:rgba(0,0,0,0);
								}
							}
							
						}
						
						
					}

					.oil-item-inactive {
						//box-shadow: 0px 4rpx 10rpx 0rpx rgba(206, 201, 201, 0.5);

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
					// background-color: #fff;
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
				padding:16rpx 30rpx;

				.oil-bottom-left {
					padding: 0 30rpx;
					font-size: 26rpx;
					color: #333;

					.price {
						color: #5874FE;
						font-weight: bold;
						font-size: 36rpx;
					}
				}
			}
		}
	}
	.item_box_wrap{
		width:100%;
		height:182rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		display:flex;
		justify-content:space-between;
		align-items: center;
		margin-top:20rpx;
		.item_box{
			width:33.3%;
			text-align:center;
			font-size: 12px;
			font-weight: 400;
			color: #111727;
			line-height:34rpx;
			.item_iamge{
				width:60rpx;
				height:60rpx;
				margin:0 auto;
				margin-bottom:14rpx;
				position:relative;
				&.detail{
					background:url('/static/image/package/item3.png') center center no-repeat;
					background-size:100% 100%;
				}
				&.plan{
					background:url('/static/image/package/item1.png') center center no-repeat;
					background-size:100% 100%;
				}
				&.coupon{
					background:url('/static/image/package/item2.png') center center no-repeat;
					background-size:100% 100%;
				}
				.coupon_num{
					display:flex;
					justify-content:center;
					align-items: center;
					position:absolute;
					height:20px;
					font-size:10px;
					font-size:12px;
					color:#fff;
					padding:0 8rpx;
					background:red;
					border-radius:20rpx 20rpx 20rpx 0;
						right:-100%;
						top:-50%;
									}
			}
		}
	}
	.cacle-box{
		height:60rpx;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 30rpx;
		margin-right:20rpx;
		.add-plus{
			width:40rpx;
			height:40rpx;
			background:#fff;
			border-radius:28rpx;
			margin-left:22rpx;
			position:relative;
			&::after{
				position:absolute;
				content:'';
				width:20rpx;
				height:2px;
				background:#5874FE;
				top:50%;
				left:50%;
				transform:translate(-50% ,-50%);
		}
		&::before{
			position:absolute;
			content:'';
			width:2px;
			height:20rpx;
			background:#5874FE;
			top:50%;
			left:50%;
			transform:translate(-50% ,-50%);
		}
	}
	.add-down{
		width:40rpx;
			height:40rpx;
			background:#fff;
			border-radius:28rpx;
			margin-right:22rpx;
			position:relative;
			&::after{
				position:absolute;
				content:'';
				width:20rpx;
				height:2px;
				background:#5874FE;
				top:50%;
				left:50%;
				transform:translate(-50% ,-50%);
		}
	}
	
	}
</style>
