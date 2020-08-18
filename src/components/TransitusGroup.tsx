import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  TransitusProps,
} from './Transitus';
import {
  isUnd,
} from '../util/checkType';

interface TransitusGroup {
  animation?: boolean; // 是否开启动画
  interval?: number; // group间隔的时间
}

export type TransitusPropsAndID = TransitusProps & {
  ID: string;
}
type TransitusContextPropsKey = Exclude<keyof TransitusPropsAndID, 'delay' | 'animation'>;
type TransitusContextProps = Omit<TransitusPropsAndID, TransitusContextPropsKey>;

export const TransitusContext = React.createContext({
  animations: {} as {
    [key: string]: TransitusContextProps;
  },
  register: (props: TransitusPropsAndID): void => {},
});

const TransitusGroup: React.FC<TransitusGroup> = (props) => {

  const {
    animation = false,
    interval = 200,
    children,
  } = props;

  const [animations, setAnimations] = useState({});
  const animationsRef = useRef<Map<string, TransitusPropsAndID>>(new Map());
  const register = useCallback((props: TransitusPropsAndID) => {
    const { ID } = props;
    if (!isUnd(ID)) {
      animationsRef.current.set(ID, props)
    }
  }, []);

  useEffect(() => {
    let counter = 0;
    const transitus = [...animationsRef.current.values()] || [];
    const animationsTemp: {
      [key: string]: TransitusContextProps;
    } = {};
    (animation ? transitus : [...transitus.reverse()]).forEach((t) => {
      const { ID } = t;
      if (!isUnd(ID)) {
        animationsTemp[ID] = {
          delay: counter * interval,
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
