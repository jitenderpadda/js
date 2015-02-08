(function ($) {

	'use strict';		
	
	/* ==============================================
	Navigation visibility control
	=============================================== */
	$(window).scroll(function() {		
		var nT = $(this).scrollTop();			
		if (nT >= 10) {
			$('#header').addClass('scrolled');
		}else {
			$('#header').removeClass('scrolled');				
		}		
	});
	
	/* ==============================================
	Navigation item fade effect
	=============================================== */
	
	fadeNavitems();

}(jQuery));

/* ==============================================
	window on load function
=============================================== */
	
jQuery(window).load(function() {
	/*=================================================================
	Smooth scroll for menu links
	===================================================================*/       
	jQuery('#menu-main-nav a[href^="#"],.nav-logo').on('click', function(e) {
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top-40}, 1200);
	$('#nav').animate({'top':-380 +'px'}, 500, 'swing');
		$('#nav ul li, #nav .nav-logo, #nav .close').hide();
		$('#nav').css({'height': 'auto'});

	});
});

/* ==============================================
	Navigation item fade effect function
=============================================== */
function fadeNavitems() {
	var lis = $('#nav ul li').hide();          
	$('.navicon').click(function() {
		$('#nav').animate({'top':0 +'px'}, 500, 'swing');
		var winH = $(document).height();
	
		var i = 0;   
		setTimeout(function() {(
			function displayImages() {
				$('#nav .nav-logo, #nav .close').fadeIn('slow');
				lis.eq(i++).fadeIn(200, displayImages);
			})();
		}, 500); 
		
		if ($(window).width() < 1200) {
			$('#nav').css({'height': winH});
		}	
	}); 

	$('#nav .close').click(function() {
		$('#nav').animate({'top':-120 +'px'}, 500, 'swing');
		$('#nav ul li, #nav .nav-logo, #nav .close').hide();
		$('#nav').css({'height': 'auto'});
		$("#header").css({opacity:1});
	});
}






    



