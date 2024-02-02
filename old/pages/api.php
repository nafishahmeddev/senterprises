<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');

include "nJSos.php";
list($data, $getPage, $getPageData) = array_pad(explode('/',$site['seo'],3), 3, null);?>
<?
## get passports
if($os->_post("get_passports")=="OK"){	
	####PAGINATION####
	$page_no=$os->_post("page_no");
	$data_per_page = 40;
	$no_of_data = $os->m_num_rows($os->m_q("SELECT * FROM pp_details"));
	$total_pages = ceil($no_of_data/$data_per_page);
	$data_select_start = ($page_no-1)*$data_per_page;
	$limit ="LIMIT $data_select_start, $data_per_page";
	/////////////////
	$ppDetails =  $os->m_q("SELECT * FROM pp_details ORDER BY ppDetailsId DESC LIMIT $data_select_start, $data_per_page");
	$return_arr = array();
	while ($row = $os->m_f_a($ppDetails)){
		$row_array['ppDetailsId'] = $row['ppDetailsId'];
		$row_array['firstName'] = $row['firstName'];
		$row_array['lastName'] = $row['lastName'];
		$row_array['lastName'] = $row['lastName'];
		$row_array['dob'] = $row['dob'];
		$row_array['issueDate'] = $row['issueDate'];
		$row_array['agent'] = $row['agent'];
		$row_array['company'] = $row['company'];
		$row_array['uploadDate'] = $row['uploadDate'];
		$row_array['careOf'] = $row['careOf'];
		$row_array['address'] = $row['address'];
		$row_array['visaNo'] = $row['visaNo'];
		$row_array['visaId'] = $row['visaId'];
		$row_array['mofaNo'] = $row['mofaNo'];
		$row_array['ppNumber'] = $row['ppNumber'];
		array_push($return_arr,$row_array);
	} 
	$data=array();
	$data['total_data'] = $no_of_data;
	$data['total_pages'] = $total_pages;
	$data['data'] = $return_arr;
	?>
	
<? echo json_encode($data, JSON_PRETTY_PRINT); ?>

<?
} 
##get passport profile
if($os->_post("get_passport_details")=="OK"){	
	$ppDetailsId=$os->_post("ppDetailsId");
	$ppFiles =  $os->m_q("SELECT * FROM pp_files  WHERE ppDetailsId='$ppDetailsId'");
	$ppDetail=  $os->m_f_a($os->m_q("SELECT * FROM pp_details WHERE ppDetailsId='$ppDetailsId'"));
	
	$return_arr = array();
	$file_arr = array();
	$details_arr = array();
	///files
	while ($row = $os->m_f_a($ppFiles)){
		$row_array['ppFilesId'] = $row['ppFilesId'];
		$row_array['fileUrl'] = $row['fileUrl'];
		$row_array['fileType'] = $row['fileType'];
		$row_array['dateUploaded'] = $row['dateUploaded'];
		$row_array['fileName'] = $row['fileName'];
		$row_array['fileSize'] = $row['fileSize'];
		array_push($file_arr,$row_array); 
	} 
	//details
	$row_array['ppDetailsId'] = $ppDetail['ppDetailsId'];
	$row_array['firstName'] = $ppDetail['firstName'];
	$row_array['lastName'] = $ppDetail['lastName'];
	$row_array['lastName'] = $ppDetail['lastName'];
	$row_array['dob'] = $ppDetail['dob'];
	$row_array['issueDate'] = $ppDetail['issueDate'];
	$row_array['agent'] = $ppDetail['agent'];
	$row_array['company'] = $ppDetail['company'];
	$row_array['uploadDate'] = $ppDetail['uploadDate'];
	$row_array['careOf'] = $ppDetail['careOf'];
	$row_array['address'] = $ppDetail['address'];
	$row_array['visaNo'] = $ppDetail['visaNo'];
	$row_array['visaId'] = $ppDetail['visaId'];
	$row_array['mofaNo'] = $ppDetail['mofaNo'];
	$row_array['ppNumber'] = $ppDetail['ppNumber'];
		
	$return_arr["details"] = $row_array;
	$return_arr["files"] = $file_arr;
	?>
	
<? echo json_encode($return_arr, JSON_PRETTY_PRINT); ?>
<?
} 
#add passport
if($os->_post("add_passport")=="OK"){	
	$firstName = $os->_post("firstName");
	$lastName = $os->_post("lastName");
	$dob = $os->_post("dob");
	$issueDate = $os->_post("issueDate");
	$agent = $os->_post("agent");
	$company = $os->_post("company");
	$uploadDate = $os->_post("uploadDate");
	$careOf = $os->_post("careOf");
	$address = $os->_post("address");
	$visaNo = $os->_post("visaNo");
	$visaId = $os->_post("visaId");
	$mofaNo = $os->_post("mofaNo");
	$ppNumber = $os->_post("ppNumber");
	
	
	$sql = "INSERT INTO pp_details
		(ppDetailsId, firstName, lastName, dob, issueDate, agent, company, uploadDate, careOf, address, visaNo, visaId, mofaNo, ppNumber) 
		VALUES ('NULL', '$firstName', '$lastName', '$dob', '$issueDate', '$agent', '$company', '$uploadDate', '$careOf', '$address', '$visaNo', '$visaId', '$mofaNo', '$ppNumber')";
	$res = $os->m_q($sql,false,true);
	if($res){
		echo '{"message":"success", "ppDetailsId" :"'.$res.'"}';
	} else {
		echo '{"message":"error"}';
	}
} 
#login
if($os->_post("user_login")=="OK"){
	$try_user_id   = $os->_post("try_user_id");
	$try_user_pass = $os->_post("try_user_pass");
	$try_members = $os->m_q("SELECT * FROM admin WHERE username='$try_user_id' AND password='$try_user_pass'");
	if($os->m_num_rows($try_members)==1){
		$try_member = $os->m_f_a($try_members);
		$return["access"]="true";
		$return["message"]="successfully logged in";
		?>
		
<? echo json_encode($return, JSON_PRETTY_PRINT); ?>

	<? } else {
	$return["access"]="false";
	$return["message"]="wrong email or password";
	 ?>
<? echo json_encode($return, JSON_PRETTY_PRINT); ?>

<?
	}	
} 
?>

