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
		layer.config({path: 'js/plug/layer/' });
		var  regStatus = {
			cok:false,
			psw: false,
			uname: false,
			pswa:false

		};
		var pswInput = $('.password'),
			pswAgInput=$('.password-again'),
			unameInput = $('.form-item .uname'),

			regBtn = $('.btn-reg');


		var regPsw = /^[\w!@#$%^&*_+]{6,16}$/; 
			
			
			pswInput.blur(function(){
				var pswval = pswInput.val();
				regStatus.psw = true;
				$(this).parent().css({borderColor:"#599C3B"});
				$(".notice").html('');
				if(!regPsw.test(pswval)){
					$(".notice").html('请输入6-16位密码');
					$(this).parent().css({borderColor:"#FF0000"});
					regStatus.psw = false;
					return;
				}
				pswAgInput.blur(function(){
					var pswAval = pswAgInput.val();
					regStatus.pswa = true;
					$(this).parent().css({borderColor:"#599C3B"});
					$(".notice").html('');
					if(pswAval!=pswval){
						$(".notice").html('两次密码输入不一致');
						$(this).parent().css({borderColor:"#FF0000"});
						regStatus.pswa = false;
						return;
					}
					
				})
			})
		
		//手机号验证
		var regUname = /^1[3578]\d{9}$/; 
		
			
			unameInput.blur(function(){
				var unameval = unameInput.val();
				
				regStatus.uname = true;
				$(".notice").html('');
				$(this).parent().css({borderColor:"#599C3B"});
				if(!regUname.test(unameval)){
					$(".notice").html('手机号码格式不正确');
					$(this).parent().css({borderColor:"#FF0000"});
					regStatus.uname = false;
					return;
				}
				$.ajax({
					url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
					data: {
					account: unameval
					},
					dataType: 'jsonp',
					success: function(result){
						if(result.status){
							$(".notice").html('手机号还未被注册');
							 
						}else{
						$(".notice").html('手机号未被注册');
							regStatus.uname = false;
						}
						
						
					
					}
				});
			});
		
		
		//点击登录
		regBtn.click(function(){
			var check=$('.form-item #ok').prop("checked");
				
				regStatus.cok=check;
				
			
			
			//判断所有的信息状态，如果有不合法的，不能注册
			for(var i in regStatus){
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!regStatus[i]){
					$(".notice").html('部分数据不合法');
					return;
				}
			}
		
			//通过ajax提交表单数据
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: unameInput.val(),
					password: pswInput.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						layer.alert('注册成功', {icon:1});
					}else{
						layer.alert('注册失败', {icon:2});
					}
				}
			});
		});

		
	})
})