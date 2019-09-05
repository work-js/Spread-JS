'use strict';

const __FILENAME__ = 'match.js';
export default function match(val, array) {
  return array.indexOf(val);
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','A','B','B'];
  // test
  console.log(match(2,A));
  console.log(match('B',B));
}