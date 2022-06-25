<template>
	<view class="user-screen">
		<view class="bg-img"></view>
		<view class="wrap">
			<view class="u-status-bar" :style="{ height: (vue_systemInfo.statusBarHeight || 0) + 'px' }"></view>
			<view style="margin: 112rpx 0 40rpx 0;">
				<view class="u-flex u-col-center u-row-between user_box" style="font-size: 40rpx; font-weight: bold;">
					<view v-if="vuex_token" class="user-wrap">
					<view class="user_image"></view>
					<view>{{ vuex_user.nickName }}</view>
					</view>
					<view v-else @click="navigateTo('/pages/loginScreen/loginScreen')">点击登录/注册</view>
						<view class="concat-us" @click="linkToConcat">
							<view class="image concat_image">
							</view>
							<view class="concat_text">客服</view>
						</view>
				</view>
			</view>
			<view class="card_box">
				<view class="card_header">
					<view class="card_left">
						<view class="card_tips">可用优惠券</view>
						<view class="card_num">
							<text class="text_large">{{ couponTotal }}</text>
							张
						</view>
					</view>
					<view class="card_btn u-flex u-row-center u-col-center" @click="navigateTo('pages/couponScreen/couponScreen')">查看</view>
				</view>
				<view class="card_content">
					<view class="card_item" v-for="(x, y) in navList" :key="y" @click="handleNav(x)">
						<view class="card_image"><u-image mode="aspectFit" width="56rpx" height="56rpx" :src="x.image" /></view>

						<view class="card_text">{{ x.title }}</view>
					</view>
				</view>
			</view>
			<view class="banner_box">
				<view class="bannder_item bannder_item1" @click="navigateTo('pages/helpScreen/helpScreen')">
					
					</view>
				<view class="bannder_item bannder_item2" @click="navigateTo('pages/about/index')"></view>
			</view>
			<view class="add_box" @click="handleNav({ url: '/pages/oilCardCreate/oilCardCreate' })">
				<view class="add_icon"></view>
				<view class="add_content">
					<view class="add_title">
						添加油卡
						<view class="add_tips">送话费</view>
					</view>
					<view class="add_more">更多优惠活动提前知</view>
				</view>
			</view>
			<view class="u-flex u-flex-wrap u-row-between" style="padding: 24rpx 0;" v-if="false">
				<view v-for="(item, index) in navList" :key="index" @click="handleNav(item)" style="width: 50%; padding: 10rpx 10rpx;">
					<view class="u-flex u-row-center" :style="[{ backgroundImage: 'url(' + item.bgImg + ')' }, { backgroundSize: '100% 100%', width: '100%', height: '160rpx' }]">
						<u-image mode="aspectFit" width="72rpx" height="72rpx" :src="item.image" />
						<view class="u-line-1" style="font-size: 28rpx; color: #333; padding: 0 20rpx;font-weight: bold;">{{ item.title }}</view>
					</view>
					<!-- 		
				 -->
				</view>
			</view>
			<view style="margin: 22rpx 10rpx 24rpx;" v-if="false">
				<u-cell-group style="margin: 20rpx 0 0;" :border="false">
					<u-cell-item
						icon="question-circle"
						icon-size="36"
						:border-bottom="false"
						title="帮助中心"
						style="padding: 30rpx 0;"
						hover-class="none"
						value="有问题点这里"
						:title-style="{ fontSize: '32rpx', color: '#333', marginLeft: '4rpx' }"
						@click="navigateTo('pages/helpScreen/helpScreen')"
					/>
					<u-cell-item
						icon="kefu-ermai"
						icon-size="36"
						:border-bottom="false"
						title="联系我们"
						style="padding: 30rpx 0;"
						hover-class="none"
						:title-style="{ fontSize: '32rpx', color: '#333', marginLeft: '4rpx' }"
						@click="navigateTo('pages/contactScreen/contactScreen')"
					/>
					<u-cell-item
						icon="star"
						icon-size="36"
						:border-bottom="false"
						title="关于我们"
						style="padding: 30rpx 0;"
						hover-class="none"
						:title-style="{ fontSize: '32rpx', color: '#333', marginLeft: '4rpx' }"
						@click="handleLink(AboutUrl, '关于我们')"
					/>
					<u-cell-item
						icon="map"
						icon-size="36"
						:border-bottom="false"
						title="地址管理"
						style="padding: 30rpx 0;"
						hover-class="none"
						@click="navigateTo('pages/addressScreen/addressScreen')"
						:title-style="{ fontSize: '32rpx', color: '#333', marginLeft: '4rpx' }"
					/>
					<u-cell-item
						:border-bottom="false"
						:arrow="false"
						icon="error-circle"
						icon-size="36"
						title="版本信息"
						hover-class="none"
						:value="'v' + Version"
						style="padding: 30rpx 0;"
						:title-style="{ fontSize: '32rpx', color: '#333', marginLeft: '4rpx' }"
					></u-cell-item>
				</u-cell-group>
			</view>

			<view v-if="vuex_token" class="u-text-center logout_btn" @click="show = true">退出当前账号</view>
			<view v-if="vuex_token" class="u-text-center logcancel_btn" @click="show1 = true">账号注销</view>

			<view class="u-text-center" style="font-size: 24rpx;">
				<text style="text-decoration: underline; color: #5874FE;" @click="handleLink(ServiceUrl, '用户协议')">用户协议</text>
				<text style="margin: 0 8rpx; color: #aaa;">&</text>
				<text style="text-decoration: underline; color: #5874FE;" @click="handleLink(PrivacyUrl, '隐私政策')">隐私政策</text>
			</view>
		</view>
		<u-modal ref="uModal" v-model="show" :show-title="false" content="确定退出当前账号？" :show-cancel-button="true" @confirm="confirm" :async-close="true"></u-modal>
		<u-modal
			ref="uModal"
			v-model="show1"
			:show-title="false"
			:mask-close-able="true"
			@confirm="logOff"
			:async-close="true"
			:confirm-style="{ background: '#F66866', color: '#fff', fontSize: '32rpx', margin: '0 40rpx 52rpx', borderRadius: '20rpx', height: '98rpx' }"
		>
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
import { Version, PrivacyUrl, ServiceUrl, AboutUrl, LogOffUrl } from '@/common/config.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			PrivacyUrl,
			ServiceUrl,
			AboutUrl,
			LogOffUrl,
			Version,
			navList: [
				{
					title: '充值订单',
					// bgImg: '/static/image/.png',
					image: '/static/image/user/item1.png',
					url: 'pages/oilOrderScreen/oilOrderScreen'
				},
				{
					title: '地址管理',
					bgImg: '/static/image/user-bg3.png',
					image: '/static/image/user/item2.png',
					url: 'pages/addressScreen/addressScreen'
				},
				{
					title: '充值计划',
					bgImg: '/static/image/user-bg2.png',
					image: '/static/image/user/item3.png',
					url: 'pages/oilPlanScreen/oilPlanScreen'
				},
				{
					title: '商城订单',
					// bgImg: '/static/image/user-bg.png',
					image: '/static/image/user/item4.png',
					url: 'pages/mallOrderScreen/mallOrderScreen'
				}
			],
			couponTotal: 0,
			show: false,
			show1: false
		};
	},
	onLoad() {
		this.getInfo();
		this.getCoupon();
	},
	computed: {
		...mapState(['vuex_user', 'vuex_token'])
	},
	onPullDownRefresh() {
		this.getInfo();
		this.getCoupon();
	},
	methods: {
		getInfo: function() {
			this.$u.api
				.getUserInfo()
				.then(res => {
					uni.stopPullDownRefresh();
					this.$u.vuex('vuex_user', res || {});
				})
				.catch(() => {
					uni.stopPullDownRefresh();
				});
		},
		linkToConcat(){
			uni.switchTab({
						url: '/pages/contact/contact'
					})
		},
		getCoupon: function() {
			this.$u.api
				.getCouponList({
					status: 0
				})
				.then(res => {
					this.couponTotal = res.total || 0;
				})
				.catch(err => {
					console.log('err', err);
				});
		},
		handleNav(item) {
			// console.log(item)
			if (item.url) {
				this.navigateTo(item.url, item.type || 'navigateTo', item.params || {});
			}
		},
		handleLink(src, title) {
			this.navigateTo('pages/webView/webView', 'navigateTo', {
				src,
				title
			});
		},
		navigateTo(url, type = 'navigateTo', params = {}) {
			this.$u.route({
				url,
				type,
				params
			});
		},
		confirm() {
			this.show = false;
			this.$u.vuex('vuex_token', '');
			this.$u.vuex('vuex_user', {});
			this.$u.route({
				url: '/pages/loginScreen/loginScreen'
			});
		},
		logOff() {
			this.show1 = false;
			this.$u.api
				.logOff()
				.then(res => {
					this.$u.vuex('vuex_token', '');
					this.$u.vuex('vuex_user', {});
					this.$u.route({
						url: '/pages/loginScreen/loginScreen'
					});
				})
				.catch(err => {
					console.log('err', err);
				});
		}
	}
};
</script>

