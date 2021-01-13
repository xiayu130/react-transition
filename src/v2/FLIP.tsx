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
  } = props as any;

  const selfRef = useRef<HTMLElement>();
  const prevRectRef = useRef<DOMRect>();
  const _reflowRef = useRef<number>();
  const _runing = useRef<boolean>(false);

  // 强制重绘
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

  // 终止transition过渡，并保存当前的位置
  const finish = () => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const s = flipEle.style;
      const computedStyle = window.getComputedStyle(flipEle);
      s.transitionDuration = '0s';
      s.transform = s.webkitTransform = computedStyle.transform;
    }
  };

  const addClass = (ele: HTMLElement, className: string): void => {
    if (!className || !(className = className.trim())) {
      return;
    }
    ele.classList.add(className);
  };

  const removeClass = (ele: HTMLElement, className: string): void => {
    if (!className || !(className = className.trim())) {
      return;
    }
    ele.classList.remove(className);
    if (!ele.classList.length) {
      ele.removeAttribute('class');
    }
  };

  const force = () => {
    const flipEle = selfRef.current;
    if (flipEle) {
      const parent = getParent(flipEle);
      const rect = relativeRect(parent, flipEle);
      prevRectRef.current = rect;
      // 这里可以增加一个停止css动画，并保存当前动画的位置（Vue这块没有做处理，可能并不重要）
      if (_runing.current) {
        // finish();
      }
    }
  };

  useLayoutEffect(() => {
    const flipEle = selfRef.current
    if (flipEle && prevRectRef.current) {
      const moveClass = `${name}-move`;
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
      s.transform = s.webkitTransform = `translate(${x}px,${y}px)`;
      s.transitionDuration = '0s';
      // 强制重绘
      reflow();
      // 添加move类
      addClass(flipEle, moveClass);
      s.transform = s.webkitTransform = s.transitionDuration = '';
      _runing.current = true;
      // 监听transition事件
      flipEle.addEventListener('transitionend', function cb (e) {
        if (e && e.target !== flipEle) {
          return
        }
        if (!e || /transform$/.test(e.propertyName)) {
          flipEle.removeEventListener('transitionend', cb);
          _runing.current = false;
          // 删除move类
          removeClass(flipEle, moveClass);
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
