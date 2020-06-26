function update(){
    var words=document.getElementById('tex').value;
    document.getElementById('tex').value='';
    var nod=document.createElement("li");
    nod.appendChild(document.createTextNode(words));
    var item=document.getElementById("list");
    item.appendChild(nod);
    for(let i=1; i<item.children.length; i+=2){
        item.children[i].setAttribute('id','even');
    }
}