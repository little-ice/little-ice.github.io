require(['../config'],function(){
	require(["jquery","shop","nav","glass"],function($){
		$(window).scroll(function(){
			var t=$('body').scrollTop();
			
			if(t>=25){
				$(".fixed-nav").show();
			}else{
				$(".fixed-nav").hide();
			}
		});
	});
})