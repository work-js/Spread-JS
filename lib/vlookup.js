'use strict';
import _freeze from './_freeze.js';

const __FILENAME__ = 'vlookup.js';
// https://support.office.com/ja-jp/article/vlookup-%E9%96%A2%E6%95%B0-0bbc8083-26fe-4963-8ab8-93a18ad188a1
export default function vlookup(key, array, index,_type) {
  if (!Array.isArray(array) || !Array.isArray(array[0])){
    throw __FILENAME__+': invalid array';
  }
  if (!(0<=index && index<array.length)) {
    throw __FILENAME__+': invalid array length';
  }
  let type;
  if (typeof _type ==='undefined' || _type===1 || _type===true) {
    type = true;
  } else {
    type = false;
  }
  if (type===false) {
    for (let i=0;i<array[0].length;i++) {
      let v = array[0][i];
      if (v === key ){
        return array[index][i];
      }
    }
    throw __FILENAME__+': not looked up';
  } else {
    let keyType = getObjectType(key);
    if (keyType==='Number') {
      let min = -1;
      let mindex = -1;
      for (let i=0;i<array[0].length;i++) {
        let v = array[0][i];
        if (v === key ){
          return array[index][i];
        } else {
          let comp = Math.abs(key-v);
          if (min===-1 || comp<min) {
            min = comp;
            mindex = i;
          }
        }
      }
      if (mindex!==-1) {
        return array[index][mindex];
      } else {
        throw __FILENAME__+': not looked up';
      }
    } else if (keyType==='String') {
      // TODO
    } else {
      throw __FILENAME__+': invalid key type';
    }
    throw __FILENAME__+': not looked up'; 
  }
}

function getObjectType ( object ) {
  return Object.prototype.toString.call(object).replace(/\[object (\w+)\]$/,'$1');
}

if (typeof process !== 'undefined') {
  if( new RegExp(__FILENAME__+'$').test(process.argv[1])) {
    let A = [[1,2,7,4,3,1],[11,21,31,41,13,11],['A','B','Z','E','T','S']];
    // test
    console.log(vlookup(3,A,2,false));
    // T
    
    console.log(vlookup(6,A,2,true));
    // Z
  }
}