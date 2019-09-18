export default {};
[Object,Function,Boolean,Error,Number,Math,Date,String,RegExp,Array,JSON].map(
  (x)=> Object.freeze(x) && Object.freeze(x.prototype)
);
