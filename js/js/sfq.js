define(["jquery"],function($){
	var sfqAll=$('.sfq-item');
	sfqAll.mouseenter(function(){
		$(this).stop(true)
		.animate({width:960}).siblings().stop(true).animate({width:60});

	})
	$('.sfq-main').mouseleave(function(){
		$('.sfq-item').stop(true).animate({width:240});
	})
})