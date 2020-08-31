import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { v4 as uuid } from 'uuid';
import { FLIPSContext } from './TransitusFLIPS';
import getRect from '../util/getReact';

interface TransitusFLIP {
  children: React.ReactElement;
}

const TransitusFLIP: React.FC<TransitusFLIP> = (props) => {
  const {
    children,
  } = props;

  const {
    catchStyles,
    catchAnimations,
  } = useContext(FLIPSContext);

  const selfRef = useRef<HTMLElement>(null);
  const FLIPID = useRef(uuid());

  useEffect(() => {
    // 初始化样式缓存
    const flipEle = selfRef.current;
    if (flipEle) {
      const rect = getRect(flipEle);
      catchStyles.set(FLIPID.current, rect);
    }
  }, [catchStyles]);

  return React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });
};

export default TransitusFLIP;
