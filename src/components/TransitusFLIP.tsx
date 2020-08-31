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
import getX from '../util/getX';
import getY from '../util/getY';
import getW from '../util/getW';
import getH from '../util/getH';

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
  const firstMount = useRef<boolean>(true);
  const FLIPID = useRef(uuid());

  useEffect(() => {
    // 初始化样式缓存
    const flipEle = selfRef.current;
    if (flipEle) {
      const rect = getRect(flipEle);
      catchStyles.set(FLIPID.current, {
        rect,
      });
    }
  }, [catchStyles]);

  useLayoutEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      const flipEle = selfRef.current;
      if (flipEle) {
        const nextRect = getRect(flipEle);
        const catchRect = catchStyles.get(FLIPID.current);
        const x = getX(catchRect?.rect as DOMRect, nextRect);
        const y = getY(catchRect?.rect as DOMRect, nextRect);
        const w;
        const h;
        // 更新缓存
        catchStyles.set(FLIPID.current, {
          rect: nextRect,
        });
        const keyframes: Keyframe[] = [
          {
            transform: `translate(${x}, ${y})`,
          },
          {
            transform: `translate(0, 0)`,
          },
        ];
      }
    }
  });

  return React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });
};

export default TransitusFLIP;
