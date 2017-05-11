require(["../config"],function(){
	require(["jquery",'jquery.cookie',"sfq","banner","weekItem","promotion","hot","health","goods2","nav"],function($){
		$(".backtop").click(function(){
			$('html,body').animate({scrollTop:0});
		});
		$(window).scroll(function(){
			var t=$('body').scrollTop();
			
			if(t>=25){
				$(".fixed-nav").show();
			}else{
				$(".fixed-nav").hide();
			}
		});
		var userinfo = $.cookie('userinfo');
		
		//如果有用户信息
		if(userinfo){
			//将json字符串转化为json对象
			userinfo = JSON.parse(userinfo);
			//用户处于登录状态,更改信息
			if(userinfo.login_status){
				$('.user').html('您好! '+ userinfo.account + '<a href="javascript:;" class="logout">退出</a>' );
			}else{
				$('.user').html( '<a href="enter.html">登录</a>' );
			}
		}
		console.log(userinfo);
		//退出
		$('.logout').click(function(){
			var info = {
				account: userinfo.account,
				login_status: 0
			};
			$.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
			location.href = "enter.html";
		});

	})
})