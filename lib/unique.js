'use strict';

const __FILENAME__ = 'unique.js';
// https://qiita.com/zanjibar/items/8f4e77fa2f61eaed7f8c
export default function unique(array) {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','A','B','B'];
  // test
  console.log(unique(A));
  console.log(unique(B));
}