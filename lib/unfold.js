'use strict';
import _freeze from './_freeze.js';

const FILENAME = 'unfold.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
// https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-111.php
export default function unfold (fn, iter, cd, seed, seed0) {
  let result = [fn(seed0)];
  let iteration = [seed0];
  let i = seed;
  while (cd(i)) {
    iteration.push(i);
    let v = fn(i);
    result.push(v);
    i = iter(
      iteration[iteration.length-1],
      iteration[iteration.length-2]
    );
  }
  return result;
};

if (typeof process !== 'undefined') {
  if (new RegExp(FILENAME+'$').test(process.argv[1])) {
    console.log(unfold(x=>-x, i=>i+10, i=> i<50, 10 ));

    console.log(unfold(x=>x, (i,j)=>i+j, i=> i<50, 1, 0 ));
  }
}