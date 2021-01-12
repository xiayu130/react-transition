// https://github.com/vuejs/vue/blob/b51430f598b354ed60851bb62885539bd25de3d8/src/platforms/web/runtime/components/transition-group.js
import * as React from 'react';
import {
  useRef,
  useLayoutEffect,
} from 'react';
import Transition from './Transition';

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

  const selfRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const flipEle = selfRef.current
    if (flipEle && animation) {
    }
  });

  const child = React.cloneElement(React.Children.only(children), {
    ref: selfRef
  });

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
