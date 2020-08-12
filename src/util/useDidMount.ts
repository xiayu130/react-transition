import { useEffect } from 'react';
import { isFunc } from './checkType';

const useDidMount = (fn: () => void): void => {
  useEffect(() => {
    if (isFunc(fn)) {
      fn();
    }
  }, []);
};

export default useDidMount;
