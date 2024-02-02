<?
include "../__config.php";
include "../__os.php";
global $_OS;
global $_SITE;
if($_OS->_get("logout")=="OK"){
    $_OS->_session("backend_login", "");
    header("Location:index.php");
}

if($_OS->_session("backend_login")==""){?>
    <html>
    <head>
        <link rel="stylesheet/less" href="<? echo $_SITE->__BACKEND_DIR;?>assets/stylesheets/style.less">
        <script src="<? echo $_SITE->__BACKEND_DIR;?>assets/javascripts/xpeed.js"></script>
        <script src="<? echo $_SITE->__BACKEND_DIR;?>assets/javascripts/less.min.js" ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body{
                display: flex;
                background-color: #0A0F4F;
                justify-content: center;
                align-items: center;
            }
            .main{
                align-items: center;
                justify-content: center;
                height: auto;
                border-radius:20px;
                padding:20px
            }
            .input-box{
                background-color: rgba(255,255,255,0.8);
                min-width: 300px;
                outline: none;
                border: none;
                border-radius: 0;
                border-bottom:1px solid #cccccc;
                padding: 10px 0;
            }
            .input-box:focus{
                border-bottom:1px solid #0A0F4F;
            }
            button{
                border:none;
                outline: none;
                cursor: pointer;
                border-radius:5px;
                padding: 10px 20px;
                float: right;
                background-color: #9a0407;
                color: white;
                font-weight: 600;
                letter-spacing: 1px;
            }
            button:hover{
                background-color: #9a0407;
                color: white;
            }
        </style>
    </head>

    <body class="">
    <div class="main background-color-primary" style="background-color: #ffffff">
        <form id="auth_form" method="post" action="__passport_ajax.php" class="center">
            <h2 class="text-xl font-weight-m white p-l">Sign in to Continue</h2>
            <message class="text-s"> </message>
            <div class="p-m">
                <input class="input-box  text-m " type="text" name="user_id" placeholder="Username">
            </div>
            <div class="p-m">
                <input class="input-box text-m " type="password" name="user_pass" placeholder="Password">
            </div>
            <input type="hidden" name="backend_login" value="OK">
            <div class="p-m">
                <button type="submit" class=" background-white color-primary  text-m">Sign In</button>
                <div style="clear: both"></div>
            </div>
        </form>
        <script>
            __("#auth_form").submit(function (e) {
                __("message").html("");
                new Ajax({
                    url : "__ajax.php",
                    method : "post",
                    data : __("#auth_form").serialize("fd"),
                    success:function (el) {
                        let response = "";
                        try{
                            response  = JSON.parse(el);
                        } catch (e) {
                            response = {error:true, message:"something went wrong"};
                        }

                        if(response.error===false){
                            window.location.href = "";
                        } else {
                            __("message").html(response.message);
                            __("message").style("color", "orange");
                        }

                    }
                })
            })
        </script>
    </div>
    </body>
    </html>
    <?
    exit;
} ?>
<html>
<head>

    <link rel="stylesheet/less" href="<? echo $_SITE->__BACKEND_DIR;?>assets/stylesheets/style.less">
    <script src="<? echo $_SITE->__BACKEND_DIR;?>assets/javascripts/xpeed.js"></script>
    <script src="<? echo $_SITE->__BACKEND_DIR;?>assets/javascripts/less.min.js" ></script>

    <style>
        <?

        $file_name = array_pop(explode("/", $_SERVER["SCRIPT_NAME"]));
        $file_name = str_replace(".php","",$file_name)
        ?>
        <? echo ".".$file_name;?>{
            background-color: #9a0407;
        }
    </style>
    <script>
        document.title = "<? echo ucfirst($file_name);?>";
    </script>
</head>

<body>
<header id="header">

    <div class="logo">
        <span class="text-xl">Samima Enterprises</span>
    </div>

    <div class="search-box">
        <input type="text" onchange="go_to_page(1)" id="keyword_selector" placeholder="Search name, passport number agent etc." value="<? echo $_OS->_get("keyword");?>">
    </div>
    <div class="account">
        <?
        $logged_user_id = $_OS->_session("backend_login");
        $logged_user_details = $_OS->m_f_a($_OS->m_q("SELECT * FROM admin WHERE admin_id=$logged_user_id"));
        ?>
        <div class="profile-avatar" style="background-image: url('./assets/images/<? echo $logged_user_details["dp"]; ?>')"></div>
        <div class="profile-container">
            <nav>
                <a>Profile</a>
                <a href="?logout=OK" style="color: red">Logout</a>
            </nav>
        </div>
    </div>
</header>

<div class="leftbar">
    <?


    ?>
    <nav>

        <a class="item account" href="./access.php">
            <span>ACCESS</span>
        </a>
        <a class="item contact" href="./contact.php">
            <span>CONTACT</span>
        </a>
        <a class="item passport" href="./passport.php">
            <span>PASSPORT</span>
        </a>
        <a class="item home" href="./">
            <span>HOME</span>
        </a>
    </nav>
</div>




