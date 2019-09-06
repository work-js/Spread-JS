'use strict';

const __FILENAME__ = 'array_constrain.js';
export default function array_constrain(array,rows,cols) {
  let _array = array.concat();
  if (Array.isArray(array)){
    if (Array.isArray(array[0])){
      let r = array[0].length;
      let c = array.length;
      if (c>cols) {
        _array.splice(cols,c-cols);
      }
      if (r>rows) {
        for(let ci=0;ci<cols;ci++) {
          _array[ci].splice(rows,r-rows);
        }       
      }
    } else {
      let r = array.length;
      if (r>rows) {
        _array.splice(rows,r-rows);
      }
    }
    return _array;
  } else {
    throw 'invalid array';
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','C','D','E','F'];
  // test
  console.log(array_constrain(B,4,1));
  // C
  console.log(array_constrain([A,B],4,1));
  // [ 'A', 'A', 'C', 'A', 'E', 'F' ]
}

