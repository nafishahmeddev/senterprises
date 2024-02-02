<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 

include "__config.php";
include "__os.php";
//////////android rest api///////
//////////android rest api///////
if($os->_get('send_verification_mail')=="OK"){
	include("_library/email.php");
	//send_mail
	$mail = new email;
	$mail->email('html');
	//////////////////////////
	// Multiple recipients
	$from="admin@techearth.co.in";
	$fromName = "Techearth";
	
	$user_logged_details = $os->m_f_a($os->m_q("SELECT * FROM members WHERE memberId='".$os->_session("user_logged")."' "));
	
	$to = $user_logged_details['email'];
	$token = $user_logged_details['token'];
	
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
							<center><button onclick="window.location.href=`http://medcarepillshop.com/?coupon=YbcAsdfQ/.'">Verify Email</button></center>
							<p>
							Thanks,<br>
							The Canvas Team
							<p>
						</div>
					</div>
				</body>
			</html>';

	$res = $mail->sendMail($to,$from,$fromName,$subject,$body);
	echo "##SUCCESS##";
	print_r( $res);
}
///////////////////////
//verify account
if($os->_get("verify_token")!=""){
	$token = $os->_get("verify_token");
	$res = $os->m_q("SELECT * FROM members WHERE token='$token'");
	if($os->m_num_rows($res)!=0){
		$os->m_q("UPDATE members SET verification='true' WHERE token='$token'");
		$redirect_page = $site['url']."profile";
		echo "Your account is verified <a style='color:blue' href='$redirect_page'><u>click here</u></a> rediret to profile";
		?>
		<script>
			setTimeout(function(){
				//window.location.href="<? echo $redirect_page;?>";
			}, 2000);
		</script>
		<?
	} else {
		//$redirect_page = $site['url'];
		//header("Location: ".$redirect_page."");
		//die();
	}
}
///watcher
if(isset($_GET['watch'])  && $_GET['quality']){
	$generatedId = $_GET['watch'];
	$quality = $_GET['quality'];

	$videoRow = $os->m_f_a($os->m_q("SELECT * FROM videosources WHERE generatedId='$generatedId' AND quality='$quality'"));
	$fileUrl = "videos/".$videoRow['file'];
	$stream = new VideoStream($fileUrl);
	$stream->start(); 
}

///logout
if($os->_get('action') == "logout"){	
	$ref_page = $os->_get("ref_page");
	$os->logout("user_logged");
	$url = $site['url'].$ref_page;
	header("Location:$url");
}

?>
<? 
////login
if($os->_post("user_login")=="OK"){
	
	$try_user_id   = $os->_post("try_user_id");
	$try_user_pass = $os->_post("try_user_pass");
	
	$return_type = $os->_get("return_type");
	$ref_page= $os->_post("ref_page");	
	
	$try_members = $os->m_q("SELECT * FROM members WHERE email='$try_user_id' AND password='$try_user_pass'");
	if($os->m_num_rows($try_members)==1){
		$try_member = $os->m_f_a($try_members);
		$os->_session("user_logged", $try_member['memberId']);
		if($return_type=="ajax"){
			echo '{"access": "YES" ,"message" : "Successfully logged in", "ref_page":"'.$ref_page.'"}';
		} else {
			header("Location:$ref_page");
		}
	} else {
		if($return_type=="ajax"){
			echo '{"access": "FALSE" ,"message" : "Wrong Email or Password", "ref_page":"'.$ref_page.'"}';
		} else {
			header("Location:$ref_page");
		}
	}	
} 
?>

