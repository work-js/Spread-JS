'use strict';
import _freeze from './_freeze.js';

const __FILENAME__ = 'unique.js';
// https://qiita.com/zanjibar/items/8f4e77fa2f61eaed7f8c
// https://docs.google.com/spreadsheets/d/1XcrCh3bg56-XYFGUjvy3Q5u7K-3GuqkqvyJtBgDEzZY/edit#gid=0
export default function unique(array) {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
  /* filter(dataset,
      match(dataset,dataset,0)=row(dataset)
      -cell("row",dataset)+1
     )
   */
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','A','B','B'];
  // test
  console.log(unique(A));
  console.log(unique(B));
}