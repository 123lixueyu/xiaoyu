<template>
	<view style="padding: 10rpx;" v-if="data">
		<view class="lname">{{ details.lname }}</view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="2500" :duration="250" circular="">
				<swiper-item v-for="(item, index) in picList" :key="index">
					<image
						style="width: 100%; height: 100%;"
						:src="baseURL + item.md"
						mode="">
					</image>
				</swiper-item>
			</swiper>
			<view style="font-weight: bold;">{{details.title}}</view>
			<view style="color: gray; margin: 15rpx 0; font-size: 0.9em;">{{details.subtitle}}</view>
			<view style="color: red; font-weight: bold;">¥{{details.price}}</view>
		<uni-collapse>
			<!-- 折叠栏 -->
			<uni-collapse-item title="更多商品推荐" open>
				<uni-list>
					<uni-list-item 
					:to="`/pages/goods-detail/goods-detail?lid=${item.lid}`"
					v-for="(item,index) in laptopList" :key="index"
					:title="item.spec"
					clickable
					showArrow>
					</uni-list-item>	
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<view v-html="html_details"></view>
		
		<view style="height: 44px;"></view>
		<uni-goods-nav style="width: 100%;position: fixed;bottom: 0;" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lid:'',
				data:null,
				baseURL:'http://101.96.128.94:9999/'
			}
		},
		onLoad(options) {
			const lid=options.lid;
			this.lid=lid;
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData(){
				const url='http://101.96.128.94:9999/data/product/details.php';
			    uni.request({
			    	url,
			    	method: 'GET',
			    	data: {lid:this.lid},
			    	success: res => {
						console.log(res);
						this.data=res.data;
					},
			    	fail: (err) => {
						console.log(err);
					},
			    	complete: () => {}
			    });
			}
		},
		computed:{
			details(){
				return this.data.details;
			},
			family(){
				return this.data.family;
			},
			picList(){
				return this.details.picList;
			},
			laptopList(){
				return this.family.laptopList;
			},
			html_details(){
				let details = this.details.details;
						
				// 把 <img 改为 <img width="100%"
				// g: 修饰符 代表全局匹配,  找到所有符合条件的字符串
				details = details.replace(/<img/g, '<img width="100%"')
						
				// src="img => src="http://101.96.128.94:9999/img
				details = details.replace(/src="img/g, 'src="http://101.96.128.94:9999/img')
						
				// 如果是 手机运行, 要求所有地址必须有前缀协议
				// src="//img20  改为  src="https://img20
				details = details.replace(/src="\/\/img20/g, 'src="https://img20')
						
				return details;
					}
		}
	};
</script>

<style lang="scss">
	.lname {
		border-bottom: 1px solid #ddd;
		padding: 10rpx;
	}

</style>
