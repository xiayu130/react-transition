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
  flipId: string;
}

const TransitusFLIP: React.FC<TransitusFLIP> = (props) => {
  const {
    flipId,
    children,
  } = props;

  const {
    catchStyles,
    catchAnimations,
    animationOption,
  } = useContext(FLIPSContext);

  const selfRef = useRef<HTMLElement>(null);
  const firstMount = useRef<boolean>(true);
  // 这里不能使用随机数，id和缓存的样式互相绑定
  const FLIPID = useRef(flipId);

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
        // 宽高的动画，使用scale实现
        const w = getW(catchRect?.rect as DOMRect, nextRect);
        const h = getH(catchRect?.rect as DOMRect, nextRect);
        // 更新缓存
        catchStyles.set(FLIPID.current, {
          rect: nextRect,
        });

        // 如果没有发生变化则不进行操作
        if (x === 0 && y === 0 && w === 1 && h === 1) {
          return;
        }

        // Web Animation 关键帧
        const animationKeyframes: Keyframe[] = [
          {
            transform: `translate(${x}, ${y}) scaleX(${w}) scaleY(${h})`,
          },
          {
            transform: `translate(0, 0) scaleX(1) scaleY(1)`,
          },
        ];
        // Web Animation 的配置
        const animationOptions: KeyframeAnimationOptions = animationOption;
      }
    }
  });

  return React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });
};

export default TransitusFLIP;
