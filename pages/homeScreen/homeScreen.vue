<template>
	<view class="home-screen">
		<view class="u-status-bar" :style="{ height: (vue_systemInfo.statusBarHeight || 0) + 'px' }"></view>
		<!-- home banner -->
		<u-swiper :list='bannerList' name='picUrl' :height="310" mode='none' interval='5000' :effect3d='true'
			imgMode="widthFix" effect3d-previous-margin='30' bg-color='unset' border-radius='16' @click="handleBanner" />
		
		<!-- ad list -->
		<view v-if="adList.length > 0" class="u-flex" style="margin: 40rpx 30rpx; justify-content: space-between;">
			<view v-for="(item, index) in adList" :key="index" @click="handleNav(item)">
				<u-image height="180rpx" width='340rpx' :src="item.picUrl" mode="cover" style="border-radius: 16rpx; overflow: hidden;" />
			</view>
		</view>
		
		<!-- nav list -->
		<view style="margin: 40rpx 30rpx;">
			<view class="u-flex u-flex-wrap u-row-between">
				<view v-for="(item,index) in navList" :key="index" style="width: 25%; margin-bottom: 20rpx;"
					@click="handleNav(item)">
					<u-image width="64rpx" height="64rpx" :src="item.image" style="margin: 0 auto" />
					<view class="u-text-center u-line-1" style="margin-top:12rpx; color: #111727; font-size: 24rpx; line-height: 34rpx;">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<!-- 油卡列表 -->
		<!-- <swiper v-if="vuex_token && cardList.length > 0" style="height: 276rpx; margin: 0 32rpx 16rpx; ">
			<swiper-item class="oil-card-wrap" v-for="(item, index) in cardList" :key="index">
				<view style="height: 276rpx; background-image: url('/static/image/home-bg2.png');
				background-size: 100% 100%; padding: 24rpx 32rpx;">
					<view class="u-flex ">
						<view class="u-flex-col u-row-center u-col-center">
							<u-image height="58rpx" width='58rpx'
								:src="item.type == 1 ? '/static/image/oil-icon.png' : '/static/image/oil-icon1.png'" />
						</view>
						<text
							style="font-weight: 600;font-size: 40rpx; color: #C57538; padding: 0 20rpx;">{{item.name}}</text>
					</view>
					<view class="u-line-1 u-text-center" style="margin-top: 60rpx; font-size: 48rpx;font-weight: bold; color: #FEE0BF; 
					text-shadow: 0rpx 4rpx 0rpx #B9570B, 0px 2rpx 0rpx #FAEAD9; letter-spacing: 3rpx;">
						<text v-for="(val, idx) in item.account" :key='idx' space="nbsp">
							{{idx % 4 != 0 || idx == 0 ? val : '  ' + val }}
						</text>
					</view>
				</view>
			</swiper-item>
		</swiper> -->
		<!-- <view v-else style="margin: 0 10rpx 16rpx; height: 320rpx; background-image: url('/static/image/oil-card-bg.png');
				background-size: 100% 100%;">
			<view class="u-flex u-row-center u-col-center" style="height: 100%;"
				@click="handleNav({url: !vuex_token ? 'pages/loginScreen/loginScreen' : '/pages/oilCardCreate/oilCardCreate'}) ">
				<view class="u-flex u-row-center u-col-center" style="border-radius: 36rpx; height: 72rpx; width: 72rpx;
					border: 5rpx #fff solid;">
					<u-icon name="plus" color="#fff" size="50"></u-icon>
				</view>
				<text style="color: #fff; margin: 0 16rpx; font-size: 36rpx;">添加油卡</text>
			</view>
		</view> -->
		
		<!-- 优惠套餐 -->
		<view v-if="projectList.length" class="cell-x">
			<view class="cell-header">
				<text>优惠套餐</text>
				<text class="cell-header-more" @click="handleMeal({ mode: 1 })">查看全部</text>
			</view>
			<view class="cell-list" style="padding: 0 12rpx 40rpx;">
				<view class="cell-i-project" v-for="(item,index) in projectList" :key="index" @click="handleMeal(item)">
					<view class="hs-name">{{ item.name }}</view>
					<view class="hs-amount">{{ item.defaultAmount }}</view>
					<view class="hs-month">{{ item.month }}个月套餐</view>
					<view class="hs-save">优惠¥{{ item.save }}元</view>
				</view>
			</view>
		</view>
		
		<!-- 每日特价 -->
		<view class="cell-label">
			 <view class="label-x" v-for="(item, index) in labelList" :key="index" @click="handleMeal(item)">
				 <view class="hsl-tag-x"><text class="hsl-tag">{{ item.lable | ftag }}</text></view>
				 <view class="hsl-name">{{ item.name }}</view>
				 <view class="hsl-sale">{{ item.saleAmount }}</view>
				 <view class="hsl-info">{{ item.month }}个月套餐 {{ item.defaultAmount }}/月</view>
				 <view class="hsl-total">原价{{ item.saleAmount + item.save }}元</view>
				 <view class="hsl-btn">立即秒杀</view>
			 </view>
		</view>
		
		<!-- 限时秒杀-->
		<!-- <view style="margin: 20rpx 32rpx;" v-if="miaoshaObj.id && miaoshaObj.remainSeconds > 0">
			<view style="padding: 38rpx 44rpx; background-color: #D6CEFF;">
				<view class="u-flex u-row-between">
					<u-image height="36rpx" width='182rpx' src="/static/image/ms-icon.png" />
					<view class="">
						<text class="u-font-24 u-m-r-8" style="color: #3A3A3A; font-weight: 400;">即将结束</text>
						<u-count-down ref="miaosha" :timestamp="miaoshaObj.remainSeconds" bg-color="#000" color="#fff"
							font-size="26" @end="miaoshaEnd" />
					</view>
				</view>
				<view class="u-flex u-row-between u-col-center u-m-t-40">
					<view class="u-line-1">
						<view class="u-font-30 u-line-1" style="color: #3A3A3A;">
							<text class="u-m-r-10">{{miaoshaObj.month}}月套餐</text>
							<text class="u-m-r-10" style="color: #8D77FA;">|</text>
							<text>¥{{miaoshaObj.defaultAmount}}/月</text>
						</view>
						<view class="u-m-t-10 u-line-1" style="color: #F45656;">
							<text class="u-font-34 u-m-r-10">{{miaoshaObj.name}}</text>
							<text class="u-font-24 u-m-r-10"
								style="text-decoration: line-through; color: #727171;">¥{{miaoshaObj.defaultAmount * miaoshaObj.month}}</text>
							<text class="u-font-30">立省{{miaoshaObj.save}}元</text>
						</view>
					</view>
					<view class="u-m-r-15" style="width:158rpx" @click="handleMeal(miaoshaObj)">
						<u-image height="68rpx" width='158rpx' src="/static/image/ms-btn.png" />
					</view>
				</view>
			</view>
		</view> -->
		<!--  -->
		<!-- <view v-if="adList.length > 0" style="margin: 20rpx 0;">
			<u-swiper :list='adList' name='picUrl' :height="206" mode='none' interval='5000' :effect3d='true'
				effect3d-previous-margin='32' bg-color='#F8F8F8' border-radius='8' @click="handleAd" />
		</view> -->

		<!-- <view v-if="subAdList.length > 0" class="u-flex" style="margin: 0 24rpx 20rpx; justify-content: space-between;">
			<view v-for="(item, index) in subAdList" :key="index" @click="handleNav(item)">
				<u-image height="330rpx" width='330rpx' :src="item.picUrl" />
			</view>
		</view> -->
		<!-- 	<view class="">
			location_per: {{location_per}}
		</view> -->
		<!-- 附近加油站 -->
		<!-- <view style="margin: 40rpx 0 0">
			<u-section :show-line='false' title="加油站导航" color="#000" :bold='true' font-size='38' sub-color="#666"
				style="padding: 0 32rpx;">
				<view slot="right">附近有{{stations.length}}个加油站
					<u-icon color="#666" size="26rpx" name="arrow-right" />
				</view>
			</u-section>
			<view style="padding: 20rpx 24rpx">
				<view v-if="location_per" class="u-flex-col u-row-center">
					<view class="u-flex u-row-between" v-for="(item, index) in stations.slice(0 , limit)"
						style="background-color: #fff; border-radius: 16rpx;margin: 16rpx 0; padding: 30rpx 40rpx;">
						<view>
							<view style="font-size: 32rpx; color: #666;">{{item.name}}</view>
							<view style="font-size: 32rpx; color: #666; margin-top: 30rpx;">
								<text style="font-size: 28rpx">￥</text>
								<text style="font-size: 48rpx; font-weight: bold;">{{item.price}}</text>
								<text></text>
							</view>
						</view>
						<view @click="handleStation(item)">
							<u-image width="64rpx" height="64rpx" src="/static/image/daohang.png" />
							<view style="color: #3776DA; font-size: 24rpx; margin-top: 16rpx;">
								{{(item.distance / 1000).toFixed(1)}}km
							</view>
						</view>
					</view>
					<view class="u-flex u-row-center" @click="handleMore" v-if="stations.length > 0">
						{{limit == stations.length ? "收起" : "查看更多"}}
					</view>
				</view>
				<view v-else class="u-relative u-flex-col u-row-center u-col-center" style="padding: 30rpx 0;">
					<u-image width="674rpx" height="396rpx" src="/static/image/home-pic.png" />
					<view class="u-absolute" style="top: 175rpx; z-index: 11;" @click="getLocation()">
						<u-image width="473rpx" height="89rpx" src="/static/image/home-btn.png" />
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- 活动位 -->
		<view v-if="subAdList.length > 0" class="cell-y">
			<view v-for="(item, index) in subAdList" :class="'hs-ad hs-ad-' + index" :key="index" @click="handleNav(item)">
				<u-image width="100%" height="100%" :src="item.picUrl" mode="aspectFill" />
			</view>
		</view>
		
		<!-- 精选商品 -->
		<view v-if="goodsList.length" class="cell-x">
			<view class="cell-header">
				<text>精选商品</text>
				<text class="cell-header-more" @click="handleGoodsMore">查看全部</text>
			</view>
			<view class="cell-list" style="padding: 0 40rpx 20rpx;">
				<view class="cell-i-goods" v-for="(item,index) in goodsList" :key="index" @click="handleGoods(item)">
					<u-image width="100%" height="180rpx" :src="item.picUrl"></u-image>
					<view class="hs-gname u-line-1">{{ item.name }}</view>
					<view class="hs-gamount">{{ item.price }}</view>
				</view>
			</view>
		</view>

		<!-- 广告弹窗 -->
		<u-popup class="ad-popup" v-model="adShow" mode="center" width="568" border-radius="8" closeable
			close-icon-color="#fff">
			<u-swiper :list="popList" name='picUrl' :height="320" mode='none' interval='5000' bg-color='#F8F8F8'
				border-radius='8' @click="handlePopup"></u-swiper>
		</u-popup>
		<!-- 登录 -->
		<view v-if="!vuex_token" class="u-flex" style="position: fixed; left: 30rpx; right: 30rpx; height: 86rpx; border-radius: 43rpx;
		 bottom: 100rpx; 	background-color: rgba(0,0,0,0.6); padding: 0 32rpx; z-index: 999;">
			<u-image width="74rpx" height="70rpx" src="/static/image/home-gift.png" />
			<view class="u-flex-1" style="color: #fff; font-size: 28rpx; padding: 0 10rpx;">
				登录送礼，立刻领取福利
			</view>
			<view @click="handleNav({url:'pages/loginScreen/loginScreen'})" class="u-text-center" style="color: #fff; font-size: 24rpx; width: 160rpx; height: 60rpx;
		  line-height: 60rpx; background: #FE6600; border-radius: 30rpx;">
				立即登录
			</view>
		</view>
	</view>
