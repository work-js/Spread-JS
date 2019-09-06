'use strict';

const __FILENAME__ = 'columns.js';
export default function columns(array) {
  if (Array.isArray(array)){
    if (Array.isArray(array[0])){
      return array.length;
    } else {
      return 1;
    }
  } else {
    throw 'invalid array';
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','C','D','E','F'];
  // test
  console.log(columns(B));
  // C
  console.log(columns([A,B]));
  // [ 'A', 'A', 'C', 'A', 'E', 'F' ]
}

