<?php
include "../__config.php";
include "../__os.php";
#USER AUTH
if($_OS->_post("backend_login")=="OK"){
    $username = $_OS->_post("user_id");
    $password = $_OS->_post("user_pass");

    $user_details = $_OS->m_f_a($_OS->m_q("SELECT count(*) as count, admin_id FROM admin WHERE  username='$username' AND password='$password'"));
    $response = array();
    if($user_details["count"]==1){
        $response["error"] = false;
        $response["message"] = "Successfully logged in";
    } else {
        $response["error"] = true;
        $response["message"] = "Wrong username or password";
    }

    $_OS->_session("backend_login", $user_details["admin_id"]);
    print (json_encode($response));

}

?>