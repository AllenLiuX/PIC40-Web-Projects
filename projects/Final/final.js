let color;
/**
 This is the function loaded at the beginning of the page. It asks for an input of your favorite color, and update page's poll result correspondingly
 */
function poll(){
    let options = ['black','white','yellow','pink','blue','green','purple','red','orange'];
    // let color = prompt("What is your favorite color?", "").toLowerCase();
    let color_valid = 0;
    for(let i of options){
        if(i == color){
            color_valid = 1;
        }
    }

    if(color_valid === 0){
        alert('Sorry, invalid color input.\nTry one color among black, white, yellow, pink, blue, green, purple, red, or orange.');
    }

    let color_div = document.getElementById(color);
    let content = color_div.innerHTML;
    let info = content.split(' ');
    let len=Number(info[1])+1;
    color_div.innerHTML = info[0]+" "+len;
    color_div.style.width = len+"%";
    // $.ajax({
    //     url: "color.txt",
    //     datatype: "text",
    //     success: function (data) {
    //         let colors = data.split('\n');
    //         for (let n of colors) {
    //             n = n.trim();
    //             let d = n.split(' ');
    //         }
    //         alert(data);
    //         console.log(data);
    //         $("main").append("<h1>Hello World</h1>");
    //         $("#black").append("<h1>Hello World</h1>");
    //     }
    // });
}