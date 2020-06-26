#!/usr/local/bin/php
<?php
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('Demo');
    session_start();
    if(isset($_SESSION['Demo'])){
        unset($_SESSION['Demo']);
    }
    session_destroy();
    header('Location: index.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Logout</title>
</head>
</html>