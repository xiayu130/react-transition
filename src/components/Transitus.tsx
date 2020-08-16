import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import useDidMount from '../util/useDidMount';
import noop from '../util/noop';
import {
  isObj,
  isNum,
  isUnd,
  isFunc,
} from '../util/checkType';
import { TransitusContext } from './TransitusGroup';

const defaultDuration = 200;
const defaultDelay = 0;

interface TransitusDuration {
  enter: number;
  leave: number;
}

export interface TransitusDelay {
  enterDelay: number;
  leaveDelay: number;
}

interface TransitionStyles {
  enter?: React.CSSProperties;
  entering?: React.CSSProperties;
  leave?: React.CSSProperties;
  leaveing?: React.CSSProperties;
}

export interface TransitusProps {
  duration?: number | TransitusDuration; // 动画持续时间
  delay?: number | TransitusDelay; // 动画开启前的延迟时间
  animation?: boolean; // 动画的开关
  children: React.ReactElement;
  unmount?: boolean; // 是否在离开后销毁DOM
  enter?: boolean; // 是否启用进入动画
  leave?: boolean; // 是否启用离开动画
  appear?: boolean; // 是否在首次挂载时使用enter动画
  timingFunction?: (string & {}) | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear"; // 动画函数
  transitionStyles?: TransitionStyles; // 过渡的样式
  ID?: string;
}

enum STATUS {
  UNMOUNTED = 'unmounted', // 卸载
  ENTER = 'enter', // 已经进入
  ENTERING = 'entering', // 进入时
  LEAVE = 'leave', // 已经离开
  LEAVEING = 'leaveing', // 离开时
}

const Transitus: React.FC<TransitusProps> = (props) => {
  const {
    timingFunction = 'ease-in-out',
    duration: _duration = defaultDuration,
    delay: _delay = 0,
    unmount = false,
    animation: _animation = false,
    enter = true,
    leave = true,
    appear = true,
    children,
    transitionStyles = {
      entering: { opacity: 1 },
      enter: { opacity: 1 },
      leaveing: { opacity: 0 },
      leave: { opacity: 0 },
    },
    ID,
  } = props;

  const [animation, setAnimation] = useState(_animation);
  const { register, animations } = useContext(TransitusContext);
  const firstMount = useRef(true);
  const nextStatus = useRef<null | STATUS>(null);
  const [status, setStatus] = useState<STATUS>(() => {
    let initStatus!: STATUS;
    if (animation) {
      if (appear) {
        initStatus = STATUS['LEAVE'];
        nextStatus.current = STATUS['ENTERING'];
      } else {
        initStatus = STATUS['ENTER'];
      }
    } else {
      if (unmount) {
        initStatus = STATUS['UNMOUNTED'];
      } else {
        initStatus = STATUS['LEAVE'];
      }
    }
    return initStatus;
  });
  const [duration] = useState<TransitusDuration>(() => {
    let enter: number = defaultDuration;
    let leave: number = defaultDuration;
    if (isObj(_duration)) {
      enter = isNum(_duration.enter) ? _duration.enter : defaultDuration;
      leave = isNum(_duration.leave) ? _duration.leave : defaultDuration;
    }
    if (isNum(_duration)) {
      enter = leave = _duration;
    }
    return {
      enter,
      leave,
    };
  });
  const [delay, setDelay] = useState<TransitusDelay>(() => {
    let enterDelay: number = defaultDelay;
    let leaveDelay: number = defaultDelay;
    if (isObj(_delay)) {
      enterDelay = isNum(_delay.enterDelay) ? _delay.enterDelay : defaultDuration;
      leaveDelay = isNum(_delay.leaveDelay) ? _delay.leaveDelay : defaultDuration;
    }
    if (isNum(_delay)) {
      enterDelay = leaveDelay = _delay;
    }
    return {
      enterDelay,
      leaveDelay,
    };
  });

  const handleEnter = () => {
    // 不需要执行入场动画
    if (!enter) {
      setStatus(STATUS['ENTER']);
    } else {
      handleTransitionTime(delay.enterDelay, () => {
        setStatus(STATUS['ENTERING']);
      });
    }
  };

  const handleLeave = () => {
    // 不需要执行出场动画
    if (!leave) {
      setStatus(STATUS['LEAVE']);
    } else {
      handleTransitionTime(delay.leaveDelay, () => {
        setStatus(STATUS['LEAVEING']);
      });
    }
  };

  const handleTransitionTime = (
    time: number,
    callback: Function,
  ) => {
    callback = isFunc(callback) ? callback : noop;
    if (isNum(time)) {
      setTimeout(callback, time);
    } else {
      setTimeout(callback, 0);
    }
  }

  const updateStatus = (
    nextStatus: STATUS | null,
  ): void => {
    if (nextStatus) {
      if (nextStatus === STATUS['ENTERING']) {
        handleEnter();
      } else {
        handleLeave();
      }
    } else {
      // 如果已经是LEAVE状态了，并且unmount设置为true，更新状态为UNMOUNTED
      if (unmount && status === STATUS['LEAVE']) {
        setStatus(STATUS['UNMOUNTED']);
      }
    }
  };

  useDidMount(() => {
    register(props);
    updateStatus(nextStatus.current);
  });

  useEffect(() => {
    if (!firstMount.current) {
      let nextStatus = null;
      if (animation) {
        if (
          status !== STATUS['ENTERING'] &&
          status !== STATUS['ENTER']
        ) {
          nextStatus = STATUS['ENTERING'];
        }
        if (status === STATUS['ENTERING']) {
          // 动画完成后进入ENTER状态
          handleTransitionTime(duration.enter, () => {
            setStatus(STATUS['ENTER']);
          });
          return;
        }
        // 为了在UNMOUNTED时开启动画效果，需要先将状态设置为LEAVE
        if (status === STATUS['UNMOUNTED']) {
          setStatus(STATUS['LEAVE']);
          return;
        }
      } else {
        if (
          status === STATUS['ENTERING'] ||
          status === STATUS['ENTER']
        ) {
          nextStatus = STATUS['LEAVEING'];
        }
        if (status === STATUS['LEAVEING']) {
          // 动画完成后，进入LEAVE状态
          handleTransitionTime(duration.leave, () => {
            setStatus(STATUS['LEAVE']);
          });
          return;
        }
      }
      updateStatus(nextStatus);
    } else {
      firstMount.current = false;
    }
  }, [animation, status]);

  useEffect(() => {
    setAnimation(_animation);
  }, [_animation]);

  useEffect(() => {
    if (!isUnd(ID) && !isUnd(animations[ID])) {
      const {
        animation = false,
        delay = defaultDelay,
      } = animations[ID];
      setAnimation(animation);
      setDelay({
        enterDelay: delay as number,
        leaveDelay: delay as number,
      });
    }
  }, [animations]);

  if (status === STATUS['UNMOUNTED']) {
    return null;
  }

  const statusStyles = transitionStyles[status] || {};
  const transitionStyle = {
    transition: `all ${animation ? duration.enter : duration.leave}ms ${timingFunction}`,
  };

  return React.cloneElement(React.Children.only(children), {
    style: {
      ...transitionStyle,
      ...statusStyles,
    },
  })
};

export default Transitus;
