<?
include "../__config.php";
include "../__os.php";
#PASSPORT_FETCH
if($_OS->_post("passport_fetch")!=""){
    #FILTER#
    if($_OS->_post("keyword")!=""){
        $search_keyword = $_OS->_post("keyword");
    } else {
        $search_keyword = "";
    };
    #FILTER#
    $filter_keyword = "WHERE (
                            passport.first_name LIKE '%$search_keyword%' 
                            OR passport.last_name LIKE '%$search_keyword%' 
                            OR passport.date_of_birth LIKE '%$search_keyword%' 
                            OR passport.issue_date LIKE '%$search_keyword%' 
                            OR passport.agent LIKE '%$search_keyword%' 
                            OR passport.office LIKE '%$search_keyword%' 
                            OR passport.company LIKE '%$search_keyword%' 
                            OR passport.mofa_no LIKE '%$search_keyword%' 
                            OR passport.father_name LIKE '%$search_keyword%' 
                            OR passport.mother_name LIKE '%$search_keyword%' 
                            OR passport.address LIKE '%$search_keyword%' 
                            OR passport.passport_number LIKE '%$search_keyword%' 
                            OR passport.contact LIKE '%$search_keyword%' )";
    #PAGINATION#
    if($_OS->_post("page")!=""){
        $pagination_page_no = $_OS->_post("page");
    } else {
        $pagination_page_no = 1;
    }

    $pagination_number_of_data_per_page = 20;
    $pagination_data_count_res = $_OS->m_q("SELECT count(*) AS totalPages
                                    FROM passport
                                    $filter_keyword
                                    ");
    $pagination_data_count = $_OS->m_f_a($pagination_data_count_res)["totalPages"];
    $pagination_page_count = ceil($pagination_data_count/$pagination_number_of_data_per_page);
    //current page details
    $pagination_start = (($pagination_page_no-1)*$pagination_number_of_data_per_page);
    //page url
    $pagination_prev_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."passport.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no-1));
    $pagination_next_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."passport.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no+1));

    #DATA QUERY#
    $listing_columns = "*";
    $passport_res = $_OS->m_q("SELECT $listing_columns 
                                            FROM passport
                                            $filter_keyword
                                            ORDER BY passport_id DESC
                                            LIMIT $pagination_start, $pagination_number_of_data_per_page ");

    ?>
    <form class="header">
        <div class="select-all">
            <input type="checkbox" class="list-checkbox" id="select_all_checkbox">
        </div>
        <div class="title-box">
            <h2>Passports</h2>
        </div>
        <div class="control-bar">
            <ul>
                <li><i class="la la-user-plus" onclick="passport_insert_form()"></i></li>
                <li onclick="go_to_page(<? echo  $pagination_page_no;?>, false)"><i class="la la-sync"></i></li>
                <li><i class="la la-print"></i></li>
                <li><i class="la la-trash" onclick="passport_delete()"></i></li>

                <li>
                    <span> Showing : <? echo $pagination_start+1; ?> - <? echo $pagination_start+$pagination_number_of_data_per_page; ?> of <? echo $pagination_data_count?></span>
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

            while($passport_row = $_OS->m_f_a($passport_res)){
                ?>
                <tr data-id="<? echo $_OS->encode($passport_row["passport_id"]); ?>" class="data-row">
                    <td nowrap="">
                        <input type="checkbox" class="list-checkbox">
                    </td>
                    <td nowrap="" title="Given Name"><? echo $passport_row["first_name"]; ?></td>
                    <td nowrap="" title="Last Name"><? echo $passport_row["last_name"]; ?></td>
                    <td nowrap="" title="Passport Number"><? echo $passport_row["passport_number"]; ?></td>
                    <td nowrap="" title="Company"><? echo $passport_row["company"]; ?></td>
                    <td nowrap="" title="Agent"><? echo $passport_row["agent"]; ?></td>
                    <td nowrap=""></td>
                </tr>
            <? } ?>
            </tbody>
        </table>
    </div>
    <?php
}
#PASSPORT VIEW
if($_OS->_post("passport_view")!=""){
    $passport_id = $_OS->decode($_OS->_post("passport_view"));
    $passport_row = $_OS->m_f_a($_OS->m_q("SELECT * FROM passport WHERE passport_id='$passport_id'"));
    ?>
    <div class="passport-view">
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
                <table id="passport_edit_form" editable="false" style="border-collapse: collapse; width: 100%">
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m text-m">
                            <p class="text-m light-black">Given Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input type="hidden" name="passport_id" value="<? echo $_OS->encode($passport_id);?>">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="first_name" value="<? echo $passport_row["first_name"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m text-m">
                            <p class="text-m light-black">Surname</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="last_name" value="<? echo $passport_row["last_name"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Contact Number</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="contact" value="<? echo $passport_row["contact"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Passport Number</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="passport_number" value="<? echo $passport_row["passport_number"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>

                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Date of Birth</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   type="date" name="date_of_birth" value="<? echo $passport_row["date_of_birth"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Issue date</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   type="date" name="issue_date" value="<? echo $passport_row["issue_date"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Agent</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="agent" value="<? echo $passport_row["agent"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Office</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="office" value="<? echo $passport_row["office"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Company</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"  name="company" value="<? echo $passport_row["company"];?>" onchange="passport_edit_form_submit()" class="border-none"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Mofa Number</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"  name="mofa_no" value="<? echo $passport_row["mofa_no"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Father Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"  name="father_name" value="<? echo $passport_row["father_name"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Mother Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="mother_name" value="<? echo $passport_row["mother_name"];?>" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Address</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="address" value="<? echo $passport_row["address"];?>" placeholder="Address" onchange="passport_edit_form_submit()"/>
                        </td>
                    </tr>
                </table>
                <style>
                    #passport_edit_form{
                        margin-top: 8px;
                        margin-bottom: 8px;
                    }
                    #passport_edit_form tr td:nth-child(1){

                    }
                    #passport_edit_form tr td:nth-child(1) p{
                        font-weight: 700;
                    }
                    #passport_edit_form input{
                        outline: none;
                        border: none;
                        border-bottom: 1px solid green;
                    }
                    #passport_edit_form input:read-only{
                        color: #666666;
                        border-bottom: 1px solid transparent;
                    }
                </style>



                <table  id="passport_file_table" style="border-collapse: collapse; " width="100%">
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m" colspan="3">
                            <p class="text-m light-black" style="color: blue; font-weight: bold">Others</p>
                        </td>
                    </tr>
                    <?
                    ##PASSPORT FIELDS
                    $passport_fields = $_OS->m_q("SELECT * FROM passport_field WHERE passport_id=".$passport_row["passport_id"]);
                    while($passport_field = $_OS->m_f_a($passport_fields)) {
                        $unique_field_class = $passport_field["passport_field_id"];
                        ?>
                        <tr style="border-bottom:1px solid #eeeeee">
                            <td class="p-top-m p-bottom-m text-m ">
                                <p class="text-m light-black" style="font-weight: bold"><? echo $passport_field["name"];?></p>
                            </td>
                            <td class="p-top-m p-bottom-m text-m p-left-l "><? echo $passport_field["value"];?></td>
                            <td width="20px" class="right">
                                <?php
                                $cancel_func = "passport_delete_field('".$_OS->encode($passport_field['passport_field_id'])."','".$_OS->encode($passport_id)."'); ";
                                ?>
                                <a onclick="<? echo $cancel_func; ?>" class="<? echo "field_cancel_button".$unique_field_class; ?> pointable">
                                    <i class="la la-trash text-l red" style="color: red"></i>
                                </a>
                            </td>
                        </tr>
                    <? } ?>
                </table>
                <form method="post" id="passport_field_insert_form" style="border-collapse: collapse; " width="100%">
                    <table style="border-bottom:1px solid #eeeeee; width: 100%">
                        <tr style="border-bottom:1px solid #eeeeee">
                            <td class="p-top-m p-bottom-m text-m">
                                <input type="hidden" name="passport_field_insert" value="<? echo $_OS->encode($passport_id) ?>" style="display: none">
                                <input name="field_name" required placeholder="Title" style=" width: 130px; border:none; outline: none">
                            </td>
                            <td class="p-top-m p-bottom-m text-m">
                                <input name="field_value" required placeholder="Value" style=" width: 130px; border:none; outline: none">
                            </td>
                            <td class="p-top-m p-bottom-m text-m" width="20px" style="text-align: right">
                                <a onclick="passport_field_insert()">
                                    <i class="la la-folder-plus text-l red"></i>
                                </a>
                            </td>
                        </tr>
                    </table>


                </form>





            </div>
        </div>
        <!-----FILES-->
        <div class="item">
            <div class="header">
                <div class="title-box">
                    <h2>Files</h2>
                </div>
                <div class="control-bar">
                    <ul>
                        <li>
                            <input type="file" required id="passport_file_select" onchange="passport_file_select(this, '<? echo $_OS->encode($passport_row["passport_id"]);?>')" style="display: none"/>
                            <label for="passport_file_select"><i class="la la-cloud-upload-alt"></i></label></li>
                    </ul>
                </div>
            </div>
            <div class="data p-left-xl p-right-l">
                <table id="passport_file_table" style="border-collapse: collapse" width="100%">
                    <?
                    ##PASSPORT FILE
                    $passport_files = $_OS->m_q("SELECT * FROM passport_file WHERE passport_id=".$passport_row["passport_id"]);
                    while($passport_file = $_OS->m_f_a($passport_files)){?>
                        <?

                        $image_src = $_SITE->__FRONTEND_DIR."/assets/uploads/".$passport_file['file_url'];
                        $thumb = "./assets/images/file_thumb.png";
                        if($_OS->isImage($_OS->decode($image_src))){
                            $thumb = "__file.php?compress=5&src=".$image_src;
                        }
                        ?>
                        <tr style="border-bottom:1px solid #eeeeee; cursor: pointer">
                            <td class="p-m p-none" style="width: 55px">
                                <img alt="error!" src="<? echo $thumb;?>" height="35px" width="35px" style="border-radius: 35px;  background-color: #eeeeee">
                            </td>

                            <td class="p-m p-left-none" onclick="window.open('<? echo $image_src;?>','_blank');">
                                <p class="text-m"><? echo strtolower($_OS->str_short($passport_file["file_url"], 30));?></p>
                                <p class="text-xs p-top-xxs font-weight-xxl" style="color: darkblue">
                                    <? echo strtoupper(explode("/",$passport_file["file_type"])[1]);?>
                                    <span>&bull;</span>
                                    <? echo ceil($passport_file["file_size"]/1024)."KB";?>
                                </p>
                            </td>
                            <td class="p-s p-right-none" style="width: 20px; text-align: right">
                                <i class="la la-trash text-l" style="color: red" onclick="passport_file_delete('<? echo $_OS->encode($passport_file["passport_file_id"]) ;?>', '<? echo $_OS->encode($passport_file["passport_id"]) ;?>')"></i>
                            </td>
                        </tr>
                    <? } ?>

                </table>

            </div>
        </div>
    </div>

    <?
}
#PASSPORT_INSER_FORM
if($_OS->_post("passport_insert_form")=="OK"){
    ?>
    <div class="passport-insert">
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
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Given Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="first_name" required="required" placeholder="Enter given name."/>
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Surname</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="last_name"  placeholder="Enter surname name."/>
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Passport Number</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="passport_number" required="required" placeholder="ex. X2542157">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Contact Number</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="contact" placeholder="Enter contact number">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Date of birth</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="date"  style="border:none; outline:none"name="date_of_birth" placeholder="Enter contact number">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Issue date</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="date"  style="border:none; outline:none"name="issue_date" placeholder="Enter contact number">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Mofa Number</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none"name="mofa_no" placeholder="Enter mofa number">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Father Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none"name="father_name" placeholder="Enter Father name">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Mother Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none"name="mother_name" placeholder="Enter Mother name">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Agent Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none" name="agent" placeholder="Enter agent name.">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Office Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none" name="office" placeholder="Enter office name.">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Company</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">

                                <input type="text"  style="border:none; outline:none" name="company" placeholder="Enter company name.">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee" colspan="2">
                                <p class="m-bottom-m">Address</p>
                                <textarea type="text" name="address" placeholder="Enter Heading" style="width: 100%; border: none; outline: none"></textarea>
                            </td>
                        </tr>
                        <input type="hidden" name="passport_insert" value="OK">
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
#PASSPORT_INSERT
if($_OS->_post("passport_insert")=="OK"){
    $first_name=$_OS->_post('first_name');
    $last_name=$_OS->_post('last_name');
    $passport_number=$_OS->_post('passport_number');
    $contact=$_OS->_post('contact');
    $date_of_birth=$_OS->_post('date_of_birth');
    $issue_date=$_OS->_post('issue_date');
    $mofa_no=$_OS->_post('mofa_no');
    $father_name=$_OS->_post('father_name');
    $mother_name=$_OS->_post('mother_name');
    $agent=$_OS->_post('agent');
    $office=$_OS->_post('office');
    $company=$_OS->_post('company');
    $address=$_OS->_post('address');

    $response = array();

    //check if already exist
    $passport_exist = $_OS->m_f_a($_OS->m_q("SELECT COUNT(*) as count FROM passport WHERE passport_number='$passport_number'"))["count"];
    if(!$passport_exist){
        $insert_columns = "first_name, last_name, passport_number, contact, date_of_birth, issue_date, mofa_no, father_name, mother_name, agent, office, company, address, upload_date";
        $insert_values = "'$first_name', '$last_name', '$passport_number', '$contact', '$date_of_birth', '$issue_date', '$mofa_no', '$father_name', '$mother_name', '$agent', '$office', '$company', '$address', NOW()";
        $last_insert_id = $_OS->m_q("INSERT INTO passport($insert_columns) VALUES($insert_values)", "true");

        if($_OS->_post('dynamic_field_names')!="") {
            $dynamic_field_names = array_values($_OS->_post('dynamic_field_names'));
            $dynamic_field_values = array_values($_OS->_post('dynamic_field_values'));
            foreach ($dynamic_field_names as $index=>$field_name){

                $field_value = $dynamic_field_values[$index];
                $sql = "INSERT INTO passport_field(name, value ,passport_id) VALUES('$field_name', '$field_value', (SELECT passport_id FROM passport WHERE passport_number='$passport_number'))";
                $_OS->m_q($sql);
            }
        }
        ///retirn value
        $response["error"]= false;
        $response["message"]="Successfully added profile";
        $response["passport_id"] = $_OS->encode($last_insert_id);
    } else {
        $last_insert_id = $_OS->m_f_a($_OS->m_q("SELECT passport_id FROM passport WHERE passport_number='$passport_number'"))['passport_id'];
        $response["error"]= true;
        $response["message"]="Another profile found in same passport number.";
        $response["passport_id"] = $_OS->encode($last_insert_id);
    }
    echo json_encode($response);
}
#PASSPORT_EDIT
if($_OS->_post("passport_edit")=="OK"){
    $passport_id = $_OS->decode($_OS->_post('passport_id'));
    $first_name=addslashes($_OS->_post('first_name'));
    $last_name=addslashes($_OS->_post('last_name'));
    $passport_number=addslashes($_OS->_post('passport_number'));
    $contact=addslashes($_OS->_post('contact'));
    $date_of_birth=addslashes($_OS->_post('date_of_birth'));
    $issue_date=addslashes($_OS->_post('issue_date'));
    $mofa_no=addslashes($_OS->_post('mofa_no'));
    $father_name=addslashes($_OS->_post('father_name'));
    $mother_name=addslashes($_OS->_post('mother_name'));
    $agent=addslashes($_OS->_post('agent'));
    $office=addslashes($_OS->_post('office'));
    $company=addslashes($_OS->_post('company'));
    $address=addslashes($_OS->_post('address'));

    $response = array();

    //check if already exist
    $columns = "first_name = '$first_name', 
                last_name = '$last_name', 
                passport_number = '$passport_number', 
                contact = '$contact',
                date_of_birth = '$date_of_birth',
                issue_date = '$issue_date',
                mofa_no = '$mofa_no',
                father_name = '$father_name', 
                mother_name  = '$mother_name',
                agent = '$agent', 
                office = '$office',
                company = '$company',
                address = '$address'";

    $passport_edit_query = $_OS->m_q("UPDATE  passport SET $columns WHERE passport_id=$passport_id");

    ///retirn value
    $response["error"]= false;
    $response["message"]="Successfully edited profile";
    $response["passport_id"] = $_OS->encode($passport_id);

    echo json_encode($response);
}
#PASSPORT_DELETE
if($_OS->_post("passport_delete")!=""){
    $passport_ids_array = $_OS->_post("passport_delete");
    $passport_ids = "";
    foreach ($passport_ids_array as $passport_id){
        $passport_ids .= ($_OS->decode($passport_id).",");
    }
    $passport_ids = rtrim($passport_ids, ',');


    $passport_delete_sql = "DELETE FROM passport WHERE passport_id IN($passport_ids);";
    $passport_delete_sql .= "DELETE FROM passport_field WHERE passport_id IN($passport_ids);";
    $passport_delete_sql .= "DELETE FROM passport_file WHERE passport_id IN($passport_ids);";

    $response = array();
    if($_OS->m_q($passport_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
#PASSPORT_FIELD_DELETE
if($_OS->_post("passport_field_delete")!=""){
    $passport_field_id = $_OS->decode($_OS->_post("passport_field_delete"));

    $passport_delete_sql = "DELETE FROM passport_field WHERE passport_field_id=$passport_field_id;";

    $response = array();
    if($_OS->m_q($passport_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
#PASSPORT_FIELD_INSERT
if($_OS->_post("passport_field_insert")!=""){
    $passport_id = $_OS->decode($_OS->_post("passport_field_insert"));
    $field_name = $_OS->_post("field_name");
    $field_value = $_OS->_post("field_value");

    $passport_field_insert_sql = "INSERT INTO  passport_field(passport_id, name, value, upload_date ) VALUES ($passport_id, '$field_name', '$field_value', NOW())";

    $response = array();
    if($_OS->m_q($passport_field_insert_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
        $response["passport_id"] = $_OS->_post("passport_field_insert");
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
        $response["passport_id"] = $_OS->_post("passport_field_insert");
    };

    print json_encode($response);


}
#PASSPORT FILE UPLOAD
if($_OS->_post("passport_file_upload")){
    $upload = $_OS->uploader($_FILES["file"], "../assets/uploads/");
    $passport_id = $_OS->decode($_OS->_post("passport_id"));
    $response = array();
    if(!$upload["error"]){
        $image_url = $upload["message"];
        $sql = "INSERT INTO passport_file(file_url, passport_id, file_size, file_type) VALUES('$image_url', $passport_id, '".$_FILES["file"]["size"]."', '".$_FILES["file"]["type"]."')";
        $_OS->m_q($sql);
        $response["error"] = false;
        $response["message"] = "Successfully Uploaded file";
        $response["passport_id"] = $_OS->encode($passport_id);
    } else{
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong";
    }
    print(json_encode($response));

}
#PASSPORT FILE DELETE
if($_OS->_post("passport_file_delete")!=""){
    $passport_file_id = $_OS->decode($_OS->_post("passport_file_delete"));

    $passport_delete_sql = "DELETE FROM passport_file WHERE passport_file_id=$passport_file_id;";

    $response = array();
    if($_OS->m_q($passport_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
?>