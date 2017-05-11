define(["jquery","template"],function($,template){
	$.getJSON("./json/week.json",function(data){
		var html=template("week-item",{result:data});
		$(".week-warp").html(html);
	})
})