require.config({
	baseUrl:"js",
	paths:{
		"jquery":"lib/jquery-1.11.3",
		"banner":"js/banner",
		"sfq":"js/sfq",
		"template":"plug/template",
		"weekItem":"js/week-item",
		"promotion":"js/promotion",
		"hot":"js/hot",
		"health":"js/health",
		"goods2":"js/goods2",
		"nav":"js/nav",
		"jquery.cookie":"plug/jquery.cookie",
		"layer": "plug/layer/layer",
		"shop":"js/shop",
		"glass":"js/glass",
		"goods-cart":"js/goods-cart"
	},
	shim:{
		"jquery.cookie":['jquery'],
		"layer": ['jquery']
	}
	
})