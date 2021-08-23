<template>
	<view class="content">
		<!-- 模糊的背景图: 不能用css的background, 会导致整个页面都模糊 -->
		<image class="img-bg" src="/static/images/bg.jpg" mode=""></image>

		<image class="img-logo" src="/static/images/logo.png" mode=""></image>

		<view class="input-area">
			<image src="/static/images/user.png" mode=""></image>
			<input type="text" placeholder="用户名/手机号" />
		</view>

		<view class="input-area-pwd">
			<image src="/static/images/mima.png" mode=""></image>
			<input :type="pwd_type" placeholder="密码" />
			<image
				@click="pwd_visible = !pwd_visible"
				:src="pwd_icon"
				mode=""
			></image>
		</view>

		<view class="btn-login" hover-class="active">登录</view>

		<view class="accout-area">
			<view hover-class="active">忘记密码?</view>
			<view hover-class="active">立即注册</view>
		</view>

		<view class="bottom">
			<view>
				<view class="line"></view>
				<view>第三方直接登录</view>
				<view class="line"></view>
			</view>
			<view>
				<view hover-class="active">
					<image src="/static/images/qq.jpg" mode=""></image>
				</view>
				<view hover-class="active">
					<image src="/static/images/wx.jpg" mode=""></image>
				</view>
				<view hover-class="active">
					<image src="/static/images/wb.jpg" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pwd_visible: false //密码的可见性
		};
	},
	methods: {},
	computed: {
		pwd_type() {
			return this.pwd_visible ? 'text' : 'password';
		},
		pwd_icon(){
			return this.pwd_visible? '/static/images/eye.png' : '/static/images/eye-close.png';
		}
	}
};
</script>

<style lang="scss">
.bottom {
	position: fixed;
	bottom: 150rpx;
	// border: 1px solid red;
	left: 0;
	right: 0;
	padding: 0 100rpx;

	> view:first-child {
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;

		> .line {
			height: 1px;
			background-color: white;
			width: 140rpx;
		}
	}

	> view:last-child {
		display: flex;
		justify-content: space-around;

		> view {
			padding: 10rpx;
			background-color: white;
			border-radius: 50%;
			overflow: hidden;
		}

		image {
			width: 80rpx;
			height: 80rpx;
			// border-radius: 50%;
		}
	}
}

.accout-area {
	margin-top: 30rpx;
	display: flex;
	justify-content: space-between;

	view {
		color: gray;
		text-decoration: underline;
	}
}

.active {
	opacity: 0.6;
}

.img-bg {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	// 模糊滤镜
	filter: blur(6px);
	// 层级: 背景图应该在最底层
	z-index: -1;
}

.img-logo {
	background-color: white;
	border-radius: 7rpx;
	// 168 x 41
	width: 420rpx;
	height: 102rpx;
	align-self: center;
	padding: 10rpx;
	margin-top: 60rpx;
}

.content {
	padding: 80rpx;
	display: flex;
	// 主轴竖向排列
	flex-direction: column;
	// 交叉轴拉伸充满
	align-items: stretch;
}

.input-area {
	background-color: white;

	border-radius: 6rpx;
	display: flex;
	align-items: center;
	margin-top: 100rpx;

	> image {
		width: 40rpx;
		height: 40rpx;
		margin: 20rpx;
	}

	> input {
		// background-color: blue;
		// flex:1 代表支持自动缩放, 放大充满剩余所有空间
		flex: 1;
		margin-right: 20rpx;
	}
}

.input-area-pwd {
	background-color: white;

	border-radius: 6rpx;
	display: flex;
	align-items: center;
	margin-top: 40rpx;

	> image {
		width: 40rpx;
		height: 40rpx;
		margin: 20rpx;
	}

	> input {
		flex: 1;
		margin-right: 20rpx;
	}
}

.btn-login {
	background-color: rgb(255, 165, 8);
	color: white;
	padding: 20rpx;
	border-radius: 8rpx;
	text-align: center;
	margin-top: 40rpx;
}
</style>
