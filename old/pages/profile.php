<? 
include "nJSos.php";

if($os->_session("user_logged")==""){
	$redirect = $site["url"]."sign-in/profile";
	?>
	<script>window.location.href="<? echo $redirect;?>";</script>
	<?
	exit();
}
$user_logged_details = $os->m_f_a($os->m_q("SELECT * FROM members WHERE memberId='".$os->_session("user_logged")."' "));
?>
	<div class="containner">
		<div class="content p-l">
			<?
			if($user_logged_details['verification']=="false"){
			?>
			<div class=" center m-top-xl m-bottom-xl p-top-xl p-bottom-xl">
				<h1 class="p-m"><i class="icon red" style="font-size:200px">error_outline</i></h1>
				<h2 class="text-xxl p-m font-weight-xs">Verify your account</h2>
				<p class="text-l p-m font-weight-m">We have sent an verification email to your email address. Pleas check your inbox for verification. </p>
				<p class="text-l p-m font-weight-m"><a id="send_verification_mail" class="blue"><u>click here</u></a> to send verification mail again.</p>
			</div>
			<script>
			$("#send_verification_mail").click(function(){
				request = $.ajax({
					url: "<? echo $site['url']; ?>nJSajax.php?send_verification_mail=OK",
					type: "post",
					dataType: "html",
				});
				// Callback handler that will be called on success
				request.done(function (response, textStatus, jqXHR){
					alert("An email sent succesfully");
				});
				// Callback handler that will be called on failure
				request.fail(function (jqXHR, textStatus, errorThrown){
					// Log the error to the console
					console.error(
						"The following error occurred: "+
						textStatus, errorThrown
					);
				});
			})
			</script>
			<?
			} else { 
			?>
			<div class="model-m">
				
				
				<div class="p-m">
					<div  style="width:250px; padding-top:250px; border-radius:250px; margin:auto; background-size:cover; background-position:center;  background-image:url(<? echo $site['images'].$user_logged_details['displayPicture'];?>)"></div>
				</div>
				<div class=" p-m">
					
					<div class="background-off-white  border-xxs border-lighter-grey border-radius-s">
						
						<div class="p-m">
							<div class="text-m">
								<p class="text-xl   font-weight-m blue-grey m-bottom-s p-s" style="letter-spacing:1px">
									<? echo $user_logged_details['firstName'];?> <? echo $user_logged_details['lastName'];?>
								</p>
								
								<label class="p-s text-s indigo" style="text-transform:uppercase; display:block">Date of birth</label>
								<p class="p-s p-top-none text-m "> <? echo $user_logged_details['dob'];?></p>
									
								<label class="p-s text-s indigo " style="text-transform:uppercase; display:block">Email</label>
								<p class="p-s p-top-none text-m "><? echo $user_logged_details['email'];?></p>
								
								<label class="p-s text-s indigo " style="text-transform:uppercase; display:block">Contact</label>
								<p class="p-s p-top-none text-m "><? echo $user_logged_details['contact'];?></p>
								
								<label class="p-s text-s indigo " style="text-transform:uppercase; display:block">Address</label>
								<p class="p-s p-top-none text-m "> <? echo $user_logged_details['address'];?></p>
								
							</div>
						</div>
						<div style="clear:both"></div>
					</div>
				</div>
				<div class=" text-m p-m">
					<div class="background-off-white  border-xxs border-lighter-grey border-radius-s">
						<div class="p-l border-bottom-xxs border-lighter-grey">
							<span class="text-xl p-left-s  font-weight-m blue-grey" style="display:inline-block; letter-spacing:2px; text-transform:uppercase">Subscription</span>
						</div>
						<div class="p-m">
							<div class="p-s">
								<table  style="border-collapse:collapse;" class="s12">
									<tr>
										<td class="p-s grey v-align-top">Package</td>
										<td class="p-s v-align-top right"><? echo $user_logged_details['package'];?></td>
									</tr>
									<tr>
										<td class="p-s grey v-align-top">Subscribed date</td>
										<td class="p-s v-align-top right"><? echo date("d/m/Y",strtotime($user_logged_details['subscription']));?></td>
									</tr>
									
									<tr>
										<td class="p-s grey v-align-top">Expiry date</td>
										<td class="p-s v-align-top right"><? echo date("d/m/Y",strtotime($user_logged_details['endDate']));?></td>
									</tr>
									
									<tr>
										<td class="p-s grey v-align-top">Expiry</td>
										<td class="p-s v-align-top right">
											<? 
											$exp  =  strtotime($user_logged_details['endDate']);
											$current = time();
											$days_left = $exp-$current;
											$days_left = ceil($days_left/ (60 * 60 * 24));
											if($days_left<=0){
											?>
											<span class="red"><? echo "Package Expired"; ?></span>
											<div class="m-top-m">
												<button class="p-s p-left-l p-right-l border-radius-xs border-xxs text-s border-light-grey background-transparent hover-background-yellow hover-border-yellow" style="letter-spacing:2px">RENEW</button>
											</div>
											<?
											} else { 
											?>
											
											<span class="green"><? echo $days_left;?></span> days left
											<? } ?>
											
										</td>
									</tr>
								</table>
								<div style="clear:both"></div>
							</div>
						</div>
					</div>
				</div>
				
				<div style="clear:both"></div>
			</div>
			<? } ?>
		</div>
	</div>
<? 
$urls = $site['url']."sign-in/profile";
if($os->_session("user_logged")==""){ header("Location:$urls");} 
?>