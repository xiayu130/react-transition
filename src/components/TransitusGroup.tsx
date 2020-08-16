import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { TransitusProps } from './Transitus';
import {
  isUnd,
} from '../util/checkType';

interface TransitusGroup {
  animation?: boolean; // 是否开启动画
  interval?: number; // group间隔的时间
}

export const TransitusContext = React.createContext({
  animations: {},
  register: (props: TransitusProps) => {},
});

const TransitusGroup: React.FC<TransitusGroup> = (props) => {

  const {
    animation = false,
    interval = 200,
    children,
  } = props;

  const [animations, setAnimations] = useState({});
  const animationsRef = useRef<{
    [key: string]: TransitusProps,
  }>({});
  const register = useCallback((props: TransitusProps) => {
    const { ID } = props;
    if (!isUnd(ID)) {
      animationsRef.current[ID] = props;
    }
  }, []);

  useEffect(() => {
    let counter = 0;
    const transitus = Object.values(animationsRef.current) || [];
    const animationsTemp: {
      [key: string]: Omit<TransitusProps, 'children'>
    }= {};
    (animation ? transitus : [...transitus.reverse()]).forEach((t) => {
      const { ID } = t;
      if (!isUnd(ID)) {
        animationsTemp[ID] = {
          delay: interval + (counter * interval),
          animation,
        };
        counter += 1;
      }
    });
    setAnimations(animationsTemp);
  }, [animation]);

  return (
    <TransitusContext.Provider value={{
      animations,
      register,
    }}>
      { children }
    </TransitusContext.Provider>
  )
}

export default TransitusGroup;
