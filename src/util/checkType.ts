export const isFunc = (fn: unknown): boolean => {
  return Object.prototype.toString.call(fn) === '[object Function]'
};

export const isObj = (obj: unknown): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
};
