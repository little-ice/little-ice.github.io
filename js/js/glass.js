define(["jquery"],function(){
	$('.magnify .wrap img').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var src=$(this).attr("src");
		$('.middle img').attr({src:src});
		$('.b-img').attr({src:src});
	});
	$('.magnify .main').mouseenter(function(){
		$('.filter').show();
		$('.big').show();
		var offset=$(this).offset();
		var l=offset.left;
		var t=offset.top;
		
		$('body').mousemove(function(e){
			e=e||window.event;
			var x=e.clientX-l-100;
			var y=e.clientY-t-100;
			x=x<0?0:(x>150?150:x);
			y=y<0?0:(y>150?150:y);
			$('.filter').css({left:x,top:y});
			$('.b-img').css({left:-2*x,top:-2*y});
		});
	});
	$('.magnify .main').mouseleave(function(){
		$('.filter').hide();
		$('.big').hide();
	});

})