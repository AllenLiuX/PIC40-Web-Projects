/**
 This function get the elements in html and calculate the value based on two number the sign it choose. Then, it update the innerHTML with the result.
 */
function calculate(){
    var first=document.getElementById("first").value; //the first number
    var second=document.getElementById("second").value; //the second number
    var result=document.getElementById("result");   //the result
    var radio=document.getElementsByName("Signs");  //an array of the options
    if(radio[0].checked){   //the radio array is made of the options +, -, *, /. Traverse the options and see whether they are checked
        result.innerHTML="Result: "+(Number(first)+Number(second)); //use Number() to convert str to number
    }
    else if(radio[1].checked){
        result.innerHTML="Result: "+(first-second);
    }
    else if(radio[2].checked){
        result.innerHTML="Result: "+first*second;
    }
    else if(radio[3].checked){
        result.innerHTML="Result: "+first/second;
    }
}

function greet(){
    alert("This is a Javascript calculator!");
}