</template>

<script>
	import permissions from 'js_sdk/Houzhenyu-NotifyTheAuthority/Houzhenyu-NotifyTheAuthority/Permissions.js'
	import {
		NavList
	} from "../../common/config.js"
	import {
		mapState
	} from 'vuex';
	
	const labelMap = {
		1: '新人推荐',
		2: '特价秒杀',
		3: '热销推荐',
		4: '限时秒杀',
	}
	
	export default {
		data() {
			return {
				latitude: "",
				longitude: "",
				covers: [],
				stations: [],
				limit: 2,
				bannerList: [],
				navList: [],
				adList: [],
				popList: [],
				adShow: false,
				// noticeList: [],
				labelList: [],
				
				// newData: {},
				projectList: [],
				goodsList: [],
				cardList: [],
				subAdList: []
			};
		},
		computed: {
			...mapState(['vuex_token', 'location_per', 'notify'])
		},
		filters: {
			ftag(val) {
				return labelMap[val]
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			if (plus.os.name == 'Android') {
				if (!this.notify) {
					permissions();
					this.$u.vuex('notify', true);
				}
			}
			// else if (plus.os.name == 'iOS') {
			// 	let agree = plus.runtime.isAgreePrivacy();
			// 	if (!agree) {
			// 		this.$u.route({
			// 			type: 'redirectTo',
			// 			url: 'pages/licenceScreen/licenceScreen'
			// 		})
			// 	}
			// }
			// #endif
			this.getBanner('HOME_POPUP', 'popList')
		},
		onPullDownRefresh() {
			this.queryData()
		},
		onShow() {
			// #ifdef APP-PLUS  
			setTimeout(() => {
				plus.navigator.setStatusBarStyle('dark');
			}, 200)
			// #endif
			this.queryData()
			// this.getNew()
			// this.getGoods()
			// this.getStation();
		},
		methods: {
			// 请求数据
			queryData(){
				this.getBanner('HOME_BANNER', 'bannerList')
				this.getBanner('HOME_VICE_BANNER', 'adList')
				this.getBanner('FOOTER_AD', 'subAdList')
				this.getNavList()
				this.getProjectLable()
				this.getProject()
				this.getRecommenGoods()
				
				if (this.vuex_token) {
					this.getCardList()
				}
				if (this.location_per) {
					this.getLocation();
				}
			},
			
			getLocation() {
				const that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: res => {
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.$u.vuex('location_per', true);
						// console.log(111)
						that.getStation();
					},
					fail: (err) => {
						// #ifdef H5
						that.$u.vuex('location_per', true);
						// #endif
						that.getStation();
						// that.$u.toast(JSON.stringify(err));
					}
				});
			},
			getCardList() {
				this.$u.api.getOilCardList().then(res => {
					this.cardList = res.records || []
				})
			},
			getBanner: function(position, name) {
				this.$u.api.getAdList({
					position
				}).then(res => {
					if (position === "HOME_POPUP") {
						this.adShow = res.total > 0
					}
					this[name] = res.records || []
				}).catch(err => {
					console.log('err', err)
				})
			},
			getNavList() {
				this.$u.api.getNavList().then(res => {
					this.navList = res || []
				}).catch(err => {
					console.log('err', err)
				})
			},
			getProjectLable: function() {
				this.$u.api.getLableList({
					pageNum: 1,
					pageSize: 2,
				}).then(res => {
					console.log('getLableList', res)
					this.labelList = res.records || []
				}).catch(err => {
					console.log('err', err)
				})
			},
			// getNew: function() {
			// 	this.$u.api.getNewList().then(res => {
			// 		// console.log('getNewList', res)
			// 		this.newData = res || {}
			// 	}).catch(err => {
			// 		console.log('err', err)
			// 	})
			// },
			getProject: function() {
				this.$u.api.getProjectList({
					pageNum: 1,
					pageSize: 100
				}).then(res => {
					uni.stopPullDownRefresh()
					// console.log('getProjectList', res)
					this.projectList = res.records || []
				}).catch(err => {
					uni.stopPullDownRefresh()
					console.log('err', err)
				})
			},
			getRecommenGoods: function() {
				this.$u.api.getRecommendGoodsList().then(res => {
					this.goodsList = res || []
				}).catch(err => {
					console.log('err', err)
				})
			},
			getStation() {
				this.$u.api.getGasStation({
					lat: this.latitude,
					lng: this.longitude
				}).then(res => {
					// console.log(res)
					this.stations = res.list;
				})
			},

			handleMore() {
				console.log("more")
				if (this.limit == this.stations.length) {
					this.limit = 2;
				} else {
					this.limit = this.stations.length;
				}
			},
			handleBanner(index) {
				const item = this.bannerList[index]
				if (item && item.link) {
					this.$u.route({
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.name
						}
					})
				}
			},
			handleAd(index) {
				const item = this.adList[index]
				if (item && item.link) {
					this.$u.route({
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.name
						}
					})
				}
			},
			handlePopup(index) {
				const item = this.popList[index]
				if (item && item.link) {
					this.$u.route({
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.name
						}
					})
				}
				// console.log(item)
			},
			handleNav(item){
				console.log(item)
				if (item.url) {
					this.$u.route({
						url: item.url,
						type: item.type || 'navigateTo',
						params: item.params || {}
					})
				} else if (item.link) {
					this.$u.route({
						url: 'pages/webView/webView',
						params: {
							src: item.link,
							title: item.title
						}
					})
				}
			},

			handleDiscount(item) {
				this.$u.route({
					url: 'pages/discountDetail/discountDetail',
					params: item
				})
			},

			handleMeal(item) {
				this.$u.route({
					url: 'pages/oilRecharge/oilRecharge',
					params: item
				})
			},
			
			handleGoodsMore() {
				this.$u.route({
					url: 'pages/mallScreen/mallScreen'
				})
			},
			
			handleGoods(item) {
				this.$u.route({
					url: 'pages/goodsDetail/goodsDetail',
					params: { id: item.id }
				})
			},
			
			handleStation(item) {
				// console.log(item)
				// #ifdef APP-PLUS
				uni.openLocation({
					latitude: Number(item.gcj02Lat),
					longitude: Number(item.gcj02Lng),
					name: item.name,
					success(res) {
						console.log('success');
					},
					fail(err) {
						console.log(err);
					}
				})
				// #endif
			},
			// miaoshaEnd() {
			// 	this.miaoshaObj = {};
			// 	this.$refs.miaosha.clearTimer();
			// }
		}
	}
