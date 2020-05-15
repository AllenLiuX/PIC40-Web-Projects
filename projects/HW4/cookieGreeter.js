let moveId = 0;
let changeId = 0;
let direction = 1;
let name;
let c_speed = 0;
let c_color = 'red';

/**
 this is the function loaded at the begining of the page. It asks for an input of name, and update page correspondingly
 */
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
                n = n.trim();
                if (name === n){
                    valid = true;
                }
            }
            if(!valid){ //name not in important.txt
                $("main").append("<p>No greeting for you!</p>");
            }
            else{
                $("main").append("<form><fieldset id='speed'></fieldset><fieldset id='color'></fieldset></form>");
                //add the options of speeds
                for (let i=0; i<=50; i++){
                    $("#speed").append("<label for='p"+i+"'> Speed "+i+" </label>");
                    $("#speed").append("<input type='radio' id='p"+i+"' name='Speed' value='"+i+"'>");
                    if(i%10==0){
                        $("#speed").append("<br>");
                    }
                }
                //add three options of colors
                $("#color").append("<label for='red'> red </label>");
                $("#color").append("<input type='radio' id='red' value='red' name='Color'>");
                $("#color").append("<label for='yellow'> yellow </label>");
                $("#color").append("<input type='radio' id='yellow' value='yellow' name='Color'>");
                $("#color").append("<label for='blue'> blue </label>");
                $("#color").append("<input type='radio' id='blue' value='blue' name='Color'>");
                //add the animation divs
                $("main").append("<div id='back'><div id='rectangle'>Welcome "+name+"</div></div>");

                //check the default(or cookie) speed and color
                $("#p"+c_speed).attr("checked", true);
                $("#"+c_color).attr("checked", true);

                //set the style of the divs
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
    changeId = setInterval(change, 1000);   //check the options every second
    moveId=setInterval(move, 10);   //update the animation every 10 msec
}

/**
 * check the options and update c_color and c_speed
 */
function change() {
    make_cookie();
    c_color = $('input[name=Color]:checked').val();
    c_speed = Number($('input[name=Speed]:checked').val());
}

/**
 * update the div's speed and color based on c_color and c_speed
 */
function move() {
    $("#rectangle").css("background-color", c_color);
    let cur_left = $("#rectangle").position().left;
    let cur_speed = c_speed/2;
    if(isNaN(cur_left))    // something === NaN is always evaluated as false
        cur_left=0;
    else
        cur_left = Number(cur_left);
    if(cur_left>window.innerWidth-307)  //move to left when exceed the right bound
        direction = -1;
    else if(cur_left-cur_speed<8)   //move to right when exceed the left bound
        direction = 1;
    let new_left = cur_left + cur_speed * direction;
    $("#rectangle").css("left", new_left+"px");     //move the div by changing the left attribute
}

/**
 * This function makes cookie of name, speed, and color
 */
function make_cookie(){
    let cookie_name = "name=" + name + ";";
    let user_speed = $('input[name=Speed]:checked').val();
    let cookie_speed = "speed=" + user_speed + ";";
    let user_color = $('input[name=Color]:checked').val();
    let cookie_color = "color="+user_color+";";
    let now = new Date(), expires = now;
    expires.setSeconds(expires.getSeconds()+10);    //expire after 10 seconds
    let cookie_expires = "expires=" + expires.toUTCString() + ";";
    let cookie_path = "path=" + window.location.pathname;
    document.cookie = cookie_name + cookie_expires + cookie_path;
    document.cookie = cookie_speed + cookie_expires + cookie_path;
    document.cookie = cookie_color + cookie_expires + cookie_path;
}

/**
 * This function updates the variables when the name matched based on cookie.
 */
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
