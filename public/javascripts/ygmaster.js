

window.addEventListener("load", function(){

    var resizeContentWrap = function(){
	var w_height = (window.innerHeight < 300 ) ? 300 : window.innerHeight;
	var w_width = (window.innerWidth < 800 ) ? 800 : window.innerWidth;
	
	$E("content_wrap").setHeight(w_height);
	$E("picture_stream_mask").setWidth(w_width - 135);
	
    };

    resizeContentWrap();
    window.addEventListener("resize", resizeContentWrap);

    setInterval(function(){
	var margin_left = $E("picture_stream_ul").getStyle("marginLeft");
	$E("picture_stream_ul").setStyle("marginLeft", parseInt(margin_left) - 1);
    }, 30);
    
    
});


var yg = {};



