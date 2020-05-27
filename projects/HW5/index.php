#!/usr/local/bin/php
<?php
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('Demo');
    session_start();
    $_SESSION['loggedin'] = false;
    $error = false;

    if (isset($_POST['username']) and isset($_POST['password'])){
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        if(isset($_POST['register'])){
            echo $password;
        }
        if(isset($_POST['login'])){
            $file = fopen('accounts.txt', 'r') or die('could not open and read file');
            while(!feof($file)){
                $line = fgets($file);
                $fields = explode(" ", $line);
                if(trim($fields[0]) === $username){
                    if(trim($fields[1]) === $password){
                        $_SESSION['loggedin'] = true;
                        $_SESSION['username'] = $username;
                        header('Location: welcome.php');
                    }
                    else{
                        $error = true;
                    }
                }
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login System</title>
</head>
<body>
<main>
<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <fieldset>
    <label for='usr'>Username: </label>
    <input type="text" pattern='[0-9a-zA-Z]+@[0-9a-zA-Z.]+' id='usr' name="username"/><br>
    <label for='pass'>Password(≥ 6 characters letters or digits): </label>
    <input type="text" pattern='[0-9a-zA-Z]{6,}' id='pass' name="password"/><br>
    <input type='submit' value='Register' name='register'/>
    <input type='submit' value='Log in' name='login'/>

    </fieldset>
</form>
</main>
</body>
</html>