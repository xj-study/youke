<template>
	<view>
		<u-popup v-model="show" mode="center" border-radius="20" :mask-close-able="false" width="86%"
			:mask-custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
			<view class="u-flex-col u-row-center u-col-center u-font-36" style="padding: 40rpx 32rpx;">
				<view style="font-weight: bold;">服务协议和隐私政策</view>
				<view class="u-m-t-30 u-font-28">
					请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，
					我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。
				</view>
				<view class="u-font-28">
					你可阅读
					<text style="color: #FF6200;" @click="handleLink(ServiceUrl, '用户协议')">《服务协议》
					</text>
					和
					<text style="color: #FF6200;" @click="handleLink(PrivacyUrl, '隐私政策')">《隐私政策》</text>
					了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。
				</view>
				<view class="u-flex u-row-around u-m-t-40" style="width: 100%; font-weight: bold; 
				">
					<view @click="handleDisagree">不同意</view>
					<view @click="handleAgree">同意</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		PrivacyUrl,
		ServiceUrl
	} from '@/common/config.js'
	export default {
		data() {
			return {
				show: true,
				PrivacyUrl,
				ServiceUrl
			};
		},
		methods: {
			handleLink(src, title) {
				this.$u.route({
					url: 'pages/webView/webView',
					params: {
						src,
						title
					}
				})
			},
			handleAgree() {
				// #ifdef APP-PLUS
				plus.runtime.agreePrivacy();
				this.$u.route({
					type: "reLaunch",
					url: 'pages/adScreen/adScreen'
				})
				// #endif
			},
			handleDisagree() {
				// #ifdef APP-PLUS
				plus.runtime.disagreePrivacy();
				plus.runtime.quit();
				// #endif
			}
		}
	}
</script>

<style lang="scss">

</style>
