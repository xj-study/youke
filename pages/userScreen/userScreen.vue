<template>
	<view class="user-screen">
		<view class="bg-img"></view>
		<view class="wrap">
			<view class="u-status-bar" :style="{ height: (vue_systemInfo.statusBarHeight || 0) + 'px' }"></view>
			<view style="margin: 0 10rpx;">
				<view class="u-flex u-col-center u-row-between" style="font-size: 40rpx; font-weight: bold;">
					<view v-if="vuex_token" class="">{{vuex_user.nickName}}</view>
					<view v-else @click="navigateTo('/pages/loginScreen/loginScreen')">点击登录/注册</view>
					<view class="u-flex u-col-center u-row-between" style="padding: 40rpx 50rpx">
						<view class="u-flex-col u-col-center u-row-center" style="padding:0 4rpx; width: 166rpx;"
							@click="navigateTo('pages/couponScreen/couponScreen')">
							<view class="u-line-1 u-text-center"
								style="width: 100%;font-size: 40rpx;font-weight: bold;">
								{{couponTotal}}
							</view>
							<view style="font-size: 24rpx; margin: 8rpx 0;">优惠券</view>
						</view>
					</view>
				</view>
			</view>
			<view class="u-flex u-flex-wrap u-row-between" style="padding: 24rpx 0;">
				<view v-for="(item,index) in navList" :key="index" @click="handleNav(item)"
					style="width: 50%; padding: 10rpx 10rpx;">
					<view class="u-flex u-row-center" :style="[{backgroundImage:'url(' + item.bgImg + ')' }, {backgroundSize: '100% 100%', 
					width: '100%', height: '160rpx'}]">
						<u-image mode="aspectFit" width="72rpx" height="72rpx" :src="item.image" />
						<view class="u-line-1"
							style="font-size: 28rpx; color: #333; padding: 0 20rpx;font-weight: bold;">
							{{item.title}}
						</view>
					</view>
					<!-- 		
				 -->
				</view>
			</view>
			<view style="margin: 22rpx 10rpx 24rpx;">
				<u-cell-group style="margin: 20rpx 0 0;" :border="false">
					<u-cell-item icon="question-circle" icon-size="36" :border-bottom="false" title="帮助中心"
						style="padding: 30rpx 0;" hover-class="none" value="有问题点这里"
						:title-style="{'fontSize': '32rpx', 'color': '#333', 'marginLeft': '4rpx'}"
						@click="navigateTo('pages/helpScreen/helpScreen')" />
					<u-cell-item icon="kefu-ermai" icon-size="36" :border-bottom="false" title="联系我们"
						style="padding: 30rpx 0;" hover-class="none"
						:title-style="{'fontSize': '32rpx', 'color': '#333', 'marginLeft': '4rpx'}"
						@click="navigateTo('pages/contactScreen/contactScreen')" />
					<u-cell-item icon="star" icon-size="36" :border-bottom="false" title="关于我们"
						style="padding: 30rpx 0;" hover-class="none"
						:title-style="{'fontSize': '32rpx', 'color': '#333', 'marginLeft': '4rpx'}"
						@click="handleLink(AboutUrl, '关于我们')" />
					<u-cell-item icon="map" icon-size="36" :border-bottom="false" title="地址管理" style="padding: 30rpx 0;"
						hover-class="none" @click="navigateTo('pages/addressScreen/addressScreen')"
						:title-style="{'fontSize': '32rpx', 'color': '#333', 'marginLeft': '4rpx'}" />
					<u-cell-item :border-bottom="false" :arrow="false" icon="error-circle" icon-size="36" title="版本信息"
						hover-class="none" :value="'v'+Version" style="padding: 30rpx 0;"
						:title-style="{'fontSize': '32rpx', 'color': '#333', 'marginLeft': '4rpx'}">
					</u-cell-item>
				</u-cell-group>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="u-text-center" style="font-size: 24rpx;">
				<text style="text-decoration: underline; color: #FF6200;"
					@click="handleLink(ServiceUrl, '用户协议')">用户协议</text>
				<text style="margin: 0 8rpx; color: #aaa;"> & </text>
				<text style="text-decoration: underline; color: #FF6200;"
					@click="handleLink(PrivacyUrl, '隐私政策')">隐私政策</text>
			</view>
			<!-- #endif -->
			<view v-if="vuex_token" class="u-text-center" style="color: #ccc; font-size: 26rpx; padding: 20rpx 0;
				 background-color: #fff; border-radius: 10rpx; margin: 62rpx 0 12rpx;" @click="show=true">
				退出当前账号</view>
			<view v-if="vuex_token" class="u-text-center" style="color: #ccc; font-size: 26rpx; padding: 20rpx 0;
					 background-color: #fff; border-radius: 10rpx; margin: 12rpx 0;" @click="show1=true">
				账号注销</view>
		</view>
		<u-modal ref="uModal" v-model="show" :show-title='false' content="确定退出当前账号？" :show-cancel-button="true"
			@confirm="confirm" :async-close="true">
		</u-modal>
		<u-modal ref="uModal" v-model="show1" :show-title='false' :mask-close-able="true" @confirm="logOff"
			:async-close="true" :confirm-style="{'background': '#F66866', 'color': '#fff',
			'fontSize': '32rpx', 'margin': '0 40rpx 52rpx', 'borderRadius': '20rpx', 'height': '98rpx'}">
			<view slot="default" class="u-flex-col u-row-center u-col-center" style="padding: 32rpx 40rpx 52rpx;">
				<u-image width="170rpx" height="114rpx" src="/static/image/logo1.png" />
				<view class="u-font-36 u-m-t-10" style="font-weight: bold;">注销该账号</view>
				<view class="u-font-32 u-m-t-64 u-text-center">注销账号前，请确认账户内没有 执行中的订单</view>
				<view class="u-m-t-68" style="color: #8C8C8C; font-size: 18rpx;">
					点击下方的注销按钮，即表示您已经阅读并同意
					<text style="color: #F66866;" @click="handleLink(LogOffUrl, '注销协议')">《用户注销协议》</text>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		Version,
		PrivacyUrl,
		ServiceUrl,
		AboutUrl,
		LogOffUrl
	} from '@/common/config.js'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				PrivacyUrl,
				ServiceUrl,
				AboutUrl,
				LogOffUrl,
				Version,
				navList: [{
					title: '充值订单',
					bgImg: '/static/image/user-bg1.png',
					image: '/static/image/user-nav1.png',
					url: 'pages/oilOrderScreen/oilOrderScreen'
				}, {
					title: '商城订单',
					bgImg: '/static/image/user-bg.png',
					image: '/static/image/user-nav2.png',
					url: 'pages/mallOrderScreen/mallOrderScreen'
				}, {
					title: '充值计划',
					bgImg: '/static/image/user-bg2.png',
					image: '/static/image/user-nav3.png',
					url: 'pages/oilPlanScreen/oilPlanScreen'
				}, {
					title: '油卡管理',
					bgImg: '/static/image/user-bg3.png',
					image: '/static/image/user-nav4.png',
					url: 'pages/oilCardScreen/oilCardScreen'
				}],
				couponTotal: 0,
				show: false,
				show1: false
			};
		},
		onLoad() {
			this.getInfo()
			this.getCoupon()
		},
		computed: {
			...mapState(['vuex_user', 'vuex_token'])
		},
		onPullDownRefresh() {
			this.getInfo()
			this.getCoupon()
		},
		methods: {
			getInfo: function() {
				this.$u.api.getUserInfo().then(res => {
					uni.stopPullDownRefresh()
					this.$u.vuex('vuex_user', res || {})
				}).catch(() => {
					uni.stopPullDownRefresh()
				})
			},
			getCoupon: function() {
				this.$u.api.getCouponList({
					status: 0
				}).then(res => {
					this.couponTotal = res.total || 0
				}).catch(err => {
					console.log('err', err)
				})
			},
			handleNav(item) {
				// console.log(item)
				if (item.url) {
					this.navigateTo(item.url, item.type || 'navigateTo', item.params || {})
				}
			},
			handleLink(src, title) {
				this.navigateTo('pages/webView/webView', 'navigateTo', {
					src,
					title
				})
			},
			navigateTo(url, type = 'navigateTo', params = {}) {
				this.$u.route({
					url,
					type,
					params
				})
			},
			confirm() {
				this.show = false;
				this.$u.vuex('vuex_token', '')
				this.$u.vuex('vuex_user', {})
				this.$u.route({
					url: '/pages/loginScreen/loginScreen'
				})
			},
			logOff() {
				this.show1 = false;
				this.$u.api.logOff().then(res => {
					this.$u.vuex('vuex_token', '')
					this.$u.vuex('vuex_user', {})
					this.$u.route({
						url: '/pages/loginScreen/loginScreen'
					})
				}).catch(err => {
					console.log('err', err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-screen {
		position: relative;
		z-index: 99;
		padding: 80rpx 0;

		.bg-img {
			height: 325rpx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: -1;
			background-image: url('/static/image/user-bg.png');
			background-size: 100% 100%;
			// background: linear-gradient(80deg, #FFA200 0%, #FF6200 100%);
		}

		.nav-bg {
			height: 100%;
			width: 100%;
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
		}

		.wrap {
			padding: 0 22rpx;
		}
	}
</style>
