'use strict';
import _freeze from './_freeze.js';
import match from './match.js';

const __FILENAME__ = 'filter.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
export default function filter (arrays, fn, ...conditions) {
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
          throw __FILENAME__+': length not matched';
        }
      }
    }
  } else {
    alen = arrays.length;
  }
  let results = [];
  for (let ai=0;ai<alen;ai++) {
    let v;
    let index = ai;
    let arg = [];
    if (isarray) {
      for (let aj=0;aj<arrays.length;aj++) {
        arg.push(arrays[aj][ai]);
      }
      arg.push(index);
      if (alen===1) {
        // TODO: redundant?
        arg.push(arrays[0]);
      } else {
        // TODO: redundant?
        arg = arg.concat(arrays);
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
      arg.push(arrays[ai]);
      arg.push(index);
      arg.push(arrays);
      let cond = true;
      for (let ci=0;ci<conditions.length;ci++) {
        if (!(conditions[ci].apply(this,arg))) {
          cond = false;
          break;
        }
      }
      if (!cond) {
        continue;
      }
      v = fn.apply(this,arg);
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
  // unique
  console.log(
    filter(B,(a,opt)=>a,
      (a,index,self)=>self.indexOf(a)===index
    )
  );
  // unique
  console.log(
    filter(B,(a)=>a,
      (a,index,self)=>match(a,self,0)===index
    )
  );
  /* filter(dataset,
      match(dataset,dataset,0)=row(dataset)
      -cell("row",dataset)+1
     )
     // https://docs.google.com/spreadsheets/d/1XcrCh3bg56-XYFGUjvy3Q5u7K-3GuqkqvyJtBgDEzZY/edit#gid=0
   */
}