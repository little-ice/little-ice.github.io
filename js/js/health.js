define(["jquery","template"],function($,template){
	$.getJSON("./json/health.json",function(data){
		var html=template("health-item",{result:data});
		$(".health-warp").html(html);
	})
})