import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import useDidMount from '../util/useDidMount';
import {
  isObj,
  isNum,
} from '../util/checkType';

const defaultDuration = 200;

interface TransitusDuration {
  enter: number; // enter过渡的时长
  leave: number; // leave过渡的时长
}

interface TransitionStyles {
  enter?: React.CSSProperties;
  entering?: React.CSSProperties;
  leave?: React.CSSProperties;
  leaveing?: React.CSSProperties;
}

interface TransitusProps {
  duration?: number | TransitusDuration; // 动画的时间
  animation?: boolean; // 组件的显隐状态
  children: React.ReactElement;
  unmount?: boolean; // 是否在离开后卸载组件
  enter?: boolean; // 是否启用进入动画
  leave?: boolean; // 是否启用离开动画
  appear?: boolean; // 是否在首次挂载时使用enter动画
  timingFunction?: string; // 动画函数
  transitionStyles?: TransitionStyles;
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
    duration = defaultDuration,
    unmount = false,
    animation = false,
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

  const self = useRef(null);
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
  const [timeout] = useState<TransitusDuration>(() => {
    let enter: number = defaultDuration;
    let leave: number = defaultDuration;
    if (isObj(duration)) {
      enter = isNum(duration.enter) ? duration.enter : defaultDuration;
      leave = isNum(duration.leave) ? duration.leave : defaultDuration;
    }
    if (isNum(duration)) {
      enter = leave = duration;
    }
    return {
      enter,
      leave,
    };
  });

  const handleEnter = () => {
    // 不需要执行入场动画
    if (!enter) {
      setStatus(STATUS['ENTER']);
    } else {
      setStatus(STATUS['ENTERING']);
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

  const handleTransitionEnd = (
    timeout: number,
    callback: Function,
  ) => {
    if (isNum(timeout)) {
      setTimeout(callback, timeout);
    } else {
      setTimeout(callback, 0);
    }
  };

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
      if (unmount && status === STATUS['LEAVE']) {
        setStatus(STATUS['UNMOUNTED']);
      }
    }
  };

  useDidMount(() => {
    updateStatus(nextStatus.current);
  });

  useEffect(() => {
    switch (status) {
      case STATUS['ENTERING']:
        handleTransitionEnd(timeout.enter, () => {
          setStatus(STATUS['ENTER']);
        });
        break;
      case STATUS['LEAVEING']:
        handleTransitionEnd(timeout.leave, () => {
          setStatus(STATUS['LEAVE']);
        });
        break;
    }
  }, [status]);

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
      }
      updateStatus(nextStatus);
    } else {
      firstMount.current = false;
    }
  }, [animation, status]);

  if (status === STATUS['UNMOUNTED']) {
    return null;
  }

  const styles = transitionStyles[status] || {};

  return React.cloneElement(React.Children.only(children), {
    style: {
      transition: `${duration}ms ${timingFunction}`,
      ...styles,
    },
    ref: self,
  })
};

export default Transitus;
