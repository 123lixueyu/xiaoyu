<template>
	<view>
		<uni-collapse v-if="tags.length != 0">
			<uni-collapse-item :title="tags[current].cate_name" :open="open">
				<uni-tag
					style="margin: 10rpx;"
					v-for="(item, index) in tags"
					:key="index"
					:text="item.cate_name"
					@click="doCheck(index)"
					:type="index == current ? 'warning' : 'default'"
				></uni-tag>
			</uni-collapse-item>
		</uni-collapse>
		<view style="padding: 10rpx;">
			<uni-grid
				:column="3"
				:square="false"
				:showBorder="false"
				:highlight="false"
			>
				<uni-grid-item v-for="(item, index) in cates" :key="index">
					<view @click="goRooms(index)" style="margin: 10rpx;" hover-class="active">
						<image
							:src="item.pic_url"
							style="width: 100%; height: 300rpx; border-radius: 6rpx;"
							mode=""
						></image>
						<view>{{ item.tag_name }}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tags: [],
			current: 0,
			open: false,
			cates: []
		};
	},
	mounted() {
		this.getTags();
	},
	methods: {
		goRooms(index){
			const {short_name, tag_name} = this.cates[index];
			
			uni.navigateTo({
				url: `../rooms/rooms?tag_name=${tag_name}&short_name=${short_name}`,
			});
		},
		doCheck(index) {
			this.current = index;
			this.getCates(index);
			// 先开 再关, 利用 nextTick 监听渲染结束后 再false
			this.open = true;
			this.$nextTick(() => {
				this.open = false;
			});
		},
		getCates(index) {
			const short_name = this.tags[index].short_name;
			// #ifndef H5
			const url = 'http://capi.douyucdn.cn/api/v1/getColumnDetail';
			// #endif
			// #ifdef H5
			const url = '/douyucdn/api/v1/getColumnDetail';
			// #endif

			uni.request({
				url,
				method: 'GET',
				data: { shortName: short_name },
				success: res => {
					console.log(res);
					this.cates = res.data.data;
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		},
		getTags() {
			// #ifndef H5
			const url = 'http://capi.douyucdn.cn/api/v1/getColumnList';
			// #endif
			// #ifdef H5
			const url = '/douyucdn/api/v1/getColumnList';
			// #endif

			uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.tags = res.data.data;

					this.getCates(0);
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

<style></style>