<style lang="scss">
.user-screen {
	position: relative;
	z-index: 99;
	padding: 80rpx 0;

	.bg-img {
		height: 446rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
		background-image: url('/static/image/user/banner.png');
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
		padding: 0 30rpx;
	}
}
.logout_btn {
	width: 100%;
	height: 49 * 2rpx;
	background: #6d85fe;
	border-radius: 25px;
	border: 1px solid #5874fe;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #ffffff;
	font-weight: 500;
	margin-bottom: 20rpx;
}
.logcancel_btn {
	width: 100%;
	height: 49 * 2rpx;
	border-radius: 25px;
	border: 1px solid #c3c3c3;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #a0a0a0;
	font-weight: 500;
	margin-bottom: 80rpx;
}
.card_box {
	width: 100%;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	background: url('/static/image/user/card_banner.png');
	background-size: 100% 100%;
	.card_header {
		position: relative;
		width: 100%;
		height: 108rpx;
		background: #17284f;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		.card_left {
			text-align: left;
			.card_tips {
				font-size: 10px;
				font-weight: 500;
				color: #f4d19e;
				line-height: 14px;
			}
			.card_num {
				font-size: 28rpx;

				color: #f8f8f8;
				line-height: 38rpx;
				.text_large {
					font-weight: 900;
				}
			}
		}
		.card_btn {
			width: 122rpx;
			height: 56rpx;
			background: linear-gradient(68deg, #fce5c1 0%, #fecc84 100%);
			border-radius: 28rpx;
			font-weight: 500;
			color: #94540f;
			font-size: 28rpx;
		}
	}
	.card_content {
		height: 95 * 2rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding-bottom: 34rpx;
		.card_item {
			width: 25%;
			text-align: center;
			.card_text {
				font-weight: 400;
				color: #101218;
				font-size: 12px;
				line-height: 34rpx;
			}
			.card_image {
				display: flex;
				justify-content: center;
				margin-bottom: 10rpx;
			}
		}
	}
}
.banner_box {
	width: 100%;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.bannder_item {
		width: 167 * 2rpx;
		height: 140rpx;
		border-radius: 20rpx;
		overflow: hidden;
		&.bannder_item1{
			background:url('/static/image/user/nav1.png') center center no-repeat;
			background-size:100% 100%;
		}
		
		&.bannder_item2{
			background:url('/static/image/user/nav2.png') center center no-repeat;
			background-size:100% 100%;
		}
	}
}
.add_box {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	border-radius: 16rpx;
	height: 240rpx;
	margin-bottom:65*2rpx;
	.add_icon {
		position: relative;
		width: 76rpx;
		height: 76rpx;
		border-radius: 76rpx;
		margin-right: 40rpx;
		background:url('/static/image/user/add.png') center center no-repeat;
		background-size:100% 100%;
	}
	.add_title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #32323a;
		.add_tips {
			position: relative;
			top: -6px;
			left: 8px;
			width: 110rpx;
			height: 45rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: red;
			font-size: 10px;
			font-weight: 400;
			color: #ffffff;
			border-radius: 28rpx 28rpx 28rpx 0rpx;
		}
	}
	.add_more {
		margin-top: 8rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #898997;
	}
}
.user_box{
	position:relative;
	width:100%;
	height:100rpx;
	display:flex;
	justify-content:flex-start;
	align-items:center;
	.user-wrap{
		display:flex;
		justify-content:flex-start;
		align-items:center;
		.user_image{
			width:100rpx;
			height:100rpx;
			background:url('/static/image/package/72.png') center center no-repeat;
			background-size:100% 100%;
			border-radius:100rpx;
			margin-right:20rpx;
		}
	}
	.concat-us{
		position:absolute;
		right:0;
		top:50%;
		transform:translateY(-50%);
		text-align:center;
		.concat_image{
			width:38rpx;
			height:40rpx;
			background:url('/static/image/user/kefu.png') center center no-repeat;
			background-size:100% 100%;
		}
		.concat_text{
			font-size: 12px;
			font-weight: 400;
			line-height:34rpx;
			color: #101218;
		}
	}
}
</style>
