// <template>
	<scroll-view class="oil-recharge-d swiper-item" scroll-y>
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
			<view class="oil-list">
				<view class="oil-list-title">选择充值金额</view>
				<view class="oil-list-wrap u-flex u-flex-wrap u-row-between">
					<view :class="['u-rela u-flex-col u-row-center u-col-center oil-item', projectData.id == item.id ? 'oil-item-active' : 'oil-item-inactive']"
						v-for="(item,index) in projectList" :key="index" @click="changeProject(item, index)">
						<view class="oil-item-name">{{item.name}}</view>
						<view class="oil-item-month">原价￥
							<text style="text-decoration: line-through;">{{item.defaultAmount}}</text>
							元
						</view>
					</view>
				</view>
			</view>
			<u-cell-group class="oil-cell-group" :border="false">
				<u-cell-item class="oil-cell-item" title="优惠券" :border-bottom="false" hover-class="none" bg-color="#fff"
					:value="couponData.id ? `-${couponData.discount}元` : `${couponTotal}张优惠券可用`"
					:value-style="{'color': '#333', 'fontSize': '24rpx'}" @click="selectCoupon"
					:title-style="{'color': '#333', 'fontSize': '26rpx'}">
				</u-cell-item>
			</u-cell-group>
			<view v-if="projectData.id" class="oil-bottom u-flex u-col-center u-row-between">
				<view class="oil-bottom-left u-line-1">
						总计：
					<text class="price">
						￥{{projectData.defaultAmount - (projectData.save || 0) - (couponData.discount || 0)}}
					</text>
					<text style="color: #FF5151; font-size: 28rpx;">
						(省{{(projectData.save || 0) + (couponData.discount || 0)}})
					</text>
				</view>
				<u-button :loading="isLoading" :ripple="true" @click="submit" :custom-style="{'background': '#F66866','color': '#fff', 'fontSize': '32rpx',
					'width': '278rpx', 'height': '120rpx', 'margin': '0', 'border': 'none', 'borderRadius': '0'}">
					立即充值
				</u-button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "oil-recharge-d",
		data() {
			return {
				projectList: [],
				couponTotal: 0,
				cardList: [],
				cardData: {},
				couponData: {},
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
					this.getCoupon()
				},
				deep: true //true 深度监听
			},
		},
		created() {
			this.getProject()
			this.getCoupon()
			this.getCardList()
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
			getProject() {
				this.$u.api.getProjectList({
					type: 1,
					mode: 2
				}).then(res => {
					// console.log('getProjectList', res)
					this.projectList = res.records || []
					if (!this.projectData.id && res.records[0]) {
						this.changeProject(res.records[0], 0)
					}
				}).catch(err => {
					console.log('err', err)
				})
			},
			getCoupon(amount) {
				this.couponData = {}
				this.$emit('resetCoupon', this.couponData)
				const formData = {
					status: 0,
					amount: this.projectData.defaultAmount,
					projectId: this.projectData.id,
					type: 1
				};
				this.$u.api.getCouponList(formData).then(res => {
					this.couponTotal = res.total || 0
				}).catch(err => {
					console.log('err', err)
				})
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
			changeCard(e) {
				// console.log(e.detail.current)
				const current = e.detail.current
				this.cardData = this.cardList[current]
			},
			changeProject: function(item, index) {
				// this.projectData = item
				this.$emit('changeProject', item)
			},
			selectCoupon() {
				const params = this.couponData || {}
				if (this.projectData && this.projectData.id) {
					params.projectId = this.projectData.id
					params.amount = this.projectData.defaultAmount
				}
				params.type = 1
				this.$u.route({
					url: 'pages/couponSelect/couponSelect',
					params
				})
			},
			setCouponData(data = {}) {
				this.couponData = data
			},
			submit: function() {
				const {
					cardData,
					projectData,
					couponData
				} = this
				const formData = {
					amount: projectData.defaultAmount,
					couponId: couponData.id || '',
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
						amount: projectData.defaultAmount,
						couponId: couponData.id || '',
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
	.swiper-item {
		height: 100%;

		.swiper-item-wrap {
			padding: 0 0 100rpx;

			.oil-card {
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

				.oil-amount-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
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
	}
</style>