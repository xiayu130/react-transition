import React, {
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import Transitus, {
  TransitionStyles
} from './Transitus';
import { FLIPSContext } from './TransitionFLIPS';
import getRect from '../util/getReact';
import getX from '../util/getX';
import getY from '../util/getY';
import getW from '../util/getW';
import getH from '../util/getH';
import getParent from '../util/getParent';
import getStyles from '../util/getStyles';
import createAnimation from '../util/createAnimation';

export interface TransitionFLIP {
  children: React.ReactElement;
  flipId: string | number;
  _onLeave?: () => void;
  _animation?: boolean;
  _transitionStyles?: TransitionStyles;
  _duration?: number;
  inOut?: boolean;
}

const TransitionFLIP: React.FC<TransitionFLIP> = (props) => {

  const {
    _onLeave: onLeave,
    _animation: animation,
    _transitionStyles: transitionStyles,
    _duration: duration,
    inOut = false,
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
  const FLIPID = useRef(flipId);

  const force = () => {
    const flipEle = selfRef.current;
    const catchAnimation = catchAnimations.get(FLIPID.current);
    if (flipEle && catchAnimation) {
      if (catchAnimation.playState === 'running') {
        const parent = getParent(flipEle);
        const parentRect = getRect(parent);
        // 基于父级进行计算
        const rect = getRect(flipEle);
        const styles = getStyles(flipEle);
        rect.x = parentRect.x - rect.x;
        rect.y = parentRect.y - rect.y;
        catchStyles.set(FLIPID.current, {
          rect,
          styles,
        });
        catchAnimation.finish();
      }
    }
  }

  force();

  useEffect(() => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const parent = getParent(flipEle);
      const parentRect = getRect(parent);
      const rect = getRect(flipEle);
      const styles = getStyles(flipEle);
      // 基于父级元素的
      rect.x = parentRect.x - rect.x;
      rect.y = parentRect.y - rect.y;
      catchStyles.set(FLIPID.current, {
        rect,
        styles,
      });
    }
  }, [catchStyles]);

  useLayoutEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      const flipEle = selfRef.current;
      if (flipEle) {
        const catchRect = catchStyles.get(FLIPID.current);
        const pbc = catchRect?.styles.backgroundColor;
        const parent = getParent(flipEle);
        const parentRect = getRect(parent);
        const nextRect = getRect(flipEle);
        const styles = getStyles(flipEle);
        const cbc = styles.backgroundColor;
        // 基于父级元素的
        nextRect.x = parentRect.x - nextRect.x;
        nextRect.y = parentRect.y - nextRect.y;
        const x = getX(nextRect, catchRect?.rect as DOMRect);
        const y = getY(nextRect, catchRect?.rect as DOMRect);
        const w = getW(catchRect?.rect as DOMRect, nextRect);
        const h = getH(catchRect?.rect as DOMRect, nextRect);
        // 更新缓存
        catchStyles.set(FLIPID.current, {
          rect: nextRect,
          styles,
        });
        if (x === 0 && y === 0 && w === 1 && h === 1 && pbc === cbc) {
          return;
        }
        const animationKeyframes: Keyframe[] = [
          {
            transform: `translate(${x}px, ${y}px) scale(${w}, ${h})`,
            backgroundColor: pbc,
          },
          {
            transform: `translate(0, 0) scale(1, 1)`,
            backgroundColor: cbc,
          },
        ];
        const animationOptions: KeyframeAnimationOptions = animationOption;
        const animation = createAnimation(flipEle, animationKeyframes, animationOptions);
        catchAnimations.set(FLIPID.current, animation);
        animation.play();
      }
    }
  });

  const child =  React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });

  if (inOut) {
    return (
      <Transitus
        animation={animation}
        onLeave={onLeave}
        onEnter={() => {
          // 入场完成后强制更新一次缓存
          const flipEle = selfRef.current;
          if (flipEle) {
            const parent = getParent(flipEle);
            const parentRect = getRect(parent);
            const rect = getRect(flipEle);
            const styles = getStyles(flipEle);
            rect.x = parentRect.x - rect.x;
            rect.y = parentRect.y - rect.y;
            catchStyles.set(FLIPID.current, {
              rect,
              styles,
            });
          }
        }}
        duration={duration}
        transitionStyles={transitionStyles}
      >
        { child }
      </Transitus>
    );
  } else {
    return child;
  }
};

export default TransitionFLIP;
