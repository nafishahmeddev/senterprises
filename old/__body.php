<?


    $content = $pageContent['content'];
    $banner = $pageContent['image'];
    $title = $pageContent['title'];

    ////check if banner found
    if ($pageContent['showImage'] == 1) {
        ?>
        <img src="<? echo $_SITE->__FRONTEND_DIR ?>/<? echo $banner ?>" width="100%"/>
        <?
    }
    ///check page found
    if ($pageContent['active'] == "0") {

    } else {
        $content = $_OS->getPageContent($content);
        echo $content;
    }

?>