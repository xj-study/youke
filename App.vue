<script>
	export default {
		onLaunch() {
			const that = this
			// #ifdef APP-PLUS
			uni.preLogin({
				provider: 'univerify',
				success() {
					// 支持一键登录
					that.$u.vuex('vue_supportQuick', true)
				},
				fail(err) {
					console.log(err)
					that.$u.vuex('vue_supportQuick', false)
				}
			})
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res);
					that.$u.vuex('vue_systemInfo', res)
				}
			});
			// #endif
			// #ifdef APP-PLUS
			// console.log(plus.runtime.isAgreePrivacy())
			// if (!plus.runtime.isAgreePrivacy()) {
			// 	//弹出自定义隐私政策提示框  
			// }
			// #endif
			// if (!this.$store.state.notFirst) {
			// 	this.$u.toast('1111', 2000)
			// }
			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F9F9F9;
	}

	.home-screen {
		.ad-popup {
			.u-drawer-content {
				bottom: 200rpx;

				.u-mode-center-box {
					background-color: rgba($color: #000000, $alpha: 0);
				}

				// .u-close--top-right {
				// }
				uni-swiper {
					background-color: rgba($color: #000000, $alpha: 0) !important;
				}
			}
		}
	}

	.ad-screen {
		height: 100%;

		.u-swiper-wrap {
			height: 100%;

			uni-swiper {
				height: 100%;
			}
		}
	}

	.gas-station-screen {
		.u-dropdown {
			.u-dropdown__content {
				.u-dropdown__content__popup {
					background-color: #f8f8f8;
				}

				.u-dropdown__content__mask {
					background-color: rgba($color: #000000, $alpha: 0);
				}
			}
		}
	}

	.u-status-bar {
		width: 100%;
	}

	.goods-detail-screen {
		.u-image__image {
			display: block !important;
		}

		.u-divider-text {
			font-weight: bold;
		}

		.u-divider-line {
			border-bottom-width: 4rpx !important;
		}
	}

	.user-screen {
		.u-cell__left-icon-wrap {
			color: #333;
		}

		.u-cell__right-icon-wrap {
			color: #ccc !important
		}

		.u-border-top:after {
			border-top: 0;
		}
	}

	.u-hairline-border:after {
		display: none !important;
	}

	.oil-recharge-screen {
		.u-numberbox {
			.u-number-input {
				flex: 1;
			}
		}
	}

	.phone-recharge-screen {
		.u-numberbox {
			.u-number-input {
				flex: 1;
			}
		}

		.u-input__input {
			font-size: 32rpx !important;
		}
	}

	.discount-select {
		.u-numberbox {
			.u-number-input {
				flex: 1;
			}
		}
	}

	.discount-detail {
		.u-numberbox {
			.u-number-input {
				flex: 1;
			}
		}
	}

	.u-cell-item-box {
		background-color: transparent !important;

		.u-cell__right-icon-wrap {
			color: #ccc !important;
		}
	}

	.address-create {
		.u-input__input {
			font-size: 24rpx !important;
		}
	}

	.oil-card-create {
		.u-input__input {
			font-size: 22rpx !important;
		}

		.u-form-item__message {
			text-align: right;
		}
	}

	.login-screen {
		.u-form-item--right {
			// background-color: #EFF2F0;
			height: 80rpx;
			// border-radius: 40rpx;
			padding: 0;
		}

		.u-form-item__message {
			padding: 0 0 16rpx !important;
			margin: 0 !important;
		}

		.u-input__input {
			font-size: 28rpx !important;
		}
	}

	@import "uview-ui/index.scss";
</style>
