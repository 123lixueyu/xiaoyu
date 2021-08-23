<template>
	<view v-if="data">
		<uni-list>
			<!-- 属性to 是官方文档规定的名称 -->
			<uni-list-item
				:to="`../goods-detail/goods-detail?lid=${item.lid}`"
				clickable
				v-for="(item, index) in data.data"
				:key="index"
			>
				<!-- vue语法中, 插槽写法 v-slot:插槽名 -->
				<!-- uniapp此组件用的是 slot="插槽名" 旧版本写法 -->
				<template slot="body">
					<view class="cell">
						<image :src="baseURL + item.pic" mode=""></image>
						<view>
							<view>{{ item.title }}</view>
							<view>¥{{ item.price }}</view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<uni-load-more :status="status"></uni-load-more>

		<!-- 此按钮的样式 书写的 App.vue 中, 可以全局通用 -->
		<view
			v-show="showGoTop"
			class="btn-gotop"
			hover-class="active"
			@click="doGoTop"
		>
			<uni-icons color="white" size="20" type="arrowthinup"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showGoTop: false,
			status: 'more',
			url: 'http://101.96.128.94:9999/data/product/list.php',
			data: null,
			baseURL: 'http://101.96.128.94:9999/'
		};
	},
	mounted() {
		this.getData();
	},
	onPullDownRefresh() {
		uni.request({
			url: this.url,
			method: 'GET',
			data: { pno: 1 },
			success: res => {
				console.log(res);
				this.data = res.data;
				uni.stopPullDownRefresh();
			},
			fail: err => {
				console.log(res);
			},
			complete: () => {}
		});
	},
	onReachBottom() {
		const { data, pageCount, pno } = this.data;

		if (pageCount == pno) {
			this.status = 'noMore';
			return;
		}

		// 防止网速慢的时候, 在底部反复拉动 导致多次触发触底操作的情况
		if (this.status == 'loading') return;

		this.status = 'loading';

		uni.request({
			url: this.url,
			method: 'GET',
			data: { pno: pno + 1 },
			success: res => {
				console.log(res);
				// 合并数据
				res.data.data = [...data, ...res.data.data];
				this.data = res.data;
				this.status = 'more';
			},
			fail: err => {
				console.log(err);
			},
			complete: () => {}
		});
	},
	onPageScroll(e) {
		this.showGoTop = e.scrollTop > 2000;
	},
	methods: {
		doGoTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 250
			});
		},
		getData() {
			uni.request({
				url: this.url,
				method: 'GET',
				data: { pno: 1 },
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
	}
};
</script>

<style lang="scss">
.cell {
	margin: -10px -13px;
	display: flex;
	// border: 1px solid purple;

	> image {
		width: 200rpx;
		height: 200rpx;
		flex: none; //不会自动缩放
	}

	> view {
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		> view:first-child {
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		> view:last-child {
			color: red;
			font-size: 1.1em;
		}
	}
}
</style>
