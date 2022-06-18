<template>
	<view class="oil-card-create">
		<u-form class="create-form" :model="form" ref="uForm" label-width="200"
			:label-style="{'fontSize': '26rpx', 'color': '#333'}">
			<view class="top">
				<view class="form-title" style="">油卡类型</view>
				<u-form-item class="create-form-item">
					<view class="u-flex-col" style="width: 100%">
						<view class="radio-box u-flex u-row-between" @click="form.type=1">
							<view class="u-flex u-row-center">
								<u-image src="/static/image/oil-icon.png" width="66rpx" height="66rpx" />
								<view class="u-flex u-m-l-24 u-font-28">中石油</view>
							</view>
							<u-image :src="form.type == 1 ? '/static/image/radio-icon.png'
							: '/static/image/radio-icon_1.png'" width="42rpx" height="42rpx" />
						</view>
						<view class="radio-box u-flex u-row-between" @click="form.type=2">
							<view class="u-flex u-row-center">
								<u-image src="/static/image/oil-icon1.png" width="66rpx" height="66rpx" />
								<view class="u-flex u-m-l-24 u-font-28">中石化</view>
							</view>
							<u-image :src="form.type == 2 ? '/static/image/radio-icon.png'
								: '/static/image/radio-icon_1.png'" width="42rpx" height="42rpx" />
						</view>
					</view>
				</u-form-item>
			</view>
			<view class="bottom">
				<view class="form-title" style="">卡片信息</view>
				<u-form-item class="create-form-item" label="姓名" prop="name">
					<u-input v-model="form.name" placeholder="请输入持卡人姓名" :placeholder-style="styleP"
						input-align="right" />
				</u-form-item>
				<u-form-item class="create-form-item" label="手机号" prop="phone">
					<u-input v-model="form.phone" type="number" maxlength='11' placeholder="请输入持卡人手机号"
						:placeholder-style="styleP" input-align="right" />
				</u-form-item>
				<u-form-item class="create-form-item" label="油卡卡号" prop="account">
					<u-input v-model="form.account" placeholder="请输入油卡卡号" :placeholder-style="styleP"
						input-align="right" />
				</u-form-item>
				<u-form-item class="create-form-item" label="确认油卡卡号" prop="accountAgian" :border-bottom="false">
					<u-input v-model="form.accountAgian" placeholder="请再次输入油卡卡号" :placeholder-style="styleP"
						input-align="right" />
				</u-form-item>
			</view>
			<view class="btn">
				<u-button :loading="isloading" @click="submit" :ripple="true" size="mini" :custom-style="{'background': '#F66866','width': '100%',
				 'height': '88rpx' ,'color': '#fff','fontSize': '34rpx','borderRadius': '44rpx', 'margin': '10rpx 0'}">
					确认添加
				</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					type: 1
				},
				rules: {
					name: [{
						required: true,
						message: '请输入收件人姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					phone: [{
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
					account: [{
						required: true,
						message: '请输入油卡卡号',
						trigger: ['change', 'blur'],
					}],
					accountAgian: [{
						required: true,
						message: '请确认油卡卡号',
						trigger: ['change', 'blur'],
					}, {
						validator: (rule, value, callback) => {
							return this.form.account === this.form.accountAgian
						},
						message: '两次输入的油卡卡号不一致',
						trigger: ['blur']
					}]
				},
				isloading: false,
				styleP: "fontSize: 22rpx; color: #aaa",
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				console.log(this.form)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.isloading = true
						this.$u.api.getOilCardAdd(this.form).then(res => {
							// console.log(res)
							this.isloading = true
							this.$u.route({
								type: 'back',
								delta: 1
							})
						}).catch(() => {
							this.isloading = false
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.oil-card-create {
		// padding: 16rpx 0;

		.create-form {
			.form-title {
				color: #3A3A3A;
				font-weight: bold;
				font-size: 32rpx;
				background-color: #F8F8F8;
				padding: 24rpx 32rpx;
			}
			.top {
				.create-form-item {
					margin: 0;
					padding: 0;

					.u-image {
						line-height: normal;
					}
				}
			}

			.bottom {
				background-color: #fff;
				border-radius: 8rpx;
			}

			.create-form-item {
				padding: 20rpx 32rpx;
				font-size: 28rpx;
				// margin: 0 32rpx;

				.radio-box {
					padding: 24rpx 32rpx;
					background-color: #fff;

					.radio-x {}
				}
			}
		}

		.btn {
			margin: 80rpx 140rpx;
		}
	}
</style>
