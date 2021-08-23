<template>
	<view style="display: flex;">
       <scroll-view scroll-y="true" style="width: 30%;"
		:style="{ height: windowHeight + 'px' }">
		<view>
       	<view class="menu-cell" :class="{cur:current == index}"
		v-for="(item,index) in hero" 
		:key="index" @click="doCheck(index)"
		hover-class="active"
		hover-stay-time="200">{{item.title}}</view>
		</view>
       </scroll-view>
	   
	   <scroll-view v-if="data && showRight"
			scroll-y
			style="width: 70%;"
			:style="{ height: windowHeight + 'px' }">
		<view class="aree-right">
			<view style="display: flex;">
				<image :src="heroIcon" mode=""
				style="width: 180rpx;height: 180rpx;"></image>
				<view style="margin-left: 15rpx;">
					<view style="outline-offset: 1.2em; font-weight: bold;">{{heroInfo.title}}</view>
					<view>昵称：{{heroInfo.name}}</view>
					<view>金币：{{heroInfo.goldPrice}}</view>
					<view>点券：{{heroInfo.couponPrice}}</view>
				</view>
			</view>
			<uni-card title="背景故事" isFull>
				<view style="font-size: 0.8em;">{{heroInfo.shortBio}}</view>
			</uni-card>
			
			<uni-collapse>
				<uni-collapse-item title="使用建议">
					<uni-list>
						<uni-list-item 
						:title="item" 
						v-for="(item, index) in heroInfo.allytips"
						:key="index">
						</uni-list-item>	
					</uni-list>
				</uni-collapse-item>
				
				<uni-collapse-item title="对战技巧">
					<uni-list>
						<uni-list-item 
						:title="item" 
						v-for="(item, index) in heroInfo.enemytips"
						:key="index">
						</uni-list-item>	
					</uni-list>
				</uni-collapse-item>
				<uni-collapse-item title="皮肤">
					<uni-list>
						<uni-list-item 
						:title="item.name" 
						v-for="(item, index) in skins"
						:key="index"
						direction="column"
						:note="item.description"
						:thumb="item.iconImg"
						thumbSize="lg">
						</uni-list-item>	
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	   </scroll-view>
	   
	</view>
</template>

<script>
	export default {
		data(){
			return{
				hero:[],
				// 当前项
				current:0,
				data:null,
				showRight:true
			}
		},
		mounted() {
			this.getMenu();
		},
		methods:{
		getHeroDetail(heroId) {
			const url = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroId}.js`;
				uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
				console.log(res);
				this.data=res.data;
								
				// 刷新右侧组件，先移除，再添加
				this.showRight=false;
				// nextTick监听渲染完毕的时机
				this.$nextTick(()=>{
					this.showRight=true;
				})
								
			},
				fail: (err) => {
					console.log(err);
				},
				complete: () => {}
			});
	},
		doCheck(index){
				this.current=index;
				const hid=this.hero[index].heroId;
				this.getHeroDetail(hid);
		},
			getMenu(){
				// #ifndef H5
				const url= 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js';
				// #endif
				// #ifdef H5
				const url= '/gtimg/images/lol/act/img/js/heroList/hero_list.js';
				// #endif
				uni.request({
					url,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						this.hero=res.data.hero;
						const hid=this.hero[0].heroId;
						this.getHeroDetail(hid)
					},
					fail: (err) => {
						console.log(err);
					},
					complete: () => {}
				});
			}
		},
		computed: {
				windowHeight() {
					return uni.getSystemInfoSync().windowHeight;
				},
				skins() {
							return this.data.skins;
						},
						spells() {
							return this.data.spells;
						},
						heroInfo() {
							return this.data.hero;
						},
						heroIcon() {
							return `https://game.gtimg.cn/images/lol/act/img/champion/${
								this.heroInfo.alias
							}.png`;
				}
			}
	};
</script>

<style scoped lang="scss">
.menu-cell{
	padding: 15rpx;
		text-align: center;
		border-bottom: 1px solid #aaa;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	
		&.cur {
			background-color: #eee;
			color: #007aff;
			font-weight: bold;
		}
}

</style>