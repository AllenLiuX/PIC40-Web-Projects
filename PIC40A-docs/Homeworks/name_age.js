/**
 This function has no input and output. It can be called by a html element, and it will prompt to ask your name and age and show the age you are expected to have in 2020.
 */
function age(){
    let name = prompt("what is your name?","")
    let year = prompt("What is your year of birth?","");
    let age = 2020 - year;
    alert(name+", this year, you turn/have turned "+age+" years old.");
}


// let name = prompt("what is your name?","")
// let year = prompt("What is your year of birth?","");
// let age = 2020 - year;
// alert(name+", this year, you turn/have turned "+age+"years old.");
