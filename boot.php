<?php
try {
    $target = realpath(__DIR__ . "/client/dist/assets");
    $link = "assets";
    if(is_dir($link) && file_exists($link)){
        shell_exec("rm -R ". realpath(__DIR__ ."/".$link));
    }
    symlink($target, $link);
} catch (Exception $error) {
    echo "Symlink already exists";
}
