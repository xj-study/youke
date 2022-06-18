<template>
	<view class="plan-list" style="height: 100%;">
		<view class="u-text-center" style="font-size: 32rpx; font-weight: 500; height: 100rpx; 
		line-height: 100rpx; color: #FF6800;">{{title}}</view>
		<view class="u-flex u-col-center" style="font-size: 32rpx; padding: 0 50rpx; height: 76rpx; font-weight: 500;
		background-color: #F6F6F6;">
			<view class="u-flex-2 u-text-center">充值金额</view>
			<!-- <view class="u-flex-2 u-text-center">分期进度</view> -->
			<view class="u-flex-3 u-text-center">到账时间</view>
		</view>
		<scroll-view scroll-y="true" :style="{'height': (height-176) + 'rpx'}">
			<view class="u-flex u-col-center" v-for="(item,index) in list" :key="index"
				style="padding: 12rpx 50rpx;font-size: 28rpx; color: #aaa;">
				<view class="u-flex-2 u-text-center" style="color: #333;">{{item.amount}}({{item.num}}/{{list.length}})
				</view>
				<!-- <view class="u-flex-2 u-text-center">{{item.num}}/{{list.length}}</view> -->
				<view class="u-flex-3 u-text-center">{{item.time}}</view>
			</view>
		</scroll-view>
		<!-- 	<view class="u-text-center" style="color: #16BB40; font-size: 24rpx; height: 86rpx; 
		line-height: 86rpx; border-top:solid 1rpx #eee;" @click="$emit('close')">
			确定
		</view> -->
	</view>
</template>

<script>
	export default {
		name: "plan-list",
		data() {
			return {

			};
		},
		props: {
			title: {
				type: String,
				default: '加油计划'
			},
			height: {
				type: [String, Number],
				default: 800
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
	.plan-list {}
</style>
