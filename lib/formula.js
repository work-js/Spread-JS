'use strict';

const __FILENAME__ = 'formula.js';
import sortby from './sortby.js';
import vlookup from './vlookup.js';
import arrayformula from './arrayformula.js';

// https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0
export default function formula (args, fn) {
  let isisarray = Array.isArray(args); 
  if (! (isisarray || typeof args === 'function')) {
    throw __FILENAME__+': bad argument';
  }
  if (typeof fn !== 'function') {
    throw __FILENAME__+': bad function';
  }
  let isarray = Array.isArray(args[0]);
  let result=null;
  if (isarray) {
    result = fn.apply(this,args);
  } else {
    result = fn(args);
  }
  return result;
};

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = ['c','a','b','c','c','a'];
  let B = [['a','b','c'],[1,2,3]];
  console.log(formula([A], (a)=>a));
  // [ 'c', 'a', 'b', 'c', 'c', 'a' ]

  console.log(formula((a)=>a+1, (f)=>f(3)));
  // 4
  
}