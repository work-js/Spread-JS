export default {};
[JSON,Math,Object,Boolean,Error,Number,Date,String,RegExp,Array].map((x)=> Object.freeze(x));
[Function,Object,Boolean,Error,Number,Date,String,RegExp,Array].map((x)=> Object.freeze(x.prototype));
[console].map((x)=> Object.freeze(x));

