export const isFunc = (fn: unknown): fn is Function => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

export const isObj = (obj: unknown): obj is object => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isNum = (num: unknown): num is number => {
  return Object.prototype.toString.call(num) === '[object Number]';
};
