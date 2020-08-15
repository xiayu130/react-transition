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
  appear?: boolean; // 是否首次挂载时，使用入场动画
  enter?: boolean; // 是否禁用入场动画
  leave?: boolean; // 是否禁用出场动画
  animation?: boolean; // 是否开启动画
  interval?: number; // group间隔的时间
}

const TransitusContext = React.createContext({
  animations: {},
  register: (props: TransitusProps) => {},
});

const TransitusGroup: React.FC<TransitusGroup> = (props) => {

  const {
    appear = false,
    enter = false,
    leave = false,
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
    const transitus = Object.values(animationsRef.current) || [];
    const counter = 0;
    const animationsTemp = {};
    (animation ? transitus : [...transitus.reverse()]).forEach((t) => {
      const { ID } = t;
      if (!isUnd(ID)) {
        animationsTemp[ID] = {
          appear,
          enter,
          leave,
          interval,
        };
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
