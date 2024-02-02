<?php
session_start();
/////////str genrater
function generateRandomString($length = 7) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$code=generateRandomString();
///session
$_SESSION["code"]=$code;
////
$im = imagecreatetruecolor(65, 16);
$bg = imagecolorallocate($im, 251,251,251); //background color blue
$fg = imagecolorallocate($im, 214,0,0);//text color white
$font = "century gothic";
imagefill($im, 0, 0, $bg);
imagestring($im, 3, 1.5, 1.5,  $code, $fg);



header("Cache-Control: no-cache, must-revalidate");
header('Content-type: image/png');
imagepng($im);
imagedestroy($im);
?>