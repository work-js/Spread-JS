'use strict';

const __FILENAME__ = 'index.js';
// https://docs.google.com/spreadsheets/d/1GGtbO2KU9kwPaS0hFXZpJz-Ng_w2YL3Rv5C0W8WCgiM/edit#gid=0
// https://qiita.com/rexiaxm7/items/f7d0c5e70ca3f1c5bbec?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=29008e230e-Qiita_newsletter_377_09_04_2019&utm_medium=email&utm_term=0_e44feaa081-29008e230e-32920041
export default function index(array,idx) {
  if (Array.isArray(idx)){
    return idx.map((elem) => getIndex(array, elem));
  } else {
    return getIndex(array, idx);
  }
  function getIndex(array, idx) {
    if (array.length > idx && idx >= 0) {
      return array[idx];
    }
    else {
      return null;
    }
  }
}

if (new RegExp(__FILENAME__+'$').test(process.argv[1])) {
  let A = [0,0,2,0,4,5];
  let B = ['A','B','C','D','E','F'];
  // test
  console.log(index(B,2));
  console.log(index(B,A));
}

