'use strict';

const __FILENAME__ = 'arrayformula.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
export default function arrayformula (arrays, fn) {
  let isisarray = Array.isArray(arrays); 
  if (!isisarray) {
    throw 'bad argument';
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
          throw 'length not matched';
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
      v = fn.apply(this,arg);
    } else {
      v = fn(arrays[ai]);
    }
    results.push(v);
  }
  return results;
};

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,1,2,3,4,5];
  let B = [2,4,5,6,6,5];
  console.log(arrayformula([A], a=>a+1));
  console.log(arrayformula([A,B],(a,b)=>a+b));
  console.log(arrayformula( [1], (v) => v ));
  console.log(arrayformula( [[1,2]], (v) => [v,v] ));
  console.log(arrayformula( [1], (v) => [v,v+1] ));
}