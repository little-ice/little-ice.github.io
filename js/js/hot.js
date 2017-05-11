define(["jquery","template"],function($,template){
	$.getJSON("./json/hot.json",function(data){
		var html=template("hot-item",{result:data});
		$(".hot-warp").html(html);
	})
})