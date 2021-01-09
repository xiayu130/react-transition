import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';

// unmounted -> leaveed -> entering -> entered -> leaveing -> leaveed -> unmounted
// unmounted组件卸载状态
const noop = () => {};

export enum STATUS {
  UNMOUNTED = 'unmounted', // 卸载
  ENTERED = 'entered', // 显示状态
  ENTERING = 'entering', // 进入时的状态，从LEAVEED态过渡到ENTERED态
  LEAVEED = 'leaveed', // 离开状态
  LEAVEING = 'leaveing', // 离开时的状态，从ENTERED态过渡LEAVEED态
};

export type TransitionDuration = {
  enter: number; // entering的过渡时间
  leave: number; // leaveing的过渡时间
};

export interface TransitionProps {
  name?: string; // 过渡类的前缀
  duration?: number | TransitionDuration; // 状态的过渡时间
  delay?: number; // 延迟时间，进入entering，leaveing前的时间
  animation?: boolean; // 过渡的开关
  unmount?: boolean; // 是否在leaveed态之后卸载组件
  onUnmounted?: () => void; // 卸载组件时的事件
  onEntered?: () => void; // 进入entered时的事件
  onEntering?: () => void; // 进入entering时的事件
  onLeaveed?: () => void; // 进入leaveed时的事件
  onLeaveing?: () => void; // 进入leaveing时的事件
  children: React.ReactElement;
};

type waitForTransitionStartCallback = (...args: any[]) => any;

const durationDefaults = 200;
const delayDefaults = 0;

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    name = '',
    duration = durationDefaults,
    delay = delayDefaults,
    animation = false,
    unmount = false,
    onUnmounted = noop,
    onEntered = noop,
    onEntering = noop,
    onLeaveed = noop,
    onLeaveing = noop,
    children,
  } = props;

  const [status, setStatus] = useState<STATUS>(() => {
    if (animation) {
      return STATUS['LEAVEED'];
    } else {
      if (unmount) {
        return STATUS['UNMOUNTED'];
      } else {
        return STATUS['LEAVEED'];
      }
    }
  });
  // 是否为初次渲染
  const firstMount = useRef(true);
  // 最初元素的classNames
  const prevClassNames = useRef(children.props.className || '');
  const rAF = typeof window !== 'undefined' && window.requestAnimationFrame;
  
  /**
   * 等待浏览器渲染完成
   */
  const waitForTransitionStart = rAF ? (callback: waitForTransitionStartCallback) => {
    rAF(() => {
      rAF(callback); 
    })
  } : (callback: waitForTransitionStartCallback) => {
    setTimeout(callback, 50);
  };

  /**
   * 等待动画过渡完成后，执行回调
   */
  const waitTransition = (
    duration: number,
    callback: waitForTransitionStartCallback
  ) => {
    setTimeout(callback, duration);
  };

  /**
   * 处理STATUS['UNMOUNTED']状态
   */
  const handleUnmounted = () => {
    if (!firstMount.current) {
      // 初次渲染时不触发onUnmounted钩子
      onUnmounted();
    }
    if (animation) {
      // 如果是STATUS['UNMOUNTED']状态，并且animation为true。
      // 我们需要先将状态设置为STATUS['LEAVEED']态
      setStatus(STATUS['LEAVEED']);
    } else {
    }
  };

  /**
   * 处理STATUS['LEAVEED']状态
   */
  const handleLeaveed = () => {
    if (animation) {
      // 如果开关为开，当前是STATUS['LEAVEED']态，我们下一步需要进入到STATUS['ENTERING']态
      // 使用waitForTransitionStart，等待浏览器渲染完成
      waitForTransitionStart(() => {
        setStatus(STATUS['ENTERING']);
      });
    } else {
      // 触发leaveed的钩子，只有在真正离开的状态才触发，unmounted -> leaveed状态时不触发
      onLeaveed()
      // 如果开关为关。并且unmount设置为true，需要将状态设置为STATUS['UNMOUNTED']
      if (unmount) {
        setStatus(STATUS['UNMOUNTED']);
      }
    }
  };

  /**
   * 处理STATUS['LEAVEING']状态
   */
  const handleLeaveing = () => {
    // 触发leaveing钩子
    onLeaveing();
    if (animation) {
      // 如果开关为开，下一步需要过渡到STATUS['ENTERING']状态
      setStatus(STATUS['ENTERING']);
    } else {
      // 如果开关为关，下一步需要进入等待过渡完成后进入，STATUS['LEAVEED']状态
      let transitionDuration = typeof duration === 'number' ? duration : duration.leave;
      transitionDuration += delay;
      waitTransition(transitionDuration, () => {
        setStatus(STATUS['LEAVEED']);
      });
    }
  };

  /**
   * 处理STATUS['ENTERED']状态
   */
  const handleEntered = () => {
    // 触发onEntered的钩子
    onEntered();
    if (animation) {
      // 如果开关为开，不处理
    } else {
      // 如果开关为关，需要进入到['LEAVEING']状态
      setStatus(STATUS['LEAVEING']);
    }
  };

  /**
   * 处理STATUS['ENTERING']状态
   */
  const handleEntering = () => {
    // 触发onEntering钩子
    onEntering();
    if (animation) {
      // 如果动画开关为开，等待过渡完成后进入STATUS['ENTERED']状态
      let transitionDuration = typeof duration === 'number' ? duration : duration.enter;
      transitionDuration += delay;
      waitTransition(transitionDuration, () => {
        setStatus(STATUS['ENTERED']);
      });
    } else {
      // 如果动画开关为关，需要进入到STATUS['LEAVEING']
      setStatus(STATUS['LEAVEING']);
    }
  };

  useEffect(() => {
    switch (status) {
      case STATUS['UNMOUNTED']:
        handleUnmounted();
        break;
      case STATUS['LEAVEED']:
        handleLeaveed();
        break;
      case STATUS['LEAVEING']:
        handleLeaveing();
        break;
      case STATUS['ENTERED']:
        handleEntered();
        break;
      case STATUS['ENTERING']:
        handleEntering();
        break;
    }
    // 标记为不是初次渲染
    firstMount.current = false;
  }, [status, animation]);

  const className = useMemo(() => {
    switch (status) {
      case STATUS['LEAVEED']:
        return `${name}-leaveed`;
      case STATUS['LEAVEING']:
        return `${name}-leaveing`;
      case STATUS['ENTERED']:
        return `${name}-entered`;
      case STATUS['ENTERING']:
        return `${name}-entering`;
    }
  }, [status]);

  if (status === STATUS['UNMOUNTED']) {
    return null;
  }

  const nextClassName = prevClassNames.current ?
    `${className} ${prevClassNames.current}`
    : `${prevClassNames.current}`;
  
  return React.cloneElement(React.Children.only(children), {
    className: nextClassName,
  });
};

export default Transition;
