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
      // 这里可以增加一个停止css动画，并保存当前动画的位置（Vue这块没有做处理，可能并不重要）
    }
  };

  useLayoutEffect(() => {
    const flipEle = selfRef.current
    if (flipEle && prevRectRef.current) {
      const parent = getParent(flipEle);
      const nextRect = relativeRect(parent, flipEle);
      const prevRect = prevRectRef.current;
      const x = nextRect.x - prevRect.x;
      const y = nextRect.y - prevRect.y;
      // 没有变化就不进行处理
      if (x === 0 && y === 0) {
        return;
      }
      const s = flipEle.style;
      s.transitionDuration = '0s';
      s.transform = s.webkitTransform = `translate(${x}px,${y}px)`;
      // 强制重绘
      reflow();
      // Vue实现，是添加了一个move类，move类包含了transition的内容
      // 我在这里直接添加transition属性，并在transitionend事件时，删除transition属性
      s.transition = `all ${duration}ms ${easing}`;
      s.transform = s.webkitTransform = '';
      // 监听transition事件
      flipEle.addEventListener('transitionend', function cb (e) {
        if (e && e.target !== flipEle) {
          return
        }
        if (!e || /transform$/.test(e.propertyName)) {
          flipEle.removeEventListener('transitionend', cb);
          s.transition = '';
        }
      });
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
