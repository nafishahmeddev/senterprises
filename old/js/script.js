///jquery extend
(function( $ ){
	//ZoomIn
	$.fn.zoomIn = function(time) {
		$(this).css("transition","transform "+(time/1000)+"s, opacity "+(time/1000)+"s");
		$(this).css("opacity","1");
		$(this).css("transform","scale(1)");
	}; 
	//ZoomOut
	$.fn.zoomOut = function(time) {
		$(this).css("transition","transform "+(time/1000)+"s, opacity "+(time/1000)+"s");
		$(this).css("transform","scale(0)");
		$(this).css("opacity","0");
	}; 	
})( jQuery ); 

////spinner
function spinner(height, width){
	var con = ""+
	'<svg class="spinner" width="'+width+'" height="'+height+'" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">'+
	  ' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>'+
	'</svg>';
	
	return con;
}
/////btn-clicks

////navigaition switcher///
$(".nav-btn").click(function(){
	if($("header .nav").css("display")=="none"){
		$("header .nav").slideDown();	 
		
		$(".containner, .profile, footer, .logo").bind("click", function(){
			$("header .nav").slideUp();
		});
	} else {
		$("header .nav").slideUp();	 
		$(".containner").unbind("click", function(){}); 
	}
	
	
	
});
////screen-resize
$(window).on('resize', function(){
	if($(this).width() >= 850) { /* ... */ 
		$("header .nav").css("display", "inherit");	 
	} else {
		$("header .nav").css("display", "none");	 
	}
							
;})

