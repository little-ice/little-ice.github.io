/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除 (单个删除  批量删除)
 	8、选中
 	9、结算信息填充
*/
define(['jquery',"layer","template","jquery.cookie"],function($,layer,template){
	layer.config({path: 'js/plug/layer/' });
	var cart={
		cart:{},
		data:{},
		init:function(){
			this.readCookie();
			var _this=this;
			
			$.getJSON('./json/goods.json',function(data){
				_this.data=data;
				var result={
					data:data,
					cart:_this.cart
				}
				$(".cart-content").html(template("goods-item",result));
				
			});
			this.increase();
			this.decrease();
			this.input();
			this.delete();
			this.deleteSelect();
			this.select();
			this.selectAll();
		},
		increase:function(){
			var _this=this;
			$('.cart-content').on('click','.btn-r',function(){
				var amount = parseInt(  $(this).prev().val() );
				var stock = $(this).parent().data('stock');
				if(amount >= stock) return;
				amount++;
				
				$(this).prev().val(amount);
				_this.handleMoney($(this),amount);
				
			});
		},
		decrease:function(){
			var _this=this;
			$('.cart-content').on('click','.btn-l',function(){
				var amount = parseInt(  $(this).next().val() );
				if(amount<=1) return;
				amount--;
				$(this).next().val(amount);
				_this.handleMoney($(this),amount);
			});
		},
		input:function(){
			var _this=this;
			$('.cart-content').on('input','.amount-input',function(){
				var amount=$(this).val();
				if(amount=="") return;
				amount=parseInt($(this).val());
				if(isNaN(amount)){
					amount=1;
				}
				var stock = $(this).parent().data('stock');
				if (amount>=stock) {
					amount=stock;
				}
				$(this).val(amount);
				_this.handleMoney($(this),amount);
			});
			$('.cart-content').on('blur','.amount-input',function(){
				var amount=$(this).val();
				if(amount==""){
					amount=1;
				}
				$(this).val(amount);
				_this.handleMoney($(this),amount);
			});
		},
		handleMoney:function(obj,amount){
			var price=obj.parents(".cart-goods-item").find('.goods-price').html();
				var money=amount*price;

				obj.parents(".cart-goods-item").find('.price-all').html(money.toFixed(2));
				var id=obj.parents(".cart-goods-item").data('id');
				this.cart[id].amount=amount;
				this.setCookie();
				this.handInfor();

		},
		delete:function(){
			var that=this;
			$('.cart-content').on('click','.delete',function(){
				var _this=this;
				layer.confirm("确定要删除吗？",function(){
					layer.closeAll();
					$(_this).parents(".cart-goods-item").remove();
					var id=$(_this).parents(".cart-goods-item").data('id');
					delete that.cart[id];
					that.setCookie();
				});
			});
		},
		deleteSelect:function(){
			var _this=this;
			$(".cart-foot .options .delete").click(function(){
				var allChecked=$(".cart-content").find('input[type=checkbox]:checked');
					
					if(allChecked.length<=0){
						layer.alert("请选择商品");
						return;
					}
					layer.confirm("确认删除选中的商品吗？",function(){
						allChecked.each(function(){
							layer.closeAll();
							$(this).parents(".cart-goods-item").remove();
							var id=$(this).parents(".cart-goods-item").data('id');
							delete _this.cart[id];
							_this.setCookie();
							_this.handleInfo();
							$('input.select-all-btn').prop('checked',false);
							
						});
						
					})
				
			});
		},
		select:function(){
			var _this=this;
			$('.cart-content').on('change','.select-btn',function(){
				_this.handInfor();
				var allChecked=$(".cart-content").find('input[type=checkbox]:checked');
				var allCheckbox=$(".cart-content").find('input[type=checkbox]');
				if(allChecked.length==allCheckbox.length){
					$(".select-all-btn").prop('checked',true);
				}else{
					$(".select-all-btn").prop('checked',false);
				}
			});
		},
		selectAll:function(){
			$(".select-all-btn").click(function(){
				var status=$(this).prop("checked");
				$('.cart-content').find("input[type=checkbox]").prop("checked",status);
				$('.cart-content').find("input[type=checkbox]").change();
			});
		},
		handInfor:function(){
			var allChecked=$(".cart-content").find('input[type=checkbox]:checked');
			var allNum=0;
			var allMoney=0;

			allChecked.each(function(){
				allNum++;
				var money=$(this).parents('.cart-goods-item').find(".price-all").html();
				allMoney+=parseFloat(money);
			})
			if(allNum>0){
				$('.go-pay').addClass("select");
			}else{
				$('.go-pay').removeClass("select");
			}
			$('.cart-info .goods-money .user-goods-money').html(allMoney.toFixed(2));
			$('.cart-info .goods-amount .user-goods-amount').html(allNum);
		},
		readCookie:function(){
			this.cart=$.cookie('cart')||"{}";
			this.cart=JSON.parse(this.cart);
		},
		setCookie:function(){
			$.cookie('cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}
	}
	cart.init();
})