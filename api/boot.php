<?php
try {
    $target = realpath(__DIR__ . "/../old/assets/uploads");
    $link = "storage/uploads";
    if(is_dir($link) && file_exists($link)){
        shell_exec("rm -R ". realpath(__DIR__ ."/".$link));
    }
    symlink($target, $link);
} catch (Exception $error) {
    echo "Symlink already exists";
}
