<template>
	<web-view :src="href"></web-view>
</template>

<script>
export default {
	data() {
		return {
			href:''
		};
	},
	methods: {},
	// 用于读取路由参数
	onLoad(options) {
		console.log(options);
		const { href, title } = options;
		this.href = 'http://101.96.128.94:9999/'+href;
		//设置title为当前页的标题
		uni.setNavigationBarTitle({
			title
		});
	}
};
</script>

<style></style>
