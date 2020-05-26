#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mail</title>
</head>
<body>
<main>
<form method="get" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <label for='rec'>Receiver: </label>
    <input type="text" id='rec' name="receiver"/><br>
    <label for='tit'>Title: </label>
    <input type="text" id='tit' name="title"/><br>
    <label for='con'>Content: </label><br>
    <textarea rows="8" cols="100" id='con' name="message"></textarea><br>
    <input type='submit' valaue='get'/>
</form>
<p>
<?php
    if(isset($_GET['receiver']) and isset($_GET['title']) and isset($_GET['message'])){
        mail($_GET['receiver'], $_GET['title'], $_GET['message']);
    }
?>
</p>
</main>
</body>
</html>
