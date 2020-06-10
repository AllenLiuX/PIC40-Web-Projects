#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="final.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="final.css">
    <title>Color Poll</title>
</head>
<body onload="poll()">
<script>
color = prompt("What is your favorite color?", "").toLowerCase();
</script>
<?php
$color="<script>document.writeln(color);</script>";
?>
<main>
    <section class="list-item">
        <div class="item-image">
            <img src="color3.jpg">
        </div>
        <div class="item-text">
            <div class="item-title">Hello World, my name is Wenxuan Liu.</div>
            <div class="item-desc">Your vote has been recorded.<br>Scroll down to see our poll result</div>
        </div>
    </section>
    <section class="content">
        <h1>What are peoples favorite colors?</h1>
        <div>
            <label>Black</label><div class="color" id="black"></div>
        </div>
        <br><br><br><br>
    </section>
</main>
<footer>
        <b>This Page</b> is @6/6/2020 by Wenxuan Liu(Vincent).
</footer>
</body>
</html>