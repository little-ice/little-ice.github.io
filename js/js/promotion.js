define(["jquery","template"],function($,template){
	$.getJSON("./json/promotion.json",function(data){
		var html=template("promotion-item",{result:data});
		$(".promotion-warp").html(html);
	})
})