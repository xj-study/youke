<template>
	<view class="home-screen">
		<view class="u-status-bar" :style="{ height: (vue_systemInfo.statusBarHeight || 0) + 'px' }"></view>
		<u-swiper :list='bannerList' name='picUrl' :height="380" mode='none' interval='5000' :effect3d='true'
			imgMode="widthFix" effect3d-previous-margin='32' bg-color='unset' border-radius='8' @click="handleBanner" />
		<view style="margin: 20rpx 32rpx; border-radius: 8rpx;">
			<view class="u-flex u-flex-wrap u-row-between" style="padding: 16rpx 0; border-bottom: solid 4rpx #F9F9F9;">
				<view v-for="(item,index) in navList" :key="index" style="width: 25%; padding: 10rpx 0;"
					@click="handleNav(item)">
					<u-image width="64rpx" height="64rpx" :src="item.image" style="margin: 12rpx auto" />
					<view class="u-text-center u-line-1" style="color: #333; font-size: 24rpx;">{{item.title}}</view>
				</view>
			</view>
		</view>
		<swiper v-if="vuex_token && cardList.length > 0" style="height: 276rpx; margin: 0 32rpx 16rpx; ">
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
		<view v-else style="margin: 0 10rpx 16rpx; height: 320rpx; background-image: url('/static/image/oil-card-bg.png');
				background-size: 100% 100%;">
			<view class="u-flex u-row-center u-col-center" style="height: 100%;"
				@click="handleNav({url: !vuex_token ? 'pages/loginScreen/loginScreen' : '/pages/oilCardCreate/oilCardCreate'}) ">
				<view class="u-flex u-row-center u-col-center" style="border-radius: 36rpx; height: 72rpx; width: 72rpx;
					border: 5rpx #fff solid;">
					<u-icon name="plus" color="#fff" size="50"></u-icon>
				</view>
				<text style="color: #fff; margin: 0 16rpx; font-size: 36rpx;">添加油卡</text>
			</view>
		</view>
		<!-- 热门套餐 -->
		<view style="margin: 0 27rpx;">
			<view class="u-flex u-flex-wrap u-flex-1">
				<view v-for="(item,index) in projectList" :key="index" @click="handleMeal(item)"
					style="height: 166rpx; width: 33.3%; padding: 5rpx;">
					<view class="u-flex-col" style="width: 100%; height: 100%; position: relative; overflow: hidden;
					background-image: url('/static/image/home-bg1.png');background-size: 100% 100%">
						<view class="u-absolute" style="color: #fff; background-color: #F04B22; font-size: 18rpx;
						right: -42rpx; top: 12rpx; padding: 0 40rpx; transform: rotate(45deg);"> {{item.name}} </view>
						<view class="u-flex u-col-center u-row-center" style="padding: 6rpx; color: #CB834D;
						font-size: 24rpx">{{item.month}}个月</view>
						<view class="u-flex u-col-center u-row-center" style="margin-top: -10rpx;">
							<text style="font-size: 28rpx; color: #F04B22; margin-top: 8rpx;">¥</text>
							<text
								style="font-size: 48rpx; color: #F04B22; font-weight: 600;">{{ item.defaultAmount }}</text>
							<text style="font-size: 24rpx; color: #CB834D; margin-top: 8rpx;">/月</text>
						</view>
						<view class="u-flex-col u-col-center u-row-center u-line-1" style="color: #C57538;
						 font-size: 24rpx; margin-top: 12rpx">
							立省{{item.save}}元
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 限时秒杀-->
		<view style="margin: 20rpx 32rpx;" v-if="miaoshaObj.id && miaoshaObj.remainSeconds > 0">
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
		</view>
		<!--  -->
		<view v-if="adList.length > 0" style="margin: 20rpx 0;">
			<u-swiper :list='adList' name='picUrl' :height="206" mode='none' interval='5000' :effect3d='true'
				effect3d-previous-margin='32' bg-color='#F8F8F8' border-radius='8' @click="handleAd" />
		</view>

		<view v-if="subAdList.length > 0" class="u-flex" style="margin: 0 24rpx 20rpx; justify-content: space-between;">
			<view v-for="(item, index) in subAdList" :key="index" @click="handleNav(item)">
				<u-image height="330rpx" width='330rpx' :src="item.picUrl" />
			</view>
		</view>
		<!-- 	<view class="">
			location_per: {{location_per}}
		</view> -->
		<!-- 附近加油站 -->
		<view style="margin: 40rpx 0 0">
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
				miaoshaObj: {},
				labelMap: {
					1: '新人推荐',
					2: '特价秒杀',
					3: '热销推荐',
				},
				// newData: {},
				projectList: [],
				// goodsList: [],
				cardList: [],
				subAdList: []
			};
		},
		computed: {
			...mapState(['vuex_token', 'location_per', 'notify'])
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
			this.getBanner('HOME_BANNER', 'bannerList')
			this.getBanner('HOME_VICE_BANNER', 'adList')
			this.getBanner('FOOTER_AD', 'subAdList')
			this.getNavList()
			this.getSale()
			this.getProject()
			if (this.vuex_token) {
				this.getCardList()
			}
			if (this.location_per) {
				this.getLocation();
			}
		},
		onShow() {
			// #ifdef APP-PLUS  
			setTimeout(() => {
				plus.navigator.setStatusBarStyle('dark');
			}, 200)
			// #endif
			this.getBanner('HOME_BANNER', 'bannerList')
			this.getBanner('HOME_VICE_BANNER', 'adList')
			this.getBanner('FOOTER_AD', 'subAdList')
			this.getNavList()
			this.getSale()
			this.getProject()
			// this.getNew()
			// this.getGoods()
			// this.getStation();
			if (this.vuex_token) {
				this.getCardList()
			}
			if (this.location_per) {
				this.getLocation();
			}
		},
		methods: {
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
			getSale: function() {
				this.$u.api.getMiaosha({
					// pageNum: 1,
					// pageSize: 2,
					label: 4
				}).then(res => {
					// console.log('getLableList', res)
					this.miaoshaObj = res || {}
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
					pageSize: 3
				}).then(res => {
					uni.stopPullDownRefresh()
					// console.log('getProjectList', res)
					this.projectList = res.records || []
				}).catch(err => {
					uni.stopPullDownRefresh()
					console.log('err', err)
				})
			},
			// getGoods: function() {
			// 	this.$u.api.getGoodsList({
			// 		pageNum: 1,
			// 		pageSize: 3
			// 	}).then(res => {
			// 		this.goodsList = res.records || []
			// 	}).catch(err => {
			// 		console.log('err', err)
			// 	})
			// },
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
			miaoshaEnd() {
				this.miaoshaObj = {};
				this.$refs.miaosha.clearTimer();
			}
		}
	}
</script>

<style lang="scss">
	.home-screen {
		position: relative;
		z-index: 2;
		padding: 20rpx 0 0;

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
