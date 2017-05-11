require(['../config'],function(){
	require(["jquery","layer","nav","jquery.cookie"],function($,layer){
		$(window).scroll(function(){
			var t=$('body').scrollTop();
			
			if(t>=25){
				$(".fixed-nav").show();
			}else{
				$(".fixed-nav").hide();
			}
		})
		$(".title li ").click(function(){
			$(this).each(function(i,elem){

				$(elem).find('.main').show();
				$(elem).siblings().find('.main').hide();
				$(elem).addClass('active').siblings().removeClass('active');

			})
		})
		$('.btn-login').click(function(){
			var account = $('.mb .form-item .account').val();
			var psw = $('.mb .form-item .password').val();
			//判断是否输入为空
			if(account=='' || psw == ''){
				$(".notice").html('用户名或者密码不能为空');
				return;
			}

		layer.config({path: 'js/plug/layer/' });
		$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/login.php',
				data: {
					account: account,
					password: psw
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status) {
						layer.alert('登录成功', {icon:1});

						//判断是否需要自动登录
						//if( $('#remember').prop('checked') ){
							var userinfo = {
								account: account,
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
						//}

						//大部分会跳转到首页
						location.href = 'index.html';
					}else{
						layer.alert('登录失败', {icon: 2});
					}
				}
			});
		});
	})
})