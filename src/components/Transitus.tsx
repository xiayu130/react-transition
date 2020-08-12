import React, {
  useState,
  useRef,
} from 'react';
import useDidMount from '../util/useDidMount';
import { isObj } from '../util/checkType';

interface TransitusDuration {
  appear: number;
  enter: number;
  leave: number;
}
interface TransitusProps {
  duration?: number | TransitusDuration; // 动画的时间
  animation?: boolean; // 组件的显隐状态
  children: React.ReactElement;
  unmount?: boolean; // 是否在离开后卸载组件
  enter?: boolean; // 是否启用进入动画
  leave?: boolean; // 是否启用离开动画
  appear?: boolean; // 是否在首次挂载时使用enter动画
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
    duration = 200,
    unmount = false,
    animation = false,
    enter = true,
    leave = true,
    appear = true,
    children,
  } = props;

  const self = useRef(null);
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

  const handleEnter = (mount: boolean) => {
  }

  const handleLeave = () => {
  }

  const updateStatus = (
    mount: boolean,
    nextStatus: STATUS | null,
  ): void => {
    if (nextStatus) {
      if (nextStatus === STATUS['ENTERING']) {
        handleEnter(mount);
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
    updateStatus(true, nextStatus.current);
  });

  return React.cloneElement(React.Children.only(children), {
    style: {
    },
    ref: self
  })
};

export default Transitus;
