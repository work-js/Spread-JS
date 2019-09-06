'use strict';
import arrayformula from './lib/arrayformula.js';
import vlookup from './lib/vlookup.js';
import sortby from './lib/sortby.js';
import sort from './lib/sort.js';
import rows from './lib/rows.js';
import array_constrain from './lib/array_constrain.js';


let A = ['c','a','b','c','c','a'];
let B = [['a','b','c'],[1,2,3]];
//console.log(arrayformula([A,B],(a,b)=>
//  sortby(a,vlookup(a,b,1,false)))
//);
console.log(vlookup('c',B,1,false));

console.log(arrayformula(A,
  (a) => vlookup(a,B,1,false)
));

console.log(arrayformula([A,B],
  (a,b,index,_A,_B) => vlookup(a,_B,1,false)
));

//  =sortby(
// {"c";"a";"b";"c";"c";"a"},
// vlookup({"c";"a";"b";"c";"c";"a"}, {"a",1;"b",2;"c",3},2,false),
console.log(sortby(A, arrayformula([A,B],
  (a,b,index,_A,_B) => vlookup(a,_B,1,false)),true));

//  =sortby(
// {"c";"a";"b";"c";"c";"a"},
// vlookup({"c";"a";"b";"c";"c";"a"}, {"a",1;"b",2;"c",3},2,false),
console.log(sortby(A, arrayformula(A,
  (a) => vlookup(a,B,1,false)),true));

console.log(array_constrain(sort([A, arrayformula(A,
  (a) => vlookup(a,B,1,false))],1,true),rows(A),1));
