<?
include "../__config.php";
include "../__os.php";
global  $_OS, $_SITE;
$logged_user_id = $_OS->_session("backend_login");
#access_FETCH
if($_OS->_post("access_fetch")!=""){
    #FILTER#
    if($_OS->_post("keyword")!=""){
        $search_keyword = $_OS->_post("keyword");
    } else {
        $search_keyword = "";
    };
    #FILTER#
    $filter_keyword = "WHERE (
                            access.name LIKE '%$search_keyword%' 
                            OR access.url LIKE '%$search_keyword%' 
                            OR access.content LIKE '%$search_keyword%')";
    #PAGINATION#
    if($_OS->_post("page")!=""){
        $pagination_page_no = $_OS->_post("page");
    } else {
        $pagination_page_no = 1;
    }

    $pagination_number_of_data_per_page = 20;
    $pagination_data_count_res = $_OS->m_q("SELECT count(*) AS totalPages
                                    FROM access
                                    $filter_keyword
                                    ");
    $pagination_data_count = $_OS->m_f_a($pagination_data_count_res)["totalPages"];
    $pagination_page_count = ceil($pagination_data_count/$pagination_number_of_data_per_page);
    //current page details
    $pagination_start = (($pagination_page_no-1)*$pagination_number_of_data_per_page);
    //page url
    $pagination_prev_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."access.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no-1));
    $pagination_next_page_url = $_OS->pagination_create_url($_SITE->__BACKEND_DIR."access.php", $_SITE->__QUERY_STRING, "page",($pagination_page_no+1));

    #DATA QUERY#
    $listing_columns = "*";
    $access_res = $_OS->m_q("SELECT $listing_columns 
                                            FROM access
                                            $filter_keyword
                                            AND admin_id='$logged_user_id'
                                            ORDER BY access_id DESC
                                            LIMIT $pagination_start, $pagination_number_of_data_per_page ");

    ?>
    <form class="header">
        <div class="select-all">
            <input type="checkbox" class="list-checkbox" id="select_all_checkbox">
        </div>
        <div class="title-box">
            <h2>accesss</h2>
        </div>
        <div class="control-bar">
            <ul>
                <li><i class="la la-user-plus" onclick="access_insert_form()"></i></li>
                <li onclick="go_to_page(<? echo  $pagination_page_no;?>, false)"><i class="la la-sync"></i></li>
                <li><i class="la la-print"></i></li>
                <li><i class="la la-trash" onclick="access_delete()"></i></li>

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

            while($access_row = $_OS->m_f_a($access_res)){
                ?>
                <tr data-id="<? echo $_OS->encode($access_row["access_id"]); ?>" class="data-row">
                    <td nowrap="">
                        <input type="checkbox" class="list-checkbox">
                    </td>
                    <td nowrap="" title="Name"><? echo $access_row["name"]; ?></td>
                    <td nowrap="" title="Url"><? echo $access_row["url"]; ?></td>
                </tr>
            <? } ?>
            </tbody>
        </table>
    </div>
    <?php
}
#access VIEW
if($_OS->_post("access_view")!=""){
    $access_id = $_OS->decode($_OS->_post("access_view"));
    $access_row = $_OS->m_f_a($_OS->m_q("SELECT * FROM access WHERE access_id='$access_id'"));
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
                <table id="access_edit_form" editable="false" style="border-collapse: collapse; width: 100%">
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m text-m">
                            <p class="text-m light-black">Name</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input type="hidden" name="access_id" value="<? echo $_OS->encode($access_id);?>">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="name" value="<? echo $access_row["name"];?>" onchange="access_edit_form_submit()"/>
                        </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m">
                            <p class="text-m light-black">Url</p>
                        </td>
                        <td class="p-top-m p-bottom-m p-left-l">
                            <input readonly="true" ondblclick="this.readOnly='';" onfocusout="this.readOnly='true';"   name="url" value="<? echo $access_row["url"];?>" onchange="access_edit_form_submit()"/>
                        </td>
                    </tr>

                    <tr style="border-bottom:1px solid #eeeeee">
                        <td class="p-top-m p-bottom-m" colspan="2">
                            <p class="text-m light-black">Content</p>
                            <textarea readonly="true"
                                      ondblclick="this.readOnly='';"
                                      onfocusout="this.readOnly='true';"
                                      style="width: 100%; border: none; outline: none"
                                      name="content"
                                      placeholder="content" onchange="access_edit_form_submit()"><? echo @$_OS->decode($access_row["content"]);?></textarea>
                        </td>
                    </tr>
                </table>
                <style>
                    #access_edit_form{
                        margin-top: 8px;
                        margin-bottom: 8px;
                    }
                    #access_edit_form tr td:nth-child(1){

                    }
                    #access_edit_form tr td:nth-child(1) p{
                        font-weight: 700;
                    }
                    #access_edit_form input{
                        outline: none;
                        border: none;
                        border-bottom: 1px solid green;
                    }
                    #access_edit_form input:read-only{
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
#access_INSER_FORM
if($_OS->_post("access_insert_form")=="OK"){
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
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">Name</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="name" required="required" placeholder="Enter first name."/>
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee">url</td>
                            <td class="p-top-m p-bottom-m p-left-l" style="border-bottom: 1px solid #eeeeee">
                                <input type="text"  style="border:none; outline:none"name="url" placeholder="Enter url content">
                            </td>
                        </tr>
                        <tr >
                            <td class="p-top-m p-bottom-m" style="border-bottom: 1px solid #eeeeee" colspan="2">
                                <p class="m-bottom-m">content</p>
                                <textarea type="text" name="content" placeholder="Enter Heading" style="width: 100%; border: none; outline: none"></textarea>
                            </td>
                        </tr>
                        <input type="hidden" name="access_insert" value="OK">
                        <tr>
                            <td class="p-top-m p-bottom-m" colspan="2" style="border-bottom: 1px solid #eeeeee">
                                <button type="submit" style="width: 100%; background-color: var(--color-primary); border: 0px; color: white" class="p-m" >
                                    <span>Save and proceed</span>
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
#access_INSERT
if($_OS->_post("access_insert")=="OK"){
    $name=$_OS->_post('name');
    $url=$_OS->_post('url');
    $content=$_OS->encode($_OS->_post('content'));

    $response = array();

    //check if already exist

    $insert_columns = "name, url, content, admin_id";
    $insert_values = "'$name',  '$url', '$content', '$logged_user_id'";
    $last_insert_id = $_OS->m_q("INSERT INTO access($insert_columns) VALUES($insert_values)", "true");
    if($last_insert_id){
        ///retirn value
        $response["error"]= false;
        $response["message"]="Successfully added profile";
        $response["access_id"] = $_OS->encode($last_insert_id);
    } else {
        $response["error"]= true;
        $response["message"]="Another profile found in same access number.";
        $response["access_id"] = $_OS->encode($last_insert_id);
    }
    echo json_encode($response);
}
#access_EDIT
if($_OS->_post("access_edit")=="OK"){
    $access_id = $_OS->decode($_OS->_post('access_id'));
    $name=addslashes($_OS->_post('name'));
    $url=addslashes($_OS->_post('url'));
    $content=$_OS->encode($_OS->_post('content'));

    $response = array();

    //check if already exist
    $columns = "name = '$name', 
                url = '$url', 
                content = '$content',
                admin_id='$logged_user_id'";

    $access_edit_query = $_OS->m_q("UPDATE  access SET $columns WHERE access_id=$access_id");

    ///retirn value
    $response["error"]= false;
    $response["message"]="Successfully edited profile";
    $response["access_id"] = $_OS->encode($access_id);

    echo json_encode($response);
}
#access_DELETE
if($_OS->_post("access_delete")!=""){
    $access_ids_array = $_OS->_post("access_delete");
    $access_ids = "";
    foreach ($access_ids_array as $access_id){
        $access_ids .= ($_OS->decode($access_id).",");
    }
    $access_ids = rtrim($access_ids, ',');


    $access_delete_sql = "DELETE FROM access WHERE access_id IN($access_ids);";

    $response = array();
    if($_OS->m_q($access_delete_sql)){
        $response["error"] = false;
        $response["message"] = "Successfully Executed";
    } else {
        $response["error"] = true;
        $response["message"] = "Ops! something went wrong.";
    };

    print json_encode($response);
}
?>
