function foo(o, i, a){
    o.num=o.num+1;
    i=i+1;
    o.arr = a;
}

let obj={
    num:7;
    arr: [1,2,3];
};

let y=7;
let z={9,8,7};
foo(obj, y, z);
z.pop();

console.log(y)
console.log(z)
console.log(obj)