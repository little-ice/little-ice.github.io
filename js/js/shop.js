define(["jquery","template","layer","jquery.cookie"],function($,template){
		/*
 	详情页面js
	
	0、渲染颜色分类(读取数据)
 	1、颜色的切换
 	2、增加数量
 	3、减少数量
 	4、直接修改input
 	5、加入购物车
	*/
	layer.config({path: 'js/plug/layer/' });
	var detail={
		data:{},
		init:function(){
			var _this=this;
			$.getJSON("./json/goods.json",function(data){
				_this.data=data;
				var item=template('size-item',data);
				$('.size-wrap').html(item);
				var first=$('.size-wrap .size-item:first');
				first.addClass('select');
				var id=first.data('size');
				var stock=first.data('stock');
				var price=first.data('price');
				$('.price-tag .price').html(price);
				$('.num .stock .stock-num').html(stock);

			});
			_this.changeColor();
			_this.reduce();
			_this.increase();
			_this.input();
			_this.addCart();
		
		},
		changeColor:function(){
			var _this=this;
			$('.size-wrap').on('click','.size-item',function(){
				
				$(this).addClass('select').siblings().removeClass('select');
				var id=$(this).data('size');
				var stock=$(this).data('stock');
				var price=$(this).data('price'); 
				$('.price-tag .price').html(price);
				$('.num .stock .stock-num').html(stock);
			})
		},
		reduce:function(){
			$(".num .btn-l").click(function(){
				var input=$(this).parent().find('.amount-input');
				var value=parseInt( input.val() );
				if(value<=1) return;
				value--;
				input.val(value);
			})
		},
		increase:function(){
			$(".num .btn-r").click(function(){
				var input=$(this).parent().find('.amount-input');
				var value=parseInt( input.val() );
				var stock=$('.num .stock .stock-num').html();
				if(value>=stock) return;
				value++;
				input.val(value);
				})
		},
		input:function(){
			$('.amount-input').on("input",function(){
				var value=$(this).val();
				if(value=="") return;
				value=parseInt($(this).val());
				if(isNaN(value)){
					value=1;
				}
				var stock=$('.num .stock .stock-num').html();
				if (value>=stock) {
					value=stock;
				}
				$(this).val(value);
			});
			$('.amount-input').blur(function(){
				var value=$(this).val();
				if(value==''){
					$(this).val(1);
				}

			})
		},
		addCart:function(){
			$('.shop-add').click(function(){

				layer.alert('成功加入购物车!',{icon:1}, function(){
					layer.closeAll();
					var goods=$(".size-item.select");
					var id=goods.data('size');
					var amount=parseInt($('.amount-input').val());
					var cart=$.cookie('cart')||"{}";
					cart=JSON.parse(cart);
					if(!cart[id]){
						cart[id]={
							id:id,
							amount:amount
						}
					}else{
						cart[id].amount+=amount;
					}
					$.cookie('cart',JSON.stringify(cart),{expires:365,path:'/'});
					
				});
			});
			$(".collect").click(function(){
				layer.alert('加入收藏成功！',{icon:1});
			})
		}

	}
	detail.init();
	
})