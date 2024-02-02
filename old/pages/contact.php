<?
include "__os.php";
?>

<?
$message= "";
if(isset($_POST['query'])){
	$fName = $_POST['fName'];
	$lName = $_POST['lName'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$cap = $_POST['captcha'];

	$message = $_POST['message'];
	$date = date("Y-m-d h-i-s");
	$rows = "
		contactid, name, email, mobile, details, addedBy, addedDate, active, image, status
	";
	
	$values = "
		'', '".$fName." ".$lName."', '".$email."', '".$phone."', '".$message."', '', '".$date."', '1', '', 'new'
	";
	
	if($_SESSION["code"] == $cap){ 
		$_OS->m_q("INSERT INTO contactus ($rows) VALUES ($values)");
		$message = '<a style=" font-size:11px; color:green">Thak you ! for contacting us.</a>';
	} else {
		 $message = '<a style=" font-size:11px; color:red">invalied captcha.</a>';
	}
	
}
?>

	<div class="containner">
		<div class="p-l">
			<div class="model-s  text-m ">
				<h3 class="p-m  blue-gray center m-top-xxl m-bottom-xxl text-xxl font-weight-s">Mail Us</h3>
				<form enctype="multipart/form-data" method="post" >
					
					
					<div class="s6 p-m">
						<div class="lolipop-input-group">
							<input name="fName" class="p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol"  type="text" required />
							<label class="gray  font-weight-xl">First Name</label>
							<div></div>
						</div>
					</div>
					<div class="s6 p-m">
						<div class="lolipop-input-group">
							<input name="lName" class="p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol" type="text" required />
							<label class="gray  font-weight-xl">Last Name</label>
							<div></div>
						</div>
					</div>
					<div class="s12 p-m">
						<div class="lolipop-input-group">
							<input name="email" class="p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol" type="email" required />
							<label class="gray  font-weight-xl" class="gray  font-weight-xl">Email</label>
							<div></div>
						</div>
					</div>
					<div class="s12 p-m">
						<div class="lolipop-input-group">
							<input name="phone" class="p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol" type="text" required />
							<label class="gray  font-weight-xl">Phone</label>
							<div></div>
						</div>
					</div>
					<div class="s12 p-m">
						<div class="lolipop-input-group">
							<textarea name="message" class="text-m p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol" style="height:80px" required></textarea>
							<label class="gray  font-weight-xl">Message</label>
							<div></div>
						</div>
					</div>
					<div class="p-m"> 
						<table class="s" style="border-collapse:collapse; width:100%; margin-top:0px">
							<tr>
								<td width="90px"> 
									<img class="border-radius-xs" style="height:38px; width:85px" src="pages/captcha.php" />
								</td>
								<td>
									<div class="lolipop-input-group">
										<input class="p-top-m p-bottom-s s background-lighter-gray border-none border-bottom-xxs font-weight-xl lol" type="text" name="captcha" />
										<label></label>
										<div></div>
									</div>
								</td>
							</tr>
						</table>
					</div>
					<div class="p-m center">
						<table class="s" style="border-collapse:collapse; width:100%; margin-top:0px">
							<tr>
								<td class="center text-s p-bottom-m"><? echo $message; ?></td>
							</tr>
							<tr>
								<td  width="100px">
									<button style="letter-spacing:2px" class="s12 p-m border-xxs border-light-grey indigo background-transparent border-radius-xs" name="query">SEND</button>
								</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
			<div style="clear:both"></div>
		</div>		
	</div>

	