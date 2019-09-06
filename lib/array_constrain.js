'use strict';

const __FILENAME__ = 'array_constrain.js';
export default function array_constrain(_array,rows,cols) {
  // TODO: for Date object
  let array = JSON.parse(JSON.stringify(_array));
  if (Array.isArray(array)){
    if (Array.isArray(array[0])){
      // { ENHANCEMENT: OUT OF SPECIFICATION
      if (typeof rows==='undefined' || rows<= 0) {
        rows = array[0].length;
      }
      if (typeof cols==='undefined' || cols<= 0) {
        cols = array.length;
      }
      // }
      let r = array[0].length;
      let c = array.length;
      if (c>cols) {
        array.splice(cols,c-cols);
      }
      if (r>rows) {
        console.error(r+' '+rows);
        for(let ci=0;ci<cols;ci++) {
          array[ci].splice(rows,r-rows);
        }       
      }
    } else {
      // { ENHANCEMENT: OUT OF SPECIFICATION
      if (typeof rows==='undefined' || rows<= 0) {
        rows = array.length;
      }
      // }
      let r = array.length;
      if (r>rows) {
        array.splice(rows,r-rows);
      }
    }
    return array;
  } else {
    throw 'invalid array';
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','C','D','E','F'];
  // test
  console.log(array_constrain(B,4,1));
  // [ 'A', 'B', 'C', 'D' ]
  console.log(array_constrain([A,B],4,1));
  // [ [ 0, 0, 2, 0 ] ]

  // { ENHANCEMENT: OUT OF SPECIFICATION
  console.log(array_constrain([A,B],0,0));
  // [ [ 0, 0, 2, 0 ] ]
  // }
}

