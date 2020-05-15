
var moveId = 0;
var changeId = 0;
var direction = 1;
var name;
var c_speed = 0;
var c_color = 'red';

function greet() {
    name = prompt("What is your name?", "");
    get_cookie();
    let valid = false;
    $.ajax({
        url: "important.txt",
        datatype: "text",
        success: function (data) {
            let names = data.split('\n');
            for (let n of names) {
                if (n !== names[names.length-1])
                    n = n.substr(0, n.length-1);
                if (name === n){
                    valid = true;
                }
            }
            if(!valid){
                $("main").append("<p>No greeting for you!</p>");
            }
            else{
                $("main").append("<form><fieldset id='speed'></fieldset><fieldset id='color'></fieldset></form>");
                for (let i=0; i<=50; i++){
                    $("#speed").append("<label for='p"+i+"'> Speed "+i+" </label>");
                    $("#speed").append("<input type='radio' id='p"+i+"' name='Speed' value='"+i+"' onclick='update()'>");
                    if(i%10==0){
                        $("#speed").append("<br>");
                    }
                }
                $("#color").append("<label for='red'> red </label>");
                $("#color").append("<input type='radio' id='red' value='red' onclick='update()' name='Color'>");
                $("#color").append("<label for='yellow'> yellow </label>");
                $("#color").append("<input type='radio' id='yellow' value='yellow' onclick='update()' name='Color'>");
                $("#color").append("<label for='blue'> blue </label>");
                $("#color").append("<input type='radio' id='blue' value='blue' onclick='update()' name='Color'>");
                $("main").append("<div id='back'><div id='rectangle'>Welcome "+name+"</div></div>");


                $("#p"+c_speed).attr("checked", true);
                // $("main").append("<h1>"+c_color+"</h1>");
                $("#"+c_color).attr("checked", true);

                $("#back").css("width", "100%");
                $("#back").css("height", "300px");
                $("#back").css("background-color","grey");
                $("#rectangle").css("background-color", "red");
                $("#rectangle").css("text-align", "center");
                $("#rectangle").css("height", "150px");
                $("#rectangle").css("width", "300px");
                $("#rectangle").css("margin-top", "75px");
                $("#rectangle").css("position","absolute");
            }
        }
    });
    // if(c_speed>=0)
    update();
}

function update() {
    // let cur_color = $('input[name=Color]:checked').val();
    // $("#rectangle").css("background-color", cur_color);
    if(changeId !== 0)
        clearInterval(changeId);
    changeId = setInterval(change, 1000);   //check the options every second

    if(moveId!==0)
        clearInterval(moveId);
    moveId=setInterval(move, 10);   //update the animation every 10 msec
}

function change() {
    make_cookie();
    c_color = $('input[name=Color]:checked').val();
    c_speed = Number($('input[name=Speed]:checked').val());
}

function move() {
    // if(c_color !== "")
    $("#rectangle").css("background-color", c_color);
    let cur_left = $("#rectangle").position().left;
    let cur_speed = c_speed/2;
    if(isNaN(cur_left))    // something === NaN is always evaluated as false
        cur_left=0;
    else
        cur_left = Number(cur_left);
    if(cur_left>window.innerWidth-307)
        direction = -1;
    else if(cur_left-cur_speed<8)
        direction = 1;
    let new_left = cur_left+cur_speed*direction;
    // $("main").append("<h1>"+cur_left+"</h1>");
    $("#rectangle").css("left", new_left+"px");
}


function make_cookie(){
    let cookie_name = "name=" + name + ";";
    let user_speed = $('input[name=Speed]:checked').val();
    let cookie_speed = "speed=" + user_speed + ";";
    let user_color = $('input[name=Color]:checked').val();
    let cookie_color = "color="+user_color+";";
    let now = new Date(), expires = now;
    expires.setSeconds(expires.getSeconds()+20);
    let cookie_expires = "expires=" + expires.toUTCString() + ";";
    let cookie_path = "path=" + window.location.pathname;
    document.cookie = cookie_name + cookie_expires + cookie_path;
    document.cookie = cookie_speed + cookie_expires + cookie_path;
    document.cookie = cookie_color + cookie_expires + cookie_path;
}


function get_cookie() {
    let cookie = document.cookie.split(';');
    let name_matched = false;
    for(let part of cookie){    //check whether the name matches the name in the cookie
        let pieces = part.split('=');
        pieces[0] = pieces[0].trim();
        if (pieces[0] === 'name' && pieces[1] === name){
            name_matched = true;
        }
    }
    if (name_matched){
        for(let part of cookie){
            let pieces = part.split('=');
            pieces[0] = pieces[0].trim();
            if (pieces[0] === 'speed'){
                c_speed = Number(pieces[1].trim());
            }
            else if (pieces[0] === 'color'){
                c_color = pieces[1].trim();
            }
        }
    }
}
