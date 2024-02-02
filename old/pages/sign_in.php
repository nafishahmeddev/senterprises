<?
include "__os.php";
list($getPage, $ref) = array_pad(explode('/',$_SITE->__SEO_URL,2), 2, null);
?>
	 

	<div class="containner" style=" height:100%;">
		<div class="content background-white" style="">
			<form id="login_form" method="post">
				<div class="p-l model-s background-white">
					<p class="p-m text-xl p-bottom-xl p-top-xl m-top-xxl m-bottom-xxl">SIGN IN</p>
					<div class="p-m">
						<div class="lolipop-input-group">
							<input type="email" required name="try_user_id"placeholder="Ex. example@domain.com" />
							<label>EMAIL</label>
							<div></div>
						</div>
					</div>
					<div class="p-m">
						<div class="lolipop-input-group">
							<input type="password" required name="try_user_pass"  placeholder="Please enter your password"/>
							<label>PASSWORD</label>
							<div></div>
						</div>
					</div>
					<div class="p-m">
						<p class="text-s blue-gray">Forget password? <a style="text-decoration:underline">click here</a></p>
						<input type="hidden" name="ref_page" value="<? echo $_SITE->__FRONTEND_DIR.$_SITE->__SEO_URL; ?>" />
						<input type="hidden" name="user_login" value="OK" />
						<p class="text-s center p-top-m sign-in-message-box"></p>
					</div>
					
					<div class="p-m s6">
						<input type="hidden" name="ref_page" value="<? echo $_SITE->__FRONTEND_DIR ?><? echo $ref;?>" />
						<button name="user_login" value="OK" class="s12 p-m border-xxs border-light-grey indigo background-transparent border-radius-xs" type="submit">SIGN IN</button>
						<div style="clear:both"></div>
					</div>
					
					<div class="p-m s6">
						<input type="hidden" name="ref_page" value="<? echo $_SITE->__FRONTEND_DIR; ?><? echo $ref;?>" />
						<button class="s12 p-m border-xxs border-light-grey red background-transparent border-radius-xs" type="button" onclick="window.location.href='<? echo $_SITE->__FRONTEND_DIR; ?>'">CANCEL</button>
						<div style="clear:both"></div>
					</div>
					<div style="clear:both"></div>
					<div class="p-m">
						<div class="border-top-xxs border-light-grey m-top-l p-top-m">
							<p class="text-s">Not registered yet?<a href="<? echo $_SITE->__FRONTEND_DIR;?>sign-up">click here</a> to sign up.</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<? include "__javascript.php";?>
	
	