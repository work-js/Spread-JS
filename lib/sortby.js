'use strict';
import _freeze from './_freeze.js';

const __FILENAME__ = 'sortby.js';
// https://support.office.com/ja-jp/article/sortby-%E9%96%A2%E6%95%B0-cd2d7a62-1b93-435c-b561-d6a35134f28f

export default function sortby(array,...opts) {
  if (!Array.isArray(array)) {
    throw __FILENAME__+': invalid input';
  }
  if (array.length===0){
    return array;
  }
  if (typeof opts==='undefined' || opts.length===0) {
    throw __FILENAME__+': invalid opts';
  }
  let isArray = Array.isArray(array[0]);
  if (!isArray) {
    array = [array];
  }
  for (let oi=0;oi<opts.length;oi++){
    if (oi%2===0) {
      if (!Array.isArray(opts[oi]) || array[0].length!==opts[oi].length) {
        throw __FILENAME__+': invalid opts';
      }
    } else{
      if (Array.isArray(opts[oi])) {
        throw __FILENAME__+': invalid opts';
      }
      if(opts[oi]) {
        opts[oi] = 1;
      } else {
        opts[oi] = -1;
      }
    }
  }

  
  for (let oi=0;oi<opts.length;oi++){
    if (oi%2===1) {
      continue;
    }
    let idx = opts.length-2-oi;
    let pushArray = opts[idx];
    let sortFlag = opts[idx+1];
    let index = array.length;
    let isArray = true;
    let fn = generateFn(sortFlag,index,isArray);
    array.push(pushArray);
    array = transpose(transpose(array).sort(fn));
    array.pop();
  }
  if (isArray){
    return array;
  } else {
    return array[0];
  }
  function generateFn(sortFlag,index,isArray) {
    if (!isArray) {
      return function(a,b){
        if (a>b){
          return sortFlag;
        } else if (a<b){
          return -sortFlag;
        } else {
          return 0;
        }
      };
    } else {
      return function(a,b){
        if (a[index]>b[index]){
          return sortFlag;
        } else if (a[index]<b[index]){
          return -sortFlag;
        } else {
          return 0;
        }
      };
    }
  }
  function transpose (matrix){
    if (!matrix || !Array.isArray(matrix)) {
      throw __FILENAME__+': invalid matrix';
    }
    if (matrix.length===0 || Array.isArray(matrix[0].length===0)) {
      return matrix;
    }
    let row = matrix.length;
    let col = matrix[0].length;
    let ret = [];
    for (let rj=0;rj<col;rj++) {
      ret.push([]);
      for (let ri=0;ri<row;ri++) {
        ret[rj].push(matrix[ri][rj]);
      }     
    }
    return ret;
  }
}

if (typeof process !== 'undefined') {
  if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
    let A = [0,0,2,0,4,5];
    let B = ['A','B','A','B','B','A'];
    // test
    console.log(sortby(A,A,false));
    // [ 0, 0, 0, 2, 4, 5 ]
    console.log(sortby([A,B],B,false));
    // [ [ 0, 0, 4, 0, 2, 5 ], [ 'B', 'B', 'B', 'A', 'A', 'A' ] ]
  }
}