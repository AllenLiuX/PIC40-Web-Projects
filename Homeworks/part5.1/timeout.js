
for (var i=1; i<=10; ++i){
    setTimeout( function () {
        document.getElementById("print").innerHTML+=i;
    }, i*10);
}

for (var j=1; j<=7; ++j){
    console.log(j);
}