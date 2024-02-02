<?php
try{
$target = realpath(__DIR__."/../old/assets/uploads");
$link = "storage/uploads";
symlink($target, $link);
} catch(Exception $error){
    echo "Symlink already exists";
}
?>