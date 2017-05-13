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
		$('.eat').click(function(){
			$(this).parents('.other-title').find('.l').css({borderColor:"#bbb"});
			$(this).parents('.other-title').find('.m').css({borderColor:"#599C3B"});
			$(this).addClass("active").siblings().removeClass('active');
			$(this).parents('.other-l').find('.content1').hide();
			$(this).parents('.other-l').find('.content2').show();
		});
		$('.goods').click(function(){
			$(this).parents('.other-title').find('.l').css({borderColor:"#599C3B"});
			$(this).parents('.other-title').find('.m').css({borderColor:"#bbb"});
			$(this).addClass("active").siblings().removeClass('active');
			$(this).parents('.other-l').find('.content2').hide();
			$(this).parents('.other-l').find('.content1').show();
		});
	});
})