</script>

<style lang="scss">
	.home-screen {
		position: relative;
		z-index: 2;
		padding: 20rpx 0 0;
		background-color: #f5f5f5;

		.bg-img {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: -1;
			height: 438rpx;
			background: linear-gradient(180deg, #F09842 0%, #F09842 31%, rgba(240, 152, 66, 0) 100%);
		}

		.gradient1 {
			background-image: url('/static/image/bg-img1.png');
			background-size: 100% 100%;

			.name {
				background: linear-gradient(311deg, #F4E886 0%, #CEA210 100%);
			}
		}

		.gradient2 {
			background-image: url('/static/image/bg-img2.png');
			background-size: 100% 100%;

			.name {
				background: linear-gradient(311deg, #F4C586 0%, #CE4A10 100%);
			}
		}
	}
</style>

<style>
	.cell-x {
		margin: 0 30rpx 20rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}
	.cell-header {
		position: relative;
		
		padding: 24rpx 28rpx 30rpx;
		line-height: 44rpx;
		font-size: 32rpx;
		font-weight: Medium;
		font-family: PingFangSC-Medium, PingFang SC;;
	}
	.cell-header-more {
		position: absolute;
		top: 0;
		right: 0;
		padding: 30rpx 12rpx;
		
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #2F3032;
		line-height: 28rpx;
	}
	.cell-list {
		display: flex;
		overflow-x: auto;
	}
	.cell-i-project {
		position: relative;
		
		flex-shrink: 0;
		width: 164rpx;
		height: 200rpx;
		background-image: url('/static/image/home-bg-project.png');
		background-size: 100%;
		
		padding: 20rpx 0;
		text-align: center;
		color: #FE6719;
	}
	.cell-i-project + .cell-i-project {
		margin-left: 20rpx;
	}
	
	.hs-name {
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #111727;
		line-height: 32rpx;
	}
	.hs-amount {
		font-size: 44rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		line-height: 52rpx;
	}
	.hs-amount::before {
		content: '¥';
		
		padding-right: 4rpx;
		vertical-align: 4rpx;
		
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #FE6719;
		font-weight: 500;
		line-height: 34rpx;
	}
	.hs-amount::after {
		content: '/月';
		
		padding-left: 4rpx;
		vertical-align: 4rpx;
		
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
	}
	.hs-month {
		margin-top: 4rpx;
		
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #111727;
		line-height: 28rpx;
	}
	.hs-save {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 10rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 28rpx;
	}
	
	
	.cell-i-goods {
		width: 180rpx;
		text-align: center;
	}
	.cell-i-goods + .cell-i-goods {
		margin-left: 36rpx;
	}
	
	.hs-gname {
		margin-top: 4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #111727;
		line-height: 34rpx;
	}
	.hs-gamount {
		margin-top: 4rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #EC4848;
		line-height: 44rpx;
	}
	.hs-gamount::before {
		content: '¥';
		
		padding-right: 8rpx;
		/* vertical-align: 4rpx; */
		
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
	}
	
	.cell-label {
		margin: 20rpx 30rpx;
		
		display: flex;
		justify-content: space-between;
		
		text-align: center;
	}
	.label-x {	
		position: relative;
		width: 334rpx;
		height: 382rpx;
		
		background-image: url('/static/image/home-bg-label.png');
		background-size: 100%;
		background-color: transparent;
		
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
	.hsl-tag-x {
		position: absolute;
		
		padding: 6rpx 20rpx;
		border-radius: 16rpx 19rpx 19rpx 0rpx;
		background: #FEF2EB;
	}
	.hsl-tag-x {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FF8530;
		line-height: 28rpx;
	}
	.hsl-name {
		position: absolute;
		top: 12rpx;
		right: 26rpx;
		
		font-size: 24rpx;
		color: #111727;
		line-height: 34rpx;
	}
	.hsl-sale {
		padding-top: 80rpx;
		
		font-size: 60rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #FE6719;
		line-height: 70rpx;
	}
	.hsl-sale::after {
		content: '元';
		
		padding-left: 8rpx;
		vertical-align: 4rpx;
		
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		line-height: 50rpx;
	}
	.hsl-info {
		margin-top: 20rpx;
		
		font-size: 28rpx;
		color: #111727;
		line-height: 40rpx;
	}
	.hsl-total {
		margin-top: 16rpx;
		
		font-size: 24rpx;
		color: #9FA5AC;
		line-height: 34rpx;
		
		text-decoration: line-through;
	}
	.hsl-btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 22rpx;
		
		width: 160rpx;
		height: 56rpx;
		margin: auto;
		
		line-height: 56rpx;
		background: rgba(253, 132, 58, 0.1);
		border-radius: 28rpx;
		
		text-align: center;
		
		
		font-size: 28rpx;
		color: #FD843A;
	}
	
	.cell-y {
		position: relative;
		margin: 0 30rpx 20rpx;
		border-radius: 16rpx;
		font-size: 0;
		min-height: 470rpx;
	}
	.hs-ad {
		display: inline-block;
		width: 335rpx;
		overflow: hidden;
	}
	.hs-ad.hs-ad-0 {
		position: absolute;
		height: 470rpx;
		border-radius: 8rpx;
	}
	.hs-ad.hs-ad-1, .hs-ad.hs-ad-2 {
		margin-left: 350rpx;
		height: 226rpx;
		margin-bottom: 20rpx;
	}
	.hs-ad.hs-ad-3, .hs-ad.hs-ad-4 {
		height: 172rpx;
		border-radius: 16rpx;
	}
	.hs-ad.hs-ad-4 {
		margin-left: 20rpx;
	}
</style>
