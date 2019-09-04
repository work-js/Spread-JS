'use strict';

const __FILENAME__ = 'filter.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
export default function filter (arrays, fn, ...conditions) {
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
      let cond = true;
      for (let ci=0;ci<conditions.length;ci++) {
        //console.log(ci);
        //console.log(conditions);
        if (!conditions[ci].apply(this,arg)) {
          cond = false;
          break;
        }
      }
      if (!cond) {
        continue;
      }
      v = fn.apply(this,arg);
    } else {
      let arg = arrays[ai];
      let cond = true;
      for (let ci=0;ci<conditions.length;ci++) {
        if (!conditions[ci](arg)) {
          cond = false;
          break;
        }
      }
      if (!cond) {
        continue;
      }
      v = fn(arg);
    }
    results.push(v);
  }
  return results;
};

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,1,2,3,4,5];
  let B = [2,4,5,6,6,5];
  // test
  console.log(filter([A],a=>a+1,a=>a<3));
  console.log(filter([A,B],(a,b)=>a+b,(a,b)=> a+b<8, (a,b)=> b>3));
}