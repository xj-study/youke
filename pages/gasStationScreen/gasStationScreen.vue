<template>
	<view class="gas-station-screen">
		<view class="tabbar u-flex u-row-between">
			<u-dropdown style="flex: unset; width: 200rpx;">
				<u-dropdown-item v-model="type" :title="options.find(item => item.value == type).label"
					:options="options" :height="options.length * 106" @change="changeType" />
			</u-dropdown>
			<view class="u-flex">
				<view :class="['sort-item', sortType == 1 ? 'sort-item-active' : 'sort-item-inactive']"
					@click="changeSortType(1)">
					距离最近
				</view>
				<view :class="['sort-item', sortType == 2 ? 'sort-item-active' : 'sort-item-inactive']"
					@click="changeSortType(2)">
					价格最低
				</view>
			</view>
		</view>
		<view class="content" style="padding: 20rpx 24rpx">
			<view class="u-flex-col u-row-center">
				<view class="u-flex u-row-between" v-for="(item, index) in stations"
					style="background-color: #fff; border-radius: 16rpx;margin: 16rpx 0; padding: 30rpx 40rpx;">
					<view>
						<view style="font-size: 32rpx; color: #666;">{{item.name}}</view>
						<view style="font-size: 32rpx; color: #666; margin-top: 30rpx;">
							<text style="font-size: 28rpx">￥</text>
							<text style="font-size: 48rpx; font-weight: bold;">{{item.price}}</text>
							<text></text>
						</view>
					</view>
					<view @click="handleStation(item)">
						<u-image width="64rpx" height="64rpx" src="/static/image/daohang.png" />
						<view style="color: #3776DA; font-size: 24rpx; margin-top: 16rpx;">
							{{(item.distance / 1000).toFixed(1)}}km
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: "30",
				longitude: "120",
				type: 3,
				options: [{
						label: '0#柴油',
						value: 1,
					},
					{
						label: '92#汽油',
						value: 2,
					},
					{
						label: '95#汽油',
						value: 3,
					},
					{
						label: '98#汽油',
						value: 4,
					}
				],
				sortType: 1,
				stations: [],
			};
		},
		onLoad() {
			this.getLocation();
		},
		methods: {
			getLocation() {
				const that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: res => {
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.getStation();
					},
					fail: (err) => {
						that.getStation();
					}
				});
			},

			changeType(e) {
				// if (e != this.type) {
				// 	this.type = e;
					this.getStation()
				// }
			},
			changeSortType(type) {
				if (this.sortType != type) {
					this.sortType = type;
					this.getStation()
				}
			},
			getStation() {
				this.$u.api.getGasStation({
					lat: this.latitude,
					lng: this.longitude,
					type: this.type,
					sortType: this.sortType
				}).then(res => {
					// console.log(res)
					this.stations = res.list;
				})
			},
			handleStation(item) {
				// console.log(item)
				// #ifdef APP-PLUS
				uni.openLocation({
					latitude: Number(item.gcj02Lat),
					longitude: Number(item.gcj02Lng),
					name: item.name,
					success(res) {
						console.log('success');
					},
					fail(err) {
						console.log(err);
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.gas-station-screen {
		height: 100%;
		position: relative;

		.tabbar {
			z-index: 999;
			height: 100rpx;
			width: 100%;
			padding: 0 4rpx 0 16rpx;
			background-color: #fff;
			border-top: 2rpx solid #f8f8f8;

			.sort-item {
				padding: 0 20rpx;
			}

			.sort-item-active {
				color: rgb(41, 121, 255);
			}

			.sort-item-inactive {}
		}
		.content {
			z-index: 10;
			position: absolute;
			top: 100rpx;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: scroll;
		}
	}
</style>
