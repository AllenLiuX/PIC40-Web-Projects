function greet() {
    let name = prompt("What is your name?", "");
    var valid = false;
    $.ajax({
        url: "important.txt",
        datatype: "text",
        success: function (data) {
            // $("h1").html(data);
            let names = data.split('\n');
            for (n of names) {
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
                $("#rectangle").css("background-color", "red");
                $("#rectangle").css("text-align", "center");
                $("#rectangle").css("height", "100px");
                $("#rectangle").css("width", "200px");
                $("#rectangle").css("margin-top", "40px");
                $("#rectangle").css("position","relative");
                $("#back").css("width", "100vw");
                $("#back").css("height", "30vh");
                $("#back").css("background-color","grey");
            }
        }
    });
}

function update() {
    let cur_color = $('input[name=Color]:checked').val();
    $('main').append("<h3>"+cur_color+"</h3>");
    $("#rectangle").css("background-color", cur_color);
    // $('#rectangle').css("transition", "all 2s ease");
    $('#rectangle').css("float", "right");


}