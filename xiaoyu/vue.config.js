module.exports = {
	devServer: {
		proxy: {
			// 指定 /douyu 开头的请求, 代理
			"/gtimg": {
				target: "https://game.gtimg.cn",
				changeOrigin: true, // 域名有变更, 当前域名 localhost
				secure: true, //true代表https请求, false代表http请求
				pathRewrite: {
					"^/gtimg": ""
				}
			},
			"/douyucdn": {
				target: "http://capi.douyucdn.cn",
				changeOrigin: true, // 域名有变更, 当前域名 localhost
				secure: true, //true代表https请求, false代表http请求
				pathRewrite: {
					"^/douyucdn": ""
				}
			},
			"/douyu": {
				target: "https://m.douyu.com",
				changeOrigin: true, // 域名有变更, 当前域名 localhost
				secure: true, //true代表https请求, false代表http请求
				pathRewrite: {
					"^/douyu": ""
				}
			},
		}
	}
}
