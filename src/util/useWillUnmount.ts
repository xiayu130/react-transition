import { useEffect } from 'react';
import { isFunc } from './checkType';

const useWillUnmount = (fn: () => void): void => {
  useEffect(() => {
    return () => {
      if (isFunc(fn)) {
        fn();
      }
    }
  }, []);
};

export default useWillUnmount;
