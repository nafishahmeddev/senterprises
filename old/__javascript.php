	<script>
	///////btn-clicks/////
	$('.logo').click(function(){
		window.location.href = "<? echo $_SITE->__FRONTEND_DIR;?>";
	});
	$(".login-btn").click(function(){
		window.location.href = "<? echo $_SITE->__FRONTEND_DIR."sign-in/".$_SITE->__SEO_URL;?>";
	});
	
	////////sign_up//////
	$("#sign_up_form").submit(function(event){
		event.preventDefault();
		var $form = $(this);
		var serializedData = $form.serialize();
		
		var pass = $("#try_user_password").val();
		var conf_pass = $("#try_user_confirm_password").val();
		if( pass===conf_pass){
			$(".sign-up-message-box").html("please wait while loading");
			request = $.ajax({
				url: "<? echo $_SITE->__FRONTEND_DIR; ?>nJSajax.php?return_type=ajax",
				type: "post",
				dataType: "text json",
				data: serializedData
			});
			
			// Callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				$(".sign-up-message-box").html(response['message']);
				//console.log(response['verification_code']);
			});
		
			// Callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// Log the error to the console
				console.error(
					"The following error occurred: "+
					textStatus, errorThrown
				);
			});
		} else { 
			$(".sign-up-message-box").html("<span class='red'>password not matching</span>");
		}
	});
	////////login///////
	$("#login_form").submit(function(event){
		event.preventDefault();
		var $form = $(this);
		var serializedData = $form.serialize();
		
		$(".sign-in-message-box").html("please wait while loading");
		request = $.ajax({
			url: "<? echo $_SITE->__FRONTEND_DIR; ?>nJSajax.php?return_type=ajax",
			type: "post",
			dataType: "text json",
			data: serializedData
		});
	
		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			if(response['access']=="YES"){
				window.location.href = response['ref_page'];
				$(".sign-in-message-box").html(response['message']);
			} else {
				$(".sign-in-message-box").html("<span class='red'>"+response['message']+"</span>");
			}
		});
	
		// Callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// Log the error to the console
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});
		// if the request failed or succeeded
		request.always(function () {
			//$(".popup").zoomOut(600);
		});
		
	});
	</script>