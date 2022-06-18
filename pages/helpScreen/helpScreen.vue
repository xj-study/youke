<template>
	<view class="help-screen">
		<view class="bg-box u-flex u-col-center u-row-around">
			<u-image src="/static/image/help-bg.png" width="100%" height="100%" />
		</view>
		<!-- <view class="bg-box u-flex u-col-center u-row-around">
			<view class="nav-item u-flex-col u-col-center u-row-center" @click="handleItem(1)">
				<view class="img-box u-flex u-col-center u-row-center">
					<u-image src="/static/image/help-icon1.png" height="49rpx" width="46rpx" />
				</view>
				<view>加油问题</view>
			</view>
			<view class="nav-item u-flex-col u-col-center u-row-center" @click="handleItem(2)">
				<view class="img-box u-flex u-col-center u-row-center">
					<u-image src="/static/image/help-icon2.png" height="44rpx" width="42rpx" />
				</view>
				<view>福利商城</view>
			</view>
			<view class="nav-item u-flex-col u-col-center u-row-center" @click="handleItem(3)">
				<view class="img-box u-flex u-col-center u-row-center">
					<u-image src="/static/image/help-icon3.png" height="44rpx" width="44rpx" />
				</view>
				<view>常见问题</view>
			</view>
		</view> -->
		<view class="u-m-t-20">
		<!-- 	<view class="u-flex u-col-center" style="margin: 22rpx 0 18rpx;">
				<view style="height: 36rpx; width: 6rpx; background: #FF6800; border-radius: 2px;"></view>
				<view style="font-size: 28rpx; margin: 0 10rpx;">{{title}}</view>
			</view> -->
			<u-collapse ref="collapse" style="border-radius: 12rpx; background: #fff"
				:head-style="{fontSize: '24rpx', padding: '36rpx 0'}"
				:item-style="{ color: '#333', borderBottom: 'solid 1rpx #eee', marginLeft: '25rpx'}"
				:body-style="{fontSize: '24rpx', paddingBottom: '20rpx', color: '#F26633'}">
				<u-collapse-item :title="item.question" v-for="(item, index) in list" :key="index">
					{{item.answer || '数据丢失'}}
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "",
				title: '加油问题类',
				list: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$u.api.getIssueList({
					type: this.type
				}).then(res => {
					this.list = res.records || []
					this.$nextTick(() => {
						this.$refs.collapse.init()
					})
				})
			},
			handleItem(type) {
				if (type != this.type) {
					this.type = type
					this.getList()
					switch (type) {
						case 1:
							this.title = '加油问题类'
							break;
						case 2:
							this.title = '商城问题类'
							break;
						case 3:
							this.title = '常见问题类'
							break;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.help-screen {
		padding: 24rpx;

		.bg-box {
			height: 194rpx;
			// background: linear-gradient(44deg, #FFA200 0%, #FF6200 100%);
			border-radius: 12rpx;

			.nav-item {
				padding: 20rpx;
				color: #fff;
				font-size: 20rpx;

				.img-box {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
