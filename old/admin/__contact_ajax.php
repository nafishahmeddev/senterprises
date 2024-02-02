<?
include "../__config.php";
include "../__os.php";
#contact_FETCH
if($_OS->_post("contact_fetch")!=""){
    #FILTER#
    if($_OS->_post("keyword")!=""){
        $search_keyword = $_OS->_post("keyword");
    } else {
        $search_keyword = "";
    };
    #FILTER#
    $filter_keyword = "WHERE (
                            contact.first_name LIKE '%$search_keyword%' 
                            OR contact.last_name LIKE '%$search_keyword%' 
                            OR contact.address LIKE '%$search_keyword%' 
                            OR contact.phone LIKE '%$search_keyword%' )";
    #PAGINATION#
    if($_OS->_post("page")!=""){
        $pagination_page_no = $_OS->_post("page");
    } else {
        $pagination_page_no = 1;
    }

    $pagination_number_of_data_per_page = 20;
    $pagination_data_count_res = $_OS->m_q("SELECT count(*) AS totalPages
                                    FROM contact
                                    $filter_keyword
                                    ");
    $pagination_data_count = $_OS->m_f_a($pagination_data_count_res)["totalPages"];
    $pagination_page_count = ceil($pagination_data_count/$pagination_number_of_data_per_page);
    //current page details
    $pagination_start = (($pagination_page_no-1)*$pagination_number_of_data_per_page);
    //page url
    $pagination_prev_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."contact.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no-1));
    $pagination_next_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."contact.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no+1));

    #DATA QUERY#
    $listing_columns = "*";
    $contact_res = $_OS->m_q("SELECT $listing_columns 
                                            FROM contact
                                            $filter_keyword
                                            ORDER BY contact_id DESC
                                            LIMIT $pagination_start, $pagination_number_of_data_per_page ");

    ?>
    <form class="header">
        <div class="select-all">
            <input type="checkbox" class="list-checkbox" id="select_all_checkbox">
        </div>
        <div class="title-box">
            <h2>Contacts</h2>
        </div>
        <div class="control-bar">
            <ul>
                <li><i class="la la-user-plus" onclick="contact_insert_form()"></i></li>
                <li onclick="go_to_page(<? echo  $pagination_page_no;?>, false)"><i class="la la-sync"></i></li>
                <li><i class="la la-print"></i></li>
                <li><i class="la la-trash" onclick="contact_delete()"></i></li>

                <li>
                    <span> Showing : <? echo $pagination_start+1; ?> - <? echo $pagination_page_no!=$pagination_page_count?$pagination_start+$pagination_number_of_data_per_page:$pagination_data_count; ?> of <? echo $pagination_data_count?></span>
                </li>
                <?
                $prev_page = "";
                if($pagination_page_no>1){
                    $prev_page = "go_to_page(".(int)($pagination_page_no-1).");";
                }

                $next_page = "";
                if($pagination_page_no<$pagination_page_count){
                    $next_page = "go_to_page(".(int)($pagination_page_no+1).");";
                }
                ?>
                <li><i class="la la-angle-left" onclick="<? echo $prev_page;?>"></i></li>
                <li>
                    <span>Page No.</span>
                    <select onchange="go_to_page(this.value)" id="page_selector">
                        <? for ($paginated_page=1; $paginated_page<=$pagination_page_count; $paginated_page++): ?>
                            <option value="<? echo $paginated_page;?>" <? echo  $paginated_page==$pagination_page_no? "selected":""; ?>><? echo $paginated_page;?></option>
                        <? endfor; ?>
                    </select>
                </li>
                <li><i class="la la-angle-right" onclick="<? echo $next_page;?>"></i></li>
            </ul>
        </div>
    </form>
    <div class="data">
        <table class="table">
            <tbody>
            <?

            while($contact_row = $_OS->m_f_a($contact_res)){
                ?>
                <tr data-id="<? echo $_OS->encode($contact_row["contact_id"]); ?>" class="data-row">
                    <td nowrap="">
                        <input type="checkbox" class="list-checkbox">
                    </td>
                    <td nowrap="" title="Given Name"><? echo $contact_row["first_name"]; ?></td>
                    <td nowrap="" title="Last Name"><? echo $contact_row["last_name"]; ?></td>
                    <td nowrap="" title="Phone"><? echo $contact_row["phone"]; ?></td>
                    <td nowrap="" title="Email"><? echo $contact_row["email"]; ?></td>
                    <td nowrap="" title="Address"><? echo $contact_row["address"]; ?></td>
                </tr>
            <? } ?>
            </tbody>
        </table>
    </div>
    <?php
}
#contact VIEW
if($_OS->_post("contact_view")!=""){
    $contact_id = $_OS->decode($_OS->_post("contact_view"));
    $contact_row = $_OS->m_f_a($_OS->m_q("SELECT * FROM contact WHERE contact_id='$contact_id'"));
    ?>
    <div class="contact-view">
        <div class="item">
            <div class="header">
                <div class="title-box">
                    <h2>Details</h2>
                </div>
                <div class="control-bar">
                    <ul>
                        <li><i class="la la-print"></i></li>
                        <li><i class="la la-trash"></i></li>
                    </ul>
                </div>
            </div>
            <div class="data p-left-xl">
                <table id="contact_edit_form" editable="false" style="border-collapse: collapse; width: 100%">
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m text-m">
                            <p class="text-m light-black">First Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input type="hidden" name="contact_id" value="<? echo $_OS->encode($contact_id);?>">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="first_name" value="<? echo $contact_row["first_name"];?>" onchange="contact_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m text-m">
                            <p class="text-m light-black">Last Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="last_name" value="<? echo $contact_row["last_name"];?>" onchange="contact_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Email</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="email" value="<? echo $contact_row["email"];?>" onchange="contact_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Phone</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="phone" value="<? echo $contact_row["phone"];?>" onchange="contact_edit_form_submit()"/>
                        </td>
                    </tr>

                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Address</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="address" value="<? echo $contact_row["address"];?>" placeholder="Address" onchange="contact_edit_form_submit()"/>
                        </td>
                    </tr>
                </table>
                <style>
                    #contact_edit_form{
                        margin-top: 8px;
                        margin-bottom: 8px;
                    }
                    #contact_edit_form tr td:nth-child(1){

                    }
                    #contact_edit_form tr td:nth-child(1) p{
                        font-weight: 700;
                    }
                    #contact_edit_form input{
                        outline: none;
                        border: none;
                        border-bottom: 1px solid green;
                    }
                    #contact_edit_form input:read-only{
                        color: #666666;
                        border-bottom: 1px solid transparent;
                    }
                </style>
            </div>
        </div>
        <!-----FILES-->
    </div>

    <?
}
#contact_INSER_FORM
if($_OS->_post("contact_insert_form")=="OK"){
    ?>
    <div class="contact-insert">
        <div class="item">
            <div class="header">
                <div class="title-box">
                    <h2>Add New</h2>
                </div>
            </div>
            <div class="data p-left-xl p-right-l">
                <form method="post" class="display-block" id="insert_form" enctype="multipart/form-data">
                    <table width="100%">
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">First Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="first_name" required="required" placeholder="Enter first name."/>
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Last Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="last_name"  placeholder="Enter last name."/>
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">phone</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="phone" required="required" placeholder="Enter phone number">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Email</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="email" placeholder="Enter email address">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee" colspan="2">
                                <p class="m-bottom-m">Address</p>
                                <textarea type="text" name="address" placeholder="Enter Heading" style="width: 100%; border: none; outline: none"></textarea>
                            </td>
                        </tr>
                        <input type="hidden" name="contact_insert" value="OK">
                        <tr>
                            <td class="p-top-m p-bottom-m" colspan="2" style="border-bottom: 1px solid #eeeeee">
                                <button type="submit" style="width: 100%; background-color: var(--color-primary); border: 0px; color: white" class="p-m" >
                                    <span>Save and proced</span>
                                </button>
                            </td>
                        </tr>
                    </table>


                </form>
            </div>
        </div>

    </div
    <?php
}
#contact_INSERT
if($_OS->_post("contact_insert")=="OK"){
    $first_name=$_OS->_post('first_name');
    $last_name=$_OS->_post('last_name');
    $phone=$_OS->_post('phone');
    $email=$_OS->_post('email');
    $address=$_OS->_post('address');

    $response = array();

    //check if already exist

    $insert_columns = "first_name, last_name,  phone, email, address";
    $insert_values = "'$first_name', '$last_name', '$phone',  '$email', '$address'";
    $last_insert_id = $_OS->m_q("INSERT INTO contact($insert_columns) VALUES($insert_values)", "true");
    if($last_insert_id){
        ///retirn value
        $response["error"]= false;
        $response["message"]="Successfully added profile";
        $response["contact_id"] = $_OS->encode($last_insert_id);
    } else {
        $response["error"]= true;
        $response["message"]="Another profile found in same contact number.";
        $response["contact_id"] = $_OS->encode($last_insert_id);
    }
    echo json_encode($response);
}
#contact_EDIT
if($_OS->_post("contact_edit")=="OK"){
    $contact_id = $_OS->decode($_OS->_post('contact_id'));
    $first_name=addslashes($_OS->_post('first_name'));
    $last_name=addslashes($_OS->_post('last_name'));
    $email=addslashes($_OS->_post('email'));
    $phone=addslashes($_OS->_post('phone'));
    $address=addslashes($_OS->_post('address'));

    $response = array();

    //check if already exist
    $columns = "first_name = '$first_name', 
                last_name = '$last_name', 
                email = '$email', 
                phone = '$phone',
                address = '$address'";

    $contact_edit_query = $_OS->m_q("UPDATE  contact SET $columns WHERE contact_id=$contact_id");

    ///retirn value
    $response["error"]= false;
    $response["message"]="Successfully edited profile";
    $response["contact_id"] = $_OS->encode($contact_id);

    echo json_encode($response);
}
#contact_DELETE
if($_OS->_post("contact_delete")!=""){
    $contact_ids_array = $_OS->_post("contact_delete");
    $contact_ids = "";
    foreach ($contact_ids_array as $contact_id){
        $contact_ids .= ($_OS->decode($contact_id).",");
    }
    $contact_ids = rtrim($contact_ids, ',');


    $contact_delete_sql = "DELETE FROM contact WHERE contact_id IN($contact_ids);";
    $contact_delete_sql .= "DELETE FROM contact_field WHERE contact_id IN($contact_ids);";
    $contact_delete_sql .= "DELETE FROM contact_file WHERE contact_id IN($contact_ids);";

    $response = array();
    if($_OS->m_q($contact_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
#contact_FIELD_DELETE
if($_OS->_post("contact_field_delete")!=""){
    $contact_field_id = $_OS->decode($_OS->_post("contact_field_delete"));

    $contact_delete_sql = "DELETE FROM contact_field WHERE contact_field_id=$contact_field_id;";

    $response = array();
    if($_OS->m_q($contact_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
#contact_FIELD_INSERT
if($_OS->_post("contact_field_insert")!=""){
    $contact_id = $_OS->decode($_OS->_post("contact_field_insert"));
    $field_name = $_OS->_post("field_name");
    $field_value = $_OS->_post("field_value");

    $contact_field_insert_sql = "INSERT INTO  contact_field(contact_id, name, value, upload_date ) VALUES ($contact_id, '$field_name', '$field_value', NOW())";

    $response = array();
    if($_OS->m_q($contact_field_insert_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
        $response["contact_id"] = $_OS->_post("contact_field_insert");
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
        $response["contact_id"] = $_OS->_post("contact_field_insert");
    };

    print json_encode($response);


}
#contact FILE UPLOAD
if($_OS->_post("contact_file_upload")){
    $upload = $_OS->uploader($_FILES["file"], "../assets/uploads/");
    $contact_id = $_OS->decode($_OS->_post("contact_id"));
    $response = array();
    if(!$upload["error"]){
        $image_url = $upload["message"];
        $sql = "INSERT INTO contact_file(file_url, contact_id, file_size, file_type) VALUES('$image_url', $contact_id, '".$_FILES["file"]["size"]."', '".$_FILES["file"]["type"]."')";
        $_OS->m_q($sql);
        $response["error"] = false;
        $response["message"] = "Successfully Uploaded file";
        $response["contact_id"] = $_OS->encode($contact_id);
    } else{
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong";
    }
    print(json_encode($response));

}
#contact FILE DELETE
if($_OS->_post("contact_file_delete")!=""){
    $contact_file_id = $_OS->decode($_OS->_post("contact_file_delete"));

    $contact_delete_sql = "DELETE FROM contact_file WHERE contact_file_id=$contact_file_id;";

    $response = array();
    if($_OS->m_q($contact_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
?>