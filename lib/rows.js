'use strict';

const __FILENAME__ = 'rows.js';
export default function rows(array) {
  if (Array.isArray(array)){
    if (Array.isArray(array[0])){
      return array[0].length;
    } else {
      return array.length;
    }
  } else {
    throw 'invalid array';
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','C','D','E','F'];
  // test
  console.log(rows(B));
  // C
  console.log(rows([A,B]));
  // [ 'A', 'A', 'C', 'A', 'E', 'F' ]
}

