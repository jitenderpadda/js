(function ($) {

'use strict';

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var windowHeight = jQuery(window).height();	
var windowWidth = jQuery(window).width();
var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
$(document).ready(function() {
	/* ==============================================
	WOW plugin triggers animation.css on scroll
	=============================================== */
	
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       150,          // distance to the element when triggering the animation (default is 0)
		mobile:       false        // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();
	
	/* ==============================================
	Skill Bars
	=============================================== */

	$('.skills-col').waypoint(function() {
	   jQuery('.skillbar').each(function(){
			jQuery(this).find('.skillbar-bar').animate({
				width:jQuery(this).attr('data-percent')
			},2000);
		});
		
		}, { offset: '100%' 
	});
	
	/* ==============================================
	Parallax
	=============================================== */
	$(window).stellar({ 
          horizontalScrolling: false,
		  verticalOffset: 150,
          responsive: true,		  
        parallaxElements: true,
        hideDistantElements: true
	  });  
	  
	  // Sections backgrounds
    
    var pageSection = $(".page-section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
	
	// Fullwidth slider
	$(".fullwidth-slider").owlCarousel({
		//transitionStyle: "backSlide",
		slideSpeed: 350,
		singleItem: true,
		autoHeight: true,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	});	
	

	
	init_services();
	service_height_init();
	$(window).resize(function(){
        
        service_height_init();
        
    });
	/* ==============================================
	Testimonial Slider
	=============================================== */
	$("#testimonials-slider").owlCarousel({
       slideSpeed: 350,
		singleItem: true,
		autoHeight: true,
		navigation: false
		
    });

	/* ==============================================
	clients Slider
	=============================================== */
	$("#clients").owlCarousel({
        navigation: false,
        pagination: false,
		autoPlay:5000,
        items: 5,
        navigationText: false
    });
	
	/* Banner text rotator
			================================================= */		
	var ut_word_rotator2 = function() {
		var ut_rotator_words2 = [
			'Lorem ipsum dolor sit amet consetetur',
			'Praesent faucibus nisl sit amet nulla seds',
			'Aenean in magna aliquet maecenas urna placerat'
		] ,
		counter = 0;                
		setInterval(function() {
		$(".banner-text-rotator2").fadeOut(function(){$(this).html(ut_rotator_words2[counter=(counter+1)%ut_rotator_words2.length]).fadeIn();});}, 4000 );
	}
	ut_word_rotator2();
			
	/* ==============================================
	Contact Form
	=============================================== */
	$('#contactform').submit(function(){
		var action = $(this).attr('action');
		$("#message").slideUp(750,function() {
		$('#message').hide();
 		$('#submit')
			.after('<img src="img/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');
		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			comments: $('#comments').val(),
		},
			function(data){
				if(data.match('success') != null) document.getElementById('message').innerHTML = "<p class='lead'><strong>Thank you.</strong><br>We have received your message and will be in touch with you shortly.</p>";
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');
			}
		);
		});
		return false;
	});
	
	/*=================================================================
		Number counter
	===================================================================*/
	
	$('#facts').waypoint(function(){
		$('.increment').counterUp({
			delay: 10,
			time: 1000
		});
	}, {
		offset: function() {
		return $(window).height() - 300;
		},
		triggerOnce: true 
	});
	
	/* ==============================================
	Back to Top
	=============================================== */
	$('.scroll-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '1000');
		  return false;
	});
	
	/*=================================================================
		About us block hover effect
	===================================================================*/
	$(".grid article").mouseover(function(){return $(this).addClass("lasthover"),$(this).siblings().removeClass("lasthover")})
	

	/* ==============================================
	fancybox for media i.e. video 
	=============================================== */
	$('.fancybox-media').fancybox({
		padding:"0px",
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});
	
	/* ==============================================
	fancybox for image gallery
	=============================================== */
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});

	$(".teampopup").fancybox({
		maxWidth	: 800,
		maxHeight	: 400,
		fitToView	: false,
		width		: '60%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		padding:0
	});
	/*=================================================================
		placeholder support for IE9
	===================================================================*/
	$('input, textarea').placeholder();
	
});	
	
/* ==============================================
	window on load function
=============================================== */
jQuery(window).load(function() {

	/*=================================================================
	Smooth scroll for menu links
	===================================================================*/       
	jQuery('.arrow-block a[href^="#"],.section-scroll a[href^="#"],.slider-teaser a[href^="#"],.footer-menu a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top-40}, 1200);

	});
	
	
	/*=================================================================
	TwitterFeed
	===================================================================*/ 
		
	$('#twitter-box').tweet({
		modpath: 'js/twitter/',
		list_id: 'twitter-box',
		count: 4,
		avatar_size: 0,
		loading_text: 'loading twitter feed',
		username:'contact20twelve'
	});
	
	/*=================================================================
	twitter slider
	===================================================================*/ 
	
	$("#tweet-slider").owlCarousel({
		navigation: true,
		pagination: false,
		items: 1,
		navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "goDown"
	});	
	
	/*=================================================================
	Home parallax heading animation
	===================================================================*/ 
	if (isMobile == false) {
		$(window).scroll(function(){
		var scrollAmount = $(window).scrollTop()/2;
			$('#slideshow-info').css('padding-top', scrollAmount);	
		});	
		$(window).scroll(function(){
			if($(window).scrollTop()<windowHeight/3){
				$('#slideshow-info').fadeIn(1400);
			} else {
				$('#slideshow-info').fadeOut(1400);
			}
		});
	}
	
});


/* ---------------------------------------------
 Services section
 --------------------------------------------- */
    
var service_item = $(".service-item");
var service_descr = service_item.find(".service-descr");
var service_descr_top;

function init_services(){
    (function($){
    
        $(".service-item").each(function(){
            $(this).find(".service-descr").prepend($(this).find(".service-intro").html());
        });
        
        // Hover        
        service_item.click(function(){
            if ($("html").hasClass("mobile")) {
                if ($(this).hasClass("js-active")) {
                    $(this).removeClass("js-active");
                }
                else {
                    $(this).addClass("js-active");
                }
            }
        });
        
    })(jQuery);
}

function service_height_init(){
    (function($){
    
        var service_max_height = 0;
        if ($(window).width() >= 767) {
            service_item.each(function(index){
                $(this).css("height", "auto");
                if ($(this).height() > service_max_height) {
                    service_max_height = $(this).height();
                }
            });
            
            if (service_max_height > service_item.width() * 0.9) {
                service_item.height(service_max_height);
            }
            else {
                service_item.height(service_item.width() * 0.9);
            }
        }
        
        var service_descr_offset;
        var service_intro_offset;
        service_descr.each(function(){
            service_descr_offset = $(this).height() / 2;
            service_intro_offset = $(this).parent(".si-inner").find(".service-intro").height() / 2;
            $(this).parent(".si-inner").find(".service-intro").css("top", service_descr_offset + "px");
            $(this).parent(".si-inner").find(".service-descr").css("top", -service_intro_offset + "px");
            
        });
        
        // Split sections	
        $(".split-section-content").css("height", "auto");
        if ($(window).width() > 992) {
            $(".split-section-content").equalHeights();
        }
        
    })(jQuery);
}
// Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);
	
}(jQuery));





    



