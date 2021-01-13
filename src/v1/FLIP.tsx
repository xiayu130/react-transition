import * as React from 'react';
import {
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { FLIPSContext } from './FLIPS';
import getRect from '../util/getReact';
import getX from '../util/getX';
import getY from '../util/getY';
import getW from '../util/getW';
import getH from '../util/getH';
import createAnimation from '../util/createAnimation';

interface FLIP {
  children: React.ReactElement;
  flipId: string | number;
}

const FLIP: React.FC<FLIP> = (props) => {
  const {
    flipId,
    children,
  } = props;

  const {
    catchStyles,
    catchAnimations,
    updateCatchAnimations,
    animationOption,
  } = useContext(FLIPSContext);

  const selfRef = useRef<HTMLElement>(null);
  const firstMount = useRef<boolean>(true);
  // 这里不能使用随机数，id和缓存的样式互相绑定
  const FLIPID = useRef(flipId);

  const force = () => {
    const flipEle = selfRef.current;
    const catchAnimation = catchAnimations.get(FLIPID.current);
    if (flipEle && catchAnimation) {
      // 正在运行动画
      if (catchAnimation.playState === 'running') {
        catchStyles.set(FLIPID.current, {
          rect: getRect(flipEle),
        });
        // 结束当前动画
        catchAnimation.finish();
      }
    }
  }

  force();

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
            transform: `translate(${x}px, ${y}px) scale(${w}, ${h})`,
          },
          {
            transform: `translate(0, 0) scale(1, 1)`,
          },
        ];
        // Web Animation 的配置
        const animationOptions: KeyframeAnimationOptions = animationOption;
        const animation = createAnimation(flipEle, animationKeyframes, animationOptions);
        catchAnimations.set(FLIPID.current, animation);
        updateCatchAnimations.set(FLIPID.current, animation);
      }
    }
  });

  return React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });
};

export default FLIP;
