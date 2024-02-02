<?php
include "../__config.php";
include "../__os.php";
if($_OS->_session("backend_login")==""){
    print "You don't have permission to view files without login. Please <a href='./'>login</a> to continue";
    exit;
}
function compress($source, $destination, $quality) {

    $info = getimagesize($source);

    if ($info['mime'] == 'image/jpeg')
        $image = imagecreatefromjpeg($source);

    elseif ($info['mime'] == 'image/gif')
        $image = imagecreatefromgif($source);

    elseif ($info['mime'] == 'image/png')
        $image = imagecreatefrompng($source);

    imagejpeg($image, $destination, $quality);

    return $destination;
}

if($_OS->_get("src")!="") {
    $src = $_OS->decode($_OS->_get("src"));
    if(file_exists($src)) {
        if($_OS->_get("compress")!=""&& $_OS->isImage($src)){
            $new_file_name = "cache/".$_OS->_get("compress")."_".basename($src);
            if(file_exists($new_file_name)){
                $src = $new_file_name;
            } else {
                $src = compress($src, $new_file_name,$_OS->_get("compress"));
            }

        }
        
        
        
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: private",false);
        header("Content-Description: File Transfer");
        header("Content-Disposition: inline; filename=".basename($src));
        header("Content-Type: ".mime_content_type($src));
        header("Content-Transfer-Encoding: binary");
        header("Content-Length: ".filesize($src));

        echo file_get_contents("$src");
    } else {
        $src = "assets/images/file_thumb.png";
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: private",false);
        header("Content-Description: File Transfer");
        header("Content-Disposition: inline; filename=".basename($src));
        header("Content-Type: ".mime_content_type($src));
        header("Content-Transfer-Encoding: binary");
        header("Content-Length: ".filesize($src));

        echo file_get_contents("$src");
    }
}