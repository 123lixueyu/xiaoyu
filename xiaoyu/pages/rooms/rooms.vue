<template>
	<view v-if="data">
		<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false" >
			<uni-grid-item v-for="(item,index) in data.list" :key="index">
				<view>
					<view>
						<image src="../../static/icons/icon1.png" mode=""></image>
						<view>{{item.hn}}</view>
						<view>{{item.nickname}}</view>
					</view>
					<view>{{item.roomName}}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:'more',
				short_name:'',
				data:null,
				// #ifndef H5
				url: 'https://m.douyu.com/api/room/list',
				// #endif
				// #ifdef H5
				url: '/douyu/api/room/list'
				// #endif
			}
		},
		mounted() {
			this.getData();
		},
		onReachBottom() {
				this.getMore()
		},
		onLoad(options) {
			const {tag_name,short_name}=options;
			this.short_name=short_name;
			uni.setNavigationBarTitle({
				title:tag_name
			})
			
		},
		
		methods: {
			
			getData(){
				uni.request({
					url: this.url,
					method: 'GET',
					data: {page:1,type:this.short_name},
					success: res => {
						console.log(res);
						this.data=res.data.data;
					},
					fail: (err) => {
						console.log(err);
						
						
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
