<template>
	<view v-if="data">
		<uni-notice-bar
			style="margin: 0;"
			showIcon
			:speed="50"
			:text="msg"
			single
			scrollable
		></uni-notice-bar>
		<uni-swiper-dot
			:info="carouselItems"
			:current="current"
			field="title"
			mode="nav"
		>
			<!-- 图片比例: 1000x400  宽度750rpx  高300rpx-->
			<swiper
				style="height: 300rpx;"
				:autoplay="true"
				:interval="3000"
				:duration="250"
				circular
				@change="doChanged"
			>
				<swiper-item
					v-for="(item, index) in carouselItems"
					:key="index"
					@click="goDetail(item.title, item.href)"
				>
					<image
						style="width: 750rpx; height: 300rpx;"
						:src="baseURL + item.img"
						mode=""
					></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 此组件内部 还有for循环, 所以必须规避 变量重名的风险, -->
		<view v-for="(value, key) in items" :key="key">
			<view class="header">
				<uni-icons type="shop"></uni-icons>
				<text>{{ value.title }}</text>
			</view>

			<view style="padding: 6rpx;">
				<uni-grid
					:column="2"
					:square="false"
					:showBorder="false"
					:highlight="false"
				>
					<uni-grid-item v-for="(item, index) in value.data" :key="index">
						<view class="item">
							<image :src="baseURL + item.pic" mode=""></image>
							<view>
								<view>{{ item.title }}</view>
								<view>{{ item.details }}</view>
								<view>¥{{ item.price }}</view>
								<button
									@click="goDetail(item.title, item.href)"
									type="primary"
									size="mini"
								>
									查看详情
								</button>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>

		<uni-grid :column="4" :showBorder="false" :highlight="false">
			<uni-grid-item v-for="(item, index) in 4" :key="index">
				<view
					style="display: flex; align-items: center; justify-content: center; height: 100%;"
				>
					<image
						style="width: 100rpx; height: 100rpx;"
						:src="`/static/icons/icon${item}.png`"
						mode=""
					></image>
				</view>
			</uni-grid-item>
		</uni-grid>
		
		<view v-show="showGoTop" class="btn-gotop" hover-class="active" @click="doGoTop">
			<uni-icons color="white" size="20" type="arrowthinup"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: null,
			msg: '热烈庆祝 学子商城App 成功制作, 希望同学们能够独立完成此作品!',
			current: 0,
			baseURL: 'http://101.96.128.94:9999/',
			showGoTop:false
		};
	},
	mounted() {
		this.getData();
	},
	onPageScroll(e) {
		this.showGoTop = e.scrollTop>1500
	},
	methods: {
		doGoTop(){
			uni.pageScrollTo({
				scrollTop:0,
				duration:250
			})
		},
		// 为了让 头部滚动栏 和 下方的查看详情按钮都能复用下方的跳转方法
		// 需要把参数修改为统一的值
		goDetail(title, href) {
			// const { href, title } = this.carouselItems[index];

			uni.navigateTo({
				url: `/pages/detail/detail?href=${href}&title=${title}`
			});
		},
		doChanged(e) {
			// console.log(e);
			this.current = e.detail.current;
		},
		getData() {
			const url = 'http://101.96.128.94:9999/data/product/index.php';
			uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.data = res.data;
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		}
	},
	computed: {
		carouselItems() {
			return this.data.carouselItems;
		},
		// 经过观察发现, 页面的UI一样, 数据不同而已
		// 返回值数据自制一个数组
		items() {
			return [
				{ title: '1F/首页推荐', data: this.data.recommendedItems },
				{ title: '2F/热销单品', data: this.data.topSaleItems },
				{ title: '3F/最新上架', data: this.data.newArrivalItems }
			];
		}
	}
};
</script>

<style lang="scss">

	
.header {
	padding: 15rpx;
	background-color: #eee;

	text {
		margin-left: 10rpx;
	}
}

.item {
	margin: 6rpx;
	border: 1px solid #888;
	border-radius: 6rpx;

	> image {
		width: 100%;
		height: 280rpx;
	}

	> view {
		padding: 10rpx;

		view {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;

			&:first-child {
				font-weight: bold;
			}

			&:nth-child(2) {
				font-size: 0.8em;
				color: gray;
				margin: 4rpx 0;
			}

			&:nth-child(3) {
				color: red;
				font-size: 1.1em;
			}
		}
	}
}
</style>
