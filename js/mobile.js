$(function(){
	$(".top").on("click",function(){
		$('html,body').animate({scrollTop:0},500);
	})
	var $lyBtn=$("#lyBtn"),
		$lyDataTable=$("#lyDataTable"),
		$lsBtn=$("#lsBtn"),
		$lsDataTable=$("#lsDataTable"),
		$lyRank=$("#lyRank"),
		$lyId=$("#lyId"),
		$lySearch=$("#lySearch");
	$lyBtn.on("click",function(){
		getLyData($lyDataTable);
	});
	$lsBtn.on("click",function(){
		getLsData($lyDataTable);
	});
	$lySearch.on("click",function(){
		var id=$lyId.val();
		$.ajax({
		  url: "js/lyRankData.json?lyid="+id,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.resultCode==1){			
				$lyRank.html(o.data.weileNumber+"财富值为"+o.data.riches);
			}else{
				$lyRank.html("<tr><td>数据加载失败...</td><tr/>");
			}
		});
	})
	function getLyData(ctx){
		$.ajax({
		  url: "js/lyTopData.json",
		  context: ctx,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.resultCode==1){
				var str="";
				for(var i=0,len=o.data.length;i<len;i++){
					str+="<tr><td>"+"第"+(i+1)+"名"+"</td><td>"+o.data[i].weileNumber+"</td><td>"+o.data[i].riches+"</td></tr>"
				}
				ctx.html(str);
			}else{
				ctx.html("<tr><td>数据加载失败...</td><tr/>");
			}
		});
	}
	function getLsData(ctx){
		$.ajax({
		  url: "js/lsTopData.json",
		  context: ctx,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.resultCode==1){
				var str="";
				for(var i=0,len=o.data.length;i<len;i++){
					str+="<tr><td>"+"第"+(i+1)+"名"+"</td><td>"+o.data[i].lsName+"</td></tr>"
				}
				ctx.html(str);
			}else{
				ctx.html("<tr><td>数据加载失败...</td><tr/>");
			}
		});
	}

	getLyData($lyDataTable);
	getLsData($lsDataTable);

	// setInterval(function(){
	// 	getLyData($lyDataTable);
	// 	getLsData($lsDataTable);	
	// },5000);
});