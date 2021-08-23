<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.btn-gotop{
		position: fixed;
		right: 40rpx;
		bottom: 150rpx;
		
		width: 100rpx;
		height: 100rpx;
		background-color: rgba(0,0,0,0.5);
		border-radius: 50%;
		border: 1px solid #999;
		
		display: flex;
		align-items: center;
		justify-content: center;
	}	
		
	.active{
		opacity: 0.6;
	}	
</style>
