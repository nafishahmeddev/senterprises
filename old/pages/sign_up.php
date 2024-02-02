<?
include "nJSos.php";
list($getPage, $ref) = array_pad(explode('/',$site['seo'],2), 2, null);


?>
<?
$message_box="";
if($os->_post('sign_up')=="OK"){
	include("_library/email.php");
	//send_mail
	$mail = new email;
	$mail->email('html');
	
	$token = $os->random_token(6);
	//////////////////////////
	// Multiple recipients
	$from="admin@techearth.co.in";
	$fromName = "Techearth";
	$to = $os->_post("try_user_id");// note the comma
	$firstName = $os->_post("try_first_name");
	$lastName = $os->_post("try_last_name");
	$password = $os->_post("try_user_password");
	//check if user already exist
	$res_check = $os->m_q("SELECT * FROM members WHERE email='$to'");
	if($os->m_num_rows($res_check)==0){
		$insert_sql = $os->m_q("INSERT INTO members(memberId, firstName, lastName, displayPicture, dob, email, contact, package, active, password, subscription, endDate, address, verification, token) 
						VALUES (NULL, '$firstName', '$lastName', 'user.png', '', '$to', '', '', 'false', '$password', '', '', '', 'false', '$token')");			
		// Subject
		$subject = 'Your Verification code['.$token.'].';
		// Message
		$body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://medcarepillshop.com/?coupon=YbcAsdfQ/">
				<html>
					<head>
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
						<title>Your verification code is</title>
						<style>
						*{
							margin:0;
							padding:0;
						}
						.canvas{
							max-width:500px;
							margin:5px;
							border-radius:3px
						}
						.header{
							padding:10px;
							font-size:25px;
							background-color:rgb(36,36,36);
							color:#fff;
							border-radius:3px 3px 0px 0px;
						}
						.content{
							padding:10px;
							background-color:#fafbfc;
							border-radius:0px 0px 3px 3px ;
						}
						.content h2{
							padding:5px 0px;
							color:#000;
						}
						.content p{
							color:#777;
							line-height:20px;
							font-size:15px;
						}
						.content button{
							padding:15px 20px;
							border:none;
							background-color:rgb(235,235,59); border-radius:3px;
							font-size:20px;
							margin:20px 0px;
						}
						</style>
					</head>
					<body>
						<div class="canvas">
							<div class="header">Stream.com</div>
							
							<div class="content">
								<h2>Verify your email address</h2>
								<p>Thanks for signing up for Canvas! We are excited to have you as an early user.</p>
								<center><button onclick="window.location.href=`http://medcarepillshop.com/?coupon=YbcAsdfQ/.'`">Verify Email</button></center>
								<p>
								Thanks,<br>
								The Canvas Team
								<p>
							</div>
						</div>
					</body>
				</html>';

		$mail->sendMail($to,$from,$fromName,$subject,$body);
		$try_member = $os->m_f_a($os->m_q("SELECT * FROM members WHERE email='$to'"));
		$os->_session("user_logged", $try_member['memberId']);
		$message_box = "<span class='green'>Successfully registered</span>";
		$siter = $site['url']."profile";
		header('Location: '.$siter.'');
	} else {
		$message_box = "<span class='red'>User already Exist</span>";
	}
}
?>	

	<div class="containner">
		<div class="content background-white">
			<form  id="sign_up_form" method="post">
				<div class="p-l model-s background-white">
					<p class="p-m text-xl p-bottom-xl p-top-xl m-top-xxl m-bottom-xxl">SIGN UP</p>
					
					<div class="p-m s6">
						<div class="lolipop-input-group">
							<input type="text" required name="try_first_name"placeholder="Please enter your name"/>
							<label>FIRST NAME</label>
							<div></div>
						</div>
					</div>
					<div class="p-m s6">
						<div class="lolipop-input-group">
							<input type="text" required name="try_last_name"placeholder="Please enter your name"/>
							<label>LAST NAME</label>
							<div></div>
						</div>
					</div>
					<div style="clear:both"></div>
					<div class="p-m">
						<div class="lolipop-input-group">
							<input type="email" required name="try_user_id"placeholder="Ex. example@domain.com"  />
							<label>EMAIL</label>
							<div></div>
						</div>
					</div>
					<div class="p-m s6">
						<div class="lolipop-input-group">
							<input type="password" required name="try_user_password" id="try_user_password" placeholder=" " />
							<label>PASSWORD</label>
							<div></div>
						</div>
						<span class="red text-xs password-error" style="display:none">The password Must be 8 to 20 characters in length. Must contain at least one letter and one number and a special character from !@#$%^&*()_+. Should not start with a special character</span>
					</div>
					<div class="p-m s6">
						<div class="lolipop-input-group">
							<input type="password" required name="try_user_confirm_password" id="try_user_confirm_password" placeholder=" "/>
							<label>CONFIRM PASSWORD</label>
							<div></div>
						</div>
						<span class="red text-xs password-match-error" style="display:none">Password not matching</span>
					</div>
					<div style="clear:both"></div>
					<div class="p-m">
						<p class="text-s">By creating an account you agree to our Terms & Privacy.</p>
					</div>
					<div class="sign-up-message-box text-s p-m p-bottom-none"><? echo $message_box;?></div>
					<div class="p-m s6">
						<input name="sign_up" value="OK" type="hidden">
						<button name="sign_up" value="OK" class="s12 p-m border-xxs border-light-grey indigo background-transparent border-radius-xs" id="sign_up_btn" type="submit">SIGN UP</button>
						<div style="clear:both"></div>
					</div>
					<div class="p-m s6">
						<button class="s12 p-m border-xxs border-light-grey red background-transparent border-radius-xs" type="button" onclick="window.location.href='<? echo $site['url']; ?>'">CANCEL</button>
						<div style="clear:both"></div>
					</div>
					<div style="clear:both"></div>
					<div class="p-m">
						<p class="text-s">if you are a registered member the <a href="<? echo $site['url'];?>sign-in">click here</a> to sign in.</p>
					</div>
				</div>
			</form>
			<div style="clear:both"></div>
		</div>
	
	</div>
	<script>
	$("#try_user_password").change(function(){
		var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
		if( pattern.test($(this).val())==true){
			$("#sign_up_btn").prop('disabled', false);
			$(".password-error").hide();
		} else {
			$("#sign_up_btn").prop('disabled', true);
			$(".password-error").show();
		}
		
	})
	$("#try_user_confirm_password").change(function(){
		
		if($('#try_user_password').val()==$(this).val()){
			$("#sign_up_btn").prop('disabled', false);
			$(".password-match-error").hide();
		} else {
			$("#sign_up_btn").prop('disabled', true);
			$(".password-match-error").show();
		}
		
	});
	</script>