define(["jquery","template"],function($,template){
	$.getJSON("./json/goods2.json",function(data){
		var html=template("goods-2",{result:data});
		$(".goods-2").html(html);
		var text2=$(".goods-wrap .goods-item .product .text2");
		text2.each(function(i,elem){
			
			if($(elem).html()==""){
				$(elem).hide();
			}
			color(elem);
		});
		var text1=$(".goods-wrap .goods-item .product .text1");
		text1.each(function(i,elem){
			
			
			
			color(elem);
		});
		var status=$(".goods-wrap .goods-item .product .status");
		status.each(function(i,elem){
			if($(elem).html()==""){
				$(elem).hide();
			}
		})
		
	});
	function color(elem){
			
			if($(elem).html()=="原生态"||$(elem).html()=="产地直供"){
				$(elem).css({backgroundColor:"#F19B00"});
			}
			if($(elem).html()=="进口"){
				$(elem).css({backgroundColor:"#5F8CFF"});
			}
			if($(elem).html()=="有机"){
				$(elem).css({backgroundColor:"#3EAD00"});
			}
			if($(elem).html()=="促销"){
				$(elem).css({backgroundColor:"#FF326E"});
			}
			if($(elem).html()=="新品"){
				$(elem).css({backgroundColor:"#FF32D6"});
			}
		}
})