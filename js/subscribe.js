jQuery(document).ready(function($){
	var messages = $('div[data-type="message"]');
	//check if user updates the email field
	$('.cd-form .cd-email').keyup(function(event){	
		//check if user has pressed the enter button (event.which == 13)
		if(event.which!= 13) {
			//if not..
			//hide messages and loading bar 
			messages.removeClass('slide-in is-visible');
			$('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		}

		var emailInput = $(this),
			insertedEmail = emailInput.val(),
			atPosition = insertedEmail.indexOf("@");
	    	dotPosition = insertedEmail.lastIndexOf(".");
	    //check if user has inserted a "@" and a dot
	    if (atPosition< 1 || dotPosition<atPosition+2 ) {
	    	//if he hasn't..
	    	//hide the submit button
	    	$('.cd-form').removeClass('is-active').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	    } else {
	    	//if he has..
	    	//show the submit button
	    	$('.cd-form').addClass('is-active');
	    }
	});

	//backspace doesn't fire the keyup event in android mobile
	//so we check if the email input is focused to hide messages and loading bar 
	$('.cd-form .cd-email').on('focus', function(){
		messages.removeClass('slide-in is-visible');
		$('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	});	
	
	// Subscribe
	$('.cd-submit').click(function (event) {

        var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var emailVal = $('#cd-email').val();

        if (emailVal == "" || emailVal == "Enter your *") {
            $('.cd-response-error').addClass('is-visible');
            return false;

        } else if (!emailReg.test(emailVal)) {
            $('.cd-response-error').addClass('is-visible');
            return false;
        }

        var data_string = $('.cd-form').serialize();

        $.ajax({
            type: "POST",
            url: "subscribe.php",
            data: data_string,

            //success
            success: function (data) {
                $('.cd-response-success').addClass('slide-in');
            },
            error: function (data) {
                $('.cd-response-notification').addClass('is-visible');
            }

        }) //end ajax call
        return false;
    });
	
	//placeholder fallback (i.e. IE9)
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}
});