'use strict';

const __FILENAME__ = 'sort.js';
export default function sort(array,index,isAscendant) {
  if (!Array.isArray(array)) {
    throw 'invalid input';
  }
  if (array.length===0){
    return array;
  }
  if (index <0) {
    throw 'invalid index';
  }
  let isArray = Array.isArray(array[0]);
  if (typeof index==='undefined') {
    index = 0;
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
    if (array[0].length <= index) {
      throw 'invalid index';
    }
    return transpose(transpose(array).sort(fn));
  } else {
    return array.concat().sort(fn);
  }
  function transpose (matrix){
    if (!matrix || !Array.isArray(matrix)) {
      throw 'invalid matrix';
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

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','A','B','B','A'];
  // test
  console.log(sort(A));
  // [ 0, 0, 0, 2, 4, 5 ]
  console.log(sort([A,B],1,false));
  // [ [ 0, 0, 4, 0, 2, 5 ], [ 'B', 'B', 'B', 'A', 'A', 'A' ] ]
}