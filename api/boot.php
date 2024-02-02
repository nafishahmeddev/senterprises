<?php
try {
    $target = realpath(__DIR__ . "/../old/assets/uploads");
    $target = __DIR__."/test";
    $link = "storage/uploads";
    if(is_dir($link) && file_exists($link)){
        rmdir($link);
    }
    symlink($target, $link);
} catch (Exception $error) {
    echo "Symlink already exists";
}
