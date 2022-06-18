<template>
	<view class="address-create">
		<u-form class="form-wrap" :model="form" ref="uForm" label-width="120"
			:label-style="{'fontSize': '24rpx', 'color': '#333'}">
			<view class="top">
				<u-form-item class="form-item" label="收货人" prop="name">
					<u-input v-model="form.name" placeholder="请输入收货人名称" :placeholder-style="styleP" />
				</u-form-item>
				<u-form-item class="form-item" label="手机号" prop="mobile">
					<u-input v-model="form.mobile" type="number" maxlength='11' placeholder="请输入收货人手机号"
						:placeholder-style="styleP" />
				</u-form-item>
				<u-form-item class="form-item" label="所在地区" prop="region">
					<u-input v-model="form.region" type="select" placeholder="请选择地区" :select-open="pickerShow"
						@click="pickerShow = true" :placeholder-style="styleP"></u-input>
				</u-form-item>
				<u-form-item class="form-item" label="地址" prop="detailed" :border-bottom="false">
					<u-input v-model="form.detailed" type="textarea" placeholder="请输入您的详细地址" :height="100"
						:auto-height="true" :placeholder-style="styleP" />
				</u-form-item>
			</view>
			<view class="bottom">
				<u-form-item label-width='200' class="form-item" label="设为默认地址" prop="detailed">
					<u-switch v-model="form.isDefault" slot="right" active-color="#FF6800" size='34' />
				</u-form-item>
			</view>
		</u-form>
		<view style="position: fixed; bottom: 90rpx; left: 100rpx; right: 100rpx;">
			<!-- 	<u-button v-if="form.id" :loading="isloading" @click="addressDel" :ripple="true" size="mini" :custom-style="{'width': '100%', 'height': '80rpx' ,'color': '#fff',
			 'background': '#F26633', 'fontSize': '26rpx', 'borderRadius': '12rpx', 'margin': '10rpx 0'}">
				删除地址</u-button> -->
			<u-button :loading="isloading" @click="submit" :ripple="true" size="mini" :custom-style="{'width': '100%', 'height': '88rpx' ,'color': '#fff',
			 'background': 'linear-gradient(44deg, #FFA200 0%, #FF6200 100%)', 'fontSize': '32rpx', 'borderRadius': '10rpx', 'margin': '10rpx 0'}">
				{{form.id ? '确认修改' : '确认'}}
			</u-button>
		</view>
		<u-picker mode="region" :default-region="defaultRegion" v-model="pickerShow" @confirm="regionConfirm">
		</u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				rules: {
					name: [{
						required: true,
						message: '请输入收件人姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
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
					region: [{
						required: true,
						message: '请选择所在地区',
						trigger: ['change', 'blur'],
					}]
				},
				isloading: false,
				pickerShow: false,
				defaultRegion: [],
				styleP: "fontSize: 24rpx; color: #aaa",
			};
		},
		onLoad(options) {
			this.form = options
			if (options.id) {
				this.form.region = `${options.province} ${options.city} ${options.area}`
				this.form.isDefault = options.isDefault == 1 ? true : false
				uni.setNavigationBarTitle({
					title: '编辑地址'
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			if (this.form.id) {
				const defaultRegion = []
				defaultRegion[0] = this.form.province
				defaultRegion[1] = this.form.city
				defaultRegion[2] = this.form.area
				this.defaultRegion = defaultRegion
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过', this.form);
						this.isloading = true
						const form = Object.assign({}, this.form)
						form.isDefault = this.form.isDefault ? 1 : 0
						const Api = form.id ? this.$u.api.addressUpdate : this.$u.api.addressCreate
						Api(form).then(res => {
							this.isloading = false
							this.$u.route({
								type: 'back',
								delta: 1
							})
						}).catch(err => {
							this.isloading = false
							console.log('err', err)
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			addressDel() {
				console.log(this.form)
			},
			regionConfirm(e) {
				const {
					area,
					city,
					province
				} = e
				this.form.region = `${province.label} ${city.label} ${area.label}`
				this.form.province = province.label
				this.form.city = city.label
				this.form.area = area.label
			}
		}
	};
</script>

<style lang="scss">
	.address-create {
		padding: 24rpx 0;

		.form-wrap {
			.form-item {
				padding: 27rpx 24rpx;
			}

			.top {
				background-color: #fff;
			}

			.bottom {
				background-color: #fff;
				margin: 20rpx 0;

				.form-item {
					padding: 20rpx 24rpx;
				}
			}
		}
	}
</style>
