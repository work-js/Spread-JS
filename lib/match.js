'use strict';
import _freeze from './_freeze.js';

const __FILENAME__ = 'match.js';
// https://support.google.com/docs/answer/3093378?hl=ja
export default function match(key, array, type) {
  if (typeof type==='undefined' || type===0) {
    return array.indexOf(key);
  }
  if (type===1) {
    for (let i=0;i<array.length;i++) {
      let idx = i;
      let v = array[idx];
      if (v < key ){
        continue;
      } else {
        return idx;
      }
    }
    throw __FILENAME__+': match: does not match';
  } else {
    for (let i=0;i<array.length;i++) {
      let idx = array.length-i-1;
      let v = array[idx];
      if (v < key ){
        continue;
      } else {
        return idx;
      }
    }
    throw __FILENAME__+': match: does not match';   
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [1,2,3,4,3,1];
  let B = ['A','B','A','B','B'];
  // test
  console.log(match('B',B,0));
  // type=0
  console.log(match(3,A,0)+':'+A[match(3,A,0)]);
  //

  // type=1
  console.log(match(3,A,1)+':'+A[match(3,A,1)]);
  //

  // type=-1
  console.log(match(3,A,-1)+':'+A[match(3,A,-1)]);
}