#!/usr/local/bin/php
<?php
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('Demo');
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body>
<main>
    <p>Welcome. Your email address is <?php echo $_SESSION['username']; ?>.</p>
    <p>
    Here is a list of all registered addresses:
    <?php
        $file = fopen('accounts.txt', 'r') or die('could not open and read file');
        while(!feof($file)){
            $line = fgets($file);
            $fields = explode(" ", $line);
            echo $fields[0];
        }
        fclose($file);
    ?></p>
    <form>
    <input type='button' value='log out'/>
    </form>
</main>
</body>
</html>