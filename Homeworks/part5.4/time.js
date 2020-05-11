function creation(){
    var words=document.getElementById('text').value;
    document.getElementById('text').value='';
    var para=document.createElement("p");
    para.appendChild(document.createTextNode(words));
    var main=document.getElementById("mainpage");
    main.appendChild(para);
    for(let i=0; i<main.children.length; ++i){
        if(i%2) {
            main.children[i].setAttribute('style', 'color:red;');
        }
        else{
            main.children[i].setAttribute('style', 'color:blue;');
        }
    }
}

function update(){
    setTimeout(creation, 3000);
}