'use strict';

const __FILENAME__ = 'sequence.js';
// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
// https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-111.php
// https://support.office.com/ja-jp/article/sequence-%E9%96%A2%E6%95%B0-57467a98-57e0-4817-9f14-2eb78519ca90
export default function seqeunce (seed, iter, cd) {
  let len = 1;
  let i;
  let results = [];
  let isarray = Array.isArray(seed);
  if (isarray){
    len = seed.length;
    i = seed.pop();
    results = seed;
  } else {
    i = seed;
  }
  while (cd(i)) {
    results.push(i);
    if (isarray) {
      i = iter.apply(this,results.slice(results.length-len));
    } else {
      i = iter(i);
    }
  }
  return results;
};

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  // natural numbers
  console.log(seqeunce(0, u=>u+1, v=> v<10 ));
  // fibonacci sequence
  console.log(seqeunce([0,1], (t,u)=>t+u, v=> v<150 ));
  // tribonacci sequence
  console.log(seqeunce([0,0,1], (s,t,u)=>s+t+u, v=> v<150 ));
}