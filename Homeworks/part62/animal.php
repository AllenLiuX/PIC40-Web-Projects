#!/usr/local/bin/php
<?php

    class Animal{
        var $name;
        function __construct($_name) { $this->name = $_name; }
        public function get_name() { return $this->name; }
    }

    class Lion extends Animal{
        public function __construct($_name){
            parent::__construct($_name);
       }
    }

    if(isset($_POST['bt'])){
        $l = new Lion('little lion');
        $php_json_string = json_encode($l);
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
<input type='button' value='press me' name='bt' onclick="alert(l.name+'');"/>
<script> <!-- direct JS -->
let l = JSON.parse('<?php echo $php_json_string; ?>');
</script>
</form>
</main>
</body>
</html>
