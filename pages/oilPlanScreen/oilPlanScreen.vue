<template>
	<view class="oil-plan-screen">
		<view class="calendar">
			<w-calendar ref="calendar" :lunar="false" :disabledBefore="false" :disabledAfter="false"
				@confirm="getResult" />
		</view>
		<view>
			<view class="u-flex u-col-center" style="margin: 30rpx 0;">
				<view
					style="background: linear-gradient(180deg, #FFA200 0%, #FF6200 100%); height: 28rpx; width: 8rpx; margin-right: 10rpx;">
				</view>
				<view style="color: #333; font-weight: 500; font-size: 32rpx;"> {{year}}年{{month}}月</view>
			</view>
			<block v-if="list.length > 0">
				<view v-for="(item,index) in list" :key="index"
					style="background-color: #fff; padding: 20rpx; border-radius: 8rpx; margin: 20rpx 0;">
					<view class="" :style="{color: item.rechargeState == 0 ? '#333' : '#ccc'}">
						<view class="u-flex u-row-between" style="fontSize: '26rpx'">
							<view>{{item.name}}</view>
							<view>{{item.rechargeState == 0 ? '待充值' : '已充值'}}</view>
						</view>
						<view class="u-flex u-row-between" style="font-size: 24rpx; margin-top: 5rpx;">
							<view>充值
								<text :style="{color: item.rechargeState == 0 ? '#F26633' : '#aaa', fontSize: '26rpx'}">
									{{item.amount || '***'}}
								</text>元
							</view>
							<view>{{item.time}}</view>
						</view>
					</view>
				</view>
			</block>
			<view v-else class="u-flex u-col-center u-row-center" style="margin: 90rpx 0;">
				<u-image src="/static/image/no-data-icon.png" width="346" height="297" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				year: '',
				month: '',
				list: []
			};
		},
		onLoad() {

		},
		methods: {
			getResult(e) {
				// console.log(e)
				const time = `${e.year}-${e.month > 9 ? e.month : '0' + e.month}`
				this.year = e.year
				this.month = e.month > 9 ? e.month : '0' + e.month
				this.$u.api.getPlan({
					time
				}).then(res => {
					this.list = res.records || []
					if (this.$refs.calendar.initActive) {
						this.$refs.calendar.initActive(res.records || [])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.oil-plan-screen {
		padding: 30rpx 32rpx;

		.calendar {
			border-radius: 12rpx;
			overflow: hidden;
		}
	}
</style>
