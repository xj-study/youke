<template>
	<view class="login-screen" :style="{paddingTop: (vue_systemInfo.statusBarHeight || 0) + 'px'}">
		<!-- <view>{{vue_supportQuick}}</view> -->
		<view class="login-guide" v-if="vue_supportQuick && isQuick">
			<view class="u-status-bar" :style="{ height: (vue_systemInfo.statusBarHeight || 0) + 'px' }"></view>
			<view style="color: #333; font-size: 36rpx; font-weight: bold;">欢迎使用加油省车主</view>
			<view class="u-flex-col u-col-center" style="margin-top: 155rpx">
				<u-button :loading="isloading" @click="loginQuick()" :ripple="true" size="mini"
					:custom-style="{'width': '540rpx', 'height': '88rpx' ,'color': '#fff',
				'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 'fontSize': '32rpx', 'borderRadius': '10rpx', 'margin': '25rpx 0'}">
					一键登录</u-button>
				<u-button :loading="isloading" @click="isQuick = false" :ripple="true" size="mini" :custom-style="{'width': '536rpx', 'height': '88rpx' ,'color': '#FF6800', 'border': 'solid 2rpx #FF6800',
						'background': '#fff', 'fontSize': '32rpx', 'borderRadius': '10rpx', 'margin': '25rpx 0'}">
					其他方式登录</u-button>
			</view>
			<view class="u-text-center"
				style="position: absolute; bottom: 70rpx; left: 32rpx; right: 32rpx; color: #aaa;font-size: 26rpx;">
				<view>首次验证码登录即注册</view>
			</view>
		</view>
		<view v-else class="login-wrap">
			<view class="tab-wrap u-flex u-row-center u-col-center">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="680" height="88" font-size="30" active-color="#333" inactive-color="#aaa"
					:active-item-style="{'fontSize': '36rpx', 'fontWeight': 'bold'}" bar-width="30" bar-height="4"
					:bar-style="{'background': '#FF6800', 'borderRadius': '3rpx', 'bottom': '0'}" style="width: 80%" />
			</view>
			<swiper class="swiper-wrap" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<u-form class="swiper-item-form" ref="uForm1" :model="form1">
						<u-form-item class="form-item" prop="username">
							<u-input type="number" maxlength='11' v-model="form1.username" placeholder="请输入手机号"
								:placeholder-style="styleP" />
						</u-form-item>
						<u-form-item class="form-item" prop="password">
							<u-input type="password" v-model="form1.password" placeholder="请输入密码"
								:placeholder-style="styleP" />
						</u-form-item>
					</u-form>
					<view class="u-flex u-row-center" style="margin: 90rpx 0 32rpx;">
						<u-button :loading="isloading" @click="loginAuth()" :ripple="true" size="mini" :custom-style="{'width': '540rpx', 'height': '88rpx' ,'color': '#fff',
						'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 'fontSize': '32rpx', 'borderRadius': '10rpx'}">
							登录</u-button>
					</view>
					<view class="u-flex u-row-center">
						<text style="color: #FF6200;"
							@click="handleNav({url: 'pages/homeScreen/homeScreen', type:'tab'})">返回首页</text>
					</view>
					<!-- 		<navigator open-type="switchTab" url="/pages/homeScreen/homeScreen"
						style="color: #FF6200; text-align: center; ">返回首页</navigator> -->
				</swiper-item>
				<swiper-item class="swiper-item">
					<u-form ref="uForm2" class="swiper-item-form" :model="form2">
						<u-form-item class="form-item" prop="mobile">
							<u-input type="number" maxlength='11' v-model="form2.mobile" placeholder="请输入手机号"
								:placeholder-style="styleP" />
						</u-form-item>
						<u-form-item class="form-item" prop="imgCode">
							<u-input v-model="form2.imgCode" placeholder="请输入图形验证码" :placeholder-style="styleP" />
							<view slot="right">
								<u-image width="144rpx" height="52rpx" :src="authImage" @click="getImageCode">
								</u-image>
							</view>
						</u-form-item>
						<u-form-item class="form-item" prop="code">
							<u-input v-model="form2.code" placeholder="请输入验证码" :placeholder-style="styleP" />
							<view slot="right">
								<u-verification-code ref="uCode" :seconds="60" @change="codeChange" startText="获取验证码"
									changeText="X秒重新获取" endText="重新获取" @end="end" @start="start">
								</u-verification-code>
								<u-button @click="getRegCaptcha()" :plain="true" hover-class="none" size="mini"
									:custom-style="{'color': isSend ? '#C7CBC8' : '#FF6800','fontSize': '26rpx',
									 'borderRadius': '40rpx', 'padding': '0'}">{{tips}}</u-button>
							</view>
						</u-form-item>
					</u-form>
					<view class="u-flex u-row-center" style="margin: 90rpx 0 32rpx;">
						<u-button :loading="isloading" @click="loginCode()" :ripple="true" size="mini" :custom-style="{'width': '540rpx', 'height': '88rpx' ,'color': '#fff',
						'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 'fontSize': '32rpx', 'borderRadius': '10rpx'}">
							登录</u-button>
					</view>
					<!-- 		<navigator open-type="switchTab" url="/pages/homeScreen/homeScreen"
						style="color: #FF6200; text-align: center;">返回首页</navigator> -->
					<view class="u-flex u-row-center">
						<text style="color: #FF6200;"
							@click="handleNav({url: 'pages/homeScreen/homeScreen', type:'tab'})">返回首页</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="agree-box u-text-center" style="font-size: 26rpx;">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="cb" color="#FF6200" style="transform:scale(0.6)" />
					<text>同意</text>
					<text style="text-decoration: underline; color: #FF6200;"
						@click="handleLink(ServiceUrl, '用户协议')">用户协议</text>
					<text style="margin: 0 8rpx; color: #aaa;"> & </text>
					<text style="text-decoration: underline; color: #FF6200;"
						@click="handleLink(PrivacyUrl, '隐私政策')">隐私政策</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {
		Channel,
		PrivacyUrl,
		ServiceUrl,
	} from '@/common/config.js'
	export default {
		data() {
			return {
				PrivacyUrl,
				ServiceUrl,
				isQuick: true,
				tabs: [{
					name: '账户密码登录',
				}, {
					name: '验证码登录',
				}],
				current: 1,
				swiperCurrent: 1,
				styleP: "fontSize: 28rpx; color: #aaa",
				authImage: '',
				tips: '',
				isSend: false,
				form1: {
					username: '',
					password: '',
				},
				form2: {
					code: '',
					mobile: '',
					imgCode: '',
					imgToken: ''
				},
				rules1: {
					username: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '请输入正确手机号',
						trigger: ['blur'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
				},
				rules2: {
					mobile: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '请输入正确手机号',
						trigger: ['blur'],
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					imgCode: [{
						required: true,
						message: '请输入图形验证码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
				},
				isloading: false,
				isAgree: false
			}
		},
		onLoad() {
			this.getImageCode()
		},
		onReady() {
			this.$refs.uForm1 && this.$refs.uForm1.setRules(this.rules1);
			this.$refs.uForm2 && this.$refs.uForm2.setRules(this.rules2);
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.changeType(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				if (current != this.current) {
					this.changeType(current)
				}
				this.current = current;
			},
			changeType(current) {
				if (current == 0) {
					this.$refs.uForm2 && this.$refs.uForm2.resetFields()
				}
				if (current == 1) {
					this.getImageCode()
					this.$refs.uForm1 && this.$refs.uForm1.resetFields()
				}
			},
			// 快捷登录
			loginQuick() {
				if (!this.isAgree) {
					this.$u.toast('未勾选同意协议');
					return;
				}
				const that = this
				that.isloading = true
				uni.login({
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						//参考`univerifyStyle 数据结构`
						privacyTerms: {
							defaultCheckBoxState: false,
						}
					},
					success(res) { // 登录成功
						const form = {
							'access_token': res.authResult.access_token,
							// 客户端一键登录接口返回的openid
							'openid': res.authResult.openid,
							'channel': Channel,
						}
						if (that.vue_systemInfo) {
							form.devId = that.vue_systemInfo.deviceId
						}
						uniCloud.callFunction({
							name: 'loginQuick', // 你的云函数名称
							data: form
						}).then(res => {
							// 登录成功，可以关闭一键登陆授权界面了
							that.isloading = false
							// console.log('loginQuick', res)
							if (res.success) {
								const data = res.result
								that.$u.vuex('vuex_token', data.token || '')
								that.$u.vuex('vuex_user', data || {})
								that.$u.toast('登录成功', 1000);
								that.goback()
								uni.closeAuthView()
							} else {
								that.$u.toast('登录失败');
							}
						}).catch(err => {
							that.isloading = false
							that.$u.toast('登录失败');
						})
					},
					fail(err) { // 登录失败
						// console.log(err)
						that.isloading = false
						if (err.code === 30002) {
							that.isQuick = false
						} else {
							that.$u.toast('登录失败');
						}
					}
				})

			},
			// 获取图形验证码
			getImageCode() {
				this.$u.api.getAuthImage().then(res => {
					// console.warn(res)
					this.form2.imgToken = res.token
					this.authImage = res.image.replace(/[\r\n]/g, "")
				}).catch(err => {
					console.log('err', err)
				})
			},
			// 获取短信验证码
			getRegCaptcha() {
				if (this.$refs.uCode.canGetCode) {
					const {
						imgCode,
						mobile,
						imgToken
					} = this.form2
					if (!mobile) {
						this.$u.toast('请输入手机号', 1000);
						return
					} else if (!this.$u.test.mobile(mobile)) {
						this.$u.toast('请输入正确手机号', 1000);
						return
					}
					if (!imgCode) {
						this.$u.toast('请输入图形验证码', 1000);
						return
					}
					this.$u.api.getRegCaptcha({
						imgCode,
						mobile,
						imgToken
					}).then(res => {
						this.$u.toast('发送成功', 1000);
						this.$refs.uCode.start();
					}).catch(err => {
						this.getImageCode()
						console.log('err', err)
					})
				}
			},
			// 验证码倒计时
			codeChange(text) {
				this.tips = text;
			},
			start() {
				// console.log('倒计时开始')
				this.isSend = true
			},
			end() {
				// console.log('倒计时结束')
				this.isSend = false
			},
			// 账号密码登录
			loginAuth() {
				if (!this.isAgree) {
					this.$u.toast('未勾选同意协议');
					return;
				}
				this.$refs.uForm1.validate(valid => {
					if (valid) {
						this.isloading = true
						const form = this.form1
						form.channel = Channel
						if (this.vue_systemInfo) {
							form.devId = this.vue_systemInfo.deviceId
						}
						this.$u.api.loginAuth(form).then(
							res => {
								this.isloading = false
								this.$u.vuex('vuex_token', res.token || '')
								this.$u.vuex('vuex_user', res || {})
								this.$u.toast('登录成功', 1000);
								this.goback()
							}).catch(() => {
							this.isloading = false
						})
					} else {
						console.log('验证失败');
					}
				})
			},
			// 短信验证码登录
			loginCode() {
				if (!this.isAgree) {
					this.$u.toast('未勾选同意协议');
					return;
				}
				this.$refs.uForm2.validate(valid => {
					if (valid) {
						this.isloading = true
						const form = this.form2
						form.channel = Channel
						if (this.vue_systemInfo) {
							form.devId = this.vue_systemInfo.deviceId
						}
						this.$u.api.loginCode(form).then(
							res => {
								this.isloading = false
								this.$u.vuex('vuex_token', res.token || '')
								this.$u.vuex('vuex_user', res || {})
								this.$u.toast('登录成功', 1000);
								this.goback()
							}).catch(() => {
							this.isloading = false
						})
					} else {
						console.log('验证失败');
					}
				})
			},
			handleLink(src, title) {
				this.$u.route({
					url: 'pages/webView/webView',
					params: {
						src,
						title
					}
				})
			},
			checkboxChange(e) {
				// console.log(e.detail.value)
				this.isAgree = e.detail.value.length > 0;
			},
			handleNav(item) {
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
			goback() {
				setTimeout(() => {
					const pages = getCurrentPages();
					// const prevPage = pages[pages.length - 2];
					// console.log(pages)
					if (pages.length > 1) {
						const prevPage = pages[pages.length - 2];
						prevPage.$vm.refresh = true
						this.$u.route({
							type: 'back',
							delta: 1
						})
					} else {
						this.$u.route({
							type: 'tab',
							url: 'pages/homeScreen/homeScreen'
						})
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fff;
	}

	.login-screen {
		height: 100%;
		padding-bottom: 88rpx;


		.login-guide {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 50rpx 32rpx 70rpx;
		}

		.login-wrap {
			height: 100%;
			padding-top: 100rpx;

			.tab-wrap {}

			.swiper-wrap {
				height: 100%;

				.swiper-item {
					.swiper-item-form {
						padding: 40rpx 32rpx;

						.form-item {
							padding: 0;
							margin-top: 40rpx;
						}
					}
				}
			}
		}

		.agree-box {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 150rpx;
		}
	}
</style>
