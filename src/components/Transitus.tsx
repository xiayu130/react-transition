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
import { v4 as uuid } from 'uuid';

const defaultDuration = 200;
const defaultDelay = 0;

interface TransitusDuration {
  enter: number;
  leave: number;
}

interface TransitusDisplay {
  enter: React.CSSProperties;
  leave: React.CSSProperties;
}

interface TransitionStyles {
  enter?: React.CSSProperties;
  entering?: React.CSSProperties;
  leave?: React.CSSProperties;
  leaveing?: React.CSSProperties;
}

export interface TransitusProps {
  display?: boolean | TransitusDisplay;
  duration?: number | TransitusDuration; // 动画持续时间
  delay?: number; // 动画开启前的延迟时间
  animation?: boolean; // 动画的开关
  children: React.ReactElement;
  unmount?: boolean; // 是否在离开后销毁DOM
  enter?: boolean; // 是否启用进入动画
  leave?: boolean; // 是否启用离开动画
  appear?: boolean; // 是否在首次挂载时使用enter动画
  timingFunction?: (string & {}) | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear"; // 动画函数
  transitionStyles?: TransitionStyles; // 过渡的样式
}

enum STATUS {
  UNMOUNTED = 'unmounted', // 卸载
  ENTER = 'enter', // 已经进入
  ENTERING = 'entering', // 进入时
  LEAVE = 'leave', // 已经离开
  LEAVEING = 'leaveing', // 离开时
}

// TODO: 需要完善类型
const Transitus: React.FC<TransitusProps> = (props) => {
  const {
    display = {
      enter: { display: 'block' },
      leave: { display: 'none' }
    },
    timingFunction = 'ease-in-out',
    duration: _duration = defaultDuration,
    delay: _delay = defaultDelay,
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
  } = props;

  const { register, animations } = useContext(TransitusContext);
  const [animation, setAnimation] = useState(_animation);
  const firstMount = useRef(true);
  const nextStatus = useRef<null | STATUS>(null);
  const prevStatus = useRef<null | STATUS>(null);
  const timer = useRef(0);
  const ID = useRef(uuid());
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
  const [delay, setDelay] = useState<number>(_delay);
  const [displayStyles, setDisplayStyles] = useState<React.CSSProperties>({});

  const handleEnter = () => {
    // 不需要执行入场动画
    if (!enter) {
      setStatus(STATUS['ENTER']);
    } else {
      if (
        prevStatus.current === STATUS['UNMOUNTED'] ||
        isObj(display)
      ) {
        // 需要等待dom渲染完毕
        handleTransitionTime(16, () => {
          setStatus(STATUS['ENTERING']);
          prevStatus.current = null;
        });
      } else {
        setStatus(STATUS['ENTERING']);
      }
    }
  };

  const handleLeave = () => {
    // 不需要执行出场动画
    if (!leave) {
      setStatus(STATUS['LEAVE']);
    } else {
      setStatus(STATUS['LEAVEING']);
    }
  };

  const handleTransitionTime = (
    time: number,
    callback: Function,
  ) => {
    let timer = 0;
    callback = isFunc(callback) ? callback : noop;
    if (isNum(time)) {
      timer = setTimeout(callback, time);
    } else {
      timer = setTimeout(callback, 0);
    }
    return timer;
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
    register({ ...props, ID: ID.current });
    updateStatus(nextStatus.current);
  });

  useEffect(() => {
    switch (status) {
      case STATUS['ENTERING']:
        timer.current = handleTransitionTime(duration.enter, () => {
          setStatus(STATUS['ENTER']);
        });
        break;
      case STATUS['LEAVEING']:
        timer.current = handleTransitionTime(duration.leave, () => {
          if (unmount) {
            handleTransitionTime(delay, () => {
              setStatus(STATUS['LEAVE']);
            });
          } else {
            setStatus(STATUS['LEAVE']);
          }
        });
        break;
      case STATUS['LEAVE']:
        break;
    }
    return () => {
      clearTimeout(timer.current);
    }
  }, [status]);

  useEffect(() => {
    if (animation) {
      // 为了在UNMOUNTED时开启动画效果，需要先将状态设置为LEAVE
      if (status === STATUS['UNMOUNTED']) {
        prevStatus.current = STATUS['UNMOUNTED'];
        setStatus(STATUS['LEAVE']);
      } else if (status === STATUS['LEAVE'] && isObj(display)) {
        setDisplayStyles({
          ...display.enter,
        });
      }
    } else {
      if (
        status === STATUS['LEAVE'] &&
        isObj(display) &&
        !firstMount.current
      ) {
        handleTransitionTime(duration.leave + delay, () => {
          setDisplayStyles({
            ...display.leave,
          });
        });
      }
    }
  }, [animation, status]);

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
      } else {
        if (
          status === STATUS['ENTERING'] ||
          status === STATUS['ENTER']
        ) {
          nextStatus = STATUS['LEAVEING'];
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
    if (!isUnd(ID.current) && !isUnd(animations[ID.current])) {
      const {
        animation = false,
        delay = defaultDelay,
      } = animations[ID.current];
      setAnimation(animation);
      setDelay(delay);
    }
  }, [animations]);

  if (status === STATUS['UNMOUNTED']) {
    return null;
  }

  const statusStyles = transitionStyles[status] || {};
  const transitionStyle = {
    transition: `all ${animation ? duration.enter : duration.leave}ms ${timingFunction} ${delay}ms`,
  };
  const prevStyles = children?.props?.style || {};

  return React.cloneElement(React.Children.only(children), {
    style: {
      ...prevStyles,
      ...transitionStyle,
      ...statusStyles,
      ...displayStyles,
    },
  })
};

export default Transitus;
