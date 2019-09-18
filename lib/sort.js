'use strict';
import _freeze from './_freeze.js';

const __FILENAME__ = 'sort.js';
export default function sort(array,index,isAscendant) {
  if (!Array.isArray(array)) {
    throw __FILENAME__+': invalid input';
  }
  if (array.length===0){
    return array;
  }
  if (index <0) {
    throw __FILENAME__+': invalid index';
  }
  let isArray = Array.isArray(array[0]);
  if (typeof index==='undefined') {
    index = 0;
  }
  if (isArray) {
    if (array[0].length <= index) {
      throw __FILENAME__+': invalid index';
    }
  }
  if (typeof index === 'function') {
    let fn = index;
    let fn2  = isAscendant;
    return sortByFunction(array,isArray,fn,fn2);
  }
  let sortFlag = -1;
  if (typeof isAscendant==='undefined' || isAscendant) {
    sortFlag = 1;
  }
  let fn = (function(sortFlag,index,isArray) {
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
  )(sortFlag,index,isArray);

  if (isArray) {
    return transpose(transpose(array).sort(fn));
  } else {
    return array.concat().sort(fn);
  }
}
function sortByFunction(array,isArray,fn,fn2) {
  if (isArray) {
    let func = (function(fn,fn2) {
      return function(a,b){
        return applyFn(fn,fn2,a,b);
      };
    })(fn,fn2);  
    return transpose(transpose(array).sort(func));
  } else {
    return array.concat().sort(fn);
  }

  function applyFn (fn,fn2,a,b) {
    let arg = [];
    for (let ai=0;ai<a.length;ai++) {
      arg.push(a[ai]);
      arg.push(b[ai]);
    }
    let res = fn.apply(this,arg);
    let res2 = true;
    if (typeof fn2 === 'function') {
      res2 = fn2.apply(this,arg);
    }
    if (res) {
      return 1;
    } else if (res2) {
      return -1;
    } else {
      return 0;
    }
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

if (typeof process !== 'undefined') {
  if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
    let A = [0,0,2,0,4,5];
    let B = ['A','B','A','B','B','A'];
    // test
    console.log(sort(A));
    // [ 0, 0, 0, 2, 4, 5 ]
    console.log(sort([A,B],1,false));
    // [ [ 0, 0, 4, 0, 2, 5 ], [ 'B', 'B', 'B', 'A', 'A', 'A' ] ]
    console.log(sort([A,B],(a_0,a_1,b_0,b_1)=>(b_0<b_1)));
    // [ [ 4, 0, 0, 5, 2, 0 ], [ 'B', 'B', 'B', 'A', 'A', 'A' ] ]
    console.log(sort([A,B],(a_0,a_1,b_0,b_1)=>(b_0<b_1),(a_0,a_1,b_0,b_1)=>(b_0>b_1)));
    // [ [ 0, 0, 4, 0, 2, 5 ], [ 'B', 'B', 'B', 'A', 'A', 'A' ] ]
  }
}