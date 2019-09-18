'use strict';
import freeze from './_freeze.js';

const __FILENAME__ = 'arrayformula.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
export default function arrayformula (arrays, fn) {
  let isisarray = Array.isArray(arrays); 
  if (!isisarray) {
    throw __FILENAME__+': bad argument';
  }
  let isarray = Array.isArray(arrays[0]);
  let alen = null;
  if (isarray) {
    for (let ai=0;ai<arrays.length;ai++) {
      let tmp = arrays[ai].length;
      if (alen===null) {
        alen = tmp;
      } else {
        if (alen!==tmp) {
          // TODO: 
          // throw __FILENAME__+': length not matched'+arrays[ai][0].length;
        }
      }
    }
  } else {
    alen = arrays.length;
  }
  let results = [];
  for (let ai=0;ai<alen;ai++) {
    let v;
    if (isarray) {
      let arg = [];
      for (let aj=0;aj<arrays.length;aj++) {
        arg.push(arrays[aj][ai]);
      }
      arg.push(ai);
      arg = arg.concat(arrays);
      v = fn.apply(this,arg);
    } else {
      v = fn(arrays[ai],ai,arrays);
    }
    results.push(v);
  }
  return results;
};

if (typeof process !== 'undefined') {
  if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
    let A = [0,1,2,3,4,5];
    let B = [2,4,5,6,6,5];
    console.log(arrayformula([A], a=>a+1));
    console.log(arrayformula([A,B],(a,b)=>a+b));

    /*
    arrayformula( {1}, (v) => {v,v} )
      → { 1; 1} 
    */
    console.log(arrayformula( [1], (v) => [v,v] ));
    // [ [1,1] ]

    /*
    arrayformula( {1;2}, (v) => {v,v} )
    → { {1;2}, {1;2} }
    */
    console.log(arrayformula( [[1,2]], (v) => [v,v] ));
    // [ [ 1, 1 ], [ 2, 2 ] ]

    /*
    arrayformula( {1}, (v) => {v,v+1} )
    → { 1; 2}
    */
    console.log(arrayformula( [1], (v) => [v,v+1] ));
    // [ [ 1, 2 ] ]
  }
}