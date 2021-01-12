import * as React from 'react';
import {
  useRef,
  useLayoutEffect,
} from 'react';
import Transition from './Transition';
import getRect from './util/getReact';
import getParent from './util/getParent';

export interface FLIPProps {
  children: React.ReactElement;
}

const FLIP: React.FC<FLIPProps> = (props) => {
  const {
    children,
  } = props;

  const {
    _inOutDuration: inOutDuration, // 离开，进入的过渡时长，需要和class中transtion一致
    _animation: animation, // 离开，进入动画的开关
    _onLeaveed: onLeaveed,
    _name: name, // class的前缀
    _duration: duration, // flip动画过渡的时长
    _easing: easing, // flip动画的缓冲函数
  } = props as any;

  const selfRef = useRef<HTMLElement>();
  const prevRect = useRef<DOMRect>();

  const force = () => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const parent = getParent(flipEle);
      const parentRect = getRect(parent);
      const rect = getRect(flipEle);
      rect.x = parentRect.x - rect.x;
      rect.y = parentRect.y - rect.y;
      prevRect.current = rect;
    }
  };

  useLayoutEffect(() => {
    const flipEle = selfRef.current
    if (flipEle && animation) {
    }
  });

  const child = React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });

  force();

  return (
    <Transition
      name={name}
      animation={animation}
      onLeaveed={onLeaveed}
      duration={inOutDuration}
    >
      { child }
    </Transition>
  );
};

export default FLIP;
