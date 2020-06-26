#!/usr/local/bin/php
<?php
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('Demo');
    session_start();
    $_SESSION['loggedin'] = false;
    $wrong_password = false;
    $registered = false;
    $no_user = false;
    $need_validation = false;
    $ready_register = false;

    if (isset($_POST['username']) and isset($_POST['password'])){
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $password = hash('md2', $password);
        if(isset($_POST['register'])){
            //first check whether already registered
            $file = fopen('accounts.txt', 'r') or die('could not open and read file');
            while(!feof($file)){
                $line = fgets($file);
                $fields = explode(" ", $line);
                if(trim($fields[0]) === $username){
                    $registered = true;
                }
            }
            fclose($file);
            //Then check whether need validation
            $file2 = fopen('validation.txt', 'r') or die('could not open and read file');
            while(!feof($file2)){
                $line = fgets($file2);
                $fields = explode(" ", $line);
                if(trim($fields[0]) === $username and !$registered){
                    $need_validation = true;
                }
            }
            fclose($file2);

            if(!$registered and !$need_validation){
                $ready_register = true;
                $_SESSION['username'] = $username;
                $token = hash('md2', mt_rand(500,20000));
                $_SESSION['token']=$token;
                $info = "$username $password $token\n";
                $vfile = fopen('validation.txt', 'a');
                fwrite($vfile, $info);
                fclose($vfile);

                $content = "Validate by clicking here: https://www.pic.ucla.edu/~vincentliux/HW5/validate.php?email=$username&token=$token";
                mail($username, "validation", $content);
            }
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
                        fclose($file);
                        header('Location: welcome.php');
                    }
                    else{
                        $wrong_password = true;
                    }
                }
            }
            if(!$wrong_password){
                $no_user = true;
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
    </fieldset>
    <input type='submit' value='Register' name='register'/>
    <input type='submit' value='Log in' name='login'/>
    <?php
    if($wrong_password){?>
        <p>Your password is invalid.</p> <?php
    }
    if($no_user){?>
        <p>No such email address. Please register or validate.</p> <?php
    }
    if($registered){?>
        <p>Already registered. Please log in.</p> <?php
    }
    if($need_validation){?>
        <p>Already sent validation. Please validate.</p> <?php
    }
    if($ready_register){?>
        <p>A validation email has been sent to: <?php echo $_SESSION['username']?>. Please follow the link.</p> <?php
    } ?>
</form>
</main>
</body>
</html>