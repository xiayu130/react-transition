import * as React from 'react';
import {
  useRef,
  useLayoutEffect,
} from 'react';
import Transition from './Transition';
import getRect from '../util/getReact';
import getParent from '../util/getParent';

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
  const prevRectRef = useRef<DOMRect>();
  const _reflowRef = useRef<number>();

  // 强制回流
  const reflow = () => {
    _reflowRef.current = document.body.offsetHeight;
  };

  // 获取相对的rect
  const relativeRect = (parent: HTMLElement, child: HTMLElement): DOMRect => {
    const parentRect = getRect(parent);
    const rect = getRect(child);
    rect.x = parentRect.x - rect.x;
    rect.y = parentRect.y - rect.y;
    return rect;
  };

  const force = () => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const parent = getParent(flipEle);
      const rect = relativeRect(parent, flipEle);
      prevRectRef.current = rect;
    }
  };

  useLayoutEffect(() => {
    const flipEle = selfRef.current
    if (flipEle && prevRectRef.current) {
      const parent = getParent(flipEle);
      const nextRect = relativeRect(parent, flipEle);
      const prevRect = prevRectRef.current;
      const x = prevRect.x - nextRect.x;
      const y = prevRect.y - nextRect.y;
      // 没有变化就不进行处理
      if (x === 0 && y === 0) {
        return;
      }
      const s = flipEle.style;
      s.transform = s.webkitTransform = `translate(${x}px,${y}px)`;
      s.transitionDuration = '0s';
      // 强制重绘
      reflow();
      s.transition = `${duration}ms`;
      s.transform = s.webkitTransform = s.transitionDuration = '';
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
