
	
	<div class="popup text-xl center"></div>
	<footer>
        <? /*
		<div class="background-black white">
			<div class="wrapper">
				<div class="s6 p-l text-m">
					<div class="p-m ">
						<p class="text-l  font-weight-m white" style="display:inline-block">About Company</p>
						<div style="width:30px; height:3px; " class="background-yellow m-top-s"></div>
					</div>
					<p class="p-m p-top-none">
	
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo nesciunt pariatur laboriosam accusantium? Doloremque fugit unde explicabo consequuntur aliquid laudantium id voluptatum? Saepe earum, suscipit ex quos eius natus. 
					</p>
				</div>
				<div class="s3 p-l text-m">
					<div class="p-m ">
						<p class="text-l  font-weight-m white" style="display:inline-block">Main Section</p>
						<div style="width:30px; height:3px; " class="background-yellow m-top-s"></div>
					</div>
					<ul class="p-m p-top-none">
					<?
					$footerMenus = $_OS->m_q("SELECT * FROM pagecontent WHERE onBottom=1");
					while($footerMenu = $_OS->m_f_a($footerMenus)){
					?>
						<li><a class="white" href="<? echo $_SITE->__FRONTEND_DIR;?><? echo $footerMenu['seoId'];?>"><? echo $footerMenu['title'];?> </a></li>
					<? }?>
					</ul>
				</div>
				<div class="s3 p-l text-m">
					<div class="p-m ">
						<p class="text-l  font-weight-m white" style="display:inline-block">Main Section</p>
						<div style="width:30px; height:3px; " class="background-yellow m-top-s"></div>
					</div>
					<ul class="p-m p-top-none">
						<li>
							<a>NO. of query: <? echo $_OS->query_count; ?></a>
						</li>
					</ul>
					
				</div>
				<div style="clear:both"></div>
			</div>
		</div>
        */?>
		<div class="s12 text-m background-black">
			<div class=" ">
				<div class="p-l p-top-m p-bottom-m">
					<p class="p-m p-top-none p-bottom-none white">
						&copy;All Rights Reversed | Made With Love by Nafish Ahmed for better Web 	
					</p>
				</div>
			</div>
		</div>
	</footer>
	
	<script src="<? echo $_SITE->__JS_DIR;?>script.js"></script>
	
	<? include "__javascript.php";?>
	

</body>
</html>
