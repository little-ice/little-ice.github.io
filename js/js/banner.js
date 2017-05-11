define(["jquery"],function($){
	var banner={
		index:0,
		timer:null,
		init:function(){
			this.autoPlay();
			this.circleClick();
			this.mouseEnter();
			this.mouseLeave();
		},
		imgSwitch:function(){
			$('.banner-main').stop();
			if(this.index>=$('.banner-main img').length){
				$('.banner-main').css({marginLeft:0});
				this.index=1;
			}
			if(this.index<=-1){
				$('.banner-main').css({marginLeft:(-1263*$('.banner-main img').length)-1});
				this.index = $('.banner-main img').length- 2;
			}
			$(".banner-main").animate({marginLeft:-1263*this.index});
			$('.circle-item').removeClass('active');
			var j=this.index==$('.banner-main img').length-1 ? 0 : this.index;
			$('.circle-item').eq(j).addClass('active');
		},
		autoPlay:function(){
			var _this=this;
			 this.timer=setInterval(function(){
				_this.index++;
				banner.imgSwitch();
			},2000);
		},
		circleClick:function(){
			var _this=this;
			$(".circle-item").each(function(i){
				$(".circle-item").eq(i).click(function(){
					clearInterval(_this.timer);
					_this.index=i;
					_this.imgSwitch();
				})
			})
		},
		mouseEnter:function(){
			var _this=this;
			$('.banner-main').mouseenter(function(){
				clearInterval(_this.timer);
			})
		},
		mouseLeave:function(){
			var _this=this;
			$('.banner-main').mouseleave(function(){
				_this.autoPlay();
			})
		}
	}
	banner.init();
})