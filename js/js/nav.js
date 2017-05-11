define(["jquery"],function($){
	$.getJSON("./json/nav.json",function(data){

		$('.nav-moddle li').each(function(i,elem){
				var con="";
				
				for(var j=0,len=data[i].length;j<len;j++){
					con+=`<li><a href=""><sapn>${data[i][j]}</span></a></li>`
					
				}
				$(elem).find(".nav-small").html(con);
				

		});

		$('.nav1 li').each(function(i,elem){
				var con="";
				
				for(var j=0,len=data[i].length;j<len;j++){
					con+=`<li><a href=""><sapn>${data[i][j]}</span></a></li>`
					
				}
				$(elem).find(".nav2").html(con);
				

		})
	})
})